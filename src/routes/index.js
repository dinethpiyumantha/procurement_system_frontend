import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import Dashboad from '../views/dashboard/Dashboad.vue'
import RequisitionsScreen from '../views/requisition/RequisitionsScreen.vue'
import MyRequisitions from '../views/requisition/MyRequisitions.vue'

export default new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
        name: 'Dashboad',
        component: Dashboad
      },
      {
        path: '/requisitions',
        name: 'Requisitions',
        component: RequisitionsScreen,
        children: [
          {
            path: '/requisitions/user',
            name: 'My Requisitions',
            component: MyRequisitions
          }
        ]
      },
    ]
});