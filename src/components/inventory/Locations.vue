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
          @click="ExportLocationInformation()"
        >
        <!-- insert val access location download -->
          <v-icon>mdi-download-outline</v-icon>Download
        </v-btn>
        </template>


        <template v-if="$vuetify.breakpoint.smAndDown">
        &nbsp;<v-btn
        medium
        dark
          color="orange"
          style="padding-left: 12px;padding-right: 12px;"
          @click="ExportLocationInformation()"
        >
        <!-- insert val access location download -->
          <v-icon>mdi-download-outline</v-icon>
          </v-btn>
        </template>
      <template v-if="$vuetify.breakpoint.mdAndUp">
        &nbsp;<v-btn
        medium
        dark
          color="orange"
          @click="NewLocation()"
          v-if="$store.getters.valAccess(46)"
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
          @click="NewLocation()"
          v-if="$store.getters.valAccess(46)"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
        </template>

  </v-toolbar>
</template>
                            <br>
                <v-data-table
                    :headers="showHeaders"
                    :search="search"
                    :items="locations"
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
                            @save="UpdateLocationInformation(props.item.id, 'name', props.item.name)"
                        >
                        {{ props.item.name }}
                        <template v-slot:input
                        v-if="$store.getters.valAccess(56)"
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

                    
                    <template v-slot:item.branch="props">
                        <v-edit-dialog
                            :return-value.sync="props.item.branch_code"
                            @open="SetEditCombobox(props.item.branch_info.branch_name, props.item.branch_code, 'branch')"
                            @save="SaveEditCombobox(props.item, 'branch')"
                        >
                        {{ props.item.branch_info.branch_name }}
                        <template v-slot:input
                        v-if="$store.getters.valAccess(56)"
                        >
                                <v-combobox
                                    outlined
                                    label="Branch"
                                    :items="branch"
                                    v-model="selected"
                                    class="pt-5"
                                    color="orange"
                                ></v-combobox>
                            </template>
                            </v-edit-dialog>
                    </template>

                    <template v-slot:item.type="props">
                            <div v-if="props.item.type == 1">
                                Inventory
                            </div>
                            <div v-else>
                                Sales
                            </div>
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
                            @click="EditLocationInformation(props.item.id, props.item)"
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
                          v-if="$store.getters.valAccess(57)"
                            @click="RemoveLocationInformation(props.item.id, props.item)"
                      >
                      <v-icon
                            small
                            @click="RemoveLocationInformation(props.item.id, props.item)"
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
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="orange"
            text
            @click="changeStatusDialogEdit(false)"
          >
            Cancel
          </v-btn>
          <v-btn
            color="orange"
            text
            @click="confirmUpdate()"
          >
            Update
          </v-btn>
        </v-card-actions>
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
            @click="UpdateAllLocationInformation()"
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
            @click="SaveLocationInformation()"
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
          <v-toolbar-title>Add Locations</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn
              dark
              text
              @click="validate()"
              id="btn-next" class="btn btn-primary btn-sm p-2" style="font-size: 12px;"
              >
              Save
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>

        <v-col sm="12" md="6" offset-md="3" class="mt-3 text-center"> 
            <h4>Note: Here you can add another location information.</h4>
        </v-col>
        <v-col sm="12" md="6" offset-md="3"> 
            <v-text-field
                v-model="location_information.name"
                label="Location"
                required
                outlined
                 :counter="50"
                 :rules="nameRules"
                      color="orange"
            ></v-text-field>
        </v-col>
        <v-col sm="12" md="6" offset-md="3"> 
            <v-combobox
                v-model="location_information.branch_code"
                label="Branch Code"
                required
                outlined
                :items="branch"
                :rules="[v => !!v || 'Branch Information is required']"
                color="orange"
            ></v-combobox>
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
          <v-toolbar-title>Update Location</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
          </v-toolbar-items>
        </v-toolbar>

        <v-col sm="12" md="6" offset-md="3" class="mt-3 text-center"> 
            <h4>Note: Here you can update location information.</h4>
        </v-col>
        <v-col sm="12" md="6" offset-md="3"> 
            <v-text-field
                v-model="update_location_information.name"
                label="Location"
                required
                outlined
                 :counter="50"
                 :rules="nameRules"
                      color="orange"
            ></v-text-field>
        </v-col>
        <v-col sm="12" md="6" offset-md="3"> 
            <v-combobox
                v-model="update_location_information.branch_code"
                label="Branch Code"
                required
                outlined
                :items="branch"
                :rules="[v => !!v || 'Branch Information is required']"
                color="orange"
            ></v-combobox>
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

  import locationservices from '../services/locationservices';
  import branchservices from '../services/branchservices';

  export default {
    name: 'Locations',
    created() {
        this.FetchLocationInformation();
        this.FetchBranchInformation();
        this.$store.state.snackbar.color = 'orange';
        this.headers = Object.values(this.headersMap);
        this.selectedHeaders = this.headers;
    },
    mounted(){
        this.$store.state.title = "Locations";
    },
    computed: {
      //Done to get the ordered headers
      showHeaders () {
        return this.headers.filter(s => this.selectedHeaders.includes(s));
      }
    },
    data: () => ({
      menucolumn : '',
      search: '',
      page: 1,
        pageCount: 0,
        dialog: false,
        location_information: {
            name: '',
            branch_code: '',
            type: 1
        },
        update_location_information: {
            name: '',
            branch_code: [],
            type: 1
        },
        headers:[],
        selectedHeaders: [],
        headersMap: [
          {
            text: 'Location',
            align: 'start',
            sortable: true,
            value: 'name',
          },
          { text: 'Branch',sortable: false, value: 'branch' },
          { text: 'Type',sortable: false, value: 'type' },
          { text: 'Created By',sortable: false, value: 'createdby' },
          { text: 'Created At',sortable: false, value: 'createdat' },
          { text: 'Action',sortable: false, value: 'action' }
        ],
        selected: { text: '', value: '' },
        locations: [],
        branch: [],
        valid: true,
        nameRules: [
        v => !!v || 'Location name is required',
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

      // edit location information
      EditLocationInformation(id, data){
        this.updatedialog = true;
        this.FetchBranchInformation();

        let payload = {
                id: data.branch_code
            };

            branchservices.fetchBranchInformationViaID(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
        this.update_location_information = {
            name: data.name,
            branch_code: {
              text: response.data.result.branch_name,
              value: data.branch_code
            },
            type: 1
            };
                       
                }
            }).catch(error => console.log(error));

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
            this.FetchLocationInformation();
        },
        changeStatusDialogUpdate(status){
            this.updateconfirmation = status;
            this.FetchLocationInformation();
        },
        // end check pop up message 

        // get location information
        FetchLocationInformation(){

            let payload = {
                user_id: this.$store.getters.getParentID
            };
            locationservices.fetchLocationInformation(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    this.locations = response.data.result;
                }
            }).catch(error => console.log(error));

        },

        // get branch information
        FetchBranchInformation(){
            
            let payload = {
                user_id: this.$store.getters.getParentID
            };

            branchservices.fetchBranchInformation(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    response.data.result.forEach((value) => {
                        this.branch.push({
                            text: value.branch_name,
                            value: value.id
                        });
                        console.log(this.branch);
                    });
                }
            }).catch(error => console.log(error));

        },

        // show dialog for add location
        NewLocation(){
            this.dialog = true;
            this.FetchBranchInformation();
        },

        // form validation on required fields
        validate(){

            let val = this.$refs.form.validate();

            if(val){
                this.confirmSave();
            }
        },

        // form validation update on required fields
        updatevalidate(){
          let val = this.$refs.form.validate();

          if(val){
              this.confirmUpdateAll();
          }
        },

        // show pop up for update all
        confirmUpdateAll(){
            this.updateconfirmation = true
        },


        // updating all location information
        UpdateAllLocationInformation(){

          var myBranchCode = this.update_location_information['branch_code']
            this.update_location_information['branch_code'] = myBranchCode['value']
        let payload = {
          id: this.updateAllID,
          location_information: JSON.stringify(this.update_location_information)
        };

        locationservices.updateAllLocationInformation(payload, this.$store.getters.getAccessToken).then(response => {
          if(response.data.success){
              this.updatedialog = false;
              this.updateconfirmation = false;
              this.FetchLocationInformation();
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


        // confirmation saving location
        confirmSave(){
            this.saveconfirmation = true
        },

        // saving location informations
        SaveLocationInformation(){
            var myBranchCode = this.location_information['branch_code']
            this.location_information['branch_code'] = myBranchCode['value']
            let payload = {
                location_information: JSON.stringify(this.location_information)
                };
            
            locationservices.saveLocationInformation(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    this.dialog = false;
                    this.FetchLocationInformation();
                    this.ClearSaveLocation();
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
                // reset value of location_information branch_code
             this.location_information['branch_code'] = myBranchCode

        },

        // clear fields after saving
        ClearSaveLocation(){
            this.location_information.name = '';
            this.location_information.branch_code = null;
        },

        // set edit combo box
        SetEditCombobox(text, value, action){

            this.selected = {
                text: text,
                value: value
            };

            if(action=="branch"){
                this.FetchBranchInformation();
            }

        },

        // save edit combobox
        SaveEditCombobox(item, action){
            console.log(item.id);
            if(action=="branch"){
                item.branch_info.name = this.selected.text;
                this.UpdateLocationInformation(item.id, 'branch_code', this.selected.value);
            }

        },

        // confirm update information
        confirmUpdate(){
            let payload = {
                id: this.foUpdate['id'],
                location_information: JSON.stringify({
                    name: this.foUpdate['name'],
                    value: this.foUpdate['value']
                })
            }
            locationservices.updateLocationInformation(payload, this.$store.getters.getAccessToken).catch(error => console.log(error));
            this.$store.state.snackbar.message = 'Location information has been updated.';
            this.$store.state.snackbar.show = true;
            this.FetchLocationInformation();
            this.editconfirmation = false
            this.$store.state.snackbar.colors = 'xgreen';
                    this.$store.state.snackbar.icon = "mdi-check-circle-outline";   

        },

        // show pop up for updating location information
        UpdateLocationInformation(id, name, value){

            this.foUpdate = {
                id: id,
                name: name,
                value: value
            }
            this.editconfirmation = true

        },

        // confirm deletion location information
        confirmDelete(){
            this.locations.splice(this.locations.indexOf(this.foDelete['data']), 1);

            let payload = {
                id: this.foDelete['id']
            };

            locationservices.removeLocationInformation(payload, this.$store.getters.getAccessToken).catch(error => console.log(error));

            this.$store.state.snackbar.message = 'Location information has been removed.';
            this.$store.state.snackbar.show = true;
            this.confirmation = false
            this.$store.state.snackbar.colors = 'xgreen';
                    this.$store.state.snackbar.icon = "mdi-check-circle-outline";   

        },

        // show pop up for deleting location information
        RemoveLocationInformation(id, data){
            this.foDelete = {
                id: id,
                data: data
            }
            this.confirmation = true
        },


        // export xlsx for location
        ExportLocationInformation(){

          let payload = {
              user_id: this.$store.getters.getParentID
          };

          locationservices.exportLocationInformation(payload, this.$store.getters.getAccessToken)
          .then(response => {
              const url = window.URL.createObjectURL(new Blob([response.data]))
              const link = document.createElement('a')
              link.href = url
              link.setAttribute('download','location.xlsx')
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
