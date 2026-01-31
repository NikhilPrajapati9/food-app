import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),],
  // server: {
  //   proxy: {
  //     '/api/v1': {
  //       target: 'http://localhost:3000', // API server URL
  //       changeOrigin: true, // CORS ko handle karne ke liye
  //       // rewrite: (path) => path.replace(/^\/api\/v1/, ''), // Path modification agar zaroori ho
  //     },
  //   },
  // },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
