# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ElaAdmin (Version 4.0.0) is a modernized Bootstrap 5 Admin Dashboard Template built with Vite. It features a component-based architecture with Handlebars templating, modern ES6+ JavaScript, and optimized build processes.

## Key Technologies

- **Vite 8** - Build tool with HMR. Note: Vite 8 uses **Rolldown**, not Rollup.
- **Bootstrap 5.3** - No jQuery dependency
- **Handlebars** (via `vite-plugin-handlebars`) - Reusable partials
- **Sass/SCSS** - Modern module syntax with `@use` and `@forward`
- **Chart.js 4**, **DataTables 3**, **Leaflet**, **SweetAlert2 11**
- **Font Awesome 7** + **Bootstrap Icons** - both self-hosted
- **ESLint 10** (flat config) + **Prettier 3**

## Development Commands

```bash
npm install          # Install dependencies
npm run dev          # Dev server with HMR (port 3000)
npm run build        # Production build
npm run preview      # Preview production build
npm run lint         # ESLint
npm run lint:fix     # ESLint with autofix
npm run format       # Prettier write
npm run format:check # Prettier check (CI)
npm run audit        # Fail on high/critical advisories
npm run check        # lint + format:check + build (what CI runs)
```

Node must satisfy `^20.19.0 || ^22.13.0 || >=24.0.0`. Run `nvm use` to pick up `.nvmrc`.

## Architecture & Structure

```text
/src
  /js
    main.js           # Core entry: Bootstrap, styles, shared layout behaviour
    /pages            # Page modules, lazily imported by scripts.hbs
  /scss
    main.scss         # Main stylesheet; @use order matters (see below)
    _variables.scss   # Custom variables, loaded before Bootstrap
    /components       # Component-specific styles
  /partials           # Handlebars templates
    head.hbs          # Common <head> content
    header-ela.hbs    # Top navigation bar
    sidebar-ela.hbs   # Sidebar navigation
    footer.hbs        # Footer component
    scripts.hbs       # Core bundle + explicit page route table
```

### Templating System

Every page composes the same partials. `header-ela` / `sidebar-ela` are the only
header/sidebar variants that ship — earlier `-clean` and `-simple` variants were
removed in 4.0.0.

```html
{{> head title="Page Title"}} {{> sidebar-ela}} {{> header-ela}} {{> footer}} {{> scripts}}
```

### Page module loading

`scripts.hbs` holds an **explicit route table** keyed on the HTML filename. Each
value must use a **literal** import specifier so Vite can statically analyse it and
emit a separate chunk:

```js
const routes = {
  'tables-basic': () => import('/src/js/pages/tables.js').then(m => m.initializeTablesPage()),
};
```

Do not reintroduce substring matching (`path.includes('tables')`) — it is
order-dependent and matched multiple pages incorrectly.

A page module must either self-initialize or be invoked from the route table.
`charts.js` previously did neither, so its charts silently never rendered.

## Gotchas

- **Vite 8 = Rolldown.** `build.rollupOptions.output.manualChunks` as an _object_
  throws; use a function, or Rolldown's native `output.advancedChunks.groups`.
- **SCSS `@use` order is load-bearing.** `_mobile-layout.scss` must stay last — it
  overrides sidebar/overlay rules with `!important` for the mobile breakpoint.
- **The sidebar root is `.left-panel`, not `.sidebar`.** Rules written as
  `.sidebar .foo` will not match the shipping markup.
- **DataTables 3 removed the `dom` option.** Use `layout: { topStart: 'buttons', ... }`.
- **DataTables export libs register via setters**, not globals:
  `DataTable.Buttons.jszip(JSZip)` / `DataTable.Buttons.pdfMake(pdfMake)`.
  They are dynamically imported in `tables.js` — keep it that way, since pdfmake
  plus its font VFS is ~1.8 MB.
- **pdfmake 0.3 exports the VFS directly** (`pdfMake.vfs = fonts`), not under
  `.pdfMake.vfs` as in 0.2.
- **No CDN `<script>`/`<link>` tags.** Everything is bundled or self-hosted from
  npm; adding a CDN tag reintroduces an unpinned, SRI-less supply-chain path.
- **`*.hbs` is in `.prettierignore`** — Prettier's glimmer parser is for Ember and
  mangles these plain-HTML partials.

## Adding New Features

1. **New Pages**: Create HTML using the partials above. `vite.config.js` picks up
   every `.html` in the project root automatically — no manual input entry needed.
2. **New Components**: Partial in `/src/partials/`, styles in `/src/scss/components/`,
   then `@use` it from `main.scss` (before `mobile-layout`).
3. **Page Logic**: Module in `/src/js/pages/`, then add a route in `scripts.hbs`.
4. **Dependencies**: `npm install`, then import in the relevant module. Prefer
   dynamic `import()` for anything large.

## Before Committing

Run `npm run check`. CI runs lint, format check and build on Node 20.19/22/24, plus
`npm audit --audit-level=high` — advisories fail the PR rather than accumulating.
