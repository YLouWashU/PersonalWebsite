import { defineConfig } from 'astro/config';

import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  site: 'https://yang-lou.com',
  adapter: cloudflare(),
});