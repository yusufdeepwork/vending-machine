/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import tailwindcss from 'tailwindcss'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  test: {
    globals: true, // Enable global functions like `describe` and `it`
    environment: 'jsdom', // For React component tests, jsdom is required
  },
})
