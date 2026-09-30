# gauri-portfolio

A manga-styled data-engineering portfolio for Gauri Gohad (GG).
React 19 + Vite, plain CSS, zero UI libraries.

- **All content lives in `src/data.js`** — edit that file to update projects, certs, awards, shelf items and the fake reviews.
- `src/sql.js` — the tiny in-browser SQL engine behind the "Query me" console.
- `src/icons.jsx` — hand-drawn SVG icons.

```bash
npm install
npm run dev      # local dev
npm run build    # production build → dist/
```

Deploys automatically on Vercel (framework preset: Vite, output: `dist`).
