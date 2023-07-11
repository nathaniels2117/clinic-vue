<template>
   <v-container style="max-width: 95%; position: relative;" >
        <v-row>
            <v-col cols="12">
                <!-- Dialog timesheet confirmation save form -->  
                <v-dialog
                v-model="fullscreendialog"
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
                            @click="fullscreendialog = false"
                            >
                            <v-icon>mdi-close</v-icon>
                            </v-btn>
                            <v-toolbar-title>Timesheet Confirmation</v-toolbar-title>
                            <v-spacer></v-spacer>
                        </v-toolbar>
                        <br>
                        <v-row justify="center">
                            <v-col cols="12">
                                <v-card>
                                    <v-form  ref="form" v-model="valid" lazy-validation>
                                        <v-row class="pl-2 pr-2 pb-0">
                                            <div class="col-sm-8">
                                                <v-combobox
                                                :items="cutoff_information"
                                                v-model="cutoffid"
                                                label="Cutoff"
                                                color="orange"
                                                outlined
                                                :rules="[v => !!v || 'Cutoff is required']"
                                                ></v-combobox>
                                            </div>
                                            <div class="col-sm-2">
                                                <v-dialog
                                                ref="dialogs"
                                                v-model="modalmonth"
                                                :return-value.sync="datemonth"
                                                width="290px"
                                                >
                                                    <template v-slot:activator="{ on, attrs }">
                                                        <v-text-field
                                                            v-model="datemonthtext"
                                                            color="orange"
                                                            label="Month"
                                                            :rules="[v => !!v || 'Month is required']"
                                                            readonly
                                                            outlined
                                                            v-bind="attrs"
                                                            v-on="on"
                                                        ></v-text-field>
                                                    </template>
                                                    <v-date-picker
                                                    v-model="datemonth"
                                                    type="month"
                                                    color="orange"
                                                    scrollable
                                                    @change="savedates(), modalmonth = false"
                                                    >
                                                    </v-date-picker>
                                                </v-dialog>
                                            </div>
                                            <div class="col-sm-2" >
                                                <v-dialog
                                                ref="dialog"
                                                v-model="modalyear"
                                                :return-value.sync="datemonth"
                                                width="290px"
                                                >
                                                    <template v-slot:activator="{ on, attrs }">
                                                        <v-text-field
                                                            v-model="dateyeartext"
                                                            color="orange"
                                                            label="Year"
                                                            :rules="[v => !!v || 'Year is required']"
                                                            readonly
                                                            outlined
                                                            v-bind="attrs"
                                                            v-on="on"
                                                        ></v-text-field>
                                                    </template>
                                                    <v-date-picker
                                                    v-model="datemonth"
                                                    type="month"
                                                    color="orange"
                                                    scrollable
                                                    @change="savedate(), modalyear = false"
                                                    >
                                                    </v-date-picker>
                                                </v-dialog>
                                            </div>
                                        </v-row>
                                    </v-form>
                                    <v-row class="pl-5 pr-5 pb-5">
                                        <v-data-table
                                        :headers="showHeaders"
                                        :items="timesheetdata"
                                        :items-per-page="16"
                                        hide-default-footer     
                                        :sort-by.sync="sortBy"
                                        :sort-desc.sync="sortDesc"
                                        class="col-sm-12"   
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
                                    </v-row>
                                    <v-col>
                                        <v-btn
                                        block
                                        outlined
                                        color="orange"
                                        class="white--text"
                                        v-if="$store.getters.valAccess(162)"
                                        @click="valid == false ? validationfalse() : changeStatusDialogSave(true)"
                                        >
                                        COMPUTE
                                        </v-btn>
                                    </v-col>
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-dialog>
                 <!-- Timesheet Confirmation saving form -->  
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
                                            <v-btn
                                            medium
                                            dark
                                            color="orange"
                                            elevation="2"
                                            @click="fullscreendialog = true"
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
                                            @click="fullscreendialog = true"
                                            >
                                            <v-icon>mdi-plus</v-icon>
                                            </v-btn>
                                            </template>
                                    </v-toolbar>
                                </template>
                                <!-- One liner filtering -->  
                                <br>
                                <!-- Timesheet Confirmation Data table -->  
                                <v-data-table
                                :headers="showHeaderslog"
                                :search="search"
                                :items="timesheetdatalogs"
                                :page.sync="page"
                                @page-count="pageCount = $event"
                                :footer-props="{
                                'items-per-page-options':[10],
                                'disable-items-per-page': true,
                                }">         

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
                                                v-if="$store.getters.valAccess(163)"
                                                
                                                @click="GetTimesheet(props.item.cutoff_id, props.item.month, props.item.year)"
                                            >
                                            <v-icon
                                                color="orange"
                                                small
                                                @click="GetTimesheet(props.item.cutoff_id, props.item.month, props.item.year)"
                                            >
                                                mdi-clipboard-text-search
                                            </v-icon>
                                            View
                                        </v-btn>                                            
                                    </template>                     
                                </v-data-table>
                                <!-- Timesheet Confirmation Data table -->  
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

         <!-- Dialog view timesheet confirmation -->  
        <v-row justify="center">
            <v-dialog
                persistent :retain-focus="false"
                v-model="viewtimesheetdatadialog"
            >
                <v-card>    
                    <v-data-table
                    :headers="showHeaders"
                    :items="viewtimesheetdata"
                    :items-per-page="16" 
                    :sort-by.sync="sortBy"
                    :sort-desc.sync="sortDesc"
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
    </v-container>
      
  </template>
  
  <script>
    import cutoffservices from '../services/cutoffservices';
    import timesheetservices from '../services/timesheetservices';
    import moment from 'moment';
    
    export default {
      name: 'TimesheetConfirmation',
      data: () => ({
            menucolumn: false,
            sortBy: 'date',
            sortDesc: false,
            fullscreendialog : false,
            page: 1,
            pageCount: 0,        
            search : '',
            loading: false,
            prodApp: "listemployee",
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
            headers:[],
            selectedHeaders: [],
            headersMap: [
                { text: 'Date', value: 'date' , sortable: true, width: '110px', align: 'center'},
                { text: 'Day', value: 'day', sortable: false, width: '80px'},
                { text: 'Type', value: 'type', sortable: false, width: '80px'},
                { text: 'Schedule', value: 'schedule', sortable: false, width: '200px'}, 
                { text: 'Restday', value: 'is_restday', sortable: false, width: '100px'}, 
                { text: 'Leave', value: 'leave_code', sortable: false, width: '100px'},
                { text: 'With Pay', value: 'with_pay', sortable: false, width: '100px'},
                { text: 'Time In', value: 'time_in', sortable: false,width: '200px'},
                { text: 'Time Out', value: 'time_out', sortable: false, width: '200px'},  
                { text: 'Regular Hour', value: 'regular_hour', sortable: false, width: '130px'},
                { text: 'Overtime (Hour)', value: 'overtime', sortable: false, width: '120px'},
                { text: 'Night Differential (Hour)', value: 'night_differential', sortable: false, width: '165px'},  
                { text: 'Tardiness (Min)', value: 'tardiness', sortable: false, width: '120px'},  
                { text: 'Undertime (Min)', value: 'undertime', sortable: false, width: '125px' },  
                { text: 'Absent (Day)', value: 'absent' , sortable: false, width: '120px'},
            ],
            headerslog:[],
            selectedHeaderslog: [],
            headersMaplog: [
                { text: 'Cutoff', sortable: true, value: 'cutoff_info[0].name'},
                { text: 'Month', sortable: false, value: 'month'},
                { text: 'Year', sortable: false, value: 'year'},
                { text: 'Action',sortable: false, value: 'action'},
            ]
      }),
      created(){
        this.$store.state.header = false;
        this.$store.state.footer = false;
        this.FetchAllCutoff();
        this.FetchAllTimesheetlogsViaCutoff();
        this.headers = Object.values(this.headersMap);
        this.selectedHeaders = this.headers;
        this.headerslog = Object.values(this.headersMaplog);
        this.selectedHeaderslog = this.headerslog;
      },
      mounted(){
        this.$store.state.title = "Timesheet Confirmation"
      },
      computed: {
      //Done to get the ordered headers
      showHeaders () {
        return this.headers.filter(s => this.selectedHeaders.includes(s));
      },
      showHeaderslog () {
        return this.headerslog.filter(s => this.selectedHeaderslog.includes(s));
      }      
    },
      methods: {
            changeStatusDialogEdit(status){
                this.editconfirmation = status;
            },
            changeStatusDialogSave(status){
                this.saveconfirmation = status;
            },
            validationfalse(){
                this.$refs.form.validate()
            },
            savedates(){ // spliting date to month only
                this.$refs.dialogs.save(this.datemonth)
                var yearmonth = this.datemonth.split('-');
                this.datemonthtext = moment.months(yearmonth[1] - 1);
                this.dateyeartext = yearmonth[0]
            },
            savedate(){ // spliting date to year only
                this.$refs.dialog.save(this.datemonth)
                var yearmonth = this.datemonth.split('-');
                this.datemonthtext = moment.months(yearmonth[1] - 1);
                this.dateyeartext = yearmonth[0]
            },
            FetchAllCutoff(){ // fetch all cut off to combobox
                let payload = {
                    parent_id: this.$store.getters.getParentID
                };
                cutoffservices.FetchAllCutoff(payload, this.$store.getters.getAccessToken).then(response => {
                    if(response.data.success){
                        response.data.data.forEach((value) => {
                            this.cutoff_information.push({
                                text: value.name,
                                value: value.id
                            });
                        });
                    }
                    else{
                        console.log(response.data.message);
                    }
                }).catch(error => console.log(error));
            },
            AddCutoffTimesheet(){  // add timesheet confirmation
                this.$refs.form.validate()

                let val = this.$refs.form.validate();
                
                if(val){
                    this.$refs.dialog.save(this.datemonth)
                    var yearmonth = this.datemonth.split('-');
                    let payload = {
                        parent_id: this.$store.getters.getParentID,
                        user_id: this.$store.getters.getUserID,
                        cutoff_id: this.cutoffid.value,
                        month: yearmonth[1],
                        year: yearmonth[0],
                    };
                    console.log(payload);
                    timesheetservices.AddCutoffTimesheet(payload, this.$store.getters.getAccessToken).then(response => {
                        if(response.data.success){
                            console.log(response.data.data);
                            this.$store.state.snackbar.message = 'Timesheet has been computed.';
                            this.$store.state.snackbar.show = true;
                            this.timesheetdata = response.data.data
                            this.AddTimesheetlogsViaCutoff();
                            this.FetchAllTimesheetlogsViaCutoff();
                        }
                    }).catch(error =>{ 
                        this.$store.state.snackbar.message = error.response.data.message;
                        this.$store.state.snackbar.show = true;
                    });
                }   

                this.saveconfirmation = false

            }, 
            AddTimesheetlogsViaCutoff(){ // add timesheetlogs confirmation "for admin side"
                var yearmonth = this.datemonth.split('-');
                let payload = {
                    parent_id: this.$store.getters.getParentID,
                    user_id: this.$store.getters.getUserID,
                    cutoff_id: this.cutoffid.value,
                    month: yearmonth[1],
                    year: yearmonth[0],
                
                };
                timesheetservices.AddTimesheetlogsViaCutoff(payload, this.$store.getters.getAccessToken).then(response => {
                    if(response.data.success){
                        console.log('this is for timesheetlogs');
                        console.log(response.data.data);
                    }
                }).catch(error =>{ 
                    this.$store.state.snackbar.message = error.response.data.message;
                    this.$store.state.snackbar.show = true;
                });
            },
            FetchAllTimesheetlogsViaCutoff(){ // fetch timesheetlogs confirmation
                let payload = {
                    parent_id: this.$store.getters.getParentID,
                    user_id: this.$store.getters.getUserID
                
                };
                timesheetservices.FetchAllTimesheetlogsViaCutoff(payload, this.$store.getters.getAccessToken).then(response => {
                    if(response.data.success){
                        this.timesheetdatalogs = response.data.data
                        console.log(this.timesheetdatalogs);
                    }
                }).catch(error =>{ 
                    this.$store.state.snackbar.message = error.response.data.message;
                    this.$store.state.snackbar.show = true;
                });
            },
            GetTimesheet(cutoff_id, month, year){ // fetch timesheet via cutoff month and year
                this.forViewUpdate = {
                    cutoff_id : cutoff_id,
                    month : month,
                    year : year
                }
                let payload = {
                    parent_id: this.$store.getters.getParentID,
                    user_id: this.$store.getters.getUserID,
                    cutoff_id : cutoff_id,
                    month : month,
                    year : year
                };
                console.log(payload);
                timesheetservices.AddCutoffTimesheet(payload, this.$store.getters.getAccessToken).then(response => {
                    if(response.data.success){
                        console.log(response.data.data);
                        this.viewtimesheetdata = response.data.data
                        this.viewtimesheetdatadialog = true
                    }
                }).catch(error =>{ 
                    this.$store.state.snackbar.message = error.response.data.message;
                    this.$store.state.snackbar.show = true;
                });
            },
            ComputeTimesheetView(){
                this.viewtimesheetdatadialog = status;
            },
            changeStatusDialogTimesheetView(status){
                this.viewtimesheetdatadialog = status;
            },
            alertdata(){ // for tabs 
                this.prodApp = "dataemployee"
            },
            alertlist(){ // for tabs 
                this.prodApp = "listemployee"
                this.FetchAllTimesheetlogsViaCutoff();
            },
            ViewAddTimesheetlogsViaCutoff(){  // viewing of timesheet per cut off
                let payload = {
                    parent_id: this.$store.getters.getParentID,
                    user_id: this.$store.getters.getUserID,
                    cutoff_id: this.forViewUpdate.cutoff_id,
                    month: this.forViewUpdate.month,
                    year: this.forViewUpdate.year,
                
                };
                timesheetservices.AddTimesheetlogsViaCutoff(payload, this.$store.getters.getAccessToken).then(response => {
                    if(response.data.success){
                        console.log('this is for timesheetlogs');
                        console.log(response.data.data);
                    }
                }).catch(error =>{ 
                    this.$store.state.snackbar.message = error.response.data.message;
                    this.$store.state.snackbar.show = true;
                });
            },
        }
    }
  </script>
  
  <style scoped>
  input[type=checkbox] {
  accent-color: orange;
}
  </style>