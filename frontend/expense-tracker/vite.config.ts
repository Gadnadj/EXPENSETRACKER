import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        'service-worker': resolve(__dirname, 'src/service-worker.ts')
      },
      output: {
        entryFileNames: (assetInfo) => {
          return assetInfo.name === 'service-worker' ? '[name].js' : 'assets/js/[name]-[hash].js';
        }
      }
    }
  },
  server: {
    headers: {
      'Service-Worker-Allowed': '/'
    }
  }
});
