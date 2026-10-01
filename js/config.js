/* ============================================================
   ❄️ START HERE — PERSONAL CUSTOMIZATION ❄️
   ============================================================

   This is the only file you need to edit to change
   WHO the page is about.

   Everything below is plain, readable data:
   change the text between the quotes "like this"
   and save the file. Don't forget the commas.

   Where to change other things:
   → colors / design ......... css/style.css
   → music file .............. assets/audio/
   → profile image ........... assets/images/  (then update avatarSrc)
   → how things behave ....... js/interactions.js, js/intro.js
   ============================================================ */

(function () {
  "use strict";

  const config = {
    /* ---------- IDENTITY ---------- */

    /* Your display name (shown large in the card). */
    name: "Jack Frost ❄️",

    /* Browser tab title. */
    pageTitle: "Jack Frost ❄️ | Cosmic Winter Soul",

    /* Name on the intro/loading screen. */
    introTitle: "Jack Frost",

    /* Small text above the intro title. */
    introTagline: "WINTER PROTOCOL · 2026",

    /* Short bio under the name.
       You may use simple HTML such as
       <span class="highlight">AI</span> for colored words. */
    subtitleHTML:
      "🇧🇹 Bhutan · <span class=\"highlight\">AI</span> · " +
      "<span class=\"highlight-purple\">Cybersecurity</span> · " +
      "<span class=\"highlight-pink\">Programming</span> · " +
      "<span class=\"highlight\">Language Learning</span> · " +
      "<span class=\"highlight-purple\">English</span> · " +
      "Late-night cosmic thoughts 🌌",

    /* Footer text at the bottom of the card. */
    footerText: "© Jack Frost · Cosmic Winter Soul ❄️ · Est. 2026",

    /* ---------- LINKS & MEDIA ---------- */

    /* Your HelloTalk profile link. */
    helloTalkUrl: "https://www.hellotalk.com/r/MLuJAON=",

    /* Profile picture. Put your image in assets/images/
       and point to it, e.g. "./assets/images/me.jpg".
       Leave as "" to show the ❄️ fallback avatar instead. */
    avatarSrc: "./assets/images/avatar.jpg",

    /* Text shown to screen readers for the profile picture. */
    avatarAlt: "Jack Frost",

    /* Fallback emoji if the picture cannot load. */
    avatarFallback: "❄️",

    /* Background music file (relative to this page). */
    musicSrc: "./assets/audio/Jack_Frost_Christmas_Classic_Song(128k).mp3",

    /* ---------- TYPING EFFECT (roles under the name) ---------- */

    roles: [
      "> Ethical Hacker_",
      "> AI Explorer_",
      "> Future Developer_",
      "> Cybersecurity Mind_",
      "> Cosmic Programmer_",
      "> Winter Soul_",
      "> Web Developer_"
    ],

    /* ---------- ROTATING QUOTES ---------- */

    quotes: [
      "✨ “The cosmos whispers to those who listen.”",
      "❄️ “Even frost has a heartbeat.”",
      "🌌 “Stars are frozen music.”",
      "💙 “Some souls feel like winter sunsets.”",
      "⚡ “Programming by day. Overthinking by night.”",
      "😄 “My code doesn't always work, but my memes do.”",
      "🔥 “I'm not lazy, I'm in energy-saving mode.”",
      "🧊 “Stay frosty, stay curious.”",
      "🎧 “Currently playing: late-night thoughts & lo-fi.”",
      "💬 “Warning: may cause unexpected smiles.”",
      "🚀 “Dream big. Debug later.”",
      "📡 “Scanning for good vibes...”",
      "🍕 “Will code for pizza.”",
      "🌠 “Your vibe attracts your tribe.”",
      "💡 “Ideas are like snowflakes — unique and fleeting.”",
      "🧠 “Brain: 90% music, 10% deadlines.”",
      "💻 “Commit to kindness, push to main.”",
      "🤖 “AI won't replace you, but a person using AI might.”",
      "🌙 “Moonlights as a philosopher.”",
      "🎯 “Focus on the frost, ignore the noise.”",
      "💪 “You're one conversation away from a new perspective.”",
      "🎨 “Creativity is intelligence having fun.”",
      "🌍 “Hello from the other side of the world.”",
      "❤️ “Frosty outside, warm inside.”",
      "✨ “Let's make the universe our playground.”",
      "🔮 “The future is frosty and bright.”",
      "🦋 “Transforming caffeine into code since day one.”",
      "🌈 “Chasing auroras and algorithms.”",
      "🌐 “Building bridges, one website at a time.”"
    ],

    /* ---------- TERMINAL BOOT LINES ---------- */

    bootLines: [
      "[ SYSTEM BOOT SEQUENCE ]",
      "🟢 Frost Core: ACTIVE",
      "🟢 AI Research: ONLINE",
      "🟢 Ethical Hacking: ENGAGED",
      "🟢 Web Development: DEPLOYED",
      "🟢 Music Mode: STREAMING",
      "🟢 Programming Brain: OVERCLOCKED",
      "🟢 Cosmic Connection: STABLE",
      "🟢 Emotional Firewall: ARMED",
      "[ ALL SYSTEMS NOMINAL ]"
    ],

    /* ---------- INTERACTION BUTTON MESSAGES ---------- */

    greetMessages: [
      "你好！谢谢你访问我的页面！❄️",
      "مرحباً! شكراً لزيارتك! ❄️",
      "Hello! Thank you for visiting my bio! ❄️",
      "नमस्ते! तपाईंको भ्रमणको लागि धन्यवाद! ❄️",
      "Kuzu zangpo! བྱོན་པ་ལེགས་སོ། བཀྲ་ཤིས་བདེ་ལེགས། ❄️",
      "வணக்கம்! உங்கள் வருகைக்கு நன்றி! ❄️",
      "¡Hola! ¡Gracias por visitar! ❄️",
      "안녕하세요! 방문해 주셔서 감사합니다! ❄️",
      "Bonjour! Merci de visiter! ❄️",
      "こんにちは！訪問ありがとうございます！❄️",
      "Salaan! Waad ku mahadsan tahay booqashadaada! ❄️",
      "Olá! Obrigado pela visita! ❄️",
      "হ্যালো! আমার বায়ো ভিজিট করার জন্য ধন্যবাদ! ❄️"
    ],

    inspireMessages: [
      "✨ You have an awesome energy. Never dim your light.",
      "💡 Your curiosity is your superpower.",
      "🎨 You're a masterpiece in progress. Keep going.",
      "🌟 The world is brighter with you in it.",
      "🧠 Your mind is a beautiful constellation of ideas.",
      "💬 You make conversations unforgettable.",
      "🔥 You're cooler than a winter breeze. Literally.",
      "❤️ You're appreciated more than you know.",
      "🚀 Great things take time. You're on the right path.",
      "🦋 Every expert was once a beginner. Keep learning.",
      "🌐 The web is your canvas. Paint something beautiful.",
      "💎 You are rare. You are valuable. You are enough."
    ],

    frostMessages: [
      "❄️ “Frost melts, but genuine connections last forever.”",
      "💙 “Cold hands, warm heart, sharp mind.”",
      "🌌 “The night is darkest just before the aurora appears.”",
      "🎧 “Sometimes silence is the most powerful playlist.”",
      "🛡️ “Protect your peace like a firewall protects a server.”",
      "✨ “You are a beautiful glitch in the matrix of ordinary.”",
      "💻 “Code with compassion. Debug with patience.”",
      "🌠 “Shoot for the moon. Land among the stars.”",
      "🧊 “Stay frosty. The world needs your unique cool.”",
      "🔮 “The universe has a plan. Trust the frost.”",
      "🌐 “Every website tells a story. Make yours legendary.”"
    ],

    /* ---------- CARD SECTIONS ---------- */

    /* CORE INTERESTS cards. */
    interests: [
      {
        icon: "🤖",
        title: "AI & Future Tech",
        body: "Exploring intelligent systems, automation, creativity and futuristic innovation."
      },
      {
        icon: "🛡️",
        title: "Cybersecurity",
        body: "Ethical hacking, digital defense, privacy awareness and security research."
      },
      {
        icon: "💻",
        title: "Programming",
        body: "Building aesthetic projects, experiments and modern interactive experiences."
      },
      {
        icon: "🌐",
        title: "Website Development",
        body: "Crafting stunning, responsive web experiences with modern technologies."
      },
      {
        icon: "🎧",
        title: "Music & Vibes",
        body: "Night playlists, emotional melodies and coding under aurora skies."
      }
    ],

    /* Statistics — number counts up when scrolled into view. */
    stats: [
      { value: 9999, label: "👥 Friends (Unlimited)" },
      { value: 999, label: "🌙 Night Thoughts" },
      { value: 86, label: "🧪 AI Experiments" },
      { value: 404, label: "😴 Sleep Found" }
    ],

    /* Small pill tags. */
    tags: [
      "⚽ Football",
      "🤖 AI",
      "💻 Coding",
      "🛡️ Cyber",
      "🌐 Web Dev",
      "🎧 Music",
      "🌌 Deep Talks",
      "📚 Languages",
      "❄️ Winter Soul",
      "🌍 Global",
      "✨ Cosmic"
    ],

    /* Personality lines (one per line). */
    personalityLines: [
      "✨ “Probably overthinks texts but replies with effort.”",
      "❄️ “I debug code faster than mixed signals.”",
      "🌌 “Lowkey dangerous with playlists and late-night conversations.”"
    ],

    /* ---------- BEHAVIOR ---------- */

    /* Auto-enter the site this many ms after the intro
       finishes loading (0 = wait for a tap forever). */
    autoEnterDelayMs: 10000
  };

  /* ============================================================
     APPLY CONFIG TO THE PAGE
     (you normally don't need to change anything below)
     ============================================================ */

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function setText(selector, value) {
    const element = document.querySelector(selector);
    if (element && value) {
      element.textContent = value;
    }
  }

  function renderInterests() {
    const container = document.querySelector(".skills");
    if (!container || !config.interests.length) return;

    container.innerHTML = config.interests
      .map(
        (item) =>
          '<div class="skill">' +
          "<h4>" +
          escapeHtml(item.icon || "") +
          " " +
          escapeHtml(item.title) +
          "</h4>" +
          "<p>" +
          escapeHtml(item.body) +
          "</p>" +
          "</div>"
      )
      .join("");
  }

  function renderStats() {
    const container = document.querySelector(".stats");
    if (!container || !config.stats.length) return;

    container.innerHTML = config.stats
      .map(
        (stat) =>
          '<div class="stat">' +
          '<div class="statNum" data-target="' +
          escapeHtml(stat.value) +
          '">0</div>' +
          '<div class="statLabel">' +
          escapeHtml(stat.label) +
          "</div>" +
          "</div>"
      )
      .join("");
  }

  function renderTags() {
    const container = document.querySelector(".tags");
    if (!container || !config.tags.length) return;

    container.innerHTML = config.tags
      .map((tag) => '<div class="tag">' + escapeHtml(tag) + "</div>")
      .join("");
  }

  function renderPersonality() {
    const container = document.querySelector(".flirty");
    if (!container || !config.personalityLines.length) return;

    container.innerHTML = config.personalityLines
      .map(escapeHtml)
      .join("<br><br>");
  }

  function renderAvatar() {
    const image = document.querySelector(".avatar");
    if (!image) return;

    function showFallback() {
      const fallback = document.createElement("div");
      fallback.className = "avatar-fallback";
      fallback.setAttribute("aria-hidden", "true");
      fallback.textContent = config.avatarFallback || "❄️";
      image.replaceWith(fallback);
    }

    image.alt = config.avatarAlt || config.name;

    image.addEventListener("error", showFallback, { once: true });

    if (config.avatarSrc) {
      image.src = config.avatarSrc;
    } else {
      showFallback();
      return;
    }

    /* The image may already have failed before this script ran. */
    if (image.complete && image.naturalWidth === 0) {
      showFallback();
    }
  }

  function applyConfig() {
    if (config.pageTitle) {
      document.title = config.pageTitle;
    }

    setText(".name", config.name);
    setText(".intro-title", config.introTitle || config.name);
    setText(".intro-subtitle", config.introTagline);
    setText(".footer", config.footerText);

    const subtitle = document.querySelector(".subtitle");
    if (subtitle && config.subtitleHTML) {
      subtitle.innerHTML = config.subtitleHTML;
    }

    const helloTalk = document.querySelector(".hellotalk-btn");
    if (helloTalk && config.helloTalkUrl) {
      helloTalk.href = config.helloTalkUrl;
    }

    renderAvatar();
    renderInterests();
    renderStats();
    renderTags();
    renderPersonality();
  }

  window.JackFrost = window.JackFrost || {};
  window.JackFrost.config = config;
  window.JackFrost.escapeHtml = escapeHtml;

  applyConfig();
})();
