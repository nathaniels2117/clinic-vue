<template>
  <v-container style="max-width: 95%; position: relative;" >
    <v-row>
      <v-col cols="12">
        <v-card>
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

      &nbsp;
      <!-- <v-btn> -->
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
        <!-- &nbsp;<v-icon>mdi-view-column</v-icon>Column -->
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
        <!-- </v-btn> -->

      <!-- <v-spacer></v-spacer> -->

      <!-- <v-btn-toggle
        v-model="toggle_multiple"
        color="primary"
        dense
        group
        multiple
      > -->

      <template v-if="$vuetify.breakpoint.mdAndUp">
        
      &nbsp;<v-btn
   medium
        dark
          color="orange"
          elevation="2"
          @click="ExportDepartmentInformation()"
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
                  <v-list-item-title @click="ExportDepartmentInformation()"> <v-icon>{{ item.icon }}</v-icon>{{ item.text }}</v-list-item-title>
                </div>
                </v-list-item>
              </v-list>
            </v-menu>
        </template>


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
          @click="NewDepartment()"
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
          @click="NewDepartment()"
          v-if="$store.getters.valAccess(42)"
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






              <!-- <v-select v-model="selectedHeaders" :items="headers" label="Select Columns" multiple outlined return-object>
            <template v-slot:selection="{ item, index }">
              <v-chip v-if="index < 2">
                <span>{{ item.text }}</span>
              </v-chip>
              <span v-if="index === 2" class="grey--text caption">(+{{ selectedHeaders.length - 2 }} others)</span>
            </template>
         </v-select> -->
                <!-- <v-row>
                    <v-col
                      md="6"
                      col="12"
                      offset-md="6"
                      >
                      <v-row>
                        <v-col
                          col="12"
                          >
                            <v-btn
                                elevation="2"
                                outlined
                                dark
                                small
                                block
                                color="primary"
                                @click="uploadfileopen()"
                                v-if="this.$store.getters.valAccess(28)"
                            >
                                <v-icon small>
                                  mdi-microsoft-excel
                                </v-icon>
                                Upload
                            </v-btn> -->
                        <!-- </v-col>
                        <v-col
                          col="12"
                          > -->
                          <!-- <v-btn
                              elevation="2"
                              outlined
                              block
                              dark
                              small
                              color="primary"
                              @click="ExportDepartmentInformation()"
                              v-if="this.$store.getters.valAccess(28)"
                          >
                              <v-icon small>
                                mdi-download
                              </v-icon>
                              Download
                          </v-btn>   -->
                        <!-- </v-col>
                        <v-col
                          col="12"
                          >
                          <div class="col-sm-12">
                          <v-btn
                              elevation="2"
                              outlined
                              block
                              dark
                              small
                              color="primary"
                              @click="NewDepartment()"
                              v-if="$store.getters.valAccess(26) || $store.getters.valAccess(67)"
                          >
                              <v-icon small>
                                mdi-plus
                              </v-icon>
                              Create
                          </v-btn>
                        </div>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                  <div class="offset-md-9 col-sm-3">
                                        <v-text-field
                                            v-model="search"
                                            append-icon="mdi-magnify"
                                            label="Search"
                                            outlined
                                            hide-details
                                            color="primary"
                                        ></v-text-field>
                            </div> -->
                            <br>
                <v-data-table
                    :headers="showHeaders"
                    :items="department"
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
                            @save="UpdateDepartmentInformation(props.item.id, props.item.name)"
                        >
                        {{ props.item.name }}
                        <template v-slot:input
                        v-if="$store.getters.valAccess(27) || $store.getters.valAccess(68)"
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
                            @click="EditDepartmentInformation(props.item.id, props.item)"
                      >
                      <v-icon
                            small
                        >

                        <!-- v-if="$store.getters.valAccess(43)"
                            @click="EditLocationInformation(props.item.id, props.item)" -->
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
                          v-if="$store.getters.valAccess(28) || $store.getters.valAccess(69)"
                            @click="RemoveDepartmentInformation(props.item.id, props.item)"
                      >
                      <v-icon
                            small
                            @click="RemoveDepartmentInformation(props.item.id, props.item)"
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
        <!-- <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="changeStatusDialogSave(false)"
          >
            Cancel
          </v-btn>
          <v-btn
            color="green darken-1"
            text
            @click="SaveDepartmentInformation()"
          >
            Save
          </v-btn>
        </v-card-actions> -->
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
            @click="SaveDepartmentInformation()"
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
        <!-- <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="changeStatusDialogEdit(false)"
          >
            Cancel
          </v-btn>
          <v-btn
            color="green darken-1"
            text
            @click="confirmUpdate()"
          >
            Update
          </v-btn>
        </v-card-actions> -->
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
            @click="UpdateAllDepartmentInformation()"
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
        <!-- <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="changeStatusDialog(false)"
          >
            Cancel
          </v-btn>
          <v-btn
            color="green darken-1"
            text
            @click="confirmDelete()"
          >
            Delete
          </v-btn>
        </v-card-actions> -->
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
          Upload
        </v-card-title>
        <v-card-text>Upload xlsx and csv format</v-card-text>
        <v-card-text class="text-right"><a @click="DownloadTemplate()">Download Template</a></v-card-text>
          <v-card-text><input type="file" @change="uploadFile" ref="file"></v-card-text>
        <!-- <v-card-actions>
          <v-spacer></v-spacer>
          <br>
          <v-btn
            color="green darken-1"
            text
            @click="changeStatusDialogUpload(false)"
          >
            Cancel
          </v-btn>
          <v-btn
            color="green darken-1"
            text
            @click="ImportDepartmentInformation()"
          >
            Upload
          </v-btn>
        </v-card-actions> -->
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
            @click="ImportDepartmentInformation()"
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
          <v-toolbar-title>Add Department</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <!-- <v-btn
              dark
              text
              @click="validate()"
              id="btn-next" class="btn btn-primary btn-sm p-2" style="font-size: 12px;"
              >
              Save
            </v-btn> -->
          </v-toolbar-items>
        </v-toolbar>

        <v-col sm="12" md="6" offset-md="3" class="mt-3 text-center"> 
            <h4>Note: Here you can add another department information.</h4>
        </v-col>
        <v-col sm="12" md="6" offset-md="3"> 
            <v-text-field
            color="orange"
                v-model="department_information.name"
                label="Department"
                required
                outlined
                 :counter="50"
                 :rules="nameRules"
            ></v-text-field>
        </v-col>
        <center>
                    <v-col sm="12" md="6">
                        <v-btn
                        color="orange"
                        block
                        outlined
                        @click="validate()"
                        >
                        Save
                      </v-btn>
                    </v-col>
                    </center>
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
          <v-toolbar-title>Update Department</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <!-- <v-btn
              dark
              text
              @click="validate()"
              id="btn-next" class="btn btn-primary btn-sm p-2" style="font-size: 12px;"
              >
              Save
            </v-btn> -->
          </v-toolbar-items>
        </v-toolbar>

        <v-col sm="12" md="6" offset-md="3" class="mt-3 text-center"> 
            <h4>Note: Here you can update department information.</h4>
        </v-col>
        <v-col sm="12" md="6" offset-md="3"> 
            <v-text-field
                v-model="update_department_information.name"
                label="Department"
                required
                outlined
                 :counter="50"
                 :rules="nameRules"
                color="orange"
            ></v-text-field>
        </v-col>
        <center>
                    <v-col sm="12" md="6">
                        <v-btn
                        color="orange"
                        block
                        outlined
                        @click="updatevalidate()"
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

  import departmentservices from '../services/departmentservices';

  export default {
    name: 'Department',
    created() {
        this.FetchDepartmentInformation();
        this.$store.state.snackbar.color = 'green darken-1';
        this.headers = Object.values(this.headersMap);
        this.selectedHeaders = this.headers;
    },
    mounted(){
        this.$store.state.title = "Department";
    },
    computed: {
      //Done to get the ordered headers
      showHeaders () {
        return this.headers.filter(s => this.selectedHeaders.includes(s));
      }
    },
    data: () => ({
      menucolumn: false,
      search: '',
      page: 1,
        pageCount: 0,
        dialog: false,
        department_information: {
            name: ''
        },
        update_department_information: {
            name: ''
        },
      exportimport: [{ text: 'Upload', icon: 'mdi-upload-outline', linktrigger: 1 },
          { text: 'Download', icon: 'mdi-download-outline', linktrigger: 2 }],
        headers:[],
        selectedHeaders: [],
        headersMap: [
          {
            text: 'Department',
            align: 'start',
            sortable: true,
            value: 'name',
          },
          { text: 'Created By', sortable: false, value: 'createdby' },
          { text: 'Created At', sortable: false, value: 'createdat' },
          { text: 'Action',sortable: false, value: 'action' }
        ],
        department: [],
        valid: true,
        nameRules: [
        v => !!v || 'Department Name is required',
        // v => (v && v.length >= 2) || 'Name must be more than 1 characters',
        ],
        confirmation: false,
        saveconfirmation: false,
        editconfirmation: false,
        uploadconfirmation: false,
        updateconfirmation: false,
        updatedialog: false,
        foDelete: {
            id: 0,
            data: ''
        }
    }),
    methods: {
        EditDepartmentInformation(id, data){
          this.updatedialog = true;
          this.update_department_information = {
              name: data.name
              };
          this.updateAllID = id;
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
            this.FetchDepartmentInformation();
        },
        changeStatusDialogUpdate(status){
            this.updateconfirmation = status;
            this.FetchDepartmentInformation();
        },
        FetchDepartmentInformation(){

            let payload = {
                user_id: this.$store.getters.getParentID
                // user_id: this.$store.getters.fetchUserInfo.account_information.is_parent == 1 ? this.$store.getters.fetchUserInfo.account_information.id : this.$store.getters.fetchUserInfo.account_information.parent_id
            };

            departmentservices.fetchDepartmentInformation(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    this.department = response.data.result;
                }
            }).catch(error => console.log(error));

        },
        NewDepartment(){
            this.dialog = true;
        },
        validate(){

            let val = this.$refs.form.validate();

            if(val){
                this.confirmSave();
            }
        },
        updatevalidate(){
          let val = this.$refs.form.validate();

          if(val){
              this.confirmUpdateAll();
          }
        },
        confirmUpdateAll(){
            this.updateconfirmation = true
        },

        UpdateAllDepartmentInformation(){

        let payload = {
          id: this.updateAllID,
          department_information: JSON.stringify(this.update_department_information)
        };
        departmentservices.updateDepartmentInformation(payload, this.$store.getters.getAccessToken).then(response => {
          if(response.data.success){
              this.updatedialog = false;
              this.FetchDepartmentInformation();
              this.$store.state.snackbar.message = response.data.message;
              this.$store.state.snackbar.show = true;
              this.updateconfirmation = false;
              this.$store.state.snackbar.colors = 'xgreen';
              this.$store.state.snackbar.icon = "mdi-check-circle-outline";                 
          }else{
              this.$store.state.snackbar.colors = 'xred';
              this.$store.state.snackbar.icon = "mdi-alert-outline";       
          }
        }).catch(error => console.log(error));

        },

        confirmSave(){
            this.saveconfirmation = true
        },
        SaveDepartmentInformation(){

            let payload = {
                department_information: JSON.stringify(this.department_information)
            };
            departmentservices.saveDepartmentInformation(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    this.dialog = false;
                    this.FetchDepartmentInformation();
                    this.ClearSaveDepartment();
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
        ClearSaveDepartment(){
            this.department_information.name = '';
        },
        confirmUpdate(){
            let payload = {
                id: this.foUpdate['id'],
                department_information: JSON.stringify({
                    name: this.foUpdate['name']
                })
            }
            
            departmentservices.updateDepartmentInformation(payload, this.$store.getters.getAccessToken).catch(error => console.log(error));
            this.$store.state.snackbar.message = 'Department information has been updated.';
            this.$store.state.snackbar.show = true;
            this.FetchDepartmentInformation();
            this.editconfirmation = false
            this.$store.state.snackbar.colors = 'xgreen';
                    this.$store.state.snackbar.icon = "mdi-check-circle-outline";                                  
        },
        UpdateDepartmentInformation(id, name){

            this.foUpdate = {
                id: id,
                name: name
            }
            this.editconfirmation = true
        },

        confirmDelete(){
            this.department.splice(this.department.indexOf(this.foDelete['data']), 1);

            let payload = {
                id: this.foDelete['id']
            };

            departmentservices.removeDepartmentInformation(payload, this.$store.getters.getAccessToken).catch(error => console.log(error));

            this.$store.state.snackbar.message = 'Department information has been removed.';
            this.$store.state.snackbar.show = true;
            this.confirmation = false
            this.$store.state.snackbar.colors = 'xgreen';
            this.$store.state.snackbar.icon = "mdi-check-circle-outline";              

        },

        RemoveDepartmentInformation(id, data){

            this.foDelete = {
                id: id,
                data: data
            }
            this.confirmation = true

        },
        ExportDepartmentInformation(){

            let payload = {
                user_id: this.$store.getters.getParentID
                // user_id: this.$store.getters.fetchUserInfo.account_information.is_parent == 1 ? this.$store.getters.fetchUserInfo.account_information.id : this.$store.getters.fetchUserInfo.account_information.parent_id
            };

            departmentservices.exportDepartmentInformation(payload, this.$store.getters.getAccessToken)
            .then(response => {
                const url = window.URL.createObjectURL(new Blob([response.data]))
                const link = document.createElement('a')
                link.href = url
                link.setAttribute('download','department.xlsx')
                document.body.appendChild(link)
                link.click()
            }).catch(error => console.log(error));

        },

        DownloadTemplate(){

          let payload = {
              user_id: 0
              // user_id: this.$store.getters.fetchUserInfo.account_information.is_parent == 1 ? this.$store.getters.fetchUserInfo.account_information.id : this.$store.getters.fetchUserInfo.account_information.parent_id
          };

          departmentservices.downloadTemplate(payload, this.$store.getters.getAccessToken)
          .then(response => {
              const url = window.URL.createObjectURL(new Blob([response.data]))
              const link = document.createElement('a')
              link.href = url
              link.setAttribute('download','Department_format.xlsx')
              document.body.appendChild(link)
              link.click()
          }).catch(error => console.log(error));

          },
          ImportDepartmentInformation() {

            let loader = this.$loading.show();

            const formData = new FormData();
            formData.append('file', this.Images);
            formData.append('created_by', this.$store.getters.getUserID);
            formData.append('parent_user_id', this.$store.getters.getParentID);
            const headers = { 'Content-Type': 'multipart/form-data' };
            departmentservices.importDepartmentInformation(formData,headers, this.$store.getters.getAccessToken)
            .then(response => {

                    loader.hide();

            this.$store.state.snackbar.message = 'Department information has been imported.';
            this.$store.state.snackbar.show = true;
            this.FetchDepartmentInformation();
              console.log(response.data.file)
            this.uploadconfirmation = false
            this.$store.state.snackbar.colors = 'xgreen';
                    this.$store.state.snackbar.icon = "mdi-check-circle-outline";   
            }).catch(error => console.log(error));

            // axios.post('https://httpbin.org/post', formData, { headers }).then((res) => {
            //   res.data.files; // binary representation of the file
            //   res.status; // HTTP status
            // });
          }
    }
  }
</script>
<style>
  input[type=checkbox] {
  accent-color: orange;
}
</style>
