/**
 * Driftmates desk sheet.
 *
 * Bound to the Driftmates spreadsheet. Journey notes go on the Queries
 * sheet. Applications go on the Careers sheet.
 *
 * After editing: Deploy → Manage deployments → pencil → New version → Deploy.
 * Leave SHEET_ID blank while this script stays bound to the spreadsheet.
 */
const SHEET_ID = "";

const INK = "#241e18";
const CREAM = "#f6f3ee";
const PAPER = "#fffcf8";
const GREEN = "#1a4731";
const GOLD = "#9a7340";

const QUERIES_TAB = "Queries";
const QUERIES_HEADERS = ["Time", "Name", "Phone", "Email", "Journey", "Group size", "When", "Note", "Page"];
const CAREERS_TAB = "Careers";
const CAREERS_HEADERS = ["Time", "Name", "Phone", "Email", "Role", "Experience", "Location", "LinkedIn", "About", "Page"];

function doGet() {
  try {
    refresh_();
  } catch (err) {
    return json_({ ok: false, error: String(err && err.message ? err.message : err) });
  }
  return json_({ ok: true, service: "Driftmates desk" });
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(15000);
  try {
    const data = parseBody_(e);
    if (!data.name || !data.phone || !data.email) {
      return json_({ ok: false, error: "Name, phone, and email are required." });
    }
    if (data.kind === "career") {
      if (!data.role) return json_({ ok: false, error: "Role is required." });
      appendCareer_(data);
    } else {
      appendQuery_(data);
    }
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err && err.message ? err.message : err) });
  } finally {
    lock.releaseLock();
  }
}

function appendQuery_(data) {
  const sheet = tab_(QUERIES_TAB, QUERIES_HEADERS, GREEN);
  writeNewest_(sheet, [
    stamp_(),
    cell_(data.name),
    cell_(data.phone),
    cell_(data.email),
    cell_(data.journey),
    cell_(data.group),
    cell_(data.when),
    cell_(data.note),
    cell_(data.page),
  ]);
  paint_(sheet, QUERIES_HEADERS);
}

function appendCareer_(data) {
  const sheet = tab_(CAREERS_TAB, CAREERS_HEADERS, GOLD);
  writeNewest_(sheet, [
    stamp_(),
    cell_(data.name),
    cell_(data.phone),
    cell_(data.email),
    cell_(data.role),
    cell_(data.experience),
    cell_(data.place),
    cell_(data.portfolio),
    cell_(data.note),
    cell_(data.page),
  ]);
  paint_(sheet, CAREERS_HEADERS);
}

function writeNewest_(sheet, values) {
  if (sheet.getLastRow() < 1) {
    sheet.appendRow(values);
    return;
  }
  sheet.insertRowAfter(1);
  sheet.getRange(2, 1, 1, values.length).setValues([values]);
  newestFirst_(sheet);
}

function newestFirst_(sheet) {
  const last = sheet.getLastRow();
  if (last < 3) return;
  sheet.getRange(2, 1, last - 1, sheet.getLastColumn()).sort({ column: 1, ascending: false });
}

function stamp_() {
  return Utilities.formatDate(new Date(), "Asia/Kolkata", "yyyy-MM-dd HH:mm:ss");
}

function file_() {
  const file = SHEET_ID
    ? SpreadsheetApp.openById(SHEET_ID)
    : SpreadsheetApp.getActiveSpreadsheet();
  if (!file) throw new Error("Bind this script to the Driftmates spreadsheet, or set SHEET_ID.");
  return file;
}

function tab_(name, headers, tabColor) {
  const file = file_();
  let sheet = file.getSheetByName(name);
  if (!sheet && name === QUERIES_TAB) {
    const older = file.getSheetByName("Enquiries");
    if (older) {
      older.setName(QUERIES_TAB);
      sheet = older;
    }
  }
  if (!sheet) sheet = file.insertSheet(name);
  sheet.setTabColor(tabColor);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
  } else if (sheet.getLastRow() === 1) {
    const width = Math.max(sheet.getLastColumn(), headers.length);
    const current = sheet.getRange(1, 1, 1, width).getValues()[0];
    const same = headers.every(function (header, i) { return current[i] === header; });
    if (!same) {
      sheet.getRange(1, 1, 1, Math.max(width, headers.length)).clearContent();
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    }
  }
  paint_(sheet, headers);
  return sheet;
}

const WIDTH = {
  Time: 176,
  Name: 180,
  Phone: 150,
  Email: 260,
  Journey: 340,
  "Group size": 120,
  When: 200,
  Note: 520,
  Page: 160,
  Role: 220,
  Experience: 130,
  Location: 180,
  LinkedIn: 320,
  About: 520,
};

function refresh_() {
  const file = file_();
  const queries = file.getSheetByName(QUERIES_TAB) || file.getSheetByName("Enquiries");
  if (queries) {
    if (queries.getName() !== QUERIES_TAB) queries.setName(QUERIES_TAB);
    queries.setTabColor(GREEN);
    newestFirst_(queries);
    paint_(queries, QUERIES_HEADERS);
  }
  const careers = file.getSheetByName(CAREERS_TAB);
  if (careers) {
    careers.setTabColor(GOLD);
    newestFirst_(careers);
    paint_(careers, CAREERS_HEADERS);
  }
}

function paint_(sheet, headers) {
  const cols = headers.length;
  const rows = Math.max(sheet.getLastRow(), 1);
  const body = sheet.getRange(1, 1, rows, cols);
  body
    .setFontFamily("Arial")
    .setFontSize(11)
    .setFontColor(INK)
    .setHorizontalAlignment("left")
    .setVerticalAlignment("top")
    .setWrap(true);

  const header = sheet.getRange(1, 1, 1, cols);
  header
    .setBackground(GREEN)
    .setFontColor(CREAM)
    .setFontFamily("Georgia")
    .setFontSize(12)
    .setFontWeight("bold")
    .setVerticalAlignment("middle")
    .setBorder(false, false, true, false, false, false, GOLD, SpreadsheetApp.BorderStyle.SOLID_MEDIUM);

  if (rows > 1) {
    const data = sheet.getRange(2, 1, rows - 1, cols);
    const backgrounds = [];
    for (let r = 0; r < rows - 1; r++) {
      const tone = r % 2 === 0 ? PAPER : CREAM;
      const line = [];
      for (let c = 0; c < cols; c++) line.push(tone);
      backgrounds.push(line);
    }
    data.setBackgrounds(backgrounds).setFontWeight("normal");
  }

  sheet.setFrozenRows(1);
  sheet.setRowHeight(1, 42);
  headers.forEach(function (header, i) {
    sheet.setColumnWidth(i + 1, WIDTH[header] || 180);
  });
  if (rows > 1) sheet.autoResizeRows(2, rows - 1);
}

function parseBody_(e) {
  const raw = e && e.postData && e.postData.contents;
  if (!raw) throw new Error("Empty enquiry.");
  const data = JSON.parse(raw);
  return {
    kind: text_(data.kind),
    name: text_(data.name),
    phone: text_(data.phone),
    email: text_(data.email),
    journey: text_(data.journey),
    group: text_(data.group),
    when: text_(data.when),
    note: text_(data.note),
    role: text_(data.role),
    experience: text_(data.experience),
    place: text_(data.place),
    portfolio: text_(data.portfolio),
    page: text_(data.page),
  };
}

function text_(value) {
  return String(value == null ? "" : value).trim().slice(0, 2000);
}

function cell_(value) {
  if (/^[=+\-@]/.test(value)) return "'" + value;
  return value;
}

function json_(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
