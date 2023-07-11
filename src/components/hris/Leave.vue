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
                        <!-- Leave Data table -->
                        <v-row justify="center">
                            <v-col cols="12">
                                <v-data-table
                                :headers="showHeaders"
                                :items="leavedata"
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
                                    <template v-slot:item.time_in="props">
                                        <v-edit-dialog
                                            :return-value.sync="props.item.time_in"
                                            @save="UpdateLeave(props.item.id, 'time_in', props.item.time_in, 'update')"
                                        >
                                        {{ moment(props.item.time_in, 'hh:mm A').format('hh:mm A')}}
                                            <template v-slot:input>
                                                <v-text-field
                                                    v-model="props.item.time_in"
                                                    label="Edit"
                                                    single-line
                                                    color="orange"
                                                    v-if="props.item.status == '1'"
                                                ></v-text-field>
                                            </template>
                                        </v-edit-dialog>
                                    </template>
                                    
                                    <template v-slot:item.time_out="props">
                                        <v-edit-dialog
                                            :return-value.sync="props.item.time_out"
                                            @save="UpdateLeave(props.item.id, 'time_out', props.item.time_out, 'update')"
                                        >
                                        {{ moment(props.item.time_out, 'hh:mm A').format('hh:mm A') }}
                                            <template v-slot:input>
                                                <v-text-field
                                                    v-model="props.item.time_out"
                                                    label="Edit"
                                                    single-line
                                                    color="orange"
                                                    v-if="props.item.status == '1'"
                                                ></v-text-field>
                                            </template>
                                        </v-edit-dialog>
                                    </template>
                                    
                                    
                                    <template v-slot:item.is_emergency="props" align="center">
                                        <template>
                                            <v-checkbox 
                                                v-model="props.item.is_emergency"
                                                color="orange"
                                                v-if="props.item.is_emergency == 1"
                                                readonly
                                            ></v-checkbox>
                                            <v-checkbox
                                                v-model="props.item.is_emergency"
                                                color="orange"
                                                v-else
                                                readonly
                                            ></v-checkbox>
                                        </template>
                                    </template>
                                    
                                    <template v-slot:item.with_pay="props" align="center">
                                        <template>
                                            <v-checkbox
                                                v-model="props.item.with_pay"
                                                color="orange"
                                                v-if="props.item.with_pay == 1"
                                                readonly
                                            ></v-checkbox>
                                            <v-checkbox
                                                v-model="props.item.with_pay"
                                                color="orange"
                                                v-else
                                                readonly
                                            ></v-checkbox>
                                        </template>
                                    </template>


                                    <template v-slot:item.is_wholeday="props" align="center">
                                        <template>
                                            <v-checkbox
                                                v-model="props.item.is_wholeday"
                                                color="orange"
                                                v-if="props.item.is_wholeday == 1"
                                                readonly
                                            ></v-checkbox>
                                            <v-checkbox
                                                v-model="props.item.is_wholeday"
                                                color="orange"
                                                v-else
                                                readonly
                                            ></v-checkbox>
                                        </template>
                                    </template>
                                    
                                    <template v-slot:item.leave_type_id="props">
                                        {{ props.item.leave_type_info.name }}
                                    </template>
                                    
                                    <template v-slot:item.emp_id="props">
                                    {{ props.item.created_info.id}}
                                    </template>
                                    
                                    <template v-slot:item.user_id="props">
                                    {{ props.item.created_info != null ? props.item.created_info.personal_information.lastname + ' , ' + props.item.created_info.personal_information.firstname : 'No Data' }}
                                    </template>
                                    
                                    <template v-slot:item.approved_user_id="props">
                                    {{ props.item.approver_info != null ? props.item.approver_info.personal_information.lastname + ' , ' + props.item.approver_info.personal_information.firstname : 'No Data' }}
                                    </template>
                                    
                                    <template v-slot:item.action="props">
                                        <v-btn
                                            elevation="2"
                                            class="mx-2"
                                            dark
                                            small
                                            outlined
                                            color="orange"
                                            @click="UpdateAllLeave(props.item.id, props.item, 'updateall')"
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
                                            <v-icon extra small>
                                                mdi-close
                                            </v-icon>
                                            Cancel
                                        </v-btn>   
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
                                </v-data-table>
                                <v-pagination
                                            color="orange"
                                    v-model="page"
                                    :length="pageCount"
                                ></v-pagination>
                            </v-col>
                        </v-row>
                        <!-- Leave Data table -->
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>

        <!-- dialog edit confirmation -->
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
        <!-- dialog edit confirmation -->

        
        <!-- dialog save form -->
        <v-dialog
            v-model="fullscreendialog"
            fullscreen
            hide-overlay
            persistent :retain-focus="false"
            transition="dialog-bottom-transition"
            >
            <v-card>
                <v-toolbar
                dark
                color="primary"
                >
                <v-btn icon dark @click="CloseDialogFullScreen()">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>Leave Filing</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                    <v-btn
                    dark
                    text
                    @click="SaveLeave()" id="btn-next" class="btn btn-primary btn-sm p-2" style="font-size: 12px;">
                    Save
                    </v-btn>
                </v-toolbar-items>
                </v-toolbar>

                <v-col sm="12" md="6" offset-md="3"> 
                        
                    <v-menu
                    v-model="menu"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                            v-model="leave.start_date"
                            label="Start Date"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                            ></v-text-field>
                        </template>
                        <v-date-picker
                            v-model="leave.start_date"
                            @input="menu = false"
                        ></v-date-picker>
                    </v-menu>
                    

                    <v-menu
                    v-model="menu1"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                            v-model="leave.end_date"
                            label="End Date"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                            ></v-text-field>
                        </template>
                        <v-date-picker
                            v-model="leave.end_date"
                            @input="menu1 = false"
                        ></v-date-picker>
                    </v-menu>

                    <v-text-field
                        v-model="leave.days_count"
                        label="Days Count"
                        required
                        outlined
                    ></v-text-field>
                    

                    <v-combobox
                        outlined
                        label="Leave Type"
                        :items="leavetypecombobox"
                        v-model="leave.leave_type_id"
                    ></v-combobox>
                    
                    <v-text-field
                        v-model="leave.actual_balance"
                        label="Actual Balance"
                        required
                        outlined
                    ></v-text-field>

                    <v-text-field
                        v-model="leave.current_balance"
                        label="Current Balance"
                        required
                        outlined
                    ></v-text-field>

                    <v-menu
                    ref="menu2"
                    v-model="menu2"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    :return-value.sync="leave.time_in"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="290px"
                    >
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                        v-model="leave.time_in"
                        label="Time In"
                        prepend-icon="mdi-clock-time-four-outline"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        ></v-text-field>
                    </template>
                    <v-time-picker
                        v-if="menu2"
                        v-model="leave.time_in"
                        full-width
                        @click:minute="$refs.menu2.save(leave.time_in)"
                    ></v-time-picker>
                    </v-menu>

                    <v-menu
                    ref="menu3"
                    v-model="menu3"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    :return-value.sync="leave.time_out"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="290px"
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                            v-model="leave.time_out"
                            label="Time Out"
                            prepend-icon="mdi-clock-time-four-outline"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                            ></v-text-field>
                        </template>
                        <v-time-picker
                            v-if="menu3"
                            v-model="leave.time_out"
                            full-width
                            @click:minute="$refs.menu3.save(leave.time_out)"
                        ></v-time-picker>
                    </v-menu>

                    <v-checkbox
                        v-model="leave.is_emergency"
                        label="Emergency"
                    ></v-checkbox>

                    <v-checkbox
                        v-model="leave.with_pay"
                        label="With Pay"
                    ></v-checkbox>
                    
                    <v-textarea
                    v-model="leave.reason"
                    solo
                    name="input-7-4"
                    label="Reason"
                    outlined
                    ></v-textarea>
                </v-col>
            </v-card>
        </v-dialog>
        

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
        <!-- dialog edit confirmation -->


        <!-- dialog save form -->
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
                @click="dialog = false, prodApp=='listemployee', ClearLeave()"
                >
                <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>Leave Filing</v-toolbar-title>
                <v-spacer></v-spacer>
            </v-toolbar>    
            <v-row v-if="prodApp=='dataemployee'">
                <v-col>
                    <v-form  ref="form" v-model="valid" lazy-validation>
                        <v-col sm="12" md="6" offset-md="3" class="mt-3 text-center"> 
                            <h4>Note: Here you can file leave.</h4>
                        </v-col>
                            <v-col sm="12" md="6" offset-md="3"> 
                                <v-row sm="12" class="pa-4">
                                    <v-menu
                                    ref="menu"
                                    v-model="menu"
                                    :close-on-content-click="false"
                                    :return-value.sync="date"
                                    transition="scale-transition"
                                    offset-y
                                    min-width="auto"
                                    >
                                        <template v-slot:activator="{ on, attrs }">
                                            <template v-if="daterange[0] < daterange[1] || daterange[1] == null">
                                                <v-text-field
                                                    v-model="daterange[0]"
                                                    label="Start Date"
                                                    prepend-icon="mdi-calendar"
                                                    readonly
                                                    color="orange"
                                                    v-bind="attrs"
                                                    v-on="on"
                                                    :rules="[v => !!v || 'Start Date is required']"
                                                ></v-text-field>
                                                <v-text-field
                                                    v-model="daterange[1]"
                                                    label="End Date"
                                                    prepend-icon="mdi-calendar"
                                                    readonly
                                                    color="orange"
                                                    v-bind="attrs"
                                                    v-on="on"
                                                    :rules="[v => !!v || 'End Date is required']"
                                                ></v-text-field>
                                            </template>
                                            <template v-else>
                                                <v-text-field
                                                    v-model="daterange[1]"
                                                    label="Start Date"
                                                    prepend-icon="mdi-calendar"
                                                    readonly
                                                    color="orange"
                                                    v-bind="attrs"
                                                    v-on="on"
                                                    :rules="[v => !!v || 'Start Date is required']"
                                                ></v-text-field>
                                                <v-text-field
                                                    v-model="daterange[0]"
                                                    label="End Date"
                                                    color="orange"
                                                    prepend-icon="mdi-calendar"
                                                    readonly
                                                    v-bind="attrs"
                                                    v-on="on"
                                                    :rules="[v => !!v || 'End Date is required']"
                                                ></v-text-field>
                                            </template>
                                        </template>
                                        <v-date-picker
                                        color="orange"
                                        v-model="daterange"
                                        range
                                        >
                                        <v-spacer></v-spacer>
                                        <v-btn
                                            text
                                            color="primary"
                                            @click="menu = false"
                                        >
                                            Cancel
                                        </v-btn>
                                        <v-btn
                                            text
                                            color="primary"
                                            @click="menu = false, computeDates(), computebalance()"
                                        >
                                            OK
                                        </v-btn>
                                        </v-date-picker>
                                    </v-menu>
                                </v-row>

                                <v-row>
                                    <v-col sm="6">
                                        <v-text-field
                                            v-model="leave.days_count"
                                            label="Days Count"
                                            required
                                            color="orange"
                                            outlined
                                            readonly
                                        ></v-text-field>
                                    </v-col>
                                    <v-col sm="6">
                                        <v-combobox
                                        outlined
                                        label="Leave Type"
                                        color="orange"
                                        :items="leavetypecombobox"
                                        v-model="leave.leave_type_id"
                                        :rules="[v => !!v || 'Leave type is required']"
                                        @change="fetchLeaveBalance()"
                                        ></v-combobox>
                                    </v-col>
                                </v-row>

                                <v-row>
                                    <v-col sm="6">
                                        <v-radio-group v-model="is_wholeday" row>
                                            <v-col sm="6" class="pa-0 ma-0">
                                                <v-radio value="Whole Day"
                                                    color="orange"
                                                    @click="computeDates() , computebalance()">
                                                    <template v-slot:label>
                                                    <div>Whole Day</div>
                                                    </template>
                                                </v-radio>
                                            </v-col>
                                            <v-col sm="6" class="pa-0 ma-0">
                                                <v-radio value="Half Day"
                                                    color="orange"
                                                    :disabled="halfdayto"
                                                    @click="computeDates() , computebalance()">
                                                    <template v-slot:label>
                                                    <div>Half Day</div>
                                                    </template>
                                                </v-radio>
                                            </v-col>
                                        </v-radio-group>
                                    </v-col>
                                    <v-col sm="6">
                                        <v-col sm="6" class="pa-0 ma-0">
                                            <v-checkbox
                                                v-model="leave.with_pay"
                                                label="With Pay"
                                                color="orange"
                                                :disabled="checkingleavetype"
                                                @click="withpayornot()"
                                            ></v-checkbox>
                                        </v-col>
                                    </v-col>
                                </v-row>
                        
                                <v-row>
                                    <v-col sm="6">
                                        <v-text-field
                                            v-model="leave.actual_balance"
                                            label="Actual Balance"
                                            required
                                            color="orange"
                                            outlined
                                            readonly
                                        ></v-text-field>
                                    </v-col>

                                    <v-col sm="6">
                                    <v-text-field
                                        v-model="leave.current_balance"
                                        label="Current Balance"
                                        color="orange"
                                        required
                                        outlined
                                        readonly
                                    ></v-text-field>
                                    </v-col>
                                </v-row>

                                <v-textarea
                                    v-model="leave.reason"
                                    solo
                                    name="input-7-4"
                                    label="Reason"
                                    >
                                </v-textarea>

                                <v-btn
                                    block
                                    outlined
                                    color="orange"
                                    class="white--text"
                                    @click="valid == false ? validationfalse() : changeStatusDialogSave(true)"
                                    :disabled = "leave.current_balance < 0"
                                >
                                SAVE
                                </v-btn>
                            </v-col>
                        </v-form>
                    </v-col>
                </v-row>
            </v-card>
        </v-dialog>
        <!-- dialog save form -->

        <!-- dialog edit form -->
        <v-dialog
                v-model="editfullscreendialog"
                fullscreen
                hide-overlay
                persistent
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
                        @click="editfullscreendialog = false, prodApp=='listemployee', ClearLeave()"
                        >
                        <v-icon>mdi-close</v-icon>
                        </v-btn>
                        <v-toolbar-title>Edit Leave Filing</v-toolbar-title>
                        <v-spacer></v-spacer>
                </v-toolbar>    
                <v-row>
                    <v-col>
                        <v-form  ref="form" v-model="valid" lazy-validation>
                            <v-col sm="12" md="6" offset-md="3" class="mt-3 text-center"> 
                                    <h4>Note: Here you can edit leave.</h4>
                                </v-col>
                                <v-col sm="12" md="6" offset-md="3"> 
                                        <v-row sm="12" class="pa-4">
                                                <v-menu
                                                ref="menuedit"
                                                v-model="menuedit"
                                                :close-on-content-click="false"
                                                :return-value.sync="date"
                                                transition="scale-transition"
                                                offset-y
                                                min-width="auto"
                                                >
                                                <template v-slot:activator="{ on, attrs }">
                                                    <template v-if="daterange[0] < daterange[1] || daterange[1] == null">
                                                        <v-text-field
                                                            v-model="daterange[0]"
                                                            label="Start Date"
                                                            prepend-icon="mdi-calendar"
                                                            readonly
                                                            color="orange"
                                                            v-bind="attrs"
                                                            v-on="on"
                                                            :rules="[v => !!v || 'Start Date is required']"
                                                        ></v-text-field>
                                                        <v-text-field
                                                            v-model="daterange[1]"
                                                            label="End Date"
                                                            prepend-icon="mdi-calendar"
                                                            readonly
                                                            color="orange"
                                                            v-bind="attrs"
                                                            v-on="on"
                                                            :rules="[v => !!v || 'End Date is required']"
                                                        ></v-text-field>
                                                    </template>
                                                    <template v-else>
                                                        <v-text-field
                                                            v-model="daterange[1]"
                                                            label="Start Date"
                                                            prepend-icon="mdi-calendar"
                                                            readonly
                                                            color="orange"
                                                            v-bind="attrs"
                                                            v-on="on"
                                                            :rules="[v => !!v || 'Start Date is required']"
                                                        ></v-text-field>
                                                        <v-text-field
                                                            v-model="daterange[0]"
                                                            label="End Date"
                                                            color="orange"
                                                            prepend-icon="mdi-calendar"
                                                            readonly
                                                            v-bind="attrs"
                                                            v-on="on"
                                                            :rules="[v => !!v || 'End Date is required']"
                                                        ></v-text-field>
                                                    </template>
                                                </template>
                                                <v-date-picker
                                                color="orange"
                                                v-model="daterange"
                                                range
                                                >
                                                <v-spacer></v-spacer>
                                                <v-btn
                                                    text
                                                    color="primary"
                                                    @click="menuedit = false"
                                                >
                                                    Cancel
                                                </v-btn>
                                                <v-btn
                                                    text
                                                    color="primary"
                                                    @click="menuedit = false, computeDates(), computebalance()"
                                                >
                                                    OK
                                                </v-btn>
                                                </v-date-picker>
                                            </v-menu>
                                        </v-row>

                                    <v-row>
                                        <v-col sm="6">
                                            <v-radio-group v-model="is_wholeday" row>
                                                <v-col sm="6" class="pa-0 ma-0">
                                                    <v-radio value="Whole Day"
                                                        color="orange"
                                                        @click="computeDates() , computebalance()">
                                                        <template v-slot:label>
                                                        <div>Whole Day</div>
                                                        </template>
                                                    </v-radio>
                                                </v-col>
                                                <v-col sm="6" class="pa-0 ma-0">
                                                    <v-radio value="Half Day"
                                                        color="orange"
                                                        :disabled="halfdayto"
                                                        @click="computeDates() , computebalance()">
                                                        <template v-slot:label>
                                                        <div>Half Day</div>
                                                        </template>
                                                    </v-radio>
                                                </v-col>
                                            </v-radio-group>
                                        </v-col>
                                        <v-col sm="6">
                                            <v-col sm="6" class="pa-0 ma-0">
                                                <v-checkbox
                                                    v-model="leave.with_pay"
                                                    label="With Pay"
                                                    color="orange"
                                                    :disabled="checkingleavetype"
                                                    @click="withpayornot()"
                                                ></v-checkbox>
                                            </v-col>
                                        </v-col>
                                    </v-row>

                                    <v-row>
                                        <v-col sm="6">
                                            <v-text-field
                                                v-model="leave.days_count"
                                                label="Days Count"
                                                required
                                                color="orange"
                                                outlined
                                                readonly
                                            ></v-text-field>
                                        </v-col>
                                        <v-col sm="6">
                                            <v-combobox
                                            outlined
                                            label="Leave Type"
                                            color="orange"
                                            :items="leavetypecombobox"
                                            v-model="leave.leave_type_id"
                                            :rules="[v => !!v || 'Leave type is required']"
                                            @change="fetchLeaveBalance()"
                                            ></v-combobox>
                                        </v-col>
                                    </v-row>
                            
                                <v-row >
                                    <v-col sm="6">
                                        <v-text-field
                                            v-model="leave.actual_balance"
                                            label="Actual Balance"
                                            required
                                            color="orange"
                                            outlined
                                            readonly
                                        ></v-text-field>
                                    </v-col>

                                    <v-col sm="6">
                                    <v-text-field
                                        v-model="leave.current_balance"
                                        label="Current Balance"
                                        color="orange"
                                        required
                                        outlined
                                        readonly
                                    ></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-textarea
                                v-model="leave.reason"
                                solo
                                name="input-7-4"
                                label="Reason"
                                ></v-textarea>
                                <v-btn
                                    block
                                    outlined
                                    color="orange"
                                    class="white--text"
                                    @click="valid == false ? validationfalse() : changeStatusDialogEdit(true)"
                                    :disabled = "leave.current_balance < 0"
                                >
                                Update
                                </v-btn>
                            </v-col>
                        </v-form>
                    </v-col>
                </v-row>
            </v-card>
        </v-dialog>
        <!-- dialog edit form -->

        <!-- dialog edit confirmation -->
        <v-row justify="center">
            <v-dialog
            v-model="editconfirmation"
            persistent :retain-focus="false"
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

        <!-- dialog error -->
        <div class="text-center">
            <v-dialog
            persistent :retain-focus="false"
            v-model="errordialog"
            width="500"
            >
                <v-card>
                    <v-card-title class="text-h8 lighten-2">
                    System Message
                    </v-card-title>
            
                    <v-card-text class="text-h9 lighten-2">
                    {{this.errormessage.message}}
                    </v-card-text>
            
                    <v-divider></v-divider>
            
                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="primary"
                        text
                        @click="errordialog = false"
                    >
                        Ok
                    </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </div>
        <!-- dialog error -->

        <!-- dialog update / cancel remarks -->
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
        <!-- dialog update / cancel remarks -->

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
                            @click="SaveLeave()"
                            >
                            Confirm
                        </v-btn>
                        </center>
                        <br>
                </v-card>
            </v-dialog>
        </v-row>
        <!-- dialog save confirmation -->

        <!-- dialog cancel confirmation -->
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
        <!-- dialog cancel confirmation -->
    </v-container>
