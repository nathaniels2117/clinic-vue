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
                            <div class="col-sm-4">
                        <font size="100" style="padding: 10px"><b>Disposal</b></font>
                            </div>

                        <!-- hidden -->
                            <div class="col-sm-2">
                                <v-combobox
                                    single-line
                                    v-model="branch_id_to"
                                    label="Branch to"
                                    :items="branch_information"
                                    style="visibility: hidden;"
                                ></v-combobox>
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
                            <div class="col-sm-2">
                                <v-combobox
                                    single-line
                                    v-model="branch_location_from"
                                    label="Location from"
                                    :items="location_info"
                                    style="visibility: hidden"
                                ></v-combobox>
                            </div>
                            <!-- hidden -->

                                
                            <div class="col-sm-3">
                                <h3><input type="checkbox" id="APPROVED" value="APPROVED" v-model="autoApproved">
                                <label for="APPROVED"> Auto Approved</label></h3>
                            </div>

                    </div>
                </div>
    

                    <div class="container">
                        <div class="row">
                            <div class="col-sm-5">
                                <v-combobox
                                    outlined
                                    @change="changelocfrom()"
                                    v-model="branch_location_to"
                                    label="Location From"
                                    :items="location_info"
                                    :rules="[v => !!v || 'Location Information is required']" 
                                    color="orange"
                                ></v-combobox>
                            </div>
                            <div class="col-sm-3">
                                <v-text-field
                                    outlined
                                    v-model="mis"
                                    label="MIS"   
                                    :counter="50"
                                    :rules="nameRules"  
                                    color="orange"                       
                                ></v-text-field>
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

            <center>
            
            <div class="container">
                <div class="row">
                    <div class="col-sm-4">
                    <b><center>Product Name</center></b>
                    </div>
                    <div class="col-sm-1">
                    <b>UOM</b>
                    </div>
                    <div class="col-sm-2">
                    <b>Stocks</b>
                    </div>
                    <div class="col-sm-1">
                    <b>Cost</b>
                    </div>
                    <div class="col-sm-1">
                    <b>Qty</b>
                    </div>
                    <div class="col-sm-2">
                    <b>Remarks</b>
                    </div>
                    <div class="col-sm-1" style="padding-left: 24px">

                        <v-btn
                            elevation="2"
                            class="mx-2"
                            fab
                            dark
                            x-small
                            color="green"
                            v-if="$store.getters.valAccess(127)"
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
                            <div class="col-sm-1">
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
                            <div class="col-sm-1">
                                <v-text-field
                                    v-model="stock.approved_cost"
                                    readonly=""
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


                            <div class="col-sm-2">

                                <v-combobox
                                    v-model="stock.remarks"
                                    @change="setStockRemarks(counter,stock.remarks)"
                                    :items="remarks_information"
                                    :rules="[v => !!v || 'Remarks is required']"
                                    hide-selected
                                    color="orange"
                                ></v-combobox>
                            </div>
                            
                            <div class="col-sm-1" style="padding: 24px"
                            >
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
                        v-if="$store.getters.valAccess(127)"
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
  import stockcardservices from "../services/stockcardservices";
  import locationservices from "../services/locationservices";
  import remarksservices from "../services/remarksservices";
  import inventoryservices from "../services/inventoryservices";
  

  export default {
    name: 'Disposal',
    data: () => ({
        loading: false,
        branch_information: [],
        remarks_information: [],
        remarks_add: 0,
        branch_id_from: "",
        branch_id_to: "",
        branch_location_from:"",
        branch_location_to:"",
        autoApproved:false,
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
            },
            {
                "text": 'Disposal',
                "value": 5
            }
        ],
        location_info: [],
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
        stock_action: "",
        product_information: [],
        stockcard_information: [],
        status_remarks: "PENDING",
        stockstatus: 0,
        totalcount: 0,
        valid: true,
        disbutton: false,
        todate: "",
        nameRules: [
        v => !!v || 'This is a required field',
        v => (v && v.length <= 50) || 'Must be less than 50',
        ],
        numberRules: [
            v => Number(v) !== 0  || 'Required',
            v => !!v  || 'Number is required',
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
        this.FetchLocationInformation();
    },
    computed: {
      isDisabled() {
        // you can  check your form is filled or not here.
        
        return this.valid === false
      }
    },
    mounted(){
        this.$store.state.title = "Disposal Information";
        this.stock_action = this.stock_actions[3]
    },
    methods: {

        // set stock remarks
        setStockRemarks(counter,remarks){
            var txtRemarks = remarks.text
            if( !txtRemarks ){
                txtRemarks = remarks
            }
            this.stock[counter]['remarks'] = txtRemarks
        },

        // get date today
        getdate(){
            const today = new Date();
            const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            const dateTime = date +' '+ time;
            this.todate = dateTime;  
        },

        // pop up status
        changeStatusDialogSave(status){
            this.saveconfirmation = status;
        },

        // prevent entering letters on text fields
        filter: function(evt) {
        evt = (evt) ? evt : window.event;
        let expect = evt.target.value.toString() + evt.key.toString();
        
        if (!/^[-+]?[0-9]*\.?[0-9]*$/.test(expect)) {
            evt.preventDefault();
        } else {
            return true;
        }
        },

        // change location form depending on location to
        changelocfrom(){
            
            this.branch_location_from = this.branch_location_to['text']
            this.fetchProductInformation();
            this.FetchRemarksInformation();

        },

        // auto display (uom, approved cost, stocks) onclick products
        autopopulate(item,counter){
            
            this.stock[counter]['uom'] = this.productFullInfo[item]['product_info']['unit_info']['initial']
            this.stock[counter]['approved_cost'] = parseFloat(this.productFullInfo[item]['product_info']['cost']).toFixed(2)
            this.stock[counter]['onhand'] = parseFloat(this.productFullInfo[item]['stock_on_hand']).toFixed(2)
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

        // get remarks information
        FetchRemarksInformation(){

            let payload = {
                user_id: this.$store.getters.getParentID
            };
            
            remarksservices.fetchRemarksInformation(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    response.data.result.forEach((value) => {
                        this.remarks_information.push({
                            text: value.name
                        });
                    });
                }
                else{
                    console.log(response.data.message);
                }
            }).catch(error => console.log(error));

        },

        // get location informations
        FetchLocationInformation(){

            this.location_info = [];

            let payload = {
                branch_id: this.$store.getters.getBranchID,
                location_type: 1
            };
            
            locationservices.fetchLocationInformationViaBranchAndType(payload, this.$store.getters.getAccessToken).then(response => {
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

        // get product informations
        fetchProductInformation(){
            this.product_information = [];

            let payload = {
                business_branch_id: this.$store.getters.getBranchID,
                location_id: this.branch_location_to['value']
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

        // add new row products
        addStocks(counts){
            this.totalcount+=counts

            this.disbutton = true
            this.stock.push({
                remarks: '',
                core_id: '',
                cost: '',
                qty: '',
                uom: ''
            })
        },

        // delete rows products
        deleteStock(counter, counts){
            this.totalcount-=counts;
            if(this.totalcount==0){
            this.disbutton = false
            }
            
            this.stock.splice(counter,1);
        },

        // set stocks status
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
                branch_code:this.$store.getters.getBranchID,
                branch_name:this.$store.getters.getBranchName,
                inventory_device_id:0,
                mis:this.mis,
                action:this.stock_action.value,
                transfer_to_id:this.$store.getters.getBranchID,
                transfer_to_name:this.$store.getters.getBranchName,
                transfer_from_id:this.$store.getters.getBranchID,
                transfer_from_name:this.$store.getters.getBranchName,
                location_from_id:this.branch_location_to.value,
                location_from_name:this.branch_location_to.text,
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

        // validation form required fields
        validate(){

            let val = this.$refs.form.validate();

            this.valid = true;

            if(val){
                this.confirmSave();
            }
        },

        // show save dialog 
        confirmSave(){
            this.saveconfirmation = true
        },

        // clear stock in fields
        ClearSaveStockin(){
            this.branch_location_to = null;
            this.branch_id_from = null;
            this.autoApproved = false
            this.mis = "";
            this.remarks = "";
            window.location.reload();
        },

        // save stocks informations
        SaveStockInformation(){
            this.SetNewStockInformation()

            this.stock['onhand'] = parseFloat(this.stock['onhand'])
            this.stock['approved_cost'] =  parseFloat(this.stock['approved_cost'])
            let payload = {
                stockcard_information: JSON.stringify(this.stockcard_information),
                stockcarditem_information: JSON.stringify(this.stock)
            };
                    let loader = this.$loading.show();

            if(this.stockcard_information.approved==true){
                
            stockcardservices.AutoApproveStockCards(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    this.dialog = false;
                    this.fetchProductInformation();
                    this.$store.state.snackbar.message = response.data.message;
                    this.$store.state.snackbar.show = true;
                     this.stockcard_information = "";
                     this.stock = [];
                    this.saveconfirmation = false

                    loader.hide();
                    this.$refs.form.resetFields();
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
                    this.stockcard_information = "";
                    this.stock = [];
                    this.saveconfirmation = false

                    loader.hide();
                    this.$refs.form.resetFields();
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