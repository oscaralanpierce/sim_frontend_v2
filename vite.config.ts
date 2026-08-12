import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Unfonts from 'unplugin-fonts/vite'
import mkcert from 'vite-plugin-mkcert'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    Unfonts({
      google: {
        families: [
          {
            name: 'Cinzel Decorative',
            styles: 'wght@700',
          },
          {
            name: 'Quattrocento Sans',
            styles: 'ital,wght@0,400;0,700;1,400',
          },
        ],
      },
    }),
    mkcert({ hosts: ['dev.oscaralanpierce.com'] }),
  ],
  server: {
    host: '127.0.0.1',
    allowedHosts: ['dev.oscaralanpierce.com'],
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
