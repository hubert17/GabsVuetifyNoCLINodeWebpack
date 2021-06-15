import AppMain from './app.js'
import router from './router.js'

Vue.use(Vuetify);


const vueApp = new Vue({
  el: "#app",
  vuetify: new Vuetify(),
  router,
  components: { 'app-main' : AppMain },
  data: {
    authorized: true,
    cloak: true,
  },
  methods: {

  },
  mounted() {
    // hides the scrollbar
    let elHtml = document.getElementsByTagName('html')[0]
    elHtml.style.overflowY = 'hidden'
  },
  template: /*html*/ `

<v-app>
    <app-main v-if="true"></app-main>
    <router-view v-if="authorized"></router-view>
</v-app>

`
});
