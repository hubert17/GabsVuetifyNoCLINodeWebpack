import useRegisterSW from '../mixins/useRegisterSW.js'

export default {
  name: "ReloadPrompt",
  mixins: [useRegisterSW],
  template: /*html*/ `


<v-snackbar :value="offlineReady || needRefresh" timeout="-1" right>
    <v-row align="center" justify="center">
      <v-col cols="2" sm="1">
        <v-icon large>info</v-icon>
      </v-col>
      <v-col cols="8" sm="10" class="ml-3 mr-n3">
        <div v-if="offlineReady"> App ready to work offline </div>
        <div v-else> New content available,  click on reload button to update. </div>
        <v-btn v-if="needRefresh" class="mt-2" color="indigo" @click="updateServiceWorker" > Reload </v-btn>
      </v-col>
      <v-col cols="2" sm="1">
        <v-btn icon @click="closePrompt"> <v-icon>clear</v-icon> </v-btn>
      </v-col>
    </v-row>
  </v-snackbar>

`, };