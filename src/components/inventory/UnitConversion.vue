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
          @click="ExportUnitInformation()"
        >
        <!-- insert val access unit download -->
          <v-icon>mdi-download-outline</v-icon>
        </v-btn>

        &nbsp;
        <v-btn
        medium
        dark
          color="orange"
          elevation="2"
          @click="uploadfileopen()"
          v-if="$store.getters.valAccess(48)"
        >
        <!-- insert val access unit upload -->
          <v-icon>mdi-upload-outline</v-icon>
        </v-btn>
        </template>

        &nbsp;
        <template v-if="$vuetify.breakpoint.smAndDown">
        
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="orange"
                  elevation="2"
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
                  <v-list-item-title v-if="$store.getters.valAccess(48)" @click="uploadfileopen()"> <v-icon>{{ item.icon }}</v-icon>{{ item.text }}</v-list-item-title>
                </div>
                <div v-else>
                  <v-list-item-title @click="ExportUnitInformation()"> <v-icon>{{ item.icon }}</v-icon>{{ item.text }}</v-list-item-title>
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
          @click="UnitConversion()"
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
          elevation="2"
          style="padding-left: 12px;padding-right: 12px;"
          @click="UnitConversion()"
          v-if="$store.getters.valAccess(46)"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
        </template>

        <template v-if="$vuetify.breakpoint.mdAndUp">
          &nbsp;<v-btn
          medium
        dark
          color="orange"
          elevation="2"
          @click="Unit()"
          v-if="$store.getters.valAccess(51,52,53)"
          >
            <v-icon small>
              mdi-scale
            </v-icon>
            Unit
        </v-btn>
        </template>

        <template v-if="$vuetify.breakpoint.smAndDown">
          &nbsp;<v-btn
          medium
        dark
          color="orange"
          elevation="2"
          style="padding-left: 12px;padding-right: 12px;"
          @click="Unit()"
          v-if="$store.getters.valAccess(51,52,53)"
          >
            <v-icon small>
              mdi-scale
            </v-icon>
            
        </v-btn>
        </template>
        

        

  </v-toolbar>
