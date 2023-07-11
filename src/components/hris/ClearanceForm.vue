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
                                    @click="NewClearanceForm()" 
                                    v-if="$store.getters.valAccess(252)"
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
                                    @click="NewClearanceForm()" 
                                    v-if="$store.getters.valAccess(252)"
                                    >
                                        <v-icon>mdi-plus</v-icon>
                                    </v-btn>
                                </template>
                            </v-toolbar>
                        </template>
                        <!-- One liner filtering -->  
                        <br>
                        <!-- Data table clearance form -->  
                        <v-data-table
                            :headers="showHeaders"
                            :items="clearanceformdata"
                            :search="search"
                            :page.sync="page"
                            @page-count="pageCount = $event"
                            :footer-props="{
                            'items-per-page-options':[10],
                            'disable-items-per-page': true,
                            }"
                        >
                            
                            <template v-slot:item.process_by="props">
                                {{ props.item.processby_info != null ? props.item.processby_info.personal_information.lastname + ' , ' + props.item.processby_info.personal_information.firstname : 'No Data' }}
                            </template>

                            <template v-slot:item.action="props">
                                <template>
                                    <v-row v-if="props.item.status != 1">
                                        <v-btn
                                        elevation="2"
                                            class="mx-2"
                                            dark
                                            outlined
                                            small
                                            color="orange"
                                            @click="UpdateAllClearanceForm(props.item.id, props.item)"
                                            v-if="$store.getters.valAccess(253)"
                                        >
                                        <v-icon
                                                small
                                                @click="UpdateAllClearanceForm(props.item.id, props.item)"
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
                                            color="green"
                                            @click="UpdateAllSignClearanceForm(props.item.id, props.item)"
                                            v-if="$store.getters.valAccess(254)"
                                        >
                                        <v-icon
                                                small
                                                @click="UpdateAllSignClearanceForm(props.item.id, props.item)"
                                            >
                                                mdi-draw-pen
                                            </v-icon>
                                            Sign
                                        </v-btn>
                                    </v-row>
                                    <v-row v-else>
                                        <v-btn
                                            elevation="2"
                                            class="mx-2"
                                            dark
                                            outlined
                                            small
                                            color="orange"
                                            @click="PrintPreviewClearanceForm(props.item.id, props.item.user_id)"
                                            v-if="$store.getters.valAccess(256)"
                                        >
                                        <v-icon
                                                small
                                                @click="PrintPreviewClearanceForm(props.item.id, props.item.user_id)"
                                            >
                                                mdi-eye-outline
                                            </v-icon>
                                            Preview
                                        </v-btn>
                                        <v-btn
                                            elevation="2"
                                            class="mx-2"
                                            dark
                                            outlined
                                            small
                                            color="orange"
                                            @click="PrintClearanceForm(props.item.id, props.item.user_id)"
                                            v-if="$store.getters.valAccess(255)"
                                        >
                                        <v-icon
                                                small
                                                @click="PrintClearanceForm(props.item.id, props.item.user_id)"
                                            >
                                                mdi-printer
                                            </v-icon>
                                            Print
                                        </v-btn>
                                    </v-row>
                                </template>  
                            </template>
                        </v-data-table>
                        <!-- Data table clearance form -->  
                        <v-pagination
                        color="orange"
                        v-model="page"
                        :length="pageCount"
                        ></v-pagination>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>

        <!-- Dialog save form-->
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
                    <v-toolbar-title>Add Clearance Form</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                    </v-toolbar-items>
                </v-toolbar>
                
                <v-col sm="12" md="6" offset-md="3" class="mt-3 text-center"> 
                    <h4>Note: Here you can create clearance form</h4>
                </v-col>

                <v-col sm="12" md="6" offset-md="3">
                    <v-combobox
                        outlined
                        color="orange"
                        v-model="user_info"
                        label="Name"
                        :clearable="this.user_info != ''"
                        @change="clickuser()"
                        :items="listemployeedata"
                        :rules="[v => !!v || 'Name is required']"
                    ></v-combobox>
                </v-col>

                <v-col sm="12" md="6" offset-md="3">
                    <v-menu
                    color="orange"
                        ref="menu"
                        v-model="menu"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        max-width="290px"
                        min-width="auto"
                    >      
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                            color="orange"
                                v-model="clearance_form.date_filed"
                                label="Date Filed"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                                outlined
                                :rules="[v => !!v || 'Date Filed is required']"
                            ></v-text-field>
                        </template>
                        <v-date-picker
                        color="orange"
                            v-model="clearance_form.date_filed"
                            @input="menu = false"
                            :max="maxdate"
                        ></v-date-picker>
                    </v-menu>
                </v-col>

                <v-col sm="12" md="6" offset-md="3">
                    <v-menu
                    color="orange"
                        ref="menuldayday"
                        v-model="menuldayday"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        max-width="290px"
                        min-width="auto"
                    >      
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                            color="orange"
                                v-model="clearance_form.last_day_employment"
                                label="Last Day of Employement"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                                outlined
                                :rules="[v => !!v || 'Last Day of Employement is required']"
                            ></v-text-field>
                        </template>
                        <v-date-picker
                        color="orange"
                            v-model="clearance_form.last_day_employment"
                            @input="menuldayday = false"
                        ></v-date-picker>
                    </v-menu>
                </v-col>

                <v-col sm="12" md="6" offset-md="3">
                    <v-combobox
                    outlined
                    label="Reason For Separation"
                    color="orange"
                    :items="reasoncombobox"
                    v-model="clearance_form.separation_reason"
                    @change="unhideother()"
                    :rules="[v => !!v || 'Reason For Separation is required']"
                    ></v-combobox>
                </v-col>

                <v-col sm="12" md="6" offset-md="3" v-if="clearance_form.separation_reason == 'Others'">
                    <v-text-field
                    outlined
                    label="Other Reason"
                    v-model="clearance_form.otherreason"
                    color="orange"
                    ></v-text-field>
                </v-col>

                <v-col sm="12" md="6" offset-md="3">
                    <v-combobox
                    outlined
                    label="Release of Last Pay Thru"
                    color="orange"
                    :items="last_pay_typecombobox"
                    v-model="clearance_form.last_pay_type"
                    @change="unhideaccount()"
                    :rules="[v => !!v || 'Release of Last Pay Thru']"
                    ></v-combobox>
                </v-col>

                <v-col sm="12" md="6" offset-md="3" v-if="clearance_form.last_pay_type == 'Thru Bank Account'">
                    <v-text-field
                    outlined
                    label="Bank"
                    color="orange"
                    v-model="clearance_form.bank"
                    ></v-text-field>
                </v-col>

                <v-col sm="12" md="6" offset-md="3" v-if="clearance_form.last_pay_type == 'Thru Bank Account'">
                    <v-text-field
                    outlined
                    label="Account Number"
                    color="orange"
                    v-model="clearance_form.account_number"
                    ></v-text-field>
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
        <!-- Dialog save form-->

        <!-- Dialog edit form-->
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
                    <v-toolbar-title>Edit Clearance Form</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                    </v-toolbar-items>
                </v-toolbar>
                
                <v-col sm="12" md="6" offset-md="3" class="mt-3 text-center"> 
                    <h4>Note: Here you can edit clearance form</h4>
                </v-col>

                <v-col sm="12" md="6" offset-md="3">
                    <v-combobox
                        outlined
                        color="orange"
                        v-model="user_info"
                        label="Name"
                        :clearable="this.user_info != ''"
                        @change="clickuser()"
                        :items="listemployeedata"
                        :rules="[v => !!v || 'Name is required']"
                    ></v-combobox>
                </v-col>

                <v-col sm="12" md="6" offset-md="3">
                    <v-menu
                    color="orange"
                        ref="menu"
                        v-model="menu"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        max-width="290px"
                        min-width="auto"
                    >      
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                            color="orange"
                                v-model="clearance_form.date_filed"
                                label="Date Filed"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                                outlined
                                :rules="[v => !!v || 'Date Filed is required']"
                            ></v-text-field>
                        </template>
                        <v-date-picker
                        color="orange"
                            v-model="clearance_form.date_filed"
                            @input="menu = false"
                            :max="maxdate"
                        ></v-date-picker>
                    </v-menu>
                </v-col>

                <v-col sm="12" md="6" offset-md="3">
                    <v-menu
                    color="orange"
                        ref="menulday"
                        v-model="menulday"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        max-width="290px"
                        min-width="auto"
                    >      
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                            color="orange"
                                v-model="clearance_form.last_day_employment"
                                label="Last Day of Employement"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                                outlined
                                :rules="[v => !!v || 'Last Day of Employement is required']"
                            ></v-text-field>
                        </template>
                        <v-date-picker
                        color="orange"
                            v-model="clearance_form.last_day_employment"
                            @input="menulday = false"
                        ></v-date-picker>
                    </v-menu>
                </v-col>

                <v-col sm="12" md="6" offset-md="3">
                    <v-combobox
                    outlined
                    label="Reason For Separation"
                    color="orange"
                    :items="reasoncombobox"
                    v-model="clearance_form.separation_reason"
                    @change="unhideother()"
                    :rules="[v => !!v || 'Reason For Separation is required']"
                    ></v-combobox>
                </v-col>

                <v-col sm="12" md="6" offset-md="3" v-if="clearance_form.separation_reason == 'Others'">
                    <v-text-field
                    outlined
                    label="Other Reason"
                    v-model="clearance_form.otherreason"
                    color="orange"
                    ></v-text-field>
                </v-col>

                <v-col sm="12" md="6" offset-md="3">
                    <v-combobox
                    outlined
                    label="Release of Last Pay Thru"
                    color="orange"
                    :items="last_pay_typecombobox"
                    v-model="clearance_form.last_pay_type"
                    @change="unhideaccount()"
                    :rules="[v => !!v || 'Release of Last Pay Thru']"
                    ></v-combobox>
                </v-col>

                <v-col sm="12" md="6" offset-md="3" v-if="clearance_form.last_pay_type == 'Thru Bank Account'">
                    <v-text-field
                    outlined
                    label="Bank"
                    color="orange"
                    v-model="clearance_form.bank"
                    ></v-text-field>
                </v-col>

                <v-col sm="12" md="6" offset-md="3" v-if="clearance_form.last_pay_type == 'Thru Bank Account'">
                    <v-text-field
                    outlined
                    label="Account Number"
                    color="orange"
                    v-model="clearance_form.account_number"
                    ></v-text-field>
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
        <!-- Dialog edit form-->

        <!-- Dialog for signature form -->
        <v-dialog
        v-model="signfullscreendialog"
        fullscreen
        persistent
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
                    <v-btn icon dark @click="CloseDialogSignFullScreen()">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-toolbar-title>Sign Clearance Form</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                    </v-toolbar-items>
                </v-toolbar>
                <div class="pa-5">
                    <v-col class="ma-0">
                        <v-row class="pt-0 mt-0 pb-0 mb-0">
                            <div class="col-sm-6 pt-0 mt-0 pb-0 mb-0">  
                                <v-text-field
                                readonly
                                label="Employee Name"
                                v-model="user_info.text"
                                color="orange"
                                ></v-text-field>
                            </div>
                            <div class="col-sm-6 pt-0 mt-0 pb-0 mb-0">
                                <v-text-field
                                readonly
                                label="Date Filed"
                                v-model="clearance_form.date_filed"
                                color="orange"
                                ></v-text-field>
                            </div>
                        </v-row>
                        <v-row class="pt-0 mt-0 pb-0 mb-0">
                            <div class="col-sm-6 pt-0 mt-0 pb-0 mb-0">
                                <v-text-field
                                readonly
                                label="Position"
                                v-model="forAllSignUpdate.position"
                                color="orange"
                                ></v-text-field>
                            </div>
                            <div class="col-sm-6 pt-0 mt-0 pb-0 mb-0">
                                <v-text-field
                                readonly
                                label="Date Hired"
                                v-model="forAllSignUpdate.date_hired"
                                color="orange"
                                ></v-text-field>
                            </div>
                        </v-row>
                        <v-row class="pt-0 mt-0 pb-0 mb-0">
                            <div class="col-sm-6 pt-0 mt-0 pb-0 mb-0">
                                <v-text-field
                                readonly
                                label="Locale / Department"
                                v-model="forAllSignUpdate.department"
                                color="orange"
                                ></v-text-field>
                            </div>
                            <div class="col-sm-6 pt-0 mt-0 pb-0 mb-0">
                                <v-text-field
                                readonly
                                label="Last Day of Employment"
                                v-model="clearance_form.last_day_employment"
                                color="orange"
                                ></v-text-field>
                            </div>
                        </v-row>
                        <v-row class="pt-0 mt-0 pb-0 mb-0">
                            <div class="col-sm-12 pt-0 mt-0 pb-0 mb-0">
                                <v-text-field
                                readonly
                                label="Reason for Separation"
                                v-model="clearance_form.separation_reason"
                                color="orange"
                                ></v-text-field>
                                </div>
                            </v-row>
                        </v-col>

                        <h4>Accountability Checklist</h4>
                        <v-data-table
                        :hide-default-footer="true"
                        :headers="headersSign"
                        :items="accountabilitytypedata"
                        :search="search"
                        :page.sync="page"
                        @page-count="pageCount = $event"
                        group-by="accountability_field_info.accountability_type_id"
                        :footer-props="{
                        'items-per-page-options':[100],
                        'disable-items-per-page': true,
                        }"
                        >

                            <template v-slot:group.header="{items, isOpen, toggle}">
                                <th colspan="6">
                                    <v-icon @click="toggle"
                                        >{{ isOpen ? 'mdi-minus' : 'mdi-plus' }}
                                    </v-icon>
                                    {{ items[0]['accountability_field_info']['accountability_type_info']['name']}}
                                </th>
                            </template>

                            <template v-slot:item.signature="props">
                                <v-img :src="signature_path+props.item.signature" height="65px" width="150px"></v-img>
                            </template>

                            <template v-slot:item.is_clear="props">
                                <div>
                                    <v-checkbox 
                                        v-model="props.item.is_clear"
                                        readonly
                                        v-if="props.item.is_clear == 1"
                                        color="orange"
                                    ></v-checkbox> 
                                    <v-checkbox 
                                        v-else
                                        value="false"
                                        readonly
                                        color="orange"
                                    ></v-checkbox>  
                                </div>
                            </template>
                                
                            <template v-slot:item.process_by="props">
                                {{ props.item.processby_info != null ? props.item.processby_info.personal_information.lastname + ' , ' + props.item.processby_info.personal_information.firstname : 'No Data' }}
                            </template>

                            <template v-slot:item.action="props">
                                <template>
                                    <v-row v-if="props.item.signature == null">
                                        <template v-if="0 == props.item.accountability_field_info.accountability_type_id">
                                            <v-btn
                                                elevation="2"
                                                class="mx-2"
                                                dark
                                                outlined
                                                small
                                                color="orange"
                                                @click="SignClearanceForm(props.item.id, props.item)"
                                            >
                                            <v-icon
                                                    small
                                                    @click="SignClearanceForm(props.item.id, props.item)"
                                                >
                                                    mdi-draw-pen
                                                </v-icon>
                                                Sign
                                            </v-btn>
                                        </template>
                                        <template v-if="'Immediate Superior (Supervisor)' == props.item.accountability_field_info.accountability_type_info.name && $store.getters.getUserID == immediate_superior_id">
                                            <v-btn
                                                elevation="2"
                                                class="mx-2"
                                                dark
                                                outlined
                                                small
                                                color="orange"
                                                @click="SignClearanceForm(props.item.id, props.item)"
                                            >
                                            <v-icon
                                                    small
                                                    @click="SignClearanceForm(props.item.id, props.item)"
                                                >
                                                    mdi-draw-pen
                                                </v-icon>
                                                Sign
                                            </v-btn>
                                        </template>
                                        <template v-if="'Department Head' == props.item.accountability_field_info.accountability_type_info.name && $store.getters.getUserID == division_head_id">
                                            <v-btn
                                                elevation="2"
                                                class="mx-2"
                                                dark
                                                outlined
                                                small
                                                color="orange"
                                                @click="SignClearanceForm(props.item.id, props.item)"
                                            >
                                            <v-icon
                                                    small
                                                    @click="SignClearanceForm(props.item.id, props.item)"
                                                >
                                                    mdi-draw-pen
                                                </v-icon>
                                                Sign
                                            </v-btn>
                                        </template>
                                        <template v-if="props.item.accountability_field_info.accountability_type_info.division_info">
                                            <template v-if="$store.getters.getUserID == props.item.accountability_field_info.accountability_type_info.division_info.division_head_id">
                                                <v-btn
                                                    elevation="2"
                                                    class="mx-2"
                                                    dark
                                                    outlined
                                                    small
                                                    color="orange"
                                                    @click="SignClearanceForm(props.item.id, props.item)"
                                                >
                                                <v-icon
                                                        small
                                                        @click="SignClearanceForm(props.item.id, props.item)"
                                                    >
                                                        mdi-draw-pen
                                                    </v-icon>
                                                    Sign
                                                </v-btn>
                                            </template>
                                        </template>
                                    </v-row>
                                    <v-row v-else>
                                        <v-chip
                                            class="ma-2"
                                            color="orange"
                                            outlined
                                        >
                                            Cleared
                                        </v-chip>
                                    </v-row>
                                </template>  
                            </template>
                        </v-data-table>
                        <v-pagination
                        color="orange"
                        v-model="page"
                        :length="pageCount"
                        ></v-pagination>
                    </div>
                </v-form>
            </v-card>
        </v-dialog>
        <!-- Dialog for signature form -->

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
                            @click="SaveClearanceForm()"
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
        
        <!-- Dialog create signature confirmation -->
        <template>
            <v-row justify="center">
                <v-dialog
                v-model="createsignaturesaveconfirmation"
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
                        @click="createsignaturesaveconfirmation=false"
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
                        @click="save()"
                        >
                        Confirm
                    </v-btn>
                    </center>
                    <br>
                </v-card>
                </v-dialog>
            </v-row>
        </template>
        <!-- Dialog create signature confirmation -->

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
                    <v-card-text>Are you sure you want to edit?</v-card-text>
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
        <!-- Dialog edit confirmation -->

        <!-- Dialog create signature form -->
        <v-dialog
        v-model="createsignaturedialog"
        fullscreen
        persistent
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
                    <v-btn icon dark @click="createsignaturedialog=false,  $refs.signaturePad.clearSignature();">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-toolbar-title>Create Signature</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                    </v-toolbar-items>
                </v-toolbar>
                
                <v-col sm="12" md="6" offset-md="3" class="mt-3 text-center"> 
                    <h4>Note: Here you can create signature</h4>
                </v-col>

                <v-col sm="12" md="6" offset-md="3">
                    <v-card style="border: 1px solid black; border-radius:20px;">
                        <template>
                            <div id="app">
                                <VueSignaturePad :options="{onBegin: () => {$refs.signaturePad.resizeCanvas()}}" ref="signaturePad" width="100%" height="400px"/>
                            </div>
                        </template>   
                    </v-card>
                </v-col>

                <center>
                    <v-row class="pa-5">
                        <v-col>
                            <v-btn
                            color="orange"
                            outlined
                            block
                            @click="createsignaturesaveconfirmation=true"
                            >
                            Save
                            </v-btn>
                        </v-col>                                          
                        <v-col>
                            <v-btn
                            color="orange"
                            outlined
                            block
                            @click="undo"
                            >
                            Undo
                            </v-btn>
                        </v-col>                                            
                    </v-row>
                    </center>
                </v-form>
            </v-card>
        </v-dialog>
        <!-- Dialog create signature form -->

        <!-- Dialog remarks confirmation -->
        <v-row justify="center">
            <v-dialog
                persistent 
                :retain-focus="false"
                v-model="remarksdialog"
                max-width="500"
            >
                <v-form
                ref="form"
                v-model="valid"
                lazy-validation>
                    <v-card>
                        <v-card-title class="text-h5">
                            Remarks
                        </v-card-title>
                        <v-card-actions>
                            <v-textarea
                                solo
                                color="orange"
                                name="input-7-4"
                                outlined
                                padding="120"
                                no-resize
                                counter
                                v-model="signatoryremarks"
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
                        @click="remarksdialog=false"
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
                        @click="SignatureConfirmation()"
                        >
                            Confirm
                        </v-btn>
                        </center>
                        <br>                      
                    </v-card>
                </v-form>
            </v-dialog>
        </v-row>
        <!-- Dialog remarks confirmation -->
        
    </v-container>
