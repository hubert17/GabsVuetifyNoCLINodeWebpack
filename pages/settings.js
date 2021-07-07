import BaseButton from '../components/BaseButton.js'

export default {
    name: 'Settings',

    data() {
        return {
            title: 'Settings page'
        };
    },

    components: {
        BaseButton
    },

    template: /*html*/ `

<v-container>
    <h1>
        {{ title }}
    </h1>
    <v-row>
        <v-col>
            <BaseButton />
        </v-col>
    </v-row>
</v-container>

    `,
  };