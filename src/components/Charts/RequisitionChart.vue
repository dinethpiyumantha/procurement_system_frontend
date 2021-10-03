<template>
  <div>
    <apexchart :type="type" :options="options" :series="series"></apexchart>
  </div>
</template>

<script>
export default {
  data() {
    return {
      type: 'bar',
      options: {
        chart: {
          id: 'vuechart-example'
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
        }
      },
      series: [{
        name: 'series-1',
        data: [30, 40, 45, 50, 49, 60, 70, 91]
      }]
    }
  }
}
</script>

<style>

</style>