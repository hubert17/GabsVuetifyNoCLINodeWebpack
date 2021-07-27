import store from '../store.js'
import { css } from 'https://cdn.jsdelivr.net/npm/goober@2.0.33/dist/goober.modern.js';
const styles = css /*css*/ `

.v-messages__message {
    color: red;
}

`

export default {
    name: 'AppLogin',

    //directives: { GoogleSignInButton },

    data() {
      return {
        login: {username: 'admin', password: 'admin123'},
        reg: {username: '', password: '', confirm: '', role: 'user'},
        regEmpty: {},
        loading: false,
        snackbar: {show: false, text: ''},
        step: 1,
        hintConfirm: '',
        disabledNext: false
      };
    },

    methods: {
        getToken() {
            this.loading = true;
            axios.post(this.appConfig.apiBaseUrl + "/TOKEN?username=" + this.login.username + "&password=" + this.login.password)
                .then((response) => {
                    let user = response.data;
                    if (user && user.token) {
                        store.commit("setUser", user);
                        console.log("Authentication OK. ");
                    } else throw {}
                }).catch((err) => {
                    console.log(JSON.stringify(err.response));
                    this.loading = false;
                    this.snackbar.text = "Invalid username and/or password."
                    this.snackbar.show = true;
                    this.$refs.username.focus();
                });
        },
        register() {
          this.loading = true;
          axios.post(this.appConfig.apiBaseUrl + "/api/account/register?username=" + this.reg.username + "&password=" + this.reg.password)
          .then((response) => {
              this.loading = false;
              let user = response.data.user;
              if (user && user.userName) {
                  this.login.username = user.userName
                  this.login.password = ''
                  this.step++
                  this.$refs.password.focus();
                  return;
              } else throw {}
          }).catch((err) => {
              console.log(JSON.stringify(err.response))
              this.loading = false;
              this.step = 1;
              this.snackbar.text = err.response.data.message
              this.snackbar.show = true;
          });
        },
        next(step) {
            if(step === 3) {
                this.register();
                Object.assign(this.reg,this.regEmpty);
            }

            return this.step !== 5 ? this.step++ : this.step=1
        },
    },

    mounted() {
        let photos = localStorage.getItem("bingphotos")
        document.body.style.backgroundSize = "cover"
        document.body.style.backgroundImage = "url(https://bing.com" + (photos ? JSON.parse(photos)[0].url : "/th?id=OHR.BurleighHeads_EN-US4425800469_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp") + ")"
    },

    computed: {
        appConfig() {
          return store.getters.appConfig;
        },
        currentTitle() {
            switch (this.step) {
                case 1: return 'Login'
                case 2: return 'Sign-up'
                case 3: this.disabledNext = true; return 'Create a password'
                case 4: return ''
                default: return 'Account created'
            }
        },
      },

    template: /*html*/ `

    <v-container fluid fill-height class=${styles}>
        <v-row align="center" justify="center">
            <v-col sm="4" class="text-xs-center">
              <v-card class="elevation-12">
                    <v-overlay :value="loading && step !== 1" absolute> <v-progress-circular indeterminate size="64" ></v-progress-circular> </v-overlay>
                    <v-toolbar dark color="blue-grey">
                        <v-toolbar-title>{{ currentTitle }}</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-avatar v-if="step !== 1" color="blue-grey lighten-2 white--text" class="subheading" size="24" v-text="step-1" ></v-avatar>
                        <v-tooltip left v-if="step === 1">
                            <template v-slot:activator="{ on }">
                            <v-btn v-on="on" icon dark @click="">
                            <v-icon>vpn_key</v-icon>
                            </v-btn>
                            </template>
                            <span>Forgot Password</span>
                        </v-tooltip>
                    </v-toolbar>

                    <v-window v-model="step">
                        <v-window-item :value="1">
                        <v-card-text>
                            <v-form @keyup.enter.native="getToken">
                                <v-text-field v-model="login.username" prepend-icon="person" label="Username" ref="username"></v-text-field>
                                <v-text-field type="password" v-model="login.password" prepend-icon="lock" label="Password" ref="password"></v-text-field>
                                <v-btn color="blue-grey white--text" :loading="loading" block="block" @click.prevent="getToken" type="button" :disabled="loading">Sign in</v-btn>
                                <v-spacer class="py-1"></v-spacer>
                                <v-btn color="blue-grey" outlined block="block" @click.prevent="Object.assign(regEmpty,reg);step=2" type="button" :disabled="loading">Create New Account</v-btn>
                            </v-form>
                        </v-card-text>
                        </v-window-item>

                        <v-window-item :value="2">
                            <v-card-text class="px-4">
                              <v-text-field v-model="reg.username" type="email" label="Email" :autofocus="true"></v-text-field>
                              <span class="text-caption grey--text text--darken-1">
                                This is the email you will use to login to your Chada account
                              </span>
                            </v-card-text>
                          </v-window-item>

                          <v-window-item :value="3">
                            <v-card-text class="px-4">
                              <v-text-field v-model="reg.password" label="Password" type="password" :autofocus="true"></v-text-field>
                              <v-text-field v-model.lazy="reg.confirm" label="Confirm Password" type="password" :hint="reg.password && reg.confirm && reg.password !== reg.confirm ? 'Password not the same' : ''" persistent-hint ></v-text-field>
                              <span class="text-caption grey--text text--darken-1">
                                Please enter a password for your account
                              </span>
                            </v-card-text>
                          </v-window-item>

                          <v-window-item :value="4">
                            <div class="pa-4 text-center">
                              <h3 class="text-h6 font-weight-light mb-2"> Please wait... </h3>
                              <span class="text-caption grey--text">This would be quick.</span>
                            </div>
                          </v-window-item>

                          <v-window-item :value="5">
                            <div class="pa-4 text-center">
                              <v-img class="mb-4" contain height="128" src="https://cdn.vuetifyjs.com/images/logos/v.svg" ></v-img>
                              <h3 class="text-h6 font-weight-light mb-2"> Welcome to Chada! </h3>
                              <span class="text-caption grey--text">Thanks for signing up.</span>
                            </div>
                          </v-window-item>

                    </v-window>
                    <v-card-actions>
                        <v-btn v-if="step !== 1 && step !== 5" text @click="step--" > Back </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn  v-if="step !== 1" :disabled="(step === 2 && !reg.username) || (step === 3 && (!reg.password || reg.password !== reg.confirm || (disabledNext) ))" color="primary" depressed @click="next(step)" > Next </v-btn>
                      </v-card-actions>
              </v-card>
            </v-col>
        </v-row>

        <v-snackbar v-model="snackbar.show" top :timeout="8000" color="purple darken-3">
            <span class="float-left">{{ snackbar.text }}</span>
            <v-btn class="float-right" color="warning" x-small @click="snackbar.show = false"> x </v-btn>
        </v-snackbar>

      </v-container>

    `,
  };