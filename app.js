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
})();
