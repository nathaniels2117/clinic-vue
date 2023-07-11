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
          @click="ExportSupplierInformation()"
        >
        <!-- insert val access supplier download -->
          <v-icon>mdi-download-outline</v-icon>
        </v-btn>

        &nbsp;
        <v-btn
         medium
        dark
          color="orange"
          elevation="2"
          @click="uploadfileopen()"
        >
        <!-- insert val access supplier upload -->
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
        </template>
      <template v-if="$vuetify.breakpoint.mdAndUp">
        <v-btn
        medium
        dark
          color="orange"
          @click="NewSupplier()"
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
          @click="NewSupplier()"
          v-if="$store.getters.valAccess(42)"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
        </template>
  </v-toolbar>
</template>
                <v-row>
                    <v-col
                      md="6"
                      col="12"
                      offset-md="6"
                      >
                      <v-row>
                        <v-col
                          col="12"
                          >
                        </v-col>
                        <v-col
                          col="12"
                          >
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                            <br>

                <v-data-table
                    :headers="showHeaders"
                    :search="search"
                    :items="supplier"
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
                            @save="UpdateSupplierInformation(props.item.id, 'name', props.item.name)"
                        >
                        {{ props.item.name }}
                        <template v-slot:input
                        v-if="$store.getters.valAccess(43)"
                        >
                            <v-text-field
                                color="orange"
                                v-model="props.item.name"
                                label="Edit"
                                single-line
                            ></v-text-field>
                        </template>
                        </v-edit-dialog>
                    </template>
                    <template v-slot:item.email="props">
                        <v-edit-dialog
                            :return-value.sync="props.item.email"
                            @save="UpdateSupplierInformation(props.item.id, 'email', props.item.email)"
                        >
                        {{ props.item.email }}
                        <template v-slot:input
                        v-if="$store.getters.valAccess(43)"
                        >
                            <v-text-field
                                color="orange"
                                v-model="props.item.email"
                                label="Edit"
                                single-line
                            ></v-text-field>
                        </template>
                        </v-edit-dialog>
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
                          outlined
                          small
                          color="orange"
                          v-if="$store.getters.valAccess(43)"
                            @click="EditSupplierInformation(props.item.id, props.item)"
                      >
                      <v-icon
                            small
                            v-if="$store.getters.valAccess(43)"
                            @click="EditSupplierInformation(props.item.id, props.item)"
                        >
                            mdi-pencil
                        </v-icon>
                          Edit
                      </v-btn>


                        <v-btn
                      elevation="2"
                          class="mx-2"
                          dark
                          outlined
                          small
                          color="red"
                          v-if="$store.getters.valAccess(44)"
                            @click="RemoveSupplierInformation(props.item.id, props.item)"
                      >
                      <v-icon
                            small
                            v-if="$store.getters.valAccess(44)"
                            @click="RemoveSupplierInformation(props.item.id, props.item)"
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
        :total-visible="10"
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
            @click="UpdateAllSupplierInformation()"
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
            @click="SaveSupplierInformation()"
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


             <!-- upload confirmation dialog -->
    <template>
  <v-row justify="center">
    <v-dialog
      v-model="uploadconfirmation"
      persistent
      max-width="290"
    >
      <v-card>
        <v-card-title class="text-h5">
          Import
        </v-card-title>
        <v-card-text>Upload xlsx and csv format</v-card-text>

        <v-card-text class="text-right"><a @click="DownloadTemplate()">Download Template</a></v-card-text>
          <v-card-text><input type="file" @change="uploadFile" ref="file"></v-card-text>
        <center>
          <v-btn
            elevation="2"
            class="mx-2"
            dark
            outlined
            small
            color="red"
            @click="changeStatusDialogUpload(false)"
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
            @click="ImportSupplierInformation()"
            >
            Confirm
          </v-btn>
        </center>
        <br>
      </v-card>
    </v-dialog>
  </v-row>
