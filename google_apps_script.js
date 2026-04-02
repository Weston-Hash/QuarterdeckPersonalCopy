// ═══════════════════════════════════════════════════════════════════
// Google Apps Script — Private Sheet Proxy for Quarterdeck App
// ═══════════════════════════════════════════════════════════════════
//
// SETUP:
//   1. Open your Google Sheet → Extensions → Apps Script
//   2. Delete any code in Code.gs, paste this entire file
//   3. Change SECRET_TOKEN below to a random string (keep it secret!)
//   4. Change SHEET_NAME to match your tab name (bottom of sheet)
//   5. Click Deploy → New Deployment
//      - Type: Web App
//      - Execute as: Me
//      - Who has access: Anyone
//   6. Click Deploy → copy the URL
//   7. Paste the URL into SHEETS_API_URL in ut_app_basecode.jsx
//   8. Paste the same token into SHEETS_API_TOKEN in ut_app_basecode.jsx
//
// The sheet stays PRIVATE — only the Apps Script (running as you)
// can read it. The token prevents unauthorized access to the endpoint.
// ═══════════════════════════════════════════════════════════════════

const SECRET_TOKEN = "UT_NROTC";
const SHEET_NAME   = "MASTER WEBSITE";

// Column names are read from row 1 of the sheet (header row).
// Expected headers (exact spelling, any order):
//   company | name | class | email | phone_number | major | campus | eid | password | billet
// Adding, removing, or reordering columns is safe as long as the header names stay the same.

function doGet(e) {
  var output;

  // Validate token
  if (!e || !e.parameter || e.parameter.token !== SECRET_TOKEN) {
    output = ContentService.createTextOutput(JSON.stringify({ error: "Unauthorized" }));
    output.setMimeType(ContentService.MimeType.JSON);
    return output;
  }

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  if (!sheet) {
    output = ContentService.createTextOutput(JSON.stringify({ error: "Sheet not found: " + SHEET_NAME }));
    output.setMimeType(ContentService.MimeType.JSON);
    return output;
  }

  var data = sheet.getDataRange().getValues();
  if (data.length < 2) {
    output = ContentService.createTextOutput(JSON.stringify({ users: [] }));
    output.setMimeType(ContentService.MimeType.JSON);
    return output;
  }

  // Row 0 is the header row — derive column keys from it
  var headers = data[0].map(function(h) { return (h || "").toString().trim().toLowerCase().replace(/\s+/g, "_"); });

  var users = [];
  // Start from row 1 — skip header
  for (var i = 1; i < data.length; i++) {
    // Use the "name" column to detect empty rows
    var nameCol = headers.indexOf("name");
    var name = nameCol >= 0 ? (data[i][nameCol] || "").toString().trim() : "";
    if (!name) continue; // skip empty rows

    var row = {};
    for (var j = 0; j < headers.length && j < data[i].length; j++) {
      if (headers[j]) row[headers[j]] = (data[i][j] || "").toString().trim();
    }
    users.push(row);
  }

  var result = JSON.stringify({ users: users });
  var callback = e.parameter.callback;
  if (callback) {
    output = ContentService.createTextOutput(callback + "(" + result + ")");
    output.setMimeType(ContentService.MimeType.JAVASCRIPT);
  } else {
    output = ContentService.createTextOutput(result);
    output.setMimeType(ContentService.MimeType.JSON);
  }
  return output;
}

// ─── MFA ─────────────────────────────────────────────────────────────────────
// POST body: { token, action, email [, code] }
//   action="sendMFA"   → generate 6-digit code, store with 5-min expiry, email it
//   action="verifyMFA" → validate code (code survives wrong guesses; deleted only on success or expiry)

var MFA_EXPIRY_MS      = 5 * 60 * 1000; // 5 minutes
var RATE_LIMIT_MS      = 60 * 1000;     // 60-second resend cooldown
var ROSTER_CACHE_KEY   = "qd_email_name_map";
var ROSTER_CACHE_TTL   = 21600;         // 6 hours (Apps Script CacheService max)

