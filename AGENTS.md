# AGENTS.md — Daily Forge

## What this is

Pure static website (HTML/CSS/JS). No backend, no database, no build step. Deploy anywhere that serves static files (GitHub Pages, Netlify, etc).

## Commands

| Action | Command |
|---|---|
| Local preview | `npx serve frontend` |
| Deploy to GitHub Pages | Push to GitHub, enable Pages in repo settings |

No `npm install` needed — zero dependencies.

## Structure

```
frontend/
  index.html          ← Landing page
  dashboard.html      ← Challenge tracker (uses localStorage)
  assets/css/style.css  ← Single stylesheet (~2000 lines, glassmorphism dark theme)
  assets/js/main.js     ← Shared utilities (formatting, toasts, icons)
  assets/js/dashboard.js ← Dashboard logic, hardcoded challenges, localStorage
```

## How it works

- **15 hardcoded challenges** across 7 categories with 3 difficulty levels
- **XP system:** 10/25/50 XP by difficulty. Level = floor(totalXP/100) + 1
- **Streak tracking:** Based on consecutive days with completions (localStorage)
- **No auth** — all data stored in browser localStorage under `dailyforge_completions`

## Key conventions

- **CSS:** Single `style.css`, glassmorphism dark theme with CSS custom properties
- **JS:** Vanilla JS, no frameworks, no modules, no build step
- **External deps:** Google Fonts (Inter), Font Awesome 6.4.0 (CDN only)
- **Data persistence:** `localStorage` key `dailyforge_completions` stores JSON array of completions

## Deploy to GitHub Pages

1. Push repo to GitHub
2. Repo → Settings → Pages
3. Source: `main` branch, folder: `/ (root)` or `/frontend`
4. Site live at `https://YOUR_USERNAME.github.io/YOUR_REPO/`

If using `/frontend` as source, update asset paths to be relative (they already are).
