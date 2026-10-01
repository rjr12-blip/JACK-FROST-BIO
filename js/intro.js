/* ============================================================
   INTRO — loading screen, frost canvas & entrance
   ============================================================

   The intro owns:
   - the falling-frost canvas animation (stops itself when
     the intro exits — no permanent animation loop)
   - the staged progress bar
   - the "Enter the Frost Realm" button (plus clicking
     anywhere, and an optional auto-enter fallback)
   - the scroll lock: while the intro is open, <html> has
     class "intro-active" so the hidden page behind the
     intro cannot be scrolled (this used to cause the page
     to jump to a random position after entering).
   ============================================================ */

(function () {
  "use strict";

  let overlay = null;
  let introReady = false;
  let hasEntered = false;
  let autoEnterTimer = null;
  let onEnterCallback = null;

  let canvasAnimationId = null;
  let loadingFrame = null;

  const util = () => window.JackFrost.util;

  /* ---------- FROST CANVAS ---------- */

  const frostChars = ["❄", "❅", "❆", "✧", "✦", "◇", "·", "•", "⋆", "✵"];

  const frostColors = [
    "#7dd3fc",
    "#bae6fd",
    "#e0f2fe",
    "#38bdf8",
    "#a5f3fc",
    "#ffffff",
    "#c4b5fd"
  ];

  let ctx = null;
  let introCanvas = null;
  let matrixColumns = [];
  let canvasWidth = 0;
  let canvasHeight = 0;

  function resizeIntroCanvas() {
    if (!introCanvas || !ctx) return;

    const dpr = Math.min(
      window.devicePixelRatio || 1,
      util().isLowPowerDevice ? 1 : 1.5
    );

    canvasWidth = window.innerWidth;
    canvasHeight = window.innerHeight;

    introCanvas.width = Math.floor(canvasWidth * dpr);
    introCanvas.height = Math.floor(canvasHeight * dpr);
    introCanvas.style.width = canvasWidth + "px";
    introCanvas.style.height = canvasHeight + "px";

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    initializeMatrix();
  }

  function initializeMatrix() {
    const fontSize = util().isLowPowerDevice ? 22 : 18;
    const columnCount = Math.ceil(canvasWidth / fontSize);

    matrixColumns = [];

    for (let i = 0; i < columnCount; i++) {
      const maxChars = Math.floor(Math.random() * 12 + 5);
      const chars = [];

      for (let j = 0; j < maxChars; j++) {
        chars.push({
          char: frostChars[Math.floor(Math.random() * frostChars.length)],
          color: frostColors[Math.floor(Math.random() * frostColors.length)],
          opacity: 1 - j / maxChars
        });
      }

      matrixColumns.push({
        x: i * fontSize,
        y: Math.random() * canvasHeight * -1,
        speed: Math.random() * (util().isLowPowerDevice ? 1 : 1.4) + 0.5,
        fontSize: Math.random() * 5 + 14,
        chars
      });
    }
  }

  function drawIntroMatrix() {
    if (!ctx || !overlay) return;

    /* Stop work immediately once the intro is exiting. */
    if (overlay.classList.contains("is-exiting")) {
      canvasAnimationId = null;
      return;
    }

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    for (const column of matrixColumns) {
      for (let j = 0; j < column.chars.length; j++) {
        const character = column.chars[j];
        const y = column.y + j * column.fontSize;

        if (y < -30 || y > canvasHeight + 30) {
          continue;
        }

        ctx.globalAlpha = character.opacity * 0.48;
        ctx.fillStyle = character.color;
        ctx.font = column.fontSize + "px Inter, sans-serif";
        ctx.fillText(character.char, column.x, y);
      }

      column.y += column.speed;

      if (
        column.y - column.chars.length * column.fontSize >
        canvasHeight
      ) {
        column.y = Math.random() * canvasHeight * -0.8;
      }
    }

    ctx.globalAlpha = 1;

    canvasAnimationId = requestAnimationFrame(drawIntroMatrix);
  }

  /* ---------- LOADING PROGRESS ---------- */

  const loadingStages = [
    { threshold: 0, text: "INITIALIZING FROST CORE..." },
    { threshold: 13, text: "ESTABLISHING SECURE LINK..." },
    { threshold: 26, text: "ACCESSING FRIENDSHIP MATRIX..." },
    { threshold: 40, text: "CALIBRATING COSMIC COMPATIBILITY..." },
    { threshold: 54, text: "LOADING WINTER PROTOCOLS..." },
    { threshold: 68, text: "SYNTHESIZING AURORA PATTERNS..." },
    { threshold: 82, text: "GENERATING SNOWFLAKE CRYPTOGRAPHY..." },
    { threshold: 94, text: "FROST REALM READY..." },
    { threshold: 100, text: "✨ WELCOME TO THE COSMIC WINTER ✨" }
  ];

  let stageIndex = 0;

  function finishIntroLoading() {
    if (introReady) return;

    introReady = true;

    const progressFill = document.querySelector("#introProgressFill");
    const introStatus = document.querySelector("#introStatus");
    const enterButton = document.querySelector("#introTapBtn");

    if (progressFill) progressFill.style.width = "100%";
    if (introStatus) {
      introStatus.textContent = "✨ WELCOME TO THE COSMIC WINTER ✨";
    }
    if (enterButton) enterButton.classList.add("visible");

    scheduleAutoEnter();
  }

  function updateIntro(introStart, timestamp) {
    if (introReady) return;

    const utilRef = util();
    const prefersReducedMotion = utilRef.prefersReducedMotion;

    const duration = prefersReducedMotion ? 1800 : 6200;
    const elapsed = timestamp - introStart;
    const rawProgress = Math.min(elapsed / duration, 1);

    /* Smooth ease-out. */
    const easedProgress = 1 - Math.pow(1 - rawProgress, 1.8);
    const progress = easedProgress * 100;

    const progressFill = document.querySelector("#introProgressFill");
    const introStatus = document.querySelector("#introStatus");

    if (progressFill) {
      progressFill.style.width = progress + "%";
    }

    while (
      stageIndex < loadingStages.length - 1 &&
      progress >= loadingStages[stageIndex + 1].threshold
    ) {
      stageIndex++;

      if (introStatus) {
        introStatus.textContent = loadingStages[stageIndex].text;
      }
    }

    if (rawProgress >= 1) {
      finishIntroLoading();
      return;
    }

    loadingFrame = requestAnimationFrame((nextTimestamp) =>
      updateIntro(introStart, nextTimestamp)
    );
  }

  /* ---------- ENTER ---------- */

  function scheduleAutoEnter() {
    const config = window.JackFrost.config;
    const delay = config ? Number(config.autoEnterDelayMs) : 0;

    if (!(delay > 0)) return;

    const safe = util().safeTimeout;

    autoEnterTimer = safe(() => {
      enter();
    }, delay);
  }

  function unlockScroll() {
    document.documentElement.classList.remove("intro-active");
  }

  function enter() {
    if (hasEntered || !introReady) return;

    hasEntered = true;

    if (autoEnterTimer !== null) {
      clearTimeout(autoEnterTimer);
      autoEnterTimer = null;
    }

    /* Start audio FIRST, while still inside the click gesture. */
    window.JackFrost.audio.start();

    /* Main content becomes visible; intro fades away. */
    const mainContent = document.querySelector("#mainContent");
    if (mainContent) mainContent.classList.add("is-active");

    if (overlay) overlay.classList.add("is-exiting");

    /* Stop the intro canvas immediately. */
    if (canvasAnimationId) {
      cancelAnimationFrame(canvasAnimationId);
      canvasAnimationId = null;
    }

    /* Allow the page to scroll again. */
    unlockScroll();

    /* Hand over to the rest of the app (typing, quotes,
       counters, clock, tilt, motion…). */
    if (typeof onEnterCallback === "function") {
      onEnterCallback();
    }

    /* Do not use display:none on the intro — let the
       opacity/visibility transition finish naturally. */
    util().safeTimeout(() => {
      if (overlay) overlay.remove();
    }, 750);
  }

  /* ---------- INIT ---------- */

  function init(options) {
    onEnterCallback = options && options.onEnter;

    overlay = document.querySelector("#introOverlay");
    introCanvas = document.querySelector("#introCanvas");

    /* Lock scrolling while the intro is open. The class is
       added by JavaScript, so a browser without JavaScript
       still gets a scrollable page. */
    document.documentElement.classList.add("intro-active");

    /* Intro canvas (skipped for reduced motion). */
    const motionOk = !util().prefersReducedMotion;

    if (introCanvas && motionOk) {
      try {
        ctx = introCanvas.getContext("2d", { alpha: true });
      } catch (_) {
        /* No canvas support — the intro still works. */
        ctx = null;
      }
    }

    if (ctx) {
      resizeIntroCanvas();
      window.addEventListener("resize", resizeIntroCanvas, {
        passive: true
      });
      drawIntroMatrix();
    }

    /* Loading progress. */
    const introStart = performance.now();
    loadingFrame = requestAnimationFrame((timestamp) =>
      updateIntro(introStart, timestamp)
    );

    const enterButton = document.querySelector("#introTapBtn");

    enterButton?.addEventListener("click", enter);

    /* Clicking anywhere on the completed intro also enters
       (preserving the original behavior). */
    overlay?.addEventListener("click", (event) => {
      if (introReady && !event.target.closest("#introTapBtn")) {
        enter();
      }
    });

    /* Keyboard: Enter/Space on the button already fires click;
       Escape does nothing here on purpose. */
  }

  window.JackFrost = window.JackFrost || {};
  window.JackFrost.intro = { init: init };
})();
