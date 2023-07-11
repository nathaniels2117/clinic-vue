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
                                        v-model="menusss"
                                        :close-on-content-click="false"
                                        :nudge-width="100"
                                        offset-y
                                        >
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn
                                            color="orange"
                                            dark
                                            v-bind="attrs"
                                            v-on="on"
                                            >
                                            <v-icon>mdi-file-sign</v-icon>Request Type
                                            </v-btn>
                                        </template>

                                        <v-card> 
                                            <v-list>
                                            <v-list-item>
                                                <v-radio-group
                                                v-model="$store.state.filingmodule"
                                                column
                                                >
                                                <v-radio
                                                    label="Overtime"
                                                    color="orange"
                                                    value="Overtime"
                                                    @click="changemodule($store.state.filingmodule)"
                                                ></v-radio>
                                                <v-radio
                                                    label="Leave"
                                                    color="orange"
                                                    value="Leave"
                                                    @click="changemodule($store.state.filingmodule)"
                                                ></v-radio>
                                                <v-radio
                                                    label="Official Business"
                                                    color="orange"
                                                    value="Official Business"
                                                    @click="changemodule($store.state.filingmodule)"
                                                ></v-radio>
                                                <v-radio
                                                    label="Undertime"
                                                    color="orange"
                                                    value="Undertime"
                                                    @click="changemodule($store.state.filingmodule)"
                                                ></v-radio>
                                                </v-radio-group>
                                                </v-list-item>
                                            </v-list>
                                        </v-card>
                                        </v-menu>
                                    </div>
                                </template>


                                <template  v-if="$vuetify.breakpoint.smAndDown">
                                    <div class="text-center">
                                        <v-menu
                                        v-model="menusss"
                                        :close-on-content-click="false"
                                        :nudge-width="100"
                                        offset-y
                                        >
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-btn
                                                color="orange"
                                                dark
                                                v-bind="attrs"
                                                v-on="on"
                                                >
                                                <v-icon>mdi-file-sign</v-icon>
                                                </v-btn>
                                            </template>

                                            <v-card> 
                                                <br>
                                                &nbsp;&nbsp;
                                            <b>Request Type</b>
                                                <v-list>
                                                <v-list-item>
                                                    <v-radio-group
                                                    v-model="$store.state.filingmodule"
                                                    column
                                                    >
                                                    <v-radio
                                                        label="Overtime"
                                                        color="orange"
                                                        value="Overtime"
                                                        @click="changemodule($store.state.filingmodule)"
                                                    ></v-radio>
                                                    <v-radio
                                                        label="Leave"
                                                        color="orange"
                                                        value="Leave"
                                                        @click="changemodule($store.state.filingmodule)"
                                                    ></v-radio>
                                                    <v-radio
                                                        label="Official Business"
                                                        color="orange"
                                                        value="Official Business"
                                                        @click="changemodule($store.state.filingmodule)"
                                                    ></v-radio>
                                                    <v-radio
                                                        label="Undertime"
                                                        color="orange"
                                                        value="Undertime"
                                                        @click="changemodule($store.state.filingmodule)"
                                                    ></v-radio>
                                                    </v-radio-group>
                                                    </v-list-item>

                                                </v-list>
                                            </v-card>
                                        </v-menu>
                                    </div>
                                </template>

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
                                    v-if="$store.getters.valAccess(154)"
                                    @click="alertdata()"
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
                                    v-if="$store.getters.valAccess(154)"
                                    @click="alertdata()"
                                    >
                                    <v-icon>mdi-plus</v-icon>
                                    </v-btn>
                                </template>
                            </v-toolbar>
                        </template>
                        <!-- One liner filtering -->  
                        <br>
                        <!-- Data table undertime -->  
                        <v-row justify="center">
                            <v-col cols="12">
                                <v-data-table
                                :headers="showHeaders"
                                :items="undertimedata"
                                :search="search" 
                                :page.sync="page"
                                must-sort
                                :sort-by.sync="sortBy"
                                :sort-desc.sync="sortDesc"
                                @page-count="pageCount = $event"
                                :footer-props="{
                                'items-per-page-options':[10],
                                'disable-items-per-page': true,
                                }">
                                    <template v-slot:item.time_in="props" v-show="date">
                                        <v-edit-dialog
                                            :return-value.sync="props.item.time_in"
                                            @save="UpdateFieldUndertime(props.item.id, 'time_in', props.item.time_in, 'update')"
                                        >
                                            {{ moment(props.item.time_in, 'hh:mm A').format('hh:mm A') }} 
                                            <template v-slot:input>
                                                <v-time-picker
                                                    v-model="props.item.time_in"
                                                    label="Edit"
                                                    color="orange"
                                                    ampm-in-title
                                                    v-if="props.item.status == '1'"
                                                >
                                                </v-time-picker>
                                            </template>
                                        </v-edit-dialog>
                                    </template>

                                    <template v-slot:item.time_out="props">
                                        {{ moment(props.item.time_out, 'hh:mm A').format('hh:mm A') }}
                                    </template>

                                    <template v-slot:item.work_credit="props">
                                        <v-edit-dialog
                                                :return-value.sync="props.item.work_credit"
                                                @save="UpdateFieldUndertime(props.item.id, 'work_credit', props.item.work_credit, 'update')"
                                            >
                                            {{ props.item.work_credit }}
                                            <template v-slot:input>
                                                <v-combobox
                                                    v-model="props.item.work_credit"
                                                    outlined
                                                    label="Work Credit"
                                                    :items="workcreditcombobox"
                                                    class="pt-5"
                                                    single
                                                    v-if="props.item.status == '1'"
                                                ></v-combobox>
                                            </template>
                                        </v-edit-dialog>
                                    </template>
                                            
                                    <template v-slot:item.status="props">
                                        <v-chip
                                            class="ma-2"
                                            color="blue"
                                            outlined
                                            v-if="props.item.status == '1'"
                                        >
                                            Pending
                                        </v-chip>
                                        <v-chip
                                            class="ma-2"
                                            color="success"
                                            outlined
                                            v-else-if="props.item.status == '2'"
                                        >
                                            Approved
                                        </v-chip>
                                        <v-chip
                                            class="ma-2"
                                            color="red"
                                            outlined
                                            v-else-if="props.item.status == '3'"
                                        >
                                            Disapproved
                                        </v-chip>
                                        <v-chip
                                            class="ma-2"
                                            color="red"
                                            outlined
                                            v-else
                                        >
                                            Cancel
                                        </v-chip>
                                    </template>
                                            
                                    <template v-slot:item.action="props">
                                        <v-btn
                                            elevation="2"
                                            class="mx-2"
                                            dark
                                            small
                                            outlined
                                            color="orange"
                                            @click="UpdateAllUndertime(props.item.id, props.item, 'updateall')"
                                            v-if="props.item.status == '1' && $store.getters.valAccess(155)"
                                        >
                                            <v-icon extra small>
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
                                            @click="UpdateRemarks(props.item.id, 'status', '4', 'cancel')"
                                            v-if="props.item.status == '1' && $store.getters.valAccess(156)"
                                        >
                                            <v-icon small>
                                                mdi-close
                                            </v-icon>
                                            Cancel
                                        </v-btn>    
                                    </template>
                                </v-data-table>
                                <v-pagination
                                    color="orange"
                                    v-model="page"
                                    :length="pageCount"
                                ></v-pagination>     
                            </v-col>
                        </v-row>
                        <!-- Data table undertime -->  
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>


        <!-- Dialog save form -->  
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
                @click="dialog = false, prodApp=='listemployee', ClearUndertime()"
                >
                <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>File Undertime</v-toolbar-title>
                <v-spacer></v-spacer>
                </v-toolbar>
                <v-row justify="center" v-if="prodApp=='dataemployee'">
                    <v-col cols="12">
                        <v-form ref="form" v-model="valid" lazy-validation >
                            <v-col sm="12" md="6" offset-md="3" class="mt-3 text-center"> 
                                <h4>Note: Here you can file undertime.</h4>
                            </v-col>
                            <v-col sm="12" md="6" offset-md="3">

                                
                                <v-menu
                                ref="menutargetdate"
                                v-model="menutargetdate"
                                :close-on-content-click="false"
                                transition="scale-transition"
                                offset-y
                                max-width="290px"
                                min-width="auto"
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field
                                        v-model="undertime.target_date"
                                        label="Target Date"
                                        persistent-hint
                                        color="orange"
                                        prepend-icon="mdi-calendar"
                                        v-bind="attrs"
                                        v-on="on"
                                        :rules="[v => !!v || 'Target Date is required']"
                                        ></v-text-field>
                                    </template>
                                    <v-date-picker
                                        color="orange"
                                        v-model="undertime.target_date"
                                        @input="menutargetdate = false"
                                    ></v-date-picker>
                                </v-menu>

                                <v-text-field
                                v-model="undertime.time_out"
                                color="orange"
                                pattern="^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$"
                                type="time"
                                label="Time Out"
                                :rules="[v => !!v || 'Time Out is required']"
                                @input="AMPMTO('time_out'), computeDates()"
                                >
                                </v-text-field>

                                <br>

                                <v-textarea
                                v-model="undertime.reason"
                                solo
                                name="input-7-4"
                                label="Reason"
                                color="orange"
                                outlined
                                ></v-textarea>

                                <v-btn
                                block
                                outlined
                                color="orange"
                                class="white--text"
                                @click="valid == false ? validationfalse() : changeStatusDialogSave(true)"
                                >
                                SAVE
                                </v-btn>
                            </v-col>
                        </v-form>
                    </v-col>
                </v-row>
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
            <v-toolbar
            dark
            color="orange"
            >
            <v-btn
            icon
            dark
            @click="editfullscreendialog = false, prodApp=='listemployee', ClearUndertime()"
            >
            <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>Edit Undertime</v-toolbar-title>
            <v-spacer></v-spacer>
            </v-toolbar>
            <v-row justify="center">
                    <v-col cols="12">
                        <v-form ref="form" v-model="valid" lazy-validation >

                            <v-col sm="12" md="6" offset-md="3" class="mt-3 text-center"> 
                                    <h4>Note: Here you can edit undertime.</h4>
                                </v-col>
                            <v-col sm="12" md="6" offset-md="3">
                                <v-menu
                                ref="menutargetdate"
                                v-model="menutargetdate"
                                :close-on-content-click="false"
                                transition="scale-transition"
                                offset-y
                                max-width="290px"
                                min-width="auto"
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field
                                        v-model="undertime.target_date"
                                        label="Target Date"
                                        persistent-hint
                                        color="orange"
                                        prepend-icon="mdi-calendar"
                                        v-bind="attrs"
                                        v-on="on"
                                        :rules="[v => !!v || 'Target Date is required']"
                                        ></v-text-field>
                                    </template>
                                    <v-date-picker
                                        color="orange"
                                        v-model="undertime.target_date"
                                        @input="menutargetdate = false"
                                    ></v-date-picker>
                                </v-menu>
                                <v-text-field
                                v-model="undertime.time_out"
                                color="orange"
                                pattern="^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$"
                                type="time"
                                label="Time Out"
                                :rules="[v => !!v || 'Time Out is required']"
                                @input="AMPMTO('time_out'), computeDates()"
                                >
                                </v-text-field>
                                <br>
                                <v-textarea
                                v-model="undertime.reason"
                                solo
                                name="input-7-4"
                                label="Reason"
                                color="orange"
                                outlined
                                ></v-textarea>

                                <v-btn
                                block
                                outlined
                                color="orange"
                                class="white--text"
                                @click="valid == false ? validationfalse() : changeStatusDialogEdit(true)"
                                >
                                Update
                                </v-btn>
                            </v-col>
                        </v-form>
                    </v-col>
                </v-row>
            </v-card>
        </v-dialog>
        <!-- Dialog edit form -->  


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
                        @click="SaveUndertime()"
                        >
                        Confirm
                    </v-btn>
                    </center>
                    <br>                    
                </v-card>
            </v-dialog>
        </v-row>
        <!-- Dialog save confirmation -->  

        <!-- Dialog update / cancel remarks confirmation -->  
        <div class="text-center">
            <v-dialog
                v-model="updateremarksdialog"
                width="500"
            >
                <v-card>
                    <v-card-title class="text-h8 lighten-2">
                        Remarks
                    </v-card-title>
                    <v-card-actions>
                        <v-textarea
                            solo
                            name="input-7-4"
                            outlined
                            padding="120"
                            color="orange"
                            no-resize
                            counter
                            v-model="updateremarksito"
                        ></v-textarea>
                    </v-card-actions>
                    <center>
                    <v-btn
                        elevation="2"
                        class="mx-2"
                        dark
                        outlined
                        small
                        color="red"
                        @click="changeStatusDialogRemarks(false)"
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
                        @click="changeStatusDialogCancel(true)"
                        >
                        Confirm
                    </v-btn>
                    </center>
                    <br>                    
                </v-card>
            </v-dialog>
        </div>
        <!-- Dialog update / cancel remarks confirmation -->  

        <!-- Dialog cancel confirmation -->  
        <v-row justify="center">
            <v-dialog
                persistent :retain-focus="false"
                v-model="cancelconfirmation"
                max-width="290"
            >
                <v-card>
                    <v-card-title class="text-h5">
                        Cancel
                    </v-card-title>
                    <v-card-text>Are you sure you want to cancel?</v-card-text>
                    <center>
                    <v-btn
                        elevation="2"
                        class="mx-2"
                        dark
                        outlined
                        small
                        color="red"
                        @click="changeStatusDialogCancel(false)"
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
        <!-- Dialog cancel confirmation -->  
    </v-container>   
