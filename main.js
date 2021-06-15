import AppMain from './app.js'
import Login from './components/Login.js'
import router from './router.js'

Vue.use(Vuetify);


const vueApp = new Vue({
  el: "#app",
  vuetify: new Vuetify(),
  router,
  components: { 'app-main' : AppMain, Login },
  data: {
    user: null,
    authorized: false,
    cloak: true,
  },
  methods: {

  },
  mounted() {
    // Hides the scrollbar
    let elHtml = document.getElementsByTagName('html')[0]
    elHtml.style.overflowY = 'hidden'

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
    <app-main v-if="authorized" :user="user"></app-main>
    <router-view v-if="authorized"></router-view>
    <Login v-if="!authorized" />
</v-app>

`
});
