<template>
    <v-container style="max-width: 95%; position: relative;" >
    <v-row>
        <v-col cols="12">
            <v-card
                :loading="loading"
            >
                <v-card-text>
<template>
    <v-toolbar dense style="">
      <v-row>
        <v-col cols="12">
      <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          placeholder="Search"
          hide-details
          color="orange"
          overflow
          solo
          dense
          style="min-width: 60px;"
      ></v-text-field>
      </v-col>
    </v-row>
        &nbsp;
        <template  v-if="$vuetify.breakpoint.mdAndUp">
  <div class="text-center">
    <v-menu
      v-model="menucolumn"
      :close-on-content-click="false"
      :nudge-width="60"
      :nudge-left="60"      
      offset-y
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="orange"
          dark
          v-bind="attrs"
          v-on="on"
        >
        <v-icon>mdi-view-column</v-icon>Column
        </v-btn>
      </template>

      <v-card style="padding-top:10px;min-width:50px;">
        <v-list>
                <ul>
            <div v-for="(item, index) in headers" :key="index">
              <input type="checkbox" :id="item.text" :value="item" v-model="selectedHeaders">
              &nbsp;<label :for="item.text">{{item.text}}</label>
            </div>
          </ul>
        </v-list>

      </v-card>
    </v-menu>
  </div>
</template>

<template  v-if="$vuetify.breakpoint.smAndDown">
  <div class="text-center">
    <v-menu
      v-model="menucolumn"
      :close-on-content-click="false"
      :nudge-width="100"
      :nudge-left="100"
      offset-y
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="orange"
          dark
          v-bind="attrs"
          v-on="on"
        >
        <v-icon>mdi-view-column</v-icon>
        </v-btn>
      </template>

      <v-card style="padding-bottom:10px">
        <br>
        &nbsp; &nbsp;
        <b>Column</b>
        <v-list>
                <ul>
            <div v-for="(item, index) in headers" :key="index">
              <input type="checkbox" :id="item.text" :value="item" v-model="selectedHeaders">
              &nbsp;<label :for="item.text">{{item.text}}</label>
            </div>
          </ul>
        </v-list>
      </v-card>
    </v-menu>
  </div>
</template> &nbsp;
      <template v-if="$vuetify.breakpoint.mdAndUp">
        <v-btn
        medium
        dark
          color="orange"
          elevation="2"
          @click="productdialog = true"
                              v-if="$store.getters.valAccess(14)"
        >
          <v-icon>mdi-plus</v-icon>Create
        </v-btn>
        </template>

        <template v-if="$vuetify.breakpoint.smAndDown">
        <v-btn
        medium
        dark
          color="orange"
          elevation="2"
          style="padding-left: 12px;padding-right: 12px;"
          @click="productdialog = true"
                              v-if="$store.getters.valAccess(14)"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
        </template>
  </v-toolbar>
