Vue.use(VueRouter);

const routes = [
  { title: "Home", icon: "home", path: "/", component: () => import('./pages/home.vue.js') },
  { title: "News", icon: "article", path: "/news", component: () => import('./pages/news.vue.js') },
  { title: "Settings", icon: "settings", path: "/settings", component: () => import('./pages/settings.vue.js') },
  { title: "Help", icon: "help_outline", path: "/help", component: () => import('./pages/help.vue.js') },
  { path: "*", redirect: "/" }
];

const router = new VueRouter({
  base: window.location.pathname.substring(0, window.location.pathname.lastIndexOf("/") + 1),
  routes,
});

export default router;