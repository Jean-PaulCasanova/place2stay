import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    eslint({
      lintOnStart: true,
      failOnError: mode === 'production'
    })
  ],
  build: {
    outDir: 'dist'
  },
  server: {
    proxy: mode === 'development' ? {
      '/api': 'http://localhost:8000'
    } : undefined,
    port: 5173
  },
  preview: {
    port: 4173
  }
}));
