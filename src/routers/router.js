import Vue from 'vue';
import Router from 'vue-router';
import { routerList } from './routerList';
Vue.use(Router);
export default new Router({
  mode: 'hash',
 //base: process.env.BASE_URL,
 base:window.location.pathname,
  routes: routerList
});
