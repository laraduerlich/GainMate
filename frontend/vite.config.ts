import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8080", // backend server
        changeOrigin: true, // Ensures the Origin header matches the target
        rewrite: (path) => path.replace(/^\/api/, "/api"), // Optional: adjust path if needed
      },
    },
  },
});
