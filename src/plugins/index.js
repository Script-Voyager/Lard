/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import vuetify from './vuetify'
import pinia from '@/stores'
import router from '@/router'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

export function registerPlugins (app) {
  app
    .component('VueDatePicker', VueDatePicker)
    .use(vuetify)
    .use(router)
    .use(pinia)
}
