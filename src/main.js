import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router/router';
import store from './data/vuex';
import VueLoading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import Dayjs from 'vue-dayjs';
import moment from 'moment';
import VueTheMask from 'vue-the-mask'
import VueQRCodeComponent from 'vue-qrcode-component'
import VueSignaturePad from 'vue-signature-pad';

import 'zingchart/es6';
import 'zingchart/es6';
import zingchartVue from 'zingchart-vue';

import { TiptapVuetifyPlugin } from 'tiptap-vuetify'
import 'tiptap-vuetify/dist/main.css'
// import 'vuetify/dist/vuetify.min.css'

Vue.use(TiptapVuetifyPlugin, {
  // the next line is important! You need to provide the Vuetify Object to this place.
  vuetify, // same as "vuetify: vuetify"
  // optional, default to 'md' (default vuetify icons before v2.0.0)
  iconsGroup: 'mdi'
})
Vue.component('zingchart', zingchartVue)
Vue.use(VueSignaturePad);
Vue.component('qr-code', VueQRCodeComponent)

// import GAuth from 'vue-google-oauth2'
// const gauthOption = {
//   clientId: '605937123582-e55km36m224h3rqrgs65bmqalrkn1in9.apps.googleusercontent.com',
//   scope: 'profile email',
//   prompt: 'consent',
//   fetch_basic_profile: true
// }
// const gauthOption = {
//   clientId: '605937123582-2v86p1vpacnn4hc3mmcdbo5l4nl7jv6e.apps.googleusercontent.com',
//   scope: 'profile email',
//   prompt: 'consent',
//   fetch_basic_profile: true
// }

// Vue.use(GAuth, gauthOption)

Vue.prototype.moment = moment
Vue.use(VueTheMask)

Vue.config.productionTip = false;
Vue.use(VueLoading);
Vue.use(Dayjs);
Vue.use(require('vue-moment'))

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
