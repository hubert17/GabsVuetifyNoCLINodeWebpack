import store from './store.js'
import Layout from './components/Layout.vue.js'
import Login from './components/Login.vue.js'


export default {
  name: 'App',

  components: { Layout, Login },

  setup() {

    Vue.onMounted(() => {
      // Hides the scrollbar
      let elHtml = document.getElementsByTagName('html')[0]
      elHtml.style.overflowY = 'hidden' // 'auto' //

      if (!navigator.onLine) {
        let user = localStorage.getItem(store.getters.appConfig.storageName)
        if(user) store.commit("setUser", JSON.parse(user), true);
      }

      //this.$vuetify.theme.dark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches; // dark mode
    })

    const authorized = Vue.computed(() => store.getters.user != null)
    const appConfig = Vue.computed(() => store.getters.appConfig)

    return {authorized, appConfig}
  },

  template: /*html*/ `

<v-app :style="(!authorized ? 'background: rgba(0,0,0,0)' : '')">
    <Layout v-if="authorized"></Layout>
    <v-main v-if="authorized" style="height: 100vh;overflow-y: auto;">
      <router-view></router-view>
    </v-main>
    <Login v-if="!authorized" />
</v-app>

`
}

