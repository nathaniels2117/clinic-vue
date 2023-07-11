<template>
    <v-container style="max-width: 95%; position: relative;" >
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

                    <template>
  <v-stepper v-model="e1">
    <v-stepper-header>
      <v-stepper-step
        :complete="e1 > 1"
        step="1"
        color="orange"
      >
        Information
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step
        :complete="e1 > 2"
        step="2"
        color="orange"
      >
        Product Selection
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step step="3"
        color="orange">
        Stocks
      </v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <v-card
          class="mb-12"
          color="white lighten-1"
          height="100%"
        >
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
                            <div class="col-sm-2">
                                <v-text-field
                                    outlined
                                    v-model="mis"
                                    label="MIS"         
                                    color="orange"  
                                    readonly=""                    
                                ></v-text-field>
                            </div>
                            <div class="col-sm-2">
                                <v-text-field
                                    outlined
                                    v-model="remarks"
                                    label="Remarks"       
                                    color="orange"                    
                                ></v-text-field>
                            </div>
                    </div>
                    </div>
        </v-card>
        <v-btn
          outlined
          color="orange"
          @click="validate(1)"
        :disabled='isDisabled'
        >
          Next
        </v-btn>

      </v-stepper-content>


      <v-stepper-content step="2">
                                <v-card
                                class="mb-12"
                                color="white lighten-1"
                                height="100%"
                                >
                                <v-data-table
                                id="showselectcheckbox"
                                    dense
                                    v-model="selected_prods"
                                    :headers="headerprod"
                                    :items="product_selection"
                                    hide-default-footer
                                    ipagination
                                    show-select
                                >

                                
                                </v-data-table>
                                </v-card>

        <v-btn text color="orange"
        @click="e1 = 1">
          Back
        </v-btn>
        <v-btn
          color="orange"
          @click="validate(2)"
          outlined
        >
            Next
        </v-btn>
      </v-stepper-content>

      <v-stepper-content step="3">
        <v-card
          class="mb-12"
          color="white lighten-1"
          height="100%"
        >
            <v-data-table
                dense
                :headers="headerprodstock"
                :items="selected_prods"
                hide-default-footer
                ipagination
            >

            <template v-slot:item.stock.core_id="props">
                <v-text-field
                    class="mt-2"
                    readonly=""
                    v-model="props.item.product_info.name"
                    color="orange"
                ></v-text-field>
            </template>

            <template v-slot:item.stock.uom="props">
                <v-text-field
                    class="mt-2"
                    readonly=""
                    v-model="props.item.product_info.unit_info.initial"
                    color="orange"
                ></v-text-field>
            </template>

            <template v-slot:item.stock.onhand="props">
                <v-text-field
                    class="mt-2"
                    readonly=""
                    v-model="props.item.stock_on_hand"
                    color="orange"
                ></v-text-field>
            </template>

            <template v-slot:item.stock.approved_cost="props">
                <v-text-field
                    class="mt-2"
                    v-model="props.item.product_info.cost"
                    color="orange"
                    :rules="numberRules"
                    @keypress="filter(event)"
                ></v-text-field>
            </template>

            <template v-slot:item.stocksqty="props">
                <v-text-field
                    class="mt-2"
                    v-model="props.item.stocksqty"
                    color="orange"
                    :rules="numberRules"
                    @keypress="filter(event)"
                ></v-text-field>
            </template>

            
            </v-data-table>
        </v-card>

        <v-btn text color="orange"
        @click="e1 = 2">
          Back
        </v-btn>

        <v-btn
          color="orange"
          outlined
          @click="validate(3)"
        >
          Confirm
        </v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>
                    <br>
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


<!-- notice confirmation dialog -->
<template>
  <v-row justify="center">
    <v-dialog
      v-model="productselect"
      persistent
      max-width="290"
    >
      <v-card>
        <v-card-title class="text-h5">
          Notice
        </v-card-title>
        <v-card-text>Please choose atleast (1) one product</v-card-text>
        <center>
          <v-btn
            elevation="2"
            class="mx-2"
            dark
            outlined
            small
            color="orange"
            @click="productselect = false"
            >
            Close
          </v-btn>
        </center>
        <br>        
      </v-card>
    </v-dialog>
  </v-row>
</template>
<!-- end notice confirmation dialog -->


  </v-container>
    
</template>

