Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    appConfig: {
      name: "GabsVue",
      themeColor: localStorage.getItem('theme_color') || "blue-grey", // https://vuetifyjs.com/en/styles/colors/#material-colors
      baseUrl: "",
      apiBaseUrl: "https://api45gabs.azurewebsites.net",
      imgBaseUrl: "",
      storageName: 'hellovuegabs',
      clientId: '951799207669-5nv7cv480db7drqavq7irtcqkcna6flh.apps.googleusercontent.com', // https://developers.google.com/identity/sign-in/web/sign-in
      recaptchaKey: ''
    },
    user: null,
  },
  getters: {
    appConfig(state) {
      return state.appConfig;
    },
    user(state) {
      return state.user;
    },
    isAuthenticated(state) {
      return state.user !== null && state.user.token !== undefined;
    }
  },
  mutations: {
    setUser(state, val, fromLS = false) {
      state.user = val;
      if (val && val.token) {
        if (!fromLS) {
          localStorage.setItem(state.appConfig.storageName, JSON.stringify(state.user));
        }
        axios.defaults.headers.common['Authorization'] = "Bearer " + state.user.token;
      } else {
        localStorage.removeItem(state.appConfig.storageName);
        delete axios.defaults.headers.common['Authorization'];
        console.log('User has logged out.');
      }
    },
    setThemeColor(state, color) {
      state.appConfig.themeColor = color;
      localStorage.setItem('theme_color', color);
    }
  },
  actions: {

  },
});

export default store;