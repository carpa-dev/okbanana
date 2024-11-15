import { resolve } from 'path';
import handlebars from 'vite-plugin-handlebars';
import { fdir } from 'fdir';

// Couldn't use glob for some reason
const pages = new fdir()
  .filter((path, isDirectory) => path.endsWith('.html'))
  .crawl('pages')
  .sync()
  .reduce((acc, curr) => {
    acc[curr] = resolve(__dirname, 'pages', curr);
    return acc;
  }, {});

export default {
  build: {
    rollupOptions: {
      input: {
        ...pages,
      },
    },
  },
  plugins: [
    handlebars({
      partialDirectory: resolve(__dirname, 'src/partials'),
    }),
  ],
};
