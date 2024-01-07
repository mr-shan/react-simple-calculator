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
        "theme_color": "ff8f00",
        "icons": [
          {
            "src": "/icons/icon_48.png",
            "sizes": "48x48",
            "type": "image/png",
            "purpose": "any"
          },
          {
            "src": "/icons/icon_72.png",
            "sizes": "72x72",
            "type": "image/png",
            "purpose": "any"
          },
          {
            "src": "/icons/icon_98.png",
            "sizes": "98x98",
            "type": "image/png",
            "purpose": "any"
          },
          {
            "src": "/icons/icon_180.png",
            "sizes": "180x180",
            "type": "image/png",
            "purpose": "any"
          },
          {
            "src": "/icons/icon_192.png",
            "sizes": "192x192",
            "type": "image/png",
            "purpose": "any"
          },
          {
            "src": "/icons/icon_512.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "any"
          },
          {
            "src": "/icons/icon.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "maskable"
          },
          {
            "src": "assets/icon.png",
            "sizes": "512x512, 1024x1024",
            "type": "image/png",
            "purpose": "maskable any"
          },
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
