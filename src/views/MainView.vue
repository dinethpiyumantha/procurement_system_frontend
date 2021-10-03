<template>
  <a-layout id="components-layout-demo-top-side-2">
    <a-layout-header class="header" style="background: #fff;">
        <img src="../assets/logo.svg" alt="logo" class="logo"/>
      <a-row>
        <a-col :span="14">
          <h2 style="text-transform: capitalize; width: 300px">Abridge Incorporated</h2>
        </a-col>
        <a-col :span="4" style="text-align: right">

          <div style="width: 400px">
            <a-button type="outline" size="small" style="margin-right: 10px">@username</a-button>
            <a-avatar size="large" icon="user" />
          </div>
        </a-col>
      </a-row>

    </a-layout-header>
    <a-layout style="height: calc(100vh - 64px)">
      <a-layout-sider width="200" style="background: #001529" v-model="collapsed" collapsible>
        <a-menu theme="dark" :default-selected-keys="['0']" mode="inline">
          <a-menu-item key="0">
            <router-link to="/">
            <a-icon type="dashboard" />
            <span>Dashboard</span>
            </router-link>
          </a-menu-item>
          <a-sub-menu key="sub0">
            <span slot="title"><a-icon type="dollar" width="2em" height="2em" /><span>Payments Management</span></span>
            <a-menu-item key="1">
              <router-link to="/payments/all">
                All Payments
              </router-link>
            </a-menu-item>
            <a-menu-item key="2">
              <router-link to="/payments/income-expenses">
                Income & Expenses
              </router-link>
            </a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub1">
            <span slot="title"><a-icon type="shopping-cart" width="2em" height="2em" /><span>Order Management</span></span>
            <a-menu-item key="3">
              <router-link to="/orders/add">
                Add Order
              </router-link>
            </a-menu-item>
            <a-menu-item key="4">
              <router-link to="/orders/products">
                Products
              </router-link>
            </a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub2">
            <span slot="title"><a-icon type="safety-certificate" /><span>Requsitions Management</span></span>
            <a-menu-item key="6">
              <router-link to="/requisitions/user">
                My Requsitions
              </router-link>
            </a-menu-item>
            <a-menu-item key="7">
              <router-link to="/requisitions/manage">
                Manage Requsitions
              </router-link>
            </a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="supplier">
            <span slot="title"><a-icon type="dollar" width="2em" height="2em" /><span>Payments Management</span></span>
            <a-menu-item key="supplier-register">
              <router-link to="/supplier/register">
                Register
              </router-link>
            </a-menu-item>
            <a-menu-item key="all-suppliers">
              <router-link to="/supplier/all">
                All Suppliers
              </router-link>
            </a-menu-item>
            <a-menu-item key="my-orders">
              <router-link to="/orders/1">
                My Orders
              </router-link>
            </a-menu-item>
          </a-sub-menu>
          <a-menu-item style="position: absolute; bottom: 50px"><a-icon type="bulb" /><span>Support</span></a-menu-item>
        </a-menu>
      </a-layout-sider>
      <a-layout style="padding: 10px 24px 0px 24px; background: #eee;">
        <a-breadcrumb style="padding: 10px">
          <a-breadcrumb-item v-for="(item, index) in items" :key="index">
            <router-link :to="item.path">
              {{item.name}}
            </router-link>
          </a-breadcrumb-item>
        </a-breadcrumb>
        <div>

        </div>
        <div style="padding: 10px;">
          <router-view/>
        </div>
        <a-layout-footer style="background: #000; margin: 0px -24px 0px -24px; color: #fff">Copyright Ⓒ 2021 Team DevAlgo - All Rights Reserved</a-layout-footer>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script>
export default {
  data() {
    return {
      collapsed: true,
      visible: false,
      items: []
    };
  },
  watch: {
    $route() {
      this.getRoute();
    }
  },
  methods: {
    getRoute() {
      this.items = this.$route.matched;
      console.log(this.$route);
    },
    hide() {
      console.log(111);
      this.visible = false;
    },
  },
};
</script>

<style>
.logo {
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 28px 16px 0;
  float: left;
}
</style>
