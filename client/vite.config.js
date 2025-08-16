import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite config
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // для локалки, необов'язково
    allowedHosts: ['57e027fe2e08.ngrok-free.app'], // якщо будеш ще через ngrok ганяти
  },
  build: {
    outDir: 'dist', // Vercel очікує саме цю папку
  },
})
