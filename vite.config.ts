import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // Default: GitHub Pages project subpath (main branch, .github/workflows/deploy.yml).
  // The staging workflow overrides this to '/' via VITE_BASE_PATH, since
  // staging.automations.aurmak.com serves the site from its own domain root.
  base: process.env.VITE_BASE_PATH || '/aurmak-automations/',
  plugins: [
    react(),
    tailwindcss()
  ],
  server: {
    port: 3000,
    host: true
  }
});
