if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let s=Promise.resolve();return n[e]||(s=new Promise((async s=>{if("document"in self){const n=document.createElement("script");n.src=e,document.head.appendChild(n),n.onload=s}else importScripts(e),s()}))),s.then((()=>{if(!n[e])throw new Error(`Module ${e} didn’t register its module`);return n[e]}))},s=(s,n)=>{Promise.all(s.map(e)).then((e=>n(1===e.length?e[0]:e)))},n={require:Promise.resolve(s)};self.define=(s,r,t)=>{n[s]||(n[s]=Promise.resolve().then((()=>{let n={};const a={uri:location.origin+s.slice(1)};return Promise.all(r.map((s=>{switch(s){case"exports":return n;case"module":return a;default:return e(s)}}))).then((e=>{const s=t(...e);return n.default||(n.default=s),n}))})))}}define("./sw.js",["./workbox-76dd9a6f"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"assets/BaseButton.aa4da055.js",revision:"b8a2d8608d4fc296f11b25eaf767ed39"},{url:"assets/index.8e790cc5.js",revision:"b923619d261ec5801137dcbc9c664be8"},{url:"assets/virtual_pwa-register.93d5579f.js",revision:"5914c8d6635164476c22ccca1667f668"},{url:"index.html",revision:"c2b5972b494c3db41664a1033548b6b9"},{url:"favicon.svg",revision:"1cb4e8b7f79a9238eaa9b020910cf1a5"},{url:"pwa-192x192.png",revision:"947270e7966b8e9da139623d5d39a031"},{url:"pwa-512x512.png",revision:"26ed3d3eb5fbbc0101e0f66d55d908c8"},{url:"manifest.webmanifest",revision:"4baaf691cca152c46507953d44eda8ba"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html"))),e.registerRoute(/^https:\/\/api45\.bernardgabon\.com\/.*/i,new e.CacheFirst({cacheName:"rdhenry-cache",plugins:[new e.ExpirationPlugin({maxEntries:10,maxAgeSeconds:31536e3,purgeOnQuotaError:!0}),new e.CacheableResponsePlugin({statuses:[0,200]})]}),"GET"),e.registerRoute(/^https:\/\/api45gabs\.azurewebsites\.net\/.*/i,new e.CacheFirst({cacheName:"rdhenry-cache",plugins:[new e.ExpirationPlugin({maxEntries:10,maxAgeSeconds:31536e3,purgeOnQuotaError:!0}),new e.CacheableResponsePlugin({statuses:[0,200]})]}),"GET"),e.registerRoute(/^https:\/\/newsapi\.org\/.*/i,new e.CacheFirst({cacheName:"rdhenry-cache",plugins:[new e.ExpirationPlugin({maxEntries:10,maxAgeSeconds:604800,purgeOnQuotaError:!0}),new e.CacheableResponsePlugin({statuses:[0,200]})]}),"GET"),e.registerRoute(/^https:\/\/cdn\.vuetifyjs\.com\/.*/i,new e.CacheFirst({cacheName:"vuetifyjs-cache",plugins:[new e.ExpirationPlugin({maxEntries:10,maxAgeSeconds:31536e3,purgeOnQuotaError:!0}),new e.CacheableResponsePlugin({statuses:[0,200]})]}),"GET"),e.registerRoute(/^https:\/\/cdn\.jsdelivr\.net\/.*/i,new e.CacheFirst({cacheName:"jsdelivr-cache",plugins:[new e.ExpirationPlugin({maxEntries:10,maxAgeSeconds:31536e3,purgeOnQuotaError:!0}),new e.CacheableResponsePlugin({statuses:[0,200]})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.googleapis\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-cache",plugins:[new e.ExpirationPlugin({maxEntries:10,maxAgeSeconds:31536e3,purgeOnQuotaError:!0}),new e.CacheableResponsePlugin({statuses:[0,200]})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.gstatic\.com\/.*/i,new e.CacheFirst({cacheName:"gstatic-fonts-cache",plugins:[new e.ExpirationPlugin({maxEntries:10,maxAgeSeconds:31536e3,purgeOnQuotaError:!0}),new e.CacheableResponsePlugin({statuses:[0,200]})]}),"GET")}));
//# sourceMappingURL=sw.js.map
