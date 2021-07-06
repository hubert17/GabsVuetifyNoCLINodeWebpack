// https://levelup.gitconnected.com/vuex-is-super-simple-vue-js-d8da2e552766

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    appConfig: {
        name: "Gabs Vue App",
        baseUrl: "",
        apiBaseUrl: "https://api45gabs.azurewebsites.net",
        imgBaseUrl: "",
        storageName: "gabsvueappuser",
    },
    authHeader: {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: null,
      },
    },
    authHeaderForm: {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: null,
      },
    },
    user: null
  },
  getters: {
    appConfig: function (state) {
      return state.appConfig;
    },
    user: function (state) {
      return state.user;
    },
    authHeader: function (state) {
      return state.authHeader;
    },
    authHeaderForm: function (state) {
      return state.authHeaderForm;
    }
  },
  mutations: {
    setUser: function (state, val, fromLS = false) {
      state.user = val
      if (val && val.token) {
        if (!fromLS) localStorage.setItem(state.appConfig.storageName, JSON.stringify(state.user))
        state.authHeader.headers.Authorization = "Bearer " + state.user.token
        state.authHeaderForm.headers.Authorization = "Bearer " + state.user.token
      } else {
        state.authHeader.headers.Authorization = null
        state.authHeaderForm.headers.Authorization = null
        console.log("User has logged out.")
      }
    }
  },
  actions: {

  },
});

export default store;