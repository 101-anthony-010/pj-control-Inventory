import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // El puerto en el que quieres que se ejecute tu aplicación
    host: '0.0.0.0', // Escuchar en todas las interfaces de red disponibles
  },
})
