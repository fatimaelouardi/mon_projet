import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // exposer le port 5173 pour docker 
    host: true,
    port: 5173
  }
})
