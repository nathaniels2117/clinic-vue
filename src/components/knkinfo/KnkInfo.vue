<template>
    <v-container style="max-width: 95%; position: relative;" >
      <!-- Stepper on inspection -->
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
        Cleaning
      </v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step
        :complete="e1 > 2"
        step="2"
        color="orange"
      >
        Inspection
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step step="3"
        color="orange">
        Grading
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

            <v-data-table
                    :headers="showHeaders"
                    :items="knkinfo"
                      @page-count="pageCount = $event"
                      :footer-props="{
                      'items-per-page-options':[10],
                      'disable-items-per-page': true,
    }"
                >
                </v-data-table>            
                    </div>
        </v-card>
        <v-btn
          outlined
          color="orange"
          @click="validate(1)"
        :disabled='isDisabled'
        >
          Confirm
        </v-btn>
      </v-stepper-content>
      <v-stepper-content step="2">
                                <v-card
                                class="mb-12"
                                color="white lighten-1"
                                height="100%"
                                >
                                <v-data-table
                    :headers="showHeaders"
                    :items="knkinfo"
                      @page-count="pageCount = $event"
                      :footer-props="{
                      'items-per-page-options':[10],
                      'disable-items-per-page': true,
    }"
                >
                    <template v-slot:item.action="props">
                      <v-btn
                            elevation="2"
                                class="mx-2"
                                dark
                                outlined
                                small
                                color="orange"
                                @click="UpdateKnkItemInfo(props.item.id, 1)"
                            >
                            <v-icon
                                    small
                                >
                                    mdi-check-bold
                                </v-icon>
                                Yes
                            </v-btn>
                        <v-btn
                          elevation="2"
                          class="mx-2"
                          dark
                          small
                          outlined
                          color="red"
                            @click="UpdateKnkItemInfo(props.item.id, 2)"
                        >
                        <v-icon
                                small
                            >
                                mdi-close-thick
                            </v-icon>
                          No
                      </v-btn>
                    </template>
                </v-data-table>  
            </v-card>
        <v-btn
          color="orange"
          @click="validate(2)"
          outlined
        >
            Confirm
        </v-btn>
      </v-stepper-content>

      <v-stepper-content step="3">
        <v-card
          class="mb-12"
          color="white lighten-1"
          height="100%"
        >
        RATING EQUIVALENT
        <br>
        Cleaned by: {{ this.checkedby }}
        <br>
        Inspected by: {{ this.inspectedby }}
        <br>
        {{ this.knkinfo_grading }}
        <br>
        Score: {{ this.knkinfo_points }}
        </v-card>
        <v-btn
          color="orange"
          outlined
          @click="validate(3)"
        :disabled='isDisabled'
        >
          Confirm
        </v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>
                </v-card-text>
            </v-card>
            </v-form>
        </v-col>
    </v-row>
<!-- save confirmation step 1 dialog -->
<template>
  <v-row justify="center">
    <v-dialog
      v-model="saveconfirmationclean"
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
            @click="changeStatusDialogSaveClean(false)"
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
            @click="SaveKnkInfoInformations()"
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

