import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // staging.automations.aurmak.com serves the site from its own domain root.
  base: '/',
  plugins: [
    react(),
    tailwindcss()
  ],
  server: {
    port: 3000,
    host: true
  }
});
