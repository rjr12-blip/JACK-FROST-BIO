# ❄️ JACK-FROST-BIO

> A cinematic identity card for a person who prefers leaving an atmosphere behind.

## 🌐 LIVE DEMO

[![Open the live experience](https://img.shields.io/badge/OPEN_THE_LIVE_EXPERIENCE-8b5cf6?style=for-the-badge&logo=github&logoColor=white)](https://rjr12-blip.github.io/JACK-FROST-BIO/)

### 👉 **[rjr12-blip.github.io/JACK-FROST-BIO](https://rjr12-blip.github.io/JACK-FROST-BIO/)**

One click opens the finished website — frost intro, background music, falling
snow, typing roles, rotating quotes and all. Nothing to install, nothing to
build; it runs right in the browser.

[![HTML5](https://img.shields.io/badge/HTML5-0f172a?style=for-the-badge&logo=html5&logoColor=white)](./index.html)
[![CSS3](https://img.shields.io/badge/CSS3-0f172a?style=for-the-badge&logo=css3&logoColor=white)](./css/style.css)
[![JavaScript](https://img.shields.io/badge/JAVASCRIPT-0f172a?style=for-the-badge&logo=javascript&logoColor=yellow)](./js/)
[![GitHub Pages](https://img.shields.io/badge/HOSTED_ON-GitHub_Pages-222222?style=for-the-badge&logo=githubpages&logoColor=white)](https://rjr12-blip.github.io/JACK-FROST-BIO/)

Hosted free on **GitHub Pages**, served straight from the `main` branch of this
repository (root folder) — no build step, no framework, no server.

## The feeling

JACK-FROST-BIO transforms a simple introduction into a small digital keepsake:
nocturnal, icy, personal, and intentionally unforgettable. It was designed for
**HelloTalk** and social introductions where the first impression deserves more
than a paragraph: an animated frost intro, falling snow, background music, a
typing role cycler, rotating quotes, a terminal boot sequence, count-up
statistics and a friendly button that greets visitors in a dozen languages.

## What this project is (and what you can reuse it for)

It started as a creative short bio for HelloTalk. Because every personal detail
lives in one obvious file (`js/config.js`), the same experience works great as:

- ✅ personal profiles & social introductions
- ✅ friendship pages
- ✅ birthday / celebration pages
- ✅ small portfolios & personal landing pages
- ✅ any creative "digital introduction" you can imagine

## Inside the experience

- An expressive personal narrative with a clear visual voice
- A responsive interface that feels good on every screen — from small Android
  phones to desktop
- An icy cinematic mood **without frameworks, build tools, or setup friction**
- Smooth, natural vertical scrolling (no nested scroll areas, no scroll traps)
- Respects `prefers-reduced-motion` and stays light on mobile batteries
- A shareable identity artifact that is easy to host and customize

## Project structure

```text
JACK-FROST-BIO/
├── index.html          # the page — semantic HTML structure
├── css/
│   └── style.css       # all styling + responsive layout
├── js/
│   ├── config.js       # ⭐ START HERE — your personal customization
│   ├── app.js          # shared utilities + initialization
│   ├── intro.js        # loading screen, frost canvas, entrance
│   ├── audio.js        # music playback + indicator button
│   ├── effects.js      # stars & falling snow
│   └── interactions.js # clock, typing, quotes, terminal, counters…
├── assets/
│   ├── audio/          # background music (MP3)
│   └── images/         # drop your profile picture here
├── README.md           # this file
└── CUSTOMIZE.md        # beginner-friendly editing guide
```

## Run it locally

```bash
git clone https://github.com/rjr12-blip/JACK-FROST-BIO.git
cd JACK-FROST-BIO
open index.html          # Windows: double-click index.html
```

Everything is relative-path based, so opening the file directly — or serving the
folder with any static server — both work.

## Make it yours (quick start)

1. Open **`js/config.js`** — it is clearly marked
   **“START HERE — PERSONAL CUSTOMIZATION”**.
2. Change your name, bio, roles, quotes, HelloTalk link, footer…
3. Put your own picture in `assets/images/` and point `avatarSrc` at it.
4. Replace the music in `assets/audio/` (or change `musicSrc`).
5. Colors/design → `css/style.css` (design tokens live at the top).

Full step-by-step instructions: **[CUSTOMIZE.md](./CUSTOMIZE.md)**

## Deploy your own version (GitHub Pages)

1. Push this repository to GitHub.
2. Open **Settings → Pages**.
3. Under *Source*, choose **Deploy from a branch**, pick `main` / `(root)`.
4. Save — your site appears at
   `https://<your-username>.github.io/JACK-FROST-BIO/`.

All asset paths are relative (`./css/…`, `./js/…`, `./assets/…`), so the site
works at that sub-path out of the box. `index.html` is the entry point.

## Security

This project is a **static front-end** — it ships no secrets, no API keys and
no tracking.

> ⚠️ **An older version of this page contained a Telegram bot token inside the
> public JavaScript. That token must be considered compromised — revoke it in
> @BotFather. Never put credentials in front-end code.**

If you ever want a “new visitor” notification, call **your own server endpoint**
(e.g. `POST /api/visitor-alert`) and let that server talk to the Telegram Bot
API with the secret stored server-side.

## Quality checklist

- [x] `index.html` + CSS + JS load with relative paths (GitHub Pages ready)
- [x] Music plays from `assets/audio/`, with honest play/pause/autoplay states
- [x] Natural vertical scrolling, no horizontal overflow, no nested scrollers
- [x] Keyboard focus states, semantic HTML, reduced-motion support
- [x] No exposed secrets or trackers
- [x] Beginner-friendly customization in one file

> **Design principle:** make someone curious enough to say hello.

Crafted by **rjr12-blip**.