</template>
                            <br>
                  <v-data-table
                      :headers="showHeaders"
                      :search="search"
                      :items="unit_conversion_info"
                      :page.sync="page"
                      @page-count="pageCount = $event"
                      :footer-props="{
                      showFirstLastPage: false,
                      'items-per-page-options':[10],
                      'disable-items-per-page': true
    }"
                  >

                        <template v-slot:item.convertvalue="props">
                            {{ parseFloat(props.item.value).toFixed(2) }}
                        </template>

                      

                        <template v-slot:item.unit_info.name="props">
                            <v-edit-dialog
                                :return-value.sync="props.item.unit_info.name"
                                @open="SetEditCombobox(props.item.unit_info.name, props.item.unit_info.id, 'unit_id')"
                                @save="SaveEditCombobox(props.item, 'unit_id')"
                            >
                            {{ props.item.unit_info.name ? props.item.unit_info.name : 'No Data'}}
                            <template v-slot:input
                            v-if="$store.getters.valAccess(52)"
                            >
                                <v-combobox
                                    outlined
                                    label="Unit"
                                    :items="unit_conversions"
                                    v-model="selected"
                                    class="pt-5"
                                    color="orange"
                                ></v-combobox>
                            </template>
                            </v-edit-dialog>
                        </template>

                        <template v-slot:item.conversion_info.name="props">
                            <v-edit-dialog
                                :return-value.sync="props.item.conversion_info.name"
                                @open="SetEditCombobox(props.item.conversion_info.name, props.item.conversion_info.id, 'conversion_id')"
                                @save="SaveEditCombobox(props.item, 'conversion_id')"
                            >
                            {{ props.item.conversion_info.name ? props.item.conversion_info.name : 'No Data'}}
                            <template v-slot:input
                            v-if="$store.getters.valAccess(52)"
                            >
                                <v-combobox
                                    outlined
                                    label="Unit"
                                    :items="unit_conversionsto"
                                    v-model="selected"
                                    class="pt-5"
                                    color="orange"
                                ></v-combobox>
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
                            @click="EditUnitConversionInformation(props.item.id, props.item)"
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
                          v-if="$store.getters.valAccess(53)"
                              @click="RemoveUnitConversionInformation(props.item.id, props.item)"
                      >
                      <v-icon
                            small
                              @click="RemoveUnitConversionInformation(props.item.id, props.item)"
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
            @click="UpdateAllUnitConversionInformation()"
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
            @click="SaveUnitInformation()"
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
  
                <!-- save conversion confirmation dialog -->
                <template>
    <v-row justify="center">
      <v-dialog
        v-model="saveconversionconfirmation"
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
            @click="changeStatusDialogConversionSave(false)"
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
            @click="SaveUnitConversionInformation()"
            >
            Confirm
          </v-btn>
        </center>
        <br>
        </v-card>
      </v-dialog>
    </v-row>
  </template>
      <!-- end save conversion confirmation dialog -->
  
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
      <!-- delete end confirmation dialog -->
  
  
  
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
            @click="ImportUnitInformation()"
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
            <v-toolbar-title>Add Unit</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
            </v-toolbar-items>
          </v-toolbar>
  
          <v-col sm="12" md="6" offset-md="3" class="mt-3 text-center"> 
              <h4>Note: Here you can add another unit information.</h4>
          </v-col>
          <v-col sm="12" md="6" offset-md="3"> 
              <v-text-field
                  v-model="unit_information.name"
                  label="Unit"
                  required
                  outlined
                   :counter="50"
                   :rules="nameRules"
                  color="orange"
              ></v-text-field>
              <v-text-field
                  v-model="unit_information.initial"
                  label="Initial"
                  required
                  outlined
                   :counter="50"
                   :rules="nameRules"
                  color="orange"
              ></v-text-field>
          </v-col>
          <center>
                    <v-col sm="12" md="12">
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
  
   <!-- conversion dialog -->
      <v-form
      ref="form"
      v-model="valid"
      lazy-validation
    >
      <v-dialog
        v-model="convertdialog"
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
              @click="convertdialog = false"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>Add Unit Conversion</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
            </v-toolbar-items>
          </v-toolbar>
  
          <v-col sm="12" md="6" offset-md="3" class="mt-3 text-center"> 
              <h4>Note: Here you can add another unit conversion.</h4>
          </v-col>
          <v-col sm="12" md="6" offset-md="3"> 
            <v-combobox
                  v-model="unit_conversion.unit_id"
                  label="Unit"
                  required
                  outlined
                  :items="unit_conversions"
                  :rules="[v => !!v || 'Unit Information is required']"
                  @change="getconversion()"
                  color="orange"
              ></v-combobox>
              <v-combobox
                  v-model="unit_conversion.conversion_id"
                  label="Unit Conversion"
                  required
                  outlined
                  :items="unit_conversionsto"
                  :rules="[v => !!v || 'Unit Information is required']"
                  color="orange"
              ></v-combobox>
              <v-text-field
                  v-model="unit_conversion.value"
                  label="Value"
                  required
                  outlined
                  :counter="50"
                  :rules="numberRules"
                  @keypress="filter(event)"
                  color="orange"
              ></v-text-field>
            </v-col>
            <center>
                    <v-col sm="12" md="6">
                        <v-btn
                        color="orange"
                        block
                        outlined
                        @click="validateconversion()"
                        >
                        Save
                      </v-btn>
                    </v-col>
                  </center>
        </v-card>
      </v-dialog>
      </v-form>
  
   <!-- end conversion dialog -->



   <!-- update all conversion dialog -->
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
            <v-toolbar-title>Update Unit Conversion</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
            </v-toolbar-items>
          </v-toolbar>
  
          <v-col sm="12" md="6" offset-md="3" class="mt-3 text-center"> 
              <h4>Note: Here you can update unit conversion.</h4>
          </v-col>
          <v-col sm="12" md="6" offset-md="3"> 
            <v-combobox
                  v-model="update_unit_conversion.unit_id"
                  label="Unit"
                  required
                  outlined
                  :items="unit_conversions"
                  :rules="[v => !!v || 'Unit Information is required']"
                  @change="getconversionupdate()"
                  color="orange"
              ></v-combobox>
              <v-combobox
                  v-model="update_unit_conversion.conversion_id"
                  label="Unit Conversion"
                  required
                  outlined
                  :items="unit_conversionsto"
                  :rules="[v => !!v || 'Unit Information is required']"
                  color="orange"
              ></v-combobox>
              <v-text-field
                  v-model="update_unit_conversion.value"
                  label="Value"
                  required
                  outlined
                  :counter="50"
                  :rules="numberRules"
                  @keypress="filter(event)"
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
  
   <!-- end update all conversion dialog -->
    </v-container>
  
  </template>
  
  <script>
  
    import unitservices from '../services/unitservices';
  
    export default {
      name: 'UnitConversion',
      created() {
          this.FetchUnitConversionInformation();
          this.$store.state.snackbar.color = 'green darken-1';
          this.headers = Object.values(this.headersMap);
        this.selectedHeaders = this.headers;
      },
      mounted(){
          this.$store.state.title = "Unit Conversion";
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
          unit_information: {
              name: '',
              initial: '',
              flag: 1
          },
          unit_conversion: {
              unit_id: '',
              conversion_id: '',
              value: '',
              flag: 1
          },
          update_unit_conversion: {
              unit_id: [],
              conversion_id: [],
              value: '',
          },
          update_conversion:{
              unit_id: [],
              unit_conversion_id: [],
              value: '',
          },
      exportimport: [{ text: 'Upload', icon: 'mdi-upload-outline', linktrigger: 1 },
          { text: 'Download', icon: 'mdi-download-outline', linktrigger: 2 }],
          headers:[],
        selectedHeaders: [],
        headersMap: [
            {
              text: 'Unit',
              align: 'start',
              sortable: true,
              value: 'unit_info.name',
            },
            { text: 'Unit Conversion', sortable: false, value: 'conversion_info.name' },
            { text: 'Value', sortable: false, value: 'convertvalue' },
            { text: 'Created By', sortable: false, value: 'createdby' },
            { text: 'Created At', sortable: false, value: 'createdat' },
            { text: 'Action',sortable: false, value: 'action' }
          ],
          unit: [],
          unit_conversions:[],
          unit_conversionsto: [],
          unit_conversion_info: [],
          valid: true,
          selected: { text: '', value: '' },
          nameRules: [
          v => !!v || 'This is a require field',
          ],
          numberRules: [
              v => Number(v) !== 0  || 'Required',
              v => !!v  || 'Number is required',
              v => (v && v.length <= 13) || 'Number must be less than 13 numbers',
          ],
          convertdialog: false,
          confirmation: false,
          saveconfirmation: false,
          saveconversionconfirmation: false,
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
              name: '',
              value: ''
          }
      }),
      methods: {

        // edit unit conversion information
      EditUnitConversionInformation(id, data){
        console.log(data);

        this.update_unit_conversion.conversion_id = {
                      text: data.conversion_info.text,
                      value: data.conversion_info.value
                    }
        this.updateAllID = id;
        this.updatedialog = true;
        this.FetchUnitInformation();
              let payload = {
                  id: data.unit_id
              };
              unitservices.fetchUnitInformationViaID(payload, this.$store.getters.getAccessToken).then(response => {
                  if(response.data.success){
          this.update_unit_conversion = {
              unit_id: {
              text: data.unit_info.name,
              value: data.unit_info.id
            },
              conversion_id: {
              text: data.conversion_info.name,
              value: data.conversion_info.id
              },
              value: data.value,
          };
                       
                }
            }).catch(error => console.log(error));



            let payload1 = {
                  unit_id: data.unit_id,
                  user_id: this.$store.getters.getParentID
                };

              this.unit_conversionsto = [];
              unitservices.fetchUnitInformationTo(payload1, this.$store.getters.getAccessToken).then(response1 => {
                  if(response1.data.success){
                    response1.data.result.forEach((value) => {
                          this.unit_conversionsto.push({
                              text: value.name,
                              value: value.id
                          });
                      });
                       
                }
            }).catch(error => console.log(error));
      },
      // upload file
          uploadFile() {
            this.Images = this.$refs.file.files[0];
          },
          // show dialog for upload image
          uploadfileopen() {
            this.uploadconfirmation = true;
          },

          // check pop up status 
          changeStatusDialogUpload(status){
              this.uploadconfirmation = status;
          },
          changeStatusDialog(status){
              this.confirmation = status;
          },
          changeStatusDialogConversionSave(status){
              this.saveconversionconfirmation = status;
          },
          changeStatusDialogSave(status){
              this.saveconfirmation = status;
          },
          changeStatusDialogEdit(status){
              this.editconfirmation = status;
              this.fetchUnitConversionInformation();
          },
        changeStatusDialogUpdate(status){
            this.updateconfirmation = status;
            this.FetchUnitConversionInformation();
        },
          // end check pop up status 

          // prevent entering letters to text field
          filter: function(evt) {
          evt = (evt) ? evt : window.event;
          let expect = evt.target.value.toString() + evt.key.toString();
          
          if (!/^[-+]?[0-9]*\.?[0-9]*$/.test(expect)) {
              evt.preventDefault();
          } else {
              return true;
          }
          },

          // get conversion information
          getconversion(){
            this.unit_conversionsto = [];
            this.unit_conversion.conversion_id = "";
            this.FetchUnitInformationTo(this.unit_conversion.unit_id.value)
          },

          // get update conversion information
          getconversionupdate(){
            this.unit_conversionsto = [];
            this.unit_conversion.conversion_id = "";
            let payload = {
                  user_id: this.$store.getters.getParentID,
                  unit_id: this.update_unit_conversion.unit_id.value
              };
              unitservices.fetchUnitInformationTo(payload, this.$store.getters.getAccessToken).then(response => {
                  if(response.data.success){
                      response.data.result.forEach((value) => {
                          this.unit_conversionsto.push({
                              text: value.name,
                              value: value.id
                          });
                      });
                      this.update_unit_conversion.conversion_id = [];
                  }
              }).catch(error => console.log(error));
          },

          // get unit conversion information
          FetchUnitConversionInformation(){
            let payload = {
                  user_id: this.$store.getters.getParentID
                };
              unitservices.fetchUnitConversionInformation(payload, this.$store.getters.getAccessToken).then(response => {
                  if(response.data.success){
                      this.unit_conversion_info = response.data.result;
                  }
              }).catch(error => console.log(error));
  
          },

          // get unit information via unit id
          FetchUnitInformationTo(id){
            let payload = {
                  user_id: this.$store.getters.getParentID,
                  unit_id: id
              };
              unitservices.fetchUnitInformationTo(payload, this.$store.getters.getAccessToken).then(response => {
                  if(response.data.success){
                      response.data.result.forEach((value) => {
                          this.unit_conversionsto.push({
                              text: value.name,
                              value: value.id
                          });
                      });
                  }
              }).catch(error => console.log(error));
          },

          // get unit information
          FetchUnitInformation(){
              let payload = {
                  user_id: this.$store.getters.getParentID
              };
              unitservices.fetchUnitInformation(payload, this.$store.getters.getAccessToken).then(response => {
                  if(response.data.success){
                      this.unit = response.data.result;
                      response.data.result.forEach((value) => {
                          this.unit_conversions.push({
                              text: value.name,
                              value: value.id
                          });
                      });
                  }
              }).catch(error => console.log(error));
  
          },

          // show dialog for new unit
          NewUnit(){
              this.dialog = true;
          },

          // redirect to unit page
          Unit(){
            this.$router.push('/units');
          },

          // show dialog adding new conversion information
          UnitConversion(){
          this.convertdialog = true;
          this.FetchUnitInformation();
          },

          // validate required fields new conversion
          validate(){
  
              let val = this.$refs.form.validate();
  
              if(val){
                  this.confirmSave();
              }
          },

          // validate required fields update conversion
        updatevalidate(){
          let val = this.$refs.form.validate();

          if(val){
              this.confirmUpdateAll();
          }
        },

        // show dialog confirmation update
        confirmUpdateAll(){
            this.updateconfirmation = true
        },

        // update unit conversion information
        UpdateAllUnitConversionInformation(){

          var unitcode = this.update_unit_conversion['unit_id']
            this.update_conversion['unit_id'] = unitcode['value']
          var conversioncode = this.update_unit_conversion['conversion_id']
            this.update_conversion['unit_conversion_id'] = conversioncode['value']


            this.update_conversion['value'] = this.update_unit_conversion['value']
        let payload = {
          id: this.updateAllID,
          unit_conversion_information: JSON.stringify(this.update_conversion)
        };
        unitservices.updateAllUnitConversionInformation(payload, this.$store.getters.getAccessToken).then(response => {
          if(response.data.success){
              this.updatedialog = false;
              this.updateconfirmation = false;
              this.FetchUnitConversionInformation();
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


        // validate conversion information fields
          validateconversion(){
  
          let val = this.$refs.form.validate();
  
          if(val){
              this.confirmSaveConversion();
          }
          },

          // show dialog confirmation save
          confirmSave(){
              this.saveconfirmation = true
          },

          // show dialog confirmation save conversion
          confirmSaveConversion(){
              this.saveconversionconfirmation = true
          },

          // save unit conversion information
          SaveUnitConversionInformation(){
            let payload = {
                  unit_conversion: JSON.stringify({
                  parent_user_id: this.$store.getters.getParentID,
                  unit_id:this.unit_conversion.unit_id.value,
                  unit_conversion_id:this.unit_conversion.conversion_id.value,
                  value:this.unit_conversion.value,
                  flag:1,
                  created_by: this.$store.getters.getUserID
  
                })
              };
  
              unitservices.saveUnitConversionInformation(payload, this.$store.getters.getAccessToken).then(response => {
                  if(response.data.success){
                    console.log(response.data)
                      this.convertdialog = false;
                      this.$store.state.snackbar.message = response.data.message;
                    this.$store.state.snackbar.show = true;
                    this.saveconversionconfirmation = false
                    this.$store.state.snackbar.colors = 'xgreen';
                    this.$store.state.snackbar.icon = "mdi-check-circle-outline";                      
                    this.FetchUnitConversionInformation();
                      this.ClearSaveUnitConversion();
                    
                }else{
                    this.$store.state.snackbar.colors = 'xred';
                      this.$store.state.snackbar.icon = "mdi-alert-outline"; 
                  }                 

              }).catch(error => console.log(error));
          },

          // save unit information
          SaveUnitInformation(){
              let payload = {
                  unit_information: JSON.stringify({
                  name:this.unit_information.name,
                  initial:this.unit_information.initial,
                  flag:1
              })
              };
  
              unitservices.saveUnitInformation(payload, this.$store.getters.getAccessToken).then(response => {
                  if(response.data.success){
                      this.dialog = false;
                      this.FetchUnitInformation();
                      this.ClearSaveUnit();
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

          // clear unit fields
          ClearSaveUnit(){
              this.unit_information.name = '';
              this.unit_information.initial = '';
          },

          // clear unit conversion fields
          ClearSaveUnitConversion(){
              this.this.unit_conversion.unit_id = '';
              this.this.unit_conversion.conversion_id = '';
              this.this.unit_conversion.value = '';
          },

          // update conversion information
          confirmUpdate(){
              let payload = {
                  id: this.foUpdate['id'],
                  name: this.foUpdate['name'],
                  value: this.foUpdate['value']
              };
  
              unitservices.updateUnitConversionInformation(payload, this.$store.getters.getAccessToken).catch(error => console.log(error));
              this.$store.state.snackbar.message = 'Unit conversion information has been updated.';
              this.$store.state.snackbar.show = true;
              this.FetchUnitConversionInformation();
              this.editconfirmation = false
              this.$store.state.snackbar.colors = 'xgreen';
                    this.$store.state.snackbar.icon = "mdi-check-circle-outline";   
          },

          // show dialog confirmation conversion information
          UpdateUnitConversionInformation(id, name, value){
  
              this.foUpdate = {
                  id: id,
                  name: name,
                  value: value
              }
              this.editconfirmation = true
  
          },

          // delete conversion information
          confirmDelete(){
              this.unit_conversion_info.splice(this.unit_conversion_info.indexOf(this.foDelete['data']), 1);
  
              let payload = {
                  id: this.foDelete['id']
              };
              unitservices.removeUnitConversionInformation(payload, this.$store.getters.getAccessToken).catch(error => console.log(error));
  
              this.$store.state.snackbar.message = 'Unit conversion information has been removed.';
              this.$store.state.snackbar.show = true;
              this.confirmation = false
              this.$store.state.snackbar.colors = 'xgreen';
                    this.$store.state.snackbar.icon = "mdi-check-circle-outline";   

          },


          // set edit combo box
        SetEditCombobox(text, value, action){
        this.selected = {
            text: text,
            value: value
        };
        if(action=="unit_id"){
            this.FetchUnitInformation(value);
        }
        else if(action=="conversion_id"){
            this.FetchUnitInformationTo(value);
        }

        },

        // save edit combo box
        SaveEditCombobox(item, action){

        if(action=="unit_id"){
            item.name = this.selected.text;
            this.UpdateUnitConversionInformation(item.id, 'unit_id', this.selected.value);
        }
        else if(action=="conversion_id"){
            item.name = this.selected.text;
            this.UpdateUnitConversionInformation(item.id, 'unit_conversion_id', this.selected.value);
        }

        },

        // remove unit conversion information
        RemoveUnitConversionInformation(id, data){
              this.foDelete = {
                  id: id,
                  data: data
              }
              this.confirmation = true
          },

          // import xlsx unit information
            ImportUnitInformation() {
  
              let loader = this.$loading.show();
  
              const formData = new FormData();
              formData.append('file', this.Images);
              formData.append('created_by', this.$store.getters.getUserID);
              formData.append('parent_user_id', this.$store.getters.getParentID);
              const headers = { 'Content-Type': 'multipart/form-data' };
              unitservices.importUnitInformation(formData,headers, this.$store.getters.getAccessToken)
              .then(response => {
  
                      loader.hide();
  
              this.$store.state.snackbar.message = 'Unit information has been imported.';
              this.$store.state.snackbar.show = true;
              this.FetchUnitInformation();
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