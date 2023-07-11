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
      v-model="menusss"
      :close-on-content-click="false"
      :nudge-width="100"
      offset-y
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="orange"
          dark
          v-bind="attrs"
          v-on="on"
        >
        <v-icon>mdi-database</v-icon>Filter Data
        </v-btn>
      </template>

      <v-card>
    <br>
        <v-list>
          <v-list-item>

                <v-combobox
                    outlined
                    dense
                    v-model="locationinformations"
                    label="Type"
                    :items="locationinfo"
                    @change="alertslocationtype('type')"
                    color="orange"
                ></v-combobox>
            </v-list-item>

            <v-list-item>
                <v-combobox
                    outlined
                    dense
                    v-model="tabinfos"
                    label="Location"
                    :items="locationtab"
                    @change="alertslocation('location')"
                    color="orange"
                ></v-combobox>

            </v-list-item>
        </v-list>
      </v-card>
    </v-menu>
  </div>
</template>


    <template  v-if="$vuetify.breakpoint.smAndDown">
  <div class="text-center">
    <v-menu
      v-model="menusss"
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
        <v-icon>mdi-database</v-icon>
        </v-btn>
      </template>

      <v-card>
         <br>
         &nbsp;
      <b>
        Filter by Data
      </b>
        <v-list>
          <v-list-item>

                <v-combobox
                    outlined
                    dense
                    v-model="locationinformations"
                    label="Type"
                    :items="locationinfo"
                    @change="alertslocationtype('type')"
                    color="orange"
                ></v-combobox>
            </v-list-item>

            <v-list-item>
                <v-combobox
                    outlined
                    dense
                    v-model="tabinfos"
                    label="Location"
                    :items="locationtab"
                    @change="alertslocation('location')"
                    color="orange"
                ></v-combobox>
            </v-list-item>

        </v-list>

      </v-card>
    </v-menu>
  </div>
</template>


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
        &nbsp;
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
</template>

        


  </v-toolbar>
