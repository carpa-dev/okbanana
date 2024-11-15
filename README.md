# Ok Banana

```bash
npm install
npm run dev
```


## FAQ
### Adding New Pages
It must be added to `src`, this is due to the lack of multi-page support in Vite.
See https://github.com/vitejs/vite/issues/3429#issuecomment-1964555854 for more info.

### Doing CSS
To make it clearer what CSS class name is global and what's for a specific page, I recommend
prefixing the ones for a specific page with a `_`.

For example `_title` will be a class name that's scoped to that page's CSS only.
