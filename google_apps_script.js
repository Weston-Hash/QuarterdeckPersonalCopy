const SECRET_TOKEN = "UT_NROTC";
const SHEET_NAME = "MASTER WEBSITE";

const CACHE_TTL_USERS = 300;      // 5 min
const CACHE_KEY_USERS = "qd_users_payload_v2";

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
    return { usersJson: JSON.stringify({ users: [] }) };
  }

  var headers = data[0].map(normalizeHeader);
  var headerIndex = {};
  for (var i = 0; i < headers.length; i++) {
    if (headers[i]) headerIndex[headers[i]] = i;
  }

  var nameCol = headerIndex["name"];
  var users = [];

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
  }

  return { usersJson: JSON.stringify({ users: users }) };
}

function getCachedUsersJson_() {
  var cache = CacheService.getScriptCache();
  var cached = cache.get(CACHE_KEY_USERS);
  if (cached) return cached;

  var built = buildSheetCaches_();
  cache.put(CACHE_KEY_USERS, built.usersJson, CACHE_TTL_USERS);
  return built.usersJson;
}

function clearCaches() {
  var cache = CacheService.getScriptCache();
  cache.remove(CACHE_KEY_USERS);
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

  return jsonOut({ ok: false, error: "Unknown action" });
}
