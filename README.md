# Gauri Gohad · Portfolio

My personal site: [gaurig-portfolio.vercel.app](https://gaurig-portfolio.vercel.app)

A one-page portfolio with a magic-city hero that switches between day and night, a little blue dragon that flies around while you scroll, falling sakura petals by day and twinkling stars by night.

## Run it on your computer

You need **Node.js 20 or newer** ([nodejs.org](https://nodejs.org)).

```bash
npm install
npm run dev
```

Then open **http://localhost:5173**. The page reloads by itself whenever you save a file.

Other commands:

| Command | What it does |
| --- | --- |
| `npm run build` | Builds the final site into `dist/` |
| `npm run preview` | Serves that build at http://localhost:4173 so you can check it |
| `npm run lint` | Checks the code for mistakes |

## Where to change things

| To change… | Edit |
| --- | --- |
| Intro text, links, projects, skills, certifications | `src/data.js` |
| Page layout and sections | `src/App.jsx` |
| Colours, fonts, spacing | `src/index.css` (colours are at the top) |
| The city skyline | `src/scenes/city.js` |
| Petals and stars | `src/scenes/sky.js` |
| How the dragon flies | `src/scenes/dragonFlight.js` |
| Your photo and project images | `public/profile.webp`, `public/projects/` |

## How it's built

- **React 19 + Vite**, no UI framework.
- **Everything is drawn in code on `<canvas>`**: the city, clouds, moon, petals, stars and the dragon.
- **The dragon** started as a free LottieFiles animation. I converted it into plain shapes and keyframes (`src/scenes/dragonData.js`) and wrote my own small player for it (`src/scenes/dragonPlayer.js`), so there is no animation library.
- **Fonts** (Shantell Sans, Geist, Geist Mono) are bundled with the site, so the page doesn't load anything from other websites.
- **Accessibility:** if "reduce motion" is turned on, the scenes stay still, and the day/night choice is remembered.

## Deploy

Vercel builds this automatically from GitHub. Framework preset is **Vite**, build command is `npm run build`, and the output folder is `dist`.
