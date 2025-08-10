import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
   test: {
    environment: "jsdom",  // so you can test DOM like in browsers
    globals: true,         // so you can use test(), expect() without imports
    setupFiles: './src/setupTests.js',
  },
})