</template>
  
  <script>
    import undertimeservices from '../services/undertimeservices';

    export default {
    name: 'Undertime',
    data: () => ({
        sortBy: 'target_date',
        sortDesc: true,
        menusss: false,
        menucolumn: false,
        cancelconfirmation: false,
        editfullscreendialog: false,
        page: 1,
        pageCount: 0,
        filingmodule: '',
        itemmodule: ['Overtime', 'Leave', 'Official Business', 'Undertime'],
        search: '',
        valid: false,
        loading: false,
        prodApp: "listemployee",
        editconfirmation: false,
        saveconfirmation: false,
        updateremarksdialog: false,
        updateremarksito: '',
        undertimedata: [],
        workcreditcombobox : ['For Payroll' , 'For Offset'],
        menudaterange: false,
        menutargetdate: false,
        daterange: [],
        dialog: false,
        menutimein: false,
        menutimeout: false,
        headers:[],
        selectedHeaders: [],
        headersMap: [
            { text: 'Target Date', sortable: true, value: 'target_date',width: '115px' }, 
            { text: 'Time Out', sortable: false, value: 'time_out',width: '100px' }, 
            { text: 'Reason', sortable: false, value: 'reason' },
            { text: 'Status', sortable: false, value: 'status' },
            { text: 'Action', sortable: false, value: 'action' ,width: '235px'}
            ],
            undertime: {
                user_id: '',
                target_date: '',
                time_out: '',
                reason: '',
                approved_user_id: '',
                approval_at: '',
                status: '',
                remarks: '',
                approver_remarks: '',
            },
            undertimeampm:{
                ampmend_time: '',
            }
      }),
      created(){
        this.$store.state.header = false;
        this.$store.state.footer = false;
        this.$store.state.snackbar.color = 'orange';
        this.$store.state.filingmodule = "Undertime";
        this.FetchAllUndertimeViaUser(this.$store.getters.getUserID);
        this.headers = Object.values(this.headersMap);
        this.selectedHeaders = this.headers;
      },
      mounted(){
            this.$store.state.title = "File Undertime"
      },
      computed: {
      //Done to get the ordered headers
      showHeaders () {
        return this.headers.filter(s => this.selectedHeaders.includes(s));
      }
    },
      methods: {
            FetchAllUndertimeViaUser(id){ // fetch undertime via user
                let payload = {
                    user_id: this.$store.getters.getParentID,
                    id : id
                };
                undertimeservices.FetchAllUndertimeViaUser(payload, this.$store.getters.getAccessToken).then(response => {
                    if(response.data.success){
                        this.undertimedata = response.data.data;
                        console.log(this.undertimedata);
                    }
                }).catch(error => console.log(error));
            },
            getDate: function () { // get system date
                return new Date().toLocaleDateString();
            },
            getTime: function () { // get system time
                return new Date().toLocaleTimeString();
            },
            UpdateFieldUndertime(id, field, value, approval) // fetch undertime info for update
            {
                this.forUpdate = {
                    id: id,
                    field: field,
                    value: value,
                    approval: approval
                }
                this.editconfirmation = true
            },
            UpdateRemarks(id, field, value, approval) // fetch undertime info for update
            {
                this.forUpdate = {
                    id: id,
                    field: field,
                    value: value,
                    approval: approval
                }
                this.forAllUpdate = {
                    approval: 'cancel'
                }
                this.updateremarksdialog = true
            },
            alertdata(){ // for tabs 
                this.prodApp = "dataemployee"
                this.dialog = true
            },
            alertlist(){ // for tabs 
                this.prodApp = "listemployee"
            },
            changeStatusDialogEdit(status){
                this.editconfirmation = status;
            },
            changeStatusDialogRemarks(status){
                this.updateremarksito='';
                this.updateremarksdialog = status;
            },
            confirmUpdate(){ // edit undertime
                if(this.forAllUpdate['approval'] == 'updateall'){  // for update undertime
                    let payload = {
                    id: this.forAllUpdate.id,
                    parent_user_id: this.$store.getters.getParentID,
                    user_id: this.$store.getters.getUserID,
                    target_date: this.undertime.target_date,
                    time_out: this.undertime.time_out,
                    status: this.undertime.status,
                    reason: this.undertime.reason
                    }
                    undertimeservices.UpdateUndertime(payload, this.$store.getters.getAccessToken).then(response => {
                        if(response.data.success){
                            this.$store.state.snackbar.message = 'Undertime has been updated.';
                            this.$store.state.snackbar.show = true;
                            this.ClearUndertime();
                            this.editfullscreendialog = false
                            this.$refs.form.resetValidation();
                            this.$store.state.snackbar.colors = 'xgreen';
                    this.$store.state.snackbar.icon = "mdi-check-circle-outline";                 
                        }
                    }).catch(error =>{
                        this.$store.state.snackbar.colors = 'xred';
                        this.$store.state.snackbar.icon = "mdi-alert-outline";   
                        typeof error.response.data.errors == 'undefined' ? this.$store.state.snackbar.message = error.response.data.message : this.$store.state.snackbar.message = error.response.data.errors.target_date[0]
                        this.$store.state.snackbar.show = true;
                    });
                }
                else{ // for cancel underime
                    let payload = {
                        id: this.forUpdate['id'],
                        field: this.forUpdate['field'],
                        value: this.forUpdate['value'],
                        remarks: this.updateremarksito
                    }
                    undertimeservices.UpdateRemarks(payload, this.$store.getters.getAccessToken).catch(error =>{
                        this.errorDAW = error.response.data.message
                        this.$store.state.snackbar.message = error.response.data.message;
                        this.$store.state.snackbar.colors = 'xred';
                        this.$store.state.snackbar.icon = "mdi-alert-outline";   
                    });
                    this.updateremarksdialog = false
                    this.cancelconfirmation= false
                    this.$store.state.snackbar.colors = 'xgreen';
                    this.$store.state.snackbar.icon = "mdi-check-circle-outline";   
                    this.$store.state.snackbar.message = 'Undertime has been cancelled.';
                }
                this.updateremarksito='';
                this.$store.state.snackbar.show = true;
                this.FetchAllUndertimeViaUser(this.$store.getters.getUserID);
                this.editconfirmation = false
            },
            changeStatusDialogSave(status){
                this.saveconfirmation = status;
            },
            SaveUndertime(){ // save undertime
                let val = this.$refs.form.validate();

                if(val){
                    let payload = {
                        target_date: this.undertime.target_date,
                        time_in: this.undertime.time_in,
                        time_out: this.undertime.time_out,
                        reason: this.undertime.reason,
                        status: 1,
                        user_id: this.$store.getters.getUserID,
                        parent_user_id: this.$store.getters.getParentID
                    };
                    undertimeservices.SaveUndertime(payload, this.$store.getters.getAccessToken).then(response => {
                        if(response.data.success){
                            this.$store.state.snackbar.message = 'Undertime has been created.';
                            this.$store.state.snackbar.show = true;
                            this.FetchAllUndertimeViaUser(this.$store.getters.getUserID);
                            this.ClearUndertime();
                            this.$refs.form.resetValidation();
                            this.$store.state.snackbar.colors = 'xgreen';
                            this.$store.state.snackbar.icon = "mdi-check-circle-outline";   
                        }
                    }).catch(error =>{ 
                        this.$store.state.snackbar.colors = 'xred';
                        this.$store.state.snackbar.icon = "mdi-alert-outline";           
                        this.$store.state.snackbar.message = error.response.data.message
                        this.$store.state.snackbar.show = true;
                    });
                }
                this.saveconfirmation = false;
            },
            computeDates(){ // compute hour for undertime
                if(this.daterange[1] != null)
                {
                    var StartDate, EndDate
                    if(this.daterange[0] < this.daterange[1]){
                        StartDate = this.daterange[0].split('-');
                        EndDate = this.daterange[1].split('-');
                    }else{
                        StartDate = this.daterange[1].split('-');
                        EndDate = this.daterange[0].split('-');
                    }
                    if(this.daterange[0] , this.daterange[1] , this.undertime.time_in , this.undertime.time_out)
                    {
                        var StartTime = this.undertime.time_in.split(':');
                        var EndTime = this.undertime.time_out.split(':');
                        
                        var date1 = new Date(StartDate[0],(StartDate[1]-1),StartDate[2],StartTime[0],StartTime[1],0,0);
                        var date2 = new Date(EndDate[0],(EndDate[1]-1),EndDate[2],EndTime[0],EndTime[1],0,0);

                        var Difference_In_Time = date2.getTime() - date1.getTime();
                        
                        var days = 0;
                        var hrs = 0;
                        var mins = 0;

                        days = Math.floor(Difference_In_Time / 86400000);
                        hrs = Math.floor((Difference_In_Time % 86400000) / 3600000);
                        mins = Math.round(((Difference_In_Time % 86400000) % 3600000)/60000);

                        console.log(days+" Day(s) and "+ hrs +" Hour(s) and "+ mins + " Minute(s)")
                        if(hrs <= 0 || days >= 1){
                            alert("Invalid Days and Hours");
                            this.undertime.total_hour = '';
                        }else{
                            this.undertime.total_hour = hrs
                        }
                    }
                }
            },
            ClearUndertime(){
                this.undertime.user_id= ''
                this.undertime.target_date= ''
                this.undertime.time_in= ''
                this.undertime.time_out= ''
                this.undertime.reason= ''
                this.undertime.approved_user_id= ''
                this.undertime.approval_at= ''
                this.undertime.status= ''
                this.undertime.remarks= ''
                this.undertime.approver_remarks= ''
                this.undertimeampm.ampmend_time = ''
                this.dialog = false
            },
            validationfalse(){
                this.$refs.form.validate()
            },
            AMPMTO(){ // convertion of military time to AM : PM format
                var datenow = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)
                    var EndTime = this.undertime.time_out.split(':');
                    var date2 = new Date(datenow[0],(datenow[1]-1),datenow[2],EndTime[0],EndTime[1],0,0);
                    this.undertimeampm.ampmend_time = date2.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
            },
            changemodule(filingmodule){ // change module per page
                if(filingmodule == 'Leave'){
                    this.$router.push('/leave');
                }else if(filingmodule == 'Overtime'){
                    this.$router.push('/overtime');
                }else if(filingmodule == 'Official Business'){
                    this.$router.push('/officialbusiness');
                }else{
                    this.$router.push('/undertime');
                }
            },
            changeStatusDialogCancel(status){
                this.cancelconfirmation = status;
            },
            UpdateAllUndertime(id, item, updateall){  // fetch undertime info for update
                console.log(id, item)
                this.undertime.target_date = item.target_date
                this.undertime.time_out = item.time_out
                this.undertime.reason = item.reason
                this.undertime.status = item.status
                this.forAllUpdate = {
                    id: id,
                    created_by: item.created_by,
                    approval : updateall
                }
                this.editfullscreendialog = true
            },
        }
    }
  </script>
  
  <style scoped>
      @media screen and (max-width: 340px){
        .padMid{
            display: none;
        }
    }
    input[type=checkbox] {
  accent-color: orange;
}
  </style>