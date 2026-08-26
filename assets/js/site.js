(function () {
  const toggle = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".site-nav");

  if (toggle && navigation) {
    const closeMenu = () => {
      toggle.setAttribute("aria-expanded", "false");
      navigation.dataset.open = "false";
    };

    toggle.addEventListener("click", () => {
      const willOpen = toggle.getAttribute("aria-expanded") !== "true";
      toggle.setAttribute("aria-expanded", String(willOpen));
      navigation.dataset.open = String(willOpen);
    });

    navigation.addEventListener("click", (event) => {
      if (event.target.closest("a")) {
        closeMenu();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
        toggle.focus();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 980) {
        closeMenu();
      }
    });
  }

  document.querySelectorAll("[data-current-year]").forEach((element) => {
    element.textContent = String(new Date().getFullYear());
  });

  document.querySelectorAll('a[target="_blank"]').forEach((link) => {
    link.setAttribute("rel", "noopener");
  });
})();
