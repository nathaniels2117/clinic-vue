<template>
  <v-container style="max-width: 95%; position: relative;" >
    <v-row>
      <v-col cols="12">
        <v-row justify="center" v-if="prodApp=='listemployee'">
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
                    <template v-if="$vuetify.breakpoint.mdAndUp">
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
                  </v-toolbar>
                </template>
                <!-- One liner filtering -->  
                <br>
                <!-- Data table timesheetlogs -->  
                <v-data-table
                :headers="showHeaders"
                :items="timesheetdatalogs"
                :search="search"
                :page.sync="page"
                @page-count="pageCount = $event"
                :footer-props="{
                'items-per-page-options':[10],
                'disable-items-per-page': true,
                }"       
                >              

                  <template v-slot:item.month="props">
                      {{ moment.months(props.item.month - 1) }}
                  </template>        

                  <template v-slot:item.action="props">
                      <v-btn
                      elevation="2"
                          class="mx-2"
                          dark
                          outlined
                          small
                          color="orange"
                          v-if="$store.getters.valAccess(35)"
                          @click="GetTimesheet(props.item.cutoff_id, props.item.month, props.item.year)"
                      >
                      <v-icon
                              small
                              v-if="$store.getters.valAccess(35)"
                              @click="GetTimesheet(props.item.cutoff_id, props.item.month, props.item.year)"
                          >
                              mdi-clipboard-text-search
                          </v-icon>
                          View
                      </v-btn>
                  </template>                     
                </v-data-table>
                <!-- Data table timesheetlogs -->  
                <v-pagination
                  color="orange"
                  v-model="page"
                  :length="pageCount"
                ></v-pagination>                                    
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <!-- Dialog edit confirmation -->  
    <v-row justify="center">
      <v-dialog
          persistent :retain-focus="false"
          v-model="editconfirmation"
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

    <!-- Dialog save confirmation -->
    <v-row justify="center">
      <v-dialog
          persistent :retain-focus="false"
          v-model="saveconfirmation"
          max-width="290"
      >
        <v-card>
          <v-card-title class="text-h5">
              Compute
          </v-card-title>
          <v-card-text>Are you sure you want to compute?</v-card-text>
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
            @click="AddCutoffTimesheet()"
            >
            Confirm
          </v-btn>
          </center>
          <br>                            
        </v-card>
      </v-dialog>
    </v-row>
    <!-- Dialog save confirmation -->

    <!-- Dialog view timesheetlog -->
    <v-row justify="center">
      <v-dialog
          persistent :retain-focus="false"
          v-model="viewtimesheetdatadialog"
      >
        <v-card>    
          <v-data-table
          :headers="headerstimesheetconfirmation"
          :items="viewtimesheetdata"
          :items-per-page="16" 
          hide-default-footer
          >            
              <template v-slot:item.is_restday="props" align="center">
                  <template>
                      <v-checkbox 
                          v-model="props.item.is_restday"
                          color="orange"
                          :value="false" 
                          readonly
                          v-if="props.item.is_restday == 1"
                      ></v-checkbox>
                      <v-checkbox
                          v-model="props.item.is_restday"
                          color="blue lighten-2"
                          :value="true" 
                          readonly
                          v-else
                      ></v-checkbox>
                  </template>
              </template>
              <template v-slot:item.with_pay="props" align="center">
                  <template>
                      <v-checkbox 
                          v-model="props.item.with_pay"
                          color="orange"
                          :value="false" 
                          readonly
                          v-if="props.item.with_pay == 1"
                      ></v-checkbox>
                      <v-checkbox
                          v-model="props.item.with_pay"
                          color="blue lighten-2"
                          :value="true" 
                          readonly
                          v-else
                      ></v-checkbox>
                  </template>
              </template>                                          
          </v-data-table>
          <v-card-actions>
          <v-btn
              color="orange"
              class="white--text"
              block
              outlined
              @click="changeStatusDialogTimesheetView(false)"
          >
              Close
          </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <!-- Dialog view timesheetlog -->
  </v-container>
</template>
  
