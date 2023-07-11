<template>
  <!-- Discount UI -->
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-card>
              <v-card-text>
                <!-- One liner filtering -->
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
&nbsp;
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
      <template v-if="$vuetify.breakpoint.mdAndUp">
        <v-btn
        medium
        dark
          color="orange"
          @click="NewDiscount()"
          v-if="$store.getters.valAccess(42)"
        >
          <v-icon>mdi-plus</v-icon>Create
        </v-btn>
        </template>

        <template v-if="$vuetify.breakpoint.smAndDown">
        &nbsp;<v-btn
        medium
        dark
          color="orange"
          style="padding-left: 12px;padding-right: 12px;"
          @click="NewDiscount()"
          v-if="$store.getters.valAccess(42)"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
        </template>
  </v-toolbar>
</template>
<!-- End One liner filtering -->
<!-- Datatable -->
                            <br>
                  <v-data-table
                      :headers="showHeaders"
                      :items="discount"
                      :search="search"
                      :page.sync="page"
                      @page-count="pageCount = $event"
                      :footer-props="{
                      'items-per-page-options':[10],
                      'disable-items-per-page': true,
    }"
                  >
                 
                  <template v-slot:item.image="props" >
                            <div v-if="props.item.image==null">
                                <v-btn @click="uploadImage(props.item.id)">Add Image</v-btn>
                            </div>
                            <div v-else>
                                <v-img :src="image_path+props.item.image" height="100px" width="100px" @click="uploadImage(props.item.id)"></v-img>
                            </div>
                        </template>
                      <template v-slot:item.name="props" v-if="$store.getters.valAccess(23)">
                          {{ props.item.name }}
                      </template>
                      <template v-slot:item.createdby="props">
                          {{ props.item.created_info.personal_information.lastname }}, {{ props.item.created_info.personal_information.firstname }}
                      </template>
                      <template v-slot:item.createdat="props">
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
                          @click="UpdateDiscount(props.item.id, props.item)"
                          v-if="$store.getters.valAccess(23)"
                      >
                          <v-icon extra small>
                            mdi-file-edit-outline
                          </v-icon>
                          Edit
                      </v-btn>
                      </template>
                      <template v-slot:item.flag="props">
                                    <v-chip
                                        class="ma-2"
                                        color="orange"
                                        outlined
                                        v-if="props.item.flag == '1'"
                                    >
                                        Active
                                    </v-chip>
                                    <v-chip
                                        class="ma-2"
                                        color="red"
                                        outlined
                                        v-else
                                    >
                                        Inactive
                                    </v-chip>
                                </template>
                  </v-data-table>
<!-- End Datatable -->                  
<!-- Pagination -->
                  <v-pagination
                  color="orange"
                  v-model="page"
                  :length="pageCount"
                  ></v-pagination>
