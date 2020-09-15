import Vue from 'vue';
import Router from 'vue-router';

const History = () => import('./components/history/History.vue');

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/app2/history',
      name: 'history',
      component: History,
    },
    {
      path: '*',
      name: '',
      component: History,
    },
  ],
  mode: 'history',
});
