# GabsVuetifyNoCLINodeWebpack

**Vue SPA without CLI, Node and Webpack**
This is a single-page application that uses Vue and Vue Router with a beautiful Material UI from Vuetify. It uses ES6 imports to render components and templates. No Node is required. Just git clone and serve statically.

You can also select "Use this Template" in order to create a new single-page application that you can build upon. You can write code in any environment that has a static web-server. There are [virtually] no dependencies. It uses CDN-hosted libraries.
**Demo**: https://hubert17.github.io/GabsVuetifyNoCLINode

## Install these [VSCode Extensions](https://marketplace.visualstudio.com/vscode) for best experience:

- [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
- [Template Literal Editor](https://marketplace.visualstudio.com/items?itemName=plievone.vscode-template-literal-editor)
- [Comment tagged templates](https://marketplace.visualstudio.com/items?itemName=bierner.comment-tagged-templates)
- [Trailing Spaces](https://marketplace.visualstudio.com/items?itemName=shardulm94.trailing-spaces)

## Why I try to avoid using CLI, npm, webpack and other build process?

- It reduces the learning curve required to start using Vue.js.
- Because JavaScript lacks a standard library, a project with npm usually has a lot of dependencies. This increases the project's size and complexity. See this [article](https://hackernoon.com/whats-really-wrong-with-node-modules-and-why-this-is-your-fault-8ac9fa893823) for more info.
- But if we do not use npm, how do we install additional libraries? They can simply be downloaded from a CDN and imported using HTML `<script>` tags. For example, in this project I used Material Design Webfont and Vuetify with this method. This can be an issue if there is alot of dependencies as importing each library separetely with `<script>` tags is slow to load and creates a lot of variables in the global scope. Also, each dependency has to be imported in the correct order. Webpack might be needed in that case.
- Babel is useful for converting ES6 JavaScript into backwards compatible code. But, in my case this is not needed as the web browsers of my clients all support ES6 (lucky me).
- Webpack can potentially require a lot of configuration and is not beginner friendly.
- Read more [here](https://github.com/charlesfranciscodev/vuejs-playground) and [here](https://github.com/arswaw/VueSpaNONODE).

## How about the Component-based CSS?

[goober](https://github.com/cristianbote/goober), a less than 1KB css-in-js solution, solves the problem.

## Waterfall-loading issue

One problem with using JavaScript Modules without a bundler is waterfall-loading. Main.js imports app.js and app.js imports BaseButton.js. So the browser needs to load the files in this order before it can mount our little Vue application. But we can speed this up by using [modulepreload](https://developers.google.com/web/updates/2017/12/) links. The preload links tell the browser to load all necessary files, which prevents waterfall-loading. Read more [here](https://markus.oberlehner.net/blog/goodbye-webpack-building-vue-applications-without-webpack/).

## Contributor

1.  [Bernard Gabon](https://bernardgabon.com)
