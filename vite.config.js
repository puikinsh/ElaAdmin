import { defineConfig } from 'vite';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import handlebars from 'vite-plugin-handlebars';
import { readdirSync } from 'fs';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = resolve(__filename, '..');

// Get all HTML files in root directory (excluding test files)
const htmlFiles = readdirSync('.')
  .filter(file => file.endsWith('.html'))
  .filter(file => !file.startsWith('test-')); // Exclude test files

// Create input object for Vite build
const input = htmlFiles.reduce((acc, file) => {
  const name = file.replace('.html', '');
  acc[name] = resolve(__dirname, file);
  return acc;
}, {});

// Shared partial data for all pages
const pageData = {
  title: 'ElaAdmin - Bootstrap 5 Admin Dashboard',
  year: new Date().getFullYear(),
};

export default defineConfig({
  base: './',
  plugins: [
    handlebars({
      partialDirectory: resolve(__dirname, 'src/partials'),
      context: pageData,
      reloadOnPartialChange: true,
      helpers: {
        // Equality helper
        eq: (a, b) => a === b,
        // Includes helper for checking if string contains substring
        includes: (str, substr) => {
          if (!str || !substr) return false;
          return str.toString().includes(substr.toString());
        },
        // Not equal helper
        ne: (a, b) => a !== b,
        // Greater than
        gt: (a, b) => a > b,
        // Less than
        lt: (a, b) => a < b,
        // Logical and
        and: (a, b) => a && b,
        // Logical or
        or: (a, b) => a || b,
        // If block helper
        ifCond: function (v1, operator, v2, options) {
          switch (operator) {
            case '==':
              return v1 == v2 ? options.fn(this) : options.inverse(this);
            case '===':
              return v1 === v2 ? options.fn(this) : options.inverse(this);
            case '!=':
              return v1 != v2 ? options.fn(this) : options.inverse(this);
            case '!==':
              return v1 !== v2 ? options.fn(this) : options.inverse(this);
            case '<':
              return v1 < v2 ? options.fn(this) : options.inverse(this);
            case '<=':
              return v1 <= v2 ? options.fn(this) : options.inverse(this);
            case '>':
              return v1 > v2 ? options.fn(this) : options.inverse(this);
            case '>=':
              return v1 >= v2 ? options.fn(this) : options.inverse(this);
            case '&&':
              return v1 && v2 ? options.fn(this) : options.inverse(this);
            case '||':
              return v1 || v2 ? options.fn(this) : options.inverse(this);
            default:
              return options.inverse(this);
          }
        },
      },
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@scss': resolve(__dirname, 'src/scss'),
      '@js': resolve(__dirname, 'src/js'),
      '@assets': resolve(__dirname, 'assets'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@scss/variables" as *;`,
        api: 'modern-compiler',
      },
    },
  },
  build: {
    rollupOptions: {
      input,
      output: {
        assetFileNames: assetInfo => {
          let extType = assetInfo.name.split('.').at(1);
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = 'images';
          }
          return `assets/${extType}/[name]-[hash][extname]`;
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      },
    },
  },
  server: {
    port: 3000,
    open: true,
    host: true,
  },
});
