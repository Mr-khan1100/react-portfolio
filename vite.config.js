import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react(),],
  assetsInclude: ['**/*.apk'],
  // server: {
  //   // remove the old headers
  // },
  // configureServer(server) {
  //   server.middlewares.use((req, res, next) => {
  //     if (req.url.startsWith('/apk/') && req.url.endsWith('.apk')) {
  //       res.setHeader('Content-Type', 'application/vnd.android.package-archive');
  //     }
  //     next();
  //   });
  // }
})
