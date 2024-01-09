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
        "name": "Simple Calculator",
        "orientation": 'portrait-primary',
        "short_name": "Simple Calculator",
        "categories": ["Tool"],
        "description": "A simple calculator with better design than Apple's default calculator.",
        "lang": "en-US",
        "screenshots": [
          {
            "src": "/screenshots/first.jpg",
            "sizes": "1080x1920",
            "form_factor": "narrow",
            "label": "Calculations History",
            "type": "image/jpg"
          },
          {
            "src": "/screenshots/second.jpg",
            "sizes": "1080x1920",
            "form_factor": "narrow",
            "label": "Light Theme",
            "type": "image/jpg"
          },
          {
            "src": "/screenshots/third.jpg",
            "sizes": "1080x1920",
            "form_factor": "narrow",
            "label": "Dark Theme",
            "type": "image/jpg"
          },
          {
            "src": "/screenshots/first.jpg",
            "sizes": "1080x1920",
            "form_factor": "wide",
            "label": "Calculations History",
            "type": "image/jpg"
          },
          {
            "src": "/screenshots/second.jpg",
            "sizes": "1080x1920",
            "form_factor": "wide",
            "label": "Light Theme",
            "type": "image/jpg"
          },
          {
            "src": "/screenshots/third.jpg",
            "sizes": "1080x1920",
            "form_factor": "wide",
            "label": "Dark Theme",
            "type": "image/jpg"
          },
        ],
        "start_url": "/",
        "display": "standalone",
        "theme_color": "#ff8f00",
        "prefer_related_applications": false,
        "icons": [
          {
            "src": "/icons/48.png",
            "sizes": "48x48",
            "type": "image/png",
          },
          {
            "src": "/icons/64.png",
            "sizes": "64x64",
            "type": "image/png",
          },
          {
            "src": "/icons/144.png",
            "sizes": "144x144",
            "type": "image/png",
          },
          {
            "src": "/icons/180.png",
            "sizes": "180x180",
            "type": "image/png",
          },
          {
            "src": "/icons/192.png",
            "sizes": "192x192",
            "type": "image/png",
          },
          {
            "src": "/icons/256.png",
            "sizes": "256x256",
            "type": "image/png",
          },
          {
            "src": "/icons/512.png",
            "sizes": "512x512",
            "type": "image/png",
          },
          {
            "src": "/icons/1024.png",
            "sizes": "1024x1024",
            "type": "image/png",
          },
          {
            "src": "/icons/1024.png",
            "sizes": "1024x1024",
            "type": "image/png",
            "purpose": 'maskable'
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
