import router from './router.js'
import store from './store.js'
import AppMain from './app.js'
import Login from './components/Login.js'
import ReloadPrompt from './components/ReloadPrompt.js'

Vue.use(Vuetify);


const vueApp = new Vue({
  el: "#app",
  vuetify: new Vuetify(),
  router,
  components: { 'app-main' : AppMain, Login, ReloadPrompt },
  mounted() {
    // Hides the scrollbar
    let elHtml = document.getElementsByTagName('html')[0]
    elHtml.style.overflowY = 'hidden'

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

<v-app :style="(!authorized ? 'background: rgba(0,0,0,0)' : '')">
    <ReloadPrompt />
    <app-main v-if="authorized"></app-main>
    <router-view v-if="authorized"></router-view>
    <Login v-if="!authorized" />
</v-app>

`
});
