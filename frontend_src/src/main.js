import Vue from 'vue'
import VueMoment from 'vue-moment';
import App from './App.vue'
import router from './router';

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import './appTheme.scss'

Vue.config.productionTip = false

Vue.use(VueMoment, {});
Vue.use(VueMaterial)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
