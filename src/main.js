import router from './router.js'
import store from './store.js'
import AppMain from './app.js'
import Login from './components/Login.js'

Vue.use(Vuetify);

const vueApp = new Vue({
  el: "#app",
  vuetify: new Vuetify(),
  router,
  components: { 'app-main' : AppMain, Login },
  mounted() {
    // Hides the scrollbar
    let elHtml = document.getElementsByTagName('html')[0]
    elHtml.style.overflowY = 'hidden' // 'auto' //

    if (!navigator.onLine) {
      let user = localStorage.getItem(this.appConfig.storageName)
      if(user) store.commit("setUser", JSON.parse(user), true);
    }

    this.$vuetify.theme.dark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches; // dark mode
  },
  computed: {
    authorized() {
      return store.getters.user != null;
    },
    appConfig() {
      return store.getters.appConfig;
    }
  },
  template: /*html*/ `

<v-app :style="(!authorized ? 'background: rgba(0,0,0,0)' : '')">
    <app-main v-if="authorized"></app-main>
    <v-main v-if="authorized" style="height: 100vh;overflow-y: auto;">
      <router-view></router-view>
    </v-main>
    <Login v-if="!authorized" />
</v-app>

`
});
