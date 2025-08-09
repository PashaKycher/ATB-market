import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

})

// server: {
//   allowedHosts: ['57e027fe2e08.ngrok-free.app'], // твой ngrok-хост
// },
