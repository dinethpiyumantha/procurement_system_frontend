<template>
  <div class="container">
    <a-tabs default-active-key="1">
      <a-tab-pane key="1" tab="Pending">
        <Pending/>
      </a-tab-pane>
      <a-tab-pane key="2" tab="Approved">
        <Approved/>
      </a-tab-pane>
      <a-tab-pane key="3" tab="Rejected">
        <Rejected/>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import Pending from './Pending.vue'
import Approved from './Approved.vue'
import Rejected from './Rejected.vue'

export default {
  components: { Pending, Approved, Rejected }
}
</script>

<style>
.container {
    background: #fff;
    padding: 20px;
}
</style>