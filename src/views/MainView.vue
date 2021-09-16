<template>
  <a-layout id="components-layout-demo-top-side-2">
    <a-layout-header class="header" style="background: #fff">
      <div class="logo" />
      <h2 style="text-transform: capitalize;">Abridge Inc.</h2>
      <a-menu
        theme="light"
        mode="horizontal"
        :default-selected-keys="['2']"
        :style="{ lineHeight: '64px' }"
      >
      </a-menu>
    </a-layout-header>
    <a-layout style="height: calc(100vh - 64px)">
      <a-layout-sider width="200" style="background: #001529">
        <a-menu theme="dark" :default-selected-keys="['1']" mode="inline">
        <a-menu-item key="1">
          <router-link to="/">
          <a-icon type="dashboard" />
          <span>Dashboard</span>
          </router-link>
        </a-menu-item>
          
        <a-menu-item key="2">
          <a-icon type="safety-certificate" />
          <span>Management Requsitions</span>
        </a-menu-item>
        <a-sub-menu key="sub1">
          <span slot="title"><a-icon type="shopping-cart" width="2em" height="2em" /><span>Order Details Receipt</span></span>
          <a-menu-item key="3">
            Add
          </a-menu-item>
          <a-menu-item key="4">
            Bill
          </a-menu-item>
          <a-menu-item key="5">
            Alex
          </a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub2">
          <span slot="title"><a-icon type="shopping-cart" width="2em" height="2em" /><span>Management Requsitions</span></span>
          <a-menu-item key="6">
            <router-link to="/requisitions/user">
              My Requsitions
            </router-link>
          </a-menu-item>
          <a-menu-item key="7">
            Bill
          </a-menu-item>
          <a-menu-item key="8">
            Alex
          </a-menu-item>
        </a-sub-menu>
      </a-menu>
      </a-layout-sider>
      <a-layout style="padding: 0 24px 24px; background: #eee">
        <a-breadcrumb style="padding: 10px">
          <a-breadcrumb-item v-for="(item, index) in items" :key="index">
            <router-link :to="item.path">
              {{item.name}}
            </router-link>
          </a-breadcrumb-item>
        </a-breadcrumb>
        <a-layout-content
          :style="{ padding: '10px', margin: 0, minHeight: '280px'}"
        >
          <router-view/>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script>
export default {
  data() {
    return {
      collapsed: false,
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
    }
  }
};
</script>

<style>
#components-layout-demo-top-side-2 .logo {
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 28px 16px 0;
  float: left;
  
}
</style>
