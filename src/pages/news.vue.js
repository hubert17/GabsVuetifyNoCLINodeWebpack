import store from '../store.js';

export default {
    name: 'News',

    data() {
        return {
            title: 'News',
            articles: [],
            errors: []
        };
    },

    methods: {
        show(idx) {
             if(this.articles[idx].source.id !== 'active') {
                this.articles[idx].source.id = 'active'
             } else  {
                this.articles[idx].source.id = null
             }
        }
    },

    created () {
        axios.get('https://api45gabs.azurewebsites.net/api/sample/news?apiKey=' + store.getters.appConfig.newsApiKey)
          .then(response => {
            this.articles = response.data.articles
          })
          .catch(e => {
            console.log(JSON.stringify(e))
          })
      },


    template: /*html*/ `

<v-container>

    <v-row align="center" class="mb-n6" v-for="(article, index) in articles" :key="article.title">
        <v-col sm="8" offset-sm="2">
            <v-card class="mx-auto" max-width="640">
                <v-img v-if="article.urlToImage" :src="article.urlToImage" class="white--text align-end text-right" :height="$vuetify.breakpoint.smAndUp ? '360px' : '200px'" >
                    <v-chip small color="secondary" class="white--text ma-1"> {{article.source.name}} </v-chip>
                </v-img>

                <v-card-title> {{ article.title }} </v-card-title>
                <v-card-subtitle class="mb-n5"> {{ article.description }} </v-card-subtitle>
                <v-card-actions>
                <v-btn color="orange lighten-2" text :href="article.url" target="_blank" > Read More </v-btn>
                <v-spacer></v-spacer>
                <v-btn icon v-if="article.content" @click="show(index)" > <v-icon>{{ article.source.id === 'active' ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon> </v-btn>
                </v-card-actions>

                <v-expand-transition>
                <div v-show="article.source.id === 'active'">
                    <v-divider></v-divider>
                    <v-card-text> {{ article.content }} </v-card-text>
                </div>
                </v-expand-transition>
            </v-card>
        </v-col>
    </v-row>

</v-container>

`,
  };