<script>

  import branchservices from "../services/branchservices";
  import stockcardservices from "../services/stockcardservices";
  import locationservices from "../services/locationservices";
  import inventoryservices from "../services/inventoryservices";
  

  export default {
    name: 'StockOut',
    data: () => ({
        e1: 1,
        product_selection: [],
        loading: false,
        branch_information: [],
        branch_id_from: "",
        branch_id_to: "",
        branch_location_from:"",
        branch_location_to:"",
        autoApproved:true,
        mis:"",
        remarks:"",
        productselect: false,
        headerprod: [
          { text: 'Product Name', value: 'product_info.name', sortable: false },
          { text: 'UOM', value: 'product_info.unit_info.initial', sortable: false },
          { text: 'Stocks', value: 'stock_on_hand', sortable: false },
          { text: 'Cost', value: 'product_info.cost', sortable: false },
        ],
        headerprodstock: [
          { text: 'Product Name', value: 'stock.core_id', sortable: false },
          { text: 'UOM', value: 'stock.uom', sortable: false },
          { text: 'Stocks', value: 'stock.onhand', sortable: false },
          { text: 'Cost', value: 'stock.approved_cost', sortable: false },
          { text: 'Qty', value: 'stocksqty', sortable: false },
        ],
        selected_prods: [],

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
        this.FetchLocationInformation();
        this.FetchMIS();
    },
    computed: {
      isDisabled() {
        // you can  check your form is filled or not here.
        
        return this.valid === false
      }
    },
    mounted(){
        this.$store.state.title = "Stock Out Information";
        this.stock_action = this.stock_actions[1]
        this.branch_id_from = this.$store.getters.getBranchName
        this.branch_id_to = this.$store.getters.getBranchName
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

        // get latest MIS
        FetchMIS(){

            let payload = {
                user_id: this.$store.getters.getParentID
            };

            stockcardservices.fetchMIS(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    this.mis = "MIS-"+response.data.result
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
        
        // get location information
        FetchLocationInformation(){

            this.location_info_from = [];

            let payload = {
                branch_id: this.$store.getters.getBranchID
            };
            
            locationservices.fetchLocationInformationViaBranch(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    response.data.result.forEach((value) => {
                        if(value.type===1){
                            this.location_info_from.push({
                                text: value.name,
                                value: value.id
                            });
                        }
                    });
                }
                else{
                    console.log(response.data.message);
                }
            }).catch(error => console.log(error));

        },

        // auto populate location to depending on location from
        autolocationfrom(){
            this.branch_location_to = ""
            this.FetchLocationInformationTo(this.branch_location_from.value)
            this.fetchProductInformation()
        },

        // get location to and remove location from
        FetchLocationInformationTo(){

            this.location_info_to = [];

            let payload = {
                branch_id: this.$store.getters.getBranchID,
                location_id: this.branch_location_from.value
            };
            locationservices.fetchLocationInformationViaBranchTo(payload, this.$store.getters.getAccessToken).then(response => {
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

        // get product information
        fetchProductInformation(){
            this.product_information = [];

            let payload = {
                business_branch_id: this.$store.getters.getBranchID,
                location_id: this.branch_location_from.value
            }
            inventoryservices.fetchBranchProductInformation(payload, this.$store.getters.getAccessToken).then(response => {
            

                if(response.data.success){
                    this.product_selection = response.data.result;
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
                branch_code:this.$store.getters.getBranchID,
                branch_name:this.$store.getters.getBranchName,
                inventory_device_id:0,
                mis:this.mis,
                action:this.stock_action.value,
                transfer_to_id:this.$store.getters.getBranchID,
                transfer_to_name:this.$store.getters.getBranchName,
                transfer_from_id:this.$store.getters.getBranchID,
                transfer_from_name:this.$store.getters.getBranchName,
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

        // form validation required fields
        validate(id){

            let val = this.$refs.form.validate();

            this.valid = true;
            if(val==true && id == 1){
                this.e1 = 2
            }

            if(id == 2){
                if(this.selected_prods.length != 0){
                    this.e1 = 3
                }else{
                    this.productselect = true
                }
            }

            if(val && id == 3){
                this.confirmSave();
            }
        },

        // show dialog confirmation save
        confirmSave(){
            this.saveconfirmation = true
        },

        // clear stocks fields
        ClearSaveStockOut(){
            this.branch_location_to = null;
            this.branch_location_from = null;
            this.branch_id_from = null;
            this.autoApproved = true
            this.mis = "";
            this.remarks = "";
            window.location.reload();
        },

        // save stocks information
        SaveStockInformation(){
            this.SetNewStockInformation()

            const object = this.selected_prods;
            this.stock = [];
                for (const property in object) {
                    this.stock.push({
                        remarks: '',
                        core_id:  `${object[property]['product_id']}`,
                        approved_cost: parseFloat(`${object[property]['product_info']['cost']}`),
                        qty: `${object[property]['stocksqty']}`,
                        uom: `${object[property]['product_info']['unit_info']['initial']}`
                    });
                    }

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
                    this.stockcard_information = "";
                    this.stock = [];
                    this.saveconfirmation = false
                    this.$store.state.snackbar.colors = 'xgreen';
                    this.$store.state.snackbar.icon = "mdi-check-circle-outline";                      

                    loader.hide();

                    this.$refs.form.reset();
                    this.e1 = 1;
                    this.valid = true;
                    this.selected_prods = [];
                    this.FetchMIS();
                    
                }else{
                    this.$store.state.snackbar.colors = 'xred';
                      this.$store.state.snackbar.icon = "mdi-alert-outline";                      
                  }
            }).catch(error => console.log(error));

            }else{
            stockcardservices.SaveStockCardInformations(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    this.dialog = false;
                    this.$store.state.snackbar.message = response.data.message;
                    this.$store.state.snackbar.show = true;
                    this.stockcard_information = "";
                    this.stock = [];
                    this.saveconfirmation = false

                    loader.hide();
                    window.location.reload();
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
  #showselectcheckbox .theme--light.v-icon {
  color: orange !important;
}
</style>