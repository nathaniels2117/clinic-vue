<template>
   <v-container style="max-width: 95%; position: relative;" >
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
                      elevation="2"
                      @click="NewHoliday()"
                      v-if="$store.getters.valAccess(97)"
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
                      @click="NewHoliday()"
                      v-if="$store.getters.valAccess(97)"
                    >
                      <v-icon>mdi-plus</v-icon>
                    </v-btn>
                  </template>
                </v-toolbar>
              </template>
              <!-- One liner filtering -->
              <br>
              <!-- Data table holiday -->
              <v-data-table
                :headers="showHeaders"
                :items="holidaydata"
                :search="search"
                :page.sync="page"
                @page-count="pageCount = $event"
                :footer-props="{
                'items-per-page-options':[10],
                'disable-items-per-page': true,
                }"
                >
                <template v-slot:item.created_by="props">
                    {{ props.item.created_info != null ? props.item.created_info.personal_information.lastname + ' , ' + props.item.created_info.personal_information.firstname : 'No Data' }}
                </template>

                <template v-slot:item.holiday_date="props" v-show="date">
                    {{ moment(props.item.holiday_date).format('MMMM') + ' ' + moment(props.item.holiday_date).format('DD')}} 
                </template>

                <template v-slot:item.action="props">
                  <v-btn
                    elevation="2"
                        class="mx-2"
                        dark
                        outlined
                        small
                        color="orange"
                        v-if="$store.getters.valAccess(98)"
                        @click="UpdateAllHoliday(props.item.id, props.item)"
                    >
                    <v-icon
                            small
                            @click="UpdateAllHoliday(props.item.id, props.item)"
                        >
                            mdi-file-edit-outline
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
                        v-if="$store.getters.valAccess(99)"
                        @click="DeleteHoliday(props.item.id, props.item.name)"
                    >
                    <v-icon
                            small
                            @click="DeleteHoliday(props.item.id, props.item.name)"
                        >
                            mdi-delete
                        </v-icon>
                        Delete
                    </v-btn>      
                </template>
              </v-data-table>
              <!-- Data table holiday -->
              <v-pagination
              color="orange"
              v-model="page"
              :length="pageCount"
              ></v-pagination>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
  
      <!-- Dialog save form -->
      <v-dialog
      v-model="fullscreendialog"
      fullscreen
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
                  <v-btn icon dark @click="CloseDialogFullScreen()">
                      <v-icon>mdi-close</v-icon>
                  </v-btn>
                  <v-toolbar-title>Add Holiday</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-toolbar-items>
                  </v-toolbar-items>
              </v-toolbar>
              
              <v-col sm="12" md="6" offset-md="3" class="mt-3 text-center"> 
                  <h4>Note: Here you can create holiday</h4>
              </v-col>

              <v-col sm="12" md="6" offset-md="3"> 
                  <v-text-field
                      v-model="holiday.name"
                      label="Name"
                      color="orange"
                      required
                      outlined
                      :rules="[v => !!v || 'Name is required']"
                  ></v-text-field>
              </v-col>
              <v-col sm="12" md="6" offset-md="3"> 
                  <v-combobox
                      v-model="holiday.month"
                      :items="monthtypeitems"
                      label="Month"
                      color="orange"
                      required
                      outlined
                      :rules="[v => !!v || 'Month is required']"
                  ></v-combobox>
              </v-col>
              <v-col sm="12" md="6" offset-md="3"> 
                  <v-text-field
                      v-model="holiday.day"
                      label="Day"
                      color="orange"
                      required
                      outlined
                      @input="daychecker()"
                      v-mask="'##'"
                      :rules="[v => !!v || 'Day is required']"
                  ></v-text-field>
              </v-col>
              <v-col sm="12" md="6" offset-md="3"> 
                  <v-combobox
                      v-model="holiday.type"
                      :items="holidaytypeitems"
                      label="Type"
                      color="orange"
                      required
                      outlined
                      :rules="[v => !!v || 'Type is required']"
                  ></v-combobox>
              </v-col>
              <center>
                  <v-col sm="12" md="6">
                      <v-btn
                      color="orange"
                      block
                      outlined
                      @click="valid == false ? validationfalse() : changeStatusDialogSave(true)"
                      >
                      Save
                    </v-btn>
                  </v-col>
                  </center>
              </v-form>
          </v-card>
      </v-dialog>
      <!-- Dialog save form -->
  

      <!-- Dialog edit form -->
      <v-dialog
        v-model="editfullscreendialog"
        fullscreen
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
              <v-toolbar-title>Edit Holiday</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-toolbar-items>
              </v-toolbar-items>
          </v-toolbar>
          
          <v-col sm="12" md="6" offset-md="3" class="mt-3 text-center"> 
              <h4>Note: Here you can edit Holiday</h4>
          </v-col>

          <v-col sm="12" md="6" offset-md="3"> 
              <v-text-field
                  v-model="holiday.name"
                  label="Name"
                  color="orange"
                  required
                  outlined
                  :rules="[v => !!v || 'Name is required']"
              ></v-text-field>
          </v-col>
          <v-col sm="12" md="6" offset-md="3"> 
              <v-combobox
                  v-model="holiday.month"
                  :items="monthtypeitems"
                  label="Month"
                  color="orange"
                  required
                  outlined
                  :rules="[v => !!v || 'Month is required']"
              ></v-combobox>
          </v-col>
          <v-col sm="12" md="6" offset-md="3"> 
              <v-text-field
                  v-model="holiday.day"
                  label="Day"
                  color="orange"
                  required
                  outlined
                  @input="daychecker()"
                  v-mask="'##'"
                  :rules="[v => !!v || 'Day is required']"
              ></v-text-field>
          </v-col>
          <v-col sm="12" md="6" offset-md="3"> 
              <v-combobox
                  v-model="holiday.type"
                  :items="holidaytypeitems"
                  label="Type"
                  color="orange"
                  required
                  outlined
                  :rules="[v => !!v || 'Type is required']"
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
      <!-- Dialog edit form -->

      <!-- Dialog save confirmation -->
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
                  @click="SaveHoliday()"
                  >
                  Confirm
                </v-btn>
              </center>
              <br>
            </v-card>
          </v-dialog>
        </v-row>
      </template>
      <!-- Dialog save confirmation -->

      <!-- Dialog delete confirmation -->
      <template>
        <v-row justify="center">
          <v-dialog
            v-model="deleteconfirmation"
            persistent
            max-width="290"
          >
            <v-card>
              <v-card-title class="text-h5">
                Delete
              </v-card-title>
              <v-card-text>Are you sure you want to delete {{ fordeletename }}?</v-card-text>
              <center>
                <v-btn
                  elevation="2"
                  class="mx-2"
                  dark
                  outlined
                  small
                  color="red"
                  @click="changeStatusDialogDelete(false)"
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
      <!-- Dialog delete confirmation -->
    
    <!-- Dialog edit confirmation -->
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
    <!-- Dialog edit confirmation -->
  </v-container>
