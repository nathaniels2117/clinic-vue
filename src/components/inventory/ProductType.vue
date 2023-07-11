<template>
  <v-container style="max-width: 95%; position: relative;" >
    <v-row>
      <v-col cols="12">
        <v-card>
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
        &nbsp;<v-btn
        medium
        dark
          color="orange"
          elevation="2"
          @click="ExportProductTypeInformation()"
        >
        <!-- insert val access producttype download -->
          <v-icon>mdi-download-outline</v-icon>Download
        </v-btn>
        </template>


        <template v-if="$vuetify.breakpoint.smAndDown">
        &nbsp;<v-btn
        medium
        dark
          color="orange"
          style="padding-left: 12px;padding-right: 12px;"
          @click="ExportProductTypeInformation()"
        >
        <!-- insert val access producttype download -->
          <v-icon>mdi-download-outline</v-icon>
          </v-btn>
        </template>
      <template v-if="$vuetify.breakpoint.mdAndUp">
        &nbsp;<v-btn
        medium
        dark
          color="orange"
          style="border: thin solid orange;min-width: 0;"
          @click="NewProductType()"
          v-if="$store.getters.valAccess(38) || $store.getters.valAccess(59)"
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
          @click="NewProductType()"
          v-if="$store.getters.valAccess(38) || $store.getters.valAccess(59)"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
        </template>

  </v-toolbar>
</template>
                            <br>
                <v-data-table
                    :headers="showHeaders"
                    :items="prodtype"
                    :search="search"
                    :page.sync="page"
                      @page-count="pageCount = $event"
                      :footer-props="{
                      showFirstLastPage: false,
                      'items-per-page-options':[10],
                      'disable-items-per-page': true

    }"
                >
                    <template v-slot:item.name="props">
                        <v-edit-dialog
                            :return-value.sync="props.item.name"
                            @save="UpdateProductTypeInformation(props.item.id, 'name', props.item.name)"
                        >
                        {{ props.item.name }}
                        <template v-slot:input
                        v-if="$store.getters.valAccess(39) || $store.getters.valAccess(60)"
                        >
                            <v-text-field
                                v-model="props.item.name"
                                label="Edit"
                                single-line
                                color="orange"
                            ></v-text-field>
                        </template>
                        </v-edit-dialog>
                    </template>
                    <template v-slot:item.description="props">
                        <v-edit-dialog
                            :return-value.sync="props.item.description"
                            @save="UpdateProductTypeInformation(props.item.id, 'description', props.item.description)"
                        >
                        {{ props.item.description }}
                        <template v-slot:input
                        v-if="$store.getters.valAccess(39) || $store.getters.valAccess(60)"
                        >
                            <v-text-field
                                v-model="props.item.description"
                                label="Edit"
                                single-line
                                color="orange"
                            ></v-text-field>
                        </template>
                        </v-edit-dialog>
                    </template>
                    <template v-slot:item.created_by="props">
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
                          outlined
                          small
                          color="orange"
                          v-if="$store.getters.valAccess(43)"
                            @click="EditProductTypeInformation(props.item.id, props.item)"
                        >
                        <v-icon
                            small
                        >
                            mdi-pencil
                        </v-icon>
                          Edit
                        </v-btn>

                        <v-btn
                      elevation="2"
                          dark
                          outlined
                          small
                          color="red"
                          v-if="$store.getters.valAccess(40) || $store.getters.valAccess(61)"
                            @click="RemoveProductTypeInformation(props.item.id, props.item)"
                      >
                      <v-icon
                            extra small
                            @click="RemoveProductTypeInformation(props.item.id, props.item)"
                        >
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



              <!-- update all confirmation dialog -->
              <template>
  <v-row justify="center">
    <v-dialog
      v-model="updateconfirmation"
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
            @click="changeStatusDialogUpdate(false)"
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
            @click="UpdateAllProductTypeInformation()"
            >
            Confirm
          </v-btn>
        </center>
        <br>
      </v-card>
    </v-dialog>
  </v-row>
