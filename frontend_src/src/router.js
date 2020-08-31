import Vue from 'vue';
import Router from 'vue-router';

const Home = () => import('./views/Home.vue');
const Store = () => import('./views/Store.vue');

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/history',
      name: 'history',
      component: Home,
    },
    {
      path: '/store',
      name: 'store',
      component: Store,
    },
    {
      path: '*',
      name: '',
      component: Home,
    },
  ],
  mode: 'history',
});
