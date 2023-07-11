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
                    <template>
  <v-toolbar dense style="">
    <!-- <v-overflow-btn
      :items="dropdown_font"
      label="Select font"
      hide-details
      class="pa-0"
        overflow
    ></v-overflow-btn> -->
    <!-- <v-overflow> -->
      <!-- <v-divider vertical></v-divider> -->
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
    <!-- </v-overflow> -->

    <!-- <template v-if="$vuetify.breakpoint.mdAndUp"> -->

      <!-- <v-overflow-btn
        :items="headers"
        editable
        label="Select size"
        hide-details
      ></v-overflow-btn> -->

      <!-- <v-divider vertical></v-divider> -->

      <!-- &nbsp; -->
      <!-- <v-btn> -->
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
        &nbsp;<v-icon>mdi-view-column</v-icon>Column
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
        <v-icon>mdi-view-column</v-icon>Column
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
        <!-- </v-btn> -->

      <!-- <v-spacer></v-spacer> -->

      <!-- <v-btn-toggle
        v-model="toggle_multiple"
        color="primary"
        dense
        group
        multiple
      > -->
      &nbsp;
        <!-- insert val access supplier download -->
      <!-- <template v-if="$vuetify.breakpoint.mdAndUp">
        
        <v-btn
          text
          color="orange"
          style="border: thin solid orange;"
          @click="ExportSupplierInformation()"
        >
          <v-icon>mdi-download-outline</v-icon>
        </v-btn>
        &nbsp;
        <v-btn
          text
          color="orange"
          style="border: thin solid orange;"
          @click="uploadfileopen()"
        >
          <v-icon>mdi-upload-outline</v-icon>
        </v-btn>
        </template>

        &nbsp;
        <template v-if="$vuetify.breakpoint.smAndDown">
        
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="orange"
                  dark
                  medium
                  v-bind="attrs"
                  v-on="on"
                >
                <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                  v-for="(item, index) in exportimport"
                  :key="index"
                >
                <div v-if="item.linktrigger == 1">
                  <v-list-item-title @click="uploadfileopen()"> <v-icon>{{ item.icon }}</v-icon>{{ item.text }}</v-list-item-title>
                </div>
                <div v-else>
                  <v-list-item-title @click="ExportSupplierInformation()"> <v-icon>{{ item.icon }}</v-icon>{{ item.text }}</v-list-item-title>
                </div>
                </v-list-item>
              </v-list>
            </v-menu>
        </template> -->


        <!-- <v-btn
          text
          color="orange"
          style="border: thin solid orange;"
        >
          <v-icon>mdi-view-column</v-icon>Column
        </v-btn> -->
       
      <template v-if="$vuetify.breakpoint.mdAndUp">
        <v-btn
        medium
        dark
          color="orange"
          elevation="2"
          @click="AddProduct()"
                          v-if="$store.getters.valAccess(102)"
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
          @click="AddProduct()"
                          v-if="$store.getters.valAccess(102)"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
        </template>
        

        

        
        <!-- <v-btn
          :value="3"
          text
        >
          <v-icon>mdi-format-underline</v-icon>
        </v-btn>

        <v-btn
          :value="4"
          text
        >
          <v-icon>mdi-format-color-fill</v-icon>
        </v-btn> -->
      <!-- </v-btn-toggle> -->


    
    <!-- </template> -->
  </v-toolbar>
