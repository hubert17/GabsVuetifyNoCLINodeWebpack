import router from './router.js'
import store from './store.js'
import AppMain from './app.vue.js'
import Login from './components/Login.vue.js'
import colors from 'https://cdn.jsdelivr.net/npm/vuetify@2.x/lib/util/colors.js'

Vue.use(Vuetify);

Vue.use(VueGtag, {
  config: { id: "G-KLY8BKB9SL" }
}, router);

const vueApp = new Vue({
  el: "#app",
  vuetify: new Vuetify(),
  router,
  components: { 'app-main': AppMain, Login },
  created() {
    this.$vuetify.theme.dark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches; // dark mode
  },
  mounted() {
    // Hides the scrollbar
    let elHtml = document.getElementsByTagName('html')[0]
    elHtml.style.overflowY = 'hidden' // 'auto' //

    this.syncTheme(this.$vuetify.theme.dark)

    if (!navigator.onLine) {
      let user = localStorage.getItem(this.appConfig.storageName)
      if (user) {
        try {
          store.commit("setUser", JSON.parse(user), true);
        } catch (e) {
          console.error("Failed to parse offline user session:", e);
          localStorage.removeItem(this.appConfig.storageName);
        }
      }
    }

  },
  computed: {
    authorized() {
      return store.getters.user != null;
    },
    appConfig() {
      return store.getters.appConfig;
    },
    isDark() {
      return this.$vuetify.theme.dark;
    }
  },
  watch: {
    isDark(newVal) {
      this.syncTheme(newVal);
    }
  },
  methods: {
    syncTheme(isDark) {
      let elHtml = document.getElementsByTagName('html')[0]
      if (isDark) {
        elHtml.style.backgroundColor = "#121212"
      } else {
        elHtml.style.backgroundColor = ""
      }

      let metaThemeColor = document.querySelector('meta[name="theme-color"]')
      if (metaThemeColor) {
        if (isDark) {
          metaThemeColor.setAttribute("content", "#121212");
        } else {
          let themeColor = store.getters.appConfig.themeColor.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
          let colorHex = colors[themeColor] ? colors[themeColor].base : "#ffffff";
          metaThemeColor.setAttribute("content", colorHex);
        }
      }
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
