<template>
  <Bar
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
  import { Bar } from 'vue-chartjs/legacy';
  import dashboardservices from '../services/dashboardservices';
  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale } from 'chart.js';

  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

  export default {
    name: 'Chart',
    components: { Bar },
    props: {
        chartId: {
            type: String,
            default: 'bar-chart'
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
            type: Object,
            default: () => {}
        }
    },
    created(){
        this.FetchTransactionTopProductInformation();
    },
    data: () => ({
        top10product:{
            name: [],
            data: []
        },
        filters: {},
        chartData: {
            labels: [],
            datasets: [
                {
                    label: 'Total',
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
        FetchTransactionTopProductInformation(){
            var filters = {
                date_from:localStorage.getItem('date_from'),
                date_to: localStorage.getItem('date_to')
            }
            let payload={
            dashboard: JSON.stringify(filters),
            business_branch_id: this.$store.getters.getBranchID
        };
        // this.top10product = []
        console.log(localStorage.getItem('filters'))
              dashboardservices.fetchTransactionTopProductInformation(payload, this.$store.getters.getAccessToken).then(response => {
                  if(response.data.success){
                      this.top = response.data.result;
                      this.top.forEach((v)=>{
                        this.top10product.name.push(v.product_info.name)
                        this.top10product.data.push(v.count)
                      });
                      console.log(this.top10product.name)
                      this.chartData.labels = this.top10product.name
                      this.chartData.datasets[0].data = this.top10product.data
                  }
              }).catch(error => console.log(error));
          },
    },
  }
</script>

<style scoped>
.chart {
  height: 100vh;
}
</style>