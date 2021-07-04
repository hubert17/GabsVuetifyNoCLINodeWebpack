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
            if(navigator.onLine) {
                axios.get('https://api45gabs.azurewebsites.net/api/sample/bingphotos').then((response) => {
                    this.bingPhotos = response.data
                    this.saveToLocal(this.bingPhotos)
                })
            } else {
                let photos = JSON.parse(localStorage.getItem("bingphotos"))
                    if(photos) {
                        this.bingPhotos = photos
                    } else {
                        axios.get('data/bingPhotos.json').then((response) => {
                            this.bingPhotos = response.data
                            this.saveToLocal(this.bingPhotos)
                        }).catch((err) => {
                            console.log("Bing photos unavailable.")
                        })
                    }
            }


        },
        saveToLocal(bingPhotos) {
            localStorage.setItem("bingphotos", JSON.stringify(bingPhotos))
        }
    },

    mounted() {
        this.getBingWallpapers();
    },

    template: /*html*/ `

<v-main>
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
</v-main>

    `,
  };