</template>
                <br>
                    <v-data-table
                        :headers="showHeaders"
                        :items="product"
                        :search="search"
                        :page.sync="pagestock"
                      @page-count="pageCountstock = $event"
                      :footer-props="{
                      showFirstLastPage: false,
                      'items-per-page-options':[10],
                      'disable-items-per-page': true
    }"                        
                    >
                    
                        <template v-slot:item.product_image="props">
                            <div v-if="!$store.getters.valAccess(120)">
                                <div v-if="props.item.image==null">
                                    <div v-if="props.item.product_info.image==null">
                                        <v-btn disabled @click="uploadImage(props.item.business_branch_id, props.item.product_id)">Add Image</v-btn>
                                    </div>
                                    <div v-else>
                                        <v-img :src="image_path+props.item.product_info.image" height="100px" width="100px"></v-img>
                                    </div>
                                </div>
                                <div v-else>
                                    <v-img :src="image_path+props.item.image" height="100px" width="100px"></v-img>
                                </div>
                            </div>
                            <div v-else>
                                <div v-if="props.item.image==null">
                                    <div v-if="props.item.product_info.image==null">
                                        <v-btn @click="uploadImage(props.item.business_branch_id, props.item.product_id)">Add Image</v-btn>
                                    </div>
                                    <div v-else>
                                        <v-img :src="image_path+props.item.product_info.image" height="100px" width="100px" @click="uploadImage(props.item.business_branch_id, props.item.product_id)"></v-img>
                                    </div>
                                </div>
                                <div v-else>
                                    <v-img :src="image_path+props.item.image" height="100px" width="100px" @click="uploadImage(props.item.business_branch_id, props.item.product_id)"></v-img>
                                </div>
                            </div>
                        </template>

                        <template v-slot:item.product_info.name="props">
                        {{ props.item.product_info.name }}
                        </template>

                        <template v-slot:item.stock_on_hand="props">
                            <div v-if="props.item.product_info.conversion_id==0">
                            {{ parseFloat(props.item.stock_on_hand).toFixed(2) }}
                            </div>
                            <div v-else>
                                
                            {{ "("+parseFloat(props.item.product_info.conversion_info.value)*parseFloat(props.item.stock_on_hand)+" "+props.item.product_info.conversion_info.conversion_id.initial+")" }}
                            {{ props.item.approved_cost }}<br>
                            <font size="1">{{ parseFloat(props.item.stock_on_hand).toFixed(2) }}</font>
                            
                            </div>
                        </template>

                        <template v-slot:item.product_info.cost="props">
                            {{ parseFloat(props.item.product_info.cost).toFixed(2) }}
                        </template>

                        <template v-slot:item.product_info.selling_price="props">
                            {{ parseFloat(props.item.product_info.selling_price).toFixed(2) }}
                        </template>

                        <template v-slot:item.product_info.is_vatable="props">
                            
                                <v-chip
                                    class="ma-2"
                                    outlined
                                    color="orange"
                                    v-if="props.item.product_info.is_vatable == 1"
                                >
                                    Vatable
                                </v-chip>
                                <v-chip
                                outlined
                                    class="ma-2"
                                    color="red"
                                    v-else
                                >
                                    Non-Vat
                                </v-chip>
                           
                        </template>

                        <template v-slot:item.created_info.created_by="props">
                            {{ props.item.created_info.personal_information != 0 ? props.item.created_info.personal_information.lastname + ' , ' + props.item.created_info.personal_information.firstname : 'No Data' }}
                        </template>
                        
                        <template v-slot:item.created_at="props">
                            {{ props.item.created_at }}
                        </template>
                        <template v-slot:item.action="props">
                                <v-btn
                                    elevation="2"
                                    class="mx-2"
                                    dark
                                    small
                                    outlined
                                    color="orange"
                                    v-if="$store.getters.valAccess(119)"
                                    @click="ViewHistory(props.item.product_info.name,props.item.product_info.id, props.item.location_info.id)"
                                    >
                                    <v-icon
                                    :disabled="dialog"
                                    :loading="dialog"
                                    medium
                                    color="orange"
                                    @click="ViewHistory(props.item.product_info.name,props.item.product_info.id, props.item.location_info.id)"
                                >
                                    mdi-archive-eye-outline
                                </v-icon>
                                    View
                                </v-btn> 
                                        <v-dialog
                                        v-model="dialog"
                                        hide-overlay
                                        persistent
                                        width="300"
                                        >
                                        <v-card
                                            color="orange"
                                            dark
                                        >
                                            <v-card-text>
                                            Please stand by
                                            <v-progress-linear
                                                indeterminate
                                                color="white"
                                                class="mb-0"
                                            ></v-progress-linear>
                                            </v-card-text>
                                        </v-card>
                                        </v-dialog>
                            </template>
                    </v-data-table>
                    <v-pagination
                    color="orange"
        v-model="pagestock"
        :length="pageCountstock"
      ></v-pagination>
                </v-card-text>

            </v-card>
            
        </v-col>

    </v-row>

