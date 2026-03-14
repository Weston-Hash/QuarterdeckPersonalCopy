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

// Hardcoded column order: A→J
// No header row in the sheet — first row is data
var COLUMNS = ["company", "name", "class", "email", "phone_number", "major", "campus", "eid", "password", "billet"];

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
  if (data.length < 1) {
    output = ContentService.createTextOutput(JSON.stringify({ users: [] }));
    output.setMimeType(ContentService.MimeType.JSON);
    return output;
  }

  var users = [];
  // Start from row 0 — no header row
  for (var i = 0; i < data.length; i++) {
    var name = (data[i][1] || "").toString().trim();
    if (!name) continue; // skip empty rows

    var row = {};
    for (var j = 0; j < COLUMNS.length && j < data[i].length; j++) {
      row[COLUMNS[j]] = (data[i][j] || "").toString().trim();
    }
    users.push(row);
  }

  output = ContentService.createTextOutput(JSON.stringify({ users: users }));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}

// ─── MFA ─────────────────────────────────────────────────────────────────────
// POST body: { token, action, email [, code] }
//   action="sendMFA"   → generate 6-digit code, store with 5-min expiry, email it
//   action="verifyMFA" → validate code, delete on use, return ok/error

var MFA_EXPIRY_MS = 5 * 60 * 1000; // 5 minutes

function doPost(e) {
  var output;
  var json;
  try {
    json = JSON.parse(e.postData.contents);
  } catch (err) {
    output = ContentService.createTextOutput(JSON.stringify({ ok: false, error: "Invalid JSON" }));
    output.setMimeType(ContentService.MimeType.JSON);
    return output;
  }

  if (!json || json.token !== SECRET_TOKEN) {
    output = ContentService.createTextOutput(JSON.stringify({ ok: false, error: "Unauthorized" }));
    output.setMimeType(ContentService.MimeType.JSON);
    return output;
  }

  var action = json.action || "";
  var email  = (json.email || "").toString().trim().toLowerCase();

  if (!email) {
    output = ContentService.createTextOutput(JSON.stringify({ ok: false, error: "Email required" }));
    output.setMimeType(ContentService.MimeType.JSON);
    return output;
  }

  // Verify email exists in the roster (column D, index 3)
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  var data  = sheet ? sheet.getDataRange().getValues() : [];
  var found = false;
  var userName = "";
  for (var i = 0; i < data.length; i++) {
    var rowEmail = (data[i][3] || "").toString().trim().toLowerCase();
    if (rowEmail === email) {
      found    = true;
      userName = (data[i][1] || "").toString().trim();
      break;
    }
  }

  if (!found) {
    output = ContentService.createTextOutput(JSON.stringify({ ok: false, error: "Email not found" }));
    output.setMimeType(ContentService.MimeType.JSON);
    return output;
  }

  var props = PropertiesService.getScriptProperties();
  var propKey = "mfa_" + email;

  if (action === "sendMFA") {
    // Rate-limit: block resend if a valid code was sent in the last 60 seconds
    var existing = props.getProperty(propKey);
    if (existing) {
      try {
        var prev = JSON.parse(existing);
        if (Date.now() - prev.ts < 60 * 1000) {
          output = ContentService.createTextOutput(JSON.stringify({ ok: false, error: "Please wait before requesting another code." }));
          output.setMimeType(ContentService.MimeType.JSON);
          return output;
        }
      } catch (ignore) {}
    }

    // Generate 6-digit code
    var code = Math.floor(100000 + Math.random() * 900000).toString();
    props.setProperty(propKey, JSON.stringify({ code: code, ts: Date.now() }));

    // Send email
    var subject = "UT NROTC Quarterdeck — Your Verification Code";
    var body =
      "Hello " + userName + ",\n\n" +
      "Your one-time verification code is:\n\n" +
      "    " + code + "\n\n" +
      "This code expires in 5 minutes. Do not share it with anyone.\n\n" +
      "If you did not attempt to log in, please contact your S1 immediately.\n\n" +
      "— UT NROTC Battalion";
    MailApp.sendEmail(email, subject, body);

    output = ContentService.createTextOutput(JSON.stringify({ ok: true }));
    output.setMimeType(ContentService.MimeType.JSON);
    return output;
  }

  if (action === "verifyMFA") {
    var inputCode = (json.code || "").toString().trim();
    var stored    = props.getProperty(propKey);

    // Always delete the stored code after a verify attempt to prevent brute force
    props.deleteProperty(propKey);

    if (!stored) {
      output = ContentService.createTextOutput(JSON.stringify({ ok: false, error: "No code found. Request a new one." }));
      output.setMimeType(ContentService.MimeType.JSON);
      return output;
    }

    var record;
    try {
      record = JSON.parse(stored);
    } catch (err2) {
      output = ContentService.createTextOutput(JSON.stringify({ ok: false, error: "Invalid code record." }));
      output.setMimeType(ContentService.MimeType.JSON);
      return output;
    }

    if (Date.now() - record.ts > MFA_EXPIRY_MS) {
      output = ContentService.createTextOutput(JSON.stringify({ ok: false, error: "Code expired. Request a new one." }));
      output.setMimeType(ContentService.MimeType.JSON);
      return output;
    }

    if (inputCode !== record.code) {
      output = ContentService.createTextOutput(JSON.stringify({ ok: false, error: "Incorrect code." }));
      output.setMimeType(ContentService.MimeType.JSON);
      return output;
    }

    output = ContentService.createTextOutput(JSON.stringify({ ok: true }));
    output.setMimeType(ContentService.MimeType.JSON);
    return output;
  }

  output = ContentService.createTextOutput(JSON.stringify({ ok: false, error: "Unknown action" }));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}
