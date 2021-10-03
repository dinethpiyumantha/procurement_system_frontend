<template>
  <div>
    <apexchart type="donut" :options="options" :series="series"></apexchart>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: {},
      series: [44, 55, 41, 17, 15]
    }
  }
}
</script>

<style>

</style>