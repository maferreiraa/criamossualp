const CONFIG = {
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

function trackWhatsAppClick(label = "whatsapp_click") {
  try {
    if (typeof fbq === "function") fbq("track", "Lead", { content_name: label });
  } catch (error) {}

  try {
    if (typeof gtag === "function") gtag("event", "click_whatsapp", { event_category: "lead", event_label: label });
  } catch (error) {}

  try {
    if (typeof clarity === "function") clarity("event", label);
  } catch (error) {}
}

document.querySelectorAll(".js-whatsapp").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    const message = link.dataset.message || "Oi, Marina! Vim pela sua LP e quero saber mais sobre a Página de Vendas de R$1.650.";
    const encoded = encodeURIComponent(message);
    const url = `https://wa.me/${CONFIG.whatsappNumber}?text=${encoded}`;

    trackWhatsAppClick("whatsapp_click_pagina_vendas_1650");
    window.open(url, "_blank", "noopener,noreferrer");
  });
});

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("is-visible");
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll("section, article, .price-card, .device").forEach((el) => {
    el.classList.add("fade-in");
    observer.observe(el);
  });

  const style = document.createElement("style");
  style.textContent = `
    .fade-in { opacity: 0; transform: translateY(16px); transition: opacity .6s ease, transform .6s ease; }
    .fade-in.is-visible { opacity: 1; transform: translateY(0); }
    @media (prefers-reduced-motion: reduce) { .fade-in { opacity: 1; transform: none; transition: none; } }
  `;
  document.head.appendChild(style);
}
