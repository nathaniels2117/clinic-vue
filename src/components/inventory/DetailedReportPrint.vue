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
                <center>
                {{ this.summarymain.action == 1 ? 'STOCK IN REPORT' : this.summarymain.action == 2 ? 'STOCK OUT REPORT' : this.summarymain.action == 3 ? 'TRANSFER OUT REPORT' : this.summarymain.action }}
                <br>
                {{ this.summarymain.branch_name }}
                <br>
                {{ this.summarymain.branch_info.branch_address }}
                </center>     

                <br>
                <div class="container">
                    <div class="row">
                        <div class="col-sm-2">
                        </div>
                        <div class="col-sm-5">
                            Supplier/Branch:
                            {{ this.summarymain.transfer_from_name }}
                            <br>
                            Issued By:
                            {{ this.summarymain.issued_by_name }}
                            <br>
                            Remarks:
                            {{ this.summarymain.remarks }}
                            <br>
                            Approver:
                            {{ this.summarymain.approver_name }}
                        </div>
                        <div class="col-sm-5">
                            MIS:
                            {{ this.summarymain.mis }}
                            <br>
                            Issued Date:
                            {{ this.summarymain.created_at }}
                            <br>
                            Status:
                            {{ this.summarymain.status_remarks }}
                            <br>
                            Approved Date:
                            {{ this.summarymain.approved_at }}
                        </div>
                    </div>
                </div>
                <br>
                <br>
                
                <table>
                
                </table>

                    <v-data-table
                            :headers="headers"
                            :items="summaryitems"
                            :hide-default-footer="true"
                        >


                    </v-data-table>
 

                </v-card-text>

            </v-card>
            
        </v-col>

    </v-row>

  </v-container>
    
</template>

<script>

  import reportservices from "../services/reportservices";

  export default {
    name: 'SummaryPrint',
    data: () => ({
        loading: false,
        summaryid: 1,
         headers: [
          {
            text: 'Product',
            align: 'start',
            sortable: false,
            value: 'product_info.name',
          },
          { text: 'Unit', value: 'uom' },
          { text: 'Current Stock', value: 'product_info.stock_on_hand' },
          { text: 'Quantity', value: 'qty' },
          { text: 'Location', value: 'get_main.location_to_name' },
          { text: 'Status', value: 'status_remarks' },
          { text: 'Remarks', value: 'remarks' }
        ],
        summarymain:[],
        summaryitems: []
    }),
    created(){
        this.$store.state.header = false;
        this.$store.state.footer = false;
        this.$store.state.snackbar.color = 'orange';

        this.$store.state.title = "Summary";
        this.$store.state.summaryid = localStorage.getItem('summaryID')
        this.summaryid = this.$store.getters.fetchsummaryid;

        this.fetchitems();
        this.fetchmain();
    },
    mounted(){
    },
    updated: function () {
        this.$nextTick(function () {
            window.print();
            window.onfocus=function(){ window.close();}
        })
    },
    methods: {

        // fetch items/products per summary id
        async fetchitems(){
            let payload = {
                    sum_id: parseInt(this.summaryid)
                };
            await reportservices.fetchStockSummaryReportViaID(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    this.summaryitems = response.data.result;
                }
                console.log(response.data.result)
            }).catch(error => console.log(error));
        },

        // fetch summary id
        async fetchmain(){
            let payload = {
                    sum_id: parseInt(this.summaryid)
                };
            await reportservices.fetchStockMainSummaryReportViaID(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    this.summarymain = response.data.result;
                }
                console.log(response.data.result)
            }).catch(error => console.log(error));
        }

    }
  }
</script>

<style scoped>

</style>