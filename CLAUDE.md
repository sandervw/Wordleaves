# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` - Start Vite dev server
- `npm run build` - Type-check with TypeScript, then build with Vite
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Tech Stack

React 19 + TypeScript (strict mode) + Vite 7. TipTap for rich text/markdown editing. No test framework is currently configured.

## Architecture

A story/worldbuilding web app with a 3-column layout: left sidebar (stories nav), center content, right sidebar (domain nav). Routing is state-based via `currentPage` in `App.tsx` (not a router library).

```
src/
├── components/
│   ├── layout/     Navbar, Sidebar
│   ├── pages/      Homepage, Page
│   └── parts/      MarkdownText (TipTap wrapper), SVG (dynamic loader)
├── domaindocs/     Domain markdown content files
├── storydocs/      Story markdown content files
├── sparse.css      Main stylesheet (see Sparse CSS rules below)
└── App.tsx         Root component with page state and layout
```

## Sparse Code Standards

This project follows "Sparse" standards across CSS, React, and TypeScript. All rules are `No Exceptions`. Full standards live in `standards/`.

### Sparse CSS

1. No more than 5 of any variable type (sizes: `--xsmall` through `--xlarge`)
2. No hardcoded numeric values -- only CSS variables
3. Only rems, never ems
4. No more than 3 distinct "types" per class category
5. Only 4 percentages: 25%, 50%, 75%, 100%
6. Only 2 colors: `copper` (accent) and `danger` (red)
7. Max 2 classes per element
8. One animation speed, one border radius, no box shadows

Theme toggling uses `data-theme="dark|light"` on `<html>`, persisted in localStorage.

### Sparse React

1. Features with UI + external deps must split into three layers: `components/`, `hooks/`, `services/`
2. Components are JSX views only: no data fetching, no business logic
3. Hooks contain all stateful logic, side effects, and fetch requests via `TanStack`
4. Services are pure synchronous business logic: no `React` imports
5. All object schemas in a dedicated `types/` folder
6. Function components with hooks only: no class components
7. Each `.tsx` file exports a single component, named after the file
8. `useEffect` only for external systems: data fetching, subscriptions, timers
9. Replace internal `useEffect` cases with derived state, memoization, or `TanStack`
10. Props declared via interface at top of file, named `[ComponentName]Props`
11. Always destructure and pass props explicitly: never use `...rest` parameters
12. Event handlers doing more than one function call must be extracted to a separate function
13. Every mapped element must have a stable, unique key from data, never array indexes
14. Max one level of ternary operators for conditional rendering

### Sparse TypeScript

1. Use `strict` mode in `tsconfig.json`
2. Use `unknown` instead of `any` for uncertain types
3. All function inputs must be `readonly`
4. All functions must have explicit return types
5. All exported classes, functions, and interfaces must use explicit types for parameters and return values
6. All functions must use arrow function syntax, not function declarations
7. Only use implicit types for local variables
8. All object shapes defined using interfaces
9. Primitives, unions, and mapped/conditional types defined using type aliases
10. Variant objects must use discriminated unions, not class hierarchies
11. Use unions of literal types instead of enums
12. Use Promises for async control flow: only use callbacks for framework-mandated signatures
13. All export statements at the bottom of the file
14. All exports must be named exports, no default exports

## Other Conventions

- CSS class-based styling (no CSS-in-JS, no inline styles)
- SVG assets in `public/`, loaded dynamically via the `SVG` component
- Markdown files in `domaindocs/` and `storydocs/` as content source
- ARIA labels on interactive elements
