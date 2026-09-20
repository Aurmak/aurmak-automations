import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // Served from a GitHub Pages project subpath. Change to '/' if you move it to
  // a custom domain (e.g. aurmak.com) or an org root site.
  base: '/aurmak-automations/',
  plugins: [
    react(),
    tailwindcss()
  ],
  server: {
    port: 3000,
    host: true
  }
});
