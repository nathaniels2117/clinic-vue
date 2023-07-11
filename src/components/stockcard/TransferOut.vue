<template>
  <v-container>
    <v-row>
        <v-col cols="12">
    <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
            <v-card
                :loading="loading"
            >
                <template slot="progress">
                    <v-progress-linear
                        color="orange"
                        height="10"
                        indeterminate
                    ></v-progress-linear>
                </template>

                <v-card-text><br>
                <div class="container">
                    <div class="row">
                        <div class="col-sm-8">
                            <font size="100" style="padding: 10px"><b>Transfer Out</b></font>
                        </div>
                        <div class="col-sm-1">
                            <v-combobox
                                single-line
                                v-model="stock_action"
                                label="Action"
                                :items="stock_actions"
                                readonly=""
                                style="visibility: hidden;"
                            ></v-combobox>
                        </div>
                        <div class="col-sm-3"><br>
                            <h3><input type="checkbox" id="APPROVED" value="APPROVED" v-model="autoApproved">
                            <label for="APPROVED"> Auto Approved</label></h3>
                        </div>
                    </div>
                </div>
                    <div class="container">
                        <div class="row">
                            <div class="col-sm-4">
                                <v-combobox
                                    outlined
                                    v-model="branch_id_from"
                                    label="Branch From"
                                    :items="branch_information"
                                    @change="autolocationfrom(branch_information)"
                                    :rules="[v => !!v || 'Branch Information is required']"  
                                    color="orange"      
                                ></v-combobox>
                            </div>
                            <div class="col-sm-4">
                                <v-combobox
                                    outlined
                                    v-model="branch_id_to"
                                    label="Branch to"
                                    :items="branch_information"
                                    @change="autolocationto(branch_information)"
                                    :rules="[v => !!v || 'Branch Information is required']"  
                                    color="orange"      
                                ></v-combobox>
                            </div>
                            <div class="col-sm-4">
                                <v-text-field
                                    outlined
                                    v-model="mis"
                                    label="MIS"
                                    :counter="50"  
                                    :rules="nameRules"             
                                    color="orange"                       
                                ></v-text-field>
                            </div>
                    </div>
                    </div>

                    <div class="container">
                        <div class="row">
                            <div class="col-sm-4">
                                <v-combobox
                                    outlined
                                    v-model="branch_location_from"
                                    label="Location from"
                                    :items="location_info_from"
                                    @change="autolocationfrom()"
                                    :rules="[v => !!v || 'Location Information is required']"  
                                    color="orange"      
                                ></v-combobox>
                            </div>
                            <div class="col-sm-4">
                                <v-combobox
                                    outlined
                                    v-model="branch_location_to"
                                    label="Location to"
                                    :items="location_info_to"
                                    :rules="[v => !!v || 'Location Information is required']"  
                                    color="orange"      
                                ></v-combobox>
                            </div>
                            <div class="col-sm-4">
                                <v-text-field
                                    outlined
                                    v-model="remarks"
                                    label="Remarks"   
                                    :counter="50"  
                                    :rules="nameRules"      
                                    color="orange"                     
                                ></v-text-field>
                            </div>
                    </div>
                    </div>
                    <hr>
                    <br>
                    <br>

            <center>

                    <div class="container">
                        <div class="row">
                            <div class="col-sm-4">
                            <b><center>Product Name</center></b>
                            </div>
                            <div class="col-sm-2">
                            <b>UOM</b>
                            </div>
                            <div class="col-sm-2">
                            <b>Stocks</b>
                            </div>
                            <div class="col-sm-2">
                            <b>Cost</b>
                            </div>
                            <div class="col-sm-1">
                            <b>Qty</b>
                            </div>
                            <div class="col-sm-1" style="padding-left: 24px">
                                <v-btn
                                    elevation="2"
                                    class="mx-2"
                                    fab
                                    dark
                                    x-small
                                    color="green"
                                    v-if="$store.getters.valAccess(126)"
                                    @click="addStocks(1)"
                                    >
                                    <v-icon dark>
                                        mdi-note-plus
                                    </v-icon>
                                </v-btn>
                            </div>
                        </div>
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
                                :items="product_information"
                                @change="autopopulate(stock.core_id,counter)"
                                :rules="[v => !!v || 'Product Information is required']"
                                color="orange"
                                ></v-autocomplete>
                            </div>
                            <div class="col-sm-2">
                                <v-text-field
                                    v-model="stock.uom"
                                    readonly=""
                                    color="orange"
                                ></v-text-field>
                            </div>
                            <div class="col-sm-2">
                                <v-text-field
                                    v-model="stock.onhand"
                                    readonly=""
                                    color="orange"
                                ></v-text-field>
                            </div>
                            <div class="col-sm-2">
                                <v-text-field
                                    v-model="stock.approved_cost"
                                    :rules="numberRules"
                                    @keypress="filter(event)"
                                    color="orange"
                                ></v-text-field>
                            </div>
                            <div class="col-sm-1">
                                <v-text-field
                                    v-model="stock.qty"
                                    :rules="numberRules"
                                    @keypress="filter(event)"
                                    color="orange"
                                ></v-text-field>
                            </div>
                            
                            <div class="col-sm-1" style="padding: 24px">
                                <v-btn
                                    elevation="2"
                                    class="mx-2"
                                    fab
                                    dark
                                    x-small
                                    color="red"
                                    @click="deleteStock(counter,1)"
                                    :class="{ invisible: !disbutton }"
                                    >
                                    <v-icon dark>
                                        mdi-delete-forever
                                    </v-icon>
                                </v-btn>
                            </div>
                    </div>
                    </div>
             </center>
                    <br>
                    
                    <v-btn
                        block
                        outlined
                        color="orange"
                        elevation="2"
                        small
                        tile
                        v-if="$store.getters.valAccess(126)"
                        @click="validate()"
                        :disabled='isDisabled'
                        >Save
                        </v-btn>



                </v-card-text>

            </v-card>
            </v-form>
        </v-col>

    </v-row>


