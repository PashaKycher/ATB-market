import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  
})

// build: {
//     outDir: 'dist'
//   },
//   server: {
//     open: true,
//     proxy: {
//       '/api': 'http://localhost:8080'
//     },
//     port: 3000, // для локалки, необов'язково
//     allowedHosts: ['57e027fe2e08.ngrok-free.app'], // якщо будеш ще через ngrok ганяти
//   }
