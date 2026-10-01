/* ============================================================
   AUDIO — background music + status indicator
   ============================================================

   Rules this file follows:
   - The music file path comes from js/config.js.
   - Playback is requested from a real user gesture (the
     Enter button), which is what browsers require.
   - If the browser still blocks autoplay, the indicator
     honestly says "Tap for music" and the next tap anywhere
     tries again — the UI NEVER claims music is playing
     when it is not.
   - The indicator is also a button: tap it to pause/play.
   ============================================================ */

(function () {
  "use strict";

  let bgMusic = null;
  let indicator = null;
  let label = null;

  let musicStarted = false;
  let musicAttempted = false;
  let audioBroken = false;

  function showIndicator(text) {
    if (!indicator || !label) return;
    label.textContent = text;
    indicator.classList.add("visible");
  }

  function setPlayingState(isPlaying) {
    if (!indicator) return;
    indicator.classList.toggle("is-playing", isPlaying);
    indicator.setAttribute(
      "aria-label",
      isPlaying
        ? "Pause background music"
        : "Play background music"
    );
  }

  function handlePlay() {
    musicStarted = true;
    showIndicator("🎵 Playing");
    setPlayingState(true);
  }

  function handlePause() {
    musicStarted = false;
    showIndicator("🎵 Paused");
    setPlayingState(false);
  }

  function handleError() {
    audioBroken = true;
    musicStarted = false;
    showIndicator("🎵 Audio unavailable");
    setPlayingState(false);
  }

  /* Called directly inside a user gesture (Enter tap). */
  function start() {
    if (!bgMusic || musicStarted || musicAttempted || audioBroken) {
      return;
    }

    musicAttempted = true;

    let playPromise = null;

    try {
      playPromise = bgMusic.play();
    } catch (_) {
      musicAttempted = false;
      showIndicator("🎵 Tap for music");
      return;
    }

    if (playPromise && typeof playPromise.then === "function") {
      playPromise
        .then(handlePlay)
        .catch(() => {
          /* Browser blocked playback — be honest about it.
             Allow the next tap to try again. */
          musicAttempted = false;
          showIndicator("🎵 Tap for music");
        });
    } else {
      /* Very old browsers return no promise. */
      handlePlay();
    }
  }

  /* Fallback used when a tap happens while playback is
     still blocked. Only fires if we have not succeeded
     and are not in the middle of an attempt. */
  function fallbackGesture() {
    if (musicStarted || musicAttempted || audioBroken || !bgMusic) {
      return;
    }

    if (bgMusic.paused) {
      start();
    }
  }

  function toggle() {
    if (audioBroken || !bgMusic) return;

    if (musicStarted) {
      bgMusic.pause();
    } else {
      musicAttempted = false;
      start();
      /* If play() was rejected earlier, start() may not
         have updated the label yet — the promise handler
         or events cover every state. */
    }
  }

  function init() {
    const config = window.JackFrost.config;

    bgMusic = document.querySelector("#bgMusic");
    indicator = document.querySelector("#musicIndicator");
    label = document.querySelector("#musicLabel");

    if (bgMusic && config && config.musicSrc) {
      bgMusic.src = config.musicSrc;
    }

    if (bgMusic) {
      bgMusic.addEventListener("play", handlePlay);
      bgMusic.addEventListener("pause", handlePause);
      bgMusic.addEventListener("error", handleError);
    }

    if (indicator) {
      indicator.addEventListener("click", toggle);
    }

    document.addEventListener(
      "click",
      (event) => {
        /* The Enter button starts music by itself. */
        const enterButton = document.querySelector("#introTapBtn");
        if (
          enterButton &&
          (event.target === enterButton ||
            enterButton.contains(event.target))
        ) {
          return;
        }

        /* Do not fight an explicit pause — only retry when
           the browser blocked the very first attempt. */
        if (!musicStarted && musicAttempted === false) {
          fallbackGesture();
        }
      },
      { passive: true }
    );
  }

  window.JackFrost = window.JackFrost || {};
  window.JackFrost.audio = { init: init, start: start };
})();
