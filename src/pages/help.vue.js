import css from '../plugins/goober.js';

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

<v-container class=${styles}>
    <h1 class="header">
        {{ title }}
    </h1>
</v-container>

    `,
  };