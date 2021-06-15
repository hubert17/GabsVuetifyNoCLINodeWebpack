export default {
    name: 'Home',

    data() {
        return {
            title: 'Home page'
        };
    },

    template: /*html*/ `

<v-main>
    <v-container>
        <h1>
            {{ title }}
        </h1>
        <v-row>
            <v-col>
                <v-img src="https://www.atlasandboots.com/wp-content/uploads/2019/05/ama-dablam2-most-beautiful-mountains-in-the-world.jpg"></v-img>
            </v-col>
        </v-row>
    </v-container>
</v-main>

    `,
  };