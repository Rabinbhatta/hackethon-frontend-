import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://700e-202-63-242-226.ngrok-free.app', // Replace with your backend port
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