<!-- save confirmation dialog -->
    <template>
  <v-row justify="center">
    <v-dialog
      v-model="saveconfirmation"
      persistent
      max-width="290"
    >
      <v-card>
        <v-card-title class="text-h5">
          Save
        </v-card-title>
        <v-card-text>Are you sure you want to save?</v-card-text>
        <center>
          <v-btn
            elevation="2"
            class="mx-2"
            dark
            outlined
            small
            color="red"
            @click="changeStatusDialogSave(false)"
            >
                Cancel
          </v-btn>
          <v-btn
            elevation="2"
            class="mx-2"
            dark
            outlined
            small
            color="orange"
            @click="SaveStockInformation()"
            >
            Confirm
          </v-btn>
        </center>
        <br>        
      </v-card>
    </v-dialog>
  </v-row>
</template>
<!-- end save confirmation dialog -->



  </v-container>
    
</template>

<script>

  import branchservices from "../services/branchservices";
  import inventoryservices from "../services/inventoryservices";
  import stockcardservices from "../services/stockcardservices";
  import locationservices from "../services/locationservices";
  

  export default {
    name: 'Transfer Out',
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
        location_info_from: [],
        location_info_to: [],
        stock:[
                {
                    remarks: '',
                    core_id: '',
                    approved_cost: '',
                    qty: '',
                    uom: ''
                }
        ],
        productFullInfo: [],
        branchLocFrom: "",
        stock_action: "",
        product_information: [],
        stockcard_information: [],
        status_remarks: "PENDING",
        stockstatus: 0,
        totalcount: 0,
        prodbranchid: 0,
        valid: true,
        disbutton: false,
        todate: "",
        nameRules: [
        v => !!v || 'This is a required field',
        v => (v && v.length <= 50) || 'Must be less than 50',
        ],
        numberRules: [
        v => Number(v) !== 0  || 'Required',
        v => !!v || 'Number is required',
        v => (v && v.length <= 13) || 'Number must be less than 13 numbers',
        ],
        saveconfirmation: false

    }),
    created(){
        this.$store.state.header = true;
        this.$store.state.footer = true;
        this.$store.state.snackbar.color = 'orange';
        this.FetchBranchInformation();
        this.fetchProductInformation();
    },
    computed: {
      isDisabled() {
        // you can  check your form is filled or not here.
        
        return this.valid === false
      }
    },
    mounted(){
        this.$store.state.title = "Transfer Out Information";
        this.stock_action = this.stock_actions[2]
    },
    methods: {

        // get date today
        getdate(){
            const today = new Date();
            const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            const dateTime = date +' '+ time;
            this.todate = dateTime;  
        },

        // check pop up status
        changeStatusDialogSave(status){
            this.saveconfirmation = status;
        },

        // prevent entering letters
        filter: function(evt) {
        evt = (evt) ? evt : window.event;
        let expect = evt.target.value.toString() + evt.key.toString();
        
        if (!/^[-+]?[0-9]*\.?[0-9]*$/.test(expect)) {
            evt.preventDefault();
        } else {
            return true;
        }
        },

        // auto populate fields (uom, approved cost and stocks) onclick product
        autopopulate(item,counter){
            this.stock[counter]['uom'] = this.productFullInfo[item]['product_info']['unit_info']['initial']
            this.stock[counter]['approved_cost'] = parseFloat(this.productFullInfo[item]['product_info']['cost']).toFixed(2)
            this.stock[counter]['onhand'] = parseFloat(this.productFullInfo[item]['stock_on_hand']).toFixed(2)


        },

        // auto populate location to depending on location from
        autolocationfrom(){  
            this.FetchLocationInformationViaBranchFrom(this.branch_id_from.value)
            this.fetchProductInformation(this.branch_id_from.value)
        },

        // get location information via branch ID
        FetchLocationInformationViaBranchFrom(id){

            this.location_info_from = [];

            let payload = {
                branch_id: id
            };
            locationservices.fetchLocationInformationViaBranch(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    response.data.result.forEach((value) => {
                        this.location_info_from.push({
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

        // get location information via branch id to
        autolocationto(){  
            this.FetchLocationInformationViaBranchTo(this.branch_id_to.value)
        },


        // get location information via branch id to and remove branch selected
        FetchLocationInformationViaBranchTo(id){

            this.location_info_to = [];

            let payload = {
                branch_id: id
            };
            locationservices.fetchLocationInformationViaBranch(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    response.data.result.forEach((value) => {
                        this.location_info_to.push({
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

        // get product information via product branch id
        fetchProductInformation(prodbranchid){
            this.product_information = [];

            let payload = {
                business_branch_id: prodbranchid,
                location_id: this.branch_location_from.value
            }

            inventoryservices.fetchBranchProductInformation(payload, this.$store.getters.getAccessToken).then(response => {
            
                if(response.data.success){
                    var prod = {}
                    response.data.result.forEach((value) => {
                        this.product_information.push({
                            text: value.product_info.name,
                            value: value.product_info.id
                        });

                        prod[value.product_info.id] = value

                    });
                    this.productFullInfo = prod
                }
                else{
                    console.log(response.data.message);
                }
            }).catch(error => console.log(error));
        },

        // add new rows stocks
        addStocks(counts){
            this.totalcount+=counts

            this.disbutton = true
            this.stock.push({
                remarks: '',
                core_id: '',
                approved_cost: '',
                qty: '',
                uom: ''
            })
        },

        // delete rows stocks
        deleteStock(counter, counts){
            this.totalcount-=counts;
            if(this.totalcount==0){
            this.disbutton = false
            }
            this.stock.splice(counter,1);
        },

        // set stock information
        SetNewStockInformation(){
        this.getdate();
        if(this.autoApproved==true){
            this.status_remarks = 'APPROVED'
            this.stockstatus = 1
        }else{
            this.status_remarks = 'PENDING'
            this.stockstatus = 0
        }
            this.stockcard_information = {
                parent_user_id: this.$store.getters.getParentID,
                branch_code:this.branch_id_from.value,
                branch_name:this.branch_id_from.text,
                inventory_device_id:0,
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
                device_used:2,

                approver:this.$store.getters.getUserID,
                approver_name:this.$store.getters.getUserName,
                approved_at:this.todate,
                issued_by:this.$store.getters.getUserID,
                issued_by_name:this.$store.getters.getUserName,

                status: this.stockstatus,
                status_remarks: this.status_remarks,
                remarks:this.remarks,
                approved:this.autoApproved,
                created_at:this.todate
            };
        },

        // form validation
        validate(){

            let val = this.$refs.form.validate();

            if(val){
                this.confirmSave();
            }
        },

        // show dialog save confirmation
        confirmSave(){
            this.saveconfirmation = true
        },

        // clear required fields
        ClearSaveTransferOut(){
            this.branch_id_to = null;
            this.branch_id_from = null;
            this.branch_location_to = null;
            this.branch_location_from = null;
            this.branch_id_from = null;
            this.autoApproved = false
            this.mis = "";
            this.remarks = "";
            window.location.reload();
        },

        // save stocks information
        SaveStockInformation(){
            this.SetNewStockInformation()

            let payload = {
                stockcard_information: JSON.stringify(this.stockcard_information),
                stockcarditem_information: JSON.stringify(this.stock)
            };

                    let loader = this.$loading.show();

            if(this.stockcard_information.approved==true){
                
            stockcardservices.AutoApproveStockCards(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){

                    this.dialog = false;
                    this.$store.state.snackbar.message = response.data.message;
                    this.$store.state.snackbar.show = true;
                    this.stockcard_information = [];
                    this.stock = [];
                    this.saveconfirmation = false

                    loader.hide();
                    this.ClearSaveTransferOut();
                }
                else{
                    console.log(response.data.response);
                }
            }).catch(error => console.log(error));

            }else{
            stockcardservices.SaveStockCardInformations(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    this.dialog = false;
                    this.$store.state.snackbar.message = response.data.message;
                    this.$store.state.snackbar.show = true;
                    this.stockcard_information = [];
                    this.stock = [];
                    this.saveconfirmation = false
                    
                    loader.hide();
                    this.ClearSaveTransferOut();
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
<style>
  .invisible {
    visibility: hidden;
  }
</style>