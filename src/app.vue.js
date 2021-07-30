import router from './router.js'

export default {
  name: 'App',

  data: () => ({
    name: "Hello Vue World!",
    themeColor: "blue-grey",
    appDrawer: true,
    learnings: [
      { title: 'Vue', link:'https://vuejs.org/v2/guide/' },
      { title: 'Vuetify', link:'https://vuetifyjs.com/en/introduction/why-vuetify/' },
      { title: 'Github', link:'https://github.com/hubert17/GabsVuetifyNoCLINodeWebpack' },
    ]
  }),

  methods: {
    clickToggleDrawer() {
      this.$root.$emit("appDrawer", !this.appDrawer);
    },
    gotoRoute(routeName) {
      if(this.$router.currentRoute.path === routeName) return
      router.push({ path: routeName })
    },
    logout() {
      this.$root.$emit("user", null);
      if(this.$router.currentRoute.path === this.$router.options.base) return
      router.push({ path: "/" })
    }
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
    }
  },

  template: /*html*/ `

<div>
    <v-navigation-drawer v-model="appDrawer" :clipped="$vuetify.breakpoint.smAndUp" app dark :width="$vuetify.breakpoint.xsOnly ? 270 : 250" :class="themeColor + ' lighten-1'">

    <v-list nav dark>
      <v-subheader class="hidden-sm-and-up">{{name}}</v-subheader>

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
            <v-list-item-content style="color:#fff">
              <v-list-item-title>Learn</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item v-for="menu in learnings" :key="menu.title" :href="menu.link" target="_blank" style="color:#fff">
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

  </v-navigation-drawer>

  <v-app-bar :clipped-left="$vuetify.breakpoint.smAndUp" app :color="themeColor" dark>
        <v-app-bar-nav-icon @click.stop="clickToggleDrawer"></v-app-bar-nav-icon>

        <v-toolbar-title>{{name}}</v-toolbar-title>

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

            <v-menu left bottom>
                <template v-slot:activator="{ on }">
                  <v-btn text v-on="on" slot="activator" small="small" class="hidden-xs-only">username</span>
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
                  <v-avatar color="red" :ripple="{ center: true }" v-on="on" slot="activator" class="ml-1 mr-2" size="36"  >
                    <span class="white--text text-h6">HG</span>
                  </v-avatar>
                </template>

                <v-list  class="hidden-sm-and-up">
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
