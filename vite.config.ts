/// <reference types="vitest/config" />
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    open: true, // abre o navegador automaticamente ao rodar "npm run dev"
  },
  test: {
    environment: 'node',
    include: ['tests/**/*.test.ts'],
  },
});
