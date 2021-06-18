const { createVuePlugin } = require('vite-plugin-vue2');
import { VitePWA } from 'vite-plugin-pwa'
import replace from '@rollup/plugin-replace'

module.exports = {
    base: '',
	plugins: [
        createVuePlugin(),
        VitePWA({
            mode: 'development',
            base: '/',
            registerType: 'autoUpdate',
            manifest: {
                // content of manifest
              },
              workbox: {
                // workbox options for generateSW
              }
          }),
          replace({
            __DATE__: new Date().toISOString(),
          }),
    ],
};