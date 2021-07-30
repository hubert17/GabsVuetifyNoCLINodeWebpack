import router from './router.js'
import AppMain from './app.vue.js'
import Login from './components/Login.vue.js'

Vue.use(Vuetify);

const vueApp = new Vue({
  el: "#app",
  vuetify: new Vuetify(),
  router,
  components: { 'app-main' : AppMain, Login },
  data: {
    user: null,
    authorized: false
  },
  mounted() {
    // Hides the scrollbar
    let elHtml = document.getElementsByTagName('html')[0]
    elHtml.style.overflowY = 'hidden' // 'auto' //

    // From this.$root.$emit("user", user);
    this.$root.$on("user", (data) => {
      this.user = data;
      if(this.user != null) {
        this.authorized = true;
      } else {
        this.authorized = false;
      }
    });
  },
  template: /*html*/ `

<v-app :style="(!authorized ? 'background: rgba(0,0,0,0)' : '')">
    <app-main v-if="authorized" />
    <v-main style="height: calc(100vh - 1000px);overflow-y: auto;">
      <router-view v-if="authorized"></router-view>
    </v-main>
    <Login v-if="!authorized" />
</v-app>

`
});
