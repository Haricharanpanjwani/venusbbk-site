const SPREADSHEET_ID = "19Alx0A86kjyc8JCR0f3DS0uVgxPHjpc4iApsYOeV7Ww";
const INVALID_NAME_VALUES = new Set([
  "abc",
  "asdf",
  "asdfg",
  "demo",
  "dummy",
  "fake",
  "guest",
  "name",
  "na",
  "none",
  "nobody",
  "no name",
  "not sure",
  "null",
  "qwerty",
  "sample",
  "test",
  "testing",
  "unknown",
  "user",
  "visitor",
  "xxx",
  "xyz",
]);
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function digitsOnly_(value) {
  return String(value || "").replace(/\D/g, "");
}

function hasRepeatedCharacters_(value) {
  return /(.)\1{2,}/i.test(String(value || ""));
}

function isValidName_(value) {
  const raw = String(value || "").trim();
  const normalized = raw.toLowerCase().replace(/[^a-z\s'-]/g, " ").replace(/\s+/g, " ").trim();
  const lettersOnly = normalized.replace(/[^a-z]/g, "");
  const parts = normalized.split(" ").filter(Boolean);

  if (lettersOnly.length < 3 || !parts.length) {
    return false;
  }

  if (INVALID_NAME_VALUES.has(normalized) || INVALID_NAME_VALUES.has(lettersOnly)) {
    return false;
  }

  if (parts.length === 1 && parts[0].length <= 3) {
    return false;
  }

  if (hasRepeatedCharacters_(lettersOnly)) {
    return false;
  }

  if (/^[A-Z]{2,4}$/.test(raw)) {
    return false;
  }

  return /[a-z]/i.test(raw);
}

function isValidPhone_(value) {
  const digits = digitsOnly_(value);
  return digits.length >= 10 && digits.length <= 15;
}

function isValidEmail_(value) {
  return !value || EMAIL_PATTERN.test(String(value).trim());
}

function getOrCreateSheet_() {
  // Use a fixed sheet so the deployed web app always writes to the correct spreadsheet.
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
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
  const email = (data.email || "").trim();

  if (!name || !phone) {
    return ContentService.createTextOutput(
      JSON.stringify({
        ok: false,
        message: "Name and phone are required.",
      }),
    ).setMimeType(ContentService.MimeType.JSON);
  }

  if (!isValidName_(name)) {
    return ContentService.createTextOutput(
      JSON.stringify({
        ok: false,
        message: "Please enter a real name instead of initials or placeholder text.",
      }),
    ).setMimeType(ContentService.MimeType.JSON);
  }

  if (!isValidPhone_(phone)) {
    return ContentService.createTextOutput(
      JSON.stringify({
        ok: false,
        message: "Please enter a valid phone number with 10 to 15 digits.",
      }),
    ).setMimeType(ContentService.MimeType.JSON);
  }

  if (!isValidEmail_(email)) {
    return ContentService.createTextOutput(
      JSON.stringify({
        ok: false,
        message: "Please enter a valid email address or leave that field blank.",
      }),
    ).setMimeType(ContentService.MimeType.JSON);
  }

  sheet.appendRow([
    submittedAt,
    name,
    phone,
    email,
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
    email: email,
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
