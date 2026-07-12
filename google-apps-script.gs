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
      "email",
      "event_type",
      "preferred_date",
      "alternate_date",
      "expected_guests",
      "space_preference",
      "rooms_required",
      "number_of_days",
      "preferred_contact_method",
      "description",
      "source_page",
    ]);
  }

  return sheet;
}

function sendInquiryEmail_(payload) {
  const recipient = "haricharan.panjwani@gmail.com";
  const subject = "New Venus Club Inquiry";
  const lines = [
    "A new inquiry was submitted on venusbbk.com.",
    "",
    "Name: " + (payload.name || ""),
    "Phone: " + (payload.phone || ""),
    "Email: " + (payload.email || ""),
    "Event type: " + (payload.eventType || ""),
    "Preferred date: " + (payload.preferredDate || ""),
    "Alternate date: " + (payload.alternateDate || ""),
    "Expected guests: " + (payload.expectedGuests || ""),
    "Indoor / outdoor preference: " + (payload.spacePreference || ""),
    "Rooms required: " + (payload.roomsRequired || ""),
    "Number of days: " + (payload.numberOfDays || ""),
    "Preferred contact method: " + (payload.preferredContactMethod || ""),
    "Source page: " + (payload.sourcePage || ""),
    "",
    "Message:",
    payload.description || "",
  ];

  MailApp.sendEmail({
    to: recipient,
    subject: subject,
    body: lines.join("\n"),
    replyTo: payload.email || undefined,
    name: "Venus Club Website",
  });
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
    (data.email || "").trim(),
    (data.eventType || "").trim(),
    (data.preferredDate || "").trim(),
    (data.alternateDate || "").trim(),
    (data.expectedGuests || "").trim(),
    (data.spacePreference || "").trim(),
    (data.roomsRequired || "").trim(),
    (data.numberOfDays || "").trim(),
    (data.preferredContactMethod || "").trim(),
    (data.description || "").trim(),
    (data.sourcePage || "").trim(),
  ]);

  sendInquiryEmail_({
    submittedAt: submittedAt,
    name: name,
    phone: phone,
    email: (data.email || "").trim(),
    eventType: (data.eventType || "").trim(),
    preferredDate: (data.preferredDate || "").trim(),
    alternateDate: (data.alternateDate || "").trim(),
    expectedGuests: (data.expectedGuests || "").trim(),
    spacePreference: (data.spacePreference || "").trim(),
    roomsRequired: (data.roomsRequired || "").trim(),
    numberOfDays: (data.numberOfDays || "").trim(),
    preferredContactMethod: (data.preferredContactMethod || "").trim(),
    description: (data.description || "").trim(),
    sourcePage: (data.sourcePage || "").trim(),
  });

  return ContentService.createTextOutput(
    JSON.stringify({
      ok: true,
      message: "Inquiry saved and emailed.",
    }),
  ).setMimeType(ContentService.MimeType.JSON);
}
