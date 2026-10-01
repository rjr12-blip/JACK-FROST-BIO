# 🎨 CUSTOMIZE.md

**Welcome!** You don't need to be a programmer to make this project yours.

Almost everything personal — your name, your bio, your links, your music —
lives in **one file**:

```text
js/config.js
```

Open it in any text editor. It starts with a big banner:

```text
❄️ START HERE — PERSONAL CUSTOMIZATION ❄️
```

Change the text between the quotes `"` and save the file. That's it.

---

## Quick answers

| I want to change… | Edit this |
| --- | --- |
| My name | `js/config.js` → `name` (and `introTitle`) |
| My bio / subtitle | `js/config.js` → `subtitleHTML` |
| My browser tab title | `js/config.js` → `pageTitle` |
| My footer text | `js/config.js` → `footerText` |
| My HelloTalk link | `js/config.js` → `helloTalkUrl` |
| My profile picture | put it in `assets/images/`, then set `avatarSrc` |
| The music | drop a file in `assets/audio/`, then set `musicSrc` |
| The typed roles (`> AI Explorer_`) | `js/config.js` → `roles` |
| The rotating quotes | `js/config.js` → `quotes` |
| The terminal boot lines | `js/config.js` → `bootLines` |
| The Greet / Inspire / Frost messages | `js/config.js` → `greetMessages`, `inspireMessages`, `frostMessages` |
| My interests (CORE INTERESTS cards) | `js/config.js` → `interests` |
| My statistics | `js/config.js` → `stats` |
| My tag pills | `js/config.js` → `tags` |
| My personality lines | `js/config.js` → `personalityLines` |
| Colors, fonts, spacing, design | `css/style.css` (design tokens at the very top) |
| The page structure / wording on the card | `index.html` |
| How things behave (typing speed, tilt…) | `js/interactions.js`, `js/intro.js` |

---

## Step-by-step examples

### ✏️ Want to change your name?

1. Open `js/config.js`.
2. Find:

   ```js
   name: "Jack Frost ❄️",
   ```

3. Change it to your name:

   ```js
   name: "Your Name ❄️",
   ```

4. Save the file and refresh the page.

### ✏️ Want to change your bio?

In `js/config.js`, find `subtitleHTML` and write your own line.
You may use simple HTML for colored words, like this:

```js
subtitleHTML: "🇧🇹 Bhutan · <span class=\"highlight\">AI</span> · Night owl 🌙",
```

### ✏️ Want to replace the profile image?

1. Copy your picture into the `assets/images/` folder
   (create it if it doesn't exist), e.g. `assets/images/me.jpg`.
2. In `js/config.js`, find `avatarSrc` and point to your file:

   ```js
   avatarSrc: "./assets/images/me.jpg",
   ```

3. Update `avatarAlt` so screen readers describe your picture.

> Tip: if the image ever fails to load, the page gracefully shows a ❄️
> fallback avatar instead of a broken image.

### ✏️ Want to replace the music?

1. Put your `.mp3` file in `assets/audio/`.
2. In `js/config.js`, find `musicSrc`:

   ```js
   musicSrc: "./assets/audio/your-song.mp3",
   ```

3. Keep the `./` at the start — it means “relative to this page”, which is what
   GitHub Pages needs.

> The old file can be deleted, or kept as a backup.

### ✏️ Want to change colors or the whole design?

Open `css/style.css` and scroll to **DESIGN TOKENS** at the top:

```css
:root {
  --cyan: #7dd3fc;    /* icy blue */
  --purple: #a78bfa;  /* aurora purple */
  --pink: #f9a8d4;    /* soft pink */
  --bg-0: #01030d;    /* deepest background */
  /* … */
}
```

Change a color, save, refresh. You don't need to hunt through the rest of the
file.

### ✏️ Want to turn the HelloTalk button into something else?

In `js/config.js` set `helloTalkUrl` to any link you like (Instagram, Discord,
email…). The button text itself lives in `index.html` inside the `.cta`
section.

---

## How to test your changes before committing

**1. The lazy way (fastest):**

- Open `index.html` in your browser (double-click it).
- Press **Ctrl+R** (Windows/Linux) or **Cmd+R** (Mac) to reload after each save.

**2. The local-server way (most accurate):**

Some browsers block music/files on `file://`. Use any tiny static server, e.g.:

```bash
# if you have Node.js
npx serve .

# or Python
python3 -m http.server
```

Then open the address it prints (usually `http://localhost:3000` or
`:8000`).

**3. Check these things before you commit:**

- [ ] Your name, bio and picture look right
- [ ] Music plays (tap once — browsers require a tap before sound)
- [ ] The page scrolls normally and nothing sticks off-screen sideways
- [ ] On a phone (or narrow window): no horizontal scrollbar
- [ ] You didn't leave a secret or password anywhere in the code

**4. Commit with Git:**

```bash
git add .
git commit -m "Customize my bio"
git push
```

---

## Common mistakes (and easy fixes)

| Symptom | Likely cause |
| --- | --- |
| Page goes blank | A missing comma, quote or `}` in `js/config.js` — undo your last edit |
| Image not showing | Wrong path — it must start with `./assets/images/…` |
| Music not playing | Wrong `musicSrc`, or you forgot to tap (autoplay is blocked by browsers on purpose) |
| Nothing happens when I edit `index.html` | The live content is rendered from `js/config.js` — edit there instead |
| Colors didn't change | Hard-refresh with **Ctrl+Shift+R** to bust the cache |

---

## Where NOT to worry

You do **not** need to touch:

- `js/effects.js` — stars & snow
- `js/audio.js` — playback rules
- `js/intro.js` — the loading screen
- `js/app.js` — wiring it all together

…unless you're feeling adventurous. Have fun — and keep it frosty ❄️.
