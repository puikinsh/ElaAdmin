import { readdirSync } from 'node:fs';
import { dirname, extname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';

const __dirname = dirname(fileURLToPath(import.meta.url));

// One Rollup input per page. Reads from __dirname rather than process.cwd() so
// the build is identical no matter where npm is invoked from.
const input = Object.fromEntries(
  readdirSync(__dirname)
    .filter(file => extname(file) === '.html')
    .map(file => [file.slice(0, -'.html'.length), resolve(__dirname, file)])
);

// Shared context available to every Handlebars partial.
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
        eq: (a, b) => a === b,
        ne: (a, b) => a !== b,
        gt: (a, b) => a > b,
        lt: (a, b) => a < b,
        and: (a, b) => a && b,
        or: (a, b) => a || b,
        includes: (str, substr) =>
          str != null && substr != null && String(str).includes(String(substr)),
      },
    }),
  ],

  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@scss': resolve(__dirname, 'src/scss'),
      '@js': resolve(__dirname, 'src/js'),
    },
  },

  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "@scss/variables" as *;',
        api: 'modern-compiler',
        // Bootstrap 5.3 still uses the legacy Sass APIs internally; silence only
        // those categories so genuine warnings in our own partials stay visible.
        silenceDeprecations: ['import', 'global-builtin', 'color-functions', 'if-function'],
      },
    },
  },

  build: {
    target: 'baseline-widely-available',
    cssCodeSplit: true,
    sourcemap: false,
    // Set just above the lazily-imported pdfmake chunk (~971 kB) so its expected
    // size stays quiet while any regression in the eager path (largest eager
    // chunk is ~200 kB) still trips the warning.
    chunkSizeWarningLimit: 1100,
    rollupOptions: {
      input,
      output: {
        // Keep large, rarely-changing vendor code in stable long-cache chunks.
        // `advancedChunks` is Rolldown's native API (Vite 8 replaced Rollup with it).
        advancedChunks: {
          groups: [
            { name: 'vendor-bootstrap', test: /node_modules[\\/](bootstrap|@popperjs)[\\/]/ },
            { name: 'vendor-charts', test: /node_modules[\\/]chart\.js[\\/]/ },
            { name: 'vendor-datatables', test: /node_modules[\\/]datatables\.net/ },
          ],
        },
        assetFileNames: assetInfo => {
          const ext = (assetInfo.names?.[0] ?? assetInfo.name ?? '').split('.').pop() ?? '';
          if (/^(png|jpe?g|svg|gif|tiff|bmp|ico|webp|avif)$/i.test(ext)) {
            return 'assets/images/[name]-[hash][extname]';
          }
          if (/^(woff2?|ttf|otf|eot)$/i.test(ext)) {
            return 'assets/fonts/[name]-[hash][extname]';
          }
          return `assets/${ext || 'misc'}/[name]-[hash][extname]`;
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

  preview: {
    port: 4173,
    host: true,
  },
});
