import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import sitemapPlugin from 'vite-plugin-sitemap';

export default defineConfig({
  plugins: [
    react(),
    sitemapPlugin({
      hostname: 'https://www.bluveraexports.com',
      generateRobotsTxt: true,
      robots: [{ userAgent: '*', allow: '/' }],
      readable: true,
    }),
  ],
  base: process.env.GITHUB_ACTIONS ? '/official-website/' : '/',
  publicDir: 'assets',
});
