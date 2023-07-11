<template>
  <Pie
    :chart-options="chartOptions"
    :chart-data="chartData"
    :chart-id="chartId"
    :dataset-id-key="datasetIdKey"
    :plugins="plugins"
    :css-classes="cssClasses"
    :styles="styles"
    :width="width"
    :height="height"
  />
</template>

<script>
  import { Pie } from 'vue-chartjs/legacy';
  import dashboardservices from '../services/dashboardservices';
  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    CategoryScale
  } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

export default {
  name: 'PieChart',
  components: {
    Pie
  },
  props: {
    chartId: {
      type: String,
      default: 'pie-chart'
    },
    datasetIdKey: {
      type: String,
      default: 'label'
    },
    width: {
      type: Number,
      default: 400
    },
    height: {
      type: Number,
      default: 400
    },
    cssClasses: {
      default: '',
      type: String
    },
    styles: {
      type: Object,
      default: () => {}
    },
    plugins: {
      type: Array,
      default: () => []
    }
  },
  created(){
        this.FetchTransactionPaymentInformation();
    },
  data: () => ({
    payment:{
            name: [],
            data: []
        },
    chartData: {
        labels: [],
        datasets: [
            {
                backgroundColor: [
                        'rgba(55, 176, 103)',
                        'rgba(187, 226, 173)',
                        'rgba(98, 150, 188)',
                        'rgba(185, 210, 213)',
                        'rgba(237, 180, 13)',
                        'rgba(238, 211, 157)',
                        'rgba(236, 102, 114)',
                        'rgba(238, 167, 167)',
                        'rgba(159, 140, 174)',
                        'rgba(208, 202, 219)'
                ],
                borderColor: [
                    'rgba(55, 176, 103)',    
                    'rgb(187, 226, 173)',
                    'rgb(98, 150, 188)',
                    'rgb(185, 210, 213)',
                    'rgb(237, 180, 13)',
                    'rgb(238, 211, 157)',
                    'rgb(236, 102, 114)',
                    'rgb(238, 167, 167)',
                    'rgb(159, 140, 174)',
                    'rgb(208, 202, 219)'
                ],
                borderWidth: 1,
                data: []
            },
        ]
    },
    chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'y',
    }
  }),
  methods: {
        FetchTransactionPaymentInformation(){
          let payload={
          business_branch_id: this.$store.getters.getBranchID
        };
              dashboardservices.fetchTransactionPaymentInformation(payload, this.$store.getters.getAccessToken).then(response => {
                  if(response.data.success){
                      this.paymenttype = response.data.result;
                      this.paymenttype.forEach((v)=>{
                        this.payment.name.push(v.payment_type_info.name)
                        this.payment.data.push(v.sum)
                      });
                      this.chartData.labels = this.payment.name
                      this.chartData.datasets[0].data = this.payment.data
                  }
              }).catch(error => console.log(error));
          },
    },
}
</script>