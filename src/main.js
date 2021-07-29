import router from './router.js'
import store from './store.js'
import AppMain from './app.vue.js'
import Login from './components/Login.vue.js'
import colors from 'https://cdn.jsdelivr.net/npm/vuetify@2.5.7/lib/util/colors.js'

Vue.use(Vuetify);

const vueApp = new Vue({
  el: "#app",
  vuetify: new Vuetify(),
  router,
  components: { 'app-main' : AppMain, Login },
  created() {
    this.$vuetify.theme.dark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches; // dark mode
    console.log(this.$vuetify.theme)
    if(!this.$vuetify.theme.dark) {
      let themeColor = store.getters.appConfig.themeColor.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
      document.querySelector('meta[name="theme-color"]').setAttribute("content", colors[themeColor].base);
    }
  },
  mounted() {
    // Hides the scrollbar
    let elHtml = document.getElementsByTagName('html')[0]
    elHtml.style.overflowY = 'hidden' // 'auto' //
    if(this.$vuetify.theme.dark) elHtml.style.backgroundColor = "#121212"

    if (!navigator.onLine) {
      let user = localStorage.getItem(this.appConfig.storageName)
      if(user) store.commit("setUser", JSON.parse(user), true);
    }

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
