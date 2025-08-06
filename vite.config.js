import { defineConfig } from 'vite';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import handlebars from 'vite-plugin-handlebars';
import legacy from '@vitejs/plugin-legacy';
import { readdirSync } from 'fs';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = resolve(__filename, '..');

// Get all HTML files in root directory
const htmlFiles = readdirSync('.').filter(file => file.endsWith('.html'));

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
    }),
    legacy({
      targets: ['defaults', 'not IE 11'],
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
