const SECRET_TOKEN = "UT_NROTC";
const SHEET_NAME = "MASTER WEBSITE";

const MFA_EXPIRY_MS = 5 * 60 * 1000;

const CACHE_TTL_USERS = 300;      // 5 min
const CACHE_TTL_ROSTER = 21600;   // 6 hr
const CACHE_KEY_USERS = "qd_users_payload_v2";
const CACHE_KEY_ROSTER = "qd_email_name_map_v1";

// These are the fields the website login flow expects to receive.
const PUBLIC_FIELDS = [
  "company",
  "name",
  "class",
  "email",
  "phone_number",
  "major",
  "campus",
  "eid",
  "billet"
];

function jsonOut(obj) {
  var out = ContentService.createTextOutput(JSON.stringify(obj));
  out.setMimeType(ContentService.MimeType.JSON);
  return out;
}

function normalizeHeader(h) {
  return (h || "").toString().trim().toLowerCase().replace(/\s+/g, "_");
}

function getSheetData_() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  if (!sheet) return null;
  return sheet.getDataRange().getValues();
}

function buildSheetCaches_() {
  var data = getSheetData_();
  if (!data || data.length < 2) {
    return {
      usersJson: JSON.stringify({ users: [] }),
      emailNameMap: {}
    };
  }

  var headers = data[0].map(normalizeHeader);
  var headerIndex = {};
  for (var i = 0; i < headers.length; i++) {
    if (headers[i]) headerIndex[headers[i]] = i;
  }

  var nameCol = headerIndex["name"];
  var emailCol = headerIndex["email"];

  var users = [];
  var emailNameMap = {};

  for (var r = 1; r < data.length; r++) {
    var rowVals = data[r];

    var name = nameCol != null ? (rowVals[nameCol] || "").toString().trim() : "";
    if (!name) continue;

    var row = {};
    for (var f = 0; f < PUBLIC_FIELDS.length; f++) {
      var field = PUBLIC_FIELDS[f];
      var col = headerIndex[field];
      if (col != null && col < rowVals.length) {
        row[field] = (rowVals[col] || "").toString().trim();
      }
    }
    users.push(row);

    if (emailCol != null) {
      var email = (rowVals[emailCol] || "").toString().trim().toLowerCase();
      if (email) emailNameMap[email] = name;
    }
  }

  return {
    usersJson: JSON.stringify({ users: users }),
    emailNameMap: emailNameMap
  };
}

function getCachedUsersJson_() {
  var cache = CacheService.getScriptCache();
  var cached = cache.get(CACHE_KEY_USERS);
  if (cached) return cached;

  var built = buildSheetCaches_();
  cache.put(CACHE_KEY_USERS, built.usersJson, CACHE_TTL_USERS);
  try {
    cache.put(CACHE_KEY_ROSTER, JSON.stringify(built.emailNameMap), CACHE_TTL_ROSTER);
  } catch (ignore) {}

  return built.usersJson;
}

function getEmailNameMap() {
  var cache = CacheService.getScriptCache();
  var cached = cache.get(CACHE_KEY_ROSTER);
  if (cached) {
    try { return JSON.parse(cached); } catch (ignore) {}
  }

  var built = buildSheetCaches_();
  try {
    cache.put(CACHE_KEY_USERS, built.usersJson, CACHE_TTL_USERS);
    cache.put(CACHE_KEY_ROSTER, JSON.stringify(built.emailNameMap), CACHE_TTL_ROSTER);
  } catch (ignore) {}

  return built.emailNameMap;
}

function clearCaches() {
  var cache = CacheService.getScriptCache();
  cache.remove(CACHE_KEY_USERS);
  cache.remove(CACHE_KEY_ROSTER);
}

