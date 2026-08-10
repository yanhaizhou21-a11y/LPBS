import { fileURLToPath, URL } from 'node:url';
import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

function apiServerPlugin(): Plugin {
  return {
    name: 'api-server-middleware',
    async configureServer(server) {
      const { default: app } = await import('./backend/app.js');
      const { connectDB } = await import('./backend/config/db.js');
      connectDB().catch((err) => console.warn('[Vite API] DB connection note:', err?.message || err));
      server.middlewares.use(app);
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), apiServerPlugin()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 3000,
  },
});
