import { defineConfig } from "vite";
import { createVuePlugin } from 'vite-plugin-vue2';

export default defineConfig({
    base: '', // '/GabsVuetifyNoCLINodeWebpack/',
    plugins: [
        createVuePlugin()
    ],
    build: {
        rollupOptions: {
            external: [
                /^https:\/\//
            ]
        }
    }
});