import{_ as e}from"./index.b65ea112.js";import{css as o}from"https://cdn.jsdelivr.net/npm/goober@2.0.33/dist/goober.modern.js";var n={name:"ReloadPrompt",mixins:[{name:"useRegisterSW",data:()=>({updateSW:void 0,offlineReady:!1,needRefresh:!1}),async mounted(){const{registerSW:o}=await e((()=>import("./virtual_pwa-register.93d5579f.js")),void 0),n=this;this.updateSW=o({immediate:!0,onOfflineReady(){n.offlineReady=!0,n.onOfflineReadyFn()},onNeedRefresh(){n.needRefresh=!0,n.onNeedRefreshFn()}})},methods:{async closePrompt(){this.offlineReady=!1,this.needRefresh=!1},onOfflineReadyFn(){console.log("onOfflineReady")},onNeedRefreshFn(){console.log("onNeedRefresh")},updateServiceWorker(){this.updateSW&&this.updateSW(!0)}}}],template:`\n\n<div class=${o`
    .pwa-toast {
      position: fixed;
      right: 0;
      bottom: 0;
      margin: 16px;
      padding: 12px;
      border: 1px solid #8885;
      border-radius: 4px;
      z-index: 1;
      text-align: left;
      box-shadow: 3px 4px 5px 0px #8885;
      background-color: white;
    }
    .pwa-toast .message {
      margin-bottom: 8px;
    }
    .pwa-toast button {
      border: 1px solid #8885;
      outline: none;
      margin-right: 5px;
      border-radius: 2px;
      padding: 3px 10px;
    }

`}>\n    <div v-if="offlineReady || needRefresh" class="pwa-toast" role="alert">\n    <div class="message">\n      <span v-if="offlineReady"> App ready to work offline </span>\n      <span v-else> New content available, click on reload button to update. </span>\n    </div>\n    <button v-if="needRefresh" @click="updateServiceWorker"> Reload </button>\n    <button @click="closePrompt"> Close </button>\n  </div>\n</div>\n\n\n    `};export default n;
