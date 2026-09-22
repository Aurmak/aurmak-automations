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
    host: true,
    // Vite never runs PHP and knows nothing about public/.htaccess's rewrite — that's
    // Apache's job in production, and `php -S` (below) doesn't read .htaccess either.
    // So the path rewrite from /api/lead to api.php has to happen here instead. Run
    //   php -S 127.0.0.1:8788 -t public
    // in another terminal, and a form submit here reaches the real api.php.
    proxy: {
      '/api/lead': {
        target: 'http://127.0.0.1:8788',
        rewrite: (path) => path.replace(/^\/api\/lead$/, '/api.php')
      }
    }
  }
});
