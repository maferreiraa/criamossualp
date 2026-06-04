// LP Agostinho / MFX Creativee

const CONFIG = {
  // Troque pelo seu número com DDI + DDD + número. Ex: 5534999999999
  whatsappNumber: "5534984187265"
};

const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

document.querySelectorAll(".js-whatsapp").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    const message = link.dataset.message || "Oi, Marina! Vim por um botão sem identificação da sua LP e quero saber mais sobre a Landing Page pronta em 72h.";
    const encoded = encodeURIComponent(message);
    const url = `https://wa.me/${CONFIG.whatsappNumber}?text=${encoded}`;

    // Eventos para configurar depois:
    // fbq('track', 'Lead');
    // gtag('event', 'click_whatsapp');
    // clarity('event', 'click_whatsapp');

    window.open(url, "_blank", "noopener,noreferrer");
  });
});

const year = document.getElementById("year");
if (year) {
  year.textContent = new Date().getFullYear();
}

// Pequena animação de entrada sem biblioteca externa
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll("section, article, .mockup-card").forEach((el) => {
  el.classList.add("fade-in");
  observer.observe(el);
});

// CSS da animação injetado via JS para manter o CSS principal limpo
const style = document.createElement("style");
style.textContent = `
  .fade-in {
    opacity: 0;
    transform: translateY(16px);
    transition: opacity .6s ease, transform .6s ease;
  }

  .fade-in.is-visible {
    opacity: 1;
    transform: translateY(0);
  }

  @media (prefers-reduced-motion: reduce) {
    .fade-in {
      opacity: 1;
      transform: none;
      transition: none;
    }
  }
`;
document.head.appendChild(style);
