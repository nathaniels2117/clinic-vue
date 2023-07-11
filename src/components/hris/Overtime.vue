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
                        <!-- data table overtime -->  
                        <v-row justify="center">
                            <v-col cols="12">
                                <v-data-table
                                :headers="showHeaders"
                                :search="search"
                                :items="overtimedata"
                                :page.sync="page"
                                @page-count="pageCount = $event"
                                must-sort
                                :sort-by.sync="sortBy"
                                :sort-desc.sync="sortDesc"
                                :footer-props="{
                                'items-per-page-options':[10],
                                'disable-items-per-page': true,
                                }">
                                    <template v-slot:item.is_following="props" align="center">
                                        <template v-if="props.item.status == '1'">
                                            <v-checkbox 
                                                v-model="props.item.is_following"
                                                color="orange"
                                                v-if="props.item.is_following == 1"
                                                @change="UpdateFieldOvertime(props.item.id, 'is_following', props.item.is_following, 'update')"
                                            ></v-checkbox>
                                            <v-checkbox
                                                v-model="props.item.is_following"
                                                color="orange"
                                                v-else
                                                @change="UpdateFieldOvertime(props.item.id, 'is_following', props.item.is_following, 'update')"
                                            ></v-checkbox>
                                        </template>
                                        <template v-else>
                                            <v-checkbox 
                                                v-model="props.item.is_following"
                                                color="orange"
                                                v-if="props.item.is_following == 1"
                                                readonly
                                            ></v-checkbox>
                                            <v-checkbox
                                                v-model="props.item.is_following"
                                                color="orange"
                                                v-else
                                                readonly
                                            ></v-checkbox>
                                        </template>
                                    </template>

                                    <template v-slot:item.start_time="props" v-show="date">
                                        {{ moment(props.item.start_time, 'hh:mm A').format('hh:mm A') }} 
                                    </template>

                                    <template v-slot:item.end_date="props">
                                        <v-edit-dialog
                                            :return-value.sync="props.item.end_date"
                                            @save="UpdateFieldOvertime(props.item.id, 'end_date', props.item.end_date, 'update')"
                                        >
                                            {{ props.item.end_date }}
                                            <template v-slot:input>
                                                <v-text-field
                                                    v-model="props.item.end_date"
                                                    label="Edit"
                                                    single-line
                                                    v-if="props.item.status == '1'"
                                                ></v-text-field>
                                            </template>
                                        </v-edit-dialog>
                                    </template>

                                    <template v-slot:item.end_time="props">
                                        {{ moment(props.item.end_time, 'hh:mm A').format('hh:mm A') }}
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
                                            @click="UpdateAllOvertime(props.item.id, props.item, 'updateall')"
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
                                            
                                </v-data-table>
                                <v-pagination
                                color="orange"
                                v-model="page"
                                :length="pageCount"
                                ></v-pagination>     
                            </v-col>
                        </v-row>
                        <!-- data table overtime -->  
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
                    @click="dialog = false, prodApp=='listemployee'"
                    >
                    <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-toolbar-title>File Overtime</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <v-row justify="center" v-if="prodApp=='dataemployee'">
                    <v-col cols="12">
                        <v-form  ref="form" v-model="valid" lazy-validation>
                            <v-col sm="12" md="6" offset-md="3" class="mt-3 text-center"> 
                            <h4>Note: Here you can file overtime.</h4>
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
                                        v-model="overtime.start_date"
                                        label="Date"
                                        persistent-hint
                                        prepend-icon="mdi-calendar"
                                        color="orange"
                                        v-bind="attrs"
                                        v-on="on"
                                        :rules="[v => !!v || 'Target Date is required']"
                                        readonly
                                        ></v-text-field>
                                    </template>
                                    <v-date-picker
                                        v-model="overtime.start_date"
                                        color="orange"
                                        @input="menutargetdate = false, computeDates()"
                                    ></v-date-picker>
                                </v-menu>

                                <v-row>
                                    <v-col>
                                        <v-text-field
                                        v-model="overtime.start_time"
                                        color="orange"
                                        pattern="^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$"
                                        type="time"
                                        label="Start Time"
                                        :rules="[v => !!v || 'Start Time is required']"
                                        @input="AMPMTO('start_time'), computeDates()"
                                        >
                                        </v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col>
                                        <v-text-field
                                        v-model="overtime.end_time"
                                        color="orange"
                                        pattern="^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$"
                                        type="time"
                                        label="End Time"
                                        :rules="[v => !!v || 'End Time is required']"
                                        @input="AMPMTO('end_time'), computeDates()">
                                        </v-text-field>
                                    </v-col>
                                </v-row>


                                <v-row>
                                    <v-col>
                                        <v-text-field
                                        v-model="overtime.total_hour"
                                        label="Hours Count"
                                        required
                                        outlined
                                        disabled
                                        readonly
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row>                                            
                                    <v-col>
                                        <v-combobox
                                        outlined
                                        label="Work Credit"
                                        color="orange"
                                        :items="workcreditcombobox"
                                        v-model="overtime.work_credit"
                                        :rules="[v => !!v || 'Work Credit is required']"
                                        ></v-combobox>
                                    </v-col>
                                </v-row>

                                <v-textarea
                                v-model="overtime.reason"
                                solo
                                name="input-7-4"
                                color="orange"
                                label="Reason"
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
                    @click="editfullscreendialog = false, prodApp=='listemployee'"
                    >
                    <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-toolbar-title>Edit Overtime</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <v-row justify="center">
                    <v-col cols="12">
                        <v-form  ref="form" v-model="valid" lazy-validation>
                            <v-col sm="12" md="6" offset-md="3" class="mt-3 text-center"> 
                            <h4>Note: Here you can edit overtime.</h4>
                        </v-col>
                            <v-col sm="12" md="6" offset-md="3">
                                
                                <v-menu
                                ref="menutargetdateedit"
                                v-model="menutargetdateedit"
                                :close-on-content-click="false"
                                transition="scale-transition"
                                offset-y
                                max-width="290px"
                                min-width="auto"
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field
                                        v-model="overtime.start_date"
                                        label="Date"
                                        persistent-hint
                                        prepend-icon="mdi-calendar"
                                        color="orange"
                                        v-bind="attrs"
                                        v-on="on"
                                        :rules="[v => !!v || 'Target Date is required']"
                                        readonly
                                        ></v-text-field>
                                    </template>
                                    <v-date-picker
                                        v-model="overtime.start_date"
                                        color="orange"
                                        @input="menutargetdateedit = false, computeDates()"
                                    ></v-date-picker>
                                </v-menu>

                                <v-row>
                                    <v-col>
                                        <v-text-field
                                        v-model="overtime.start_time"
                                        color="orange"
                                        pattern="^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$"
                                        type="time"
                                        label="Start Time"
                                        :rules="[v => !!v || 'Start Time is required']"
                                        @input="AMPMTO('start_time'), computeDates()"
                                        >
                                        </v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col>
                                        <v-text-field
                                        v-model="overtime.end_time"
                                        color="orange"
                                        pattern="^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$"
                                        type="time"
                                        label="End Time"
                                        :rules="[v => !!v || 'End Time is required']"
                                        @input="AMPMTO('end_time'), computeDates()">
                                        </v-text-field>
                                    </v-col>
                                </v-row>


                                <v-row>
                                    <v-col>
                                        <v-text-field
                                        v-model="overtime.total_hour"
                                        label="Hours Count"
                                        required
                                        outlined
                                        disabled
                                        readonly
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row>                                            
                                    <v-col>
                                        <v-combobox
                                        outlined
                                        label="Work Credit"
                                        color="orange"
                                        :items="workcreditcombobox"
                                        v-model="overtime.work_credit"
                                        :rules="[v => !!v || 'Work Credit is required']"
                                        ></v-combobox>
                                    </v-col>
                                </v-row>

                                <v-textarea
                                v-model="overtime.reason"
                                solo
                                name="input-7-4"
                                color="orange"
                                label="Reason"
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
                        @click="SaveOvertime()"
                        >
                        Confirm
                    </v-btn>
                    </center>
                    <br>                    
                </v-card>
            </v-dialog>
        </v-row>
        <!-- Dialog edit confirmation -->  

        <!-- Dialog Is following day confirmation -->  
        <v-row justify="center">
            <v-dialog
                persistent :retain-focus="false"
                v-model="negativehours"
                max-width="290"
            >
                <v-card>
                    <v-card-title class="text-h5">
                        Confirm
                    </v-card-title>
                    <v-card-text>Is this following day?</v-card-text>
                    <center>
                    <v-btn
                        elevation="2"
                        class="mx-2"
                        dark
                        outlined
                        small
                        color="red"
                        @click="changeStatusDialogNegative(false)"
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
                        @click="is_followingchecker()"
                        >
                        Confirm
                    </v-btn>
                    </center>
                    <br>  
                </v-card>
            </v-dialog>
        </v-row>
        <!-- Dialog Is following day confirmation -->  

        <!-- Dialog update / cancel remarks confirmation -->  
        <div class="text-center">
            <v-dialog
                v-model="updateremarksdialog"
                width="500"
                padding="0"
            >
                <v-card>
                    <v-card-title class="text-h8 lighten-2">
                        Remarks
                    </v-card-title>
                    <v-card-actions>
                        <v-textarea
                            solo
                            name="input-7-3"
                            outlined
                            padding="20"
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

        <!-- Dialog update hour form -->  
        <div class="text-center">
            <v-dialog
                v-model="updatehoursdialog"
                width="500"
                padding="0"
            >
                <v-card>
                    <v-card-title class="text-h8 lighten-2">
                        Update
                    </v-card-title>

                    <v-card-actions>
                        <v-text-field
                        v-model="overtime.start_time"
                        pattern="^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$"
                        type="time"
                        label="Start Time"
                        :rules="[v => !!v || 'Start Time is required']"
                        @input="AMPMTO('start_time'), computeDates()"
                        >
                        </v-text-field>
                    </v-card-actions>

                    <v-card-actions>
                        <v-text-field
                        v-model="overtime.end_time"
                        pattern="^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$"
                        type="time"
                        label="End Time"
                        :rules="[v => !!v || 'End Time is required']"
                        @input="AMPMTO('end_time'), computeDates()">
                        </v-text-field>
                    </v-card-actions>

                    <v-card-actions>
                        <v-text-field
                        v-model="overtime.total_hour"
                        label="Hours Count"
                        required
                        outlined
                        readonly
                        ></v-text-field>
                    </v-card-actions>

                    <v-card-actions>
                        <v-btn
                        block
                        outlined
                        color="orange"
                        class="white--text"
                        @click="changeStatusDialogUpdateHours(true)"
                        >
                        Update
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </div>
        <!-- Dialog update hour form -->  

        <!-- Dialog update hour confirmation -->  
        <v-row justify="center">
            <v-dialog
                persistent :retain-focus="false"
                v-model="updatehoursconfirmation"
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
                        @click="changeStatusDialogUpdateHoursConfirm(false)"
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
                        @click="confirmUpdateHours()"
                        >
                        Confirm
                    </v-btn>
                    </center>
                    <br>                          
                </v-card>
            </v-dialog>
        </v-row>
        <!-- Dialog update hour confirmation -->  

        <!-- Dialog system message -->  
        <v-row justify="center">
            <v-dialog
                persistent :retain-focus="false"
                v-model="systemmessagedialog"
                max-width="290"
            >
                <v-card>
                    <v-card-title class="text-h6">
                        System Message
                    </v-card-title>
                    <v-card-text>{{systemmessagetext}}</v-card-text>
                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="orange"
                        text
                        class="white--text"
                        @click="systemmessagedialog = false"
                    >
                        Close
                    </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>
        <!-- Dialog system message -->  

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
import overtimeservices from '../services/overtimeservices';

