#!/usr/bin/env node
/**
 * send_passwords.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Generates random passwords for all personnel, updates their records in the
 * Google Sheet, and emails each person their new credentials.
 *
 * SETUP:
 *   1.  npm install nodemailer googleapis
 *   2.  Fill in the CONFIG block below.
 *   3.  Run:  node send_passwords.js
 *             or: node send_passwords.js --dry-run   (prints without sending)
 *
 * EMAIL SOURCE: By default uses Gmail SMTP with an App Password.
 *   Google account → Security → 2-Step Verification → App Passwords → create one.
 *
 * GOOGLE SHEETS WRITE:
 *   Requires a Google Service Account with editor access to the sheet.
 *   Download the service account JSON key and set GOOGLE_KEY_FILE below.
 * ─────────────────────────────────────────────────────────────────────────────
 */

const nodemailer = require("nodemailer");
const { google }  = require("googleapis");
const fs          = require("fs");

// ─── CONFIG ──────────────────────────────────────────────────
const CONFIG = {
  // Gmail SMTP credentials (use an App Password, NOT your login password)
  smtpUser:     "your-email@gmail.com",
  smtpPass:     "your-app-password-here",
  fromName:     "UT NROTC Battalion",

  // Google Sheets (for writing passwords back to the roster sheet)
  // Leave SPREADSHEET_ID empty to skip the Sheets write step.
  spreadsheetId:  "",                    // e.g. "1Hlbb_9hW6h2NQ8Fn8nIA2f-kF6nnppUL4Jwipr7TIp4"
  sheetName:      "Sheet1",             // tab name
  googleKeyFile:  "./service-account.json",  // path to service account JSON

  // Only send to users whose mustChangePassword column is TRUE in the sheet.
  // Set to false to send to ALL users in USERS_TO_SEND below.
  onlyMustChange: true,
};

// ─── PASTE FULL USERS ARRAY HERE (copy from ut_app_basecode.jsx) ─────────────
// Or read from an exported CSV / Google Sheet instead.
const USERS_TO_SEND = [
  // Example — replace with your full USERS array:
  // { id:"u001", name:"Hinz", rank:"MIDN 1/C", email:"bnco.utnrotc@gmail.com", mustChangePassword: true },
];

