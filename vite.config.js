import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'three-fiber': ['@react-three/fiber', '@react-three/drei', 'three'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
})
