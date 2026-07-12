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
        alt: "Venus hall interior with stage lighting",
        kicker: "Main Celebration Hall",
        title: "Explore the central event space before guests even arrive",
        text:
          "See the room scale, stage anchor, and how the main hall can support ceremonies, receptions, or larger hosted functions.",
      },
      garden: {
        image: "venue-garden.jpeg",
        alt: "Venus outdoor evening lighting in the garden area",
        kicker: "Evening Garden Ambience",
        title: "Move outdoors for the glow, atmosphere, and photo-friendly moments",
        text:
          "Switch into the garden mood to preview how outdoor lighting and evening styling can give the venue a more memorable identity.",
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
})();
