import path from 'path';
import { resolve } from 'path';
import { defineConfig } from 'vite';

import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        404: resolve(__dirname, 'public/404.html'),
      },
    },
    // Ensure public folder assets are copied
    copyPublicDir: true,
    // Increase chunk size warning limit for images
    chunkSizeWarningLimit: 1000,
  },
  // Explicitly set public directory
  publicDir: 'public',
  optimizeDeps: {
    include: ['react-quill-new'],
  },
  server: {
    port: 3000,
  },
});
