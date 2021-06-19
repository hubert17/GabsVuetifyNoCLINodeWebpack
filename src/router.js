import homepage from './pages/home.js'
import settings from './pages/settings.js'
import help from './pages/help.js'

Vue.use(VueRouter);

const routes = [
    { title: "Home", icon: "home", path: "/", component: homepage },
    { title: "Settings", icon: "settings", path: "/settings", component: settings},
    { title: "Help", icon: "help_outline", path: "/help", component: help },
  ];

const router = new VueRouter({
    base:'/GabsVuetifyNoCLINodeWebpack',
    mode: 'history', // real path
    routes, // short for `routes: routes`
  });

  /*
  comment out these callback if you want to use `prompt`
  */
  router.onReady(async() => {
    const { registerSW } = await import("virtual:pwa-register")
    registerSW({ immediate: true })
  })

  export default router;