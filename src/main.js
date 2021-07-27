import App from './app.vue.js'
import router from './router.js'

const vuetify = Vuetify.createVuetify()
Vue.createApp(App).use(vuetify).use(router).mount('#app')