<!-- End Pagination -->
              </v-card-text>
          </v-card>
  
        </v-col>
      </v-row>
      <!-- Modal UI Confirmation -->
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
            @click="SaveDiscountInformation()"
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
  <!-- upload image discount confirmation dialog -->
  <template>
  <v-row justify="center">
    <v-dialog
      v-model="uploadimageconfirmation"
      persistent
      max-width="290"
    >
      <v-card>
        <v-card-title class="text-h5">
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
                v-model="image">
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
    <!-- end upload image discount confirmation dialog -->
    <!-- edit confirmation dialog -->
      <template>
    <v-row justify="center">
      <v-dialog
        v-model="editconfirmation"
        persistent
        max-width="290"
      >
        <v-card>
          <v-card-title class="text-h5">
            Edit
          </v-card-title>
          <v-card-text>Are you sure you want to update?</v-card-text>
          <center>
          <v-btn
            elevation="2"
            class="mx-2"
            dark
            outlined
            small
            color="red"
            @click="changeStatusDialogEdit(false)"
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
            @click="confirmUpdate()"
            >
            Confirm
          </v-btn>
        </center>
        <br>
        </v-card>
      </v-dialog>
    </v-row>
  </template>
      <!-- end edit confirmation dialog -->
  
      <!-- delete confirmation dialog -->
      <template>
    <v-row justify="center">
      <v-dialog
        v-model="confirmation"
        persistent
        max-width="290"
      >
        <v-card>
          <v-card-title class="text-h5">
            Delete
          </v-card-title>
          <v-card-text>Are you sure you want to delete <b>{{ this.foDelete.data['name'] }}</b>?</v-card-text>
          <center>
          <v-btn
            elevation="2"
            class="mx-2"
            dark
            outlined
            small
            color="red"
            @click="changeStatusDialog(false)"
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
            @click="confirmDelete()"
            >
            Confirm
          </v-btn>
        </center>
        <br>
        </v-card>
      </v-dialog>
    </v-row>
  </template>
      <!-- end delete confirmation dialog -->
  
      <!-- Add Discount -->
            <v-form
      ref="form"
      v-model="valid"
      lazy-validation
    >
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
            <v-toolbar-title>Add Discount</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
  
          <v-col sm="12" md="6" offset-md="3" class="mt-3 text-center"> 
              <h4>Note: Here you can add another discount information.</h4>
          </v-col>
          <v-col sm="12" md="6" offset-md="3"> 
          <template>
            <center>
            <v-img :src="url"></v-img>
          </center>
            <v-file-input 
            accept="image/*"
            label="Upload Image"
            color="orange"
            prepend-icon="mdi-camera"
            @change="Preview_image()"
            v-model="image">
            </v-file-input>
          </template>
          </v-col>
          <v-col sm="12" md="6" offset-md="3"> 
              <v-text-field
                  v-model="discount_information.name"
                  label="Discount"
                  color="orange"
                  required
                  outlined
                   :counter="50"
                   :rules="nameRules"
              ></v-text-field>
          </v-col>
          <v-col sm="12" md="6" offset-md="3"> 
                <v-combobox
                    outlined
                    color="orange"
                    label="Branch"
                    :items="branchcombo"
                    v-model="branchid"
                  :rules="[v => !!v || 'Branch is required']"
                  ></v-combobox>
              </v-col>
              <v-col
              sm="12" md="6" offset-md="3"
                >
                <v-menu
                ref="start_date"
                v-model="add_start_date"
                color="orange"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="auto"
                >
                <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                    v-model="discount_information.start_date"
                    label="Start Date"
                    hint="YYYY-MM-DD"
                    persistent-hint
                    color="orange"
                    prepend-icon="mdi-calendar"
                    v-bind="attrs"
                    v-on="on"
                    ></v-text-field>
                </template>
                <v-date-picker
                color="orange"
                    v-model="discount_information.start_date"
                    no-title
                    @input="add_start_date = false"
                ></v-date-picker>
                </v-menu>
            </v-col>

            <v-col
            sm="12" md="6" offset-md="3"
                >
                <v-menu
                color="orange"
                ref="end_date"
                v-model="add_end_date"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="auto"
                >
                <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                    v-model="discount_information.end_date"
                    label="End Date"
                    hint="YYYY-MM-DD"
                    color="orange"
                    persistent-hint
                    prepend-icon="mdi-calendar"
                    v-bind="attrs"
                    v-on="on"
                    ></v-text-field>
                </template>
                <v-date-picker
                    v-model="discount_information.end_date"
                    color="orange"
                    no-title
                    @input="add_end_date = false"
                ></v-date-picker>
                </v-menu>
            </v-col>        
            <v-col sm="12" md="6" offset-md="3">
                            <center>
                              <v-col sm="12" md="6">
                                <v-radio-group v-model="radioGroupCustomTag">
                                <div class="row">
                                  <div class="col-sm-6">
                                    
                                    <v-radio
                                        label="Percentage"
                                        value="percentage"
                                        color="orange"
                                        @click="checkCustomTag()"
                                    ></v-radio>
                                  </div>
                                    
                                  <div class="col-sm-6">
                                      <v-radio
                                        label="Amount"
                                        color="orange"
                                        value="amount"
                                        @click="checkCustomTag()"
                                      ></v-radio>  
                                  </div>
                                </div>
                              </v-radio-group>
                              <v-text-field
                                    outlined
                                    color="orange"
                                    label="Value"
                                    v-model="discount_information.amount_percentage"
                                    ></v-text-field>
                              </v-col>
                            </center>
              </v-col>
                  <center>
                  <div class="container">
                        <div class="row">
                            <div class="col-sm-2">
                            </div>
                            <div class="col-sm-6">
                            <b><center>Product Name</center></b>
                            </div>
                            <div class="col-sm-1" style="padding-left: 24px">
                                <v-btn
                                    elevation="2"
                                    class="mx-2"
                                    fab
                                    dark
                                    x-small
                                    color="orange"
                                    @click="addProducts(1)"
                                    >
                                    <v-icon dark>
                                        mdi-note-plus
                                    </v-icon>
                                </v-btn>
                            </div>
                        </div>
                    </div>
                  </center>
              <div class="container addproduct" 
                        v-for="(discount_product_information, counter) in discount_product_information"
                        v-bind:key="counter"
                        >
                        <div class="row">
                            <div class="col-sm-4">
                            </div>
                            <div class="col-sm-4">
                                <v-autocomplete
                                clearable
                                single-line
                                color="orange"
                                v-model="discount_product_information.product_id"
                                :items="product_information"
                                :rules="[v => !!v || 'Product Information is required']"
                                ></v-autocomplete>
                            </div>
                            <div class="col-sm-3" hidden>
                                <v-text-field
                                color="orange"
                                    v-model="discount_product_information.percentage"
                                ></v-text-field>
                            </div>                            
                            <div class="col-sm-1" style="padding: 34px"
                            >
                                <v-btn
                                    elevation="2"
                                    class="mx-2"
                                    fab
                                    dark
                                    x-small
                                    color="red"
                                    @click="deleteProduct(counter,1)"
                                    >
                                    <v-icon dark>
                                        mdi-delete-forever
                                    </v-icon>
                                </v-btn>
                            </div>
                    </div>
                    </div>
                    <center>
                    <v-col sm="12" md="6">
                        <v-btn
                        color="orange"
                        block
                        outlined
                        @click="validate(1)"
                        >
                        Save
                      </v-btn>
                    </v-col>
                    </center>
        </v-card>
      </v-dialog>
      <v-dialog
        v-model="updatediscountdialog"
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
              @click="updatediscountdialog = false"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>Update Discount</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-col sm="12" md="6" offset-md="3" class="mt-3 text-center"> 
              <h4>Note: Here you can add another discount information.</h4>
          </v-col>
          <v-col sm="12" md="6" offset-md="3">
          <template>
            <div v-if="this.changeval==1">
            <center>
            <v-img :src="this.url"></v-img>
          </center>
            </div>
            <div v-else>
            <center>
            <v-img :src="this.image_path+this.image"></v-img>
          </center>
            </div>
            <v-file-input 
            accept="image/*"
            label="Upload Image"
            color="orange"
            prepend-icon="mdi-camera"
            @change="Preview_image_update()"
            v-model="image">
            </v-file-input>
          </template>
        </v-col>
          <v-col sm="12" md="6" offset-md="3"> 
              <v-text-field
                  v-model="discount_information.name"
                  label="Discount"
                  required
                  color="orange"
                  outlined
                   :counter="50"
                   :rules="nameRules"
              ></v-text-field>
          </v-col>
          <v-col sm="12" md="6" offset-md="3"> 
                <v-combobox
                    outlined
                    label="Branch"
                    color="orange"
                    :items="branchcombo"
                    v-model="xbranchid"
                    @change="checkingbranch()"
                  :rules="[v => !!v || 'Branch is required']"
                  ></v-combobox>
              </v-col>
          <v-col
          sm="12" md="6" offset-md="3"
                >
                <v-menu
                color="orange"
                ref="start_date"
                v-model="update_start_date"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="auto"
                >
                <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                    color="orange"
                    v-model="discount_information.start_date"
                    label="Start Date"
                    hint="YYYY-MM-DD"
                    persistent-hint
                    prepend-icon="mdi-calendar"
                    v-bind="attrs"
                    v-on="on"
                    ></v-text-field>
                </template>
                <v-date-picker
                    v-model="discount_information.start_date"
                    no-title
                    color="orange"
                    @input="update_start_date = false"
                ></v-date-picker>
                </v-menu>
            </v-col>
            <v-col
            sm="12" md="6" offset-md="3"
                >
                <v-menu
                    ref="end_date"
                    v-model="update_end_date"
                    :close-on-content-click="false"
                    color="orange"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="auto"
                >
                <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                    v-model="discount_information.end_date"
                    label="End Date"
                    hint="YYYY-MM-DD"
                    color="orange"
                    persistent-hint
                    prepend-icon="mdi-calendar"
                    v-bind="attrs"
                    v-on="on"
                    ></v-text-field>
                </template>
                <v-date-picker
                    v-model="discount_information.end_date"
                    color="orange"
                    no-title
                    @input="update_end_date = false"
                ></v-date-picker>
                </v-menu>
            </v-col>     
            <v-col sm="12" md="6" offset-md="3">
                            <center>
                              <v-col sm="12" md="6" offset-md="3"> 
                                <v-switch
                                                    v-model="discount_information.flag"
                                                    inset
                                                    :label="activeinactive"
                                                    color="orange"
                                                    @change="activeinactivetrigger()"
                                                ></v-switch>
                                              </v-col>  
                              <v-col sm="12" md="6">
                                <v-radio-group v-model="radioUpdateGroupCustomTag">
                                <div class="row">
                                  <div class="col-sm-6">
                                    
                                    <v-radio
                                        label="Percentage"
                                        color="orange"
                                        value="percentage"
                                        @click="checkUpdateCustomTag()"
                                    ></v-radio>
                                  </div>
                                    
                                  <div class="col-sm-6">
                                      <v-radio
                                        label="Amount"
                                        value="amount"
                                        color="orange"
                                        @click="checkUpdateCustomTag()"
                                      ></v-radio>  
                                  </div>
                                </div>
                              </v-radio-group>
                              <v-text-field
                                    label="Value"
                                    color="orange"
                                    outlined
                                    v-model="discount_information.amount_percentage"
                                    
                                    ></v-text-field>
                              </v-col>
                            </center>
              </v-col>
            <center>
                  <div class="container">
                        <div class="row">
                            <div class="col-sm-2">
                            </div>
                            <div class="col-sm-6">
                            <b><center>Product Name</center></b>
                            </div>
                            <div class="col-sm-3" hidden>
                              <b><center>Amount/Percentage</center></b>
                            </div>
                            <div class="col-sm-1" style="padding-left: 24px">

                                <v-btn
                                    elevation="2"
                                    class="mx-2"
                                    fab
                                    dark
                                    x-small
                                    color="orange"
                                    @click="updateAddProducts(1)"
                                    >
                                    <v-icon dark>
                                        mdi-note-plus
                                    </v-icon>
                                </v-btn>
                            </div>
                        </div>
                    </div>
                  </center>
              <div class="container addproduct" 
                        v-for="(discount_product_information, counter) in discount_product_information"
                        v-bind:key="counter"
                        >
                        <div class="row">
                            <div class="col-sm-4">
                            </div>
                            <div class="col-sm-4">
                                <v-autocomplete
                                clearable
                                color="orange"
                                single-line
                                v-model="discount_product_information.product_id"
                                :items="product_information"
                                :rules="[v => !!v || 'Product Information is required']"
                                ></v-autocomplete>
                            </div>
                            <div class="col-sm-3" hidden>
                                <v-text-field
                                color="orange"
                                    v-model="discount_product_information.percentage"
                                ></v-text-field>
                            </div>                            
                            <div class="col-sm-1" style="padding: 34px"
                            >
                                <v-btn
                                    elevation="2"
                                    class="mx-2"
                                    fab
                                    dark
                                    x-small
                                    color="red"
                                    @click="deleteUpdateProduct(counter,1)"
                                    >
                                    <v-icon dark>
                                        mdi-delete-forever
                                    </v-icon>
                                </v-btn>
                            </div>
                    </div>
                    </div>
                    <center>
                    <v-col sm="12" md="6">
                        <v-btn
                        color="orange"
                        block
                        outlined
                        @click="validate(2)"
                        >
                        Update
                      </v-btn>
                    </v-col>
                    </center>
        </v-card>
      </v-dialog>
      </v-form>
    </v-container>
  
  </template>
  
  <script>
  
  import discountservices from '../services/discountservices';
  import productservices from "../services/productservices";

  
    export default {
      name: 'Discount',
      created() {
          this.FetchDiscountInformation();
          this.fetchProductInformation();
          this.$store.state.snackbar.color = 'orange darken-1';
          this.headers = Object.values(this.headersMap);
        this.selectedHeaders = this.headers;
      },
      mounted(){
          this.$store.state.title = "Discount";
      },
      computed: {
      showHeaders () {
        return this.headers.filter(s => this.selectedHeaders.includes(s));
      }
    },
      data: () => ({
        menucolumn: false,
        activeinactive : 'Active',
        search: '',
        page: 1,
        pageCount: 0,
        customupdatechecks: false,
        customupdatecheck: '',
        customcheck: '',
        url: null,
        image: null,
        total_count:0,
        disbutton:false,
        custom: false,
        changeval:0,
        errorImage: "url of an image to use to indicate an error",
        branchid:'',
        xbranchid:[],
        discountIDUpdate:0,
        discountID: 0,
          update_start_date: false,
          add_start_date: false,
          branchcombo:[],
          update_end_date: false,
          add_end_date: false,
          dialog: false,
          radioUpdateGroupCustomTag:'',
          radioUpdateGroupTag:'',
          radioGroupCustomTag:'',
          radioGroupTag:'',
          image_path: [],
          discount_information: {
              name: '',
              start_date: '',
              end_date: '',
              amount_percentage: '0',
              is_custom:'',
              is_special:'',
              is_percentage:''
          },
          headers:[],
        selectedHeaders: [],
        headersMap: [
          {
            text: 'Image',
            align: 'start',
            sortable: false,
            value: 'image',
          },
            {
              text: 'Discount',
              align: 'start',
              sortable: true,
              value: 'name',
            },
            { text: 'Start Date', align: 'start',
              sortable: false, value: 'start_date'},
            { text: 'End Date',sortable: false, value: 'end_date'},
            { text: 'Created By',sortable: false, value: 'createdby' },
            { text: 'Created At', sortable: false,value: 'createdat' },
            {text: 'Status',sortable:false,value: 'flag'},
            { text: 'Action',sortable: false, value: 'action' }
          ],
          discount: [],
          
          product_information: [],
          valid: true,
          numberRule: [
          v => (!isNaN(parseFloat(v))) || 'Number has to be between 0 and 999'],
          nameRules: [
          v => !!v || 'Discount Name is required',
          ],
          confirmation: false,
          saveconfirmation: false,
          editconfirmation: false,
          uploadconfirmation: false,
          uploadimageconfirmation: false,
          updatediscountdialog: false,
          foDelete: {
              id: 0,
              data: ''
          },
          discount_product_information_delete:[
                {
                    id: ''
                }
        ],
        discount_product_information:[
                {
                    product_id: '',
                    percentage: ''
                }
        ],
        xdiscount_product_information: [
                {
                    product_id: '',
                    percentage: ''
                }
        ],
        paymenttypecombos:{
            name:'',
            value:'',
            id:''
        },        
          foUpdate:{
              id: 0,
              name: '',
              start_date: '',
              end_date: '',
              flag:'',
              amount_percentage: '',
              is_custom:'',
              is_special:'',
              discount_product_information:'',
              discount_product_information_delete:''
              }
      }),
      methods: {
        // Preview Image
        Preview_image() {
          console.log(this.image);
          if(!this.image){
            this.url=null;
            return;
          } 
          this.url= URL.createObjectURL(this.image);
        },
        // Preview image on Update
        Preview_image_update() {
          this.changeval = 1;
          this.url= URL.createObjectURL(this.image);
        },        
        changeStatusDialogUploadImageProduct(status){
            this.uploadimageconfirmation = status;
            this.fetchProductInformation();
        },
        uploadImage(id){
            this.image = null;
            this.url = null;
            this.discountID = id
            this.uploadimageconfirmation = true
        },
        // Get Branch information
        FetchBranchComboInformation(){
              let payload = {
                  user_id: this.$store.getters.getParentID
              };
              discountservices.fetchBranchComboInformation(payload, this.$store.getters.getAccessToken).then(response => {
                  if(response.data.success){
                      response.data.result.forEach((value) => {
                        this.branchcombo.push({
                            text: value.branch_name,
                            value: value.id
                        });
                    });
                  }
              }).catch(error => console.log(error));
          },
          checkingbranch(){
          },
        checkUpdateDiscountTag(item){
            if(item.is_custom == 1){
              this.radioUpdateGroupTag = 'custom';
            }
            if(item.is_special == 1){
              this.radioUpdateGroupTag = 'special';
            }
          },
          checkUpdateDiscountCustomTag(item){
            if(item.is_percentage == 1){
              this.radioUpdateGroupCustomTag = 'percentage';
            } else if(item.is_percentage == 0){
              this.radioUpdateGroupCustomTag = 'amount';
            }else{
              this.radioUpdateGroupCustomTag = '';
            }
          },
        checkTag(){
            if( this.customcheck == 'custom' ){
              this.discount_information['is_custom'] = 1;
              this.custom = true;
              this.discount_information['is_special'] = 0;
            } else{
              this.custom = false;
              this.discount_information['is_custom'] = 0;
              this.discount_information['is_special'] = 1;
            }
          },
          checkCustomTag(){
            if( this.radioGroupCustomTag == 'percentage' ){
              this.discount_information['is_percentage'] = 1;
            } else if(this.radioGroupCustomTag == 'amount'){
              this.discount_information['is_percentage'] = 0;
            }else{
              this.discount_information['is_percentage'] = 2;
            }
          },
          checkUpdateTag(){

            if( this.customupdatecheck == 'custom' ){
              this.discount_information['is_custom'] = 1;
              this.customupdatechecks=true
              this.discount_information['is_special'] = 0;
            } else{
              this.discount_information['is_custom'] = 0;
              this.customupdatechecks=false
              this.discount_information['is_special'] = 1;
            }
          },
          checkUpdateCustomTag(){
            if( this.radioUpdateGroupCustomTag == 'percentage' ){
              this.discount_information['is_percentage'] = 1;
            } else if(this.radioUpdateGroupCustomTag == 'amount'){
              this.discount_information['is_percentage'] = 0;
            }else{
              this.discount_information['is_percentage'] = 2;
            }
          },
          uploadFile() {
            this.Images = this.$refs.file.files[0];
          },
          uploadfileopen() {
            this.uploadconfirmation = true;
          },
          changeStatusDialogUpload(status){
              this.uploadconfirmation = status;
          },
          changeStatusDialog(status){
              this.confirmation = status;
          },
          changeStatusDialogSave(status){
              this.saveconfirmation = status;
          },
          changeStatusDialogEdit(status){
              this.editconfirmation = status;
              this.FetchDiscountInformation();
          },
          activeinactivetrigger(){
                if(this.discount_information.flag ==1){
                    this.activeinactive = 'Active'
                    this.discount_information.flag = 1
                }else{
                    this.activeinactive = 'Inactive'
                    this.discount_information.flag = 0
                }
            },
          addProducts(){
            this.discount_product_information.push({
              product_id: '',
              percentage: ''
            })
          },
          updateAddProducts(){
            this.discount_product_information.push({
              product_id: '',
              percentage: ''
            })
          },
          deleteProduct(counter){
            this.discount_product_information.splice(counter,1)
            },
            deleteUpdateProduct(counter){
            var thisForDelete = this.discount_product_information[counter]
              this.discount_product_information.splice(counter,1)
            let arrProd  = []; 
              arrProd.push(thisForDelete)
              this.discount_product_information_delete = arrProd;
            },      
            // Get product information 
        fetchProductInformation(){
            this.discountID;
            this.product_information = [];
            this.discount_product_information = [];

            let payload = {
                id:this.discountID,
                user_id: this.$store.getters.getParentID
            }
            productservices.fetchProductInformation(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    var prod = {}
                    response.data.result.forEach((value) => {
                        this.product_information.push({
                            text: value.name,
                            value: value.id
                        });
                    });
                    this.productFullInfo = prod
                }
                else{
                    console.log(response.data.message);
                }
            }).catch(error => console.log(error));
        },
        UpdateImageProductInformation(){
          const formData = new FormData();
          formData.append('file', this.image);
          formData.append('id', this.discountIDUpdate);

          discountservices.updateImageDiscountInformation(formData, this.$store.getters.getAccessToken).then(response => {
              if(response.data.success){
                  this.FetchDiscountInformation();
                  this.uploadimageconfirmation = false;
                  this.$store.state.snackbar.message = response.data.message;
                  this.$store.state.snackbar.show = true;
                  this.$store.state.snackbar.colors = 'xgreen';
                    this.$store.state.snackbar.icon = "mdi-check-circle-outline";                      
                }else{
                    this.$store.state.snackbar.colors = 'xred';
                      this.$store.state.snackbar.icon = "mdi-alert-outline";                                          
                }
          }).catch(error => console.log(error));

          },                
        AddImageProductInformation(){
          const formData = new FormData();
          formData.append('file', this.image);
          formData.append('id', this.discountID);

          discountservices.updateImageDiscountInformation(formData, this.$store.getters.getAccessToken).then(response => {
              if(response.data.success){
                  this.FetchDiscountInformation();
                  this.uploadimageconfirmation = false;
                  this.$store.state.snackbar.message = response.data.message;
                  this.$store.state.snackbar.show = true;
                  this.$store.state.snackbar.colors = 'xgreen';
                    this.$store.state.snackbar.icon = "mdi-check-circle-outline";                      
                }
          }).catch(error => console.log(error));
          },        
          FetchDiscountInformation(){
              let payload = {
                  user_id: this.$store.getters.getParentID
              };
              discountservices.fetchDiscountInformation(payload, this.$store.getters.getAccessToken).then(response => {
                  if(response.data.success){
                      this.discount = response.data.result;
                      this.image_path = response.data.img_path;
                  }
              }).catch(error => console.log(error));
          },
          // Add Discount
          NewDiscount(){
              this.dialog = true;
              this.updatediscountdialog = false;
              this.FetchBranchComboInformation();
              this.fetchProductInformation();
              this.ClearSaveDiscount();
              this.Preview_image();
          },
          UpdateDiscount(id, item){
            this.discountIDUpdate = id;
              this.fetchProductInformation();
              this.FetchBranchComboInformation();
              this.FetchDiscountInformation();
              this.discount_information.flag = item.flag;
              this.activeinactivetrigger();
              this.updatediscountdialog = true;
              this.dialog = false;
              this.checkUpdateDiscountTag(item);
              this.checkUpdateTag(this.customupdatecheck);
              this.checkUpdateDiscountCustomTag(item);
              this.discount_information.name = item.name;
              this.discount_information.start_date = item.start_date;
              this.discount_information.end_date = item.end_date;
              this.image = item.image;
              this.xbranchid.text = item.branch_info.branch_name;
              this.xbranchid.value = item.branch_info.id;
              this.discount_information.amount_percentage = item.amount_percentage;
              this.discount_product_information = item.discount_product_information;
              this.discount_information.is_custom = item.is_custom;
              this.discount_information.is_special = item.is_special;
              this.discount_information.is_percentage = item.is_percentage;
              this.discount_information.amount_percentage = item.amount_percentage;
          },
          validate(id){
              let val = this.$refs.form.validate();
              if(val){
                if(id==1){
                    this.confirmSave();                
                }else{
                    this.UpdateDiscountInformation()
                }
              }
          },
          confirmSave(){
              this.saveconfirmation = true
              this.checkCustomTag();
          },
          // Save Discount
          SaveDiscountInformation(){
            this.discount_information['is_special'] = 0;
            this.discount_information['is_custom'] = 1;
            this.branchinfo = {
                parent_user_id: this.$store.getters.getParentID,
                business_branch_id: this.branchid.value,
                discount_id: this.discountID,
                is_custom: 1,
                is_special: 0,
                created_by: this.$store.getters.getUserID
              };
            this.discount_information['discount_product_information'] = this.discount_product_information
            this.discount_information['branchinfo'] = this.branchinfo;
            const formData = new FormData();
            formData.append('file', this.image);
            formData.append('discount_information', JSON.stringify(this.discount_information));
              discountservices.saveDiscountInformation(formData, this.$store.getters.getAccessToken).then(response => {
                  if(response.data.success){
                      this.dialog = false;
                      this.FetchDiscountInformation();
                      this.ClearSaveDiscount();
                      this.$store.state.snackbar.message = response.data.message;
                      this.$store.state.snackbar.colors = 'xgreen';
                      this.$store.state.snackbar.icon = "mdi-check-circle-outline";                      
                      this.$store.state.snackbar.show = true;
                      this.saveconfirmation = false
                  }else{
                    this.$store.state.snackbar.colors = 'xred';
                      this.$store.state.snackbar.icon = "mdi-alert-outline";                      
                  }
              }).catch(error => console.log(error));
          },
          ClearSaveDiscount(){
              this.discount_information.name = '';
              this.discount_information.start_date = '';
              this.discount_information.end_date = '';
              this.image = null;
              this.url = null;
              this.branchid = '';
              this.xbranchid = '';
              this.discount_information.amount_percentage = '';
              this.radioGroupCustomTag = "custom";
          },
          confirmUpdate(){
            this.branch_info = {
                parent_user_id: this.$store.getters.getParentID,
                business_branch_id: this.xbranchid.value,
                created_by: this.$store.getters.getUserID,
                flag:1,
             };
               var discID = this.foUpdate['id'];
                delete this.foUpdate['id']
              let payload = {
                  id: discID,
                  branch_info: JSON.stringify(this.branch_info),
                  discount_information: JSON.stringify(this.foUpdate),
                  discount_product_information_delete: JSON.stringify(this.arrProd)
              }          
              discountservices.updateDiscountInformation(payload, this.$store.getters.getAccessToken).catch(error => console.log(error));
              this.UpdateImageProductInformation();
              this.$store.state.snackbar.message = 'Discount information has been updated.';
              this.$store.state.snackbar.show = true;
              this.$store.state.snackbar.colors = 'xgreen';
              this.$store.state.snackbar.icon = "mdi-check-circle-outline";
              this.FetchDiscountInformation();
              this.editconfirmation = false
              this.updatediscountdialog = false;
          },
          UpdateDiscountInformation(){
              this.foUpdate = {
                  id: this.discountIDUpdate,
                  name: this.discount_information['name'],
                  start_date: this.discount_information['start_date'],
                  end_date: this.discount_information['end_date'],
                  amount_percentage: this.discount_information['amount_percentage'],
                  is_percentage: this.discount_information['is_percentage'],
                  is_special: this.discount_information['is_special'],
                  is_custom: this.discount_information['is_custom'],
                  flag: this.discount_information['flag'],
                  discount_product_information: this.discount_product_information,
                  discount_product_information_delete : this.discount_product_information_delete             
              }
              this.editconfirmation = true
          },
            confirmDelete(){
              this.discount.splice(this.discount.indexOf(this.foDelete['data']), 1);
              let payload = {
                  id: this.foDelete['id']
              };
              discountservices.removeDiscountInformation(payload, this.$store.getters.getAccessToken).catch(error => console.log(error));
              this.$store.state.snackbar.message = 'Discount information has been removed.';
              this.$store.state.snackbar.show = true;
              this.$store.state.snackbar.colors = 'xgreen';
              this.$store.state.snackbar.icon = "mdi-check-circle-outline";              
              this.confirmation = false
          },
          RemoveDiscountInformation(id, data){
              this.foDelete = {
                  id: id,
                  data: data
              }
              this.confirmation = true
          },
          ExportDiscountInformation(){
              let payload = {
                  user_id: this.$store.getters.getParentID
              };
              discountservices.exportDiscountInformation(payload, this.$store.getters.getAccessToken)
              .then(response => {
                  const url = window.URL.createObjectURL(new Blob([response.data]))
                  const link = document.createElement('a')
                  link.href = url
                  link.setAttribute('download','discount.xlsx')
                  document.body.appendChild(link)
                  link.click()
              }).catch(error => console.log(error));
          },
            ImportDiscountInformation() {
              let loader = this.$loading.show();
              const formData = new FormData();
              formData.append('file', this.Images);
              formData.append('created_by', this.$store.getters.getUserID);
              formData.append('parent_user_id', this.$store.getters.getParentID);
              const headers = { 'Content-Type': 'multipart/form-data' };
              discountservices.importDiscountInformation(formData,headers, this.$store.getters.getAccessToken)
              .then(response => {
                      loader.hide();
              this.$store.state.snackbar.message = 'Discount information has been imported.';
              this.$store.state.snackbar.show = true;
              this.FetchDiscountInformation();
                console.log(response.data.file)
              this.uploadconfirmation = false
              this.$store.state.snackbar.colors = 'xgreen';
                    this.$store.state.snackbar.icon = "mdi-check-circle-outline";   
              }).catch(error => console.log(error));
            }
      }
    }
  </script>

  <style>
     .v-data-footer__icons-before,
     .v-data-footer__icons-after{
      display: none !important;
    }
    .v-data-footer{
      display:block;
      padding-top: 10px;
    }
    .v-application--is-ltr .v-data-footer__select {
      margin-left: auto;
      margin-right: auto;
    }
    input[type=checkbox] {
  accent-color: orange;
}
  </style>
  