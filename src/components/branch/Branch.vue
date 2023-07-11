<template>
  <v-container style="max-width: 95%; position: relative;" >
    <v-row>
        <v-col cols="12">
            <v-card
                :loading="loading"
            >
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
                        &nbsp;&nbsp;
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
                    v-if="$store.getters.valAccess(233)"
                    @click="NewBranchInformation()"
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
                    v-if="$store.getters.valAccess(233)"
                    @click="NewBranchInformation()"
                  >
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </template>
                </v-toolbar>
              </template>
              <!-- One liner filtering -->
              <template slot="progress">
                  <v-progress-linear
                      color="deep-purple"
                      height="10"
                      indeterminate
                  ></v-progress-linear>
              </template>
              <!-- Branch data table -->
                <v-card-text>
                    <v-data-table
                      :headers="showHeaders"
                      :items="branch"
                      :search="search"
                      :page.sync="page"
                      @page-count="pageCount = $event"
                      :footer-props="{
                      'items-per-page-options':[10],
                      'disable-items-per-page': true,
                      }"
                    >

                    <template v-slot:item.branch_image="props">
                        <v-img v-if="props.item.branch_image == null" src="../../assets/images/circle_wirewolf.png" height="100px" width="100px"></v-img>
                        <v-img v-else :src="image_path+props.item.branch_image" height="100px" width="100px"></v-img>
                    </template>

                    <template v-slot:item.flag="props">
                        <v-chip
                            class="ma-2"
                            color="orange"
                            v-if="props.item.flag == 1"
                        >
                            Active
                        </v-chip>
                        <v-chip
                            class="ma-2"
                            color="red"
                            v-else
                        >
                            Inactive
                        </v-chip>
                    </template>
                    <template v-slot:item.created_by="props">
                        {{ props.item.created_info.personal_information.lastname }}, {{ props.item.created_info.personal_information.firstname }}
                    </template>
                    <template v-slot:item.action="props">
                        <v-btn
                            elevation="2"
                              class="mx-2"
                              dark
                              outlined
                              small
                              color="orange"
                              v-if="$store.getters.valAccess(234)"
                              @click="UpdateAllBranch(props.item.id, props.item)"
                          >
                          <v-icon
                                  small
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
                          v-if="$store.getters.valAccess(235)"
                          @click="RemoveBranchInformation(props.item.id, props.item)"
                      >
                          <v-icon small>
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
                <!-- Branch data table -->
              </v-card-text>
            </v-card>
        </v-col>
    </v-row>

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
                @click="SaveBranchInformation()"
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
                small
                outlined
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

    <!-- dialog add form -->
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
            @click="dialog = false, ClearBranch()"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Add Branch</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
          </v-toolbar-items>
        </v-toolbar>

        <v-col sm="12" md="6" offset-md="3" class="mt-3 text-center"> 
            <h4>Note: Here you can add another branch information.</h4>
        </v-col>
        

        <v-col sm="12" md="6" offset-md="3">
          <center>
              <div v-if="branchpicture == null || branchpicture == ''">
                  <v-img
                  src="../../assets/images/circle_wirewolf.png"
                  class="pa-2 rounded-circle d-inline-block align-self-stretch"
                  width="250"
                  height="250"
                  style="margin: 0px auto;"
                  ></v-img>   
              </div>
              <div v-else>
                  <v-img
                  v-if="this.url == null"
                  :src=this.image_path+branchpicture
                  class="pa-2 rounded-circle d-inline-block align-self-stretch"
                  width="250"
                  height="250"
                  style="margin: 0px auto;"
                  ></v-img>   
                  <v-img
                  v-else
                  :src=this.url
                  v-model="branchpicture"
                  class="pa-2 rounded-circle d-inline-block align-self-stretch"
                  width="250"
                  height="250"
                  style="margin: 0px auto;"
                  ></v-img>   
              </div>
          </center>
        </v-col>
        <v-col sm="12" md="6" offset-md="3">
            <v-text-field
                color="orange"
                v-model="business_branch_information.branch_name"
                label="Branch Name"
                required
                outlined
                 :counter="50"
                 :rules="[v => !!v || 'Branch Name is required']"
            ></v-text-field>
            <v-text-field
                color="orange"
                v-model="business_branch_information.branch_address"
                label="Branch Address"
                required
                outlined
                 :counter="50"
                 :rules="[v => !!v || 'Branch Address is required']"
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
    <!-- dialog add form -->

    <!-- dialog edit form -->
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
                <v-btn icon dark @click="CloseDialogEditFullScreen(), SetNewBranchInformation()">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>Edit Branch</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                </v-toolbar-items>
            </v-toolbar>

            <v-col sm="12" md="6" offset-md="3" class="mt-3 text-center"> 
            <h4>Note: Here you can edit branch information.</h4>
            </v-col>
            

            <v-col sm="12" md="6" offset-md="3">
              <center>
                  <div v-if="branchpicture == null || branchpicture == ''">
                      <v-img
                      src="../../assets/images/circle_wirewolf.png"
                      class="pa-2 rounded-circle d-inline-block align-self-stretch"
                      width="250"
                      height="250"
                      style="margin: 0px auto;"
                      ></v-img>   
                  </div>
                  <div v-else>
                      <v-img
                      v-if="this.url == null"
                      :src=this.image_path+branchpicture
                      class="pa-2 rounded-circle d-inline-block align-self-stretch"
                      width="250"
                      height="250"
                      style="margin: 0px auto;"
                      ></v-img>   
                      <v-img
                      v-else
                      :src=this.url
                      v-model="branchpicture"
                      class="pa-2 rounded-circle d-inline-block align-self-stretch"
                      width="250"
                      height="250"
                      style="margin: 0px auto;"
                      ></v-img>   
                  </div>
              </center>
            </v-col>
            <v-col sm="12" md="6" offset-md="3">
                <v-switch
                    v-model="business_branch_information.flag"
                    inset
                    :label="activeinactive"
                    color="orange"
                    @change="activeinactivetrigger()"
                ></v-switch>
                <v-text-field
                    color="orange"
                    v-model="business_branch_information.branch_name"
                    label="Branch Name"
                    required
                    outlined
                    :counter="50"
                    :rules="[v => !!v || 'Branch Name is required']"
                ></v-text-field>
                <v-text-field
                    color="orange"
                    v-model="business_branch_information.branch_address"
                    label="Branch Address"
                    required
                    outlined
                    :counter="50"
                    :rules="[v => !!v || 'Branch Address is required']"
                ></v-text-field>
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
            </v-col>
          </v-form>
      </v-card>
    </v-dialog>
    <!-- dialog edit form -->
  </v-container>
