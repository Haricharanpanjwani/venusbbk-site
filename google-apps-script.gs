function getOrCreateSheet_() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheetName = "Inquiries";
  let sheet = spreadsheet.getSheetByName(sheetName);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(sheetName);
  }

  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      "submitted_at",
      "name",
      "phone",
      "event_type",
      "expected_guests",
      "number_of_days",
      "description",
    ]);
  }

  return sheet;
}

function doPost(e) {
  const sheet = getOrCreateSheet_();
  const data = e.parameter || {};

  const submittedAt = data.submittedAt || new Date().toISOString();
  const name = (data.name || "").trim();
  const phone = (data.phone || "").trim();

  if (!name || !phone) {
    return ContentService.createTextOutput(
      JSON.stringify({
        ok: false,
        message: "Name and phone are required.",
      }),
    ).setMimeType(ContentService.MimeType.JSON);
  }

  sheet.appendRow([
    submittedAt,
    name,
    phone,
    (data.eventType || "").trim(),
    (data.expectedGuests || "").trim(),
    (data.numberOfDays || "").trim(),
    (data.description || "").trim(),
  ]);

  return ContentService.createTextOutput(
    JSON.stringify({
      ok: true,
      message: "Inquiry saved.",
    }),
  ).setMimeType(ContentService.MimeType.JSON);
}
