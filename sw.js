if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let s=Promise.resolve();return r[e]||(s=new Promise((async s=>{if("document"in self){const r=document.createElement("script");r.src=e,document.head.appendChild(r),r.onload=s}else importScripts(e),s()}))),s.then((()=>{if(!r[e])throw new Error(`Module ${e} didn’t register its module`);return r[e]}))},s=(s,r)=>{Promise.all(s.map(e)).then((e=>r(1===e.length?e[0]:e)))},r={require:Promise.resolve(s)};self.define=(s,t,n)=>{r[s]||(r[s]=Promise.resolve().then((()=>{let r={};const i={uri:location.origin+s.slice(1)};return Promise.all(t.map((s=>{switch(s){case"exports":return r;case"module":return i;default:return e(s)}}))).then((e=>{const s=n(...e);return r.default||(r.default=s),r}))})))}}define("./sw.js",["./workbox-76dd9a6f"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"assets/BaseButton.aa4da055.js",revision:"b8a2d8608d4fc296f11b25eaf767ed39"},{url:"assets/index.a6a37df6.js",revision:"432697289e7f5247279550c160fe0564"},{url:"assets/useRegisterSW.a8b73b3b.js",revision:"8d9b477815bf7f9b354570b1d52cf2ea"},{url:"assets/virtual_pwa-register.e392dfa7.js",revision:"13bfae1e29f9e7bff46ffc8b5071ceb8"},{url:"index.html",revision:"238fa6b9f7d4576d4bb45669e6bf1c86"},{url:"favicon.svg",revision:"1cb4e8b7f79a9238eaa9b020910cf1a5"},{url:"pwa-192x192.png",revision:"947270e7966b8e9da139623d5d39a031"},{url:"pwa-512x512.png",revision:"26ed3d3eb5fbbc0101e0f66d55d908c8"},{url:"manifest.webmanifest",revision:"4d45b32ae786473e7dc029d9ed5f1578"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html"))),e.registerRoute(/^https:\/\/cdn\.vuetifyjs\.com\/.*/i,new e.CacheFirst({cacheName:"vuetifyjs-cache",plugins:[new e.ExpirationPlugin({maxEntries:10,maxAgeSeconds:31536e3,purgeOnQuotaError:!0}),new e.CacheableResponsePlugin({statuses:[0,200]})]}),"GET"),e.registerRoute(/^https:\/\/cdn\.jsdelivr\.net\/.*/i,new e.CacheFirst({cacheName:"jsdelivr-cache",plugins:[new e.ExpirationPlugin({maxEntries:10,maxAgeSeconds:31536e3,purgeOnQuotaError:!0}),new e.CacheableResponsePlugin({statuses:[0,200]})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.googleapis\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-cache",plugins:[new e.ExpirationPlugin({maxEntries:10,maxAgeSeconds:31536e3,purgeOnQuotaError:!0}),new e.CacheableResponsePlugin({statuses:[0,200]})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.gstatic\.com\/.*/i,new e.CacheFirst({cacheName:"gstatic-fonts-cache",plugins:[new e.ExpirationPlugin({maxEntries:10,maxAgeSeconds:31536e3,purgeOnQuotaError:!0}),new e.CacheableResponsePlugin({statuses:[0,200]})]}),"GET")}));
//# sourceMappingURL=sw.js.map
