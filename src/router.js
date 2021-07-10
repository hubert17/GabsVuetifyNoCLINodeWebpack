import homepage from './pages/home.js'
import settings from './pages/settings.js'
import help from './pages/help.js'
import news from './pages/news.js'

Vue.use(VueRouter);

const routes = [
    { title: "Home", icon: "home", path: "/", component: homepage },
    { title: "News", icon: "article", path: "/news", component: news},
    { title: "Settings", icon: "settings", path: "/settings", component: settings},
    { title: "Help", icon: "help_outline", path: "/help", component: help },
  ];

const router = new VueRouter({
    base: window.location.pathname.substring(0, window.location.pathname.lastIndexOf("/")+1),
    // mode: 'history',
    routes, // short for `routes: routes`
  });

  export default router;