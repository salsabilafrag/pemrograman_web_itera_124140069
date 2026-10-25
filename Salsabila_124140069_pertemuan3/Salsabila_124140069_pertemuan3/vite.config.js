import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// Konfigurasi Vite + Vitest (environment jsdom agar komponen React bisa dites)
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.js',
    css: false,
  },
});
