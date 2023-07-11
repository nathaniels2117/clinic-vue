<template>
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
                </template>
                &nbsp;
                  
                <template v-if="$vuetify.breakpoint.mdAndUp">
                    <v-btn
                    medium
                    dark
                      color="orange"
                      elevation="2"
                      @click="NewDivision()"
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
                      @click="NewDivision()"
                                          v-if="$store.getters.valAccess(14)"
                    >
                      <v-icon>mdi-plus</v-icon>
                    </v-btn>
                </template>
              </v-toolbar>
            </template>
            <!-- One liner filtering -->
            <br>
            <!-- Division data table -->
            <v-data-table
              :headers="showHeaders"
              :items="division"
              :search="search"
              :page.sync="page"
              @page-count="pageCount = $event"
              :footer-props="{
              'items-per-page-options':[10],
              'disable-items-per-page': true,
              }"
              >
              <template v-slot:item.name="props">
                {{ props.item.name }}
              </template>

              <template v-slot:item.createdby="props">
                  {{ props.item.created_info.personal_information.lastname }}, {{ props.item.created_info.personal_information.firstname }}
              </template>

              <template v-slot:item.division_head_id="props">
                  {{ props.item.department_head_info != null ? props.item.department_head_info.personal_information.lastname + ' , ' + props.item.department_head_info.personal_information.firstname : '' }}
              </template>

              <template v-slot:item.immediate_superior_id="props">
                  {{ props.item.immediate_superior_info != null ? props.item.immediate_superior_info.personal_information.lastname + ' , ' + props.item.immediate_superior_info.personal_information.firstname : '' }}
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
                      v-if="$store.getters.valAccess(15)"
                      @click="UpdateAllDivision(props.item.id, props.item)"
                  >
                  <v-icon
                          small
                          @click="UpdateAllDivision(props.item.id, props.item)"
                      >
                          mdi-file-edit-outline
                      </v-icon>
                      Edit
                </v-btn>
                <v-btn
                  elevation="2"
                  class="mx-2"
                  dark
                  small
                  outlined
                  color="red"
                  v-if="$store.getters.valAccess(16)"
                    @click="RemoveDivisionInformation(props.item.id, props.item)"
                  >
                  <v-icon
                          small
                      @click="RemoveDivisionInformation(props.item.id, props.item)"
                      >
                          mdi-delete
                      </v-icon>
                    Delete
                </v-btn>
              </template>
            </v-data-table>
            <!-- Division data table -->
            <v-pagination
            color="orange"
            v-model="page"
            :length="pageCount"
            ></v-pagination>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- dialog save confirmation -->
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
                @click="SaveDivisionInformations()"
                >
                Confirm
              </v-btn>
            </center>
            <br>

          </v-card>
        </v-dialog>
      </v-row>
    </template>
    <!-- dialog save confirmation -->

    <!-- dialog edit confirmation -->
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
    <!-- dialog edit confirmation -->
    
    <!-- dialog delete confirmation -->
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
    <!-- dialog delete confirmation -->

    <!-- dialog upload division-->
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
                @click="ImportDivisionInformation()"
                >
                  Confirm
              </v-btn>
            </center>
            <br>   
          </v-card>
        </v-dialog>
      </v-row>
    </template>
    <!-- dialog upload division -->

    <!-- dialog add division form-->
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
            <v-toolbar-title>Add Division</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
            </v-toolbar-items>
          </v-toolbar>

          <v-col sm="12" md="6" offset-md="3" class="mt-3 text-center"> 
              <h4>Note: Here you can add another division information.</h4>
          </v-col>
          <v-col sm="12" md="6" offset-md="3"> 
              <v-text-field
                  color="orange"
                  v-model="division_information.name"
                  label="Division"
                  required
                  outlined
                  :counter="50"
                  :rules="nameRules"
              ></v-text-field>
              <center>
                <v-col sm="12" md="12">
                    <v-btn
                    color="orange"
                    block
                    outlined
                    @click="validate()"
                    id="btn-next" class="btn btn-success btn-sm p-2" style="font-size: 12px;"
                    >
                    Save
                  </v-btn>
                </v-col>
              </center>
          </v-col>
        </v-card>
      </v-dialog>
    </v-form>
    <!-- dialog add division form-->

    <!-- dialog edit division form-->
    <v-dialog
    fullscreen
    v-model="editfullscreendialog"
    hide-overlay
    transition="dialog-bottom-transition"
    >
      <v-card>
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
          >

          <v-toolbar
              dark
              color="orange"
          >
            <v-btn icon dark @click="CloseDialogEditFullScreen()">
                <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>Edit Division</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
            </v-toolbar-items>
          </v-toolbar>
          <v-col sm="12" md="6" offset-md="3" class="mt-3 text-center"> 
            <h4>Note: Here you can edit division information.</h4>
          </v-col>
          <v-col sm="12" md="6" offset-md="3">
            <v-text-field
                color="orange"
                v-model="division_information.name"
                label="Division"
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
                v-model="user_info"
                label="Division Head"
                :clearable="this.user_info != ''"
                :items="listemployeedata"
            ></v-combobox>
          </v-col>
          <v-col sm="12" md="6" offset-md="3">
            <v-combobox
                outlined
                color="orange"
                v-model="immediate_superior_info"
                label="Immediate Superior (Supervisor)"
                :clearable="this.immediate_superior_info != ''"
                :items="listemployeedata"
            ></v-combobox>
          </v-col>
          <center>
            <v-col sm="12" md="6">
                <v-btn
                color="orange"
                block
                outlined
                @click="valid == false ? validationfalse() : changeStatusDialogEdit(true)"
                >
                Update
              </v-btn>
            </v-col>
          </center>
        </v-form>
      </v-card>
    </v-dialog>
    <!-- dialog edit division form-->
  </v-container>
