import Vue from 'vue';
import VueMoment from 'vue-moment';
import App from './App.vue';
import router from './router';

import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.min.css';
import './AppTheme.scss';

import VueQrcodeReader from "vue-qrcode-reader";

Vue.config.productionTip = false;

Vue.use(VueMoment, {});
Vue.use(VueMaterial);

Vue.use(VueQrcodeReader);

import BarcodeScanner from "./components/barcode-scanner/BarcodeScanner.vue";
Vue.component("BarcodeScanner", BarcodeScanner);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
