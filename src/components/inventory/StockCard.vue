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
 
                    <div class="text-right">
                        <v-btn
                            elevation="2"
                            class="mx-2"
                            fab
                            dark
                            small
                            color="indigo"
                        >
                            <v-icon dark>
                                mdi-download
                            </v-icon>
                        </v-btn>
                    </div>

                    <div class="container">
                        <div class="row">
                            <div class="col-sm-2">
                                <v-combobox
                                    single-line
                                    v-model="stock_action"
                                    label="Action"
                                    :items="stock_actions"
                                ></v-combobox>
                            </div>
                            <div class="col-sm-4">
                                <v-combobox
                                    single-line
                                    v-model="branch_id_from"
                                    label="Branch From"
                                    :items="branch_information"
                                ></v-combobox>
                            </div>
                            <div class="col-sm-4">
                                <v-combobox
                                    single-line
                                    v-model="branch_id_to"
                                    label="Branch to"
                                    :items="branch_information"
                                ></v-combobox>
                            </div>
                            <div class="col-sm-2"><br>
                                <h3><input type="checkbox" id="APPROVED" value="APPROVED" v-model="autoApproved">
                                <label for="APPROVED"> Approved</label></h3>
                            </div>
                    </div>
                    </div>

                    <div class="container">
                        <div class="row">
                            <div class="col-sm-4">
                                <v-combobox
                                    single-line
                                    v-model="branch_location_from"
                                    label="Location from"
                                    :items="location_info"
                                ></v-combobox>
                            </div>
                            <div class="col-sm-4">
                                <v-combobox
                                    single-line
                                    v-model="branch_location_to"
                                    label="Location to"
                                    :items="location_info"
                                ></v-combobox>
                            </div>
                            <div class="col-sm-2">
                                <v-text-field
                                    v-model="mis"
                                    label="MIS"                            
                                ></v-text-field>
                            </div>
                            <div class="col-sm-2">
                                <v-text-field
                                    v-model="remarks"
                                    label="Remarks"                            
                                ></v-text-field>
                            </div>
                    </div>
                    </div>


                    <div class="text-right">
                        <v-btn
                            elevation="2"
                            class="mx-2"
                            fab
                            dark
                            small
                            color="green"
                            @click="addStocks"
                        >
                            <v-icon dark>
                                mdi-plus
                            </v-icon>
                        </v-btn>
                    </div>

                    <div class="container addstock"
                        v-for="(stock, counter) in stock"
                        v-bind:key="counter"
                        >
                        <div class="row">
                            <div class="col-sm-4">
                                <v-autocomplete
                                clearable
                                single-line
                                v-model="stock.core_id"
                                label="Product"
                                :items="product_information"
                                @change="autopopulate(stock.core_id,counter)"
                                ></v-autocomplete>
                            </div>
                            <div class="col-sm-3">
                                <v-text-field
                                    v-model="stock.uom"
                                    label="Unit Measurement"
                                    readonly=""
                                ></v-text-field>
                            </div>
                            <div class="col-sm-2">
                                <v-text-field
                                    v-model="stock.onhand"
                                    label="Stock On Hand"
                                    readonly=""
                                ></v-text-field>
                            </div>
                            <div class="col-sm-2">
                                <v-text-field
                                    v-model="stock.qty"
                                    label="	Quantity Transfer"
                                ></v-text-field>
                            </div>
                            <div class="col-sm-1">
                                <v-btn
                            elevation="2"
                            class="mx-2"
                            fab
                            dark
                            small
                            color="red"
                            @click="deleteStock(counter)"
                        >
                            <v-icon dark>
                                mdi-minus
                            </v-icon>
                        </v-btn>
                        </div>
                    </div>
                    </div>
                    
                    <v-btn
                        block
                        color="success"
                        elevation="2"
                        small
                        tile
                        @click="SaveStockInformation()"
                    >Save</v-btn>



                </v-card-text>

            </v-card>
            
        </v-col>

    </v-row>

  </v-container>
    
</template>

