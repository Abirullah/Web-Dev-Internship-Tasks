# Marginale

A split-view Markdown editor built with React. Write on the left, see the
rendered page on the right, and export straight to `README.md` when you're
done.

## Features

- **Live side-by-side preview** — powered by `react-markdown` + `remark-gfm`
  (tables, task lists, strikethrough) and `rehype-highlight` for code blocks
- **Formatting toolbar** — headings, bold/italic/strikethrough, links,
  images, inline & block code, lists, task lists, quotes, tables, and
  horizontal rules, plus `Cmd/Ctrl+B` / `I` / `K` shortcuts
- **Four preview themes** — Paper, GitHub, Dusk, and Sepia, so you can check
  how your README will look in different rendering contexts
- **One-click export** — download the current content as `README.md`, or
  copy it straight to the clipboard
- **Autosave** — your draft is saved to `localStorage` as you type
- **Resizable, responsive layout** — drag the divider on desktop; panes
  stack vertically on mobile

## Tech stack

- React 19 + Vite
- Tailwind CSS
- `react-markdown`, `remark-gfm`, `rehype-highlight`

## Getting started

```bash
npm install
npm run dev
```

Open the local URL Vite prints (typically `http://localhost:5173`).

## Build

```bash
npm run build
npm run preview   # serve the production build locally
```

## Project structure

```
src/
  components/
    Editor.jsx          # textarea + line numbers + toolbar
    Toolbar.jsx          # formatting buttons
    Preview.jsx          # react-markdown rendering + theme wrapper
    ThemeSwitcher.jsx    # theme pill selector
    SplitDivider.jsx     # draggable resize handle
  utils/
    markdownActions.js   # cursor-aware syntax insertion helpers
    download.js           # Blob-based file download helper
  defaultContent.js       # starter template shown on first load
  App.jsx                 # layout, state, persistence
```

## Deploying

Any static host works since this is a Vite SPA — Vercel, Netlify, or GitHub
Pages are the quickest options:

```bash
npm run build
# then deploy the generated dist/ folder
```
