const {ref, onMounted} = Vue

export default {
    name: 'Home',
    setup() {
        const title = ref('Home page')
        const bingPhotos = ref([])

        const saveToLocal = (bingPhotos) => {
            localStorage.setItem("bingphotos", JSON.stringify(bingPhotos))
        }

        const getBingWallpapers = () => {
            if(navigator.onLine) {
                axios.get('https://api45gabs.azurewebsites.net/api/sample/bingphotos').then((response) => {
                    bingPhotos.value = response.data
                    saveToLocal(bingPhotos.value)
                })
            } else {
                let photos = JSON.parse(localStorage.getItem("bingphotos"))
                    if(photos) {
                        bingPhotos.value = photos
                    } else {
                        axios.get('data/bingPhotos.json').then((response) => {
                            bingPhotos.value = response.data
                            saveToLocal(bingPhotos.value)
                        }).catch((err) => {
                            console.log("Bing photos unavailable.")
                        })
                    }
            }
        }

        onMounted(getBingWallpapers)

        return {title, bingPhotos}
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