<template>
  <a-card hoverable>
    <div
      style="margin-bottom: 20px; display: flex; justify-content: space-between"
    >
      <clock
        :color="'#001529'"
        :bg="'#fff'"
        :size="'100px'"
        :border="'3px solid'"
      />
      <div style="display: block; text-align: right">
        <div style="font-size: 20px">
          {{ new Date() | moment("dddd, MMMM Do YYYY") }}
        </div>
        <digital-clock 
          :blink="true"
          :displaySeconds="true"
          style="font-size: 70px; font-weight: 800; line-height: 70px; color: #222"/>
      </div>
    </div>
    <a-card-meta title="Date and Time">
      <template slot="description"> Local date and time </template>
    </a-card-meta>
  </a-card>
</template>

<script>
import Clock from "vue-clock2";
import DigitalClock from "vue-digital-clock";

export default {
  components: { Clock, DigitalClock },
  data() {
    return {};
  },
};
</script>

<style scoped>
</style>