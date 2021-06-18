import { css } from 'https://cdn.jsdelivr.net/npm/goober@2.0.33/dist/goober.modern.js';

const styles = css /*css*/ `

background-color: lightgrey;
.header {
    background: dodgerblue;
    color: white;
    padding: 1em;
}

`

export default {
    name: 'Help',

    data() {
        return {
            title: 'Help page'
        };
    },

    template: /*html*/ `

<v-main class=${styles}>
    <v-container>
        <h1 class="header">
            {{ title }}
        </h1>
    </v-container>
</v-main>

    `,
  };