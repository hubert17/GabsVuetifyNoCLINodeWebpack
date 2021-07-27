import homepage from './pages/home.vue.js'
import settings from './pages/settings.vue.js'
import help from './pages/help.vue.js'
import news from './pages/news.vue.js'

//Vue.use(VueRouter);

const routes = [
    { title: "Home", icon: "home", path: "/", component: homepage },
    { title: "News", icon: "article", path: "/news", component: news},
    { title: "Settings", icon: "settings", path: "/settings", component: settings},
    { title: "Help", icon: "help_outline", path: "/help", component: help },
  ];

const router = VueRouter.createRouter({
    base: window.location.pathname.substring(0, window.location.pathname.lastIndexOf("/")+1),
    history: VueRouter.createWebHashHistory(), //createWebHistory(),
    routes, // short for `routes: routes`
  });

  export default router;