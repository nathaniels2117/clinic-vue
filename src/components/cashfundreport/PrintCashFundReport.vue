<template>
    <v-container>
      <v-row>
          <v-col cols="12">
              <v-card
                  :loading="loading"
              >
                  <template slot="progress">
                      <v-progress-linear
                          color="deep-purple"
                          height="10"
                          indeterminate
                      ></v-progress-linear>
                  </template>
  
                  <v-card-text>
                  {{ 'RECEIPT INFORMATION' }}
                  <br>
                  <v-divider></v-divider>
                  <br>
                  Cashier:
                  <div class="float-right">
                  {{this.salesreportmain[0].voided_info.employee_information.firstname}},&nbsp;{{this.salesreportmain[0].voided_info.employee_information.lastname}}
                  </div>
                  <br>
                  Receipt Number:
                  <div class="float-right">
                  {{this.salesreportmain[0].pos_id}}
                  </div>
                  <br>
                  Control Number:
                  <div class="float-right">
                  {{this.salesreportmain[0].control_number}}
                  </div>
                  <br>
                  Posted Date:
                  <div class="float-right">
                    {{ moment(String(this.salesreportmain[0].created_at)).format('MMMM DD,YYYY') }}
                  </div>
                  <br>
                  <v-divider></v-divider>
                  <br>
                  
                  <table>
                  
                  </table>
  
                      <v-data-table
                              :headers="headers"
                              :items="salesreportitems"
                              :hide-default-footer="true"
                          >
  
                           <template v-slot:item.product_info="props">
                                  {{ props.item.product_info }}
                              </template>
                              <template v-slot:item.cost="props">
                                  {{ parseFloat(props.item.product_info.cost).toFixed(2) }}
                              </template>
                              <template v-slot:item.total_cost="props">
                                {{ parseFloat(props.item.product_info.cost * props.item.qty).toFixed(2) }}
                              </template>
                      </v-data-table>
                      <br>
                  Vatable Sales
                  <div class="float-right">
                  {{this.salesreportmain[0].vatable_sales}}
                  </div>
                  <br>
                  Vat Amount
                  <div class="float-right">
                  {{this.salesreportmain[0].vat_amount}}
                  </div>
                  <br>
                  Vat-Exempt Sales
                  <div class="float-right">
                  {{this.salesreportmain[0].vat_exempt_sales}}
                  </div>

                  <br>
                  Subtotal
                  <div class="float-right">
                  {{this.salesreportmain[0].vat_exempt_sales}}
                  </div>
                  <br>
                  Discount
                  <div class="float-right">
                  {{this.salesreportmain[0].discount}}
                  </div>
                  <br>
                  Amount Due
                  <div class="float-right">
                  {{this.salesreportmain[0].net_sales}}
                  </div>
                  <br>
                  Tendered
                  <div class="float-right">
                  {{this.salesreportmain[0].tendered_amount}}
                  </div>
                  <br>
                  Change
                  <div class="float-right">
                  {{this.salesreportmain[0].change_amount}}
                  </div>
  
                  </v-card-text>
  
              </v-card>
              
          </v-col>
  
      </v-row>
  
    </v-container>
      
  </template>
  
  <script>
  
  import voidreportservices from "../services/voidreportservices";
  
    export default {
      name: 'Summary',
      data: () => ({
          loading: false,
          transactionid: 1,
           headers: [
            {
              text: 'Qty',
              align: 'start',
              sortable: false,
              value: 'qty',
            },
            { text: 'Descriptions', value: 'product_info.description' },
            { text: 'Cost', value: 'cost', align:"center"},
            { text: 'Total', value: 'total_cost', align:"right" }
          ],
          salesreportmain:[],
          salesreporitems: []
      }),
      created(){
          this.$store.state.header = false;
          this.$store.state.footer = false;
  
  
          this.$store.state.title = "Void Report";
          this.$store.state.transactionid = localStorage.getItem('transactionID')
          this.previewsalesreportid = this.$store.getters.fetchsalesreportid;
          this.fetchitems();
          this.fetchmain();
      },
      mounted(){
          
      },
      updated(){
        this.$nextTick(function () {
            window.print();
            window.onfocus=function(){ window.close();}
        })
      },
      methods: {
  
          fetchitems(){

              let payload = {
                      id: parseInt(this.$store.state.transactionid)
                  };
                  voidreportservices.fetchVoidReportViaID(payload, this.$store.getters.getAccessToken).then(response => {
                  if(response.data.success){
                      this.salesreportitems = response.data.result;
                  }
                  console.log(this.salesreportitems)
              }).catch(error => console.log(error));
          },
  
          fetchmain(){
              let payload = {
                      id: parseInt(this.$store.state.transactionid)
                  };
                  voidreportservices.fetchMainVoidReportViaID(payload, this.$store.getters.getAccessToken).then(response => {
                  if(response.data.success){
                      this.salesreportmain = response.data.result;
                  }
              }).catch(error => console.log(error));
          }
  
      }
    }
  </script>
  
  <style scoped>
  
  </style>