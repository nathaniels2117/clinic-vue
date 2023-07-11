<template>
  <v-container style="max-width: 95%; position: relative;">
    <!-- One liner filtering -->
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
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
        </template>
  </v-toolbar>
</template>
<!-- End One liner filtering -->
<!-- viewing of records -->
                <br>
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
                    <template v-slot:item.particular="props">
                        {{ props.item.particular_info.name }}
                    </template>
                    <template v-slot:item.classes="props">
                        {{ props.item.class_info.name }}
                    </template>
                    <template v-slot:item.area="props">
                        {{ props.item.area_info.name }}
                    </template>
                    <template v-slot:item.standard="props">
                        {{ props.item.standard_info.name }}
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
                          color="red"
                          v-if="$store.getters.valAccess(16)"
                            @click="RemoveKnkSetupInformation(props.item.id, props.item)"
                        >
                        <v-icon
                                small
                            @click="RemoveKnkSetupInformation(props.item.id, props.item)"
                            >
                                mdi-delete
                            </v-icon>
                          Delete
                      </v-btn>
                    </template>
                </v-data-table>
                <!-- End viewing of records -->
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
            @click="SaveKnkSetupInformations()"
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
            @click="ImportKnkSetupInformation()"
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
          <v-toolbar-title>Add Setup</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
          </v-toolbar-items>
        </v-toolbar>
        <v-col sm="12" md="6" offset-md="3" class="mt-3 text-center"> 
            <h4>Note: Here you can add another setup information.</h4>
        </v-col>
        <v-col sm="12"> 
            <v-text-field
                color="orange"
                v-model="knksetup_information.name"
                label="Setup"
                required
                outlined
                 :rules="nameRules"
            ></v-text-field>
                <v-combobox
                v-model="knksetup_information.class_id"
                label="Class"
                required
                outlined
                :items="classes"
                color="orange"
            ></v-combobox>  
            <center>
                  <div class="container">
                        <div class="row">
                            <div class="col-sm-12">
                            <b><center>CHECKLIST</center></b>
                            </div>
                        </div>
                    </div>
                  </center>
              <div class="container addproduct" 
                        v-for="(setup_item_information, counter) in setup_item_information"
                        v-bind:key="counter"
                        >
                        <div class="row">
                            <div class="col-sm-3">                              
                              <v-combobox
                                  v-model="setup_item_information.area_id"            
                                  label="Area"
                                  required
                                  outlined
                                  :items="area"
                                  color="orange"
                              ></v-combobox>    
                              </div>                         
                            <div class="col-sm-3">
                                <v-combobox
                                    v-model="setup_item_information.particular_id"
                                    label="Particular"
                                    required
                                    outlined
                                    :items="particular"
                                    @change="FetchKnkStandardInformationViaID(counter)" 
                                    :rules="[v => !!v || 'Particular Information is required']"
                                    color="orange"
                                ></v-combobox>                                        
                            </div>
                            <div class="col-sm-3">                              
                              <v-combobox
                                  v-model="setup_item_information.standard_id"            
                                  label="Standard"
                                  required
                                  outlined
                                  :items="standard"
                                  :rules="[v => !!v || 'Standard is required']"
                                  color="orange"
                              ></v-combobox>       
                            </div>                            
                            <div class="col-sm-2">
                                <v-text-field
                                    color="orange"
                                    v-model="setup_item_information.points"
                                    label="Points"
                                    required
                                    outlined
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
                    <div class="col-sm-2" style="padding-left: 24px">
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
                      </center>
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
    <!-- Dialog Full Screen-->
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
                <v-toolbar-title>Edit Setup</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                </v-toolbar-items>
            </v-toolbar>
            <v-col sm="12" md="6" offset-md="3" class="mt-3 text-center"> 
            <h4>Note: Here you can edit setup information.</h4>
        </v-col>
        <v-col sm="12" md="6" offset-md="3">
            <v-text-field
                color="orange"
                v-model="knksetup_information.name"
                label="Setup"
                required
                outlined
                 :counter="50"
                 :rules="nameRules"
            ></v-text-field>
            <v-combobox
                v-model="knksetup_information.class_id"
                label="Class"
                required
                outlined
                :items="classes"
                color="orange"
            ></v-combobox>  
            <v-combobox
                v-model="knksetup_information.area_id"
                label="Area"
                required
                outlined
                :items="area"
                color="orange"
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
  </v-container>
