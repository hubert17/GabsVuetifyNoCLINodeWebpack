import{_ as e}from"./index.74a27999.js";import"https://cdn.jsdelivr.net/npm/goober@2.0.33/dist/goober.modern.js";import"https://cdn.jsdelivr.net/npm/js-cookie@3.0.0-rc.1/dist/js.cookie.min.mjs";var o={name:"useRegisterSW",data:()=>({updateSW:void 0,offlineReady:!1,needRefresh:!1}),async mounted(){const{registerSW:o}=await e((()=>import("./virtual_pwa-register.e392dfa7.js")),void 0),n=this;this.updateSW=o({immediate:!0,onOfflineReady(){n.offlineReady=!0,n.onOfflineReadyFn()},onNeedRefresh(){n.needRefresh=!0,n.onNeedRefreshFn()}})},methods:{async closePrompt(){this.offlineReady=!1,this.needRefresh=!1},onOfflineReadyFn(){console.log("onOfflineReady")},onNeedRefreshFn(){console.log("onNeedRefresh")},updateServiceWorker(){this.updateSW&&this.updateSW(!0)}}};export default o;