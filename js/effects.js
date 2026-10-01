/* ============================================================
   EFFECTS — background stars & falling snow
   ============================================================

   Purely decorative, fixed-position layers behind the card.
   They animate with CSS (no JavaScript animation loop), so
   they cost almost nothing while you scroll.
   ============================================================ */

(function () {
  "use strict";

  function createStars(util) {
    const container = document.querySelector("#stars");
    if (!container) return;

    const starCount = util.isLowPowerDevice ? 55 : 85;

    for (let i = 0; i < starCount; i++) {
      const star = document.createElement("div");
      star.className = "star";

      const size = Math.random() * 1.8 + 0.5;

      star.style.width = size + "px";
      star.style.height = size + "px";
      star.style.left = Math.random() * 100 + "%";
      star.style.top = Math.random() * 100 + "%";
      star.style.animationDuration = Math.random() * 5 + 3 + "s";
      star.style.animationDelay = Math.random() * 5 + "s";

      container.appendChild(star);
    }

    if (util.prefersReducedMotion) return;

    const shootingCount = util.isLowPowerDevice ? 1 : 2;

    for (let i = 0; i < shootingCount; i++) {
      const shooting = document.createElement("div");
      shooting.className = "shooting-star";
      shooting.style.left = Math.random() * 80 + "%";
      shooting.style.top = Math.random() * 40 + "%";
      shooting.style.animationDuration = Math.random() * 8 + 10 + "s";
      shooting.style.animationDelay = Math.random() * 12 + "s";

      container.appendChild(shooting);
    }
  }

  function createSnow(util) {
    const container = document.querySelector("#snow");
    if (!container) return;

    const flakeCount = util.prefersReducedMotion
      ? 12
      : util.isLowPowerDevice
        ? 24
        : 34;

    const flakeChars = ["❄", "❅", "❆", "•", "·", "✧"];

    for (let i = 0; i < flakeCount; i++) {
      const flake = document.createElement("div");
      flake.className = "flake";
      flake.textContent =
        flakeChars[Math.floor(Math.random() * flakeChars.length)];

      flake.style.left = Math.random() * 100 + "vw";
      flake.style.fontSize = Math.random() * 12 + 7 + "px";
      flake.style.animationDuration = Math.random() * 13 + 12 + "s";
      flake.style.animationDelay = -Math.random() * 20 + "s";
      flake.style.opacity = Math.random() * 0.4 + 0.2;

      container.appendChild(flake);
    }
  }

  function init() {
    const util = window.JackFrost.util;
    createStars(util);
    createSnow(util);
  }

  window.JackFrost = window.JackFrost || {};
  window.JackFrost.effects = { init: init };
})();
