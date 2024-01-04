import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      // generates 'manifest.webmanifest' file on build
      manifest: {
        // caches the assets/icons mentioned (assets/* includes all the assets present in your src/ directory) 
        name: "Simple Calculator",
        orientation: 'portrait',
        "short_name": "Simple Calculator",
        "start_url": "/",
        "display": "standalone",
        "background_color": "#000000",
        "theme_color": "ff8f00",
        "icons": [
          {
            "src": "/icon.png",
            "sizes": "1024x1024",
            "type": "image/png"
          }
        ]
      },
      workbox: {
        // defining cached files formats
        globPatterns: ["**/*.{js,css,html,ico,png,svg,webmanifest}"],
      }
    })
  ],
  server: {
    port: 3000,
  },
})