</template>

<script>
    import leavetypeservices from '../services/leavetypeservices';
    import leaveservice from '../services/leaveservice';
    import leavebalanceservices from '../services/leavebalanceservices';

  export default {
    name: 'Leave',
    created(){
        this.editfullscreendialog = false,
        this.prodApp = "listemployee";
        this.$store.state.header = false;
        this.$store.state.footer = false;
        this.$store.state.snackbar.color = 'orange';
        this.$store.state.filingmodule = "Leave";
        this.FetchAllLeaveViaUser(this.$store.getters.getUserID);
        this.FetchAllLeaveType();
        this.headers = Object.values(this.headersMap);
        this.selectedHeaders = this.headers;
    },
    mounted(){
        this.$store.state.title = "File Leave";
    },
    computed: {
      //Done to get the ordered headers
      showHeaders () {
        return this.headers.filter(s => this.selectedHeaders.includes(s));
      }
    },
    data: () => ({
        sortBy: 'start_date',
        sortDesc: true,
        disableme: true,
        menusss: false,
        menucolumn: false,
        cancelconfirmation: false,
        page: 1,
        pageCount: 0,
        filingmodule: '',
        itemmodule: ['Overtime', 'Leave', 'Official Business', 'Undertime'],
        is_wholeday: 'Whole Day',
        is_wholedaynumber : '',
        halfdayto: false,
        valid: false,
        saveconfirmation: false,
        daterange:[],
        date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        dialog: false,
        editable: false,
        fullscreendialog: false,
        errordialog: false,
        updateremarksdialog: false,
        leave: {
            start_date: '',
            end_date: '',
            days_count: '',
            leave_type_id: '',
            actual_balance: '',
            current_balance: '',
            time_in: '',
            time_out: '',
            is_emergency: '',
            reason: '',
            approved_user_id: '',
            approval_at: '',
            status: '',
            with_pay: '',
            user_id: '',
        },
        search: '',
        leavedata: [],
        leavetypedata: [],
        leavetypecombobox: [],
        editconfirmation: false,
        errormessage:{
            message:''
        },
        headers:[],
        selectedHeaders: [],
        headersMap: [
        { text: 'Start Date', sortable: true, value: 'start_date',width: '110px' },
        { text: 'End Date', sortable: false, value: 'end_date' ,width: '105px'},
        { text: 'Days Count', sortable: false, value: 'days_count' },
        { text: 'Leave Type', sortable: false, value: 'leave_type_id',width: '115px' },
        { text: 'Current Balance', sortable: false, value: 'current_balance' },
        { text: 'With Pay', sortable: false, value: 'with_pay' },
        { text: 'Whole Day', sortable: false, value: 'is_wholeday' },
        { text: 'Reason', sortable: false, value: 'reason' },
        { text: 'Status', sortable: false, value: 'status' },
        { text: 'Action', sortable: false, value: 'action' ,width: '235px'}
        ],
        menu: false,
        menu1:false,
        menuedit: false,
        timein:null,
        menu2:false,
        timeout:null,
        menu3:false,
        modal2: false,
        modal3: false,
        datestart: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        date1: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        prodApp: "dataemployee",
        updateremarksito: '',
        leaveampm:{
            ampmtime_in: '',
            ampmtime_out: '',
        },
        leavewithpay: '',
        leaveemergency: '',
        leavebalancedata: [],
        checkingleavetype: true,
        leave_type_id_update : [],
      }
    ),
    methods: {
        FetchAllLeave(){ // fetch all leave
            let payload = {
                user_id: this.$store.getters.getUserID
            };
            leaveservice.FetchAllLeave(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    this.leavedata = response.data.data;
                }
            }).catch(error => console.log(error));
        },
        FetchAllLeaveViaUser(id){ // fetch all leave per user id
            let payload = {
                user_id: this.$store.getters.getUserID,
                id : id
            };
            leaveservice.FetchAllLeaveViaUser(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    this.leavedata = response.data.data;
                    console.log(this.leavedata);
                }
            }).catch(error => console.log(error));
        },
        UpdateLeave(id, field, value, approval) // fetch leave info for update
        {
            console.log(id, field, value, approval);
            this.forUpdate = {
                id: id,
                field: field,
                value: value,
                approval: approval
            }
            this.editconfirmation = true
        },
        UpdateRemarks(id, field, value, approval) // fetch leave info remarks for update
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

        confirmUpdate(){ // edit leave 
            if(this.forAllUpdate['approval'] == 'updateall'){ // for update leave
                if(this.daterange[0] < this.daterange[1]){
                    this.leave.start_date = this.daterange[0]
                    this.leave.end_date = this.daterange[1]
                }else{
                    this.leave.start_date = this.daterange[1]
                    this.leave.end_date = this.daterange[0]
                }

                let payload = {
                id: this.forAllUpdate.id,
                parent_user_id: this.$store.getters.getParentID,
                user_id: this.$store.getters.getUserID,
                start_date: this.leave.start_date,
                end_date: this.leave.end_date,
                days_count: this.leave.days_count,
                leave_type_id: this.leave.leave_type_id == this.leave_type_id_update.text ? this.leave_type_id_update.value : this.leave.leave_type_id.value,
                actual_balance: this.leave.actual_balance,
                current_balance: this.leave.current_balance,
                is_emergency: this.leave.is_emergency == true || this.leave.is_emergency == 1 ? 1 : 0,
                with_pay: this.leave.with_pay == true || this.leave.with_pay == 1 ? 1 : 0,
                is_wholeday: this.leave.is_wholeday == true || this.leave.is_wholeday == 1 ? 1 : 0,
                status: this.leave.status,
                reason: this.leave.reason
                }
                console.log(payload)
                leaveservice.UpdateLeave(payload, this.$store.getters.getAccessToken).then(response => {
                    if(response.data.success){
                        this.$store.state.snackbar.message = 'Leave has been updated.';
                        this.$store.state.snackbar.show = true;
                        this.ClearLeave();
                        this.editfullscreendialog = false
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
            else if(this.forAllUpdate['approval'] == 'cancel'){ // for cancel leave
                console.log('awit sayo');
                let payload = {
                    id: this.forUpdate['id'],
                    field: this.forUpdate['field'],
                    value: this.forUpdate['value'],
                    remarks: this.updateremarksito
                }
                leaveservice.UpdateRemarks(payload, this.$store.getters.getAccessToken).catch(error =>{
                    this.errorDAW = error.response.data.message
                    this.$store.state.snackbar.colors = 'xred';
                    this.$store.state.snackbar.icon = "mdi-alert-outline";               
                    this.$store.state.snackbar.message = error.response.data.message;
                    this.$store.state.snackbar.show = true;
                });
                this.$store.state.snackbar.colors = 'xgreen';
                this.$store.state.snackbar.icon = "mdi-check-circle-outline";                 
                this.cancelconfirmation = false
                this.updateremarksdialog = false
                this.updateremarksito = ''
                this.$store.state.snackbar.message = 'Leave has been cancelled.';
            }else{
                 let payload = {
                    id: this.forUpdate['id'],
                    field: this.forUpdate['field'],
                    value: this.forUpdate['value'],
                    approved_user_id: this.$store.getters.getUserID
                    
                }
                leaveservice.UpdateApproveDisapprove(payload, this.$store.getters.getAccessToken).catch(error =>{
                    this.errorDAW = error.response.data.message
                    this.$store.state.snackbar.message = error.response.data.message;
                    this.$store.state.snackbar.show = true;
                    this.$store.state.snackbar.colors = 'xred';
                      this.$store.state.snackbar.icon = "mdi-alert-outline";               
                });
                this.$store.state.snackbar.colors = 'xgreen';
                this.$store.state.snackbar.icon = "mdi-check-circle-outline";   
                this.$store.state.snackbar.message = 'Leave has been updated.';
            }
        
            this.$store.state.snackbar.show = true;
            this.FetchAllLeaveViaUser(this.$store.getters.getUserID);
            this.editconfirmation = false
        },
        changeStatusDialogEdit(status){
            this.editconfirmation = status;
            this.FetchAllLeaveViaUser(this.$store.getters.getUserID);
        },
        changeStatusDialogRemarks(status){
            this.updateremarksdialog = status;
            this.updateremarksito = '';
            this.FetchAllLeaveViaUser(this.$store.getters.getUserID);
        },
        NewLeave(){
            this.leave.start_date = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)
            this.leave.is_emergency = false
            this.leave.with_pay = false

            this.$store.state.snackbar.message = 'Leave has been created.';
            this.$store.state.snackbar.show = true;
        },
        CloseDialogFullScreen(){
            this.fullscreendialog = false
            this.ClearLeave();
        },
        FetchAllLeaveType(){ // fetch all leave type combo box
            let payload = {
                parent_id: this.$store.getters.getParentID
            };
            leavetypeservices.FetchAllLeaveType(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    this.leavetypedata = response.data.data;
                    response.data.data.forEach((value) => {
                        this.leavetypecombobox.push({
                            text: value.name,
                            value: value.id
                        });
                    });
                }
            }).catch(error => console.log(error));
        },
        SaveLeave(){ // save leave
            this.validationfalse()

            let val = this.$refs.form.validate();
            this.saveconfirmation = false;

            if(val){
                
                this.is_wholeday == 'Whole Day'? this.is_wholedaynumber=1 : this.is_wholedaynumber=0 
                
                if(this.daterange[0] < this.daterange[1]){
                    this.leave.start_date = this.daterange[0]
                    this.leave.end_date = this.daterange[1]
                }else{
                    this.leave.start_date = this.daterange[1]
                    this.leave.end_date = this.daterange[0]
                }
                this.leave.status = "1",
                this.leave.user_id = this.$store.getters.getUserID
                if(this.leave.is_emergency){
                    this.leaveemergency = "1"
                }else{
                    this.leaveemergency = "0"
                }
                if(this.leave.with_pay){
                    this.leavewithpay = "1"
                }
                else{
                    this.leavewithpay = "0"
                }
                let payload = {
                    start_date: this.leave.start_date,
                    end_date: this.leave.end_date,
                    days_count: this.leave.days_count,
                    leave_type_id: this.leave.leave_type_id.value,
                    actual_balance: this.leave.actual_balance,
                    current_balance: this.leave.current_balance,
                    time_in: this.leave.time_in,
                    time_out: this.leave.time_out,
                    is_emergency: this.leaveemergency,
                    reason: this.leave.reason,
                    approved_user_id: '0',
                    approval_at: '',
                    status: this.leave.status,
                    with_pay: this.leavewithpay,
                    user_id: this.$store.getters.getUserID,
                    parent_user_id: this.$store.getters.getParentID,
                    is_wholeday : this.is_wholedaynumber,
                };
                console.log(payload);
                leaveservice.SaveLeave(payload, this.$store.getters.getAccessToken).then(response => {
                    if(response.data.success){
                        this.fullscreendialog = false;
                        this.$store.state.snackbar.message = 'Leave has been created.';
                        this.$store.state.snackbar.show = true;

                        this.ClearLeave();
                        this.FetchAllLeaveViaUser(this.$store.getters.getUserID);
                        this.$refs.form.resetValidation();
                        this.$store.state.snackbar.colors = 'xgreen';
                        this.$store.state.snackbar.icon = "mdi-check-circle-outline";    
                    }
                }).catch(error =>{ 
                    this.$store.state.snackbar.colors = 'xred';
                    this.$store.state.snackbar.icon = "mdi-alert-outline";               
                    this.$store.state.snackbar.message = error.response.data.message;
                    this.$store.state.snackbar.show = true;
                });
                this.changeStatusDialogSave(false);
            }
        },
        ClearLeave(){
            this.leave.start_date = ''
            this.leave.end_date = ''
            this.leave.days_count = ''
            this.leave.leave_type_id = ''
            this.leave.actual_balance = ''
            this.leave.current_balance = ''
            this.leave.time_in = ''
            this.leave.time_out = ''
            this.leave.reason = ''
            this.leave.approved_user_id = ''
            this.leave.approval_at = ''
            this.leave.user_id = ''
            this.daterange=[]
            this.leave.is_emergency = false
            this.leave.with_pay = false
            this.leaveampm.ampmtime_in = ''
            this.leaveampm.ampmtime_out = ''
            this.leavewithpay = '',
            this.leaveemergency = '',
            this.is_wholeday = 'Whole Day',
            this.dialog = false,
            this.updateremarksito = ''
        },
        alertdata(){ // for tabs 
            this.prodApp = "dataemployee"
            this.dialog = true
        },
        alertlist(){ // for tabs 
            this.prodApp = "listemployee"
        },
        UpdateCancelLeave(id, field, value, approval)
        {
            this.forUpdate = {
                id: id,
                field: field,
                value: value,
                approval: approval
            }
            this.editconfirmation = true
        },
        computeDates(){ // compute date for leave creadits and days count
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
                if(this.daterange[0] && this.daterange[1])
                {
                    var date1 = new Date(StartDate[0],(StartDate[1]-1),StartDate[2],0,0,0,0);
                    var date2 = new Date(EndDate[0],(EndDate[1]-1),EndDate[2],0,0,0,0);

                    var Difference_In_Time = date2.getTime() - date1.getTime();
                    
                    var days = 0;
                    var hrs = 0;
                    var mins = 0;

                    days = Math.floor(Difference_In_Time / 86400000);
                    hrs = Math.floor((Difference_In_Time % 86400000) / 3600000);
                    mins = Math.round(((Difference_In_Time % 86400000) % 3600000)/60000);

                    console.log(days+" Day(s) and "+ hrs +" Hour(s) and "+ mins + " Minute(s)")
                    days > 0 ? this.halfdayto = true  : this.halfdayto = false
                    
                    if(this.is_wholeday == 'Half Day' && days==0){
                        this.leave.days_count = 0.5
                    }else{
                        this.leave.days_count = days + 1
                        this.is_wholeday = 'Whole Day'
                    }
                    this.computebalance();
                }
            }
        },
        AMPMTO(field){ // convertion of military time to AM : PM format
            var datenow = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)
            if(field == 'time_in')
            {
                var StartTime = this.leave.time_in.split(':');
                var date1 = new Date(datenow[0],(datenow[1]-1),datenow[2],StartTime[0],StartTime[1],0,0);
                this.leaveampm.ampmtime_in = date1.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
            }else
            {
                var EndTime = this.leave.time_out.split(':');
                var date2 = new Date(datenow[0],(datenow[1]-1),datenow[2],EndTime[0],EndTime[1],0,0);
                this.leaveampm.ampmtime_out = date2.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
            }
        },
        changeStatusDialogSave(status){
            this.saveconfirmation = status;
        },
        validationfalse(){
            this.$refs.form.validate()
        },
        fetchLeaveBalance(){ // fetch leave balance of user
            let payload = {
                user_id: this.$store.getters.getUserID,
                parent_user_id: this.$store.getters.getParentID,
                leave_type_id: this.leave.leave_type_id.value
            };
            leavebalanceservices.fetchLeaveBalance(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    this.leave.actual_balance = response.data.data.balance
                  
                    this.leave.current_balance = this.leave.actual_balance - this.leave.days_count

                    if(this.leave.current_balance < 0){

                        this.checkingleavetype = true
                        this.leave.current_balance = 0
                        this.leave.with_pay = false
                    }else{
                        this.checkingleavetype = false

                        this.leave.with_pay = true
                    }
                }
            }).catch(error => console.log(error),this.leave.actual_balance = 0, this.leave.current_balance = 0,  this.leave.with_pay = false);
        },
        withpayornot(){ // condition for with pay or not
            if(this.leave.with_pay == true){
                this.leave.current_balance = this.leave.actual_balance - this.leave.days_count
                if(this.leave.current_balance < 0){
                    this.leave.with_pay = false
                }
            }else{
                this.leave.current_balance = this.leave.actual_balance
            }
        },
        computebalance(){ // computation for leave credits
            if(this.daterange[0] && this.daterange[1] && this.is_wholeday)
            {
                this.leave.current_balance = this.leave.actual_balance - this.leave.days_count
                if(this.leave.current_balance < 0){
                    this.leave.current_balance = 0
                    this.leave.with_pay = false
                }else{
                    this.leave.with_pay = true
                }
            }
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
        UpdateAllLeave(id, item, updateall){ // get info leave for update
            console.log(id, item, updateall)
            this.leave.start_date = item.start_date
            this.daterange[0] = item.start_date
            this.leave.end_date = item.end_date
            this.daterange[1] = item.end_date
            this.leave.is_wholeday = item.is_wholeday
            this.leave.days_count = item.days_count
            this.leave.leave_type_id = item.leave_type_info.name
            this.leave_type_id_update.text = item.leave_type_info.name
            this.leave_type_id_update.value = item.leave_type_id
            this.leave.actual_balance = item.actual_balance
            this.leave.current_balance = item.current_balance
            this.leave.is_emergency = item.is_emergency
            this.leave.with_pay = item.with_pay
            this.leave.reason = item.reason
            this.leave.status = item.status
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