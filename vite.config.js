import { resolve } from 'path';
import handlebars from 'vite-plugin-handlebars';
import { defineConfig } from 'vite';
import glob from 'fast-glob';

export default defineConfig({
  root: 'src',
  // Relative so that we can inject a base href dynamically
  base: './',
  build: {
    outDir: '../dist',

    rollupOptions: {
      // https://github.com/vitejs/vite/issues/3429#issuecomment-1964555854
      input: glob
        .sync(['src/**/*.html', '!src/partials'])
        .map((entry) => resolve(__dirname, entry)),
    },
  },
  plugins: [
    handlebars({
      partialDirectory: resolve(__dirname, 'src/partials'),
    }),
  ],
});
