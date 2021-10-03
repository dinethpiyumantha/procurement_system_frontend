import Vue from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import VueRouter from 'vue-router'


import Router from './routes/index.js';

import vueResource from 'vue-resource';
Vue.use(vueResource)

Vue.config.productionTip = false

Vue.use(Antd);
Vue.use(require('vue-moment'));
// Register Vue-Router
Vue.use(VueRouter)

new Vue({
  render: h => h(App),
  router: Router,
}).$mount('#app')