<template>
    <v-col cols="auto">
      <v-dialog
        v-model="historydialog"
        transition="dialog-top-transition"
        max-width="600"
      >
        <template>
          <v-card>
            <v-toolbar
              color="orange"
              dark
            > 
            <h5>Product History</h5>
            <v-spacer></v-spacer><v-toolbar-items><br>{{ this.historyname }}</v-toolbar-items>
         </v-toolbar>
                <br>
                <v-combobox
                    outlined
                    dense
                    max-width="200px"
                    v-model="cmbViewAll"
                    label="Location"
                    :items="alllocationtab"
                    @change="ViewAllHistory()"
                    color="orange"
                ></v-combobox>
                <v-tabs 
                >
                <v-tabs-slider color="orange"></v-tabs-slider>
                <v-tab>
                    <v-icon
                    small
                    :left=true
                    pa=0px
                    color="orange">
                    mdi-database
                    </v-icon>
                    <h6 style="color:orange">Stocks</h6>
                </v-tab>
                <v-tab>
                    <v-icon
                    small
                    :left=true
                    color="orange">
                    mdi-cash-multiple
                    </v-icon>
                    <h6 style="color:orange">Unit Cost</h6>
                </v-tab>

                <v-tab-item>
                    <v-card flat>
                    <v-card-text>
                        <div v-if="this.filtertype=='location'">
                            <v-data-table
                            :headers="headerstock"
                            :items="prodhistoryall"
                            :page.sync="page"
                      @page-count="pageCount = $event"
                      :footer-props="{
                      showFirstLastPage: false,
                      'items-per-page-options':[10],
                      'disable-items-per-page': true
    }"                            
                            >
                            <template v-slot:item.action="props">
                                {{ props.item.action == 1 ? 'Stock In' : props.item.action == 2 ? 'Stock Out' : props.item.action == 3 ? 'Transfer Out' : props.item.action == 4 ? 'Transfer In' : props.item.action == 5 ? 'Disposal' : props.item.action }}
                            </template>
                            <template v-slot:item.qty="props">
                                {{ props.item.get_items[0].approved_qty }}
                            </template>
                            

                            </v-data-table>
                            <v-pagination
                  color="orange"
        v-model="page"
        :length="pageCount"
      ></v-pagination>                             
                        </div>
                        <div v-else>
                            <v-data-table
                            :headers="headerstocktype"
                            :items="prodhistoryall"
                            :page.sync="pagestocktype"
                      @page-count="pageCountstocktype = $event"
                      :footer-props="{
                      showFirstLastPage: false,
                      'items-per-page-options':[10],
                      'disable-items-per-page': true
    }"                            
                            >
                            <template v-slot:item.action="props">
                                {{ props.item.action == 1 ? 'Stock In' : props.item.action == 2 ? 'Stock Out' : props.item.action == 3 ? 'Transfer Out' : props.item.action == 4 ? 'Transfer In' : props.item.action == 5 ? 'Disposal' : props.item.action }}
                            </template>
                            <template v-slot:item.qty="props">
                                {{ props.item.get_items[0].approved_qty }}
                            </template>
                            
                            <template v-slot:item.on_hand="props">
                                {{ props.item.get_items[0].ending_balance }}
                            </template>

                            </v-data-table>
                            <v-pagination
                  color="orange"
        v-model="pagestocktype"
        :length="pageCountstocktype"
      ></v-pagination>                                       
                        </div>
             
                    </v-card-text>
                    </v-card>
                </v-tab-item>
                <v-tab-item>
                    <v-card flat>
                    <v-card-text>
                        <v-data-table
                        :headers="headercost"
                        :items="prodhistoryallremove"
                        :page.sync="pagecost"
                      @page-count="pageCountcost = $event"
                      :footer-props="{
                      showFirstLastPage: false,
                      'items-per-page-options':[10],
                      'disable-items-per-page': true
    }"                                                    
                        >
                        <template v-slot:item.cost="props">
                            {{ props.item.get_items[0].unit_cost }}
                        </template>
                        <template v-slot:item.approved_cost="props">
                            {{ props.item.get_items[0].approved_cost }}
                        </template>
                        
                        </v-data-table>
                    </v-card-text>
                    <v-pagination
                  color="orange"
        v-model="pagecost"
        :length="pageCountcost"
      ></v-pagination>                         
                    </v-card>
                </v-tab-item>
                
                </v-tabs>
                
            <v-card-actions class="justify-end">
              <v-btn
                outlined
                @click="historydialog = false"
                color="orange"
              >Close</v-btn>
            </v-card-actions>
  </v-card>
</template>
      </v-dialog>
    </v-col>
