export default {
    name: 'Settings',

    data() {
        return {
            title: 'Settings page'
        };
    },

    components: {
        BaseButton: () => import('../components/BaseButton.vue.js'),
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