<script>

  import branchservices from "../services/branchservices";
  import productservices from "../services/productservices";
  import stockcardservices from "../services/stockcardservices";
  import locationservices from "../services/locationservices";
  

  export default {
    name: 'StockCard',
    data: () => ({
        loading: false,
        branch_information: [],
        branch_id_from: "",
        branch_id_to: "",
        branch_location_from:"",
        branch_location_to:"",
        autoApproved:"",
        mis:"",
        remarks:"",
        stock_actions: [
            {
                "text": 'Stock In',
                "value": 1
            },
            {
                "text": 'Stock Out',
                "value": 2
            },
            {
                "text": 'Transfer Out',
                "value": 3
            }
        ],
        location_info: [],
        stock:[
                {
                    remarks: '',
                    core_id: '',
                    qty: '',
                    uom: ''
                }
        ],
        productFullInfo: [],
        stock_action: "",
        product_information: [],
        stockcard_information: [],

    }),
    created(){
        this.$store.state.header = true;
        this.$store.state.footer = true;
        this.$store.state.snackbar.color = 'orange';
        this.FetchBranchInformation();
        this.fetchProductInformation();
        this.FetchLocationInformation();
    },
    mounted(){
        this.$store.state.title = "StockCard Information";
    },
    methods: {

        // onclick product get all info (uom and stocks)
        autopopulate(item,counter){
            this.stock[counter]['uom'] = this.productFullInfo[item]['unit_info']['name']
            this.stock[counter]['onhand'] = this.productFullInfo[item]['stock_on_hand']
        },

        // get branch information
       FetchBranchInformation(){

            this.branch_information = [];

            let payload = {
                user_id: this.$store.getters.getParentID
            };
            
            branchservices.fetchBranchInformation(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    response.data.result.forEach((value) => {
                        this.branch_information.push({
                            text: value.branch_name,
                            value: value.id
                        });
                    });
                }
                else{
                    console.log(response.data.message);
                }
            }).catch(error => console.log(error));

        },

        // get location information
        FetchLocationInformation(){

            this.location_info = [];

            let payload = {
                user_id: this.$store.getters.getParentID
            };
            
            locationservices.fetchLocationInformation(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    response.data.result.forEach((value) => {
                        this.location_info.push({
                            text: value.name,
                            value: value.id
                        });
                    });
                }
                else{
                    console.log(response.data.message);
                }
            }).catch(error => console.log(error));

        },
        
        // get product information
        fetchProductInformation(){
            this.product_information = [];

            let payload = {
                user_id: this.$store.getters.getParentID
            };
            productservices.fetchProductInformation(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    var prod = {}
                    response.data.result.forEach((value) => {
                        this.product_information.push({
                            text: value.name,
                            value: value.id
                        });

                        prod[value.id] = value

                    });
                    this.productFullInfo = prod
                }
                else{
                    console.log(response.data.message);
                }
            }).catch(error => console.log(error));
        },

        // add new row product
        addStocks(){
            this.stock.push({
                remarks: '',
                core_id: '',
                qty: '',
                uom: ''
            })
        },

        // delete row product
        deleteStock(counter){
            this.stock.splice(counter,1);
        },

        // set stockcard information
        SetNewStockInformation(){
            this.stockcard_information = {
                parent_user_id: this.$store.getters.getParentID,
                branch_code:this.branch_id_from.value,
                branch_name:this.branch_id_from.text,
                mis:this.mis,
                action:this.stock_action.value,
                transfer_to_id:this.branch_id_to.value,
                transfer_to_name:this.branch_id_to.text,
                transfer_from_id:this.branch_id_from.value,
                transfer_from_name:this.branch_id_from.text,
                location_from_id:this.branch_location_from.value,
                location_from_name:this.branch_location_from.text,
                location_to_id:this.branch_location_to.value,
                location_to_name:this.branch_location_to.text,

                approver:this.$store.getters.getUserID,
                approver_name:this.$store.getters.getUserName,

                remarks:this.remarks,
                approved:this.autoApproved
            };
        },

        // save stockcard information
        SaveStockInformation(){
            this.SetNewStockInformation()
            let payload = {
                stockcard_information: JSON.stringify(this.stockcard_information),
                stockcarditem_information: JSON.stringify(this.stock)
            };

            if(this.stockcard_information.approved==true){
                
            stockcardservices.AutoApproveStockCards(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    this.dialog = false;
                    this.fetchProductInformation();
                    this.$store.state.snackbar.message = response.data.message;
                    this.$store.state.snackbar.show = true;
                     this.stockcard_information = [];
                     this.stock = [];
                }
                else{
                    console.log(response.data.response);
                }
            }).catch(error => console.log(error));

            }else{
            stockcardservices.SaveStockCardInformations(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    this.dialog = false;
                    this.fetchProductInformation();
                    this.$store.state.snackbar.message = response.data.message;
                    this.$store.state.snackbar.show = true;
                     this.stockcard_information = [];
                     this.stock = [];
                }
                else{
                    console.log(response.data.response);
                }
            }).catch(error => console.log(error));
            }

        }

    }
  }
</script>