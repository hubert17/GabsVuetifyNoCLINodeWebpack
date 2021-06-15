import homepage from './pages/home.js'
import settings from './pages/settings.js'
import help from './pages/help.js'

Vue.use(VueRouter);

const routes = [
    { title: "Home", icon: "home", path: "/", component: homepage },
    { title: "Settings", icon: "settings", path: "/settings", component: settings },
    { title: "Help", icon: "help_outline", path: "/help", component: help },
  ];

  let router = new VueRouter({
    // mode: 'history', // real path
    routes, // short for `routes: routes`
  });

  export default router;