export default {
        name: 'Overtime',
        data: () => ({
        sortBy: 'start_date',
        sortDesc: true,
        menusss: false,
        menucolumn: false,
        menutargetdateedit: false,
        editfullscreendialog: false,
        cancelconfirmation: false,
        page: 1,
        pageCount: 0,
        filingmodule: '',
        itemmodule: ['Overtime', 'Leave', 'Official Business', 'Undertime'],
            search : '',
            systemmessagedialog : false,
            systemmessagetext : '',
            updateid : '', 
            updatehoursconfirmation : false,
            updatehoursdialog: false,
            valid: false,
            loading: false,
            dialog: false,
            prodApp: "listemployee",
            editconfirmation: false,
            saveconfirmation: false,
            updateremarksdialog: false,
            updateremarksito: '',
            overtimedata: [],
            workcreditcombobox : ['For Payroll' , 'For Offset', 'For Offset Leave'],
            menudaterange: false,
            daterange: [],
            menustarttime: false,
            menuendtime: false,
            menutargetdate: false,
            headers:[],
        selectedHeaders: [],
        headersMap: [
            { text: 'Start Date', value: 'start_date',width: '110px'},   
            { text: 'Start Time', sortable:false, value: 'start_time' ,width: '100px'}, 
            { text: 'End Time',sortable:false, value: 'end_time' ,width: '100px'}, 
            { text: 'Hours Count',sortable:false, value: 'total_hour'},
            { text: 'Work Credit',sortable:false, value: 'work_credit',width: '100px' },
            { text: 'Reason',sortable:false, value: 'reason' },
            { text: 'Status',sortable:false, value: 'status' },
            { text: 'Action',sortable:false, value: 'action',width: '235px' }
            ],
            overtime: {
                user_id: '',
                start_date: '',
                start_time: '',
                end_time: '',
                total_hour: '',
                work_credit: '',
                reason: '',
                approved_user_id: '',
                approval_at: '',
                status: '',
                remarks: '',
                approver_remarks: '',
                is_following: '',
            },
            overtimeampm:{
                ampmstart_time: '',
                ampmend_time: '',
            },
            negativehours : false,
        }),
        created(){
            this.$store.state.header = false;
            this.$store.state.footer = false;
            this.$store.state.filingmodule = "Overtime";
            this.$store.state.snackbar.color = 'orange';
            this.FetchAllOvertimeViaUser(this.$store.getters.getUserID);
            this.headers = Object.values(this.headersMap);
            this.selectedHeaders = this.headers;
        },
        mounted(){
            this.$store.state.title = "File Overtime"
        },
        computed: {
        //Done to get the ordered headers
        showHeaders () {
        return this.headers.filter(s => this.selectedHeaders.includes(s));
        }
    },
    methods: {
        FetchAllOvertimeViaUser(id){ // fetch overtime via user
            let payload = {
                user_id: this.$store.getters.getParentID,
                id : id
            };
            overtimeservices.FetchAllOvertimeViaUser(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    this.overtimedata = response.data.data;
                    console.log(this.overtimedata);
                }
            }).catch(error => console.log(error));
        },
        getDate: function () { // get system date
            return new Date().toLocaleDateString();
        },
        getTime: function () { // get system time
            return new Date().toLocaleTimeString();
        },
        UpdateFieldOvertime(id, field, value, approval) // fetch overtime info for update
        {
            this.forUpdate = {
                id: id,
                field: field,
                value: value,
                approval: approval
            }
            this.editconfirmation = true
        },
        UpdateRemarks(id, field, value, approval) // fetch overtime remarks info for update
        {
            this.forAllUpdate = {
                approval : approval
            }
            this.forUpdate = {
                id: id,
                field: field,
                value: value,
                approval: approval
            }
            this.updateremarksdialog = true
        },
        changeStatusDialogEdit(status){
            this.editconfirmation = status;
        },
        changeStatusDialogRemarks(status){
            this.updateremarksito='';
            this.updateremarksdialog = status;
        },
        confirmUpdate(){ // update overtime
            console.log(this.forAllUpdate['approval']);
            if(this.forAllUpdate['approval'] == 'updateall'){ // for update overtime
                let payload = {
                id: this.forAllUpdate.id,
                parent_user_id: this.$store.getters.getParentID,
                user_id: this.$store.getters.getUserID,
                start_date: this.overtime.start_date,
                is_following: this.overtime.is_following,
                start_time: this.overtime.start_time,
                end_time: this.overtime.end_time,
                total_hour: this.overtime.total_hour,
                work_credit: this.overtime.work_credit,
                reason: this.overtime.reason,
                status: this.overtime.status
                }
                console.log(payload)
                overtimeservices.UpdateOvertime(payload, this.$store.getters.getAccessToken).then(response => {
                    if(response.data.success){
                        this.$store.state.snackbar.message = 'Overtime has been updated.';
                        this.$store.state.snackbar.show = true;
                        this.ClearOvertime();
                        this.editfullscreendialog = false
                        this.$refs.form.resetValidation();
                        this.$store.state.snackbar.colors = 'xgreen';
                        this.$store.state.snackbar.icon = "mdi-check-circle-outline";   
                    }
                }).catch(error =>{
                    typeof error.response.data.errors == 'undefined' ? this.$store.state.snackbar.message = error.response.data.message : this.$store.state.snackbar.message = error.response.data.errors.start_date[0]
                    this.$store.state.snackbar.show = true;
                    this.$store.state.snackbar.colors = 'xred';
                    this.$store.state.snackbar.icon = "mdi-alert-outline";                    
                });
            }
            else{ // for cancel overtime
                let payload = {
                    id: this.forUpdate['id'],
                    field: this.forUpdate['field'],
                    value: this.forUpdate['value'],
                    remarks: this.updateremarksito
                }
                overtimeservices.UpdateRemarks(payload, this.$store.getters.getAccessToken).catch(error =>{
                    this.errorDAW = error.response.data.message
                    this.$store.state.snackbar.message = error.response.data.message;
                    this.$store.state.snackbar.colors = 'xred';
                    this.$store.state.snackbar.icon = "mdi-alert-outline";                    
                });
                this.updateremarksdialog = false
                this.cancelconfirmation = false
                this.updateremarksito = ''
                this.$store.state.snackbar.message = 'Overtime has been cancelled.';
                this.$store.state.snackbar.colors = 'xgreen';
                this.$store.state.snackbar.icon = "mdi-check-circle-outline";      
                this.systemmessagetext = 'Overtime has been cancelled.';
            }
            this.updateremarksito='';
            this.$store.state.snackbar.show = true;
            this.FetchAllOvertimeViaUser(this.$store.getters.getUserID);
            this.editconfirmation = false
        },
        changeStatusDialogSave(status){
            this.saveconfirmation = status;
        },
        alertdata(){ // for tabs 
            this.prodApp = "dataemployee"
            this.dialog = true
        },
        alertlist(){ // for tabs 
            this.prodApp = "listemployee"
        },
        SaveOvertime(){ // save overtime
            let val = this.$refs.form.validate();

            if(val){
                let payload = {
                    start_date: this.overtime.start_date,
                    is_following : this.overtime.is_following,
                    start_time: this.overtime.start_time,
                    end_time: this.overtime.end_time,
                    total_hour: this.overtime.total_hour,
                    work_credit: this.overtime.work_credit,
                    reason: this.overtime.reason,
                    status: 1,
                    user_id: this.$store.getters.getUserID,
                    parent_user_id: this.$store.getters.getParentID
                };
                overtimeservices.SaveOvertime(payload, this.$store.getters.getAccessToken).then(response => {
                    if(response.data.success){
                        this.$store.state.snackbar.message = 'Overtime has been created.';
                        this.$store.state.snackbar.show = true;
                        this.FetchAllOvertimeViaUser(this.$store.getters.getUserID);
                        this.ClearOvertime();
                        this.$refs.form.resetValidation();
                        this.$store.state.snackbar.colors = 'xgreen';
                        this.$store.state.snackbar.icon = "mdi-check-circle-outline"; 
                    }
                }).catch(error =>{ 
                    this.$store.state.snackbar.message = error.response.data.message
                    this.$store.state.snackbar.show = true;
                    this.$store.state.snackbar.colors = 'xred';
                    this.$store.state.snackbar.icon = "mdi-alert-outline";        
                });
            }

            this.saveconfirmation = false;
        },
        computeDates(){ // compute overtime hours
            if(this.overtime.start_date != '' && this.overtime.start_time != '' && this.overtime.end_time != ''){

                var StartDate
                var StartTime = this.overtime.start_time.split(':');
                var EndTime = this.overtime.end_time.split(':');
                StartDate = this.overtime.start_date.split('-');
                var date1 = new Date(StartDate[0],(StartDate[1]-1),StartDate[2],StartTime[0],StartTime[1],0,0);
                var date2 = new Date(StartDate[0],(StartDate[1]-1),StartDate[2],EndTime[0],EndTime[1],0,0);
                
                if(date1 > date2){
                    this.overtime.is_following = 1
                    date2.setDate(date2.getDate() + 1);
                }
                else{
                    this.overtime.is_following = 0
                }
                
                var Difference_In_Time = date2.getTime() - date1.getTime();
                        
                var days = 0;
                var hrs = 0;
                var mins = 0;

                days = Math.floor(Difference_In_Time / 86400000);
                hrs = Math.floor((Difference_In_Time % 86400000) / 3600000);
                mins = Math.round(((Difference_In_Time % 86400000) % 3600000)/60000);

                console.log(days+" Day(s) and "+ hrs +" Hour(s) and "+ mins + " Minute(s)")
                if(hrs < 0){
                    this.negativehours = true;
                }else{
                    this.overtime.total_hour = hrs + ( days * 24 )
                }
            }

        },
        ClearOvertime(){
            this.daterange= []
            this.overtime.user_id= ''
            this.overtime.start_date= ''
            this.overtime.start_time= ''
            this.overtime.end_time= ''
            this.overtime.total_hour= ''
            this.overtime.work_credit= ''
            this.overtime.reason= ''
            this.overtime.approved_user_id= ''
            this.overtime.approval_at= ''
            this.overtime.status= ''
            this.overtime.remarks= ''
            this.overtime.approver_remarks= ''
            this.overtime.is_following = false
            this.overtimeampm.ampmstart_time=''
            this.overtimeampm.ampmend_time=''
            this.dialog = false
        },
        changeStatusDialogNegative(status){
            this.negativehours = status;
            this.overtime.start_time = '';
            this.overtime.end_time = '';
        },
        is_followingchecker(){
            this.negativehours = false;
            this.overtime.is_following = true;
            this.computeDates()
        },
        AMPMTO(field){ // convertion of military time to AM : PM format
            var datenow = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)
            if(field == 'start_time')
            {
                var StartTime = this.overtime.start_time.split(':');
                var date1 = new Date(datenow[0],(datenow[1]-1),datenow[2],StartTime[0],StartTime[1],0,0);
                this.overtimeampm.ampmstart_time = date1.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
            }else
            {
                var EndTime = this.overtime.end_time.split(':');
                var date2 = new Date(datenow[0],(datenow[1]-1),datenow[2],EndTime[0],EndTime[1],0,0);
                this.overtimeampm.ampmend_time = date2.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
            }
        },
        validationfalse(){
            this.$refs.form.validate()
        },
        computeDatesUpdate(id, start_date, start_time, end_time, total_hour, is_following){ // get info overtime for update
            this.updateid = id
            this.overtime.start_date = start_date
            this.overtime.is_following = is_following
            this.overtime.start_time = start_time
            this.overtime.end_time = end_time
            this.overtime.total_hour = total_hour
            this.updatehoursdialog = true
        },
        changeStatusDialogUpdateHours(status){
            this.forUpdateHours = {
                id : this.updateid,
                start_date : this.overtime.start_date,
                is_following : this.overtime.is_following,
                start_time : this.overtime.start_time,
                end_time : this.overtime.end_time,
                total_hour : this.overtime.total_hour
            }
            this.updatehoursconfirmation = status;
        },
        changeStatusDialogUpdateHoursConfirm(status){
            this.updatehoursconfirmation = status;
        },
        confirmUpdateHours(){ // update overtime hours
            console.log(this.forUpdateHours);
            let payload = {
                id: this.forUpdateHours['id'],
                start_date: this.forUpdateHours['start_date'],
                is_following: this.forUpdateHours['is_following'],
                start_time: this.forUpdateHours['start_time'],
                end_time: this.forUpdateHours['end_time'],
                total_hour: this.forUpdateHours['total_hour'],
            }
            overtimeservices.UpdateHoursOvertime(payload, this.$store.getters.getAccessToken).catch(error =>{
                this.$store.state.snackbar.message = error.response.data.message;
                this.$store.state.snackbar.colors = 'xred';
                this.$store.state.snackbar.icon = "mdi-alert-outline";        
            });
            this.$store.state.snackbar.colors = 'xgreen';
            this.$store.state.snackbar.icon = "mdi-check-circle-outline"; 
            this.$store.state.snackbar.message = 'Overtime has been updated.';
            this.$store.state.snackbar.show = true;
            this.ClearOvertime();
            this.FetchAllOvertimeViaUser(this.$store.getters.getUserID);
            this.updatehoursdialog = false
            this.updatehoursconfirmation = false
            this.systemmessagetext = 'Overtime has been updated.';
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
        UpdateAllOvertime(id, item, updateall){ // get info overtime for update
            console.log(id, item, updateall)
            this.overtime.start_date = item.start_date
            this.overtime.start_time = item.start_time
            this.overtime.end_time = item.end_time
            this.overtime.total_hour = item.total_hour
            this.overtime.work_credit = item.work_credit
            this.overtime.reason = item.reason
            this.overtime.status = item.status
            this.overtime.is_following = item.is_following
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