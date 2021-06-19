const { createVuePlugin } = require('vite-plugin-vue2');
import { VitePWA } from 'vite-plugin-pwa'

module.exports = {
    base: '',
	plugins: [
        createVuePlugin(),
          VitePWA({
            base: 'GabsVuetifyNoCLINodeWebpack/',
            // for prompt comment the option or just remove this option, since it is the default behavior */
            registerType: 'prompt',
            includeAssets: ['/favicon.svg'],
            manifest: {
              name: 'Gabs Vue App PWA',
              short_name: 'Gabs Vue',
              description: 'Gabs Vue App + Vite + Vite PWA ',
              theme_color: '#ffffff',
              icons: [
                {
                  src: '/pwa-192x192.png',
                  sizes: '192x192',
                  type: 'image/png',
                },
                {
                  src: '/pwa-512x512.png',
                  sizes: '512x512',
                  type: 'image/png',
                },
                {
                  src: '/pwa-512x512.png',
                  sizes: '512x512',
                  type: 'image/png',
                  purpose: 'any maskable',
                },
              ],
            }
          })
    ],
};