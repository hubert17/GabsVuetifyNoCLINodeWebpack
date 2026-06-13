import css from '../plugins/goober.js';

const styles = css /*css*/ `
  .gradient-text {
    background: linear-gradient(45deg, #e65100, #ffb74d);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .help-container {
    max-width: 800px;
  }

  .toc-card {
    border-radius: 12px!important;
    background: rgba(255, 255, 255, 0.45)!important;
    border: 1px solid rgba(0, 0, 0, 0.12)!important;
  }

  .theme--dark .toc-card {
    background: rgba(30, 30, 30, 0.5)!important;
    border-color: rgba(255, 255, 255, 0.08)!important;
  }

  .toc-link {
    color: #e65100!important;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.2s;
  }

  .toc-link:hover {
    color: #ffb74d!important;
    text-decoration: underline;
  }

  .theme--dark .toc-link {
    color: #ffb74d!important;
  }

  .theme--dark .toc-link:hover {
    color: #ffd54f!important;
  }

  .ext-link {
    color: #e65100!important;
    text-decoration: none;
    transition: color 0.2s;
  }

  .ext-link:hover {
    color: #ffb74d!important;
    text-decoration: underline;
  }

  .theme--dark .ext-link {
    color: #ffb74d!important;
  }

  .theme--dark .ext-link:hover {
    color: #ffd54f!important;
  }

  .section-title {
    border-bottom: 2px solid rgba(230, 81, 0, 0.15);
    padding-bottom: 8px;
  }

  code {
    background-color: rgba(0, 0, 0, 0.05);
    padding: 2px 6px;
    border-radius: 4px;
    font-family: monospace;
    font-size: 0.9em;
  }

  .theme--dark code {
    background-color: rgba(255, 255, 255, 0.1);
    color: #ffb74d;
  }

  pre {
    border-left: 4px solid #e65100;
    overflow-x: auto;
  }

  .lighten-4-bg {
    background-color: #f7f9fa !important;
  }

  .theme--dark .lighten-4-bg {
    background-color: #262626 !important;
  }

  ul {
    padding-left: 20px;
  }
`;