</template>
                    <br>
                    <v-data-table
                    id="showselectcheckbox"

                        :search="search"
                        :headers="showHeaders"
                        :items="product_count"
                      :page.sync="page"
                      @page-count="pageCount = $event"
                      :footer-props="{
                      showFirstLastPage: false,
                      'items-per-page-options':[10],
                      'disable-items-per-page': true}"
                    >
                    <template v-slot:item.id="props">
                        <div v-if="$store.getters.valAccess(135)">
                            <v-btn
                            outlined
                            color="orange"
                            @click="FetchProductCountInformationViaID(props.item.id)"
                            v-if="props.item.status == 1"
                            >
                            PCount{{ props.item.id }}
                            </v-btn>
                            <div v-else-if="props.item.status == 2">
                                <v-btn
                                    v-if="$store.getters.valAccess(208)"
                                    outlined
                                    color="orange"
                                    @click="FetchProductCountInformationViaIDcomplete(props.item.id)"
                                >
                                PCount{{ props.item.id }}
                                </v-btn>
                                <v-btn
                                    v-else
                                    outlined
                                    disabled
                                    color="orange"
                                    @click="FetchProductCountInformationViaIDcomplete(props.item.id)"
                                >
                                PCount{{ props.item.id }}
                                </v-btn>
                            </div>
                            <v-btn
                                outlined
                                color="orange"
                                @click="FetchProductCountInformationViaIDpost(props.item.id)"
                                v-if="props.item.status == 0 "
                            >
                            PCount{{ props.item.id }}
                            </v-btn>
                        </div>
                        <div v-else>
                            <v-btn
                            outlined
                            disabled
                            color="orange"
                            v-if="props.item.status == 1"
                            >
                            PCount{{ props.item.id }}
                            </v-btn>
                            <div  v-else-if="props.item.status == 2">
                                <v-btn
                                    v-if="$store.getters.valAccess(208)"
                                    outlined
                                    color="orange"
                                    @click="FetchProductCountInformationViaIDcomplete(props.item.id)"
                                >
                                    PCount{{ props.item.id }}
                                </v-btn>
                                <v-btn
                                    v-else
                                    outlined
                                    disabled
                                    color="orange"
                                >
                                    PCount{{ props.item.id }}
                                </v-btn>
                            </div>
                            <v-btn
                                outlined
                                color="orange"
                                disabled
                                v-if="props.item.status == 0 "
                            >
                            PCount{{ props.item.id }}
                            </v-btn>
                        </div>
                    </template>
                    <template v-slot:item.created_by="props">
                        {{ props.item.created_info.personal_information.lastname }}, {{ props.item.created_info.personal_information.firstname }}
                    </template>

                    <template v-slot:item.posted_by="props">
                        {{ props.item.posted_info != null ? props.item.posted_info.personal_information.firstname + ", " + props.item.posted_info.personal_information.lastname : '' }}
                    </template>

                    <template v-slot:item.status="props">
                        {{ props.item.status == 0 ? 'FOR POSTING' : props.item.status == 1 ? 'FOR RECOUNT'  : props.item.status == 2 ? 'COMPLETED' : props.item.status }}
                </template>
                    
                    </v-data-table>
 

                    <v-pagination
                    color="orange"
                    v-model="page"
                    :length="pageCount"
                    ></v-pagination>

                    
                </v-card-text>

            </v-card>
            
        </v-col>

    </v-row>


        <!-- start stepper -->
        <v-dialog
        v-model="adddialog"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
        >
            <v-card>
                <v-toolbar
                dark
                color="orange"
                >
                <v-btn
                    icon
                    dark
                    @click="adddialog = false"
                    color="white"
                >
                    <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>Physical Count</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                </v-toolbar-items>
                </v-toolbar>

                <v-col sm="12" md="6" offset-md="3" class="mt-3 text-center"> 
                    <h4>Note: Here you can add physical information.</h4>
                </v-col>
                
                
                    <template>
                        <v-stepper v-model="e1" max-height="100%">
                            <v-stepper-header>
                            <v-stepper-step

                                color="orange"
                                :complete="e1 > 1"
                                step="1"
                            >
                                Physical Count
                            </v-stepper-step>

                            <v-divider></v-divider>

                            <v-stepper-step
                                color="orange"
                                :complete="e1 > 2"
                                step="2"
                            >
                                Post Physical Count
                            </v-stepper-step>

                            <v-divider></v-divider>

                            <v-stepper-step 
                                color="orange"
                                step="3">
                               Complete
                            </v-stepper-step>
                            </v-stepper-header>

                            <v-stepper-items>
                            <v-stepper-content step="1">
                                <v-card
                                class="mb-12"
                                color="white lighten-1"
                                height="100%"
                                >
                                <v-form
                                    ref="form"
                                    v-model="valid"
                                    lazy-validation
                                >
                                <v-data-table

                    id="showselectcheckbox"
                                    :headers="headerpc"
                                    :items="physical_count"
                                    :page.sync="physical_count_page"
                                    @page-count="physical_count_pageCount = $event"
                                    :footer-props="{
                                    showFirstLastPage: false,
                                    'items-per-page-options':[10],
                                    'disable-items-per-page': true}"
                                    
                                >

                                    <template v-slot:item.pcount="props">
                                        <v-text-field
                                            class="mt-2"
                                            v-model="props.item.pcount"
                                            :rules="numberRules"
                                            @keypress="filter(event)"
                                            color="orange"
                                        ></v-text-field>
                                    </template>

                                    
                                    <template v-slot:item.product_info.is_vatable="props">
                                        {{ props.item.product_info.is_vatable == 1 ? 1.12 : props.item.product_info.is_vatable }}
                                    </template>
                                
                                </v-data-table>

                                <v-pagination
                                color="orange"
                                v-model="physical_count_page"
                                :length="physical_count_pageCount"
                                ></v-pagination>

                                </v-form>
                                </v-card>

                                <v-btn text
                                color="orange"
                                @click="adddialog=false"
                                v-if="this.action!='update'">
                                Product Selection
                                </v-btn>

                                <v-btn
                                outlined
                                color="orange"
                                @click="validate()"
                                :disabled='isDisabled'
                                v-if="this.action!='update'"
                                >
                                Save
                                </v-btn>
                                <v-btn
                                outlined
                                color="orange"
                                @click="validations(mainID)"
                                :disabled='isDisabled'
                                v-else
                                >
                                Update
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
                                    :headers="headerpc"
                                    :items="post_physical_count"
                                    :page.sync="post_physical_count_page"
                                    @page-count="post_physical_count_pageCount = $event"
                                    :footer-props="{
                                    showFirstLastPage: false,
                                    'items-per-page-options':[10],
                                    'disable-items-per-page': true}"
                                    
                                >

                                    <template v-slot:item.pcount="props">
                                        <v-text-field
                                            class="mt-2"
                                            v-model="props.item.pcount"
                                            readonly=""
                                            color="orange"
                                        ></v-text-field>
                                    </template>
                                    <template v-slot:item.product_info.is_vatable="props">
                                        {{ props.item.product_info.is_vatable == 1 ? 1.12 : props.item.product_info.is_vatable }}
                                    </template>
                                
                                </v-data-table>

                                <v-pagination
                                color="orange"
                                v-model="post_physical_count_page"
                                :length="post_physical_count_pageCount"
                                ></v-pagination>
                                
                                </v-card>

                                <v-btn text
                                color="orange"
                                v-if="$store.getters.valAccess(217)"
                                @click="updaterecount(mainID)">
                                Recount
                                </v-btn>


                                <v-btn
                                outlined
                                color="orange"
                                v-if="$store.getters.valAccess(216)"
                                @click="completerecount(mainID)"
                                >
                                Post
                                </v-btn>

                            </v-stepper-content>

                            <v-stepper-content step="3">
                                <v-card
                                class="mb-12"
                                color="white lighten-1"
                                height="100%"
                                >
                                
                                <v-data-table
                                id="showselectcheckbox"
                                    :headers="headercompletepc"
                                    :items="complete_physical_count"
                                    :page.sync="complete_physical_count_page"
                                    @page-count="complete_physical_count_pageCount = $event"
                                    :footer-props="{
                                    showFirstLastPage: false,
                                    'items-per-page-options':[10],
                                    'disable-items-per-page': true}"
                                    
                                >

                                    <template v-slot:item.pcount="props">
                                        <v-text-field
                                            class="mt-2"
                                            v-model="props.item.pcount"
                                            readonly=""
                                            color="orange"
                                        ></v-text-field>
                                    </template>
                                    <template v-slot:item.product_info.is_vatable="props">
                                        {{ props.item.product_info.is_vatable == 1 ? 1.12 : props.item.product_info.is_vatable }}
                                    </template>
                                
                                </v-data-table>

                                <v-pagination
                                color="orange"
                                v-model="complete_physical_count_page"
                                :length="complete_physical_count_pageCount"
                                ></v-pagination>

                                </v-card>

                                <v-btn
                                outlined
                                color="orange"
                                @click="adddialog = false"
                                >
                                Close
                                </v-btn>
                            </v-stepper-content>
                            </v-stepper-items>
                        </v-stepper>
                    </template>


            </v-card>
        </v-dialog>
        <!-- end stepper -->

        <!-- start diaglog for picking products -->
        <template v-if="$vuetify.breakpoint.smAndDown">
            <v-row justify="center">
                <v-dialog
                v-model="productdialog"
                scrollable
                max-width="90%"
                >

                <v-card>
                    <v-card-title>Product Selection</v-card-title>
                    <v-divider></v-divider>
                    <v-card-text style="height: 300px;">

                        <v-combobox
                            single-line
                            v-model="locations"
                            label="Location from"
                            :items="location_info"
                            @change="changelocfrom()"
                            color="orange"
                        ></v-combobox>

                        <v-data-table
                        id="showselectcheckbox"
                            v-model="prodlist"
                            :headers="headerprod"
                            :items="product_info"
                            hide-default-footer
                            ipagination
                            show-select
                        >
                        
                        </v-data-table>


                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-actions>
                    <v-btn
                        color="orange"
                        text
                        @click="productdialog = false"
                    >
                        Close
                    </v-btn>
                    <v-btn
                        color="orange"
                        text
                        @click="getproduct()"
                    >
                        Proceed
                    </v-btn>
                    </v-card-actions>
                </v-card>
                </v-dialog>
            </v-row>
        </template>

        <template v-if="$vuetify.breakpoint.mdAndUp">
            <v-row justify="center">
                <v-dialog
                v-model="productdialog"
                scrollable
                max-width="70%"
                >

                <v-card>
                    <v-card-title>Product Selection</v-card-title>
                    <v-divider></v-divider>
                    <v-card-text style="height: 300px;">

                        <v-combobox
                            single-line
                            v-model="locations"
                            label="Location from"
                            :items="location_info"
                            @change="changelocfrom()"
                            color="orange"
                        ></v-combobox>

                        <v-data-table
                        id="showselectcheckbox"
                            v-model="prodlist"
                            :headers="headerprod"
                            :items="product_info"
                            hide-default-footer
                            disable-pagination
                            show-select
                        >
                        
                        </v-data-table>


                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-actions>
                    <v-btn
                        color="orange"
                        text
                        @click="productdialog = false"
                    >
                        Close
                    </v-btn>
                    <v-btn
                        color="orange"
                        text
                        @click="getproduct()"
                    >
                        Proceed
                    </v-btn>
                    </v-card-actions>
                </v-card>
                </v-dialog>
            </v-row>
        </template>

        <!-- end diaglog for picking products -->




    <!-- clear selection dialog -->
        <template>
            <v-row justify="center">
                <v-dialog
                v-model="clearselections"
                persistent
                max-width="290"
                >
                <v-card>
                    <v-card-title class="text-h5">
                    Clear Selection?
                    </v-card-title>
                    <v-card-text>Changing location will clear all the selected products</v-card-text>
                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="orange"
                        text
                        @click.stop="goback()"
                    >
                        Disagree
                    </v-btn>
                    <v-btn
                        color="orange"
                        text
                        @click="clearselect()"
                    >
                        Agree
                    </v-btn>
                    </v-card-actions>
                </v-card>
                </v-dialog>
            </v-row>
        </template>

    <!-- end clear selection dialog -->

  </v-container>
    