</template>

<script>

  import branchservices from '../services/branchservices';

  export default {
    name: 'Branch',
    data: () => ({
      hrisdata: 0,
      activeinactive: '',
      editfullscreendialog: false,
      isSelecting: false,
      url: null,
      image_path: [],
      branchpicture: '',
      menucolumn : '',
      search: '',
      page: 1,
      pageCount: 0,
      dialog: false,
      loading: false,
      selectedHeaders: [],
      headers:[],
      headersMap: [
        { text: 'Image',sortable: false, value: 'branch_image' },
        { text: 'Branch',sortable: true, value: 'branch_name' },
        { text: 'Branch Address',sortable: false, value: 'branch_address' , width: '230'},
        { text: 'Status',sortable: false, value: 'flag' },
        { text: 'Created By',sortable: false, value: 'created_by' },
        { text: 'Action',sortable: false, value: 'action' , width: '230'}
      ],
      branch: [],
      business_branch_information: {
          parent_user_id: 0,
          business_id: 0,
          branch_name: '',
          branch_address: '',
          created_by: 0,
          flag: ''
      },
      valid: true,
      nameRules: [
      v => !!v || 'Branch Name is required',
      ],
      confirmation: false,
      saveconfirmation: false,
      editconfirmation: false,
      foDelete: {
          id: 0,
          data: ''
      }
    }),
    created(){
      this.hrisdata = localStorage.getItem('is_hris')
        if(this.hrisdata == 1){
            this.$store.state.header = false;
            this.$store.state.footer = false;
        }else{
            this.$store.state.header = true;
            this.$store.state.footer = true;
        }
        this.$store.state.snackbar.color = 'orange';
        this.FetchBranchInformation();
        this.SetNewBranchInformation();
        this.headers = Object.values(this.headersMap);
        this.selectedHeaders = this.headers;
    },
    mounted(){
        this.$store.state.title = "Branch Information";
    },
    computed: {
      //Done to get the ordered headers
      showHeaders () {
        return this.headers.filter(s => this.selectedHeaders.includes(s));
      }
    },
    methods: {
        changeStatusDialog(status){
            this.confirmation = status;
        },
        changeStatusDialogSave(status){
            this.saveconfirmation = status;
        },
        changeStatusDialogEdit(status){
            this.editconfirmation = status;
            this.FetchBranchInformation();
        },
        FetchBranchInformation(){ // fetch branch information
          let payload = {
              user_id: this.$store.getters.getParentID
          };

          branchservices.fetchBranchInformation(payload,  this.$store.getters.getAccessToken).then(response => {
              if(response.data.success){
                  this.branch = response.data.result;
                  this.image_path = response.data.image_path;
              }
          }).catch(error => console.log(error));
        },
        confirmDelete(){ // delete branch
            this.branch.splice(this.branch.indexOf(this.foDelete['data']), 1);

            let payload = {
                id: this.foDelete['id']
            };

            branchservices.removeBranchInformation(payload, this.$store.getters.getAccessToken).catch(error => console.log(error));

            this.$store.state.snackbar.message = 'Branch information has been removed.';
            this.$store.state.snackbar.show = true;
            this.confirmation = false
            this.$store.state.snackbar.colors = 'xgreen';
            this.$store.state.snackbar.icon = "mdi-check-circle-outline";                                  

        },
        RemoveBranchInformation(id, data){  // remove branch confirmation

            this.foDelete = {
                id: id,
                data: data
            }
            this.confirmation = true
        },
        confirmUpdate(){  // update branch information
          this.business_branch_information.flag == true ? this.business_branch_information.flag = 1 : this.business_branch_information.flag = 0;
          console.log( this.business_branch_information.flag );
          let val = this.$refs.form.validate();

          this.valid = true;

          if(val){

            const formData = new FormData();
            formData.append('file', this.selectedFile);
            formData.append('id', this.forAllUpdate.id);
            formData.append('business_branch_information', JSON.stringify(this.business_branch_information));

            branchservices.UpdateBranchInformation(formData,  this.$store.getters.getAccessToken).catch(error => console.log(error));
            this.$store.state.snackbar.message = 'Branch information has been updated.';
            
            this.FetchBranchInformation();
            this.ClearBranch();
            this.$store.state.snackbar.show = true;
            this.$store.state.snackbar.colors = 'xgreen';
            this.$store.state.snackbar.icon = "mdi-check-circle-outline";                                  
          }
            
            this.editfullscreendialog = false
            this.editconfirmation = false
        },
        NewBranchInformation(){
            this.dialog = true;
        },
        SetNewBranchInformation(){

            this.business_branch_information = {
                parent_user_id: this.$store.getters.getParentID,
                business_id: this.$store.getters.getBusinessID,
                branch_name: '',
                branch_address: '',
                created_by: this.$store.getters.fetchUserInfo.account_information.id
            };

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
        SaveBranchInformation(){ // save branch 

            const formData = new FormData();
            formData.append('file', this.selectedFile);
            formData.append('business_branch_information', JSON.stringify(this.business_branch_information));

            branchservices.saveBranchInformation(formData, this.$store.getters.fetchUserInfo.access_token).then(response => {
                if(response.data.success){
                    this.dialog = false;
                    this.SetNewBranchInformation();
                    this.FetchBranchInformation();
                    this.ClearBranch();
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
        handleFileImport() {
          this.isSelecting = true;

          // After obtaining the focus when closing the FilePicker, return the button state to normal
          window.addEventListener('focus', () => {
              this.isSelecting = false
          }, { once: true });
          
          // Trigger click on the FileInput
          this.$refs.uploader.click();
        },
        onFileChanged(e) {
          this.selectedFile = e.target.files[0];
          if(!this.selectedFile){
              this.url=null;
              return;
          } 
          this.url= URL.createObjectURL(this.selectedFile);
          this.branchpicture = 1;
          // Do whatever you need with the file, liek reading it with FileReader
        },
        UpdateAllBranch(id, item){ // fetch branch info for update
          this.branchpicture = item.branch_image
          this.selectedFile = item.branch_image
          this.business_branch_information.branch_name = item.branch_name
          this.business_branch_information.branch_address = item.branch_address
          this.business_branch_information.flag = item.flag
          this.activeinactivetrigger();
          this.forAllUpdate = {
              id: id,
          }
          this.editfullscreendialog = true
        },
        CloseDialogEditFullScreen(){
          this.editfullscreendialog = false
          this.ClearBranch();
        },
        validationfalse(){
          this.$refs.form.validate()
        },
        ClearBranch(){
          this.branchpicture = ''
          this.selectedFile = ''
          this.business_branch_information.branch_name = ''
          this.business_branch_information.branch_address = ''
          this.business_branch_information.flag = ''
        },
        activeinactivetrigger(){
          if(this.business_branch_information.flag == 1){
              this.activeinactive = 'Active'
          }else{
              this.activeinactive = 'Inactive'
          }
        },
      }
    }
</script>

<style scoped>
  input[type=checkbox] {
  accent-color: orange;
}
.btn-camera{
    margin-top: -25px;
    position: absolute;
    margin-left: -18px;
    background-color: white;
}
</style>
