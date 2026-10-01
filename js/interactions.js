/* ============================================================
   INTERACTIONS — clock, typing, quotes, terminal, counters,
   buttons, card tilt, shake & battery
   ============================================================

   init()  runs once at page load (harmless listeners).
   start() runs the first time the visitor enters the site.

   SECURITY NOTE — visitor notifications:
   An older version of this page sent a "new visitor" alert
   through Telegram, but the bot token was embedded in the
   public JavaScript. That token must be considered leaked
   and must NEVER come back into front-end code. If you want
   visitor notifications, route the request through your own
   server endpoint (e.g. POST /api/visitor-alert) which then
   calls the Telegram Bot API with the secret stored
   server-side. See README.md → Security.
   ============================================================ */

(function () {
  "use strict";

  const util = () => window.JackFrost.util;
  const config = () => window.JackFrost.config;

  let started = false;

  /* ==========================================================
     CLOCK
     ========================================================== */

  const clockEl = () => document.querySelector("#clock");

  function updateClock() {
    const element = clockEl();
    if (!element) return;

    element.textContent = new Date().toLocaleString([], {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  }

  function startClock() {
    updateClock();
    /* Minute-level precision is enough — the old code
       updated every second and wasted timers. */
    setInterval(updateClock, 30000);
  }

  /* ==========================================================
     TYPING (roles under the name)
     ========================================================== */

  let roleIndex = 0;
  let characterIndex = 0;
  let deleting = false;

  function typeLoop(typingEl) {
    if (!typingEl || !started) return;

    const roles = config().roles;
    const current = roles[roleIndex % roles.length];

    if (!deleting) {
      typingEl.textContent = current.substring(0, characterIndex++);

      if (characterIndex > current.length) {
        deleting = true;
        util().safeTimeout(() => typeLoop(typingEl), 1400);
        return;
      }
    } else {
      typingEl.textContent = current.substring(0, characterIndex--);

      if (characterIndex < 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }

    util().safeTimeout(
      () => typeLoop(typingEl),
      deleting ? 35 : 70
    );
  }

  function startTyping() {
    const typingEl = document.querySelector("#typing");
    if (!typingEl) return;

    if (util().prefersReducedMotion) {
      typingEl.textContent = config().roles[0];
      return;
    }

    typeLoop(typingEl);
  }

  /* ==========================================================
     ROTATING QUOTES
     ========================================================== */

  function startQuoteRotation() {
    const quoteBox = document.querySelector("#quoteBox");
    if (!quoteBox) return;

    const quotes = config().quotes;
    let quoteIndex = 0;

    function rotateQuote() {
      quoteBox.style.opacity = "0";
      quoteBox.style.transform = "translate3d(0, 8px, 0)";

      util().safeTimeout(() => {
        quoteBox.textContent = quotes[quoteIndex];
        quoteBox.style.opacity = "1";
        quoteBox.style.transform = "translate3d(0, 0, 0)";

        quoteIndex = (quoteIndex + 1) % quotes.length;
      }, 280);
    }

    rotateQuote();
    setInterval(rotateQuote, 6500);
  }

  /* ==========================================================
     TERMINAL BOOT
     ========================================================== */

  let terminalStarted = false;

  function startTerminalBoot() {
    const termBody = document.querySelector("#termBody");
    if (!termBody || terminalStarted) return;

    terminalStarted = true;
    termBody.innerHTML = "";

    const bootLines = config().bootLines;
    let lineIndex = 0;

    function addLine() {
      if (lineIndex >= bootLines.length) return;

      const line = bootLines[lineIndex];
      const element = document.createElement("div");
      element.className = "line";
      termBody.appendChild(element);

      let charIndex = 0;

      function typeCharacter() {
        if (charIndex < line.length) {
          element.textContent += line[charIndex++];
          util().safeTimeout(typeCharacter, 20);
        } else {
          lineIndex++;
          util().safeTimeout(addLine, 180);
        }
      }

      typeCharacter();
    }

    addLine();
  }

  /* ==========================================================
     STAT COUNTERS
     ========================================================== */

  function animateCounter(element) {
    const target = Number(element.dataset.target);
    if (!Number.isFinite(target)) return;

    const duration = util().prefersReducedMotion ? 0 : 1400;
    const start = performance.now();

    function step(now) {
      const progress =
        duration === 0
          ? 1
          : Math.min((now - start) / duration, 1);

      const eased = 1 - Math.pow(1 - progress, 3);

      element.textContent = Math.floor(eased * target).toLocaleString();

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        element.textContent = target.toLocaleString();
      }
    }

    requestAnimationFrame(step);
  }

  function initCounters() {
    const container = document.querySelector("#statsContainer");
    if (!container) return;

    if (!("IntersectionObserver" in window)) {
      container.querySelectorAll(".statNum").forEach(animateCounter);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target
            .querySelectorAll(".statNum")
            .forEach((element) => {
              if (element.dataset.animated) return;
              element.dataset.animated = "true";
              animateCounter(element);
            });

          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(container);
  }

  /* ==========================================================
     CONSOLE BUTTONS (Greet / Inspire / Frost Mode)
     ========================================================== */

  let consoleTimer = null;

  function showConsoleLoading(message) {
    const loader = document.querySelector("#consoleLoader");
    const top = document.querySelector("#consoleTop");
    const text = document.querySelector("#consoleText");

    if (!loader || !top || !text) return;

    loader.style.width = "0%";
    top.textContent = "PROCESSING...";
    text.textContent = "";

    let progress = 0;

    if (consoleTimer) clearInterval(consoleTimer);

    consoleTimer = setInterval(() => {
      progress += Math.random() * 13 + 10;

      if (progress >= 100) {
        progress = 100;
        loader.style.width = "100%";
        clearInterval(consoleTimer);

        util().safeTimeout(() => {
          top.textContent = "COMPLETE ✅";
          text.textContent = message;

          util().safeTimeout(() => {
            loader.style.width = "0%";
          }, 500);
        }, 180);
      } else {
        loader.style.width = progress + "%";
      }
    }, 70);
  }

  function pick(list) {
    return list[Math.floor(Math.random() * list.length)];
  }

  function initConsoleButtons() {
    const bindings = [
      ["#btnGreet", () => config().greetMessages],
      ["#btnInspire", () => config().inspireMessages],
      ["#btnFrost", () => config().frostMessages]
    ];

    bindings.forEach(([selector, getMessages]) => {
      document.querySelector(selector)?.addEventListener("click", () => {
        showConsoleLoading(pick(getMessages()));
      });
    });
  }

  /* ==========================================================
     CARD TILT (desktop pointer / mobile orientation)
     ========================================================== */

  let tiltEnabled = false;
  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;
  let tiltFrame = null;

  function animateTilt(cardWrapper) {
    if (!tiltEnabled) {
      tiltFrame = null;
      return;
    }

    currentX += (targetX - currentX) * 0.08;
    currentY += (targetY - currentY) * 0.08;

    cardWrapper.style.transform =
      "perspective(1000px) rotateX(" +
      currentX +
      "deg) rotateY(" +
      currentY +
      "deg)";

    const distance =
      Math.abs(targetX - currentX) + Math.abs(targetY - currentY);

    if (distance > 0.01) {
      tiltFrame = requestAnimationFrame(() => animateTilt(cardWrapper));
    } else {
      /* Stop the RAF when the card has settled instead of
         running forever — and release the composited layer. */
      tiltFrame = null;
      cardWrapper.style.willChange = "auto";
    }
  }

  function requestTiltFrame(cardWrapper) {
    if (!tiltFrame) {
      cardWrapper.style.willChange = "transform";
      tiltFrame = requestAnimationFrame(() => animateTilt(cardWrapper));
    }
  }

  function initializeTilt() {
    const cardWrapper = document.querySelector("#cardWrapper");
    if (!cardWrapper || util().prefersReducedMotion) return;

    /* Desktop pointer tilt. */
    if (window.matchMedia("(pointer: fine)").matches) {
      tiltEnabled = true;

      document.addEventListener(
        "mousemove",
        (event) => {
          const x = (window.innerWidth / 2 - event.clientX) / 180;
          const y = (window.innerHeight / 2 - event.clientY) / 180;

          targetY = Math.max(-3, Math.min(3, x));
          targetX = Math.max(-3, Math.min(3, -y));

          requestTiltFrame(cardWrapper);
        },
        { passive: true }
      );

      document.addEventListener("mouseleave", () => {
        targetX = 0;
        targetY = 0;
        requestTiltFrame(cardWrapper);
      });

      return;
    }

    /* Mobile orientation is deliberately conservative —
       it avoids requesting sensor permission automatically. */
    if (window.innerWidth < 768 && "DeviceOrientationEvent" in window) {
      tiltEnabled = true;

      window.addEventListener(
        "deviceorientation",
        (event) => {
          const gamma = event.gamma || 0;
          const beta = event.beta || 0;

          targetY = Math.max(-2.5, Math.min(2.5, gamma * 0.08));
          targetX = Math.max(-2.5, Math.min(2.5, (beta - 45) * 0.045));

          requestTiltFrame(cardWrapper);
        },
        { passive: true }
      );
    }
  }

  /* ==========================================================
     SHAKE EFFECT
     ========================================================== */

  let lastShake = 0;

  function handleMotion(event) {
    if (util().prefersReducedMotion) return;

    const acceleration = event.accelerationIncludingGravity;
    if (!acceleration) return;

    const x = acceleration.x || 0;
    const y = acceleration.y || 0;
    const z = acceleration.z || 0;

    const magnitude = Math.sqrt(x * x + y * y + z * z);
    const now = Date.now();

    if (magnitude <= 26 || now - lastShake <= 2200) return;

    lastShake = now;

    const cardWrapper = document.querySelector("#cardWrapper");

    if (cardWrapper) {
      cardWrapper.animate(
        [
          { transform: "scale(1)" },
          { transform: "scale(1.025) rotate(1deg)" },
          { transform: "scale(1)" }
        ],
        { duration: 420, easing: "cubic-bezier(.22,1,.36,1)" }
      );
    }

    const consoleText = document.querySelector("#consoleText");
    const consoleTop = document.querySelector("#consoleTop");

    if (consoleText && consoleTop) {
      consoleTop.textContent = "SHAKE DETECTED!";
      consoleText.textContent =
        "❄️✨ Winter magic activated! Secret frost mode engaged! ✨❄️";

      util().safeTimeout(() => {
        consoleTop.textContent = "SYSTEM READY";
        consoleText.textContent =
          "❄️ Tap a button above to receive a surprise message.";
      }, 2500);
    }
  }

  function enableMotion() {
    if (!("DeviceMotionEvent" in window) || util().prefersReducedMotion) {
      return;
    }

    /* iOS 13+ asks for permission — must happen inside a
       user gesture, which is where we are (the Enter tap). */
    if (typeof DeviceMotionEvent.requestPermission === "function") {
      DeviceMotionEvent.requestPermission()
        .then((state) => {
          if (state === "granted") {
            window.addEventListener("devicemotion", handleMotion, {
              passive: true
            });
          }
        })
        .catch(() => {
          /* Permission denied — shake simply stays off. */
        });
      return;
    }

    window.addEventListener("devicemotion", handleMotion, {
      passive: true
    });
  }

  /* ==========================================================
     BATTERY WARNING
     ========================================================== */

  async function initializeBattery() {
    if (!("getBattery" in navigator)) return;

    try {
      const battery = await navigator.getBattery();
      const warning = document.querySelector("#batteryWarn");
      if (!warning) return;

      function updateBattery() {
        warning.style.display =
          battery.level < 0.2 && !battery.charging ? "block" : "none";
      }

      updateBattery();
      battery.addEventListener("levelchange", updateBattery);
      battery.addEventListener("chargingchange", updateBattery);
    } catch (_) {
      /* Battery API is optional. */
    }
  }

  /* ==========================================================
     INIT / START
     ========================================================== */

  function init() {
    initConsoleButtons();
    initializeBattery();
  }

  function start() {
    if (started) return;
    started = true;

    startTerminalBoot();
    startQuoteRotation();
    initCounters();
    startClock();
    startTyping();
    enableMotion();

    /* Small entrance delay lets the main card settle before
       tilt interaction kicks in. */
    util().safeTimeout(initializeTilt, 500);
  }

  window.JackFrost = window.JackFrost || {};
  window.JackFrost.interactions = { init: init, start: start };
})();
