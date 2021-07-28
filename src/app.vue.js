import router from './router.js'
import store from './store.js'
import SideInfoPanel from './components/SideInfoPanel.vue.js'

export default {
  name: 'App',

  data: () => ({
    isInstalled: false,
    appDrawer: true,
    showSideInfo: true,
    learnings: [
      { title: 'Vue', link:'https://vuejs.org/v2/guide/' },
      { title: 'Vuetify', link:'https://vuetifyjs.com/en/introduction/why-vuetify/' },
      { title: 'Github', link:'https://github.com/hubert17/GabsVuetifyNoCLINodeWebpack' },
    ]
  }),

  watch: {
    '$route' (to, from) {
      this.showSideInfo = to.path === "/" && this.$vuetify.breakpoint.smAndUp
    }
  },

  methods: {
    clickToggleDrawer() {
      if(this.showSideInfo) {
        this.$root.$emit("appDrawer", true);
      } else {
        this.$root.$emit("appDrawer", !this.appDrawer);
      }
    },
    toggleDarkTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },
    gotoRoute(routeName) {
      router.push({ path: routeName }).catch(() => {});
    },
    logout() {
      store.commit("setUser", null);
      localStorage.removeItem(this.appConfig.storageName)
      router.push({ path: "/" }).catch(() => {});
    },
  },

  mounted() {
    if (this.$vuetify.breakpoint.mdAndUp) {
      this.appDrawer = true
    }
    this.$root.$on("appDrawer", (val, by) => {
      this.appDrawer = val
    })
  },

  computed: {
    routes() {
      return this.$router.options.routes;
    },
    appConfig() {
      return store.getters.appConfig;
    },
    themeColor() {
      return !this.$vuetify.theme.dark ? store.getters.appConfig.themeColor : '';
    },
    user() {
      let u = store.getters.user
      if (!u || !u.username) u = { username: "offline user" }
      return u
    }
  },

  components: { SideInfoPanel },

  template: /*html*/ `

<div>
    <v-navigation-drawer v-model="appDrawer" :clipped="$vuetify.breakpoint.smAndUp" app dark :width="$vuetify.breakpoint.xsOnly ? 270 : 250" :class="themeColor + ' lighten-1'">

    <v-list nav>
      <v-subheader class="hidden-sm-and-up">{{appConfig.name}}</v-subheader>

      <v-list-item-group>
        <v-list-item v-for="(menu, i) in routes"  :key="i" :to="menu.path" >
          <v-list-item-icon>
            <v-icon v-text="menu.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="menu.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-group prepend-icon="local_library" no-action>
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Learn</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item v-for="menu in learnings" :key="menu.title" :href="menu.link" target="_blank" >
            <v-list-item-content>
              <v-list-item-title v-text="menu.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
      </v-list-group>

      </v-list-item-group>

      <!-- Mobile only Menu items  -->
      <v-list-item class="hidden-sm-and-up">
            <v-list-item-icon>
              <v-icon>forum</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Customer Service</v-list-item-title>
            </v-list-item-content>
      </v-list-item>
      <v-list-item class="hidden-sm-and-up">
            <v-list-item-icon>
              <v-icon>how_to_vote</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Send Suggesstions</v-list-item-title>
            </v-list-item-content>
      </v-list-item>

    </v-list>

    <SideInfoPanel v-if="showSideInfo"
      TitleHeader="Title" TitleText="Some Title"
      DetailHeader="Detail" DetailText="Some a bit long detail here"
      StatusHeader="Status" StatusText="Some Status" />

  </v-navigation-drawer>

  <v-app-bar :clipped-left="$vuetify.breakpoint.smAndUp" app :color="themeColor" dark>
        <v-app-bar-nav-icon @click.stop="clickToggleDrawer"></v-app-bar-nav-icon>

        <v-toolbar-title>{{appConfig.name}}</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn v-on="on" icon class="hidden-xs-only">
                <v-icon>mdi-forum</v-icon>
              </v-btn>
            </template>
            <span>Customer Service</span>
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn v-on="on" icon class="hidden-xs-only">
                <v-icon>mdi-vote</v-icon>
              </v-btn>
            </template>
            <span>Send Suggesstions</span>
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn v-on="on" icon class="hidden-xs-only" @click="toggleDarkTheme">
                <v-icon>{{ $vuetify.theme.dark ? 'wb_sunny' : 'brightness_4' }}</v-icon>
              </v-btn>
            </template>
            <span>Dark Mode</span>
          </v-tooltip>

            <v-menu left bottom>
                <template v-slot:activator="{ on }">
                  <v-btn text v-on="on" slot="activator" small="small" class="hidden-xs-only">{{user.googleInfo ? user.googleInfo.firstName : user.username}}</span>
                      <v-icon>keyboard_arrow_down</v-icon>
                    </v-btn>
                </template>

                <v-list >
                  <v-list-item @click="gotoRoute('/settings')">
                      <v-icon class="mr-2">settings</v-icon>
                    <v-list-item-title>Settings</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click.prevent="logout">
                      <v-icon class="mr-2">exit_to_app</v-icon>
                    <v-list-item-title>Logout</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>

            <v-menu left bottom>
                <template v-slot:activator="{ on }">
                  <v-avatar color="red" :ripple="{ center: true }" v-on="on" slot="activator" class="mr-2" size="36"  >
                    <img v-if="user && user.profilePic" :src="appConfig.apiBaseUrl + user.profilePic" />
                    <span class="white--text text-h6">{{ user.username.substring(0,2).toUpperCase() }}</span>
                  </v-avatar>
                </template>

                <v-list  class="hidden-sm-and-up">
                  <v-list-item @click="toggleDarkTheme">
                      <v-icon class="mr-2">{{ $vuetify.theme.dark ? 'wb_sunny' : 'brightness_4' }}</v-icon>
                    <v-list-item-title>Dark Mode</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="() => {gotoRoute('/settings')}">
                      <v-icon class="mr-2">settings</v-icon>
                    <v-list-item-title>Settings</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click.prevent="logout">
                      <v-icon class="mr-2">exit_to_app</v-icon>
                    <v-list-item-title>Logout</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>

      </v-app-bar>


</div>

`,

};
