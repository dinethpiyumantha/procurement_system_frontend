import Vue from 'vue';
import App from './App.vue';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import VueRouter from 'vue-router';

import Router from './routes/index.js';

Vue.config.productionTip = false;



Vue.use(Antd);
Vue.use(require('vue-moment'));
// Register Vue-Router
Vue.use(VueRouter); 

import vueResource from 'vue-resource';
Vue.use(vueResource)

import VueApexCharts from 'vue-apexcharts'
Vue.use(VueApexCharts)

Vue.component('apexchart', VueApexCharts)

new Vue({
  render: h => h(App),
  router: Router,
}).$mount('#app')


// "chart.js": "^3.5.1",
// "vue-chartjs": "^3.5.1",