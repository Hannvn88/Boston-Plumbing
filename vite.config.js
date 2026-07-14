// Vite configuration — React fast-refresh plus the "@" import alias used by shadcn/ui
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    // "@/..." resolves to "src/..." (shadcn/ui convention)
    alias: { '@': path.resolve(__dirname, './src') },
  },
});
