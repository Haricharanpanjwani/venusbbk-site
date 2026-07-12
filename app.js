(function () {
  const site = window.VENUS_SITE || {};

  const setText = (selector, value) => {
    document.querySelectorAll(selector).forEach((node) => {
      node.textContent = value;
    });
  };

  const setHref = (selector, value) => {
    document.querySelectorAll(selector).forEach((node) => {
      node.setAttribute("href", value);
    });
  };

  setText("[data-site-business]", site.businessName || "");
  setText("[data-site-short]", site.shortName || "");
  setText("[data-site-tagline]", site.tagline || "");
  setText("[data-site-area]", site.area || "");
  setText("[data-site-phone]", site.phoneDisplay || "");
  setText("[data-site-address-line1]", site.addressLine1 || "");
  setText("[data-site-address-line2]", site.addressLine2 || "");
  setText("[data-site-capacity]", site.guestCapacity || "");
  setText("[data-site-hero]", site.heroBlurb || "");
  setText("[data-site-email]", site.email || "");
  setText("[data-site-room-count]", site.roomCount || "");

  setHref("[data-phone-link]", site.phoneHref || "#");
  setHref("[data-whatsapp-link]", site.whatsappHref || "#");
  setHref("[data-map-link]", site.mapsHref || "#");
  document.querySelectorAll("[data-email-link]").forEach((node) => {
    node.setAttribute("href", site.email ? `mailto:${site.email}` : "#");
  });

  const year = document.getElementById("year");
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  const topbar = document.querySelector(".topbar");
  const syncHeaderState = () => {
    if (!topbar) {
      return;
    }
    topbar.classList.toggle("is-scrolled", window.scrollY > 24);
  };

  syncHeaderState();
  window.addEventListener("scroll", syncHeaderState, { passive: true });

  const menuButton = document.querySelector("[data-menu-toggle]");
  const mobileNav = document.querySelector("[data-mobile-nav]");
  if (menuButton && mobileNav) {
    menuButton.addEventListener("click", () => {
      const expanded = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!expanded));
      mobileNav.toggleAttribute("hidden");
    });
  }

  const tour = document.querySelector("[data-tour]");
  if (tour) {
    const image = tour.querySelector("[data-tour-image]");
    const kicker = tour.querySelector("[data-tour-kicker]");
    const title = tour.querySelector("[data-tour-title]");
    const text = tour.querySelector("[data-tour-text]");
    const sceneButtons = tour.querySelectorAll("[data-tour-scene]");
    const hotspotButtons = tour.querySelectorAll("[data-scene-target]");

    const scenes = {
      hall: {
        image: "venue-hall.jpeg",
        alt: "Main banquet hall interior at Venus Club",
        kicker: "The Banquet Hall",
        title: "Step into the indoor space where the main celebration takes shape",
        text:
          "Use the walkthrough to understand how the indoor hall sets the tone for ceremonies, receptions, and more formal hosted events.",
      },
      garden: {
        image: "venue-garden.jpeg",
        alt: "Outdoor event space at Venus Club with evening ambience",
        kicker: "The Outdoor Celebration Space",
        title: "Move outdoors for the atmosphere, lighting, and open-air flexibility",
        text:
          "The lawn introduces a different rhythm for guest arrivals, evening functions, outdoor dining moods, and more relaxed social celebrations.",
      },
    };

    const renderScene = (sceneKey) => {
      const scene = scenes[sceneKey];
      if (!scene || !image || !kicker || !title || !text) {
        return;
      }

      image.src = scene.image;
      image.alt = scene.alt;
      kicker.textContent = scene.kicker;
      title.textContent = scene.title;
      text.textContent = scene.text;

      sceneButtons.forEach((button) => {
        button.classList.toggle(
          "is-active",
          button.getAttribute("data-tour-scene") === sceneKey,
        );
      });

      hotspotButtons.forEach((button) => {
        const visibleIn = (button.getAttribute("data-scene-show") || "")
          .split(",")
          .map((value) => value.trim());
        button.hidden = !visibleIn.includes(sceneKey);
      });
    };

    sceneButtons.forEach((button) => {
      button.addEventListener("click", () => {
        renderScene(button.getAttribute("data-tour-scene"));
      });
    });

    hotspotButtons.forEach((button) => {
      button.addEventListener("click", () => {
        renderScene(button.getAttribute("data-scene-target"));
      });
    });

    renderScene("hall");
  }

  const galleryGrid = document.querySelector("[data-gallery-grid]");
  if (galleryGrid && Array.isArray(site.galleryItems)) {
    const renderGallery = (category) => {
      const items = site.galleryItems.filter((item) => {
        return category === "all" ? true : item.category === category;
      });

      galleryGrid.innerHTML = items
        .map((item, index) => {
          return `
            <button
              class="gallery-card"
              type="button"
              data-lightbox-open
              data-lightbox-index="${index}"
              data-lightbox-category="${category}"
              aria-label="Open ${item.title}"
            >
              <img src="${item.image}" alt="${item.alt}" loading="lazy" />
              <span class="gallery-card__tag">${item.category}</span>
              <div class="gallery-card__copy">
                <strong>${item.title}</strong>
                <span>${item.caption}</span>
              </div>
            </button>
          `;
        })
        .join("");
    };

    const filterButtons = document.querySelectorAll("[data-gallery-filter]");
    let activeCategory = "all";

    const syncFilters = () => {
      filterButtons.forEach((button) => {
        button.classList.toggle(
          "is-active",
          button.getAttribute("data-gallery-filter") === activeCategory,
        );
      });
      renderGallery(activeCategory);
    };

    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        activeCategory = button.getAttribute("data-gallery-filter") || "all";
        syncFilters();
      });
    });

    syncFilters();

    const lightbox = document.querySelector("[data-lightbox]");
    if (lightbox) {
      const lightboxImage = lightbox.querySelector("[data-lightbox-image]");
      const lightboxTitle = lightbox.querySelector("[data-lightbox-title]");
      const lightboxText = lightbox.querySelector("[data-lightbox-text]");
      const closeButton = lightbox.querySelector("[data-lightbox-close]");
      const prevButton = lightbox.querySelector("[data-lightbox-prev]");
      const nextButton = lightbox.querySelector("[data-lightbox-next]");
      let currentItems = site.galleryItems.slice();
      let currentIndex = 0;

      const filteredItems = (category) => {
        return site.galleryItems.filter((item) => {
          return category === "all" ? true : item.category === category;
        });
      };

      const renderLightbox = () => {
        const item = currentItems[currentIndex];
        if (!item || !lightboxImage || !lightboxTitle || !lightboxText) {
          return;
        }
        lightboxImage.src = item.image;
        lightboxImage.alt = item.alt;
        lightboxTitle.textContent = item.title;
        lightboxText.textContent = item.caption;
      };

      const openLightbox = (category, index) => {
        currentItems = filteredItems(category);
        currentIndex = Math.max(0, Math.min(index, currentItems.length - 1));
        renderLightbox();
        lightbox.hidden = false;
        document.body.classList.add("has-lightbox");
      };

      const closeLightbox = () => {
        lightbox.hidden = true;
        document.body.classList.remove("has-lightbox");
      };

      const move = (direction) => {
        if (!currentItems.length) {
          return;
        }
        currentIndex = (currentIndex + direction + currentItems.length) % currentItems.length;
        renderLightbox();
      };

      galleryGrid.addEventListener("click", (event) => {
        const button = event.target.closest("[data-lightbox-open]");
        if (!button) {
          return;
        }
        const category = button.getAttribute("data-lightbox-category") || "all";
        const index = Number(button.getAttribute("data-lightbox-index") || "0");
        openLightbox(category, index);
      });

      if (closeButton) {
        closeButton.addEventListener("click", closeLightbox);
      }
      if (prevButton) {
        prevButton.addEventListener("click", () => move(-1));
      }
      if (nextButton) {
        nextButton.addEventListener("click", () => move(1));
      }

      lightbox.addEventListener("click", (event) => {
        if (event.target === lightbox) {
          closeLightbox();
        }
      });

      document.addEventListener("keydown", (event) => {
        if (lightbox.hidden) {
          return;
        }
        if (event.key === "Escape") {
          closeLightbox();
        }
        if (event.key === "ArrowLeft") {
          move(-1);
        }
        if (event.key === "ArrowRight") {
          move(1);
        }
      });
    }
  }

  const inquiryForm = document.querySelector("[data-inquiry-form]");
  if (inquiryForm) {
    const status = inquiryForm.querySelector("[data-form-status]");
    const invalidNameValues = new Set([
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
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    const hasRepeatedCharacters = (value) => /(.)\1{2,}/i.test(value);
    const digitsOnly = (value) => value.replace(/\D/g, "");

    const isValidName = (value) => {
      const normalized = value.toLowerCase().replace(/[^a-z\s'-]/g, " ").replace(/\s+/g, " ").trim();
      const lettersOnly = normalized.replace(/[^a-z]/g, "");
      const parts = normalized.split(" ").filter(Boolean);

      if (lettersOnly.length < 3) {
        return false;
      }

      if (!parts.length) {
        return false;
      }

      if (invalidNameValues.has(normalized) || invalidNameValues.has(lettersOnly)) {
        return false;
      }

      if (parts.length === 1 && parts[0].length <= 3) {
        return false;
      }

      if (hasRepeatedCharacters(lettersOnly)) {
        return false;
      }

      if (/^[A-Z]{2,4}$/.test(value.trim())) {
        return false;
      }

      return /[a-z]/i.test(value);
    };

    const isValidPhone = (value) => {
      const digits = digitsOnly(value);
      return digits.length >= 10 && digits.length <= 15;
    };

    const setStatus = (message, kind) => {
      if (!status) {
        return;
      }
      status.textContent = message;
      status.setAttribute("data-state", kind || "");
    };

    inquiryForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const formData = new FormData(inquiryForm);
      const payload = {
        name: (formData.get("name") || "").toString().trim(),
        phone: (formData.get("phone") || "").toString().trim(),
        email: (formData.get("email") || "").toString().trim(),
        eventType: (formData.get("eventType") || "").toString().trim(),
        preferredDate: (formData.get("preferredDate") || "").toString().trim(),
        alternateDate: (formData.get("alternateDate") || "").toString().trim(),
        expectedGuests: (formData.get("expectedGuests") || "").toString().trim(),
        spacePreference: (formData.get("spacePreference") || "").toString().trim(),
        roomsRequired: (formData.get("roomsRequired") || "").toString().trim(),
        preferredContactMethod: (formData.get("preferredContactMethod") || "").toString().trim(),
        description: (formData.get("description") || "").toString().trim(),
        numberOfDays: (formData.get("numberOfDays") || "").toString().trim(),
        sourcePage: window.location.pathname,
        submittedAt: new Date().toISOString(),
      };

      const honeypot = (formData.get("website") || "").toString().trim();
      const hasConsent = formData.get("consent") === "yes";

      if (honeypot) {
        setStatus("We couldn't validate the submission. Please try again.", "error");
        return;
      }

      if (!payload.name || !payload.phone) {
        setStatus("Please fill in the required name and phone number fields.", "error");
        return;
      }

      if (!isValidName(payload.name)) {
        setStatus("Please enter a real name instead of initials or placeholder text.", "error");
        return;
      }

      if (!isValidPhone(payload.phone)) {
        setStatus("Please enter a valid phone number with 10 to 15 digits.", "error");
        return;
      }

      if (payload.email && !emailPattern.test(payload.email)) {
        setStatus("Please enter a valid email address or leave that field blank.", "error");
        return;
      }

      if (!hasConsent) {
        setStatus("Please confirm that the team can contact you about your enquiry.", "error");
        return;
      }

      if (!site.inquiryEndpoint) {
        setStatus(
          "The form is ready, but the live Apps Script endpoint still needs to be added in site-data.js before inquiries can be submitted and emailed.",
          "warning",
        );
        return;
      }

      try {
        setStatus("Submitting your enquiry...", "loading");
        const body = new URLSearchParams(payload);
        const response = await fetch(site.inquiryEndpoint, {
          method: site.inquiryMethod || "POST",
          mode: site.inquiryMode || "cors",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          },
          body,
        });

        if ((site.inquiryMode || "cors") !== "no-cors") {
          if (!response.ok) {
            throw new Error(`Submission failed with status ${response.status}`);
          }

          const result = await response.json().catch(() => null);
          if (result && result.ok === false) {
            throw new Error(result.message || "Submission rejected.");
          }
        }

        inquiryForm.reset();
        setStatus("Your enquiry has been submitted successfully.", "success");
      } catch (error) {
        setStatus(
          error && error.message
            ? error.message
            : "We couldn't submit the enquiry right now. Please check the connected endpoint and try again.",
          "error",
        );
      }
    });
  }
})();
