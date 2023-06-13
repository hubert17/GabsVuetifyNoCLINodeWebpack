# GabsVuetifyNoCLINodeWebpack

**Vue SPA without CLI, Node, and Webpack**

This is a single-page application that utilizes Vue and Vue Router with a beautiful Material UI from Vuetify. It uses ES6 imports to render components and templates. No Node is required. Simply clone the repository and serve it statically.

You can also download this template to create a new single-page application that you can build upon. You can write code in any environment that has a static web server. There are virtually no local dependencies. It uses CDN-hosted libraries.

**Demo**: [https://hubert17.github.io/GabsVuetifyNoCLINodeWebpack](https://hubert17.github.io/GabsVuetifyNoCLINodeWebpack)

## Install these [VSCode Extensions](https://marketplace.visualstudio.com/vscode) for the best experience:

- [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
- [Template Literal Editor](https://marketplace.visualstudio.com/items?itemName=plievone.vscode-template-literal-editor)
- [Comment tagged templates](https://marketplace.visualstudio.com/items?itemName=bierner.comment-tagged-templates)
- [Trailing Spaces](https://marketplace.visualstudio.com/items?itemName=shardulm94.trailing-spaces)
- [Vue.js devtools](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd?hl=en)

## Why do I try to avoid using CLI, npm, Webpack, and other build processes?

- It reduces the learning curve required to start using Vue.js.
- JavaScript lacks a standard library, so a project with npm usually has a lot of dependencies, increasing the project's size and complexity. For more information, refer to this [article](https://hackernoon.com/whats-really-wrong-with-node-modules-and-why-this-is-your-fault-8ac9fa893823).
- However, if we don't use npm, we can still install additional libraries by downloading them from a CDN and importing them using HTML `<script>` tags. In this project, I used Material Design Webfont and Vuetify with this method. Importing each library separately with `<script>` tags can be slow and create many variables in the global scope, especially when there are numerous dependencies. Additionally, each dependency must be imported in the correct order (read Waterfall-loading below).
- Babel is useful for converting ES6 JavaScript into backward-compatible code, but in my case, it's unnecessary since the web browsers of my clients (most modern browsers) already support ES6.
- Webpack can potentially require extensive configuration and is not beginner-friendly. To learn more, visit [here](https://github.com/charlesfranciscodev/vuejs-playground) and [here](https://github.com/arswaw/VueSpaNONODE).

## What about Component-based CSS?

The problem is solved using [goober](https://github.com/cristianbote/goober), a CSS-in-JS solution that is less than 1KB in size.

## Waterfall-loading issue

One problem with using JavaScript Modules without a bundler is waterfall-loading. `Main.js` imports `app.js`, and `app.js` imports `BaseButton.js`. As a result, the browser needs to load the files in this order before it can mount our Vue application. However, we can speed up this process by using [modulepreload](https://developers.google.com/web/updates/2017/12/) links. The preload links instruct the browser to load all necessary files, preventing waterfall-loading. To learn more, read [here](https://markus.oberlehner.net/blog/goodbye-webpack-building-vue-applications-without-webpack/).

## Production Build with Vite

The aim of this project is to quickly develop a single-page app without any compilation or build steps. However, for production, I recommend using Vite, a build tool that aims to provide a faster and leaner development experience for modern web projects. It has a build command that bundles your code with Rollup, pre-configured to output highly optimized static assets for production. To reconfigure the project, follow these steps:

1. Create the `src` folder.
2. Move the following files to the `src` folder:

    - components
    - pages
    - plugins
    - app.vue.js
    - main.js
    - router.js
    - store.js

3. Update the script src in `index.html`. Add a preceding slash. You can now remove the `modulepreload` since they are no longer needed. Use the minified version of CDN packages by inserting `.min` before the file extension, for example, `vue.min.js`.

    ```html
    <script type="module" src="/src/main.js"></script>
    ```

4. Create the following files:

    **package.json**

    ```json
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
    ```

    **vite.config.js**

    ```javascript
    const { createVuePlugin } = require('vite-plugin-vue2');

    module.exports = {
        plugins: [createVuePlugin()],
        base: ''
    };
    ```

5. Run the following commands:

    ```
    npm install
    npm ci
    npm run build
    ```

    The building process will start, and the output will be in the `/dist` folder, which you can deploy on any static hosting site. That's it!

Please note that these changes do not affect our primary goal of developing a Vue SPA without CLI, Node, or Webpack. The app can still be served statically without a build process.

## GitHub Actions build support

Even without locally installing NPM, you can still create a production build by simply pushing your code to the master branch of the GitHub repository. GitHub Actions will take care of the build and deployment processes. Check out the YAML script [here](https://github.com/hubert17/GabsVuetifyNoCLINodeWebpack/blob/master/.github/workflows/publish.yml).

## Contributor

1. [Bernard Gabon](https://bernardgabon.com)
