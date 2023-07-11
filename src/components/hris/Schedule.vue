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
                    elevation="2"
                    @click="NewSchedule()" 
                    v-if="$store.getters.valAccess(85)"
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
                    @click="NewSchedule()" 
                    v-if="$store.getters.valAccess(85)"
                  >
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </template>  
              </v-toolbar>
            </template>
            <!-- One liner filtering -->
            <br>
            <!-- Schedule data table -->
            <v-data-table
                :headers="showHeaders"
                :search="search"
                :items="scheduledata"
                :page.sync="page"
                @page-count="pageCount = $event"
                :footer-props="{
                'items-per-page-options':[10],
                'disable-items-per-page': true,
                }"
              >
                <template v-slot:item.in="props">
                  {{ moment(props.item.in, 'hh:mm A').format('hh:mm A') }}
                </template>

                <template v-slot:item.out="props">
                  {{ moment(props.item.out, 'hh:mm A').format('hh:mm A') }}
                </template>

                <template v-slot:item.created_by="props">
                  {{ props.item.created_info != null ? props.item.created_info.personal_information.lastname + ' , ' + props.item.created_info.personal_information.firstname : 'No Data' }}
                </template>

                <template v-slot:item.action="props">
                  <v-row>
                    <v-btn
                      elevation="2"
                          class="mx-2"
                          dark
                          outlined
                          small
                          color="orange"
                          v-if="$store.getters.valAccess(86)"
                          @click="UpdateAllSchedule(props.item.id, props.item)"
                      >
                      <v-icon
                              small
                              @click="UpdateAllSchedule(props.item.id, props.item)"
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
                          v-if="$store.getters.valAccess(87)"
                          @click="DeleteSchedule(props.item.id, props.item.name)"
                      >
                      <v-icon
                              small
                              @click="DeleteSchedule(props.item.id, props.item.name)"
                          >
                              mdi-delete
                          </v-icon>
                          Delete
                      </v-btn>   
                  </v-row>
                </template>
            </v-data-table>
            <!-- Schedule data table -->
            <v-pagination
              color="orange"
              v-model="page"
              :length="pageCount"
            ></v-pagination>                
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- dialog add form -->
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
              <v-btn icon dark @click="CloseDialogFullScreen(), ClearSchedule()">
                  <v-icon>mdi-close</v-icon>
              </v-btn>
              <v-toolbar-title>Add Schedule</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-toolbar-items>
              </v-toolbar-items>
          </v-toolbar>
          
          <v-col sm="12" md="6" offset-md="3" class="mt-3 text-center"> 
              <h4>Note: Here you can create schedule</h4>
          </v-col>

          <v-col sm="12" md="6" offset-md="3"> 
              <v-text-field
              color="orange"
                  v-model="schedule.name"
                  label="Name"
                  required
                  outlined
                  :rules="[v => !!v || 'Name is required']"
              ></v-text-field>
          </v-col>

          <v-col sm="12" md="6" offset-md="3">
              <v-row>
                  <v-col>
                      <v-text-field
                      v-model="schedule.in"
                      color="orange"
                      pattern="^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$"
                      type="time"
                      label="Start Time"
                      :rules="[v => !!v || 'Start Time is required']"
                      @input="AMPMTO('start_time')"
                      >
                      </v-text-field>
                  </v-col>
              </v-row>
          </v-col>

          <v-col sm="12" md="6" offset-md="3">
              <v-row>
                  <v-col>
                      <v-text-field
                      v-model="schedule.out"
                      color="orange"
                      pattern="^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$"
                      type="time"
                      label="End Time"
                      :rules="[v => !!v || 'End Time is required']"
                      @input="AMPMTO('end_time')">
                      </v-text-field>
                  </v-col>
              </v-row>
          </v-col>

          <v-col sm="12" md="6" offset-md="3">
              <v-combobox
                  v-model="schedule.rest_day"
                  outlined
                  label="Rest Day"
                  :items="restdaydata"
                  multiple
                  color="orange"
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
    <!-- dialog add form -->

    <!-- dialog edit form -->
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
            <v-btn icon dark @click="CloseDialogEditFullScreen(), ClearSchedule()">
                <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>Edit Schedule</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              </v-toolbar-items>
          </v-toolbar>
            
          <v-col sm="12" md="6" offset-md="3" class="mt-3 text-center"> 
              <h4>Note: Here you can edit schedule</h4>
          </v-col>

          <v-col sm="12" md="6" offset-md="3"> 
              <v-text-field
              color="orange"
                  v-model="schedule.name"
                  label="Name"
                  required
                  outlined
                  :rules="[v => !!v || 'Name is required']"
              ></v-text-field>
          </v-col>
        
          <v-col sm="12" md="6" offset-md="3">
              <v-row>
                  <v-col>
                      <v-text-field
                      v-model="schedule.in"
                      color="orange"
                      pattern="^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$"
                      type="time"
                      label="Start Time"
                      :rules="[v => !!v || 'Start Time is required']"
                      @input="AMPMTO('start_time')"
                      >
                      </v-text-field>
                  </v-col>
              </v-row>
          </v-col>
          <v-col sm="12" md="6" offset-md="3">
              <v-row>
                  <v-col>
                      <v-text-field
                      v-model="schedule.out"
                      color="orange"
                      pattern="^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$"
                      type="time"
                      label="End Time"
                      :rules="[v => !!v || 'End Time is required']"
                      @input="AMPMTO('end_time')">
                      </v-text-field>
                  </v-col>
              </v-row>
          </v-col>

          <v-col sm="12" md="6" offset-md="3">
              <v-combobox
              v-model="schedule.rest_day"
                  outlined
                  label="Rest Day"
                  :items="restdaydata"
                  multiple
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
    <!-- dialog edit form -->

    <!-- dialog edit confirmation -->
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
    <!-- dialog edit confirmation -->
    
    <!-- dialog save confirmation -->
    <v-row justify="center">
      <v-dialog
          persistent :retain-focus="false"
          v-model="saveconfirmation"
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
                  @click="SaveSchedule()"
                  >
                  Confirm
              </v-btn>
              </center>
              <br>  
          </v-card>
      </v-dialog>
    </v-row>
    <!-- dialog save confirmation -->

    <!-- dialog delete confirmation -->
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
    <!-- dialog delete confirmation -->
  </v-container>
