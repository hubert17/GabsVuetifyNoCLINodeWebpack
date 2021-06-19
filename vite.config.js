const { createVuePlugin } = require('vite-plugin-vue2');
import { VitePWA } from 'vite-plugin-pwa'
import replace from '@rollup/plugin-replace'

module.exports = {
    base: '',
	plugins: [
        createVuePlugin(),
          VitePWA({
            // for prompt comment the option or just remove this option, since it is the default behavior */
            base: '',
            registerType: 'prompt',
            includeAssets: ['/favicon.svg'],
            manifest: {
              name: 'PWA Vue2',
              short_name: 'PWA Vue2',
              description: 'Vite PWA + Vue2 + Vite',
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