</template>



                 <!-- upload image product confirmation dialog -->
                 <template>
  <v-row justify="center">
    <v-dialog
      v-model="uploadimageconfirmation"
      persistent
      max-width="290"
    >
      <v-card>
        <v-card-title class="text-h5">
          Product
        </v-card-title>
        <v-card-text>Upload image</v-card-text>
          <v-card-text>

            <v-img :src="this.url"></v-img>
            <v-file-input 
                color="orange"
                accept="image/*"
                label="Upload Image"
                prepend-icon="mdi-camera"
                @change="Preview_image()"
                v-model="prod_image">
                </v-file-input>
        </v-card-text>
        <center>
          <v-btn
            elevation="2"
            class="mx-2"
            dark
            outlined
            small
            color="red"
            @click="changeStatusDialogUploadImageProduct(false)"
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
            @click="AddImageProductInformation()"
            >
            Confirm
          </v-btn>
        </center>
        <br>
      </v-card>
    </v-dialog>
  </v-row>
</template>
    <!-- end upload image product confirmation dialog -->

  </v-container>
</template>

<script>

    import inventoryservices from "../services/inventoryservices";
    import locationservices from "../services/locationservices";
    import stockcardservices from "../services/stockcardservices";

  export default {
    name: 'Inventory',
    data: () => ({

        menusss: false,
        menucolumn: false,
        locationinformations: [],
        search: '',
      page: 1,
        pageCount: 0,
        pagecost: 1,
        pageCountcost: 0,                
        pagestock: 1,
        pageCountstock: 0,      
        pagestocktype: 1,
        pageCountstocktype: 0,                
        dialog: false,
        historydialog: false,
        loading: false,
        headers:[],
        selectedHeaders: [],
        alllocationtab: [],
        viewprod_id: "",
        viewprod_name: "",
        cmbViewAll: [],
        locationinfo: [
            {
                text: 'Inventory',
                value: 1
            },
            {
                text: 'Sales',
                value: 2
            }
        ],
        headersMap: [
          {
            text: 'Image',
            align: 'start',
            sortable: false,
            value: 'product_image',
          },
          {
            text: 'Product Name',
            align: 'start',
            sortable: true,
            value: 'product_info.name',
          },
          { text: 'Stock on Hand',sortable: false, value: 'stock_on_hand' },
          { text: 'Cost',sortable: false, value: 'product_info.cost' },
          { text: 'Price',sortable: false, value: 'product_info.selling_price' },
          { text: 'UOM',sortable: false, value: 'product_info.unit_info.initial' },
          { text: 'Department',sortable: false, value: 'product_info.department_info.name' },
          { text: 'Category',sortable: false, value: 'product_info.category_info.name' },
          { text: 'Sub Category',sortable: false, value: 'product_info.sub_category_info.name' },
          { text: 'Vatable',sortable: false, value: 'product_info.is_vatable' },
          { text: 'View History',sortable: false, value: 'action' },
        ],
        headerstock: [
          {
            text: 'Date',
            value: 'approved_at',
            fixed: true,
            sortable: true,
            scrollable: true
          },
          { text: 'Process',sortable: false, value: 'action' },
          { text: 'QTY',sortable: false, value: 'qty' }
        ],
        headerstocktype: [
          {
            text: 'Date',
            value: 'approved_at',
            fixed: true,
            sortable: true,
            scrollable: true
          },
          { text: 'Process',sortable: false, value: 'action' },
          { text: 'QTY',sortable: false, value: 'qty' },
          { text: 'Stocks',sortable: false, value: 'on_hand' },
          { text: 'Location',sortable: false, value: 'location_from_name' }
        ],
        headercost: [
          {
            text: 'Date',
            value: 'approved_at',
            fixed: true,
            sortable: true,
            scrollable: true
          },
          { text: 'Old Unit Cost',sortable: false, value: 'cost' },
          { text: 'New Unit Cost',sortable: false, value: 'approved_cost' }
        ],
        product: [],
        product_type: [],
        unit: [],
        department: [],
        category: [],
        sub_category: [],
        product_information: {
            parent_user_id: 0,
            name: '',
            description: '',
            sku: '',
            barcode: '',
            cost: 0.0000,
            selling_price: 0.0000,
            product_type_id: null,
            unit_id: null,
            department_id: null,
            category_id: null,
            sub_category_id: null,
            is_vatable: 1,
            created_by: 0,
            last_update_by: 0,
            created_info: {
                personal_information: []
            }
        },
        locationtab: [],
        tabinfo:[],
        tabinfos: [],
        tabinfoinventory: [],
        prodhistoryall: [],
        prodhistoryallremove: [],
        tabinfosales: [],
        selected: { text: '', value: '' },
        valid: true,
        nameRules: [
        v => !!v || 'This is a required field',
        v => (v && v.length <= 50) || 'Name must be more than 1 characters',
        ],
        numberRules: [
        v => !!v || 'Number is required',
        v => (v && v.length <= 13) || 'Number must be less than 13 numbers',
        ],
        confirmation: false,
        saveconfirmation: false,
        editconfirmation: false,
        uploadimageconfirmation: false,
        image_branch_id: 0,
        image_product_id: 0,
        filtertype: "type",
        historyname: "",
        image_path: [],
        url: "",
        prod_id: 0,
        prod_image: null,
        loc_type: 0,
        foDelete: {
            id: 0,
            data: ''
        },
        foUpdate: {
            id: 0,
            name: '',
            value: ''
        }
    }),
    created(){
        this.$store.state.header = true;
        this.$store.state.footer = true;
        this.$store.state.snackbar.color = 'orange';
        this.FetchLocationInformationViaBranch();
        this.FetchLocationInformation(0)
        this.FetchLocationInformationViaBranchAndType(1);
        this.headers = Object.values(this.headersMap);
        this.selectedHeaders = this.headers;
    },
    mounted(){
        this.$store.state.title = "Product Inventory Information";
    },
    computed: {
      //Done to get the ordered headers
      showHeaders () {
        return this.headers.filter(s => this.selectedHeaders.includes(s));
      }
    },
    watch: {
      dialog (val) {
            if (!val) return
                 setTimeout(() => {
                this.dialog = false;
                this.historydialog = true;
                }, 1000)
        }
    },
    methods: {

      // display product history
        ViewHistory(prod_name, prod_id, loc_id){
            this.dialog = true
              this.viewprod_name = prod_name;
              this.viewprod_id = prod_id;
              if(this.filtertype=="location"){  
              this.historyname = prod_name
              this.FetchProductInfoViaLoc(prod_id,loc_id)
              }else{
              this.historyname = prod_name
              this.FetchProductInfoViaID(prod_id, this.loc_type)
              }
        },

        // display all history
        ViewAllHistory(){
          
              this.FetchProductInfoViaLoc(this.viewprod_id, this.cmbViewAll.value)

        },

        // display stocks per location
        alertslocation(type){
            this.filtertype = type
            this.FetchProductInformationViaLocation(this.tabinfos.value)
        },

        // display stocks per location type
        alertslocationtype(type){
            this.locationtab = [];
            this.tabinfos = "";
            this.locationinformationsselected = this.locationinformations.value;
            this.filtertype = type
            this.loc_type = this.locationinformationsselected
            this.FetchLocationInformationViaBranchAndType(this.locationinformationsselected);
            this.FetchLocationInformation(this.locationinformationsselected)
        },

        // get dialog status
        changeStatusDialogUploadImageProduct(status){
            this.uploadimageconfirmation = status;
        },

        // uploading image 
        uploadImage(branch_id, prod_branch_id){
            this.prod_image = null;
            this.url = null;
            this.image_branch_id = branch_id
            this.image_product_id = prod_branch_id
            this.uploadimageconfirmation = true
        },

        // preview image to be uploaded
        Preview_image() {
          if(!this.prod_image){
            this.url=null;
            return;
          } 
          this.url= URL.createObjectURL(this.prod_image);
        },

        // get product information via location
        FetchProductInfoViaLoc(prod_id, loc_id){

        let payload = {
            product_id: prod_id,
            location_id: loc_id,
            branch_id: this.$store.getters.getBranchID
        }
        stockcardservices.fetchProductInfoViaLoc(payload, this.$store.getters.getAccessToken).then(response => {
            if(response.data.success){
                this.prodhistoryall = response.data.result;
                this.prodhistoryallremove = response.data.removecost;
            }
        }).catch(error => console.log(error));

        },

        // get product information via ID
        FetchProductInfoViaID(prod_id, type){

        let payload = {
            product_id: prod_id,
            location_type: type,
            branch_id: this.$store.getters.getBranchID
        }
        stockcardservices.fetchProductInfoViaID(payload, this.$store.getters.getAccessToken).then(response => {
            if(response.data.success){
                this.prodhistoryall = response.data.result;
                this.prodhistoryallremove = response.data.removecost;
            }
        }).catch(error => console.log(error));

        },

        // get location information via branch ID
        FetchLocationInformationViaBranch(){

          let payload = {
            branch_id: this.$store.getters.getBranchID
          }
          locationservices.fetchLocationInformationViaBranch(payload, this.$store.getters.getAccessToken).then(response => {
              if(response.data.success){
                  response.data.result.forEach((value) => {
                      this.alllocationtab.push({
                          text: value.name,
                          value: value.id
                      });
                  });
              }
          }).catch(error => console.log(error));

          },

          // get location information via branch id and location type
        FetchLocationInformationViaBranchAndType(id){

            let payload = {
                branch_id: this.$store.getters.getBranchID,
                location_type: id
            }
            locationservices.fetchLocationInformationViaBranchAndType(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    this.tabinfo = response.data.result;
                    
                    response.data.result.forEach((value) => {
                        this.locationtab.push({
                            text: value.name,
                            value: value.id
                        });
                    });
                }
            }).catch(error => console.log(error));

        },

        // get location information
        FetchLocationInformation(id){
          
            let payload = {
                branch_id: this.$store.getters.getBranchID,
                location_type: id
            }
            locationservices.fetchLocationInformationViaType(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    this.product = response.data.result;
                    this.image_path = response.data.img_path;
                }
            }).catch(error => console.log(error));

        },

        // get product information via location id
        FetchProductInformationViaLocation(id){

            let payload = {
                business_branch_id: this.$store.getters.getBranchID,
                location_id: id
            }

            inventoryservices.fetchBranchLocationProductInformation(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    this.product = response.data.result;
                }
            }).catch(error => console.log(error));
        },
        
        // upload image to product
        AddImageProductInformation(){

            const formData = new FormData();
            formData.append('file', this.prod_image);
            formData.append('business_branch_id', this.image_branch_id)
            formData.append('product_id', this.image_product_id)
            formData.append('img_type', 1)

            locationservices.updateImageLocationInformation(formData, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                  
                    this.FetchLocationInformation(1);
                    this.uploadimageconfirmation = false;
                    this.$store.state.snackbar.message = response.data.message;
                    this.$store.state.snackbar.show = true;
                    this.$store.state.snackbar.colors = 'xgreen';
                    this.$store.state.snackbar.icon = "mdi-check-circle-outline";                      
                }
                else{
                  this.$store.state.snackbar.colors = 'xred';
                      this.$store.state.snackbar.icon = "mdi-alert-outline";                      
                    console.log(response.data.message);
                }
            }).catch(error => {console.log(error)
              this.$store.state.snackbar.colors = 'xred';
                      this.$store.state.snackbar.icon = "mdi-alert-outline";   
              });

        }

    }
  }
</script>

<style scoped>
input[type=checkbox] {
  accent-color: orange;
}
</style>