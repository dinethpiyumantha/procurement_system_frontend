<template>
  <div class="container">
    <h2>All Payments</h2>
    <a-input-search placeholder="input search text" style="margin: 20px 0px;" size="large" @search="onSearch" />
    <a-tabs default-active-key="1">
      <a-tab-pane key="1" tab="Pending">
        <Pending/>
      </a-tab-pane>
      <a-tab-pane key="2" tab="Completed">
        <Completed/>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import Pending from './Pending.vue'
import Completed from './Completed.vue'

export default {
  components: { Pending, Completed }
}
</script>

<style>
.container {
    background: #fff;
    padding: 20px;
}
</style>