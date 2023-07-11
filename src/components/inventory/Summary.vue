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
                {{ this.summarymain.action == 1 ? 'STOCK IN REPORT' : this.summarymain.action == 2 ? 'STOCK OUT REPORT' : this.summarymain.action == 3 ? 'TRANSFER OUT REPORT'  : this.summarymain.action == 4 ? 'TRANSFER IN REPORT' : this.summarymain.action == 5 ? 'DISPOSAL REPORT' : this.summarymain.action }}
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
                            {{ this.summarymain.status == 0 ? 'PENDING' : this.summarymain.status == 1 ? 'APPROVED' : this.summarymain.status == 2 ? 'DISAPPROVED' : this.summarymain.status }}
                            <br>
                            Approved Date:
                            {{ this.summarymain.approved_at == "1987-01-01 00:00:00" ? '' : this.summarymain.status == 0 ? '' : this.summarymain.approved_at }}
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
                        
                            <template v-slot:item.status="props">
                                {{ props.item.status == 0 ? 'PENDING' : props.item.status == 1 ? 'APPROVED' : props.item.status == 2 ? 'DISAPPROVED' : props.item.status }}
                            </template>
                            <template v-slot:item.qty="props">
                                {{ props.item.approved_qty }}<br>
                                <font size="1">{{ props.item.qty }}</font>
                            </template>
                            <template v-slot:item.unit_cost="props">
                            <div v-if="props.item.get_main.action == 1">
                                {{ props.item.approved_cost }}<br>
                                <font size="1">{{ props.item.unit_cost }}</font>
                            </div>
                            <div v-else>
                                {{ props.item.unit_cost }}<br>
                            </div>
                            </template>
                            <template v-slot:item.net_cost="props">
                            <div v-if="props.item.product_info.is_vatable == 1">
                                {{ parseFloat(props.item.approved_cost/1.12).toFixed(2) }}<br>
                            </div>
                            <div v-else>
                                {{ props.item.approved_cost/1 }}<br>
                            </div>
                            </template>
                            <template v-slot:item.total_cost="props">
                            <div v-if="props.item.product_info.is_vatable == 1">
                                {{ parseFloat((props.item.approved_cost/1.12)*props.item.approved_qty).toFixed(2) }}<br>
                            </div>
                            <div v-else>
                                {{ props.item.approved_cost*props.item.approved_qty}}<br>
                            </div>
                            </template>

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
    name: 'Summary',
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
          { text: 'Current Stock', value: 'ending_balance' },
          { text: 'Approved QTY/Requested QTY', value: 'qty' },
          { text: 'Approved Cost/Requested Cost', value: 'unit_cost' },
          { text: 'Net Cost', value: 'net_cost' },
          { text: 'Total Net Cost', value: 'total_cost' },
          { text: 'Location', value: 'get_main.location_to_name' },
          { text: 'Status', value: 'status' },
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
    updated(){
    window.onblur=function(){ window.close();}
    },
    methods: {

        // get item via summary id
        fetchitems(){
            let payload = {
                    sum_id: parseInt(this.summaryid)
                };
            reportservices.fetchStockSummaryReportViaID(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    this.summaryitems = response.data.result;
                }
                console.log(response.data.result)
            }).catch(error => console.log(error));
        },

        // get summary id
        fetchmain(){
            let payload = {
                    sum_id: parseInt(this.summaryid)
                };
            reportservices.fetchStockMainSummaryReportViaID(payload, this.$store.getters.getAccessToken).then(response => {
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