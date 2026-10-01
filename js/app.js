/* ============================================================
   APP — shared utilities & initialization
   ============================================================

   This file runs last. It defines small helpers that every
   other module uses (window.JackFrost.util) and then starts
   everything in the right order:

     1. effects    — stars & snow
     2. audio      — music element + indicator
     3. interactions — listeners that can be attached early
     4. intro      — loading screen (locks scrolling)

   When the visitor enters, the intro calls back into here,
   which starts the music (inside the tap gesture) and then
   wakes up the main-page interactions.
   ============================================================ */

(function () {
  "use strict";

  /* ---------- UTILITIES ---------- */

  const $ = (selector) => document.querySelector(selector);

  const prefersReducedMotion =
    !!(
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );

  const isLowPowerDevice = !!(navigator.hardwareConcurrency &&
    navigator.hardwareConcurrency <= 4);

  /* Tracked timeouts — every delayed task can be found and
     cleared from one place. */
  const timers = new Set();

  function safeTimeout(fn, delay) {
    const id = setTimeout(() => {
      timers.delete(id);
      fn();
    }, delay);

    timers.add(id);
    return id;
  }

  function clearTrackedTimers() {
    timers.forEach(clearTimeout);
    timers.clear();
  }

  const util = {
    $: $,
    prefersReducedMotion: prefersReducedMotion,
    isLowPowerDevice: isLowPowerDevice,
    safeTimeout: safeTimeout,
    clearTrackedTimers: clearTrackedTimers
  };

  /* ---------- STARTUP ---------- */

  function handleEnter() {
    window.JackFrost.interactions.start();
  }

  function init() {
    const app = window.JackFrost;

    app.util = util;

    app.effects.init();
    app.audio.init();
    app.interactions.init();
    app.intro.init({ onEnter: handleEnter });
  }

  init();
})();
