const { createVuePlugin } = require('vite-plugin-vue2');
import { VitePWA } from 'vite-plugin-pwa'

module.exports = {
    base: '/GabsVuetifyNoCLINodeWebpack/',
	  plugins: [
        createVuePlugin(),
          VitePWA({
            base: '/GabsVuetifyNoCLINodeWebpack/',
            // for prompt comment the option or just remove this option, since it is the default behavior */
            registerType: 'prompt',
            includeAssets: ['/favicon.svg'],
            manifest: {
              name: 'Gabs Vue App PWA',
              short_name: 'Gabs Vue',
              description: 'Gabs Vue App + Vite + Vite PWA ',
              theme_color: '#607d8b',
              icons: [
                {
                  src: 'pwa-192x192.png',
                  sizes: '192x192',
                  type: 'image/png',
                },
                {
                  src: 'pwa-512x512.png',
                  sizes: '512x512',
                  type: 'image/png',
                },
                {
                  src: 'pwa-512x512.png',
                  sizes: '512x512',
                  type: 'image/png',
                  purpose: 'any maskable',
                },
              ],
            },
            workbox: {
              runtimeCaching: [
                {
                  urlPattern: /^https:\/\/cdn\.vuetifyjs\.com\/.*/i,
                  handler: 'CacheFirst',
                  options: {
                    cacheName: 'vuetifyjs-cache',
                    expiration: {
                      maxEntries: 10,
                      maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
                    },
                    cacheableResponse: {
                      statuses: [0, 200],
                    },
                  },
                },
                {
                  urlPattern: /^https:\/\/cdn\.jsdelivr\.net\/.*/i,
                  handler: 'CacheFirst',
                  options: {
                    cacheName: 'jsdelivr-cache',
                    expiration: {
                      maxEntries: 10,
                      maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
                    },
                    cacheableResponse: {
                      statuses: [0, 200],
                    },
                  },
                },
                {
                  urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
                  handler: 'CacheFirst',
                  options: {
                    cacheName: 'google-fonts-cache',
                    expiration: {
                      maxEntries: 10,
                      maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
                    },
                    cacheableResponse: {
                      statuses: [0, 200],
                    },
                  },
                },
                {
                  urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
                  handler: 'CacheFirst',
                  options: {
                    cacheName: 'gstatic-fonts-cache',
                    expiration: {
                      maxEntries: 10,
                      maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
                    },
                    cacheableResponse: {
                      statuses: [0, 200],
                    },
                  },
                },
              ]
            }
          })
    ],
};