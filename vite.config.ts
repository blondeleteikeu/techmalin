import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/techmalin/', // publié sur https://blondeleteikeu.github.io/techmalin/
  plugins: [react()],
})
