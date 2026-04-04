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
  "password",
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

  var email = (json.email || "").toString().trim().toLowerCase();
  if (!email) return jsonOut({ ok: false, error: "Email required" });

  var props = PropertiesService.getScriptProperties();
  var propKey = "mfa_" + email;

  if (action === "sendMFA") {
    var map = getEmailNameMap();
    var userName = map[email];
    if (userName === undefined) {
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
      "This code expires in 5 minutes. Do not share it with anyone.";

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
