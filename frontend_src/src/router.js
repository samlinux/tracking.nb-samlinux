import Vue from 'vue';
import Router from 'vue-router';

const History = () => import('./components/history/History.vue');
const Store = () => import('./components/store/Store.vue');

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/history',
      name: 'history',
      component: History,
    },
    {
      path: '/store',
      name: 'store',
      component: Store,
    },
    {
      path: '*',
      name: '',
      component: History,
    },
  ],
  mode: 'history',
});
