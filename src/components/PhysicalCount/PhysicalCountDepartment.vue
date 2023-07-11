<template>
  <v-container>
    <v-row>
        <v-col cols="12">
            <v-card
                :loading="loading"
            >
                <v-card-text>

                 <div class="text-right">
                        <v-btn
                            elevation="2"
                            class="mx-2"
                            fab
                            dark
                            small
                            color="indigo"
                            @click="NewProductCount()"
                        >
                            <v-icon dark>
                                mdi-plus
                            </v-icon>
                        </v-btn>
                    </div>

                    <v-data-table
                        :headers="headers"
                        :items="product_count"
                    >
                    
                    </v-data-table>
 

                </v-card-text>

            </v-card>
            
        </v-col>

    </v-row>


   
        <v-dialog
        v-model="adddialog"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
        >
            <v-card>
                <v-toolbar
                dark
                color="primary"
                >
                <v-btn
                    icon
                    dark
                    @click="adddialog = false"
                >
                    <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>Physical Count</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                    <v-btn
                    dark
                    text
                    id="btn-next" class="btn btn-primary btn-sm p-2" style="font-size: 12px;"
                    @click="validate()"
                    >
                    Save
                    </v-btn>
                </v-toolbar-items>
                </v-toolbar>

                <v-col sm="12" md="6" offset-md="3" class="mt-3 text-center"> 
                    <h4>Note: Here you can add physical information.</h4>
                </v-col>
                
                
                    <template>
                        <v-stepper v-model="e1">
                            <v-stepper-header>
                            <v-stepper-step
                                :complete="e1 > 1"
                                step="1"
                            >
                                Physical Count
                            </v-stepper-step>

                            <v-divider></v-divider>

                            <v-stepper-step
                                :complete="e1 > 2"
                                step="2"
                            >
                                Post Physical Count
                            </v-stepper-step>

                            <v-divider></v-divider>

                            <v-stepper-step step="3">
                               Complete
                            </v-stepper-step>
                            </v-stepper-header>

                            <v-stepper-items>
                            <v-stepper-content step="1">
                                <v-card
                                class="mb-12"
                                color="grey lighten-1"
                                height="200px"
                                >
                                <v-data-table
                                    :headers="headerpc"
                                    :items="physical_count"
                                >
                                
                                </v-data-table>
                                </v-card>

                                <v-btn
                                color="primary"
                                @click="e1 = 2"
                                >
                                Continue
                                </v-btn>

                                <v-btn text>
                                Cancel
                                </v-btn>
                            </v-stepper-content>

                            <v-stepper-content step="2">
                                <v-card
                                class="mb-12"
                                color="grey lighten-1"
                                height="200px"
                                ></v-card>

                                <v-btn
                                color="primary"
                                @click="e1 = 3"
                                >
                                Continue
                                </v-btn>

                                <v-btn text>
                                Cancel
                                </v-btn>
                            </v-stepper-content>

                            <v-stepper-content step="3">
                                <v-card
                                class="mb-12"
                                color="grey lighten-1"
                                height="200px"
                                ></v-card>

                                <v-btn
                                color="primary"
                                @click="e1 = 1"
                                >
                                Continue
                                </v-btn>

                                <v-btn text>
                                Cancel
                                </v-btn>
                            </v-stepper-content>
                            </v-stepper-items>
                        </v-stepper>
                    </template>


            </v-card>
        </v-dialog>

  </v-container>
    
</template>

<script>

  import productcountservices from '../services/productcountservices';
  import inventoryservices from "../services/inventoryservices";

  export default {
    name: 'PhysicalCountDepartment',
    data: () => ({
        loading: false,
        e1: 1,
        adddialog: false,
        product_count: [],
        product_count_information: [],
        headers: [
          { text: 'Date Created', value: 'image' },
          { text: 'Created By', value: 'branch_name' },
          { text: 'Date Posted', value: 'branch_address' },
          { text: 'Posted By', value: 'flag' },
          { text: 'Status', value: 'created_by' }
        ],

        headerpc: [
          {
            text: 'Product Name',
            align: 'start',
            sortable: false,
            value: 'product_info.name',
          },
          { text: 'UM', value: 'product_info.unit_info.initial' },
          { text: 'Physcial Count', value: '' },
          { text: 'Brand Name', value: 'product_info.sub_category_info.name' },
          { text: 'Unit Cost', value: 'product_info.cost' },
          { text: 'Vatable', value: 'product_info.is_vatable' },
          { text: 'Net Unit Cost', value: 'product_info.selling_price' },
          { text: 'Total', value: 'product_info.department_info.name' }
        ],
        physical_count: [],
    }),
    created(){
        this.adddialog = false;
        this.$store.state.header = true;
        this.$store.state.footer = true;
        this.$store.state.snackbar.color = 'orange';
    },
    mounted(){
        this.$store.state.title = "Physical Count Department";
    },
    methods: {

        // get product count information
        FetchProductCountInformation(){

            let payload = {
                user_id: this.$store.getters.getParentID
            };

            productcountservices.fetchProductCountInformation(payload,  this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    this.product_count = response.data.result;
                }
            }).catch(error => console.log(error));

        },
        // show dialog add new product count
        NewProductCount(){
            this.adddialog = true;
            this.FetchProductInformation();
        },

        // get product information
        FetchProductInformation(){

            let payload = {
                business_branch_id: this.$store.getters.getBranchID
            }

            inventoryservices.fetchBranchProductInformation(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    this.physical_count = response.data.result;
                }
            }).catch(error => console.log(error));

        }

    }
  }
</script>

<style scoped>

</style>