import { css } from 'https://cdn.jsdelivr.net/npm/goober@2.0.33/dist/goober.modern.js';

const styles = css /*css*/ `
    .bgcolor {
        background-color: #fff!important;
        border-color: #fff!important;
    }

`

export default {
    name: 'SideInfoPanel',
    props: ["TitleHeader","TitleText", "DetailHeader", "DetailText" , "StatusHeader" , "StatusText", "OtherHeader", "OtherText"],
    data() {
      return {

      };
    },

    template: /*html*/ `

<v-container fluid class="hidden-sm-and-down">
      <v-row class=${styles} >
        <v-col cols="12">
          <v-row class="ml-5" align="end" justify="end" style="height: calc(100vh - 450px);overflow-y: hidden;" >
            <!-- outlined tile -->
            <div class="bgcolor ml-1 pa-0">
              <v-col cols="12" class="blue-grey lighten-1 pr-0 mr-0" style="height:20px;border-radius: 0px 0px 20px 0px;"> </v-col>
              <v-col cols="12" class="blue-grey lighten-1 pa-0 ma-0" style="border-radius: 0px 0px 0px 0px;">
                <v-row class="pa-0 ma-0">
                  <v-col cols="12" class="bgcolor pa-0 ma-0" style="height: 20px; border-radius: 20px 0px 0px 0px;"> </v-col>
                </v-row>
              </v-col>
              <div class="pl-5 mr-8" style="min-width: 100px;">
                <p v-if="TitleHeader" class="amber--text text--darken-4 font-weight-light pb-0 my-0">{{TitleHeader}}</p>
                <p v-if="TitleHeader" class="title mb-2">{{TitleText}}</p>
                <p v-if="DetailHeader" class="amber--text text--darken-4 font-weight-light py-0 my-0">{{DetailHeader}}</p>
                <p v-if="DetailHeader" class="title mb-2">{{DetailText}}</p>
                <p v-if="StatusHeader" class="amber--text text--darken-4 font-weight-light py-0 my-0">{{StatusHeader}}</p>
                <p v-if="StatusHeader" class="mb-3" style="font-size:medium;font-weight: bold;letter-spacing:1px">
                  <span style="padding-left:3px; padding-right: 3px;display:inline;-moz-box-decoration-break:clone;
                      -webkit-box-decoration-break:clone;box-decoration-break:clone;">{{StatusText}}
                  </span>
                </p>
                <p v-if="OtherHeader" class="amber--text text--darken-4 font-weight-light pb-0 my-0">{{OtherHeader}}</p>
                <p v-if="OtherHeader" class="font-weight-light mb-2">{{OtherText}}</p>
              </div>
              <v-col cols="12" class="blue-grey lighten-1 pr-0 mr-0" style="height:20px;border-radius: 0px 20px 0px 0px;"> </v-col>
            </div>
          </v-row>
        </v-col>
      </v-row>
    </v-container>

    `,
  };