<!-- save confirmation step 2 dialog -->
<template>
  <v-row justify="center">
    <v-dialog
      v-model="saveconfirmationinspect"
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
            @click="changeStatusDialogSaveInspect(false)"
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
            @click="confirmSaveInspect()"
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
  import knkinfoservices from "../services/knkinfoservices";

  export default {
    name: 'knkinfo',
    data: () => ({
        setupinfolength: 0,
        e1: 1,
        Outstanding:"100",
        VSatisfactory:"95-99",
        Satisfactory:"90-94",
        Poor:"89",
        schedtodo: 0,
        schedprog: 0,
        scheddone: 0,
        knk_info_item_id:0,
        stats: false,
        loading: false,
        branch_information: [],
        headers:[],
        selectedHeaders: [],
        headersMap: [
          { text: 'Particular', sortable: false, value: 'standard_info.particular_info.name' },
          { text: 'Standard', sortable: false, value: 'standard_info.name' },
          { text: 'Action', sortable: false, value: 'action' , width: '230'}
        ],        
        selected_prods: [],
        productFullInfo: [],
        product_selection: [],
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
        knkinfo: [],
        inspectedby: '',
        checkedby: '',
        knkinfo_grade:0,
        knkinfo_grading:'',
        knkinfo_points:0,
        prodlist: [],
        stocksqty: [],
        inspected: 0,
        cleaned: 0,
        stock_action: "",
        id: 0,
        yesno: 1,
        knkinfo_information: {
            room_id: '',
            checked_by: ''
        },
        testslash: 0,
        stockcard_information: [],
        status_remarks: "PENDING",
        stockstatus: 0,
        totalcount: 0,
        knkinfo_id: 0,
        valid: true,
        disbutton: false,
        productselect: false,
        todate: "",
        iddisable: 0,
        nameRules: [
        v => !!v || 'This is a required field',
        v => (v && v.length <= 50) || 'Must be less than 50',
        ],
        numberRules: [
            v => Number(v) !== 0  || 'Required',
            v => !!v  || 'Number is required',
            v => (v && v.length <= 13) || 'Number must be less than 13 numbers',
        ],
        saveconfirmation: false,
        saveconfirmationclean: false,
        saveconfirmationinspect: false,
    }),
    created(){
        this.id = this.$route.params.id;
        localStorage.setItem('knkinfo_id',this.id);
        this.FetchKnkInfoInformation(this.id);
        this.$store.state.header = true;
        this.$store.state.footer = true;
        this.$store.state.snackbar.color = 'orange';
        this.FetchBranchInformation();
        this.headers = Object.values(this.headersMap);
        this.selectedHeaders = this.headers;     
    },
    computed: {
      isDisabled() {
        return this.valid === false
      },
      showHeaders () {
        return this.headers.filter(s => this.selectedHeaders.includes(s));
      }
    },
    mounted(){
        this.$store.state.title = "Kiss and Kick";
    },
    methods: {
        statusbutton(id, item, type){
            console.log(id)
            console.log(item)
            console.log(type)
            if(type == "done"){
                this.scheddone = 1
            }
            this.iddisable = item
            this.stats = id
        },
        getdate(){
            const today = new Date();
            const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            const dateTime = date +' '+ time;
            this.todate = dateTime;  
        },
        changeStatusDialogSave(status){
            this.saveconfirmation = status;
        },
        changeStatusDialogSaveClean(){
            this.saveconfirmationclean = false;
        },        
        changeStatusDialogSaveInspect(){
            this.saveconfirmationinspect = false;
        },        
        filter: function(evt) {
        evt = (evt) ? evt : window.event;
        let expect = evt.target.value.toString() + evt.key.toString();
        
        if (!/^[-+]?[0-9]*\.?[0-9]*$/.test(expect)) {
            evt.preventDefault();
        } else {
            return true;
        }
        },
        UpdateKnkItemInfo(id, stat){
            this.yesno = stat
            this.knk_info_item_id = id
            this.SaveKnkInfoInformationsInspect();
        },
        // Get KnK Info to validate
        FetchKnkInfoInformationCheck(id){
            let payload = {
                id: parseInt(id),
                user_id: this.$store.getters.getParentID
            };
            knkinfoservices.fetchKnkInfoInformationCheck(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    console.log(this.$store.getters.getRoleName.toLowerCase());
                    if(response.data.result.checked_by == 0 && this.$store.getters.getRoleName.toLowerCase() == 'cleaner'){
                        this.e1 = 1;
                    }else if(response.data.result.checked_by != 0 && response.data.result.inspected_by == 0 && this.$store.getters.getRoleName.toLowerCase() == 'inspector'){
                        this.e1 = 2;   
                    }else if(response.data.result.checked_by != 0 && response.data.result.inspected_by != 0){
                        this.e1 = 3;
                    }
                    this.knkinfo_id = response.data.result.id;
                }
            }).catch(error => console.log(error));
        },
        // Get KnK Info data
        FetchKnkInfoInformation(id){
            let payload = {
                id: parseInt(id),
                user_id: this.$store.getters.getParentID
            };
            this.FetchKnkInfoInformationCheck(parseInt(id))
            knkinfoservices.fetchKnkInfoInformation(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    this.knkinfo = response.data.result;
                }
            }).catch(error => console.log(error));
        },                
        // Get Branch data
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
        validate(id){
            let val = this.$refs.form.validate();
            this.valid = true;
            // On click confirm on step 1
            if(val && id == 1){
                this.confirmSaveClean()
            }
            // On click confirm on step 2
            if(id == 2){
                    this.saveconfirmationinspect = true  
            }
            // On click confirm on step 3
            if(val && id == 3){
                this.confirmSave();
            }
        },
        confirmSaveClean(){
            this.saveconfirmationclean = true            
        },
        confirmSaveInspect(){  
            this.SaveKnkInfoInformationsInspectedBy();
        },
        // Save KnK Info on Inspected by stepper 2
        SaveKnkInfoInformationsInspectedBy(){

            let payload = {
                inspected_by: this.$store.getters.getParentID,
                id: this.knkinfo_id
                };
            knkinfoservices.saveKnkInfoInformationsInspectedBy(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    this.$store.state.snackbar.message = response.data.message;
                    this.$store.state.snackbar.show = true;
                    this.saveconfirmationinspect = false  
                    this.$store.state.snackbar.colors = 'xgreen';
                    this.$store.state.snackbar.icon = "mdi-check-circle-outline";   
                    console.log(response.data.result)
                    for (var z = 0 ; z < response.data.result.length ; z++){
                    this.knkinfo_points += parseInt(response.data.result[z].points)
                    }    
                    if(this.knkinfo_points == 100){
                        this.knkinfo_grading = "Outstanding"
                    }else if(this.knkinfo_points < 100 && this.knkinfo_points >= 95){
                        this.knkinfo_grading = "Very Satisfactory"
                    }else if(this.knkinfo_points < 95 && this.knkinfo_points >= 90){
                        this.knkinfo_grading = "Satisfactory"
                    }else if(this.knkinfo_points < 89){
                        this.knkinfo_grading = "Poor"
                    }	
                    this.inspectedby = response.data.inspected.personal_information.lastname + ' ' + response.data.inspected.personal_information.firstname;
                    console.log(this.inspectedby)
                    this.checkedby = response.data.cleaned.personal_information.lastname + ' ' + response.data.cleaned.personal_information.firstname;
                    console.log(this.checkedby)
                }else{
                    this.$store.state.snackbar.colors = 'xred';
                      this.$store.state.snackbar.icon = "mdi-alert-outline";                      
                  }                 
                  this.e1 = 3
            }).catch(error => console.log(error));
        },         
        SaveKnkInfoInformationsInspect(){
            let payload = {
                setup_id: this.knk_info_item_id,
                info_id: this.knkinfo_id,
                status: this.yesno
                };
            knkinfoservices.saveKnkInfoInformationsInspect(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    this.$store.state.snackbar.message = response.data.message;
                    this.$store.state.snackbar.show = true;
                    this.saveconfirmationclean = false
                    this.$store.state.snackbar.colors = 'xgreen';
                    this.$store.state.snackbar.icon = "mdi-check-circle-outline";   
                }else{
                    this.$store.state.snackbar.colors = 'xred';
                      this.$store.state.snackbar.icon = "mdi-alert-outline";                      
                  }                 
            }).catch(error => console.log(error));
        },        
        SaveKnkInfoInformations(){
            let payload = {
                room_id: this.id,
                checked_by: this.$store.getters.getParentID,
                knk_item_information: JSON.stringify(this.knkinfo)
                };
            knkinfoservices.saveKnkInfoInformations(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    this.$store.state.snackbar.message = response.data.message;
                    this.$store.state.snackbar.show = true;
                    this.saveconfirmationclean = false
                    this.$store.state.snackbar.colors = 'xgreen';
                    this.$store.state.snackbar.icon = "mdi-check-circle-outline"; 
                    this.knkinfo_id = response.data.result;  
                }else{
                    this.$store.state.snackbar.colors = 'xred';
                    this.$store.state.snackbar.icon = "mdi-alert-outline";                      
                  }                 
            }).catch(error => console.log(error));
        }

    }
  }
</script>
<style>
  .invisible {
    visibility: hidden;
  }
  .v-data-table { 
  overflow-x: auto;
  overflow-y: auto;
}
#showselectcheckbox .theme--light.v-icon {
  color: orange !important;
}
</style>