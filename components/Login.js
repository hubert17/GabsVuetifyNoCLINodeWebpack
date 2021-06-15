export default {
    name: 'AppLogin',

    data() {
      return {
        user: {username: 'gabs17', password: 'bern123'},
        loading: false,
        snackbar: {show: false, text: ''},
      };
    },

    methods: {
        login() {
            this.loading = true;

            setTimeout(() => {
                console.log('Simulating a 2-second delay...')
                axios.get("data/fakeusers.json").then((response) => {
                    let users = response.data;
                    let user = users.find((x) => x.username == this.user.username && x.password === this.user.password);
                    if(user) {
                        this.$root.$emit("user", user);
                    } else {
                        this.snackbar.show = true;
                        this.snackbar.text = "Invalid username and/or password."
                    }
                });
            }, 2000);
        },
    },

    mounted() {
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundImage = "url(https://www.bing.com/th?id=OHR.FinlandBrownBear_ROW6208280659_1920x1080.jpg&rf=LaDigue_1920x1080.jpg)";
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
                        <v-form @keyup.enter.native="login">
                            <v-text-field v-model="user.username" prepend-icon="person" name="login" label="Username" type="text" ref="username"></v-text-field>
                            <v-text-field v-model="user.password" prepend-icon="lock" name="password" label="Password" id="password" type="password"></v-text-field>
                            <v-btn color="blue-grey white--text" :loading="loading" block="block" @click.prevent="login" type="button" :disabled="loading">Sign in</v-btn>
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