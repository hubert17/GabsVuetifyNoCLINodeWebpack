import store from '../store.js';
import css from '../plugins/goober.js';

const styles = css /*css*/ `
  .gradient-text {
    background: linear-gradient(45deg, #e65100, #ffb74d);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .news-card {
    border-radius: 16px!important;
    overflow: hidden;
    transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.3s ease-in-out!important;
    height: 100%;
  }

  .news-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 24px rgba(0,0,0,0.15)!important;
  }

  .image-wrapper {
    overflow: hidden;
    position: relative;
  }

  .article-img {
    transition: transform 0.5s ease!important;
  }

  .news-card:hover .article-img {
    transform: scale(1.05);
  }

  .image-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to top, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0) 100%);
    pointer-events: none;
  }

  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    min-height: 48px;
  }

  .line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    min-height: 60px;
  }

  .theme--light.news-card {
    background: rgba(255, 255, 255, 0.9);
  }

  .theme--dark.news-card {
    background: rgba(30, 30, 30, 0.85);
    border: 1px solid rgba(255, 255, 255, 0.08);
  }

  .theme--light .expanded-content {
    background-color: #f7f9fa!important;
  }

  .theme--dark .expanded-content {
    background-color: #262626!important;
    color: #b0bec5;
  }
`;

export default {
    name: 'News',

    data() {
        return {
            title: 'News',
            articles: [],
            loading: false,
            searchQuery: '',
            activeIndex: null
        };
    },

    computed: {
        filteredArticles() {
            if (!this.searchQuery) return this.articles;
            const query = this.searchQuery.toLowerCase();
            return this.articles.filter(article => {
                const titleMatch = article.title && article.title.toLowerCase().includes(query);
                const summaryMatch = article.summary && article.summary.toLowerCase().includes(query);
                const sourceMatch = article.news_site && article.news_site.toLowerCase().includes(query);
                return titleMatch || summaryMatch || sourceMatch;
            });
        }
    },

    methods: {
        fetchNews() {
            this.loading = true;
            axios.get('https://api.spaceflightnewsapi.net/v4/articles/?limit=12')
                .then(response => {
                    this.articles = response.data.results || [];
                })
                .catch(e => {
                    console.error("Failed to fetch news:", e);
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        toggleActive(index) {
            this.activeIndex = this.activeIndex === index ? null : index;
        },
        formatDate(dateStr) {
            if (!dateStr) return '';
            const date = new Date(dateStr);
            return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
        }
    },

    created() {
        this.fetchNews();
    },

    template: /*html*/ `
      <v-container class="news-page py-6 ${styles}">
        <!-- Header Banner -->
        <v-row class="mb-6 align-center">
          <v-col cols="12" md="7">
            <h1 class="text-h3 font-weight-bold gradient-text mb-1">Cosmic News</h1>
            <p class="subtitle-1 text--secondary">Stay updated with the latest in space exploration and technologies.</p>
          </v-col>
          <v-col cols="12" md="5">
            <v-text-field
              v-model="searchQuery"
              prepend-inner-icon="search"
              label="Search articles..."
              outlined
              rounded
              hide-details
              clearable
              :color="$vuetify.theme.dark ? 'amber lighten-3' : 'orange darken-3'"
            ></v-text-field>
          </v-col>
        </v-row>

        <!-- Loading Skeletons -->
        <v-row v-if="loading">
          <v-col v-for="n in 6" :key="n" cols="12" sm="6" md="4">
            <v-skeleton-loader
              type="card, list-item-two-line"
              class="mx-auto"
              style="border-radius: 16px;"
            ></v-skeleton-loader>
          </v-col>
        </v-row>

        <!-- No Data View -->
        <v-row v-else-if="filteredArticles.length === 0" justify="center" align="center" style="min-height: 300px;">
          <v-col cols="12" class="text-center">
            <v-icon size="64" color="grey">mdi-alert-circle-outline</v-icon>
            <h3 class="text-h6 grey--text mt-3">No articles match your search</h3>
            <p class="grey--text">Check spelling or try a different search keyword.</p>
            <v-btn outlined color="orange darken-3" class="mt-2 text-none" @click="searchQuery = ''; fetchNews()">Refresh Feed</v-btn>
          </v-col>
        </v-row>

        <!-- Cards Grid -->
        <v-row v-else>
          <v-col 
            v-for="(article, index) in filteredArticles" 
            :key="article.id" 
            cols="12" 
            sm="6" 
            md="4"
          >
            <v-card 
              :class="['news-card d-flex flex-column', $vuetify.theme.dark ? 'theme--dark' : 'theme--light']"
              elevation="2"
            >
              <!-- Card Image with Source Badge -->
              <div class="image-wrapper">
                <v-img 
                  v-if="article.image_url" 
                  :src="article.image_url" 
                  class="white--text align-end article-img" 
                  height="200"
                >
                  <template v-slot:placeholder>
                    <v-row class="fill-height ma-0" align="center" justify="center">
                      <v-progress-circular indeterminate color="orange lighten-2"></v-progress-circular>
                    </v-row>
                  </template>
                  <div class="image-overlay"></div>
                  <v-chip 
                    small 
                    color="orange darken-4" 
                    class="white--text ma-3 position-absolute"
                    style="top: 0; left: 0;"
                  > 
                    {{ article.news_site }} 
                  </v-chip>
                </v-img>
              </div>

              <!-- Card Content -->
              <v-card-text class="flex-grow-1 pt-4">
                <div class="caption grey--text mb-2 d-flex justify-space-between align-center">
                  <span>{{ formatDate(article.published_at) }}</span>
                  <span v-if="article.authors && article.authors.length > 0" class="text-truncate" style="max-width: 150px;">
                    By {{ article.authors[0].name }}
                  </span>
                </div>
                <h2 class="title font-weight-bold line-clamp-2 mb-2">{{ article.title }}</h2>
                <p class="body-2 text--secondary line-clamp-3 mb-0">{{ article.summary }}</p>
              </v-card-text>

              <v-divider></v-divider>

              <!-- Card Actions -->
              <v-card-actions class="px-4 py-2">
                <v-btn 
                  text 
                  :color="$vuetify.theme.dark ? 'amber lighten-2' : 'orange darken-4'"
                  :href="article.url" 
                  target="_blank"
                  class="text-none font-weight-bold"
                >
                  Read Source
                  <v-icon small class="ml-1">mdi-open-in-new</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn 
                  icon 
                  @click="toggleActive(index)"
                  v-if="article.summary"
                >
                  <v-icon>{{ activeIndex === index ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                </v-btn>
              </v-card-actions>

              <!-- Summary Drawer -->
              <v-expand-transition>
                <div v-show="activeIndex === index">
                  <v-divider></v-divider>
                  <v-card-text class="expanded-content py-3">
                    <p class="caption font-weight-bold mb-1 orange--text">Article Summary:</p>
                    <p class="body-2 mb-0">{{ article.summary }}</p>
                  </v-card-text>
                </div>
              </v-expand-transition>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    `,
};