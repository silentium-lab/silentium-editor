import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/postcss';
import autoprefixer from 'autoprefixer';
import path from 'path';

export default defineConfig({
  root: './src',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: '../dist',
    minify: false,
    emptyOutDir: true,
  },
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
});
