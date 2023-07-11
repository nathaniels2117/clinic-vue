<template>
    <section class="charts">
        <h3>Area Basic</h3>
        <vue-highcharts :options="areaOptions" ref="areaCharts"></vue-highcharts>
    </section>
</template>
<script>
import VueHighcharts from "vue2-highcharts";

export default {
  components: {
    VueHighcharts
  },
  data() {
    // return {
    //   areaOptions: data.AreaData
    // };
  },
  mounted() {},
  methods: {}
};
</script>
