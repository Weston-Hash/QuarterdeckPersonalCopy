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

const SECRET_TOKEN = "CHANGE_ME_TO_A_RANDOM_STRING"; // ← change this!
const SHEET_NAME   = "Sglt";                          // ← your tab name

function doGet(e) {
  // CORS headers for browser fetch
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

  // Normalize headers from row 1
  var headers = data[0].map(function(h) {
    return h.toString().trim().toLowerCase().replace(/\s+/g, "_");
  });
  // Expected after normalization: company, name, class, email, phone_number, major, campus, eid, password, billet

  var users = [];
  for (var i = 1; i < data.length; i++) {
    var name = (data[i][1] || "").toString().trim();
    if (!name) continue; // skip empty rows

    var row = {};
    for (var j = 0; j < headers.length; j++) {
      row[headers[j]] = (data[i][j] || "").toString().trim();
    }
    users.push(row);
  }

  output = ContentService.createTextOutput(JSON.stringify({ users: users }));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}
