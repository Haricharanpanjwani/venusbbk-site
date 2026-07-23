window.VENUS_SITE = {
  businessName: "Venus Club & Banquet Hall",
  shortName: "Venus Club",
  tagline: "One Destination for Every Celebration.",
  area: "Barabanki, Lucknow, Uttar Pradesh",
  businessHoursDisplay: "9:00 AM to 9:00 PM",
  phoneDisplay: "+91 9664345780",
  phoneHref: "tel:+919664345780",
  whatsappHref:
    "https://wa.me/919664345780?text=Hello%2C%20I%20would%20like%20to%20plan%20an%20event%20at%20Venus%20Club%20%26%20Banquet%20Hall.",
  whatsappLabel: "WhatsApp Us",
  instagramHref: "https://www.instagram.com/venusbbk",
  addressLine1: "Lucknow - Colonelganj - Gonda Rd, Dharsania, Gadia",
  addressLine2: "Uttar Pradesh 225003, India",
  mapsHref:
    "https://www.google.com/maps/place/Venus+Club+and+Banquet/data=!4m2!3m1!1s0x0:0x545008718fb33479?sa=X&ved=1t:2428&ictx=111",
  email: "bookings@venusbbk.com",
  guestCapacity: "Up to 1000 guests",
  roomCount: "10 guest rooms",
  serviceAreas: [
    "Lucknow",
    "Barabanki",
    "Dharsania",
    "Gadia",
    "Banki",
    "Safedabad",
    "Chinhat",
    "Dewa",
    "Zaidpur",
    "Nawabganj",
    "Aseni",
    "Madhopur"
  ],
  seoKeywords:
    "Venus Club, Venus Banquet, Venus Outdoor Lawn, Club, Outdoor, Event, Business Event, Venue, Marriage Hall, Banquet Hall, Wedding Venue, Outdoor Lawn, Corporate Event Venue, Barabanki, Lucknow",
  heroBlurb:
    "A refined venue in Barabanki for weddings, celebrations, corporate gatherings, and guest stays.",
  metaDescription:
    "Venus Club & Banquet Hall is a premium event venue in Barabanki near Lucknow with a banquet hall, outdoor celebration space, guest accommodation, and enquiry-first planning.",
  launchBannerText: "Launching on July 30, 2026",
  primaryCtaLabel: "Register for Inauguration",
  venueFacts: [
    {
      title: "Up to 1000 guests",
      detail: "Suitable for weddings, receptions, and larger hosted gatherings",
    },
    {
      title: "Banquet hall and outdoor lawn",
      detail: "Indoor and open-air hosting in one destination",
    },
    {
      title: "10 guest rooms",
      detail: "Useful for wedding families and travelling guests",
    },
    {
      title: "Barabanki and Lucknow access",
      detail: "Convenient for local events and nearby city guests",
    },
  ],
  eventTypes: [
    "Wedding",
    "Reception",
    "Engagement",
    "Birthday",
    "Anniversary",
    "Family Function",
    "Corporate Event",
    "Conference / Seminar",
    "Private Gathering",
  ],
  canonicalBase: "https://venusbbk.com",
  inquiryEndpoint:
    "https://script.google.com/macros/s/AKfycbyk7WsEajmK8mro2jc866nGdELNdnj3Mc1gRtnJs_iujGxtAPbK5tDbsWujiz0Df351oQ/exec",
  inquiryMethod: "POST",
  inquiryMode: "no-cors",
  launchAnnouncement: {
    enabled: true,
    date: "2026-07-30",
    delayMs: 1800,
    title: "Venus Club\nOpening Summer 2026",
    message:
      "Now welcoming early enquiries for weddings, celebrations, private stays, and venue visits ahead of our opening.",
    primaryLabel: "Register for Inauguration",
    primaryHref: "contact.html#schedule-visit",
    image: "venue-garden.jpeg",
    imageAlt: "Venue ambience at Venus Club",
    monogram: "VC",
    openingLabel: "Opening 30 July 2026",
  },
  galleryItems: [
    {
      title: "Banquet Hall Perspective",
      category: "banquet",
      image: "venue-hall.jpeg",
      alt: "Banquet hall at Venus Club with warm lighting and stage-facing perspective",
      caption: "The indoor hall anchors ceremonies, receptions, and formal hosted gatherings.",
    },
    {
      title: "Hall Atmosphere",
      category: "banquet",
      image: "venue-hall.jpeg",
      alt: "Interior view of the main hall showing event-ready ambience at Venus Club",
      caption: "A calm interior character suited to celebrations that need scale and composure.",
    },
    {
      title: "Outdoor Evening Mood",
      category: "outdoor",
      image: "outdoor_lawn.png",
      alt: "Outdoor celebration area at Venus Club with evening lighting ambience",
      caption: "The lawn setting introduces a softer, more open-air experience for evenings.",
    },
    {
      title: "Garden Arrival Impression",
      category: "outdoor",
      image: "venue-garden.jpeg",
      alt: "Garden-side visual atmosphere at Venus Club for receptions and gatherings",
      caption: "Ideal for arrival moments, outdoor receptions, and more atmospheric event styling.",
    },
    {
      title: "Celebration Character",
      category: "social",
      image: "venue-hall.jpeg",
      alt: "Venue ambience inside Venus Club suitable for weddings and family celebrations",
      caption: "A setting designed to adapt across weddings, birthdays, anniversaries, and family functions.",
    },
    {
      title: "Corporate Event Setting",
      category: "social",
      image: "corporate_event.png",
      alt: "Corporate meeting and hosted event setup at Venus Club",
      caption: "A more formal setup suited to meetings, hosted business events, and professional gatherings.",
    },
    {
      title: "Venue Ambience",
      category: "details",
      image: "venue-garden.jpeg",
      alt: "Exterior ambience at Venus Club near Barabanki for event hosting",
      caption: "Current venue imagery will expand as more professionally shot albums are added.",
    },
  ],
};