// Returns a plain object { email: displayName, … } pulled from the sheet.
// Result is cached in CacheService for ROSTER_CACHE_TTL seconds, so normal
// sendMFA requests never touch the sheet at all.
function getEmailNameMap() {
  var cache  = CacheService.getScriptCache();
  var cached = cache.get(ROSTER_CACHE_KEY);
  if (cached) {
    try { return JSON.parse(cached); } catch (ignore) {}
  }

  // Cache miss — read sheet once and populate cache
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  var data  = sheet ? sheet.getDataRange().getValues() : [];
  var map   = {};
  if (data.length >= 2) {
    var hdr      = data[0].map(function(h) { return (h || "").toString().trim().toLowerCase().replace(/\s+/g, "_"); });
    var emailCol = hdr.indexOf("email");
    var nameCol  = hdr.indexOf("name");
    for (var i = 1; i < data.length; i++) {
      var e = emailCol >= 0 ? (data[i][emailCol] || "").toString().trim().toLowerCase() : "";
      var n = nameCol  >= 0 ? (data[i][nameCol]  || "").toString().trim() : "";
      if (e) map[e] = n;
    }
  }
  try { cache.put(ROSTER_CACHE_KEY, JSON.stringify(map), ROSTER_CACHE_TTL); } catch (ignore) {}
  return map;
}

function jsonOut(obj) {
  var o = ContentService.createTextOutput(JSON.stringify(obj));
  o.setMimeType(ContentService.MimeType.JSON);
  return o;
}

function doPost(e) {
  var json;
  try {
    json = JSON.parse(e.postData.contents);
  } catch (err) {
    return jsonOut({ ok: false, error: "Invalid JSON" });
  }

  if (!json || json.token !== SECRET_TOKEN) return jsonOut({ ok: false, error: "Unauthorized" });

  var action = json.action || "";
  var email  = (json.email || "").toString().trim().toLowerCase();
  if (!email) return jsonOut({ ok: false, error: "Email required" });

  var props   = PropertiesService.getScriptProperties();
  var propKey = "mfa_" + email;

  // ── sendMFA ──────────────────────────────────────────────────────────────
  if (action === "sendMFA") {
    // 1. Rate-limit check — fast PropertiesService read, no sheet access
    var existing = props.getProperty(propKey);
    if (existing) {
      try {
        var prev = JSON.parse(existing);
        if (Date.now() - prev.ts < RATE_LIMIT_MS) {
          return jsonOut({ ok: false, error: "Please wait before requesting another code." });
        }
      } catch (ignore) {}
    }

    // 2. Verify email against cached roster (sheet only read on first call / cache miss)
    var map      = getEmailNameMap();
    var userName = map[email];
    if (userName === undefined) return jsonOut({ ok: false, error: "Email not found" });

    // 3. Generate code, persist, send
    var code = Math.floor(100000 + Math.random() * 900000).toString();
    props.setProperty(propKey, JSON.stringify({ code: code, ts: Date.now() }));

    var subject = "UT NROTC Quarterdeck — Your Verification Code";
    var body =
      "Hello " + userName + ",\n\n" +
      "Your one-time verification code is:\n\n" +
      "    " + code + "\n\n" +
      "This code expires in 5 minutes. Do not share it with anyone.\n\n" +
      "If you did not attempt to log in, please contact ADJ immediately.\n\n" +
      "— UT NROTC Battalion";
    MailApp.sendEmail(email, subject, body);

    return jsonOut({ ok: true });
  }

  // ── verifyMFA ─────────────────────────────────────────────────────────────
  if (action === "verifyMFA") {
    var inputCode = (json.code || "").toString().trim();
    var stored    = props.getProperty(propKey);

    if (!stored) return jsonOut({ ok: false, error: "No code found. Request a new one." });

    var record;
    try {
      record = JSON.parse(stored);
    } catch (err2) {
      props.deleteProperty(propKey);
      return jsonOut({ ok: false, error: "Invalid code record." });
    }

    if (Date.now() - record.ts > MFA_EXPIRY_MS) {
      props.deleteProperty(propKey);
      return jsonOut({ ok: false, error: "Code expired. Request a new one." });
    }

    if (inputCode !== record.code) {
      // Wrong guess — leave code intact so user can retry
      return jsonOut({ ok: false, error: "Incorrect code." });
    }

    // Correct — delete code so it can't be reused after a successful login
    props.deleteProperty(propKey);
    return jsonOut({ ok: true });
  }

  return jsonOut({ ok: false, error: "Unknown action" });
}
