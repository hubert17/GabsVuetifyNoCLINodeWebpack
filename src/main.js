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
  data: {

  },
  methods: {

  },
  mounted() {
    // Hides the scrollbar
    let elHtml = document.getElementsByTagName('html')[0]
    elHtml.style.overflowY = 'hidden'

    this.$vuetify.theme.dark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches; // dark mode
  },
  computed: {
    authorized: function () {
      return store.getters.user != null;
    }
  },
  template: /*html*/ `

<v-app :style="(!authorized ? 'background: rgba(0,0,0,0)' : '')">
    <app-main v-if="authorized"></app-main>
    <router-view v-if="authorized"></router-view>
    <Login v-if="!authorized" />
</v-app>

`
});