</template>
  
<script>
  import scheduleservices from '../services/scheduleservices';

    export default {
      name: 'Schedule',
      data: () => ({
        menucolumn: false,
        deleteconfirmation: false,
        fordeletename: '',
        search: '',
        saveconfirmation:false,
        editfullscreendialog:false,
        page: 1,
        pageCount: 0,
        loading: false,
        valid: false,
        scheduledata: [],
        restdaydata: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        editconfirmation: false,
        fullscreendialog: false,
        menustarttime: false,
        menuendtime: false,
        selected_restdayedit: '',
        headers:[],
        selectedHeaders: [],
        headersMap: [
            { text: 'Name',sortable: true, value: 'name' },
            { text: 'Time In',sortable: false, value: 'in' },
            { text: 'Time Out',sortable: false, value: 'out' },
            { text: 'Rest Day',sortable: false, value: 'rest_day' },
            { text: 'Created By',sortable: false, value: 'created_by' },
            { text: 'Action',sortable: false, value: 'action', width: '210'}
          ],
          schedule: {
              name: '',
              in: '',
              out: '',
              is_flexi: '',
              rest_day: ''
          },
          scheduleampm:{
                ampmstart_time: '',
                ampmend_time: '',
          },
          schedulerestdaycombo: {
            rest_daycombo: ''
          },
      }),
      created(){
          this.$store.state.header = false;
          this.$store.state.footer = false;
          this.$store.state.snackbar.color = 'orange';
          this.FetchAllSchedule();
          this.headers = Object.values(this.headersMap);
        this.selectedHeaders = this.headers;
      },
      mounted(){
          this.$store.state.title = "Schedule";
      },
      computed: {
      //Done to get the ordered headers
      showHeaders () {
        return this.headers.filter(s => this.selectedHeaders.includes(s));
      }
    },      
      methods: {
        FetchAllSchedule(){ // fetch all schedule
          let payload = {
              parent_id: this.$store.getters.getParentID
          };
          scheduleservices.FetchAllSchedule(payload, this.$store.getters.getAccessToken).then(response => {
              if(response.data.success){
                  console.log(response.data.data);
                  this.scheduledata = response.data.data;
              }
          }).catch(error => console.log(error));
        },
        UpdateSchedule(id, name, time_in, time_out, is_flexi, created_by){ // fetch info schedule for update
          this.forUpdate = {
              id: id,
              name: name,
              in: time_in,
              out: time_out,
              is_flexi: is_flexi,
              created_by: created_by
          }
          this.editconfirmation = true
        },
        UpdateAllSchedule(id, item){ // fetch info schedule for update
          console.log(id, item);
          this.schedule.name = item.name
          this.schedule.in = item.in
          this.schedule.out = item.out
          this.schedule.flexi = 0
          this.schedule.rest_day = JSON.parse(item.rest_day)
          this.editfullscreendialog = true
          this.forAllUpdate = {
              id: id,
              created_by: item.created_by
          }
        },
        changeStatusDialogEdit(status){
          this.editconfirmation = status;
          this.FetchAllSchedule();
        },
        confirmUpdate(){ // edit schedule
          let val = this.$refs.form.validate();

          if(val){
              let payload = {
                  id: this.forAllUpdate.id,
                  name: this.schedule.name,
                  in: this.schedule.in,
                  out: this.schedule.out,
                  is_flexi: this.schedule.flexi,
                  rest_day: JSON.stringify(this.schedule.rest_day),
                  created_by: this.forAllUpdate.created_by,
                  parent_user_id: this.$store.getters.getParentID,
              }
              scheduleservices.UpdateSchedule(payload, this.$store.getters.getAccessToken).then(response => {
                  if(response.data.success){
                      this.$store.state.snackbar.message = 'Schedule has been updated.';
                      this.$store.state.snackbar.show = true;
                      this.ClearSchedule();
                      this.editfullscreendialog = false
                      this.$refs.form.resetValidation();
                      this.$store.state.snackbar.colors = 'xgreen';
                  this.$store.state.snackbar.icon = "mdi-check-circle-outline";                      
              }else{
                  this.$store.state.snackbar.colors = 'xred';
                    this.$store.state.snackbar.icon = "mdi-alert-outline";                      
                }
              }).catch(error =>{
                  this.$store.state.snackbar.message = error.response.data.message;
                  this.$store.state.snackbar.show = true;
                  this.$store.state.snackbar.colors = 'xred';
                    this.$store.state.snackbar.icon = "mdi-alert-outline";                                          
              });
              this.$store.state.snackbar.message = 'Schedule has been updated.';
              this.$store.state.snackbar.show = true;
              this.$store.state.snackbar.colors = 'xgreen';
                  this.$store.state.snackbar.icon = "mdi-check-circle-outline";                                      
          }
          this.FetchAllSchedule();
          this.editconfirmation = false
        },
        NewSchedule(){
            this.fullscreendialog = true
        },
        CloseDialogFullScreen(){
            this.fullscreendialog = false
        },
        CloseDialogEditFullScreen(){
            this.editfullscreendialog = false
        },
        AMPMTO(field){ // convertion of military time to AM : PM format
            var datenow = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)
            if(field == 'start_time')
            {
                var StartTime = this.schedule.in.split(':');
                var date1 = new Date(datenow[0],(datenow[1]-1),datenow[2],StartTime[0],StartTime[1],0,0);
                this.scheduleampm.ampmstart_time = date1.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
            }else
            {
                var EndTime = this.schedule.out.split(':');
                var date2 = new Date(datenow[0],(datenow[1]-1),datenow[2],EndTime[0],EndTime[1],0,0);
                this.scheduleampm.ampmend_time = date2.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
            }
        },
        SaveSchedule(){ // save schedule
            let val = this.$refs.form.validate();

            if(val)
            {
                if(this.schedule.is_flexi == true){
                    this.schedule.is_flexi = 1;
                }else{
                    this.schedule.is_flexi = 0;
                }
                let payload = {
                    parent_user_id: this.$store.getters.getParentID,
                    name: this.schedule.name,
                    in: this.schedule.in,
                    out: this.schedule.out,
                    is_flexi: this.schedule.is_flexi,
                    rest_day: JSON.stringify(this.schedule.rest_day),
                    flag: "1",
                    created_by: this.$store.getters.getUserID
                };
                console.log(payload);
                scheduleservices.SaveSchedule(payload, this.$store.getters.getAccessToken).then(response => {
                    if(response.data.success){
                        this.fullscreendialog = false;
                        this.$store.state.snackbar.message = 'Schedule has been created.';
                        this.$store.state.snackbar.show = true;
                        this.FetchAllSchedule();
                        this.ClearSchedule();
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
            this.saveconfirmation = false
        }, 
        ClearSchedule(){
            this.schedule['name'] = ''
            this.schedule['in'] = ''
            this.schedule['out'] = ''
            this.schedule['flexi'] = false
            this.schedule.rest_day = ''
            this.scheduleampm.ampmend_time = ''
            this.scheduleampm.ampmstart_time = ''
            this.selected_restdayedit = ''
        },
        UpdateScheduleRD(id, rest_day, created_by){
            this.forUpdateRD = {
                id: id,
                rest_day: rest_day,
                created_by: created_by
            }
            this.selected_restdayedit = 'rest_day'
            this.editconfirmation = true
        },
        confirmUpdateRD(){ // update restday in schedule
            let payload = {
                id: this.forUpdateRD['id'],
                rest_day: JSON.stringify(this.forUpdateRD['rest_day']),
                created_by: this.$store.getters.getUserID,
                parent_user_id: this.$store.getters.getParentID,
            }
            console.log(payload)
            scheduleservices.UpdateScheduleRD(payload, this.$store.getters.getAccessToken).catch(error =>{
                this.$store.state.snackbar.message = error.response.data.message;
                this.$store.state.snackbar.show = true;
                this.$store.state.snackbar.colors = 'xred';
                this.$store.state.snackbar.icon = "mdi-alert-outline";                                      
            });
            this.$store.state.snackbar.message = 'Schedule has been updated.';
            this.$store.state.snackbar.show = true;
            this.ClearSchedule();
            this.FetchAllSchedule();
            this.editconfirmation = false
            this.$store.state.snackbar.colors = 'xgreen';
            this.$store.state.snackbar.icon = "mdi-check-circle-outline";                                  
        },
        changeStatusDialogSave(status){
            this.saveconfirmation = status;
        },
        validationfalse(){
            this.$refs.form.validate()
        },
        DeleteSchedule(id, name){
            this.fordeletename = name
            this.forDelete = {
                id: id
            }
            this.deleteconfirmation = true;
        },
        confirmDelete(){ // delete schedule
            let payload = {
                id: this.forDelete['id']
            }
            console.log(payload);
            scheduleservices.DeleteSchedule(payload, this.$store.getters.getAccessToken).catch(error =>{
                this.$store.state.snackbar.message = error.response.data.message;
                this.$store.state.snackbar.show = true;
                    this.$store.state.snackbar.colors = 'xred';
                      this.$store.state.snackbar.icon = "mdi-alert-outline";                                      
            });

            this.$store.state.snackbar.message = 'Schedule has been deleted.';
            this.$store.state.snackbar.show = true;
            this.deleteconfirmation = false;
            this.$store.state.snackbar.colors = 'xgreen';
                    this.$store.state.snackbar.icon = "mdi-check-circle-outline";                                  
            this.FetchAllSchedule();
        },
        changeStatusDialogDelete(status){
            this.deleteconfirmation = status;
        },
      }
    }
</script>
  
<style scoped>
  input[type=checkbox] {
    accent-color: orange;
  }
</style>