</template>
    <!-- end update all confirmation dialog -->



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
            @click="SaveProductTypeInformations()"
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
          <v-toolbar-title>Add ProductType</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
          </v-toolbar-items>
        </v-toolbar>

        <v-col sm="12" md="6" offset-md="3" class="mt-3 text-center"> 
            <h4>Note: Here you can add another product type information.</h4>
        </v-col>
        <v-col sm="12" md="6" offset-md="3"> 
            <v-text-field
                v-model="product_type_information.name"
                label="Product Type"
                required
                outlined
                 :counter="50"
                 :rules="nameRules"
                color="orange"
            ></v-text-field>
            <v-text-field
                v-model="product_type_information.description"
                label="Description"
                required
                outlined
                 :counter="50"
                 :rules="nameRules"
                color="orange"
            ></v-text-field>
        </v-col>
        <v-col sm="12" md="6" offset-md="3">
                        <v-btn
                        color="orange"
                        block
                        outlined
                        @click="validate()"
                        >
                        Save
                      </v-btn>
                    </v-col>
      </v-card>
    </v-dialog>
    </v-form>



    <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-dialog
      v-model="updatedialog"
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
            @click="updatedialog = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Update ProductType</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
          </v-toolbar-items>
        </v-toolbar>

        <v-col sm="12" md="6" offset-md="3" class="mt-3 text-center"> 
            <h4>Note: Here you can update product type information.</h4>
        </v-col>
        <v-col sm="12" md="6" offset-md="3"> 
            <v-text-field
                v-model="update_product_type_information.name"
                label="Product Type"
                required
                outlined
                 :counter="50"
                 :rules="nameRules"
                color="orange"
            ></v-text-field>
            <v-text-field
                v-model="update_product_type_information.description"
                label="Description"
                required
                outlined
                 :rules="nameRules"
                color="orange"
            ></v-text-field>
        </v-col>
        <v-col sm="12" md="6" offset-md="3">
                        <v-btn
                        color="orange"
                        block
                        outlined
                        @click="updatevalidate()"
                        >
                        Update
                      </v-btn>
                    </v-col>
      </v-card>
    </v-dialog>
    </v-form>


  </v-container>

</template>

