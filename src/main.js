import router from './router.js'
import AppMain from './app.vue.js'

Vue.use(Vuetify);

const vueApp = new Vue({
  el: "#app",
  vuetify: new Vuetify(),
  router,
  components: { 'app-main' : AppMain },
  mounted() {
    // Hides the scrollbar
    let elHtml = document.getElementsByTagName('html')[0]
    elHtml.style.overflowY = 'hidden' // 'auto' //
  },
  computed: {
    appConfig() {
      return store.getters.appConfig;
    }
  },
  template: /*html*/ `

<v-app>
    <app-main />
    <v-main style="height: 100vh;overflow-y: auto;">
      <router-view></router-view>
    </v-main>
</v-app>

`
});
