import router from './router.js'
import store from './store.js'
import AppMain from './app.js'
import Login from './components/Login.js'
import Cookies from "https://cdn.jsdelivr.net/npm/js-cookie@2.2.1/src/js.cookie.min.js";
// import ReloadPrompt from './components/ReloadPrompt.js'

Vue.use(Vuetify);

const vueApp = new Vue({
  el: "#app",
  vuetify: new Vuetify(),
  router,
  data: {
    deferredPrompt: null
  },
  created() {
    window.addEventListener("beforeinstallprompt", e => {
      e.preventDefault();
      // Stash the event so it can be triggered later.
      if (Cookies.get("add-to-home-screen") === undefined) {
        this.deferredPrompt = e;
      }
    });
    window.addEventListener("appinstalled", () => {
      this.deferredPrompt = null;
    });
  },
  methods: {
    async dismiss() {
      Cookies.set("add-to-home-screen", null, { expires: 15 });
      this.deferredPrompt = null;
    },
    async install() {
      this.deferredPrompt.prompt();
    }
  },
  components: { 'app-main' : AppMain, Login,
    ReloadPrompt: () => import('./components/ReloadPrompt.js')
  },
  mounted() {
    // Hides the scrollbar
    let elHtml = document.getElementsByTagName('html')[0]
    elHtml.style.overflowY = 'auto' // 'hidden'

    if (!navigator.onLine) {
      let user = localStorage.getItem(this.appConfig.storageName)
      if(user) store.commit("setUser", JSON.parse(user), true);
    }
  },
  computed: {
    authorized: function () {
      return store.getters.user != null;
    },
    appConfig: function () {
      return store.getters.appConfig;
    }
  },
  template: /*html*/ `

<v-app :style="(!authorized ? 'background: rgba(0,0,0,0)' : '')" class="-webkit-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;-webkit-touch-callout: none;">
    <ReloadPrompt />
    <v-banner v-if="deferredPrompt" color="info" dark class="text-left">
        Get our free app. It won't take up space on your phone and also works offline!
        <template v-slot:actions>
          <v-btn text @click="dismiss">Dismiss</v-btn>
          <v-btn text @click="install">Install</v-btn>
        </template>
      </v-banner>
    <app-main v-if="authorized"></app-main>
    <router-view v-if="authorized"></router-view>
    <Login v-if="!authorized" />

</v-app>

`
});