</template>

<script>

  import productcountservices from '../services/productcountservices';
  import inventoryservices from "../services/inventoryservices";
  import locationservices from "../services/locationservices";

  export default {
    name: 'PhysicalCount',
    data: () => ({
        loading: false,
        page: 1,
        pageCount: 0,
        physical_count_page: 1,
        physical_count_pageCount: 0,
        post_physical_count_page: 1,
        post_physical_count_pageCount: 0,
        complete_physical_count_page: 1,
        complete_physical_count_pageCount: 0,
        e1: 1,
        adddialog: false,
        productdialog: false,
        clearselections: false,
        product_count: [],
        product_count_information: [],
        headers: [],
        search: '',
        headersMap: [
          { text: 'Reference No.', value: 'id' },
          { text: 'Date Created', value: 'created_at' },
          { text: 'Created By', value: 'created_by' },
          { text: 'Date Posted', value: 'date_posted' },
          { text: 'Posted By', value: 'posted_by' },
          { text: 'Status', value: 'status' }
        ],
        headerprod: [
          { text: 'Product', value: 'product_info.name' },
          { text: 'UOM', value: 'product_info.unit_info.initial' },
          { text: 'Brand', value: 'product_info.sub_category_info.name' },
        ],

        headerpc: [
          {
            text: 'Product Name',
            value: 'product_info.name',
            fixed: true,
            sortable: false,
            scrollable: true
          },
          { text: 'UM', value: 'product_info.unit_info.initial' },
          { text: 'Physcial Count', value: 'pcount' },
          { text: 'Department', value: 'product_info.department_info.name' },
          { text: 'Brand Name', value: 'product_info.sub_category_info.name' },
          { text: 'Unit Cost', value: 'product_info.cost' },
          { text: 'Vatable', value: 'product_info.is_vatable' },
          { text: 'Net Cost', value: 'net_unit_cost' },
          { text: 'Total Net Cost', value: 'totals' }
        ],
        headercompletepc: [
          {
            text: 'Product Name',
            value: 'product_info.name',
            fixed: true,
            sortable: false,
            scrollable: true
          },
          { text: 'UM', value: 'product_info.unit_info.initial' },
          { text: 'Physcial Count', value: 'pcount' },
          { text: 'Stocks', value: 'stock_on_hand' },
          { text: 'Variance', value: 'variance' },
          { text: 'Department', value: 'product_info.department_info.name' },
          { text: 'Brand Name', value: 'product_info.sub_category_info.name' },
          { text: 'Unit Cost', value: 'product_info.cost' },
          { text: 'Vatable', value: 'product_info.is_vatable' },
          { text: 'Net Cost', value: 'net_unit_cost' },
          { text: 'Total Net Cost', value: 'totals' }
        ],
        post_physical_count: [],
        complete_physical_count: [],
        physical_count: [],
        product_info: [],
        location_info: [],
        locations: "",
        prodlist: [],
        numberRules: [
            v => Number(v) !== 0  || 'Required',
            v => !!v  || 'Number is required',
        ],
        valid: false,
        selectedcombo: "",
        physical_informations: [],
        physical_information_main: [],
        action: "",
        mainID: 0,
        selectedHeaders: []
    }),
    created(){
        this.adddialog = false;
        this.productdialog = false;
        this.$store.state.header = true;
        this.$store.state.footer = true;
        this.$store.state.snackbar.color = 'orange';
        this.FetchLocationInformation();
        this.FetchProductCountInformation();

        this.headers = Object.values(this.headersMap);
        this.selectedHeaders = this.headers;
    },
    computed: {
      isDisabled() {
        // you can  check your form is filled or not here.
        
        return this.valid === false
      },

      //Done to get the ordered headers
      showHeaders () {
        return this.headers.filter(s => this.selectedHeaders.includes(s));
      }
    },
    mounted(){
        this.$store.state.title = "Physical Count";
    },
    methods: {

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
        // form validation required fields
        validate(){

            let val = this.$refs.form.validate();

            this.valid = true;

            if(val){
                this.proceedpost();
            }
        },

        // form validation required fields
        validations(x){
            let val = this.$refs.form.validate();

            this.valid = true;

            if(val){
                this.updateproceedpost(x);
            }
        },

        // saving physical count  to post physical count
        proceedpost(){
            this.savePhysicalCount();
            this.post_physical_count = this.physical_count;
        },

        // update physical count  to physical count
        updateproceedpost(x){
            this.updatePhysicalCount(x);
            this.post_physical_count = this.physical_count;
        },

        // get product count information
        FetchProductCountInformation(){

            let payload = {
                branch_id: this.$store.getters.getBranchID
            };
            productcountservices.fetchProductCountInformation(payload,  this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    this.product_count = response.data.result;
                }
            }).catch(error => console.log(error));

        },

        // show dialog product selection
        NewProductCount(){
            this.adddialog = true;
            this.FetchProductInformation();
        },

        // change location from product selection
        changelocfrom(){
            if(this.prodlist!=""){
                this.clearselections = true
            }else{
                if(this.selectedcombo==""){
                    this.selectedcombo = this.locations;
                }
            this.FetchProductInformation(this.locations['value']);
            }
        },

        // clear fields
        clearselect(){
            this.prodlist = [];
            this.clearselections = false
            this.selectedcombo = this.locations;
        },

        // show dialog for product selection
        goback(){
            this.locations =  this.selectedcombo;
            this.clearselections = false
        },

        // update recount id status
        updaterecount(id){

            let payload = {

                pcount_main: id,
                status: 1
            };
            
            productcountservices.updateProductCountMainInformation(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    this.$store.state.snackbar.message = 'Product is ready for recount.';
                    this.$store.state.snackbar.show = true;
                    this.adddialog = false;
                    this.productdialog = false;
                    this.$store.state.snackbar.colors = 'xgreen';
                    this.$store.state.snackbar.icon = "mdi-check-circle-outline";                           
                    this.FetchProductCountInformation();
                }else{
                    this.$store.state.snackbar.colors = 'xred';
                      this.$store.state.snackbar.icon = "mdi-alert-outline";                      
                  }
            }).catch(error => console.log(error));
        },

        // complete recount information
        completerecount(id){

            let payload = {

                pcount_main: id,
                status: 2,
                posted_by: this.$store.getters.getUserID,
            };
            
            productcountservices.updateProductCountMainInformation(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    this.$store.state.snackbar.message = 'Product count has been successfully posted.';
                    this.$store.state.snackbar.show = true;
                    this.adddialog = false;
                    this.productdialog = false;
                    this.$store.state.snackbar.colors = 'xgreen';
                    this.$store.state.snackbar.icon = "mdi-check-circle-outline";    
                    this.FetchProductCountInformation();
                }else{
                    this.$store.state.snackbar.colors = 'xred';
                      this.$store.state.snackbar.icon = "mdi-alert-outline";                      
                  }
            }).catch(error => console.log(error));
        },

        // get product count information via id
        FetchProductCountInformationViaID(id){
            let payload = {
                pcount_main_id: id
            };
            productcountservices.fetchProductCountInformationViaID(payload,  this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    console.log(response.data.result)
                    this.physical_count = response.data.result;
                    this.adddialog = true
                    this.e1 = 1
                    this.action = response.data.status;
                    this.mainID = id;
                }
            }).catch(error => console.log(error));
        },

        // get product count information via post product count id
        FetchProductCountInformationViaIDpost(id){
            let payload = {
                pcount_main_id: id
            };
            productcountservices.fetchProductCountInformationViaID(payload,  this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    console.log(response.data.result)
                    this.post_physical_count = response.data.result;
                    this.adddialog = true
                    this.e1 = 2
                    this.action = response.data.status;
                    this.mainID = id;
                }
            }).catch(error => console.log(error));
        },

        // get product count information via complete product count id
        FetchProductCountInformationViaIDcomplete(id){
            let payload = {
                pcount_main_id: id
            };
            productcountservices.fetchProductCountInformationViaID(payload,  this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    console.log(response.data.result)
                    this.complete_physical_count = response.data.result;
                    this.adddialog = true
                    this.e1 = 3
                }
            }).catch(error => console.log(error));
        },

        // get product count information via id
        FetchProductInformation(id){

            let payload = {
                location_id: id,
                business_branch_id: this.$store.getters.getBranchID
            }

            inventoryservices.fetchBranchLocationProductInformation(payload, this.$store.getters.getAccessToken).then(response => {
                
                    if(response.data.success){
                    this.product_info = response.data.result;
                }
                
            }).catch(error => console.log(error));

        },

        // get location information
        FetchLocationInformation(){

            this.location_info = [];

            let payload = {
                branch_id: this.$store.getters.getBranchID
            };
            
            locationservices.fetchLocationInformationViaBranch(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    response.data.result.forEach((value) => {
                        this.location_info.push({
                            text: value.name,
                            value: value.id
                        });
                    });
                }
            }).catch(error => console.log(error));

        },

        // get product information via product list dialog
        getproduct(){
            this.action = "";
            this.physical_count = this.prodlist;
            this.adddialog = true;
        },

        // save physical count information
        savePhysicalCount(){
            this.physical_information_main = {
                parent_user_id: this.$store.getters.getParentID,
                branch_code: this.$store.getters.getBranchID,
                location_id: this.locations['value'],
                created_by: this.$store.getters.getUserID,
                status: 0
            };
            let payload = {

                physical_information_main: JSON.stringify(this.physical_information_main),
                physical_information_items: JSON.stringify(this.physical_count)
            };
            
            productcountservices.saveProductCountInformation(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    this.$store.state.snackbar.message = 'The product count has been saved. Please wait for posting.';
                    this.$store.state.snackbar.show = true;
                    this.adddialog = false;
                    this.productdialog = false;
                    this.$store.state.snackbar.colors = 'xgreen';
                    this.$store.state.snackbar.icon = "mdi-check-circle-outline";       
                    this.FetchProductCountInformation();
                }else{
                    this.$store.state.snackbar.colors = 'xred';
                      this.$store.state.snackbar.icon = "mdi-alert-outline";                      
                  }
            }).catch(error => console.log(error));
        },

        // update physical count status recount
        updatePhysicalCount(){
            let payload = {

                physical_information_items: JSON.stringify(this.physical_count)
            };
            
            productcountservices.updateProductCountInformation(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    this.$store.state.snackbar.message = 'Recount was successfully completed.';
                    this.$store.state.snackbar.show = true;
                    this.adddialog = false;
                    this.productdialog = false;
                    this.FetchProductCountInformation();
                }
                else{
                    console.log(response.data.message);
                }
            }).catch(error => console.log(error));
        }

    }
  }
</script>

<style>
 #showselectcheckbox .theme--light.v-icon {
  color: orange !important;
}
</style>