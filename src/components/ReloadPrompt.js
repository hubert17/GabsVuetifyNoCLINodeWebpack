import { css } from 'https://cdn.jsdelivr.net/npm/goober@2.0.33/dist/goober.modern.js';
import useRegisterSW from '../mixins/useRegisterSW.js'

const styles = css /*css*/ `
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

`

// const useRegisterSW = import("../mixins/useRegisterSW.js");

export default {
  name: "ReloadPrompt",
  mixins: [useRegisterSW],
  template: /*html*/ `

<div class=${styles}>
    <div v-if="offlineReady || needRefresh" class="pwa-toast" role="alert">
    <div class="message">
      <span v-if="offlineReady"> App ready to work offline </span>
      <span v-else> New content available, click on reload button to update. </span>
    </div>
    <button v-if="needRefresh" @click="updateServiceWorker"> Reload </button>
    <button @click="closePrompt"> Close </button>
  </div>
</div>


    `,
  };