// ─── PASSWORD GENERATOR ───────────────────────────────────────
function generatePassword() {
  const chars = "ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#";
  return Array.from({ length: 10 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}

// ─── EMAIL TEMPLATE ───────────────────────────────────────────
function buildEmail(user, password) {
  return {
    from:    `"${CONFIG.fromName}" <${CONFIG.smtpUser}>`,
    to:      user.email,
    subject: "UT NROTC Battalion App — Your Login Credentials",
    text: [
      `${user.rank} ${user.name},`,
      "",
      "Your UT NROTC Battalion App account has been created.",
      "",
      `  Login:    ${user.email}  (or your last name: ${user.name.split(",")[0]})`,
      `  Password: ${password}`,
      "",
      "You will be required to set a new password on your first login.",
      "",
      "Access the app at: [INSERT APP URL HERE]",
      "",
      "Contact your S1 (ADJ) if you have any issues.",
      "",
      "Semper Fi / Fair Winds",
      "UT NROTC S1",
    ].join("\n"),
    html: `
      <div style="font-family:Arial,sans-serif;max-width:480px;margin:0 auto">
        <div style="background:#1A1209;padding:16px 20px;border-bottom:3px solid #BF5700">
          <span style="font-family:Georgia,serif;font-weight:700;font-size:1.1rem;color:white;letter-spacing:2px">UT NROTC BATTALION</span>
        </div>
        <div style="padding:24px 20px;background:#fffdf9">
          <p>${user.rank} ${user.name},</p>
          <p>Your UT NROTC Battalion App account has been created.</p>
          <table style="background:#f5f2ee;border-radius:8px;padding:14px 18px;margin:16px 0;width:100%">
            <tr><td style="font-size:0.78rem;color:#888;text-transform:uppercase;padding-right:12px">Login</td>
                <td><strong>${user.email}</strong></td></tr>
            <tr><td style="font-size:0.78rem;color:#888;text-transform:uppercase;padding-right:12px">Password</td>
                <td><strong style="font-family:monospace;font-size:1.05rem">${password}</strong></td></tr>
          </table>
          <p style="color:#BF5700;font-size:0.88rem">⚠ You will be required to set a new password on your first login.</p>
          <p><a href="#" style="background:#BF5700;color:white;padding:10px 20px;border-radius:6px;text-decoration:none;font-weight:bold">Sign In to the App →</a></p>
          <hr style="border:none;border-top:1px solid #eee;margin:20px 0">
          <p style="font-size:0.82rem;color:#888">Contact your S1 (ADJ) if you have any issues accessing your account.</p>
        </div>
      </div>
    `,
  };
}

// ─── GOOGLE SHEETS WRITE ─────────────────────────────────────
async function writePasswordsToSheet(results) {
  if (!CONFIG.spreadsheetId || !fs.existsSync(CONFIG.googleKeyFile)) {
    console.log("[Sheets] Skipping — no spreadsheet ID or key file configured.");
    return;
  }
  const auth = new google.auth.GoogleAuth({
    keyFile: CONFIG.googleKeyFile,
    scopes:  ["https://www.googleapis.com/auth/spreadsheets"],
  });
  const sheets = google.sheets({ version:"v4", auth: await auth.getClient() });

  // Read header row to find column indices
  const headerRes = await sheets.spreadsheets.values.get({
    spreadsheetId: CONFIG.spreadsheetId,
    range: `${CONFIG.sheetName}!1:1`,
  });
  const headers = (headerRes.data.values?.[0] || []).map(h => h.toLowerCase());
  const passCol = headers.indexOf("password");
  const mcpCol  = headers.indexOf("mustchangepassword");

  if (passCol < 0) { console.error("[Sheets] 'password' column not found in sheet."); return; }

  // Read all rows to find matching IDs
  const dataRes = await sheets.spreadsheets.values.get({
    spreadsheetId: CONFIG.spreadsheetId,
    range: `${CONFIG.sheetName}!A:Z`,
  });
  const rows = dataRes.data.values || [];
  const idCol = headers.indexOf("id");

  const updates = [];
  for (const { user, password } of results) {
    const rowIdx = rows.findIndex((r, i) => i > 0 && r[idCol] === user.id);
    if (rowIdx < 0) continue;
    const rowNum = rowIdx + 1; // 1-indexed
    // Update password column
    updates.push({
      range: `${CONFIG.sheetName}!${colLetter(passCol)}${rowNum}`,
      values: [[password]],
    });
    // Set mustChangePassword = TRUE
    if (mcpCol >= 0) {
      updates.push({
        range: `${CONFIG.sheetName}!${colLetter(mcpCol)}${rowNum}`,
        values: [["TRUE"]],
      });
    }
  }

  if (updates.length > 0) {
    await sheets.spreadsheets.values.batchUpdate({
      spreadsheetId: CONFIG.spreadsheetId,
      resource: { valueInputOption:"RAW", data: updates },
    });
    console.log(`[Sheets] Updated ${updates.length / (mcpCol >= 0 ? 2 : 1)} rows.`);
  }
}

function colLetter(idx) {
  // Convert 0-based column index to letter (A=0, Z=25, AA=26, ...)
  let s = "";
  idx++;
  while (idx > 0) { s = String.fromCharCode(64 + (idx % 26 || 26)) + s; idx = Math.floor((idx - 1) / 26); }
  return s;
}

// ─── MAIN ─────────────────────────────────────────────────────
async function main() {
  const dryRun = process.argv.includes("--dry-run");
  const targets = CONFIG.onlyMustChange
    ? USERS_TO_SEND.filter(u => u.mustChangePassword)
    : USERS_TO_SEND;

  if (targets.length === 0) {
    console.log("No users to process. Check USERS_TO_SEND and CONFIG.onlyMustChange.");
    return;
  }

  console.log(`Processing ${targets.length} user(s)${dryRun ? " [DRY RUN — no emails sent]" : ""}...`);

  // Generate passwords
  const results = targets.map(u => ({ user: u, password: generatePassword() }));

  // Print summary
  console.log("\n─── Generated Credentials ───────────────────────");
  for (const { user, password } of results) {
    console.log(`  ${user.rank.padEnd(12)} ${user.name.padEnd(20)} ${user.email.padEnd(35)} → ${password}`);
  }
  console.log("─────────────────────────────────────────────────\n");

  if (dryRun) {
    console.log("Dry run complete. Remove --dry-run to send emails.");
    return;
  }

  // Send emails
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: CONFIG.smtpUser, pass: CONFIG.smtpPass },
  });

  let sent = 0, failed = 0;
  for (const { user, password } of results) {
    try {
      await transporter.sendMail(buildEmail(user, password));
      console.log(`  ✓ Sent → ${user.email}`);
      sent++;
    } catch (err) {
      console.error(`  ✗ Failed → ${user.email}: ${err.message}`);
      failed++;
    }
  }

  console.log(`\nDone. Sent: ${sent}, Failed: ${failed}`);

  // Write new passwords back to Google Sheets
  await writePasswordsToSheet(results);
}

main().catch(err => { console.error(err); process.exit(1); });