</template>
  
<script>

  import holidayservices from '../services/holidayservices';
  
    export default {
      name: 'Holiday',
      data: () => ({
        menucolumn: false,
        search: '',
        page: 1,
        pageCount: 0,
        valid: false,
        saveconfirmation: false,
        editconfirmation: false,
        deleteconfirmation: false,
        editfullscreendialog: false,
        fordeletename: '',
        date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        dialog: false,
        fullscreendialog: false,
        holidaytypeitems : ['Regular Holiday', 'Special Non-Working Holiday'],
        monthtypeitems: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        holiday: {
            name: '',
            type: '',
            month: '',
            day: '', 
            holiday_date: '',
        },
        headers:[],
        selectedHeaders: [],
        headersMap: [
            { text: 'Name',sortable: true, value: 'name' },
            { text: 'Date',sortable: false, value: 'holiday_date' },
            { text: 'Type',sortable: false, value: 'type' },
            { text: 'Created By',sortable: false, value: 'created_by' },
            { text: 'Action',sortable: false, value: 'action' , width: '230'}
          ],
          holidaydata: [],
      }),
      created(){
          this.$store.state.header = false;
          this.$store.state.footer = false;
          this.$store.state.snackbar.color = 'orange';
          this.FetchAllHoliday();
          this.headers = Object.values(this.headersMap);
        this.selectedHeaders = this.headers;          
      },
      mounted(){
          this.$store.state.title = "Holiday";
      },
      computed: {
      //Done to get the ordered headers
      showHeaders () {
        return this.headers.filter(s => this.selectedHeaders.includes(s));
      }
    },      
      methods: {
        FetchAllHoliday(){ // fetch all holiday
            let payload = {
                parent_id: this.$store.getters.getParentID
            };
            holidayservices.FetchAllHoliday(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    this.holidaydata = response.data.data;
                }
            }).catch(error => console.log(error));
        },
        UpdateHoliday(id, name, code, description, created_by){ // fetch info for update holiday
            this.forUpdate = {
                id: id,
                name: name,
                code: code,
                description: description,
                created_by: created_by
            }
            this.editconfirmation = true
            console.log(id, name, code, description, created_by);
        },
        UpdateAllHoliday(id, item){  // fetch info for update holiday
            console.log(id, item);
            var datenow = item.holiday_date.split('-');
            var monthnumber = datenow[1] - 1;
            var monthto = this.monthtypeitems[monthnumber]
            item.type == 'RH' ? this.holiday['type'] = 'Regular Holiday' : this.holiday['type'] = 'Special Non-Working Holiday'

            this.holiday.name = item.name
            this.holiday.type = item.type
            this.holiday.month = monthto
            this.holiday.day = datenow[2]

            this.forAllUpdate = {
                id: id,
                created_by: item.created_by
            }

            this.editfullscreendialog = true
        },
        confirmUpdate(){ // edit holoday
            var datenow = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)
            datenow = datenow.split('-');
            var date1 = new Date(datenow[0],(this.monthtypeitems.indexOf(this.holiday.month)),this.holiday.day);
            this.holiday['holiday_date'] = date1.toLocaleString('af-ZA', { year: 'numeric', month: 'numeric', day: 'numeric' });
            console.log(this.holiday['holiday_date'])

            this.holiday['type'] == 'Regular Holiday' ? this.holiday['type'] = 'RH' : this.holiday['type'] = 'SH'

            
            let val = this.$refs.form.validate();

            if(val){
            let payload = {
                id: this.forAllUpdate['id'],
                name: this.holiday.name,
                type: this.holiday.type,
                holiday_date: this.holiday.holiday_date,
                created_by: this.forAllUpdate['created_by'],
                parent_user_id: this.$store.getters.getParentID,
            }
            console.log(payload)
            holidayservices.UpdateHoliday(payload, this.$store.getters.getAccessToken).then(response => {
                    if(response.data.success){
                        this.$store.state.snackbar.message = 'Holiday has been updated.';
                        this.$store.state.snackbar.show = true;
                        this.editfullscreendialog = false
                        this.ClearHoliday()
                        this.$refs.form.resetValidation();
                        this.$store.state.snackbar.colors = 'xgreen';
                    this.$store.state.snackbar.icon = "mdi-check-circle-outline";                      
                }else{
                    this.$store.state.snackbar.colors = 'xred';
                      this.$store.state.snackbar.icon = "mdi-alert-outline";                                          
                }
                }).catch(error =>{
                this.errorDAW = error.response.data.message
                this.$store.state.snackbar.message = error.response.data.message;
                this.$store.state.snackbar.show = true;
                    this.$store.state.snackbar.colors = 'xred';
                      this.$store.state.snackbar.icon = "mdi-alert-outline";                                                          
            });
            }
            this.FetchAllHoliday();
            this.editconfirmation = false
        },
        changeStatusDialogEdit(status){
            this.editconfirmation = status;
            this.FetchAllHoliday();
        },
        NewHoliday(){
            this.fullscreendialog = true
        },
        SaveHoliday(){ // save holiday

            var datenow = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)
            datenow = datenow.split('-');
            var date1 = new Date(datenow[0],(this.monthtypeitems.indexOf(this.holiday.month)),this.holiday.day);
            this.holiday['holiday_date'] = date1.toLocaleString('af-ZA', { year: 'numeric', month: 'numeric', day: 'numeric' });
            console.log(this.holiday['holiday_date'])

            this.holiday['type'] == 'Regular Holiday' ? this.holiday['type'] = 'RH' : this.holiday['type'] = 'SH'

            let val = this.$refs.form.validate();

            if(val){
                let payload = {
                    parent_user_id: this.$store.getters.getParentID,
                    name: this.holiday['name'],
                    type: this.holiday['type'],
                    holiday_date: this.holiday['holiday_date'],
                    created_by: this.$store.getters.getUserID,
                };
                console.log(payload);
                holidayservices.SaveHoliday(payload, this.$store.getters.getAccessToken).then(response => {
                    if(response.data.success){
                        this.fullscreendialog = false;
                        this.$store.state.snackbar.message = 'Holiday has been created.';
                        this.$store.state.snackbar.show = true;
                        this.FetchAllHoliday();
                        this.ClearHoliday();
                        this.$refs.form.resetValidation();
                        this.$store.state.snackbar.colors = 'xgreen';
                    this.$store.state.snackbar.icon = "mdi-check-circle-outline";                      
                }else{
                    this.$store.state.snackbar.colors = 'xred';
                      this.$store.state.snackbar.icon = "mdi-alert-outline";                                          
                }
                }).catch(error =>{ 
                    console.log(error.response.data.errors)
                    this.$store.state.snackbar.message = error.response.data.message;
                    this.$store.state.snackbar.show = true;
                    this.$store.state.snackbar.colors = 'xred';
                      this.$store.state.snackbar.icon = "mdi-alert-outline";                                                              
                });
            }
            this.saveconfirmation = false;
        }, 
        CloseDialogFullScreen(){
            this.ClearHoliday();
            this.fullscreendialog = false
        },
        CloseDialogEditFullScreen(){
            this.ClearHoliday();
            this.editfullscreendialog = false
        },
        ClearHoliday(){
            this.holiday['name'] = ''
            this.holiday['type'] = ''
            this.holiday['holiday_date'] = ''
            this.holiday['type'] = ''
            this.holiday['month'] = ''
            this.holiday['day'] = ''
        },
        DeleteHoliday(id, name){
            this.fordeletename = name
            this.forDelete = {
                id: id
            }
            this.deleteconfirmation = true;
        },
        confirmDelete(){ // delete holiday
            let payload = {
                id: this.forDelete['id']
            }
            console.log(payload);
            holidayservices.DeleteHoliday(payload, this.$store.getters.getAccessToken).catch(error =>{
                this.$store.state.snackbar.message = error.response.data.message;
                this.$store.state.snackbar.show = true;
                this.$store.state.snackbar.colors = 'xred';
                this.$store.state.snackbar.icon = "mdi-alert-outline";                                                          
            });

            this.$store.state.snackbar.message = 'Holiday has been deleted.';
            this.$store.state.snackbar.show = true;
            this.deleteconfirmation = false;
            this.FetchAllHoliday();
            this.$store.state.snackbar.colors = 'xgreen';
            this.$store.state.snackbar.icon = "mdi-check-circle-outline";                                  
        },
        changeStatusDialogSave(status){
            this.saveconfirmation = status;
        },
        changeStatusDialogDelete(status){
            this.deleteconfirmation = status;
            this.FetchAllHoliday();
        },
        validationfalse(){
            this.$refs.form.validate()
        },
        daychecker(){ // checking of day
            this.holiday.day > 31 ? this.holiday.day = 31 : this.holiday.day
        },
      }
    }
</script>
  
<style scoped>
  input[type=checkbox] {
    accent-color: orange;
  }
</style>