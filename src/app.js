import router from './router.js'
import store from './store.js'
import SideInfoPanel from './components/SideInfoPanel.js'
import ReloadPrompt from './components/ReloadPrompt.js'

export default {
  name: 'App',
  data: () => ({
    showSideInfo: true,
    learnings: [
      { title: 'Vue', link:'https://vuejs.org/v2/guide/' },
      { title: 'Vuetify', link:'https://vuetifyjs.com/en/introduction/why-vuetify/' },
      { title: 'Github', link:'https://github.com/hubert17/GabsVuetifyNoCLINodeWebpack' },
    ]
  }),
  watch: {
    '$route' (to, from) {
      this.showSideInfo = to.path === "/"
    }
  },
  methods: {
    clickToggleDrawer: function () {
      if(this.showSideInfo) return;
      store.commit("appDrawer", !this.drawer);
    },
    gotoRoute(routeName) {
      router.push({ path: routeName }).catch(() => {});
    },
    logout() {
      store.commit("setUser", null);
      router.push({ path: "/" }).catch(() => {});
    }
  },
  computed: {
    routes() {
      return this.$router.options.routes;
    },
    appConfig() {
      return store.getters.appConfig;
    },
    user() {
      let u = store.getters.user;
      if(!u) u = {userName :"offline user"}
      return u;
    },
    drawer: {
      get() {
        return store.getters.appDrawer
      },
      set(val) {
        return val;
      }
    }
  },
  components: { SideInfoPanel, ReloadPrompt},
  template: /*html*/ `
<div>
   <ReloadPrompt />
    <v-navigation-drawer v-model="drawer" :clipped="$vuetify.breakpoint.lgAndUp" app dark :width="$vuetify.breakpoint.xsOnly ? 270 : 250" class="blue-grey lighten-1">

    <v-list nav dark class="blue-grey lighten-1">
      <v-subheader class="hidden-sm-and-up">{{appConfig.name}}</v-subheader>

      <v-list-item-group>
        <v-list-item v-for="(menu, i) in routes"  :key="i" :to="menu.path" active-class="blue-grey darken-0" >
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
      <v-list-item active-class="blue-grey darken-0" class="hidden-sm-and-up">
            <v-list-item-icon>
              <v-icon>forum</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Customer Service</v-list-item-title>
            </v-list-item-content>
      </v-list-item>
      <v-list-item active-class="blue-grey darken-0"  class="hidden-sm-and-up">
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

  <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app color="blue-grey" dark>
        <v-app-bar-nav-icon @click.stop="clickToggleDrawer"></v-app-bar-nav-icon>

        <v-toolbar-title>{{appConfig.name}}</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-tooltip bottom>
            <template v-slot:activator="{ on }">
            <v-btn v-on="on" icon dark @click="">
              <v-icon>mdi-lightbulb-on</v-icon>
            </v-btn>
            </template>
            <span>Bulb Menu</span>
          </v-tooltip>

        <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn v-on="on" icon dark class="hidden-sm-and-down">
                <v-icon>mdi-forum</v-icon>
              </v-btn>
            </template>
            <span>Customer Service</span>
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn v-on="on" icon dark class="hidden-sm-and-down">
                <v-icon>mdi-vote</v-icon>
              </v-btn>
            </template>
            <span>Send Suggesstions</span>
          </v-tooltip>

            <v-menu left bottom>
                <template v-slot:activator="{ on }">
                  <v-btn text v-on="on" slot="activator" small="small"  dark  class="hidden-sm-and-down">{{user.userName}}</span>
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
                  <v-avatar v-ripple v-on="on" slot="activator" class="mr-2" size="36"  ><img src="https://cdn.vuetifyjs.com/images/logos/logo.svg" /></v-avatar>
                </template>

                <v-list  class="hidden-sm-and-up">
                  <v-list-item @click="() => {gotoRoute('/')}">
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