export default {
    name: 'Help',

    data() {
        return {
            title: 'Documentation & Help'
        };
    },

    methods: {
        scrollTo(selector) {
            this.$vuetify.goTo(selector, {
                duration: 500,
                offset: 20,
                easing: 'easeInOutCubic',
                container: '.v-main' // main scrolling wrapper
            });
        }
    },

    template: /*html*/ `
      <v-container class="help-page py-8 help-container ${styles}">
        <!-- Header Banner -->
        <div class="mb-6">
          <h1 class="text-h3 font-weight-bold gradient-text mb-1">{{ title }}</h1>
          <p class="subtitle-1 text--secondary">A developer's guide to the zero-build GabsVue SPA architecture.</p>
        </div>

        <!-- Table of Contents -->
        <v-card outlined class="toc-card mb-8 pa-5">
          <div class="text-h6 font-weight-bold mb-3 orange--text text--darken-3">Table of Contents</div>
          <v-row>
            <v-col cols="12" sm="6" class="py-1">
              <a @click.prevent="scrollTo('#about')" class="toc-link">1. About the SPA Architecture</a>
            </v-col>
            <v-col cols="12" sm="6" class="py-1">
              <a @click.prevent="scrollTo('#extensions')" class="toc-link">2. Recommended Extensions & Tooling</a>
            </v-col>
            <v-col cols="12" sm="6" class="py-1">
              <a @click.prevent="scrollTo('#no-cli')" class="toc-link">3. Why Avoid Build Tools?</a>
            </v-col>
            <v-col cols="12" sm="6" class="py-1">
              <a @click.prevent="scrollTo('#css-in-js')" class="toc-link">4. Component-Based CSS (Goober)</a>
            </v-col>
            <v-col cols="12" sm="6" class="py-1">
              <a @click.prevent="scrollTo('#preload')" class="toc-link">5. Waterfall Loading & Preloads</a>
            </v-col>
            <v-col cols="12" sm="6" class="py-1">
              <a @click.prevent="scrollTo('#vite-build')" class="toc-link">6. Production Builds with Vite</a>
            </v-col>
          </v-row>
        </v-card>

        <v-divider class="mb-8"></v-divider>

        <!-- Documentation Content -->
        <div class="doc-sections">
          
          <!-- About -->
          <section id="about" class="doc-section mb-10">
            <h2 class="text-h5 font-weight-bold section-title mb-4">
              <v-icon class="mr-2" color="orange darken-3">mdi-information-outline</v-icon>
              About the SPA Architecture
            </h2>
            <div class="pl-8 text--secondary">
              <p>This single-page application is built on <strong>Vue 2</strong> and <strong>Vuetify 2</strong>. It utilizes native ES6 JavaScript modules to load and run components dynamically directly in the web browser.</p>
              <p>You can develop by simply running a local static web server (such as the VSCode Live Server extension). No local compiler, Node.js installations, or Webpack configurations are required. All core libraries are fetched efficiently from global CDN networks.</p>
            </div>
          </section>

          <!-- Recommended Extensions & Tooling -->
          <section id="extensions" class="doc-section mb-10">
            <h2 class="text-h5 font-weight-bold section-title mb-4">
              <v-icon class="mr-2" color="orange darken-3">mdi-application-cog-outline</v-icon>
              Recommended Extensions & Tooling
            </h2>
            <div class="pl-8 text--secondary">
              <p>For the best development experience with raw files, we recommend installing these VS Code extensions and developer utilities:</p>
              <ul>
                <li class="mb-2"><a href="https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer" target="_blank" class="ext-link font-weight-bold">Live Server</a>: Launches a local development server with live reload capability for static files.</li>
                <li class="mb-2"><a href="https://marketplace.visualstudio.com/items?itemName=plievone.vscode-template-literal-editor" target="_blank" class="ext-link font-weight-bold">Template Literal Editor</a>: Enables syntax highlighting and editing helper utilities inside template literal backticks.</li>
                <li class="mb-2"><a href="https://marketplace.visualstudio.com/items?itemName=bierner.comment-tagged-templates" target="_blank" class="ext-link font-weight-bold">Comment Tagged Templates</a>: Provides rich syntax highlighting for HTML template strings tagged with comments (like <code>/*html*/</code>).</li>
                <li class="mb-2"><a href="https://marketplace.visualstudio.com/items?itemName=shardulm94.trailing-spaces" target="_blank" class="ext-link font-weight-bold">Trailing Spaces</a>: Highlights and quickly cleans up trailing spaces in code files.</li>
                <li class="mb-2"><a href="https://chromewebstore.google.com/detail/vuejs-devtools/iaajmlceplecbljialhhkmedjlpdblhp?hl=en" target="_blank" class="ext-link font-weight-bold">Vue.js Devtools (Legacy)</a>: A browser extension for debugging components and states inside the developer tools console.</li>
              </ul>
            </div>
          </section>

          <!-- Why No CLI -->
          <section id="no-cli" class="doc-section mb-10">
            <h2 class="text-h5 font-weight-bold section-title mb-4">
              <v-icon class="mr-2" color="orange darken-3">mdi-cube-off-outline</v-icon>
              Why Avoid Build Tools?
            </h2>
            <div class="pl-8 text--secondary">
              <p>Modern frontend development often requires complex compilation pipelines. GabsVue aims to bypass this complexity during development for several reasons:</p>
              <ul>
                <li class="mb-2"><strong>Zero Development Overhead:</strong> Focus on writing standard code immediately without spending time configuring build scripts or transpilation rules.</li>
                <li class="mb-2"><strong>No node_modules Bloat:</strong> Avoid downloading hundreds of megabytes of nested packages, which can introduce dependency conflicts and security concerns.</li>
                <li class="mb-2"><strong>Native ES6 Imports:</strong> Modern web browsers natively support JavaScript ES6 module imports, rendering transpilers (like Babel) redundant for standard browsers.</li>
              </ul>
            </div>
          </section>

          <!-- CSS-in-JS -->
          <section id="css-in-js" class="doc-section mb-10">
            <h2 class="text-h5 font-weight-bold section-title mb-4">
              <v-icon class="mr-2" color="orange darken-3">mdi-palette-outline</v-icon>
              Component-based CSS (Goober)
            </h2>
            <div class="pl-8 text--secondary">
              <p>To implement scoped styles inside modular JS components without a packager, GabsVue uses <strong>Goober</strong>—a lightweight CSS-in-JS solution of less than 1KB.</p>
              <p>Goober compiles CSS rules on-the-fly and generates unique scoped class selectors, preventing global styling pollution and component overrides.</p>
            </div>
          </section>

          <!-- Waterfall Preloads -->
          <section id="preload" class="doc-section mb-10">
            <h2 class="text-h5 font-weight-bold section-title mb-4">
              <v-icon class="mr-2" color="orange darken-3">mdi-lightning-bolt-outline</v-icon>
              Waterfall Loading & Preloads
            </h2>
            <div class="pl-8 text--secondary">
              <p>One challenge with unbundled modules is sequential loading. When <code>main.js</code> imports <code>app.js</code>, and <code>app.js</code> imports another sub-component, the browser is forced to download them in a strict sequence.</p>
              <p>To eliminate this latency, GabsVue specifies <code>&lt;link rel="modulepreload"&gt;</code> tags in the <code>index.html</code> header. Preloading instructs the browser to download and cache core scripts in parallel immediately on page startup.</p>
            </div>
          </section>

          <!-- Production Build -->
          <section id="vite-build" class="doc-section mb-10">
            <h2 class="text-h5 font-weight-bold section-title mb-4">
              <v-icon class="mr-2" color="orange darken-3">mdi-rocket-launch-outline</v-icon>
              Production Builds with Vite
            </h2>
            <div class="pl-8 text--secondary">
              <p>While direct static serving is optimized for development speed, a minified bundle is recommended for production deploy. The workspace includes configurations for <strong>Vite</strong> and <strong>Rollup</strong>.</p>
              <p>To build optimized assets locally when ready to launch:</p>
              <pre class="pa-4 rounded lighten-4-bg mb-3 text-caption"><code>npm install
 npm run build</code></pre>
              <p>This compiles highly optimized files into the <code>/dist</code> directory, which you can host on static servers (such as GitHub Pages, Netlify, or Vercel).</p>
            </div>
          </section>

        </div>
      </v-container>
    `,
};