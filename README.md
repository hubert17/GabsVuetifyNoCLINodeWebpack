# GabsVuetifyNoCLINodeWebpack

**Vue SPA without CLI, Node and Webpack**

This is a single-page application that uses Vue and Vue Router with a beautiful Material UI from Vuetify. It uses ES6 imports to render components and templates. No Node is required. Just git clone and serve statically.

You can also download this template in order to create a new single-page application that you can build upon. You can write code in any environment that has a static web-server. There are [virtually] no local dependencies. It uses CDN-hosted libraries.

**Demo**: https://hubert17.github.io/GabsVuetifyNoCLINodeWebpack

## Install these [VSCode Extensions](https://marketplace.visualstudio.com/vscode) for best experience:

- [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
- [Template Literal Editor](https://marketplace.visualstudio.com/items?itemName=plievone.vscode-template-literal-editor)
- [Comment tagged templates](https://marketplace.visualstudio.com/items?itemName=bierner.comment-tagged-templates)
- [Trailing Spaces](https://marketplace.visualstudio.com/items?itemName=shardulm94.trailing-spaces)
- [Vue.js devtools](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd?hl=en)

## Why I try to avoid using CLI, npm, webpack and other build process?

- It reduces the learning curve required to start using Vue.js.
- Because JavaScript lacks a standard library, a project with npm usually has a lot of dependencies. This increases the project's size and complexity. See this [article](https://hackernoon.com/whats-really-wrong-with-node-modules-and-why-this-is-your-fault-8ac9fa893823) for more info.
- But if we do not use npm, how do we install additional libraries? They can simply be downloaded from a CDN and imported using HTML `<script>` tags. For example, in this project I used Material Design Webfont and Vuetify with this method. This can be an issue if there is alot of dependencies as importing each library separately with `<script>` tags is slow to load and creates a lot of variables in the global scope. Also, each dependency has to be imported in the correct order. (Read Waterfall-loading below)
- Babel is useful for converting ES6 JavaScript into backwards compatible code. But, in my case this is not needed as the web browsers of my clients (most modern browsers) all support ES6.
- Webpack can potentially require a lot of configuration and is not beginner friendly.
- Read more [here](https://github.com/charlesfranciscodev/vuejs-playground) and [here](https://github.com/arswaw/VueSpaNONODE).

## What about the Component-based CSS?

[goober](https://github.com/cristianbote/goober), a less than 1KB css-in-js solution, solves the problem.

## Waterfall-loading issue

One problem with using JavaScript Modules without a bundler is waterfall-loading. Main.js imports app.js and app.js imports BaseButton.js. So the browser needs to load the files in this order before it can mount our little Vue application. But we can speed this up by using [modulepreload](https://developers.google.com/web/updates/2017/12/) links. The preload links tell the browser to load all necessary files, which prevents waterfall-loading. Read more [here](https://markus.oberlehner.net/blog/goodbye-webpack-building-vue-applications-without-webpack/).

## Production Build with Vite

The aim of this project is to quickly develop single page app without any compilation or build step.
However, for production, I recommend to use Vite, a build tool that aims to provide a faster and leaner development experience for modern web projects. It has build command that bundles your code with Rollup, pre-configured to output highly optimized static assets for production. Reconfigure the project by following these steps:

1.  Create `src` folder.
2.  Move the following to `src` folder:

    >     components
    >     pages
    >     plugins
    >     app.vue.js
    >     main.js
    >     router.js
    >     store.js

3.  Update index.html script src. Notice the added preceding slash. You may now remove those `modulepreload` as you no longer need it. Use the minified version of CDN packages by simply inserting `.min` ex: `vue.min.js`.

        <script type="module" src="/src/main.js"></script>

4.  Create these files:

    > **package.json**

        {
            "version": "0.0.0",
            "scripts": {
        	    "dev": "vite",
        	    "build": "vite build",
        	    "serve": "vite preview"
            },
            "devDependencies": {
        	    "vite": "^2.3.7"
            }
        }

    > **vite.config.js**

        const { createVuePlugin } = require('vite-plugin-vue2');

        module.exports = {
        	plugins: [createVuePlugin()],
        	base:  ''
        };

5.  Run the following command:

    `npm install`

    `npm ci`

    `npm run build` will start the building process. Output is in `/dist` folder which you can deploy in any static hosting site. That's it!

Please note that these changes does not affect our primary goal of developing Vue spa without CLI, Node or Webpack. The app can still be served statically without a build process.

## GitHub Actions build support

Even without locally installing NPM, you can still create production build by simply pushing your code to the master branch of the Github repo. Github Actions will take care of the build and deployment processes. Check out the yml script [here](https://github.com/hubert17/GabsVuetifyNoCLINodeWebpack/blob/master/.github/workflows/publish.yml).

## Contributor

1.  [Bernard Gabon](https://bernardgabon.com)
