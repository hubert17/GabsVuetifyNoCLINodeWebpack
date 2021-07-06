import store from '../store.js'

export default {
    name: 'AppLogin',
    data() {
      return {
        login: {username: 'admin', password: 'admin123'},
        loading: false,
        snackbar: {show: false, text: ''},
      };
    },

    methods: {
        getToken() {
            this.loading = true;
            axios.post(this.appConfig.apiBaseUrl + "/TOKEN?username=" + this.login.username + "&password=" + this.login.password, this.authHeader)
                .then((response) => {
                    let user = response.data;
                    if (user && user.token) {
                        store.commit("setUser", user);
                        console.log("Authentication OK. ");
                    } else throw {}
                }).catch((err) => {
                    console.log(err.message); //error.response.data.message.text
                    this.loading = false;
                    this.snackbar.text = "Invalid username and/or password."
                    this.snackbar.show = true;
                    this.$refs.username.focus();
                });
        },
    },

    mounted() {
        let photos = localStorage.getItem("bingphotos")
        document.body.style.backgroundSize = "cover"
        document.body.style.backgroundImage = "url(https://bing.com" + (photos ? JSON.parse(photos)[0].url : "/th?id=OHR.BurleighHeads_EN-US4425800469_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp") + ")"
    },

    computed: {
        appConfig: function () {
          return store.getters.appConfig;
        }
      },

    template: /*html*/ `

<v-main>
    <v-container fluid fill-height>
        <v-row align="center" justify="center">
            <v-col sm="4" class="text-xs-center">
              <v-card class="elevation-12">
                    <v-toolbar dark color="blue-grey">
                        <v-toolbar-title>Login</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-tooltip left>
                            <template v-slot:activator="{ on }">
                            <v-btn v-on="on" icon dark @click="">
                            <v-icon>vpn_key</v-icon>
                            </v-btn>
                            </template>
                            <span>Forgot Password</span>
                        </v-tooltip>
                    </v-toolbar>

                    <v-card-text>
                        <v-form @keyup.enter.native="getToken">
                            <v-text-field type="text" v-model="login.username" prepend-icon="person" label="Username" ref="username"></v-text-field>
                            <v-text-field type="password" v-model="login.password" prepend-icon="lock" label="Password"></v-text-field>
                            <v-btn color="blue-grey white--text" :loading="loading" block="block" @click.prevent="getToken" type="button" :disabled="loading">Sign in</v-btn>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                    </v-card-actions>
              </v-card>
            </v-col>
        </v-row>
      </v-container>

      <v-snackbar v-model="snackbar.show" top :timeout="8000" color="purple darken-3">
        <span class="float-left">{{ snackbar.text }}</span>
        <v-btn class="float-right" color="warning" x-small @click="snackbar.show = false">
            x
        </v-btn>
      </v-snackbar>

</v-main>

    `,
  };