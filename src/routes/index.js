import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import Dashboad from '../views/dashboard/Dashboad.vue'
import RequisitionsScreen from '../views/requisition/RequisitionsScreen.vue'
import MyRequisitions from '../views/requisition/MyRequisitions.vue'
import RequisitionManage from '../views/requisition/RequisitionManage.vue'

import OrdersScreen from '../views/order/OrdersScreen.vue'
import AddOrder from '../views/order/AddOrder.vue'
import ProductsScreen from '../views/order/ProductScreen.vue'

import PaymentScreen from '../views/payment/PaymentScreen.vue'
import IncomeExpense from '../views/payment/IncomeExpenseManage.vue'
import PaymentManage from '../views/payment/PaymentManage.vue'

import SupplierScreen from '../views/supplier/SupplierScreen.vue'
import AllSuppliers from '../views/supplier/AllSuppliers.vue'
import MyOrders from '../views/supplier/MyOrders.vue'
import Register from '../views/supplier/Register.vue'


// Test
import Charty from '../components/Charts/ApprovedOrders.vue'

export default new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
        name: 'Dashboad',
        component: Dashboad
      },
      {
        path: '/payments',
        name: 'Payments',
        component: PaymentScreen,
        children: [
          {
            path: '/payments/income-expenses',
            name: 'Income and Expenses',
            component: IncomeExpense
          },
          {
            path: '/payments/all',
            name: 'All',
            component: PaymentManage
          },
        ]
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
          },
          {
            path: '/requisitions/manage',
            name: 'Manage',
            component: RequisitionManage
          },
        ]
      },
      {
        path: '/orders',
        name: 'Orders',
        component: OrdersScreen,
        children: [
          {
            path: '/orders/add',
            name: 'Add',
            component: AddOrder
          },
          {
            path: '/orders/products',
            name: 'Products',
            component: ProductsScreen
          },
        ]
      },
      {
        path: '/supplier',
        name: 'Supplier',
        component: SupplierScreen,
        children: [
          {
            path: '/supplier/all',
            name: 'All',
            component: AllSuppliers
          },
          {
            path: '/orders/:id',
            name: 'My Orders',
            component: MyOrders
          },
          {
            path: '/supplier/register',
            name: 'Register',
            component: Register
          },
        ]
      },
      {
        path: '/chart',
        component: Charty,
        name: 'test'
      }
    ]
});