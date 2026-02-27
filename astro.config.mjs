// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import sitemap from '@astrojs/sitemap';

import compressor from 'astro-compressor';

// https://astro.build/config
export default defineConfig({
  site: "https://starterbuild.com",
  trailingSlash: "never",
  prefetch: true,
  experimental: {
    clientPrerender: true,
    directRenderScript: true,
  },
  integrations: [react(), sitemap(), compressor({ gzip: false, brotli: true })]
});