<script>
  import timesheetservices from '../services/timesheetservices';
  
  export default {
    name: 'TimesheetLog',
    data: () => ({
      menucolumn: false,
      page: 1,
      pageCount: 0,
      search:'',
      loading: false,
      prodApp: "dataemployee",
      editconfirmation: false,
      saveconfirmation: false,
      viewtimesheetdatadialog: false,
      valid: false,
      modalmonth: false,
      modalyear: false,
      datemonth: '',
      datemonthtext: '',
      dateyear: '',
      dateyeartext: '',
      cutoffid: '',
      cutoff_information: [],
      timesheetdata : [],
      viewtimesheetdata: [],
      timesheetdatalogs : [],
      headerstimesheetconfirmation: [
          { text: 'Date', sortable: true, value: 'date' ,width: '110px', align: 'center'},
          { text: 'Day', sortable: false, value: 'day', width: '80px'},
          { text: 'Type', sortable: false, value: 'type', width: '80px'},
          { text: 'Schedule', sortable: false, value: 'schedule',width: '200px'}, 
          { text: 'Restday', sortable: false, value: 'is_restday', width: '100px'}, 
          { text: 'Leave', sortable: false, value: 'leave_code', width: '100px'},
          { text: 'With Pay', sortable: false, value: 'with_pay',width: '100px'},
          { text: 'Time In', sortable: false, value: 'time_in',width: '200px'},
          { text: 'Time Out', sortable: false, value: 'time_out',width: '200px'},  
          { text: 'Regular Hour', sortable: false, value: 'regular_hour', width: '130px'},
          { text: 'Overtime (Hour)', sortable: false, value: 'overtime',width: '120'},
          { text: 'Night Differential (Hour)', sortable: false, value: 'night_differential',width: '165'},  
          { text: 'Tardiness (Min)', sortable: false, value: 'tardiness',width: '120'},  
          { text: 'Undertime (Min)', sortable: false, value: 'undertime',width: '125' },  
          { text: 'Absent (Day)', sortable: false, value: 'absent' ,width: '120px'},
        ],
        headers:[],
        selectedHeaders: [],
        headersMap: [
          { text: 'Cutoff', sortable: true, value: 'cutoff_info[0].name'},
          { text: 'Month', sortable: false, value: 'month'},
          { text: 'Year', sortable: false, value: 'year'},
          { text: 'First Name', sortable: false, value: 'user_info[0].personal_information.firstname'},
          { text: 'Middle Name', sortable: false, alue: 'user_info[0].personal_information.middlename'},
          { text: 'Last Name', sortable: false, value: 'user_info[0].personal_information.lastname'},
          { text: 'Action', sortable: false, value: 'action'},
        ]
    }),
    created(){
        this.$store.state.header = false;
        this.$store.state.footer = false;
        this.prodApp = "listemployee"
        this.FetchAllTimesheetlogs();
        this.headers = Object.values(this.headersMap);
        this.selectedHeaders = this.headers;
    },
    mounted(){
        this.$store.state.title = "Timesheet Logs"
    },
    computed: {
    //Done to get the ordered headers
    showHeaders () {
      return this.headers.filter(s => this.selectedHeaders.includes(s));
      }
    },      
    methods: {
      alertdata(){
          this.prodApp = "dataemployee"
      },
      alertlist(){
          this.prodApp = "listemployee"
          this.FetchAllTimesheetlogs();
      },
      FetchAllTimesheetlogs(){ // fetch all employee timesheet logs
          let payload = {
              parent_id: this.$store.getters.getParentID,
              user_id: this.$store.getters.getUserID
          
          };
          timesheetservices.FetchAllTimesheetlogs(payload, this.$store.getters.getAccessToken).then(response => {
              if(response.data.success){
                  this.timesheetdatalogs = response.data.data
                  console.log(this.timesheetdatalogs);
              }
          }).catch(error =>{ 
              this.$store.state.snackbar.message = error.response.data.message;
              this.$store.state.snackbar.show = true;
          });
      },
      GetTimesheet(cutoff_id, month, year){ // fetch timesheet per cutoff, month , year
          console.log(cutoff_id, month, year);
          let payload = {
              parent_id: this.$store.getters.getParentID,
              user_id: this.$store.getters.getUserID,
              cutoff_id : cutoff_id,
              month : month,
              year : year
          };
          timesheetservices.FetchTimesheetViaCutoff(payload, this.$store.getters.getAccessToken).then(response => {
              if(response.data.success){
                  this.viewtimesheetdata = response.data.data
                  this.viewtimesheetdatadialog = true
              }
          }).catch(error =>{ 
              this.$store.state.snackbar.message = error.response.data.message;
              this.$store.state.snackbar.show = true;
          });
      },
      changeStatusDialogTimesheetView(status){
          this.viewtimesheetdatadialog = status;
      },
    }
  }
</script>

<style scoped>
  input[type=checkbox] {
    accent-color: orange;
  }
</style>