# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ElaAdmin (Version 3.0.0) is a modernized Bootstrap 5 Admin Dashboard Template built with Vite. It features a component-based architecture with Handlebars templating, modern ES6+ JavaScript, and optimized build processes. This version represents a complete modernization from the original Bootstrap 4 template.

## Key Technologies

- **Vite 5** - Modern build tool with HMR and optimized production builds
- **Bootstrap 5.3** - Latest Bootstrap without jQuery dependency
- **Handlebars** - Templating for reusable components (header, sidebar, footer)
- **Sass/SCSS** - Modern module syntax with `@use` and `@forward`
- **Chart.js 4** - Modern charting library
- **Font Awesome 6** - Latest icon library
- **ES6 Modules** - Modern JavaScript with dynamic imports

## Development Commands

```bash
# Install dependencies
npm install

# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint JavaScript files
npm run lint

# Format code with Prettier
npm run format
```

## Architecture & Structure

### Directory Structure

```
/src
  /js
    main.js           # Core application with Bootstrap initialization
    /pages           # Page-specific JavaScript modules
  /scss
    main.scss        # Main stylesheet with Bootstrap 5
    _variables.scss  # Custom variables and theme settings
    /components     # Component-specific styles
  /partials         # Handlebars templates
    head.hbs        # Common <head> content
    header.hbs      # Top navigation bar
    sidebar.hbs     # Sidebar navigation
    footer.hbs      # Footer component
    scripts.hbs     # Script imports with dynamic loading
```

### Modern JavaScript Patterns

- ES6 modules with import/export
- Async/await for data fetching
- Dynamic imports for code splitting
- No jQuery dependency (vanilla JS + Bootstrap 5)

### Templating System

All HTML pages use Handlebars partials:

```html
{{> head title="Page Title"}} {{> sidebar}} {{> header}} {{> footer}} {{> scripts}}
```

### Adding New Features

1. **New Pages**: Create HTML with Handlebars partials, add to vite.config.js input
2. **New Components**: Add partial in `/src/partials/`, styles in `/src/scss/components/`
3. **Page Logic**: Create module in `/src/js/pages/`, import dynamically in scripts.hbs
4. **Dependencies**: Use npm to install, import in relevant modules

## Important Improvements Made

- **Vite Build System**: Fast development with HMR, optimized production builds
- **Bootstrap 5**: Removed jQuery dependency, modern utilities and components
- **Component Architecture**: Reusable partials reduce code duplication
- **Modern JavaScript**: ES6+ features, better performance and maintainability
- **Updated Dependencies**: All libraries updated to latest stable versions
- **CSS Custom Properties**: Support for theming and dark mode
- **Code Quality**: ESLint and Prettier configured

## Performance Optimizations

- Dynamic imports for page-specific code
- Tree-shaking for unused code removal
- CSS and JS minification in production
- Asset fingerprinting for cache busting
- Lazy loading for charts and heavy components