</template>

<script>

  import knksetupservices from '../services/knksetupservices';
  import knkparticularservices from '../services/knkparticularservices';
  import knkclassservices from '../services/knkclassservices';
  import knkareaservices from '../services/knkareaservices';
  import knkstandardservices from '../services/knkstandardservices'; 

  export default {
    name: 'KnkSetup',
    created() {
        this.FetchKnkSetupInformation();
        this.FetchKnkParticularInformation();
        this.FetchKnkAreaInformation();
        this.FetchKnkClassInformation();
        this.$store.state.snackbar.color = 'orange';
        this.headers = Object.values(this.headersMap);
        this.selectedHeaders = this.headers;
    },
    mounted(){
        this.$store.state.title = "Setup";
    },
    computed: {
      showHeaders () {
        return this.headers.filter(s => this.selectedHeaders.includes(s));
      }
    },
    data: () => ({
      editfullscreendialog : false,
      menucolumn: false,
      search: '',
      page: 1,
        pageCount: 0,
        dialog: false,
        knksetup_information: {
            name: '',
            class_id: '',
            area_id: '',
        },
        headers:[],
        selectedHeaders: [],
        headersMap: [
          {
            text: 'Name',
            align: 'start',
            sortable: true,
            value: 'name',
          },
          { text: 'Class', sortable: false, value: 'classes' },
          { text: 'Created By', sortable: false, value: 'createdby' },
          { text: 'Created At', sortable: false, value: 'createdat' },
          { text: 'Action', sortable: false, value: 'action' , width: '230'}
        ],
        particular: [],
        classes: [],
        area: [],
        standard: [],
        division: [],
        valid: true,
        nameRules: [
        v => !!v || 'Setup name is required',
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
        },
        setup_item_information:[
                {
                    area_id: '',
                    particular_id: '',
                    standard_id: '',
                    points: ''
                }
        ],        
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
            this.FetchKnkSetupInformation();
        },
        // Get KnK Setup data
        FetchKnkSetupInformation(){
            let payload = {
                user_id: this.$store.getters.getParentID
            };
            knksetupservices.fetchKnkSetupInformation(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    this.division = response.data.result;
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
        // Add item
        addProducts(){
            this.setup_item_information.push({
              area_id: '',
              particular_id: '',
              standard_id: '',
              points: ''
            })
          },
          deleteProduct(counter){
            this.setup_item_information.splice(counter,1)
            },        
        confirmSave(){
            this.saveconfirmation = true
        },
        SaveKnkSetupInformations(){
            var classID = this.knksetup_information['class_id']
            this.knksetup_information['class_id'] = classID['value']
            this.knksetup_information['setup_item_information'] = this.setup_item_information
            let payload = {
                knksetup_information: JSON.stringify(this.knksetup_information)
                };
              console.log(payload)
            knksetupservices.saveKnkSetupInformations(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    this.dialog = false;
                    this.FetchKnkSetupInformation();
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
        // Get KnK Particular
        FetchKnkParticularInformation(){
          this.particular = [];
            let payload = {
                user_id: this.$store.getters.getParentID
            };
            knkparticularservices.fetchKnkParticularInformation(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    response.data.result.forEach((value) => {
                        this.particular.push({
                            text: value.name,
                            value: value.id
                        });
                    });
                }
            }).catch(error => console.log(error));
        },  
        // Get KnK Standard via ID
        FetchKnkStandardInformationViaID(counter){
          this.standard = [];
        let payload = {
            particular_id: this.setup_item_information[counter].particular_id.value
        };
        knkstandardservices.fetchKnkStandardInformationViaID(payload, this.$store.getters.getAccessToken).then(response => {
            if(response.data.success){
                response.data.result.forEach((value) => {
                    this.standard.push({
                        text: value.name,
                        value: value.id
                    });
                });
            }
        }).catch(error => console.log(error));
        },        
        // Get Knk standard
        FetchKnkStandardInformation(){
          this.standard = [];
          let payload = {
                user_id: this.$store.getters.getParentID
            };
        knkstandardservices.fetchKnkStandardInformation(payload, this.$store.getters.getAccessToken).then(response => {
            if(response.data.success){
                response.data.result.forEach((value) => {
                    this.standard.push({
                        text: value.name,
                        value: value.id
                    });
                });
            }
        }).catch(error => console.log(error));
        },          
        // Get Knk class
        FetchKnkClassInformation(){
            let payload = {
                user_id: this.$store.getters.getParentID
            };
            knkclassservices.fetchKnkClassInformation(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    response.data.result.forEach((value) => {
                        this.classes.push({
                            text: value.name,
                            value: value.id
                        });
                    });
                }
            }).catch(error => console.log(error));
        }, 
        // Get Knk Class
        FetchKnkAreaInformation(){
          this.area = [];
            let payload = {
                user_id: this.$store.getters.getParentID
            };
            knkareaservices.fetchKnkAreaInformation(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    response.data.result.forEach((value) => {
                        this.area.push({
                            text: value.name,
                            value: value.id
                        });
                    });
                }
            }).catch(error => console.log(error));
        },                
        ClearSaveDivision(){
            this.knksetup_information.name = '';
        },
        confirmUpdate(){
          this.FetchKnkParticularInformation();
          this.FetchKnkClassInformation();
          this.FetchKnkAreaInformation();
            let payload = {
                id: this.forAllUpdate['id'],
                knksetup_information: JSON.stringify({
                    name: this.knksetup_information.name
                })
            }
            knksetupservices.updateKnkSetupInformation(payload, this.$store.getters.getAccessToken).catch(error => console.log(error));
            this.$store.state.snackbar.message = 'Division information has been updated.';
            this.$store.state.snackbar.show = true;
            this.FetchKnkSetupInformation();
            this.editconfirmation = false
            this.editfullscreendialog = false
            this.$store.state.snackbar.colors = 'xgreen';
                    this.$store.state.snackbar.icon = "mdi-check-circle-outline";   
        },
        UpdateKnkSetupInformation(id, name){
            this.foUpdate = {
                id: id,
                name: name
            }
            this.editconfirmation = true
        },
        confirmDelete(){
            this.division.splice(this.division.indexOf(this.foDelete['data']), 1);
            let payload = {
                id: this.foDelete['id']
            };
            knksetupservices.removeKnkSetupInformation(payload, this.$store.getters.getAccessToken).catch(error => console.log(error));
            this.$store.state.snackbar.message = 'Setup information has been removed.';
            this.$store.state.snackbar.show = true;
            this.confirmation = false
            this.$store.state.snackbar.colors = 'xgreen';
            this.$store.state.snackbar.icon = "mdi-check-circle-outline";   
        },
        RemoveKnkSetupInformation(id, data){
            this.foDelete = {
                id: id,
                data: data
            }
            this.confirmation = true
        },
          UpdateAllDivision(id, item){
            this.knksetup_information.name = item.name
            this.forAllUpdate = {
                id: id,
            }
            this.editfullscreendialog = true
        },
        validationfalse(){
            this.$refs.form.validate()
        },
        CloseDialogEditFullScreen(){
            this.editfullscreendialog = false
            this.knksetup_information.name = ''
        },
    }
  }
</script>
<style scoped>
input[type=checkbox] {
accent-color: orange;
}
</style>