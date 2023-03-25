import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import viteTsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), viteTsconfigPaths()],
  build: {
    outDir: 'build',
  },
  server: {
    host: true,
    port: 8000,
    proxy: {
      '/api': {
        target: 'http://braden-backend:8008/',
        changeOrigin: true,
      },
    },
  },
});