</template>

                    <!-- <div class="text-right">
                        <v-select v-model="selectedHeaders" :items="headers" label="Select Columns" multiple outlined return-object>
            <template v-slot:selection="{ item, index }">
              <v-chip v-if="index < 2">
                <span>{{ item.text }}</span>
              </v-chip>
              <span v-if="index === 2" class="grey--text caption">(+{{ selectedHeaders.length - 2 }} others)</span>
            </template>
         </v-select>              
                        <v-btn
                      elevation="2"
                          class="mx-2"
                          dark
                          small
                          outlined
                          color="orange"
                          @click="AddProduct()"
                          v-if="$store.getters.valAccess(102)"
                      >
                          <v-icon small>
                              mdi-plus
                          </v-icon>
                          Create
                      </v-btn>
                    </div>
                    <div class="offset-md-9 col-sm-3">
                                        <v-text-field
                                            v-model="search"
                                            append-icon="mdi-magnify"
                                            label="Search"
                                            outlined
                                            hide-details
                                            color="orange"
                                        ></v-text-field>
                                    </div> -->
                            <br>
                    <v-data-table
                        :headers="showHeaders"
                        :search="search"
                        :items="product"
                                                :page.sync="page"
                      @page-count="pageCount = $event"
                      :footer-props="{
                      'items-per-page-options':[10],
                      'disable-items-per-page': true,
    }"
                    >
                        <template v-slot:item.name="props">
                            <v-edit-dialog
                                :return-value.sync="props.item.name"
                                @save="UpdateProductInformation(props.item.id, 'name', props.item.name)"
                            >
                            {{ props.item.name }}
                            <template v-slot:input>
                                <v-text-field
                                    v-if="$store.getters.valAccess(103)"
                                    v-model="props.item.name"
                                    label="Edit"
                                    single-line
                                ></v-text-field>
                            </template>
                            </v-edit-dialog>
                        </template>
                        <template v-slot:item.description="props">
                            <v-edit-dialog
                                :return-value.sync="props.item.description"
                                @save="UpdateProductInformation(props.item.id, 'description', props.item.description)"
                            >
                            {{ props.item.description }}
                            <template v-slot:input>
                                <v-text-field
                                v-if="$store.getters.valAccess(103)"
                                    v-model="props.item.description"
                                    label="Edit"
                                    single-line
                                ></v-text-field>
                            </template>
                            </v-edit-dialog>
                        </template>
                        <template v-slot:item.sku="props">
                            <v-edit-dialog
                                :return-value.sync="props.item.sku"
                                @save="UpdateProductInformation(props.item.id, 'sku', props.item.sku)"
                            >
                            {{ props.item.sku }}
                            <template v-slot:input>
                                <v-text-field
                                v-if="$store.getters.valAccess(103)"
                                    v-model="props.item.sku"
                                    label="Edit"
                                    single-line
                                ></v-text-field>
                            </template>
                            </v-edit-dialog>
                        </template>
                        <template v-slot:item.barcode="props">
                            <v-edit-dialog
                                :return-value.sync="props.item.barcode"
                                @save="UpdateProductInformation(props.item.id, 'barcode', props.item.barcode)"
                            >
                            {{ props.item.barcode }}
                            <template v-slot:input>
                                <v-text-field
                                v-if="$store.getters.valAccess(103)"
                                    v-model="props.item.barcode"
                                    label="Edit"
                                    single-line
                                ></v-text-field>
                            </template>
                            </v-edit-dialog>
                        </template>
                        <template v-slot:item.cost="props">
                            <v-edit-dialog
                                :return-value.sync="props.item.cost"
                                @save="UpdateProductInformation(props.item.id, 'cost', props.item.cost)"
                            >
                            {{ props.item.cost }}
                            <template v-slot:input>
                                <v-text-field
                                v-if="$store.getters.valAccess(103)"
                                    v-model="props.item.cost"
                                    label="Edit"
                                    single-line
                                ></v-text-field>
                            </template>
                            </v-edit-dialog>
                        </template>
                        <template v-slot:item.selling_price="props">
                            <v-edit-dialog
                                :return-value.sync="props.item.selling_price"
                                @save="UpdateProductInformation(props.item.id, 'selling_price', props.item.selling_price)"
                            >
                            {{ props.item.selling_price }}
                            <template v-slot:input>
                                <v-text-field
                                v-if="$store.getters.valAccess(103)"
                                    v-model="props.item.selling_price"
                                    label="Edit"
                                    single-line
                                ></v-text-field>
                            </template>
                            </v-edit-dialog>
                        </template>

                        <template v-slot:item.product_type="props">
                            <v-edit-dialog
                                :return-value.sync="props.item.product_type_id"
                                @open="SetEditCombobox(props.item.product_type_info.name, props.item.product_type_id, 'product_type')"
                                @save="SaveEditCombobox(props.item, 'product_type')"
                            >
                            {{ props.item.product_type_info.name }}
                            <template v-slot:input  v-if="$store.getters.valAccess(103)">
                                <v-combobox
                                    outlined
                                    label="Type"
                                    :items="product_type"
                                    v-model="selected"
                                    class="pt-5"
                                ></v-combobox>
                            </template>
                            </v-edit-dialog>
                        </template>

                        <template v-slot:item.department="props">
                            <v-edit-dialog
                                :return-value.sync="props.item.department_id"
                                @open="SetEditCombobox(props.item.department_info.name, props.item.department_id, 'department')"
                                @save="SaveEditCombobox(props.item, 'department')"
                            >
                            {{ props.item.department_info.name }}
                            <template v-slot:input  v-if="$store.getters.valAccess(103)">
                                <v-combobox
                                    outlined
                                    label="Department"
                                    :items="department"
                                    v-model="selected"
                                    class="pt-5"
                                ></v-combobox>
                            </template>
                            </v-edit-dialog>
                        </template>
                        
                        <template v-slot:item.category="props">
                            <v-edit-dialog
                                :return-value.sync="props.item.category_id"
                                @open="SetEditCombobox(props.item.category_info.name, props.item.category_id, 'category')"
                                @save="SaveEditCombobox(props.item, 'category')"
                            >
                            {{ props.item.category_info.name }}
                            <template v-slot:input  v-if="$store.getters.valAccess(103)">
                                <v-combobox
                                    outlined
                                    label="Category"
                                    :items="category"
                                    v-model="selected"
                                    class="pt-5"
                                ></v-combobox>
                            </template>
                            </v-edit-dialog>
                        </template>

                        <template v-slot:item.sub_category="props">
                            <v-edit-dialog
                                :return-value.sync="props.item.sub_category_id"
                                @open="SetEditCombobox(props.item.sub_category_info.name, props.item.sub_category_id, 'sub_category')"
                                @save="SaveEditCombobox(props.item, 'sub_category')"
                            >
                            {{ props.item.sub_category_info.name }}
                            <template v-slot:input  v-if="$store.getters.valAccess(103)">
                                <v-combobox
                                    outlined
                                    label="Sub Category"
                                    :items="sub_category"
                                    v-model="selected"
                                    class="pt-5"
                                ></v-combobox>
                            </template>
                            </v-edit-dialog>
                        </template>

                        <template v-slot:item.is_vatable="props">
                            <v-edit-dialog
                                :return-value.sync="props.item.sub_category_id"
                            >
                                <v-chip
                                    class="ma-2"
                                    outlined
                                    color="primary"
                                    v-if="props.item.is_vatable == 1"
                                >
                                    Vatable
                                </v-chip>
                                <v-chip
                                    class="ma-2"
                                    outlined
                                    color="red"
                                    v-else
                                >
                                    Non-Vat
                                </v-chip>
                            <template v-slot:input>
                                <v-radio-group v-model="props.item.is_vatable" @change="UpdateProductInformation(props.item.id, 'is_vatable', props.item.is_vatable)">
                                    <v-radio
                                        label="Vatable"
                                        :value="1"
                                    ></v-radio>
                                    <v-radio
                                        label="Non-Vat"
                                        :value="0"
                                    ></v-radio>
                                </v-radio-group>
                            </template>
                            </v-edit-dialog>
                        </template>
                        <template v-slot:item.created_by="props">
                            {{ props.item.created_info.personal_information != 0 ? props.item.created_info.personal_information.lastname + ' , ' + props.item.created_info.personal_information.firstname : 'No Data' }}
                        </template>
                        <template v-slot:item.created_at="props">
                            {{ props.item.created_at }}
                        </template>
                        <template v-slot:item.action="props">
                            <!-- <v-icon
                                small
                                v-if="$store.getters.valAccess(46)"
                                @click="RemoveProductInformation(props.item.id, props.item)"
                            >
                                mdi-delete
                            </v-icon> -->

                            <v-btn
                          elevation="2"
                          class="mx-2"
                          dark
                          small
                          outlined
                          color="red"
                          v-if="$store.getters.valAccess(104)"
                                @click="RemoveProductInformation(props.item.id, props.item)"
                        >
                        <v-icon
                                small
                                @click="RemoveProductInformation(props.item.id, props.item)"
                            >
                                <!-- v-if="this.$store.getters.valAccess(16)" -->
                                mdi-delete
                            </v-icon>
                          Delete
                      </v-btn>
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

    <!-- Dialog -->
    <v-dialog
      v-model="dialog"
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
            @click="dialog = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Add Product</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <!-- <v-btn
              dark
              text
              @click="SaveProductInformation()"
              id="btn-next" class="btn btn-primary btn-sm p-2" style="font-size: 12px;">
              Save
            </v-btn> -->
          </v-toolbar-items>
        </v-toolbar>

        <v-col sm="12" md="6" offset-md="3" class="mt-3 text-center"> 
            <h4>Note: Here you can add another product information.</h4>
        </v-col>
        <v-col sm="12" md="6" offset-md="3"> 
            <v-text-field
                v-model="product_information.name"
                label="Product Name"
                required
                outlined
                color="orange"
            ></v-text-field>
            <v-text-field
                v-model="product_information.description"
                label="Description"
                required
                outlined
                color="orange"
            ></v-text-field>
            <v-text-field
                v-model="product_information.sku"
                label="SKU"
                required
                outlined
                color="orange"
            ></v-text-field>
            <v-text-field
                v-model="product_information.barcode"
                label="Barcode"
                required
                outlined
                color="orange"
            ></v-text-field>
            <v-text-field
                v-model="product_information.cost"
                label="Cost"
                required
                outlined
                color="orange"
            ></v-text-field>
            <v-text-field
                v-model="product_information.selling_price"
                label="Price"
                required
                outlined
                color="orange"
            ></v-text-field>
            <v-combobox
                outlined
                :items="unit"
                label="Unit"
                color="orange"
                v-model="product_information.unit_id"
            ></v-combobox>
            <v-combobox
                outlined
                label="Type"
                :items="product_type"
                color="orange"
                v-model="product_information.product_type_id"
            ></v-combobox>
            <v-combobox
                outlined
                label="Department"
                color="orange"
                :items="department"
                v-model="product_information.department_id"
            ></v-combobox>
            <v-combobox
                outlined
                label="Category"
                color="orange"
                :items="category"
                v-model="product_information.category_id"
            ></v-combobox>
            <v-combobox
                outlined
                label="Sub Category"
                color="orange"
                :items="sub_category"
                v-model="product_information.sub_category_id"
            ></v-combobox>
            <v-radio-group v-model="product_information.is_vatable" row>
                <v-radio
                    label="Vatable"
                    color="orange"
                    :value="1"
                ></v-radio>
                <v-radio
                    label="Non-Vat"
                    color="orange"
                    :value="2"
                ></v-radio>
            </v-radio-group>
            <center>
                    <v-col sm="12" md="12">
                        <v-btn
                        color="orange"
                        block
                        outlined
                        @click="SaveProductInformation()"
                        id="btn-next" class="btn btn-primary btn-sm p-2" style="font-size: 12px;">
                        Save
                      </v-btn>
                    </v-col>
                  </center>
        </v-col>
      </v-card>
    </v-dialog>

  </v-container>
    
