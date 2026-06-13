import store from '../store.js'
import css from '../plugins/goober.js';

const styles = css /*css*/ `
  .info-panel-card {
    border-radius: 16px;
    padding: 20px 24px;
    margin: 16px;
    transition: all 0.3s ease;
    border: 1px solid rgba(255, 255, 255, 0.15);
  }

  .theme--light.info-panel-card {
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.06);
    color: #2c3e50;
    border-color: rgba(255, 255, 255, 0.5);
  }

  .theme--dark.info-panel-card {
    background: rgba(30, 30, 30, 0.7);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.25);
    border-color: rgba(255, 255, 255, 0.08);
    color: #e0e0e0;
  }

  .info-header {
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    font-weight: 700;
    color: #e65100; /* Deep orange accent */
  }

  .theme--dark .info-header {
    color: #ffb74d; /* Bright orange for dark mode contrast */
  }

  .info-text {
    font-weight: 300;
    line-height: 1.4;
  }

  .status-chip {
    display: inline-block;
    padding: 4px 12px;
    font-size: 0.75rem;
    font-weight: 600;
    border-radius: 20px;
    background: rgba(230, 81, 0, 0.1);
    color: #e65100;
    border: 1px solid rgba(230, 81, 0, 0.2);
  }

  .theme--dark .status-chip {
    background: rgba(255, 183, 77, 0.15);
    color: #ffb74d;
    border-color: rgba(255, 183, 77, 0.25);
  }
`;

export default {
  name: 'SideInfoPanel',
  props: ["TitleHeader", "TitleText", "DetailHeader", "DetailText", "StatusHeader", "StatusText", "OtherHeader", "OtherText"],

  template: /*html*/ `
      <v-container fluid class="hidden-sm-and-down pa-0 ${styles}">
        <div :class="['info-panel-card', $vuetify.theme.dark ? 'theme--dark' : 'theme--light']">
          <div v-if="TitleHeader" class="mb-3">
            <p class="info-header pb-0 my-0">{{ TitleHeader }}</p>
            <p class="info-text title mb-0">{{ TitleText }}</p>
          </div>
          
          <div v-if="DetailHeader" class="mb-3">
            <p class="info-header py-0 my-0">{{ DetailHeader }}</p>
            <p class="info-text subtitle-1 mb-0">{{ DetailText }}</p>
          </div>
          
          <div v-if="StatusHeader" class="mb-3">
            <p class="info-header py-0 my-0">{{ StatusHeader }}</p>
            <div class="mt-1">
              <span class="status-chip">{{ StatusText }}</span>
            </div>
          </div>
          
          <div v-if="OtherHeader" class="mb-0">
            <p class="info-header pb-0 my-0">{{ OtherHeader }}</p>
            <p class="info-text body-2 mb-0">{{ OtherText }}</p>
          </div>
        </div>
      </v-container>
    `,
};