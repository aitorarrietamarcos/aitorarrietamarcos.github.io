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
      if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
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

  const publicationToggles = Array.from(document.querySelectorAll("[data-publications-toggle]"));

  const setPublicationPanelState = (button, panel, isOpen, returnFocus) => {
    button.setAttribute("aria-expanded", String(isOpen));
    panel.hidden = !isOpen;
    button.closest("[data-publication-card]")?.classList.toggle("is-expanded", isOpen);

    const label = button.querySelector("[data-toggle-label]");
    if (label) {
      const publicationCount = panel.querySelectorAll(".student-publication-list > li").length;
      const publicationLabel = publicationCount === 1 ? "publication" : "publications";
      const fallbackLabel = `${isOpen ? "Hide" : "View"} selected ${publicationLabel}`;
      label.textContent = isOpen
        ? button.dataset.toggleOpenLabel || fallbackLabel
        : button.dataset.toggleClosedLabel || fallbackLabel;
    }

    if (returnFocus) {
      button.focus();
    }
  };

  publicationToggles.forEach((button) => {
    const panel = document.getElementById(button.getAttribute("aria-controls"));
    if (!panel) return;

    button.addEventListener("click", () => {
      const willOpen = button.getAttribute("aria-expanded") !== "true";

      publicationToggles.forEach((otherButton) => {
        const otherPanel = document.getElementById(otherButton.getAttribute("aria-controls"));
        if (otherPanel) {
          setPublicationPanelState(otherButton, otherPanel, false, false);
        }
      });

      if (willOpen) {
        setPublicationPanelState(button, panel, true, false);
        window.requestAnimationFrame(() => {
          panel.focus({ preventScroll: true });
          panel.scrollIntoView({
            behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
            block: "start"
          });
        });
      }
    });
  });

  document.querySelectorAll("[data-publications-close]").forEach((closeButton) => {
    closeButton.addEventListener("click", () => {
      const panel = closeButton.closest(".student-publications");
      if (!panel) return;
      const button = publicationToggles.find((candidate) => candidate.getAttribute("aria-controls") === panel.id);
      if (button) {
        setPublicationPanelState(button, panel, false, true);
      }
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    const button = publicationToggles.find((candidate) => candidate.getAttribute("aria-expanded") === "true");
    if (!button) return;
    const panel = document.getElementById(button.getAttribute("aria-controls"));
    if (panel) {
      setPublicationPanelState(button, panel, false, true);
    }
  });
})();