function readActiveMfaRecords_(props, propKey) {
  var stored = props.getProperty(propKey);
  if (!stored) return [];

  var parsed;
  try {
    parsed = JSON.parse(stored);
  } catch (err) {
    props.deleteProperty(propKey);
    return [];
  }

  var records = Array.isArray(parsed) ? parsed : [parsed];
  var cutoff = Date.now() - MFA_EXPIRY_MS;
  var active = records.filter(function(record) {
    return record &&
      typeof record.code === "string" &&
      record.code &&
      typeof record.ts === "number" &&
      record.ts >= cutoff;
  });

  if (active.length > 0) {
    props.setProperty(propKey, JSON.stringify(active));
  } else {
    props.deleteProperty(propKey);
  }

  return active;
}

// ─── Pending Approval Tracking (for reminder emails) ────────────────────────
// Stored in PropertiesService as JSON under key "qd_pending_approvals"
// Each entry: { id, type, approverEmail, approverName, submitterName, createdAt }

function getPendingApprovals_() {
  var props = PropertiesService.getScriptProperties();
  var raw = props.getProperty("qd_pending_approvals");
  if (!raw) return [];
  try { return JSON.parse(raw); } catch (e) { return []; }
}

function savePendingApprovals_(list) {
  var props = PropertiesService.getScriptProperties();
  props.setProperty("qd_pending_approvals", JSON.stringify(list));
}

function isBusinessDay_(date) {
  var day = date.getDay();
  return day !== 0 && day !== 6;
}

function businessDaysSince_(dateStr) {
  var start = new Date(dateStr);
  var now = new Date();
  var count = 0;
  var d = new Date(start);
  d.setDate(d.getDate() + 1);
  while (d <= now) {
    if (isBusinessDay_(d)) count++;
    d.setDate(d.getDate() + 1);
  }
  return count;
}

// Time-based trigger function — set up via Apps Script Triggers UI:
//   checkPendingReminders, Time-driven, Day timer, 8am-9am
function checkPendingReminders() {
  var pending = getPendingApprovals_();
  if (pending.length === 0) return;

  var now = new Date();
  if (!isBusinessDay_(now)) return;

  var toRemind = [];
  var remaining = [];

  for (var i = 0; i < pending.length; i++) {
    var p = pending[i];
    var threshold = (typeof p.reminderDays === "number") ? p.reminderDays : 1;
    // reminderDays=0 means reminders are disabled for this approver
    if (threshold <= 0) { remaining.push(p); continue; }
    var bizDays = businessDaysSince_(p.createdAt);
    if (bizDays >= threshold) {
      toRemind.push(p);
      // Keep in list — will be reminded again tomorrow if still pending
      remaining.push(p);
    } else {
      remaining.push(p);
    }
  }

  for (var j = 0; j < toRemind.length; j++) {
    var r = toRemind[j];
    var typeLabel = r.type === "FITREP" ? "FITREP" : "CHIT";
    var subject = "Reminder: " + typeLabel + " " + r.id + " awaiting your approval";
    var body =
      "Hello " + r.approverName + ",\n\n" +
      typeLabel + " " + r.id + " from " + r.submitterName + " is awaiting your approval.\n\n" +
      "Please log in to The Quarterdeck to review and take action.\n\n" +
      "— The Quarterdeck";

    try {
      MailApp.sendEmail(r.approverEmail, subject, body);
    } catch (ignore) {}
  }

  savePendingApprovals_(remaining);
}

function doGet(e) {
  if (!e || !e.parameter || e.parameter.token !== SECRET_TOKEN) {
    return jsonOut({ error: "Unauthorized" });
  }

  var result = getCachedUsersJson_();
  var callback = e.parameter.callback;

  if (callback) {
    var out = ContentService.createTextOutput(callback + "(" + result + ")");
    out.setMimeType(ContentService.MimeType.JAVASCRIPT);
    return out;
  }

  var out = ContentService.createTextOutput(result);
  out.setMimeType(ContentService.MimeType.JSON);
  return out;
}

