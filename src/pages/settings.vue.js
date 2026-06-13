import store from '../store.js';
import router from '../router.js';
import css from '../plugins/goober.js';

const styles = css /*css*/ `
  .gradient-text {
    background: linear-gradient(45deg, #e65100, #ffb74d);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .settings-container {
    max-width: 900px;
  }

  .settings-card {
    border-radius: 16px!important;
    background: rgba(255, 255, 255, 0.45)!important;
    border: 1px solid rgba(0, 0, 0, 0.12)!important;
  }

  .theme--dark .settings-card {
    background: rgba(30, 30, 30, 0.5)!important;
    border-color: rgba(255, 255, 255, 0.08)!important;
  }

  .color-dot {
    width: 36px!important;
    height: 36px!important;
    min-width: 36px!important;
    transition: transform 0.2s ease;
  }

  .color-dot:hover {
    transform: scale(1.15);
  }
`;

export default {
    name: 'Settings',

    data() {
        return {
            title: 'Settings',
            showToken: false,
            storageSize: '0.00 KB',
            isOnline: navigator.onLine,
            themeColors: [
                'blue-grey',
                'red',
                'pink',
                'purple',
                'deep-purple',
                'indigo',
                'blue',
                'teal',
                'green',
                'orange',
                'deep-orange'
            ]
        };
    },

    computed: {
        appConfig() {
            return store.getters.appConfig;
        },
        user() {
            let u = store.getters.user;
            if (!u || !u.username) u = { username: "Offline User", role: "Offline" };
            return u;
        }
    },

    methods: {
        changeAccentColor(color) {
            store.commit('setThemeColor', color);
        },
        logout() {
            store.commit("setUser", null);
            router.push({ path: "/" });
        },
        resetApplication() {
            localStorage.clear();
            console.log('App cleared.');
            window.location.reload();
        },
        calculateStorageSize() {
            let total = 0;
            for (let x in localStorage) {
                if (localStorage.hasOwnProperty(x)) {
                    total += (localStorage[x].length + x.length) * 2;
                }
            }
            this.storageSize = (total / 1024).toFixed(2) + " KB";
        },
        updateOnlineStatus() {
            this.isOnline = navigator.onLine;
        }
    },

    mounted() {
        this.calculateStorageSize();
        window.addEventListener('online', this.updateOnlineStatus);
        window.addEventListener('offline', this.updateOnlineStatus);
    },

    beforeDestroy() {
        window.removeEventListener('online', this.updateOnlineStatus);
        window.removeEventListener('offline', this.updateOnlineStatus);
    },

    template: /*html*/ `
      <v-container class="py-6 settings-container ${styles}">
        <!-- Title Header -->
        <div class="mb-6">
          <h1 class="text-h3 font-weight-bold gradient-text mb-1">{{ title }}</h1>
          <p class="subtitle-1 text--secondary">Manage your account settings, appearance, and application configurations.</p>
        </div>

        <v-row>
          <!-- Left Column: Profile & Diagnostics -->
          <v-col cols="12" md="6">
            
            <!-- User Profile Card -->
            <v-card outlined class="settings-card mb-6">
              <v-card-title class="font-weight-bold pb-2">
                <v-icon left color="orange darken-3">person</v-icon>
                User Profile
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text class="pt-4">
                <div class="d-flex align-center mb-4">
                  <v-avatar color="orange darken-4" size="64" class="mr-4">
                    <img v-if="user && user.profilePic" :src="appConfig.apiBaseUrl + user.profilePic" />
                    <span v-else class="white--text text-h4 font-weight-bold">{{ user.username.substring(0,2).toUpperCase() }}</span>
                  </v-avatar>
                  <div>
                    <div class="text-h6 font-weight-bold">{{ user.username }}</div>
                    <div class="caption text--secondary">Role: <v-chip x-small color="orange darken-3" dark class="font-weight-bold">{{ user.role || 'User' }}</v-chip></div>
                  </div>
                </div>
                
                <v-text-field
                  v-if="user && user.token"
                  v-model="user.token"
                  label="API Authorization Token"
                  readonly
                  outlined
                  dense
                  :append-icon="showToken ? 'visibility' : 'visibility_off'"
                  :type="showToken ? 'text' : 'password'"
                  @click:append="showToken = !showToken"
                ></v-text-field>
              </v-card-text>
              <v-card-actions class="px-4 pb-4">
                <v-btn color="error" text class="text-none font-weight-bold" @click="logout">
                  <v-icon left>exit_to_app</v-icon>
                  Sign Out
                </v-btn>
              </v-card-actions>
            </v-card>

            <!-- System Info & Diagnostics -->
            <v-card outlined class="settings-card">
              <v-card-title class="font-weight-bold pb-2">
                <v-icon left color="orange darken-3">settings_ethernet</v-icon>
                System & Diagnostics
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text class="pt-4">
                <div class="d-flex justify-space-between mb-3">
                  <span class="font-weight-bold">Application Name:</span>
                  <span class="text--secondary">{{ appConfig.name }}</span>
                </div>
                <div class="d-flex justify-space-between mb-3 align-center">
                  <span class="font-weight-bold">Connection Status:</span>
                  <span>
                    <v-badge inline dot :color="isOnline ? 'green' : 'red'"></v-badge>
                    <span class="text--secondary ml-1">{{ isOnline ? 'Online' : 'Offline' }}</span>
                  </span>
                </div>
                <div class="d-flex justify-space-between mb-3">
                  <span class="font-weight-bold">Local Storage Usage:</span>
                  <span class="text--secondary">{{ storageSize }}</span>
                </div>
                <div class="d-flex justify-space-between mb-3">
                  <span class="font-weight-bold">API Base URL:</span>
                  <span class="text--secondary text-truncate ml-4" style="max-width: 200px;">{{ appConfig.apiBaseUrl }}</span>
                </div>
              </v-card-text>
              <v-card-actions class="px-4 pb-4">
                <v-btn color="warning" outlined class="text-none font-weight-bold" @click="resetApplication">
                  <v-icon left>refresh</v-icon>
                  Reset Application Cache
                </v-btn>
              </v-card-actions>
            </v-card>

          </v-col>

          <!-- Right Column: Personalization -->
          <v-col cols="12" md="6">
            
            <!-- Personalization Card -->
            <v-card outlined class="settings-card">
              <v-card-title class="font-weight-bold pb-2">
                <v-icon left color="orange darken-3">palette</v-icon>
                Personalization
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text class="pt-4">
                <!-- Dark Mode Toggle -->
                <div class="d-flex justify-space-between align-center mb-6">
                  <div>
                    <div class="text-subtitle-1 font-weight-bold mb-0">Dark Theme</div>
                    <div class="caption text--secondary">Toggle between light and dark modes</div>
                  </div>
                  <v-switch
                    v-model="$vuetify.theme.dark"
                    color="orange darken-3"
                    hide-details
                    inset
                  ></v-switch>
                </div>

                <!-- Accent Color Picker -->
                <div class="mb-4">
                  <div class="text-subtitle-1 font-weight-bold mb-2">Accent Theme Color</div>
                  <div class="caption text--secondary mb-4">Choose a primary color highlight for the navigation bars and headers</div>
                  
                  <div class="color-palette d-flex flex-wrap justify-start">
                    <v-btn
                      v-for="color in themeColors"
                      :key="color"
                      :color="color"
                      fab
                      x-small
                      class="ma-2 color-dot"
                      @click="changeAccentColor(color)"
                    >
                      <v-icon v-if="appConfig.themeColor === color" color="white" small>check</v-icon>
                    </v-btn>
                  </div>
                </div>

              </v-card-text>
            </v-card>

          </v-col>
        </v-row>
      </v-container>
    `,
};