</template>

<script>

  import productservices from "../services/productservices";
  import departmentservices from "../services/departmentservices";
  import categoryservices from "../services/categoryservices";
  import subcategoryservices from "../services/subcategoryservices";
  import unitservices from "../services/unitservices";
  import prodtypeservices from "../services/prodtypeservices";

  export default {
    name: 'Product',
    data: () => ({
        menucolumn: false,
        search: '',
        page: 1,
        pageCount: 0,
        dialog: false,
        loading: false,
        headers:[],
        selectedHeaders: [],
        headersMap: [
          {
            text: 'Product Name',
            align: 'start',
            sortable: true,
            value: 'name',
          },
          { text: 'Description',sortable: false, value: 'description' },
          { text: 'SKU',sortable: false, value: 'sku' },
          { text: 'Barcode',sortable: false, value: 'barcode' },
          { text: 'Cost',sortable: false, value: 'cost' },
          { text: 'Price', sortable: false,value: 'selling_price' },
          { text: 'Type',sortable: false, value: 'product_type' },
          { text: 'Department',sortable: false, value: 'department' },
          { text: 'Category',sortable: false, value: 'category' },
          { text: 'Sub Category',sortable: false, value: 'sub_category' },
          { text: 'Vatable',sortable: false, value: 'is_vatable' },
          { text: 'Created By',sortable: false, value: 'created_by' },
          { text: 'Created At',sortable: false, value: 'created_at' },
          { text: 'Action',sortable: false, value: 'action' }
        ],
        product: [],
        product_type: [],
        department: [],
        category: [],
        unit: [],
        sub_category: [],
        product_information: {
            parent_user_id: 0,
            name: '',
            description: '',
            sku: '',
            barcode: '',
            cost: 0,
            selling_price: 0,
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
        selected: { text: '', value: '' }
    }),
    created(){
        this.$store.state.header = true;
        this.$store.state.footer = true;
        this.FetchProductInformation();
        this.headers = Object.values(this.headersMap);
        this.selectedHeaders = this.headers;        
    },
    mounted(){
        this.$store.state.title = "Product Information";
    },
    computed: {
      //Done to get the ordered headers
      showHeaders () {
        return this.headers.filter(s => this.selectedHeaders.includes(s));
      }
    },
    methods: {
        FetchProductInformation(){

            let payload = {
                user_id: this.$store.getters.getParentID
                // user_id: this.$store.getters.fetchUserInfo.account_information.is_parent == 1 ? this.$store.getters.fetchUserInfo.account_information.id : this.$store.getters.fetchUserInfo.account_information.parent_id
            };

            productservices.fetchProductInformation(payload, this.$store.getters.getAccessToken).then(response => {
                console.log(response.data);
                if(response.data.success){
                    this.product = response.data.result;
                }
            }).catch(error => console.log(error));

        },
        AddProduct(){
            this.dialog = true;
            this.SetNewProductInformation();
            this.FetchProductTypeInformation();
            this.FetchDepartmentInformation();
            this.FetchCategoryInformation();
            this.FetchSubCategoryInformation();
            this.FetchUnitInformation();
        },
        FetchDepartmentInformation(){

            let payload = {
                user_id: this.$store.getters.getParentID
                // user_id: this.$store.getters.fetchUserInfo.account_information.is_parent == 1 ? this.$store.getters.fetchUserInfo.account_information.id : this.$store.getters.fetchUserInfo.account_information.parent_id
            };

            departmentservices.fetchDepartmentInformation(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    response.data.result.forEach((value) => {
                        this.department.push({
                            text: value.name,
                            value: value.id
                        });
                    });
                }
            }).catch(error => console.log(error));

        },
        FetchCategoryInformation(){

            let payload = {
                user_id: this.$store.getters.getParentID
                // user_id: this.$store.getters.fetchUserInfo.account_information.is_parent == 1 ? this.$store.getters.fetchUserInfo.account_information.id : this.$store.getters.fetchUserInfo.account_information.parent_id
            };

            categoryservices.fetchCategoryInformation(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    response.data.result.forEach((value) => {
                        this.category.push({
                            text: value.name,
                            value: value.id
                        });
                    });
                }
            }).catch(error => console.log(error));

        },
        FetchSubCategoryInformation(){

            let payload = {
                user_id: this.$store.getters.getParentID
                // user_id: this.$store.getters.fetchUserInfo.account_information.is_parent == 1 ? this.$store.getters.fetchUserInfo.account_information.id : this.$store.getters.fetchUserInfo.account_information.parent_id
            };

            subcategoryservices.fetchSubCategoryInformation(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    response.data.result.forEach((value) => {
                        this.sub_category.push({
                            text: value.name,
                            value: value.id
                        });
                    });
                }
            }).catch(error => console.log(error));

        },
        FetchProductTypeInformation(){
            let payload = {
                user_id: this.$store.getters.getParentID
                // user_id: this.$store.getters.fetchUserInfo.account_information.is_parent == 1 ? this.$store.getters.fetchUserInfo.account_information.id : this.$store.getters.fetchUserInfo.account_information.parent_id
            };
            prodtypeservices.fetchProductTypeInformation(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    // console.log(response.data.result);
                    response.data.result.forEach((value) => {
                        this.product_type.push({
                            text: value.name,
                            value: value.id
                        });
                    });
                }
            }).catch(error => console.log(error));

        },
        FetchUnitInformation(){
            
            let payload = {
                user_id: this.$store.getters.getParentID
                // user_id: this.$store.getters.fetchUserInfo.account_information.is_parent == 1 ? this.$store.getters.fetchUserInfo.account_information.id : this.$store.getters.fetchUserInfo.account_information.parent_id
            };

            unitservices.fetchUnitInformation(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    response.data.result.forEach((value) => {
                        this.unit.push({
                            text: value.name,
                            value: value.id
                        });
                    });
                }
            }).catch(error => console.log(error));

        },
        SetNewProductInformation(){
            this.product_information = {
                parent_user_id: this.$store.getters.getParentID,
                // parent_user_id: this.$store.getters.fetchUserInfo.account_information.is_parent == 1 ? this.$store.getters.fetchUserInfo.account_information.id : this.$store.getters.fetchUserInfo.account_information.parent_id,
                name: '',
                description: '',
                sku: '',
                barcode: '',
                cost: 0,
                selling_price: 0,
                product_type_id: null,
                unit_id: null,
                department_id: null,
                category_id: null,
                sub_category_id: null,
                is_vatable: 1,
                created_by: this.$store.getters.fetchUserInfo.account_information.id,
                last_update_by: this.$store.getters.fetchUserInfo.account_information.id
            };
            console.log(this.product_information)
        },
        SaveProductInformation(){

            let payload = {
                product_information: JSON.stringify(this.product_information)
            };

            productservices.saveProductInformation(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    this.dialog = false;
                    this.FetchProductInformation();
                    console.log(response.data.message);
                }
                else{
                    console.log(response.data.message);
                }
            }).catch(error => console.log(error));

        },
        UpdateProductInformation(id, name, value){

            let payload = {
                id: id,
                name: name,
                value: value
            };

            productservices.updateProductInformation(payload, this.$store.getters.getAccessToken).catch(error => console.log(error));

        },
        SetEditCombobox(text, value, action){

            this.selected = {
                text: text,
                value: value
            };

            if(action=="product_type"){
                this.FetchProductTypeInformation();
            }
            else if(action=="department"){
                this.FetchDepartmentInformation();
            }
            else if(action=="category"){
                this.FetchCategoryInformation();
            }
            else if(action=="sub_category"){
                this.FetchSubCategoryInformation();
            }

        },
        SaveEditCombobox(item, action){

            if(action=="product_type"){
                item.product_type_info.name = this.selected.text;
                this.UpdateProductInformation(item.id, 'product_type_id', this.selected.value);
            }
            else if(action=="department"){
                item.department_info.name = this.selected.text;
                this.UpdateProductInformation(item.id, 'department_id', this.selected.value);
            }
            else if(action=="category"){
                item.category_info.name = this.selected.text;
                this.UpdateProductInformation(item.id, 'category_id', this.selected.value);
            }
            else if(action=="sub_category"){
                item.sub_category_info.name = this.selected.text;
                this.UpdateProductInformation(item.id, 'sub_category_id', this.selected.value);
            }

        },
        RemoveProductInformation(){

        }
    }
  }
</script>

<style scoped>
input[type=checkbox] {
  accent-color: orange;
}
</style>