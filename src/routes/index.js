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

import ManageRequisitionsScreen from '../views/Staff/ManageRequisitions/ManageRequisitionsScreen'
import NewRequisitions from '../views/Staff/ManageRequisitions/NewRequisitions'
import Approved from '../views/Staff/ManageRequisitions/Approved'
import Rejected from '../views/Staff/ManageRequisitions/Rejected'

import ViewOrdersScreen from '../views/Staff/Orders/OrdersScreen'
import CreatedOrders from '../views/Staff/Orders/CreatedOrderList'
import createNewOrder from '../views/Staff/Orders/AddNewOrder'

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
        path: '/manage_requisitions',
        name: 'Manage Requisitions',
        component: ManageRequisitionsScreen,
        children: [
          {
            path: '/manage_requisitions/new',
            name: 'New Requisitions (Pending Approval)',
            component: NewRequisitions
          },
          {
            path: '/manage_requisitions/approved', 
            name: 'Approved',
            component: Approved
          },
          {
            path: '/manage_requisitions/rejected', 
            name: 'Rejected',
            component: Rejected
          },
        ]
      },
      {
        path: '/approved_orders',
        name: 'All Oders',
        component: ViewOrdersScreen,
        children: [
          {
            path: '/approved_orders/list',
            name: 'Approved Oders' ,
            component: CreatedOrders
          },
          {
            path: '/create_order/:id',
            name: 'Create New Order',
            component: createNewOrder
          }
        ]
      },
    ]
});