<script>

  import prodtypeservices from '../services/prodtypeservices';

  export default {
    name: 'ProductType',
    created() {
        this.FetchProductTypeInformation();
        this.$store.state.snackbar.color = 'orange';
        this.headers = Object.values(this.headersMap);
        this.selectedHeaders = this.headers;
    },
    mounted(){
        this.$store.state.title = "Product Type";
    },
    computed: {
      //Done to get the ordered headers
      showHeaders () {
        return this.headers.filter(s => this.selectedHeaders.includes(s));
      }
    },
    data: () => ({
      menucolumn : false,
      search: '',
      page: 1,
        pageCount: 0,
        dialog: false,
        product_type_information: {
            name: '',
            description: '',
            flag: 1
        },
        update_product_type_information: {
            name: '',
            description: ''
        },
        headers:[],
        selectedHeaders: [],
        headersMap: [
          {
            text: 'Product Type',
            align: 'start',
            sortable: true,
            value: 'name',
          },
          { text: 'Description',sortable: false, value: 'description' },
          { text: 'Created By',sortable: false, value: 'created_by' },
          { text: 'Created At',sortable: false, value: 'createdat' },
          { text: 'Action',sortable: false, value: 'action', width: "230px" }
        ],
        prodtype: [],
        valid: true,
        nameRules: [
        v => !!v || 'This is a required field',
        ],
        confirmation: false,
        saveconfirmation: false,
        editconfirmation: false,
        updateconfirmation: false,
        updatedialog: false,
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
    methods: {

      // edit product type information
        EditProductTypeInformation(id, data){
          this.updatedialog = true;
          this.update_product_type_information = {
              name: data.name,
              description: data.description
              };
          this.updateAllID = id;
        },
        
        // check pop up message 
        changeStatusDialog(status){
            this.confirmation = status;
        },
        changeStatusDialogSave(status){
            this.saveconfirmation = status;
        },
        changeStatusDialogEdit(status){
            this.editconfirmation = status;
            this.FetchProductTypeInformation();
        },
        changeStatusDialogUpdate(status){
            this.updateconfirmation = status;
            this.FetchProductTypeInformation();
        },
        // end check pop up message 


        // get product type information
        FetchProductTypeInformation(){
            let payload = {
                user_id: this.$store.getters.fetchUserInfo.account_information.is_parent == 1 ? this.$store.getters.fetchUserInfo.account_information.id : this.$store.getters.fetchUserInfo.account_information.parent_id
            };
            prodtypeservices.fetchProductTypeInformation(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    this.prodtype = response.data.result;
                }
            }).catch(error => console.log(error));

        },

        // show dialog for new product type
        NewProductType(){
            this.dialog = true;
        },

        // form validation saving for all required fields
        validate(){

            let val = this.$refs.form.validate();

            if(val){
                this.confirmSave();
            }
        },

        // form validation update for all required fields
        updatevalidate(){
          let val = this.$refs.form.validate();

          if(val){
              this.confirmUpdateAll();
          }
        },

        // confirmation dialog show
        confirmUpdateAll(){
            this.updateconfirmation = true
        },

        // update product type information
        UpdateAllProductTypeInformation(){

        let payload = {
          id: this.updateAllID,
          product_type_information: JSON.stringify(this.update_product_type_information)
        };
        prodtypeservices.updateAllProductTypeInformation(payload, this.$store.getters.getAccessToken).then(response => {
          if(response.data.success){
              this.updatedialog = false;
              this.FetchProductTypeInformation();
              this.$store.state.snackbar.message = response.data.message;
              this.$store.state.snackbar.show = true;
              this.updateconfirmation = false
              this.$store.state.snackbar.colors = 'xgreen';
                    this.$store.state.snackbar.icon = "mdi-check-circle-outline";                      
                }else{
                    this.$store.state.snackbar.colors = 'xred';
                      this.$store.state.snackbar.icon = "mdi-alert-outline";                      
                  }
        }).catch(error => console.log(error));

        },

        // saving dialog show
        confirmSave(){
            this.saveconfirmation = true
        },

        // save product type information
        SaveProductTypeInformations(){
            this.product_type_information = {
                name:this.product_type_information.name,
                description:this.product_type_information.description,
                flag:1
            }
            let payload = {
                product_type_information: JSON.stringify(this.product_type_information)
                
            };
            prodtypeservices.saveProductTypeInformations(payload, this.$store.getters.getAccessToken).then(response => {
                
                if(response.data.success){
                    this.dialog = false;
                    this.FetchProductTypeInformation();
                    this.ClearSaveProductType();
                    this.$store.state.snackbar.message = response.data.message;
                    this.$store.state.snackbar.show = true;
                    this.saveconfirmation = false
                    this.$store.state.snackbar.colors = 'xgreen';
                    this.$store.state.snackbar.icon = "mdi-check-circle-outline";                      
                }else{
                    this.$store.state.snackbar.colors = 'xred';
                      this.$store.state.snackbar.icon = "mdi-alert-outline";                      
                  }
            }).catch(error => console.log(error));

        },

        // clear product type fields
        ClearSaveProductType(){
            this.product_type_information.name = '';
            this.product_type_information.description = '';
        },

        // update product type information
        confirmUpdate(){
            let payload = {
                id: this.foUpdate['id'],
                name: this.foUpdate['name'],
                value: this.foUpdate['value']
            }
            prodtypeservices.updateProductTypeInformation(payload, this.$store.getters.getAccessToken).catch(error => console.log(error));
            this.$store.state.snackbar.message = 'Product Type information has been updated.';
            this.$store.state.snackbar.show = true;
            this.FetchProductTypeInformation();
            this.editconfirmation = false
            this.$store.state.snackbar.colors = 'xgreen';
            this.$store.state.snackbar.icon = "mdi-check-circle-outline";                                 
        },

        // show product type confirmation dialog for update
        UpdateProductTypeInformation(id, name, value){

            this.foUpdate = {
                id: id,
                name: name,
                value: value
            }
            this.editconfirmation = true

        },

        // remove product type information
        confirmDelete(){
            this.prodtype.splice(this.prodtype.indexOf(this.foDelete['data']), 1);

            let payload = {
                id: this.foDelete['id']
            };

            prodtypeservices.removeProductTypeInformation(payload, this.$store.getters.getAccessToken).catch(error => console.log(error));

            this.$store.state.snackbar.message = 'Product Type information has been removed.';
            this.$store.state.snackbar.show = true;
            this.confirmation = false
            this.$store.state.snackbar.colors = 'xgreen';
            this.$store.state.snackbar.icon = "mdi-check-circle-outline";                                  

        },

        // show product type confirmation dialog for delete
        RemoveProductTypeInformation(id, data){
            this.foDelete = {
                id: id,
                data: data
            }
            this.confirmation = true
        },

        // export xlsx product type information
        ExportProductTypeInformation(){

          let payload = {
              user_id: this.$store.getters.getParentID
          };

          prodtypeservices.exportProductTypeInformation(payload, this.$store.getters.getAccessToken)
          .then(response => {
              const url = window.URL.createObjectURL(new Blob([response.data]))
              const link = document.createElement('a')
              link.href = url
              link.setAttribute('download','producttype.xlsx')
              document.body.appendChild(link)
              link.click()
          }).catch(error => console.log(error));

          }
    }
  }
</script>
<style>
input[type=checkbox] {
  accent-color: orange;
}
</style>