</template>

<script>

  import divisionservices from '../services/divisionservices';
  import userservices from '../services/userservices';

  export default {
    name: 'Division',
    created() {
        this.FetchDivisionInformation();
        this.$store.state.snackbar.color = 'orange';
        this.headers = Object.values(this.headersMap);
        this.selectedHeaders = this.headers;
        this.hrisdata = localStorage.getItem('is_hris')
        if(this.hrisdata == 1){
            this.$store.state.header = false;
            this.$store.state.footer = false;
        }else{
            this.$store.state.header = true;
            this.$store.state.footer = true;
        }
    },
    mounted(){
        this.$store.state.title = "Division";
    },
    computed: {
      //Done to get the ordered headers
      showHeaders () {
        return this.headers.filter(s => this.selectedHeaders.includes(s));
      }
    },
    data: () => ({
      immediate_superior_info : [], 
      user_info : [],
      listemployeedata : [],
      hrisdata : 0,
      editfullscreendialog : false,
      menucolumn: false,
      search: '',
      page: 1,
      pageCount: 0,
      dialog: false,
      division_information: {
      name: ''
      },
      headers:[],
      selectedHeaders: [],
      headersMap: [
        {
          text: 'Division',
          align: 'start',
          sortable: true,
          value: 'name',
        },
        {
          text: 'Division Head',
          align: 'start',
          sortable: true,
          value: 'division_head_id',
        },
        {
          text: 'Immediate Superior',
          align: 'start',
          sortable: true,
          value: 'immediate_superior_id',
        },
        { text: 'Created By', sortable: false, value: 'createdby' },
        { text: 'Action', sortable: false, value: 'action' , width: '230'}
      ],
      division: [],
      valid: true,
      nameRules: [
      v => !!v || 'Division name is required',
      ],
      confirmation: false,
      saveconfirmation: false,
      editconfirmation: false,
      uploadconfirmation: false,
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
          this.FetchDivisionInformation();
      },
      FetchDivisionInformation(){ // fetch division information

          let payload = {
              user_id: this.$store.getters.getParentID
          };
          divisionservices.fetchDivisionInformation(payload, this.$store.getters.getAccessToken).then(response => {
              if(response.data.success){
                  this.division = response.data.result;
                  console.log(this.division);
              }
          }).catch(error => console.log(error));

      },
      NewDivision(){
          this.dialog = true;
      },
      validate(){

          let val = this.$refs.form.validate();

          if(val){
              this.confirmSave();
          }
      },
      confirmSave(){
          this.saveconfirmation = true
      },
      SaveDivisionInformations(){ // save division information

          let payload = {
              division_information: JSON.stringify(this.division_information)
              };

          divisionservices.saveDivisionInformations(payload, this.$store.getters.getAccessToken).then(response => {
              if(response.data.success){
                  this.dialog = false;
                  this.FetchDivisionInformation();
                  this.ClearSaveDivision();
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
      ClearSaveDivision(){
          this.division_information.name = '';
      },
      confirmUpdate(){ // update division information
          let payload = {
              id: this.forAllUpdate['id'],
              division_information: JSON.stringify({
                  name: this.division_information.name,
                  division_head_id : this.user_info.value,
                  immediate_superior_id : this.immediate_superior_info == null ? 0 : this.immediate_superior_info.value
              })
          }
          
          divisionservices.updateDivisionInformation(payload, this.$store.getters.getAccessToken).catch(error => console.log(error));
          this.$store.state.snackbar.message = 'Division information has been updated.';
          this.$store.state.snackbar.show = true;
          this.FetchDivisionInformation();
          this.editconfirmation = false
          this.editfullscreendialog = false
          this.$store.state.snackbar.colors = 'xgreen';
          this.$store.state.snackbar.icon = "mdi-check-circle-outline";   
      },
      UpdateDivisionInformation(id, name){

          this.foUpdate = {
              id: id,
              name: name
          }
          this.editconfirmation = true

          
      },
      confirmDelete(){ // delete division information
          this.division.splice(this.division.indexOf(this.foDelete['data']), 1);

          let payload = {
              id: this.foDelete['id']
          };

          divisionservices.removeDivisionInformation(payload, this.$store.getters.getAccessToken).catch(error => console.log(error));

          this.$store.state.snackbar.message = 'Division information has been removed.';
          this.$store.state.snackbar.show = true;
          this.confirmation = false
          this.$store.state.snackbar.colors = 'xgreen';
          this.$store.state.snackbar.icon = "mdi-check-circle-outline";   
      },
      RemoveDivisionInformation(id, data){

          this.foDelete = {
              id: id,
              data: data
          }
          this.confirmation = true

      },

      ExportDivisionInformation(){

          let payload = {
              user_id: this.$store.getters.getParentID
          };

          divisionservices.exportDivisionInformation(payload, this.$store.getters.getAccessToken)
          .then(response => {
              const url = window.URL.createObjectURL(new Blob([response.data]))
              const link = document.createElement('a')
              link.href = url
              link.setAttribute('download','division.xlsx')
              document.body.appendChild(link)
              link.click()
          }).catch(error => console.log(error));

      },
      ImportDivisionInformation() {

          let loader = this.$loading.show();

          const formData = new FormData();
          console.log(this.Images);
          formData.append('file', this.Images);
          formData.append('created_by', this.$store.getters.getUserID);
          formData.append('parent_user_id', this.$store.getters.getParentID);
          const headers = { 'Content-Type': 'multipart/form-data' };
          divisionservices.importDivisionInformation(formData,headers, this.$store.getters.getAccessToken)
          .then(response => {
            
          loader.hide();

          this.$store.state.snackbar.message = 'Division information has been imported.';
          this.$store.state.snackbar.show = true;
          this.FetchDivisionInformation();
            console.log(response.data.file)
          this.uploadconfirmation = false
          this.$store.state.snackbar.colors = 'xgreen';
                  this.$store.state.snackbar.icon = "mdi-check-circle-outline";   
          }).catch(error => console.log(error));
      },
      UpdateAllDivision(id, item){
          this.user_info = []
          this.immediate_superior_info = []
          this.division_information.name = item.name
          this.forAllUpdate = {
              id: id,
          }
          if(item.division_head_id != 0){
            this.user_info = {
              text: item.department_head_info.personal_information.middlename == null ? item.department_head_info.personal_information.lastname + ', ' + item.department_head_info.personal_information.firstname : item.department_head_info.personal_information.lastname + ', ' + item.department_head_info.personal_information.firstname + ', ' + item.department_head_info.personal_information.middlename,
              firstname: item.department_head_info.personal_information.firstname,
              lastname: item.department_head_info.personal_information.lastname,
              middlename: item.department_head_info.personal_information.middlename == null ? '' : item.department_head_info.personal_information.middlename,
              value: item.division_head_id
            }
          }
          if(item.immediate_superior_id != 0){
            this.immediate_superior_info = {
              text: item.immediate_superior_info.personal_information.middlename == null ? item.immediate_superior_info.personal_information.lastname + ', ' + item.immediate_superior_info.personal_information.firstname : item.immediate_superior_info.personal_information.lastname + ', ' + item.immediate_superior_info.personal_information.firstname + ', ' + item.immediate_superior_info.personal_information.middlename,
              firstname: item.immediate_superior_info.personal_information.firstname,
              lastname: item.immediate_superior_info.personal_information.lastname,
              middlename: item.immediate_superior_info.personal_information.middlename == null ? '' : item.immediate_superior_info.personal_information.middlename,
              value: item.immediate_superior_id
            }
          }
          this.FetchAllUserviaDivision()
          this.editfullscreendialog = true
      },
      validationfalse(){
          this.$refs.form.validate()
      },
      CloseDialogEditFullScreen(){
          this.editfullscreendialog = false
          this.division_information.name = ''
      },
      FetchAllUserviaDivision(){ // fetch all user by division id for combobox
          this.listemployeedata = []
          let payload = {
            division_id: this.forAllUpdate.id
          };
          userservices.FetchAllUserviaDivision(payload, this.$store.getters.getAccessToken).then(response => {
              if(response.data.success){
                  this.signature_path = response.data.signature_path;
                  response.data.data.forEach((value) => {
                      value.personal_information.middlename == null ? value.personal_information.middlename = '' : value.personal_information.middlename
                      value.user_other_personal_information.employee_id == null ? value.user_other_personal_information.employee_id = '' : value.user_other_personal_information.employee_id
                      this.listemployeedata.push({
                          text: value.personal_information.middlename == '' ? value.personal_information.lastname + ', ' + value.personal_information.firstname : value.personal_information.lastname + ', ' + value.personal_information.firstname + ', ' + value.personal_information.middlename,
                          firstname: value.personal_information.firstname,
                          lastname: value.personal_information.lastname,
                          middlename: value.personal_information.middlename == null ? '' : value.personal_information.middlename,
                          employee_id: value.user_other_personal_information.employee_id == null ? '' : value.user_other_personal_information.employee_id,
                          value: value.id
                      });
                  });
              }
          }).catch(error => console.log(error));
      },
    }
  }
</script>
<style scoped>
  input[type=checkbox] {
  accent-color: orange;
  }
</style>