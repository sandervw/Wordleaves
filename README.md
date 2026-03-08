# Wordleaves

[www.wordleaves.com](https://www.wordleaves.com)

The SPA webapp I use for hosting my stories and story settings. Build around my 'Sparse' laws for CSS, Typescript, and React.

## Overview

Two kinds of markdown content are managed side by side:

- **Stories** - Stories (left sidebar)
- **Domains** - Setting/Lore docs, and lists of stories in those settings (right sidebar)

Content lives as `.md` files in `src/storydocs/` and `src/domaindocs/`. Vite bundles them at build time via `import.meta.glob`, so adding a new document is as simple as dropping a markdown file into the right folder.

## How Content Loads

1. All `.md` files in `storydocs/` and `domaindocs/` are eagerly imported as raw strings at build time
2. Filenames become navigation entries in the sidebars (hyphens render as spaces)
3. Clicking an entry sets `currentPage` state in `App.tsx`, which looks up the content from a shared `Map`
4. The selected markdown is rendered through TipTap as editable rich text

No router library is used -- navigation is purely state-driven.

## Project Structure

```
src/
├── App.tsx                 Root component, content loading, page state
├── sparse.css              Sparse CSS framework
├── classic.css             Layout styles (navbar, sidebar, page)
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx      Top bar with title, author, theme toggle
│   │   └── Sidebar.tsx     Navigation list for stories or domains
│   ├── pages/
│   │   ├── Homepage.tsx    Landing page
│   │   └── Page.tsx        Markdown content display
│   └── parts/
│       ├── MarkdownText.tsx   TipTap editor wrapper
│       └── SVG.tsx            Dynamic SVG icon loader
├── domaindocs/             Domain/lore markdown files
├── storydocs/              Story markdown files
└── types/
    └── DocEntry.ts         Shared type for doc entries
```

## Tech Stack

- **React 19** + **TypeScript** (strict mode) + **Vite 7**
- **TipTap** for rich text / markdown editing and display
- Dark/light theme toggle via `data-theme` on `<html>`, persisted in localStorage

## Commands

```bash
npm run dev       # Start Vite dev server
npm run build     # Type-check + build
npm run lint      # Run ESLint
npm run preview   # Preview production build
```

## Sparse Standards

The codebase follows a set of strict architectural laws called "Sparse" covering CSS, React, and TypeScript. Full docs live in `standards/`. Think of it like a minimalist style guide -- hard caps on colors, variables, nesting, and component responsibilities to keep the codebase lean.