function doPost(e) {
  var json;
  try {
    json = JSON.parse(e.postData.contents);
  } catch (err) {
    return jsonOut({ ok: false, error: "Invalid JSON" });
  }

  if (!json || json.token !== SECRET_TOKEN) {
    return jsonOut({ ok: false, error: "Unauthorized" });
  }

  var action = json.action || "";

  if (action === "refreshCache") {
    clearCaches();
    getCachedUsersJson_();
    return jsonOut({ ok: true });
  }

  // ── Send notification email ──────────────────────────────────────────────
  if (action === "notify") {
    var to = (json.to || "").toString().trim();
    var subject = (json.subject || "").toString().trim();
    var body = (json.body || "").toString().trim();
    if (!to || !subject || !body) {
      return jsonOut({ ok: false, error: "to, subject, and body required" });
    }
    try {
      MailApp.sendEmail(to, subject, body);
    } catch (err) {
      return jsonOut({ ok: false, error: "Failed to send email: " + err.message });
    }
    return jsonOut({ ok: true });
  }

  // ── Track a pending approval (for reminder emails) ───────────────────────
  if (action === "trackApproval") {
    var reminderDays = parseInt(json.reminderDays);
    if (isNaN(reminderDays) || reminderDays < 0) reminderDays = 1;
    var entry = {
      id: (json.id || "").toString().trim(),
      type: (json.type || "CHIT").toString().trim(),
      approverEmail: (json.approverEmail || "").toString().trim().toLowerCase(),
      approverName: (json.approverName || "").toString().trim(),
      submitterName: (json.submitterName || "").toString().trim(),
      reminderDays: reminderDays,
      createdAt: new Date().toISOString()
    };
    if (!entry.id || !entry.approverEmail) {
      return jsonOut({ ok: false, error: "id and approverEmail required" });
    }
    var pending = getPendingApprovals_();
    // Remove any existing entry for same id (stage advanced)
    pending = pending.filter(function(p) { return p.id !== entry.id; });
    pending.push(entry);
    savePendingApprovals_(pending);
    return jsonOut({ ok: true });
  }

  // ── Clear a pending approval (approved/returned/completed) ───────────────
  if (action === "clearApproval") {
    var clearId = (json.id || "").toString().trim();
    if (!clearId) return jsonOut({ ok: false, error: "id required" });
    var pending = getPendingApprovals_();
    pending = pending.filter(function(p) { return p.id !== clearId; });
    savePendingApprovals_(pending);
    return jsonOut({ ok: true });
  }

  // ── MFA ──────────────────────────────────────────────────────────────────
  var email = (json.email || "").toString().trim().toLowerCase();
  if (!email) return jsonOut({ ok: false, error: "Email required" });

  var props = PropertiesService.getScriptProperties();
  var propKey = "mfa_" + email;

  if (action === "sendMFA") {
    var map = getEmailNameMap();
    var userName = (json.name || "").toString().trim() || map[email];
    if (!userName && map[email] === undefined) {
      return jsonOut({ ok: false, error: "Email not found" });
    }

    var code = Math.floor(100000 + Math.random() * 900000).toString();
    var records = readActiveMfaRecords_(props, propKey);
    records.push({ code: code, ts: Date.now() });
    props.setProperty(propKey, JSON.stringify(records));

    var subject = "UT NROTC Quarterdeck — Your Verification Code";
    var body =
      "Hello " + userName + ",\n\n" +
      "Your one-time verification code is:\n\n" +
      "    " + code + "\n\n" +
      "This code expires in 5 minutes. Do not share it with anyone.\n\n" +
      "— The Quarterdeck";

    MailApp.sendEmail(email, subject, body);
    return jsonOut({ ok: true });
  }

  if (action === "verifyMFA") {
    var inputCode = (json.code || "").toString().trim();
    var records = readActiveMfaRecords_(props, propKey);

    if (records.length === 0) {
      return jsonOut({ ok: false, error: "Code expired. Request a new one." });
    }

    var matched = records.some(function(record) {
      return inputCode === record.code;
    });
    if (!matched) {
      return jsonOut({ ok: false, error: "Incorrect code." });
    }

    props.deleteProperty(propKey);
    return jsonOut({ ok: true });
  }

  return jsonOut({ ok: false, error: "Unknown action" });
}
