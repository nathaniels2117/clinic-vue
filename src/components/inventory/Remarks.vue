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
        &nbsp;
        <v-btn
           medium
        dark
          color="orange"
          elevation="2"
          @click="ExportRemarksInformation()"
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
                  <v-list-item-title @click="ExportRemarksInformation()"> <v-icon>{{ item.icon }}</v-icon>{{ item.text }}</v-list-item-title>
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
          @click="NewRemarks()"
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
          @click="NewRemarks()"
          v-if="$store.getters.valAccess(42)"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
        </template>
  </v-toolbar>
</template>

                            <br>
                <v-data-table
                    :headers="showHeaders"
                    :items="remarks"
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
                            @save="UpdateRemarksInformation(props.item.id, props.item.name)"
                        >
                        {{ props.item.name }}
                        <template v-slot:input
                        v-if="$store.getters.valAccess(64)"
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
                            @click="EditRemarksInformation(props.item.id, props.item)"
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
                          class="mx-2"
                          dark
                          outlined
                          small
                          color="red"
                          v-if="$store.getters.valAccess(65)"
                            @click="RemoveRemarksInformation(props.item.id, props.item)"
                      >
                      <v-icon
                            small
                            @click="RemoveRemarksInformation(props.item.id, props.item)"
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
            @click="SaveRemarksInformations()"
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
            @click="UpdateAllRemarksInformation()"
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
        <v-card-text>Are you sure you want to delete {{ this.foDelete.data['name'] }}?</v-card-text>
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
            @click="ImportRemarksInformation()"
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
          <v-toolbar-title>Add Remarks</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
          </v-toolbar-items>
        </v-toolbar>

        <v-col sm="12" md="6" offset-md="3" class="mt-3 text-center"> 
            <h4>Note: Here you can add another remarks information.</h4>
        </v-col>
        <v-col sm="12" md="6" offset-md="3"> 
            <v-text-field
                v-model="remarks_information.name"
                label="Remarks"
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
          <v-toolbar-title>Update Remarks</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
          </v-toolbar-items>
        </v-toolbar>

        <v-col sm="12" md="6" offset-md="3" class="mt-3 text-center"> 
            <h4>Note: Here you can update remarks information.</h4>
        </v-col>
        <v-col sm="12" md="6" offset-md="3"> 
            <v-text-field
                v-model="update_remarks_information.name"
                label="Remarks"
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

  import remarksservices from '../services/remarksservices';

  export default {
    name: 'Remarks',
    created() {
        this.FetchRemarksInformation();
        this.$store.state.snackbar.color = 'orange';
        this.headers = Object.values(this.headersMap);
        this.selectedHeaders = this.headers;
    },
    mounted(){
        this.$store.state.title = "Remarks";
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
        remarks_information: {
            name: ''
        },
        update_remarks_information: {
            name: ''
        },
      exportimport: [{ text: 'Upload', icon: 'mdi-upload-outline', linktrigger: 1 },
          { text: 'Download', icon: 'mdi-download-outline', linktrigger: 2 }],
        headers:[],
        selectedHeaders: [],
        headersMap: [
          {
            text: 'Remarks',
            align: 'start',
            sortable: true,
            value: 'name',
          },
          { text: 'Created By',sortable: false, value: 'createdby' },
          { text: 'Created At',sortable: false, value: 'createdat' },
          { text: 'Action',sortable: false, value: 'action' }
        ],
        remarks: [],
        valid: true,
        nameRules: [
        v => !!v || 'Remarks name is required',
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
        },
        foUpdate: {
            id: 0,
            name: ''
        }
    }),
    methods: {

      // edit remarks information
        EditRemarksInformation(id, data){
          this.updatedialog = true;
          this.update_remarks_information = {
              name: data.name
              };
          this.updateAllID = id;
        },

        // upload file
        uploadFile() {
          this.Images = this.$refs.file.files[0];
        },

        // show dilaog for upload file
        uploadfileopen() {
          this.uploadconfirmation = true;
        },

        // check pop up message 
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
            this.FetchRemarksInformation();
        },
        changeStatusDialogUpdate(status){
            this.updateconfirmation = status;
            this.FetchRemarksInformation();
        },
        // end check pop up message 

        // get remarks information
        FetchRemarksInformation(){

            let payload = {
                user_id: this.$store.getters.getParentID
            };
            remarksservices.fetchRemarksInformation(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    this.remarks = response.data.result;
                }
            }).catch(error => console.log(error));

        },

        // show dialog for new remarks
        NewRemarks(){
            this.dialog = true;
        },

        // validation required fields new remarks
        validate(){

            let val = this.$refs.form.validate();

            if(val){
                this.confirmSave();
            }
        },

        // validation required fields update remarks
        updatevalidate(){
          let val = this.$refs.form.validate();

          if(val){
              this.confirmUpdateAll();
          }
        },

        // update dialog show
        confirmUpdateAll(){
            this.updateconfirmation = true
        },

        // update remarks information
        UpdateAllRemarksInformation(){

        let payload = {
          id: this.updateAllID,
          remarks_information: JSON.stringify(this.update_remarks_information)
        };
        remarksservices.updateRemarksInformation(payload, this.$store.getters.getAccessToken).then(response => {
          if(response.data.success){
              this.updatedialog = false;
              this.FetchRemarksInformation();
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

        // show dialog confirmation save new
        confirmSave(){
            this.saveconfirmation = true
        },

        // save remarks information
        SaveRemarksInformations(){

            let payload = {
                remarks_information: JSON.stringify(this.remarks_information)
                };
            remarksservices.saveRemarksInformations(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    this.dialog = false;
                    this.FetchRemarksInformation();
                    this.ClearSaveDivision();
                    this.$store.state.snackbar.message = response.data.message;
                    this.$store.state.snackbar.show = true;
                    this.saveconfirmation = false
                    this.$store.state.snackbar.colors = 'xgreen';
                    this.$store.state.snackbar.icon = "mdi-check-circle-outline";                                          
                }
                if(response.data.success==false){
                    this.dialog = false;
                    this.$store.state.snackbar.message = response.data.message;
                    this.$store.state.snackbar.show = true;
                    this.saveconfirmation = false
                    this.$store.state.snackbar.colors = 'xred';
                      this.$store.state.snackbar.icon = "mdi-alert-outline";       
                }
                else{
                    this.$store.state.snackbar.message = response.data.message;
                    this.$store.state.snackbar.show = true;               
                    this.$store.state.snackbar.colors = 'xgreen';
                    this.$store.state.snackbar.icon = "mdi-check-circle-outline";                                          
                }
            }).catch(error => console.log(error));

        },
        // clear remarks fields
        ClearSaveDivision(){
            this.remarks_information.name = '';
        },

        // update remarks information
        confirmUpdate(){
            let payload = {
                id: this.foUpdate['id'],
                remarks_information: JSON.stringify({
                    name: this.foUpdate['name']
                })
            }
            
            remarksservices.updateRemarksInformation(payload, this.$store.getters.getAccessToken).catch(error => console.log(error));
            this.$store.state.snackbar.message = 'Remarks information has been updated.';
            this.$store.state.snackbar.show = true;
            this.FetchRemarksInformation();
            this.editconfirmation = false
            this.$store.state.snackbar.colors = 'xgreen';
                    this.$store.state.snackbar.icon = "mdi-check-circle-outline";                                  
        },

        // show dialog for update
        UpdateRemarksInformation(id, name){

            this.foUpdate = {
                id: id,
                name: name
            }
            this.editconfirmation = true

            
        },

        // delete remarks information
        confirmDelete(){
            this.remarks.splice(this.remarks.indexOf(this.foDelete['data']), 1);

            let payload = {
                id: this.foDelete['id']
            };

            remarksservices.removeRemarksInformation(payload, this.$store.getters.getAccessToken).catch(error => console.log(error));

            this.$store.state.snackbar.message = 'Remarks information has been removed.';
            this.$store.state.snackbar.show = true;
            this.confirmation = false
            this.$store.state.snackbar.colors = 'xgreen';
                    this.$store.state.snackbar.icon = "mdi-check-circle-outline";                                  
        },

        // show dialog confirmation delete remarks information
        RemoveRemarksInformation(id, data){


            this.foDelete = {
                id: id,
                data: data
            }
            this.confirmation = true
        },

        // export xlsx remarks information
        ExportRemarksInformation(){

            let payload = {
                user_id: this.$store.getters.getParentID
            };

            remarksservices.exportRemarksInformation(payload, this.$store.getters.getAccessToken)
            .then(response => {
                const url = window.URL.createObjectURL(new Blob([response.data]))
                const link = document.createElement('a')
                link.href = url
                link.setAttribute('download','remarks.xlsx')
                document.body.appendChild(link)
                link.click()
            }).catch(error => console.log(error));

        },

        // download xlsx template
        DownloadTemplate(){

          let payload = {
              user_id: 0
          };

          remarksservices.downloadTemplate(payload, this.$store.getters.getAccessToken)
          .then(response => {
              const url = window.URL.createObjectURL(new Blob([response.data]))
              const link = document.createElement('a')
              link.href = url
              link.setAttribute('download','Remarks_format.xlsx')
              document.body.appendChild(link)
              link.click()
          }).catch(error => console.log(error));

          },

          // import xlsx for remarks information
          ImportRemarksInformation() {

            let loader = this.$loading.show();

            const formData = new FormData();
            formData.append('file', this.Images);
            formData.append('created_by', this.$store.getters.getUserID);
            formData.append('parent_user_id', this.$store.getters.getParentID);
            const headers = { 'Content-Type': 'multipart/form-data' };
            remarksservices.importRemarksInformation(formData,headers, this.$store.getters.getAccessToken)
            .then(response => {
              
                    loader.hide();

            this.$store.state.snackbar.message = 'Remarks information has been imported.';
            this.$store.state.snackbar.show = true;
            this.FetchRemarksInformation();
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
