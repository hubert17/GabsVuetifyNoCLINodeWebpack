
export default {
  name: 'BaseButton',

  data() {
    return {
      count: 0,
    };
  },

  template: /*html*/ `

    <div>
      Count: {{ count }}
      <v-btn color="primary" @click="count += 1">
        +1
      </v-btn>
    </div>

  `,
};