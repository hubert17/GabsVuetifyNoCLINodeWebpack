export default {
    name: 'Home',

    data() {
        return {
            title: 'Home page',
            bingPhotos: []
        };
    },

    methods: {
        getBingWallpapers() {
            axios.get('https://api45gabs.azurewebsites.net/api/sample/bingphotos')
                .then((response) => {
                    this.bingPhotos = response.data
                })
                .catch(err => {
                    console.log(err);
                })
        }
    },

    mounted() {
        this.getBingWallpapers();
    },

    template: /*html*/ `

<v-container>
        <h1>
            {{ title }}
        </h1>
        <v-row>
            <v-col sm="4" v-for="photo in bingPhotos" :key="photo.startdate">
                <v-card class="mx-auto">
                    <v-img class="white--text align-end"  :src="'https://www.bing.com' + photo.url" >
                        <v-card-title>{{ photo.title }}</v-card-title>
                    </v-img>
                    <v-card-subtitle class="pb-0"> {{ photo.copyright }} </v-card-subtitle>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn icon> <v-icon>mdi-heart</v-icon> </v-btn>
                      <v-btn icon> <v-icon>mdi-bookmark</v-icon> </v-btn>
                      <v-btn icon> <v-icon>mdi-share-variant</v-icon> </v-btn>
                  </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>

    `,
  };