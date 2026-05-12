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
                            color="purple"
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
                              color="purple"
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
                              color="purple"
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
                        color="purple"
                        elevation="2"
                        @click="NewRoleInformation()"
                                          v-if="$store.getters.valAccess(10)"
                      >
                        <v-icon>mdi-plus</v-icon>Create
                      </v-btn>
                      </template>

                      <template v-if="$vuetify.breakpoint.smAndDown">
                      <v-btn
                      medium
                      dark
                        color="purple"
                        elevation="2"
                        style="padding-left: 12px;padding-right: 12px;"
                        @click="NewRoleInformation()"
                                          v-if="$store.getters.valAccess(10)"
                      >
                        <v-icon>mdi-plus</v-icon>
                      </v-btn>
                    </template>
                  </v-toolbar>
                </template>
                <!-- One liner filtering -->
                <br>
                <!-- Role data table -->
                <v-data-table
                  :headers="showHeaders"
                  :items="roles"
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

                  <template v-slot:item.flag="props">
                      <v-edit-dialog
                      >
                      <v-chip
                          class="ma-2"
                          outlined
                          color="purple"
                          v-if="props.item.flag == 1"
                      >
                          Active
                      </v-chip>
                      <v-chip
                          class="ma-2"
                          outlined
                          color="red"
                          v-else
                      >
                          Inactive
                      </v-chip>
                      <template v-slot:input
                      v-if="$store.getters.valAccess(11)"
                      >
                          <v-switch
                              color="purple"
                              v-model="props.item.flag"
                              @change="UpdateRoleInformation(props.item.id, 'flag', props.item.flag)"
                          ></v-switch>
                      </template>
                      </v-edit-dialog>
                  </template>

                  <template v-slot:item.created_by="props">
                      {{ props.item.created_info.personal_information.lastname }}, {{ props.item.created_info.personal_information.firstname }}
                  </template>

                  <template v-slot:item.action="props">
                    <v-btn
                        elevation="2"
                        class="mx-2"
                        dark
                        small
                        outlined
                        color="purple"
                        @click="EditAccessInformation(props.item.id, 'name', props.item.name)"
                        v-if="$store.getters.valAccess(11)"
                      >
                      <v-icon
                              small
                              
                              @click="EditAccessInformation(props.item.id, 'name', props.item.name)"
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
                        @click="RemoveRoleInformation(props.item.id, props.item)"
                        v-if="$store.getters.valAccess(12)"
                      >
                      <v-icon
                        small
                        @click="RemoveRoleInformation(props.item.id, props.item)"
                      >
                              mdi-delete
                          </v-icon>
                        Delete
                    </v-btn>
                  </template>
                </v-data-table>
                <!-- Role data table -->
                <v-pagination
                  color="purple"
                  v-model="page"
                  :length="pageCount"
                ></v-pagination>
              </v-card-text>
            </v-card>
        </v-col>
    </v-row>

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
                color="purple"
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
                color="purple"
                @click="confirmSave()"
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
                color="purple"
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

    <!-- dialog edit access rights confirmation -->
    <template>
      <v-row justify="center">
        <v-dialog
          v-model="editaccessconfirmation"
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
                @click="changeStatusDialogEditAccess(false)"
                >
                    Cancel
              </v-btn>
              <v-btn
                elevation="2"
                class="mx-2"
                dark
                outlined
                small
                color="purple"
                @click="confirmUpdateAccess()"
                >
                Confirm
              </v-btn>
            </center>
            <br>
          </v-card>
        </v-dialog>
      </v-row>
    </template>
    <!-- dialog edit access rights confirmation -->

    <!-- dialog add role form -->
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
            color="purple"
          >
          <v-btn
            icon
            dark
            @click="dialog = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Add Role</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
          </v-toolbar-items>
          </v-toolbar>

          <v-col sm="12" md="6" offset-md="3" class="mt-3 text-center"> 
              <h4>Note: Here you can add another role information.</h4>
          </v-col>
          <v-col sm="12" md="6" offset-md="3"> 
              <v-text-field
              color="purple"
                  label="Role"
                  required
                  outlined
                  v-model="role_informations.name"
                  :counter="50"
                  :rules="nameRules"
              ></v-text-field>
              <h4 class="mb-3">Access Rights</h4>
              <v-divider></v-divider>
              <v-treeview
                  selectable
                  v-model="role_informations.access"
                  selected-color="purple"
                  :items="access"
                  class="mt-3"
              ></v-treeview>
              <center>
                <v-col sm="12" md="12">
                    <v-btn
                    color="purple"
                    block
                    outlined
                    @click="validate()"
                    :disabled="!valid"
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
    <!-- dialog add role form -->

    <!-- dialog edit role form -->
    <v-form
    ref="form"
    v-model="valid"
    lazy-validation
    >
      <v-dialog
        v-model="edit"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
      >
        <v-card>
          <v-toolbar
            dark
            color="purple"
          >
            <v-btn
              icon
              dark
              @click="edit = false"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>Edit Access Rights</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
            </v-toolbar-items>
          </v-toolbar>

          <v-col sm="12" md="6" offset-md="3" class="mt-3 text-center"> 
              <h4>Note: Here you can edit access rights information.</h4>
          </v-col>
          <v-col sm="12" md="6" offset-md="3"> 
              <v-text-field
                  label="Role"
                  required
                  outlined
                  v-model="access_information.name"
                  color="purple"
                  :rules="[v => !!v || 'Role Name is required']"
              ></v-text-field>
              <h4 class="mb-3">Access Rights</h4>
              <v-divider></v-divider>
              <v-treeview
                  selectable
                  v-model="access_information.access"
                  selected-color="purple"
                  :items="access"
                  class="mt-3"
              ></v-treeview>
              <center>
                <v-col sm="12" md="12">
                    <v-btn
                    color="purple"
                    block
                    outlined
                    :disabled="!valid"
                    @click="UpdateAccessInformation()"
                    id="btn-next" class="btn btn-success btn-sm p-2" style="font-size: 12px;"
                    >
                    Update
                  </v-btn>
                </v-col>
              </center>
          </v-col>
        </v-card>
      </v-dialog>
    </v-form>
    <!-- dialog edit role form -->
  </v-container>
