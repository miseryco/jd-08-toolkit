import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://misery.co',
  base: '/jd-08-toolkit',
  trailingSlash: 'always',
  output: 'static',
  build: { inlineStylesheets: 'always' },
  devToolbar: { enabled: false },
  vite: { build: { assetsInlineLimit: 0 } },
});