</template>
    <!-- end upload confirmation dialog -->

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
          <v-toolbar-title>Add Supplier</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
          </v-toolbar-items>
        </v-toolbar>

        <v-col sm="12" md="6" offset-md="3" class="mt-3 text-center"> 
            <h4>Note: Here you can add another supplier information.</h4>
        </v-col>
        <v-col sm="12" md="6" offset-md="3"> 
            <v-text-field
                v-model="supplier_information.name"
                label="Supplier Name"
                required
                outlined
                 :counter="50"
                 :rules="nameRules"
                 color="orange"
            ></v-text-field>
        </v-col>
        <v-col sm="12" md="6" offset-md="3"> 
            <v-text-field
                v-model="supplier_information.email"
                label="Supplier Email"
                required
                outlined
                 :counter="50"
                 :rules="emailRules"
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
          <v-toolbar-title>Update Supplier</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
          </v-toolbar-items>
        </v-toolbar>

        <v-col sm="12" md="6" offset-md="3" class="mt-3 text-center"> 
            <h4>Note: Here you can edit supplier information.</h4>
        </v-col>
        <v-col sm="12" md="6" offset-md="3"> 
            <v-text-field
                v-model="update_supplier_information.name"
                label="Supplier Name"
                required
                outlined
                 :counter="50"
                 :rules="nameRules"
                 color="orange"
            ></v-text-field>
        </v-col>
        <v-col sm="12" md="6" offset-md="3"> 
            <v-text-field
                v-model="update_supplier_information.email"
                label="Supplier Email"
                required
                outlined
                 :counter="50"
                 :rules="emailRules"
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

  import supplierservices from '../services/supplierservices';

  export default {
    name: 'Supplier',
    created() {
        this.FetchSupplierInformation();
        this.$store.state.snackbar.color = 'orange';
        this.headers = Object.values(this.headersMap);
        this.selectedHeaders = this.headers;
    },
    mounted(){
        this.$store.state.title = "Supplier";
    },
    computed: {
      //Done to get the ordered headers
      showHeaders () {
        return this.headers.filter(s => this.selectedHeaders.includes(s));
      },
      
      totalRecords() {
          return this.supplier.length
      },
    },
    data: () => ({
      menucolumn : false,
      search: '',
      page: 1,
      exportimport: [{ text: 'Upload', icon: 'mdi-upload-outline', linktrigger: 1 },
          { text: 'Download', icon: 'mdi-download-outline', linktrigger: 2 }],
        toggleSelect: false,
        pageCount: 0,
        updateAllID: 0,
        dialog: false,
        supplier_information: {
            name: '',
            email: '',
            company_code: ''
        },
        update_supplier_information: {
            name: '',
            email: '',
            company_code: ''
        },
        headers:[],
        selectedHeaders: [],
        headersMap: [
          {
            text: 'Supplier',
            align: 'start',
            sortable: true,
            value: 'name',
          },
          { text: 'Email',sortable: false, value: 'email' },
          { text: 'Created By',sortable: false, value: 'createdby' },
          { text: 'Created At',sortable: false, value: 'createdat' },
          { text: 'Action',sortable: false, value: 'action' }
        ],
        supplier: [],
        company: [],
        valid: true,
        nameRules: [
        v => !!v || 'Supplier Name is required',
        ],
        emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
        confirmation: false,
        saveconfirmation: false,
        editconfirmation: false,
        uploadconfirmation: false,
        updateconfirmation: false,
        updatedialog: false,
        Images: null,
        foDelete: {
            id: 0,
            data: ''
        }
    }),
    methods: {

      // edit supplier information
      EditSupplierInformation(id, data){
        this.updatedialog = true;
        this.update_supplier_information = {
            name: data.name,
            email: data.email,
            company_code: data.company_code
            };
        this.updateAllID = id;
      },
      
      // upload image file
        uploadFile() {
          this.Images = this.$refs.file.files[0];
        },

        // show dialog upload image
        uploadfileopen() {
          this.uploadconfirmation = true;
        },

        // check pop up status
        changeStatusDialog(status){
            this.confirmation = status;
        },
        changeStatusDialogSave(status){
            this.saveconfirmation = status;
        },
        changeStatusDialogEdit(status){
            this.editconfirmation = status;
            this.FetchSupplierInformation();
        },
        changeStatusDialogUpdate(status){
            this.updateconfirmation = status;
            this.FetchSupplierInformation();
        },
        changeStatusDialogUpload(status){
            this.uploadconfirmation = status;
        },
        // end check pop up status

        // get supplier information
        FetchSupplierInformation(){
            let payload = {
                user_id: this.$store.getters.getParentID
            };

            supplierservices.fetchSupplierInformation(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    this.supplier = response.data.result;
                }
            }).catch(error => console.log(error));

        },

        // show dialog new supplier
        NewSupplier(){
            this.dialog = true;
        },

        // set new supplier information
        SetNewSuppplierInformation(){
            this.supplier_information = {
            name: this.supplier_information.name,
            email: this.supplier_information.email,
            company_code: this.$store.getters.getBusinessID
            };
        },

        // form validation new supplier required fields 
        validate(){

            let val = this.$refs.form.validate();

            if(val){
                this.confirmSave();
            }
        },

        // form validation update supplier required fields 
        updatevalidate(){
          let val = this.$refs.form.validate();

          if(val){
              this.confirmUpdateAll();
          }
        },

        // show dialog update confirmation
        confirmUpdateAll(){
            this.updateconfirmation = true
        },

        // update supplier information
        UpdateAllSupplierInformation(){

          let payload = {
            id: this.updateAllID,
            supplier_information: JSON.stringify(this.update_supplier_information)
          };

          supplierservices.updateAllSupplierInformation(payload, this.$store.getters.getAccessToken).then(response => {
            if(response.data.success){
                this.updatedialog = false;
                this.FetchSupplierInformation();
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
          
          // show dialog confirmation saving
        confirmSave(){
            this.saveconfirmation = true
        },

        // save supplier information
        SaveSupplierInformation(){

            this.SetNewSuppplierInformation()
            let payload = {
                supplier_information: JSON.stringify(this.supplier_information)
            };

            supplierservices.saveSupplierInformation(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    this.dialog = false;
                    this.FetchSupplierInformation();
                    this.ClearSaveSupplier();
                    this.$store.state.snackbar.message = response.data.message;
                    this.$store.state.snackbar.show = true;
                    this.saveconfirmation = false
                    this.$store.state.snackbar.colors = 'xgreen';
                    this.$store.state.snackbar.icon = "mdi-check-circle-outline";   
                }else{
                    this.$store.state.snackbar.message = response.data.message;
                    this.$store.state.snackbar.show = true;
                    this.saveconfirmation = false
                    this.$store.state.snackbar.colors = 'xred';
                      this.$store.state.snackbar.icon = "mdi-alert-outline";                      
                  }                 

            }).catch(error => console.log(error));

        },

        // clear required fields
        ClearSaveSupplier(){
            this.supplier_information.name = '';
            this.supplier_information.email = '';
        },

        // update supplier information
        confirmUpdate(){
            let payload = {
                id: this.foUpdate['id'],
                supplier_information: JSON.stringify({
                    name: this.foUpdate['name'],
                    value: this.foUpdate['value']
                })
            }

            supplierservices.updateSupplierInformation(payload, this.$store.getters.getAccessToken).catch(error => console.log(error));
            this.$store.state.snackbar.message = 'Supplier information has been updated.';
            this.$store.state.snackbar.show = true;
            this.FetchSupplierInformation();
            this.editconfirmation = false
            this.$store.state.snackbar.colors = 'xgreen';
                    this.$store.state.snackbar.icon = "mdi-check-circle-outline";   
        },

        // show dialog confirmation
        UpdateSupplierInformation(id, name, value){

            this.foUpdate = {
                id: id,
                name: name,
                value: value
            }
            this.editconfirmation = true

        },

        // remove supplier information
        confirmDelete(){
            this.supplier.splice(this.supplier.indexOf(this.foDelete['data']), 1);

            let payload = {
                id: this.foDelete['id']
            };

            supplierservices.removeSupplierInformation(payload, this.$store.getters.getAccessToken).catch(error => console.log(error));

            this.$store.state.snackbar.message = 'Supplier information has been removed.';
            this.$store.state.snackbar.show = true;
            this.confirmation = false
            this.$store.state.snackbar.colors = 'xgreen';
                    this.$store.state.snackbar.icon = "mdi-check-circle-outline";   

        },

        // show dialog confirmation
        RemoveSupplierInformation(id, data){

            this.foDelete = {
                id: id,
                data: data
            }
            this.confirmation = true

        },

        // export xlsx supplier information
        ExportSupplierInformation(){

            let payload = {
                user_id: this.$store.getters.getParentID
            };

            supplierservices.exportSupplierInformation(payload, this.$store.getters.getAccessToken)
            .then(response => {
                const url = window.URL.createObjectURL(new Blob([response.data]))
                const link = document.createElement('a')
                link.href = url
                link.setAttribute('download','supplier.xlsx')
                document.body.appendChild(link)
                link.click()
            }).catch(error => console.log(error));

        },

        // download xlsx supplier template
        DownloadTemplate(){

          let payload = {
              user_id: 0
          };

          supplierservices.downloadTemplate(payload, this.$store.getters.getAccessToken)
          .then(response => {
              const url = window.URL.createObjectURL(new Blob([response.data]))
              const link = document.createElement('a')
              link.href = url
              link.setAttribute('download','Supplier_format.xlsx')
              document.body.appendChild(link)
              link.click()
          }).catch(error => console.log(error));

          },

          // import xlsx supplier information
          ImportSupplierInformation() {
            
            let loader = this.$loading.show();

            const formData = new FormData();
            formData.append('file', this.Images);
            formData.append('created_by', this.$store.getters.getUserID);
            formData.append('parent_user_id', this.$store.getters.getParentID);
            formData.append('company_id', this.$store.getters.getBusinessID);
            const headers = { 'Content-Type': 'multipart/form-data' };
            supplierservices.importSupplierInformation(formData,headers, this.$store.getters.getAccessToken)
            .then(response => {

                    loader.hide();

            this.$store.state.snackbar.message = 'Supplier information has been imported.';
            this.$store.state.snackbar.show = true;
            this.FetchSupplierInformation();
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
input[type=checkbox] {
  accent-color: orange;
}
</style>