// Keep inauguration calls-to-action consistent and configure the registration form.
document.addEventListener("DOMContentLoaded", () => {
  const label = window.VENUS_SITE.primaryCtaLabel;

  document.querySelectorAll("a, button, h1, h2, h3, p, span").forEach((element) => {
    if (element.children.length) return;
    const text = element.textContent.trim();
    if (/^check(?: for)? availability[.!]?$/i.test(text)) {
      element.textContent = label;
    }
  });

  const form = document.querySelector("[data-inquiry-form]");
  if (!form) return;

  const shell = form.closest(".form-shell");
  const heading = shell && shell.querySelector("h3");
  const kicker = shell && shell.querySelector(".form-kicker");
  if (heading) heading.textContent = "Register for the inauguration.";
  if (kicker) kicker.textContent = "Please share these four details so the Venus team can confirm your registration.";

  form.innerHTML = `
    <div class="form-grid">
      <label class="field">
        <span>Name <em>*</em></span>
        <input type="text" name="name" required minlength="3" maxlength="80" autocomplete="name" placeholder="Your full name" />
      </label>
      <label class="field">
        <span>Phone number <em>*</em></span>
        <input type="tel" name="phone" required inputmode="tel" autocomplete="tel" placeholder="+91 98765 43210" />
      </label>
      <label class="field">
        <span>Email <em>*</em></span>
        <input type="email" name="email" required maxlength="120" autocomplete="email" placeholder="you@example.com" />
      </label>
      <label class="field">
        <span>Approximate number of guests <em>*</em></span>
        <input type="number" name="expectedGuests" required min="1" max="5000" step="1" inputmode="numeric" placeholder="Approximate guests" />
      </label>
    </div>
    <label class="field field--hidden" aria-hidden="true">
      <span>Website</span>
      <input type="text" name="website" tabindex="-1" autocomplete="off" />
    </label>
    <div class="form-actions">
      <button class="button" type="submit">Register for Inauguration</button>
      <p class="form-note">All four fields are required.</p>
    </div>
    <p class="form-status" data-form-status aria-live="polite"></p>
  `;

  const setStatus = (message, state) => {
    const status = form.querySelector("[data-form-status]");
    if (!status) return;
    status.textContent = message;
    status.setAttribute("data-state", state || "");
  };

  form.addEventListener(
    "submit",
    async (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();

      const data = new FormData(form);
      const name = String(data.get("name") || "").trim();
      const phone = String(data.get("phone") || "").trim();
      const email = String(data.get("email") || "").trim();
      const expectedGuests = String(data.get("expectedGuests") || "").trim();
      const honeypot = String(data.get("website") || "").trim();
      const phoneDigits = phone.replace(/\D/g, "");
      const guestCount = Number(expectedGuests);
      const emailInput = form.querySelector('input[name="email"]');

      if (honeypot) {
        setStatus("We couldn't validate the registration. Please try again.", "error");
        return;
      }
      if (!name || !phone || !email || !expectedGuests) {
        setStatus("Please complete all four required fields.", "error");
        return;
      }
      if (name.length < 3 || !/[A-Za-z]/.test(name)) {
        setStatus("Please enter a valid full name.", "error");
        return;
      }
      if (phoneDigits.length < 10 || phoneDigits.length > 15) {
        setStatus("Please enter a valid phone number with 10 to 15 digits.", "error");
        return;
      }
      if (!emailInput || !emailInput.checkValidity()) {
        setStatus("Please enter a valid email address.", "error");
        return;
      }
      if (!Number.isInteger(guestCount) || guestCount < 1 || guestCount > 5000) {
        setStatus("Please enter a guest count between 1 and 5000.", "error");
        return;
      }

      const payload = {
        name,
        phone,
        email,
        expectedGuests,
        eventType: "Inauguration Registration",
        description: `Inauguration registration for approximately ${expectedGuests} guests.`,
        sourcePage: `${window.location.pathname}#inauguration-registration`,
        submittedAt: new Date().toISOString(),
      };

      try {
        setStatus("Submitting your registration...", "loading");
        const response = await fetch(window.VENUS_SITE.inquiryEndpoint, {
          method: window.VENUS_SITE.inquiryMethod || "POST",
          mode: window.VENUS_SITE.inquiryMode || "cors",
          headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
          body: new URLSearchParams(payload),
        });

        if ((window.VENUS_SITE.inquiryMode || "cors") !== "no-cors" && !response.ok) {
          throw new Error("Registration could not be submitted.");
        }

        form.reset();
        setStatus("Your inauguration registration has been submitted successfully.", "success");
      } catch (error) {
        setStatus("We couldn't submit your registration right now. Please try again or contact us directly.", "error");
      }
    },
    true,
  );
});
