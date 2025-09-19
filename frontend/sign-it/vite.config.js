import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), viteStaticCopy({
    targets: [
      {
        src: 'bin/example.wasm',
        dest: 'wasm-files',
      },
    ],
  }),],
  server: {
    mimeTypes: {
      'application/javascript': ['mjs'], // Ensure .mjs files are served as JavaScript
    },
  },
})
