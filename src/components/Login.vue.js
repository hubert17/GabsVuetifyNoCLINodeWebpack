import store from '../store.js'
import GoogleSignInButton from '../plugins/google-signin-button.js'
import VueRecaptcha from 'https://cdn.jsdelivr.net/npm/vue-recaptcha@1.3.0/dist/vue-recaptcha.es.js'; // https://www.google.com/recaptcha/admin/create

import css from '../plugins/goober.js';
const styles = css /*css*/ `

.v-messages__message {
    color: red;
}

`

export default {
  name: 'AppLogin',

  components: { VueRecaptcha },
  directives: { GoogleSignInButton },

  data() {
    return {
      login: { username: 'admin', password: 'admin123' },
      reg: { username: '', password: '', confirm: '', role: 'user' },
      regEmpty: {},
      loading: false,
      snackbar: { show: false, text: '' },
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
      if (step === 2) {
        this.disabledNext = true;
      }
      if (step === 3) {
        this.register();
        Object.assign(this.reg, this.regEmpty);
        if (this.appConfig.recaptchaKey) this.$refs.googleRecaptcha.reset()
      }

      return this.step !== 5 ? this.step++ : this.step = 1
    },
    OnGoogleAuthSuccess(idToken) {
      // Receive the idToken and make your magic with the backend
      axios.post(this.appConfig.apiBaseUrl + "/GOOGLETOKEN?idToken=" + idToken)
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
    OnGoogleAuthFail(error) {
      console.log(error)
    }
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
    themeColor() {
      return !this.$vuetify.theme.dark ? store.getters.appConfig.themeColor : '';
    },
    currentTitle() {
      switch (this.step) {
        case 1: return 'Login'
        case 2: return 'Sign-up'
        case 3: return 'Create a password'
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
                    <v-toolbar dark :color="themeColor">
                        <v-toolbar-title>{{ currentTitle }}</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-avatar v-if="step !== 1" :color="!$vuetify.theme.dark ? themeColor + ' lighten-2' : ' grey darken-3'" class="subheading" size="24" v-text="step-1" ></v-avatar>
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
                                <v-btn :color="themeColor + ' white--text'" :loading="loading" block="block" @click.prevent="getToken" type="button" :disabled="loading">Sign in</v-btn>
                                <v-spacer class="py-1"></v-spacer>
                                <v-btn :color="themeColor" outlined block="block" @click.prevent="Object.assign(regEmpty,reg);step=2" type="button" :disabled="loading">Create New Account</v-btn>
                                <v-spacer class="py-1"></v-spacer>
                                <v-btn v-if="appConfig.clientId" v-google-signin-button="appConfig.clientId" color="primary" outlined large block="block" type="button" style="text-transform:none;letter-spacing:0em;font-weight:400;font-size:1.2em;">
                                    <div class="d-flex align-center justify-center" style="width: 30px; height: 30px; margin-right: 8px;">
                                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px">
                                        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                                        <path fill="#4285F4" d="M46.5 24c0-1.61-.15-3.16-.42-4.69H24v9.09h12.64c-.55 2.89-2.2 5.33-4.7 6.99l7.33 5.68C43.5 36.5 46.5 30.76 46.5 24z"/>
                                        <path fill="#FBBC05" d="M10.54 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.98-6.19z"/>
                                        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.33-5.68c-2.03 1.36-4.63 2.19-8.56 2.19-6.26 0-11.57-4.22-13.46-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                                      </svg>
                                    </div>
                                    <span class="pl-2">Continue with Google</span>
                                </v-btn>
                            </v-form>
                        </v-card-text>
                        </v-window-item>

                        <v-window-item :value="2">
                            <v-card-text class="px-4">
                              <v-text-field v-model="reg.username" type="email" label="Email" :autofocus="true" @keyup.enter.native="reg.username ? next(2) : null"></v-text-field>
                              <span class="text-caption grey--text text--darken-1">
                                This is the email you will use to login to your account.
                              </span>
                            </v-card-text>
                          </v-window-item>

                          <v-window-item :value="3">
                            <v-card-text class="px-4">
                              <v-text-field v-model="reg.password" label="Password" type="password" :autofocus="true" @keyup.enter.native="reg.password === reg.confirm && reg.password ? next(3) : null"></v-text-field>
                              <v-text-field v-model.lazy="reg.confirm" label="Confirm Password" type="password" :hint="reg.password && reg.confirm && reg.password !== reg.confirm ? 'Password not the same' : ''" persistent-hint @keyup.enter.native="reg.password === reg.confirm && reg.password ? next(3) : null"></v-text-field>
                              <span class="text-caption grey--text text--darken-1">
                                Please enter a password for your account
                              </span>
                              <v-spacer class="py-2"></v-spacer>
                              <vue-recaptcha v-if="appConfig.recaptchaKey" ref="googleRecaptcha" :sitekey="appConfig.recaptchaKey" :loadRecaptchaScript="true" @verify="disabledNext=false"></vue-recaptcha>
                            </v-card-text>
                          </v-window-item>

                          <v-window-item :value="4">
                            <div class="pa-4 text-center">
                              <h3 class="text-h6 font-weight-light mb-2"> Please wait... </h3>
                              <span class="text-caption grey--text">This will only take a moment.</span>
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
                        <v-btn  v-if="step !== 1" :disabled="(step === 2 && !reg.username) || (step === 3 && (!reg.password || reg.password !== reg.confirm || (disabledNext && !(!appConfig.recaptchaKey)) ))" color="primary" depressed @click="next(step)" > Next </v-btn>
                      </v-card-actions>
              </v-card>
            </v-col>
        </v-row>

        <v-snackbar v-model="snackbar.show" top :timeout="8000" :color="themeColor ? themeColor + ' darken-2' : 'error'">
            <span class="float-left">{{ snackbar.text }}</span>
            <v-btn class="float-right" color="warning" x-small @click="snackbar.show = false"> x </v-btn>
        </v-snackbar>

      </v-container>

    `,
};