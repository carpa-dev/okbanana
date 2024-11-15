import { resolve } from 'path';
import handlebars from 'vite-plugin-handlebars';
import { fdir } from 'fdir';
import { defineConfig } from 'vite';

// Couldn't use glob for some reason
//const pages = new fdir()
//  .filter((path, isDirectory) => path.endsWith('.html'))
//  .crawl('.')
//  .sync()
//  .reduce((acc, curr) => {
//    acc[curr] = resolve(__dirname, curr);
//    return acc;
//  }, {});
//
//console.log(mpa.default);
export default defineConfig({
  build: {
    rollupOptions: {
      // https://github.com/vitejs/vite/issues/3429
      // multi page support is crap
      input: {
        main: resolve(__dirname, 'index.html'),
        'sobre-nos': resolve(__dirname, 'sobre-nos.html'),
      },
    },
  },
  plugins: [
    handlebars({
      partialDirectory: resolve(__dirname, 'src/partials'),
    }),
  ],
});
