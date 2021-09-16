<template>
  <div class="container">
    <h2>Accounts for Company and Co.</h2>
    <a-tabs default-active-key="1">
      <a-tab-pane key="1" tab="Income">
        <Income/>
      </a-tab-pane>
      <a-tab-pane key="2" tab="Expenses">
        <Expenses/>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import Income from './Income.vue'
import Expenses from './Expenses.vue'

export default {
  components: { Income, Expenses }
}
</script>

<style>
.container {
    background: #fff;
    padding: 20px;
}
</style>