</template>

<script>

  import roleservices from '../services/roleservices';

  export default {
    name: 'Role',
    data: () => ({
      hrisdata: 0,
      menucolumn: false,
      search: '',
      page: 1,
        pageCount: 0,
        loading: false,
        dialog: false,
        edit: false,
        valid: true,
        headers:[],
        selectedHeaders: [],
        headersMap: [
          { text: 'Role', sortable: true, value: 'name' },
          { text: 'Status', sortable: false, value: 'flag' },
          { text: 'Created By',sortable: false, value: 'created_by' },
          { text: 'Date Created',sortable: false, value: 'created_at' },
          { text: 'Action', sortable: false, value: 'action' }
        ],
        role_informations: {
            parent_user_id: 0,
            name: '',
            access: [],
            flag: 1,
            created_by: 0
        },
        access_information: {
            id: 0,
            name: '',
            access: []
        },
        roles: [],
        access: [],
        nameRules: [
        v => !!v || 'Role name is required',
        ],
        confirmation: false,
        saveconfirmation: false,
        editconfirmation: false,
        editaccessconfirmation: false,
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
    components: {
    },
    created(){
      this.hrisdata = localStorage.getItem('is_hris')
   
        this.$store.state.header = false;
        this.$store.state.footer = false;
        this.$store.state.snackbar.color = 'purple';
        this.FetchRoleInformations();
        this.FetchAccessInformation();
        this.headers = Object.values(this.headersMap);
        this.selectedHeaders = this.headers;
    },
    mounted(){
        this.$store.state.title = "Role Information";
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
            this.FetchRoleInformations();
        },
        changeStatusDialogEditAccess(status){
            this.editaccessconfirmation = status;
        },
        FetchRoleInformations(){ // fetch role information

            let payload = {
                user_id: this.$store.getters.fetchUserInfo.account_information.is_parent == 1 ? this.$store.getters.fetchUserInfo.account_information.id : this.$store.getters.fetchUserInfo.account_information.parent_id
            };

            roleservices.fetchRoleInformation(payload, this.$store.getters.fetchUserInfo.access_token).then(response => {
                if(response.data.success){
                    this.roles = response.data.result;
                }
                else{
                    console.log(response.data.message);
                }
            }).catch(error => console.log(error));

        },
        SetNewRoleInformations(){
            this.role_informations = {
                parent_user_id: this.$store.getters.fetchUserInfo.account_information.is_parent == 1 ? this.$store.getters.fetchUserInfo.account_information.id : this.$store.getters.fetchUserInfo.account_information.parent_id,
                name: '',
                access: [],
                flag: 1,
                created_by: this.$store.getters.fetchUserInfo.account_information.id
            };
        },
        SetEditAccessInformation(id){
            this.access_information = {
                id: id,
                name: '',
                access: []
            };
        },
        NewRoleInformation(){
            this.SetNewRoleInformations();
            this.FetchAccessInformation();
            this.dialog = true;
        },
        EditAccessInformation(id, name, value){ // fetch info for edit access rights
            this.SetEditAccessInformation(id);
            this.FetchRoleInformationViaID(id);

            this.foUpdate = {
                id: id,
                name: name,
                value: value
            }
            
            this.edit = true;
        },
        validate(){

            let val = this.$refs.form.validate();

            if(val){
                this.SaveRoleInformation();
            }
        },

        confirmSave(){ // save role information
            let payload = {
                role_information: JSON.stringify(this.role_informations)
            };
            roleservices.saveRoleInformation(payload, this.$store.getters.fetchUserInfo.access_token).then(response => {
                if(response.data.success){
                    this.dialog = false;
                    this.FetchRoleInformations();
                    this.$store.state.snackbar.message = response.data.message;
                    this.$store.state.snackbar.show = true;
                    this.$store.state.snackbar.colors = 'xgreen';
                    this.$store.state.snackbar.icon = "mdi-check-circle-outline";   

                  }
                else{
                    this.$store.state.snackbar.message = response.data.message;
                    this.$store.state.snackbar.show = true;
                    this.$store.state.snackbar.colors = 'xred';
                      this.$store.state.snackbar.icon = "mdi-alert-outline";                      
                  }
            }).catch(error => console.log(error));
            this.saveconfirmation = false
        },

        SaveRoleInformation(){
            this.saveconfirmation = true
        },
        confirmDelete(){ // delete role
            this.roles.splice(this.roles.indexOf(this.foDelete['data']), 1);

            let payload = {
                id: this.foDelete['id']
            };

            roleservices.removeRoletInformation(payload, this.$store.getters.fetchUserInfo.access_token).catch(error => console.log(error));

            this.$store.state.snackbar.message = 'Role information has been removed.';
            this.$store.state.snackbar.show = true;
            this.confirmation = false
            this.$store.state.snackbar.colors = 'xgreen';
                    this.$store.state.snackbar.icon = "mdi-check-circle-outline";   
        },
        RemoveRoleInformation(id, data){
            this.foDelete = {
                id: id,
                data: data
            }
            this.confirmation = true

        },
        confirmUpdate(){ // update role

          let payload = {
              id: this.foUpdate['id'],
              name: this.foUpdate['name'],
              value: this.foUpdate['value']
          };

          roleservices.updateRoleInformation(payload, this.$store.getters.fetchUserInfo.access_token).catch(error => console.log(error));

          this.$store.state.snackbar.message = 'Role information has been updated.';
          this.$store.state.snackbar.show = true;
          this.FetchAccessInformation();
          this.editconfirmation = false
          this.$store.state.snackbar.colors = 'xgreen';
          this.$store.state.snackbar.icon = "mdi-check-circle-outline";   
          
        },

        UpdateRoleInformation(id, name, value){

            this.foUpdate = {
                id: id,
                name: name,
                value: value
            }
            this.editconfirmation = true

        },
        async FetchAccessInformation(){ // fetch access rights information

          this.access = [];
          this.hahahaha = [];

          if(this.hrisdata == 1){ // hris access rights
              return roleservices.FetchAccessLevelHRIS(this.$store.getters.fetchUserInfo.access_token).then(response => {
                if(response.data.success){
                  response.data.result.forEach((value) => {
                    value.get_child.forEach((xvalue) => {
                          if(xvalue.sub_get_child){
                            this.hahahaha.push({
                              id: xvalue.id,
                              name: xvalue.name,
                              children: xvalue.sub_get_child
                            });
                          }
                        });
                        this.access.push({
                            id: value.id,
                            name: value.name,
                            children: this.hahahaha.length == 0 ? value.get_child : this.hahahaha
                        });
                        this.hahahaha = [];
                    });
                }
            }).catch(error => console.log(error));
          }else{ // pos / inventory access rights
              return roleservices.fetchAccessLevelInformation(this.$store.getters.fetchUserInfo.access_token).then(response => {
                if(response.data.success){
                  response.data.result.forEach((value) => {
                    if(value.name == 'HRIS'){
                      value.name = 'Employee Management'
                    }
                    value.get_child.forEach((xvalue) => {
                          if(xvalue.sub_get_child){
                            this.hahahaha.push({
                              id: xvalue.id,
                              name: xvalue.name,
                              children: xvalue.sub_get_child
                            });
                          }
                        });
                        this.access.push({
                            id: value.id,
                            name: value.name,
                            children: this.hahahaha.length == 0 ? value.get_child : this.hahahaha
                        });
                        this.hahahaha = [];
                    });
                }
            }).catch(error => console.log(error));
          }
        },
        FetchRoleInformationViaID(id){ // fetch access rights information

            let payload = {
                id: id
            };

            roleservices.fetchRoleInformationViaID(payload, this.$store.getters.fetchUserInfo.access_token).then(response => {
                if(response.data.success){
                    this.access_information.name = response.data.result.name;
                    localStorage.getItem('is_hris') == 1 ? this.access_information.access = JSON.parse(response.data.result.access_hris) : this.access_information.access = JSON.parse(response.data.result.access); 
                }
            }).catch(error => console.log(error));

        },

        confirmUpdateAccess(){ // update access rights

          let val = this.$refs.form.validate();

          if(val){

            let payloadrole = {
                  id: this.foUpdate['id'],
                  name: this.foUpdate['name'],
                  value: this.access_information.name
              };

              roleservices.updateRoleInformation(payloadrole, this.$store.getters.fetchUserInfo.access_token).catch(error => console.log(error));

              let payload = {
                  access_information: this.access_information
              }
              if(this.hrisdata == 1){ // update access rights hris
                roleservices.UpdateAccessInformationhris(payload, this.$store.getters.fetchUserInfo.access_token).then(response => {
                  if(response.data.success){
                      this.edit = false;
                      this.$store.state.snackbar.message = response.data.message;
                      this.$store.state.snackbar.show = true;
                      this.FetchRoleInformations();
                      this.$store.state.snackbar.colors = 'xgreen';
                      this.$store.state.snackbar.icon = "mdi-check-circle-outline";   
                  }else{
                      this.$store.state.snackbar.colors = 'xred';
                        this.$store.state.snackbar.icon = "mdi-alert-outline";                      
                    }                 

                }).catch(error => console.log(error));
              }else{ // update access rights pos / inventory

                roleservices.updateAccessInformation(payload, this.$store.getters.fetchUserInfo.access_token).then(response => {
                  if(response.data.success){
                      this.edit = false;
                      this.$store.state.snackbar.message = response.data.message;
                      this.$store.state.snackbar.show = true;
                      this.FetchRoleInformations();
                      this.$store.state.snackbar.colors = 'xgreen';
                      this.$store.state.snackbar.icon = "mdi-check-circle-outline";   
                  }else{
                      this.$store.state.snackbar.colors = 'xred';
                        this.$store.state.snackbar.icon = "mdi-alert-outline";                      
                    }                 

                }).catch(error => console.log(error));
              }
            }
            this.editaccessconfirmation = false
        },
        UpdateAccessInformation(){

            this.editaccessconfirmation = true

        }
    }
  }
</script>

<style scoped>
  input[type=checkbox] {
  accent-color: purple;
}
</style>