</template>
  
<script>

import clearanceformservices from '../services/clearanceformservices';
import userservices from '../services/userservices';
import accountabilitychecklistservices from '../services/accountabilitychecklistservices';

export default {
    name: 'ClearanceForm',
    data: () => ({
        division_head_id: '',
        immediate_superior_id: '',
        signature_path: '',
        signatoryremarks: '',
        remarksdialog : false,
        createsignaturesaveconfirmation : false,
        createsignaturedialog : false,
        accountabilitytypedata : [],
        forAllSignUpdate : [],
        signfullscreendialog : false,
        reasoncombobox : ['Resignation' , 'Retirement', 'Others'],
        last_pay_typecombobox : ['Thru Check' , 'Thru Bank Account'],
        listemployeedata: [],
        user_info: [],
        maxdate: '',
        menu : false,
        menulday : false,
        menuldayday : false,
        menucolumn: false,
        search: '',
        page: 1,
        pageCount: 0,
        valid: false,
        saveconfirmation: false,
        deleteconfirmation: false,
        editfullscreendialog: false,
        editconfirmation : false,
        fordeletename: '',
        date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        dialog: false,
        fullscreendialog: false,
        clearance_form: {
            name: '',
            date_filed: '',
            last_day_employment : '',
            separation_reason : '',
            last_pay_type : '',
            bank: '',
            account_number : '',
            otherreason : '',
        },
        headers:[],
        selectedHeaders: [],
        headersMap: [
            { text: 'Last Name',sortable: true, value: 'user_info.personal_information.lastname' ,width: '110px'},
            { text: 'First Name',sortable: true, value: 'user_info.personal_information.firstname' ,width: '115px'},
            { text: 'Position',sortable: false, value: 'user_info.role_information.name' },
            { text: 'Date Filed',sortable: false, value: 'date_filed' ,width: '105px'},
            { text: 'Last day of Employment',sortable: false, value: 'last_day_employment',width: '105px' },
            { text: 'Separation Reason',sortable: false, value: 'separation_reason',width: '150px' },
            { text: 'Action',sortable: false, value: 'action',width: '230px' }
            ],
        clearanceformdata: [],
        headersSign: [
            { text: 'Accountability',sortable: true, value: 'accountability_field_info.name'},
            { text: 'Cleared',sortable: false, value: 'is_clear'},
            { text: 'Remarks',sortable: false, value: 'remarks' },
            { text: 'Signature',sortable: false, value: 'signature'},
            { text: 'Action',sortable: false, value: 'action'}
        ],
        }),
        created(){
            this.$store.state.header = false;
            this.$store.state.footer = false;
            this.$store.state.snackbar.color = 'orange';
            this.FetchAllClearanceForm();
            this.headers = Object.values(this.headersMap);
            this.selectedHeaders = this.headers;      
            this.FetchAllUser();
        },
        mounted(){
            this.$store.state.title = "Clearance Form";
            var selDate = new Date()
            var today = new Date(selDate+2*24*60*60*1000);
            var date = today.getDate()
            var month = today.getMonth()
            var year = today.getFullYear()
            this.maxdate = year+"-"+this.strPad((month+1))+"-"+this.strPad((date)); 
            this.date_filed = this.$dayjs().format('YYYY-MM-DD');   
        },
        computed: {
        showHeaders () {
                return this.headers.filter(s => this.selectedHeaders.includes(s));
            }
        },      
        methods: {
        FetchAllClearanceForm(){ // fetch clearance form
            let payload = {
                parent_id: this.$store.getters.getParentID
            };
            clearanceformservices.FetchAllClearanceForm(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    this.clearanceformdata = response.data.data;
                    console.log(response.data.data);
                }
            }).catch(error => console.log(error));
        },
        UpdateAllClearanceForm(id, item){ // fetch clearance form info for update
            this.user_info = { 
                text: item.user_info.personal_information.middlename == null ? item.user_info.personal_information.lastname + ', ' + item.user_info.personal_information.firstname : item.user_info.personal_information.lastname + ', ' + item.user_info.personal_information.firstname + ', ' + item.user_info.personal_information.middlename,
                firstname: item.user_info.personal_information.firstname,
                lastname: item.user_info.personal_information.lastname,
                middlename: item.user_info.personal_information.middlename,
                value: item.user_id 
            }
            this.clearance_form.date_filed = item.date_filed
            this.clearance_form.last_day_employment = item.last_day_employment
            this.clearance_form.separation_reason = item.separation_reason != 'Resignation' && item.separation_reason != 'Retirement' ? 'Others': item.separation_reason;
            this.clearance_form.last_pay_type = item.last_pay_type == 0 ? 'Thru Check' : 'Thru Bank Account';
            this.clearance_form.bank = item.bank
            this.clearance_form.account_number = item.account_number
            this.forAllUpdate = {
                id: id,
                process_by: item.process_by
            }
            this.clearance_form['otherreason'] = item.separation_reason

            this.editfullscreendialog = true
        },
        confirmUpdate(){ // update clearance form
            let val = this.$refs.form.validate();

            if(val){
            let payload = {
                id: this.forAllUpdate['id'],
                parent_user_id: this.$store.getters.getParentID,
                user_id: this.user_info.value,
                date_filed: this.clearance_form['date_filed'],
                last_day_employment: this.clearance_form['last_day_employment'],
                separation_reason: this.clearance_form['separation_reason'] == 'Others' ? this.clearance_form['otherreason'] : this.clearance_form['separation_reason'],
                last_pay_type: this.clearance_form['last_pay_type'] == 'Thru Check' ? 0 : 1,
                bank: this.clearance_form['bank'],
                account_number: this.clearance_form['account_number'],
                process_by: this.forAllUpdate['process_by'],
            }
            console.log(payload)
            clearanceformservices.UpdateClearanceForm(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    this.$store.state.snackbar.message = 'Clearance form has been updated.';
                    this.$store.state.snackbar.show = true;
                    this.editfullscreendialog = false
                    this.editconfirmation = false
                    this.ClearClearanceForm()
                    this.$refs.form.resetValidation();
                    this.$store.state.snackbar.colors = 'xgreen';
                    this.$store.state.snackbar.icon = "mdi-check-circle-outline";                      
                }
                }).catch(error =>{
                this.$store.state.snackbar.colors = 'xred';
                this.$store.state.snackbar.icon = "mdi-alert-outline";   
                this.errorDAW = error.response.data.message
                this.$store.state.snackbar.message = error.response.data.message;
                this.$store.state.snackbar.show = true;
            });
            }
            this.FetchAllClearanceForm();
        },
        NewClearanceForm(){
            this.fullscreendialog = true
        },
        SaveClearanceForm(){ // save clearance form

            let val = this.$refs.form.validate();

            if(val){
                let payload = {
                    parent_user_id: this.$store.getters.getParentID,
                    user_id: this.user_info.value,
                    date_filed: this.clearance_form['date_filed'],
                    last_day_employment: this.clearance_form['last_day_employment'],
                    separation_reason: this.clearance_form['separation_reason'] == 'Others' ? this.clearance_form['otherreason'] : this.clearance_form['separation_reason'],
                    last_pay_type: this.clearance_form['last_pay_type'] == 'Thru Check' ? 0 : 1,
                    bank: this.clearance_form['bank'],
                    account_number: this.clearance_form['account_number'],
                    process_by: this.$store.getters.getUserID,
                };
                console.log(payload);
                clearanceformservices.SaveClearanceForm(payload, this.$store.getters.getAccessToken).then(response => {
                    if(response.data.success){
                        this.fullscreendialog = false;
                        this.$store.state.snackbar.message = 'Clearance form has been created.';                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
                        this.$store.state.snackbar.show = true;
                        this.FetchAllClearanceForm();
                        this.ClearClearanceForm();
                        this.$refs.form.resetValidation();
                        this.$store.state.snackbar.colors = 'xgreen';
                    this.$store.state.snackbar.icon = "mdi-check-circle-outline";                      
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
            this.ClearClearanceForm();
            this.fullscreendialog = false
        },
        CloseDialogEditFullScreen(){
            this.ClearClearanceForm();
            this.editfullscreendialog = false
        },
        ClearClearanceForm(){
            this.clearance_form['name'] = ''
            this.clearance_form['date_filed'] = ''
            this.clearance_form['last_day_employment'] = ''
            this.clearance_form['separation_reason'] = ''
            this.clearance_form['last_pay_type'] = ''
            this.clearance_form['bank'] = ''
            this.clearance_form['account_number'] = ''
            this.clearance_form['otherreason'] = ''
            this.user_info = ''
        },
        DeleteClearanceForm(id, name){
            this.fordeletename = name
            this.forDelete = {
                id: id
            }
            this.deleteconfirmation = true;
        },
        confirmDelete(){ // delete clearance form
            let payload = {
                id: this.forDelete['id']
            }
            console.log(payload);
            clearanceformservices.DeleteClearanceForm(payload, this.$store.getters.getAccessToken).catch(error =>{
                this.errorDAW = error.response.data.message
                this.$store.state.snackbar.message = error.response.data.message;
                this.$store.state.snackbar.show = true;
            });

            this.$store.state.snackbar.message = 'Clearance form has been deleted.';
            this.$store.state.snackbar.show = true;
            this.deleteconfirmation = false;
            this.FetchAllClearanceForm();
            this.$store.state.snackbar.colors = 'xgreen';
            this.$store.state.snackbar.icon = "mdi-check-circle-outline";                                  
        },
        changeStatusDialogSave(status){
            this.saveconfirmation = status;
        },
        changeStatusDialogDelete(status){
            this.deleteconfirmation = status;
            this.FetchAllClearanceForm();
        },
        changeStatusDialogEdit(status){
            this.editconfirmation = status;
            // this.FetchAllClearanceForm();
            
        },
        validationfalse(){
            this.$refs.form.validate()
        },
        FetchAllUser(){ // fetch all user for combobox
            let payload = {
                parent_id: this.$store.getters.getParentID
            };
            userservices.FetchAllUser(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    this.signature_path = response.data.signature_path;
                    response.data.data.forEach((value) => {
                        value.personal_information.middlename == null ? value.personal_information.middlename = '' : value.personal_information.middlename
                        value.user_other_personal_information.employee_id == null ? value.user_other_personal_information.employee_id = '' : value.user_other_personal_information.employee_id
                        this.listemployeedata.push({
                            text: value.personal_information.middlename == '' ? value.personal_information.lastname + ', ' + value.personal_information.firstname : value.personal_information.lastname + ', ' + value.personal_information.firstname + ', ' + value.personal_information.middlename,
                            firstname: value.personal_information.firstname,
                            lastname: value.personal_information.lastname,
                            middlename: value.personal_information.middlename == null ? '' : value.personal_information.middlename,
                            employee_id: value.user_other_personal_information.employee_id == null ? '' : value.user_other_personal_information.employee_id,
                            value: value.id
                        });
                    });
                }
            }).catch(error => console.log(error));
        },
        clickuser(){
            this.firstname = this.user_info != null ? this.user_info.firstname : '' 
            this.middlename = this.user_info != null ? this.user_info.middlename : ''
            this.lastname = this.user_info != null ? this.user_info.lastname : ''
            this.employeeid = this.user_info != null ? this.user_info.value : 0
        },
        strPad(str){
            return (str).toString().padStart(2,'0')
        },
        unhideaccount(){
            this.clearance_form.bank = ''
            this.clearance_form.account_number = ''
        },
        unhideother(){
           this.clearance_form.otherreason = ''
        },
        UpdateAllSignClearanceForm(id, item){ // fetch clearance form info for signature
            this.user_info = { 
                text: item.user_info.personal_information.middlename == null ? item.user_info.personal_information.lastname + ', ' + item.user_info.personal_information.firstname : item.user_info.personal_information.lastname + ', ' + item.user_info.personal_information.firstname + ', ' + item.user_info.personal_information.middlename,
                firstname: item.user_info.personal_information.firstname,
                lastname: item.user_info.personal_information.lastname,
                middlename: item.user_info.personal_information.middlename,
                value: item.user_id 
            }
            this.clearance_form.date_filed = item.date_filed
            this.clearance_form.last_day_employment = item.last_day_employment
            this.clearance_form.separation_reason = item.separation_reason;
            this.clearance_form.last_pay_type = item.last_pay_type == 0 ? 'Thru Check' : 'Thru Bank Account';
            this.clearance_form.bank = item.bank
            this.clearance_form.account_number = item.account_number
            this.forAllSignUpdate = {
                id: id,
                process_by: item.process_by,
                position : item.user_info.role_information.name,
                department : item.user_info.division_information.name,
                date_hired : item.user_info.user_other_personal_information.date_hired
            }
            this.clearance_form['otherreason'] = item.separation_reason
            this.division_head_id = item.user_info.division_information.division_head_id
            this.immediate_superior_id = item.user_info.division_information.immediate_superior_id

            this.signfullscreendialog = true
            this.FetchAllAccountabilityChecklist();
        },
        CloseDialogSignFullScreen(){
            this.ClearClearanceForm();
            this.signfullscreendialog = false
        },
        FetchAllAccountabilityChecklist(){ // fetch all accountability checklist
            let payload = {
                clearance_form_id: this.forAllSignUpdate.id
            };
            accountabilitychecklistservices.FetchAllAccountabilityChecklist(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    this.accountabilitytypedata = response.data.data;
                    console.log(this.accountabilitytypedata)
                }
            }).catch(error => console.log(error));
        },
        SignClearanceForm(id, item){ // fetch clearance form for signing
            console.log(id, item);
            let payload = {
                id: this.$store.getters.getUserID,
            };
            userservices.GetUser(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    if(response.data.data){
                        if(response.data.data.user_other_personal_information.signature == null){
                           this.createsignaturedialog = true;
                        }else{
                            this.ConfirmationSignature = {
                                id: id,
                                is_clear : 1,
                                signature : response.data.data.user_other_personal_information.signature,
                                signatory_id : response.data.data.id,
                                clearance_form_id : item.clearance_form_id,
                                accountability_field_id : item.accountability_field_id
                            }
                            this.remarksdialog=true
                        }
                    }
                }
            }).catch(error => console.log(error));
        },
        SignatureConfirmation(){ // signature confirmation in clearance form
            let val = this.$refs.form.validate();

            if(val){
                let payload = {
                    id: this.ConfirmationSignature['id'],
                    clearance_form_id: this.ConfirmationSignature['clearance_form_id'],
                    accountability_field_id: this.ConfirmationSignature['accountability_field_id'],
                    is_clear: this.ConfirmationSignature['is_clear'],
                    remarks: this.signatoryremarks,
                    signature: this.ConfirmationSignature['signature'],
                    signatory_id: this.ConfirmationSignature['signatory_id'],
                }
                console.log(payload)
                accountabilitychecklistservices.UpdateAccountabilityChecklist(payload, this.$store.getters.getAccessToken).then(response => {
                    if(response.data.success){
                        this.$store.state.snackbar.message = 'Accountability Checklist has been signed.';
                        this.$store.state.snackbar.show = true;
                        this.remarksdialog = false
                        this.signatoryremarks = ''
                        this.$refs.form.resetValidation();
                        this.FetchAllAccountabilityChecklist();
                        this.$store.state.snackbar.colors = 'xgreen';
                        this.$store.state.snackbar.icon = "mdi-check-circle-outline";
                        if(response.data.status == 1){
                            this.FetchAllClearanceForm()
                            this.signfullscreendialog = false
                        }            
                    }
                    }).catch(error =>{
                    this.$store.state.snackbar.colors = 'xred';
                    this.$store.state.snackbar.icon = "mdi-alert-outline";   
                    this.errorDAW = error.response.data.message
                    this.$store.state.snackbar.message = error.response.data.message;
                    this.$store.state.snackbar.show = true;
                });
            }
        },
        undo() {
            this.$refs.signaturePad.undoSignature();
        },
        save() { // saving of signature
            const { isEmpty, data } = this.$refs.signaturePad.saveSignature();
           
            if(isEmpty == true){
                this.$store.state.snackbar.colors = 'xyellow';
                this.$store.state.snackbar.icon = "mdi-information-outline"; 
                this.$store.state.snackbar.message = 'Make a signature.';
                this.$store.state.snackbar.show = true;
                this.createsignaturesaveconfirmation = false
            }else{
                let payload = {
                    id: this.$store.getters.getUserID,
                    signature: data,
                };
                userservices.CreateSignature(payload, this.$store.getters.getAccessToken).then(response => {
                    if(response.data.success){
                        this.$store.state.snackbar.colors = 'xgreen';
                        this.$store.state.snackbar.icon = "mdi-check-circle-outline"; 
                        this.$store.state.snackbar.message = 'Signature has been created.';
                        this.$store.state.snackbar.show = true;
                        this.createsignaturedialog = false
                        this.createsignaturesaveconfirmation = false                
                    }
                }).catch(error => console.log(error));
            }
        },
        PrintClearanceForm(id, user_id){ // printing of clearance form
            localStorage.setItem("printclearanceform", id);
            localStorage.setItem("printclearanceformuserid", user_id);
            localStorage.setItem('is_hris', 0)
            window.open("/printclearanceform","_blank")
        },
        PrintPreviewClearanceForm(id, user_id){ // print preview of clearance form
            localStorage.setItem("printclearanceform", id);
            localStorage.setItem("printclearanceformuserid", user_id);
            localStorage.setItem('is_hris', 0)
            localStorage.setItem('forprintpreview', 1)
            window.open("/printclearanceform","_blank")
        },
    }
}
</script>
  
<style scoped>
    input[type=checkbox] {
        accent-color: orange;
    }
</style>