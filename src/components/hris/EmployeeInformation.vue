<template>
    <v-container style="max-width: 95%; position: relative;" >
        <v-row>
            <v-col cols="15">
                <v-card
                    :loading="loading"
                >
                    <v-card tile color="orange">
                        <template>
                            <v-toolbar style="height: 40px;">
                                <v-tabs
                                style="height: 40px;"
                                dark
                                background-color="orange"
                                grow
                                >
                                <v-tabs-slider color="black"></v-tabs-slider>
                                    <v-tab
                                        @click="tab = 'MyProfile'"
                                    >
                                        Profile
                                    </v-tab>
                                    <v-tab
                                        @click="tab = 'MyDocuments'"
                                    >
                                        Documents
                                    </v-tab>
                                    <!-- <v-tab
                                    >
                                        Accountability
                                    </v-tab> -->
                                </v-tabs>
                            </v-toolbar>
                        </template>
                    </v-card> 
                    <!-- Profile edit form -->  
                    <v-form ref="form" v-model="valid" lazy-validation v-if="tab == 'MyProfile'">
                        <v-card-text>
                            <div class="text-right">
                                <div class="col-sm-12">
                                    <v-btn
                                    v-if="signature == null"
                                    color="orange"
                                    outlined
                                    class="white--text"
                                    @click="createsignaturedialog = true"
                                    >
                                        Add Signature
                                    </v-btn>
                                    <v-btn
                                    v-else
                                    color="orange"
                                    outlined
                                    class="white--text"
                                    @click="createsignaturedialog = true"
                                    >
                                        Edit Signature
                                    </v-btn>
                                    &nbsp;
                                    <v-btn
                                    color="orange"
                                    outlined
                                    class="white--text"
                                    v-if="hidebutton == '1' && $store.getters.valAccess(145)"
                                    @click="editprofileto()"
                                    >
                                    <v-icon
                                        medium
                                        >
                                        mdi-file-document-edit
                                    </v-icon>
                                        EDIT
                                    </v-btn>
                                </div>    
                                <v-icon
                                    medium
                                    color="orange"
                                    class="white--text"
                                    block
                                    v-if="hidebutton == '2'"
                                    @click="canceleditprofileto()"
                                    >
                                    mdi-close
                                </v-icon>
                            </div>                   
                            <v-col md="12" offset-md="0" class="ma-0">
                                <v-col>
                                    <h3>
                                        Personal Information
                                    </h3>
                                </v-col>
                                <v-divider class="mx-2"></v-divider>
                                <v-col class="ma-0">
                                    <!-- user personal information table -->
                                    <v-row class="pt-0 mt-0 pb-0 mb-0">
                                        <div class="col-sm-3 pt-0 mt-0 pb-0 mb-0">
                                            <v-menu
                                            v-model="menudatehired"
                                            :close-on-content-click="false"
                                            :nudge-right="40"
                                            transition="scale-transition"
                                            min-width="auto"
                                            disabled
                                            >
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-text-field
                                                    :outlined="foreditstatus"
                                                    v-model="user_information_data.date_hired"
                                                    label="Date Hired"
                                                    readonly
                                                    color="orange"
                                                    v-bind="attrs"
                                                    v-on="on"
                                                    disabled
                                                ></v-text-field>
                                                </template>
                                                <v-date-picker
                                                    v-model="user_information_data.date_hired"
                                                    @input="menudatehired = false"
                                                ></v-date-picker>
                                            </v-menu>
                                        </div>
                                        <div class="col-sm-4 pt-0 mt-0 pb-0 mb-0">
                                            <v-text-field
                                                :outlined="foreditstatus"
                                                v-model="user_information_data.employee_id"
                                                label="Employee Id"
                                                readonly
                                                color="orange"
                                                disabled
                                            ></v-text-field>
                                        </div>
                                        <template v-if="$vuetify.breakpoint.mdAndUp">
                                            <div class="col-sm-3 pt-0 mt-0 pb-0 mb-0">
                                                <v-chip
                                                v-if="status_email_verify == 'Email Not Verified'"
                                                class="mt-4"
                                                color="red"
                                                label
                                                outlined
                                                @click:close="chip4 = false"
                                                >
                                                {{ status_email_verify }}
                                                    <v-icon
                                                    dark
                                                    right
                                                    >
                                                    {{ icon_email_verify }}
                                                    </v-icon>
                                                </v-chip>
                                                <v-chip
                                                v-else
                                                class="mt-4"
                                                color="orange"
                                                label
                                                outlined
                                                @click:close="chip4 = false"
                                                >
                                                {{ status_email_verify }}
                                                    <v-icon
                                                    dark
                                                    right
                                                    >
                                                    {{ icon_email_verify }}
                                                    </v-icon>
                                                </v-chip>
                                            </div>
                                        </template>
                                        <template  v-else>
                                            <div class="col-sm-3 pt-0 mt-0 pb-0 mb-0">
                                                <v-chip
                                                v-if="status_email_verify == 'Email Not Verified'"
                                                class="mt-4"
                                                color="red"
                                                label
                                                outlined
                                                @click:close="chip4 = false"
                                                >
                                                    <v-icon
                                                    dark
                                                    center
                                                    >
                                                    {{ icon_email_verify }}
                                                    </v-icon>
                                                </v-chip>
                                                <v-chip
                                                v-else
                                                class="mt-4"
                                                color="orange"
                                                label
                                                outlined
                                                @click:close="chip4 = false"
                                                >
                                                {{ status_email_verify }}
                                                    <v-icon
                                                    dark
                                                    right
                                                    >
                                                    {{ icon_email_verify }}
                                                    </v-icon>
                                                </v-chip>
                                            </div>
                                        </template>
                                        <div class="col-sm-2 pt-0 mt-0 pb-0 mb-0">
                                            <v-switch
                                                v-model="user_information_data.switch_flag"
                                                inset
                                                :label="activeinactive"
                                                color="orange"
                                                :readonly="this.emailreadonly == 'edit'"
                                                :disabled="foreditstatusdisable"
                                                :outlined="foreditstatus"
                                                @change="activeinactivetrigger()"
                                            ></v-switch>
                                        </div>
                                    </v-row>
                                    <v-row class="pt-0 mt-0 pb-0 mb-0">
                                        <div class="col-sm-3 pt-0 mt-0 pb-0 mb-0">
                                            <v-text-field
                                                :outlined="foreditstatus"
                                                :disabled="foreditstatusdisable"
                                                color="orange"
                                                v-model="user_information_data.firstname"
                                                label="First Name *"
                                                :rules="[v => !!v || 'First Name is required']"
                                            ></v-text-field>
                                        </div>
                                        <div class="col-sm-3 pt-0 mt-0 pb-0 mb-0">
                                            <v-text-field
                                                :outlined="foreditstatus"
                                                color="orange"
                                                :disabled="foreditstatusdisable"
                                                v-model="user_information_data.middlename"
                                                label="Middle Name"
                                            ></v-text-field>
                                        </div>
                                        <div class="col-sm-3 pt-0 mt-0 pb-0 mb-0">
                                            <v-text-field
                                                :outlined="foreditstatus"
                                                :disabled="foreditstatusdisable"
                                                color="orange"
                                                v-model="user_information_data.lastname"
                                                label="Last Name *"
                                                :rules="[v => !!v || 'Last Name is required']"
                                            ></v-text-field>
                                        </div>
                                        <div class="col-sm-3 pt-0 mt-0 pb-0 mb-0">
                                            <v-text-field
                                                :outlined="foreditstatus"
                                                :disabled="foreditstatusdisable"
                                                color="orange"
                                                v-model="user_information_data.sufix"
                                                label="Suffix Name"
                                            ></v-text-field>
                                        </div>
                                    </v-row>
                                    <v-row class="pt-0 mt-0 pb-0 mb-0">
                                        <div class="col-sm-4 pt-0 mt-0 pb-0 mb-0">
                                            <v-menu
                                            v-model="menubirthdate"
                                            :close-on-content-click="false"
                                            color="orange"
                                            :nudge-right="40"
                                            transition="scale-transition"
                                            min-width="auto"
                                            :disabled="foreditstatusdisable"
                                            
                                            >
                                                <template v-slot:activator="{ on, attrs }">
                                                    <v-text-field
                                                    v-model="user_information_data.birth_date"
                                                    label="Birthday *"
                                                    :disabled="foreditstatusdisable"
                                                    color="orange"
                                                    :outlined="foreditstatus"
                                                    :rules="[v => !!v || 'Birthday is required']"
                                                    v-bind="attrs"
                                                    v-on="on"
                                                    ></v-text-field>
                                                </template>
                                                <v-date-picker
                                                    color="orange"
                                                    v-model="user_information_data.birth_date"
                                                    @input="menubirthdate = false"
                                                    :max="maxdate"
                                                ></v-date-picker>
                                            </v-menu>
                                        </div>
                                        <div class="col-sm-4 pt-0 mt-0 pb-0 mb-0">
                                            <v-combobox
                                                :disabled="foreditstatusdisable"
                                                :outlined="foreditstatus"
                                                color="orange"
                                                v-model="user_information_data.gender"
                                                :items="gendercombobox"
                                                label="Gender *"
                                            ></v-combobox>
                                        </div>
                                        <div class="col-sm-4 pt-0 mt-0 pb-0 mb-0">
                                            <v-combobox
                                                :disabled="foreditstatusdisable"
                                                color="orange"
                                                :outlined="foreditstatus"
                                                v-model="user_information_data.marital_status"
                                                :items="maritalstatuscombobox"
                                                label="Marital Status *"
                                            ></v-combobox>
                                        </div>
                                    </v-row>
                                    <v-row class="pt-0 mt-0 pb-0 mb-0">
                                        <div class="col-sm-3 pt-0 mt-0 pb-0 mb-0">
                                            <v-text-field
                                                :disabled="foreditstatusdisable"
                                                :outlined="foreditstatus"
                                                color="orange"
                                                v-model="user_information_data.sss"
                                                label="SSS"
                                                v-mask="'##-#######-#'"
                                            ></v-text-field>
                                        </div>
                                        <div class="col-sm-3 pt-0 mt-0 pb-0 mb-0">
                                            <v-text-field
                                                :disabled="foreditstatusdisable"
                                                :outlined="foreditstatus"
                                                color="orange"
                                                v-model="user_information_data.philhealth"
                                                label="Philhealth"
                                                v-mask="'##-#########-#'"
                                            ></v-text-field>
                                        </div>
                                        <div class="col-sm-3 pt-0 mt-0 pb-0 mb-0">
                                            <v-text-field
                                                :disabled="foreditstatusdisable"
                                                color="orange"
                                                :outlined="foreditstatus"
                                                v-model="user_information_data.pagibig"
                                                label="Pag-IBIG"
                                                v-mask="'####-####-####'"
                                            ></v-text-field>
                                        </div>
                                        <div class="col-sm-3 pt-0 mt-0 pb-0 mb-0">
                                            <v-text-field
                                                :disabled="foreditstatusdisable"
                                                :outlined="foreditstatus"
                                                color="orange"
                                                v-model="user_information_data.tin"
                                                label="TIN"
                                                v-mask="'###-###-###-000'"
                                            ></v-text-field>
                                        </div>
                                    </v-row>
                                </v-col>
                                <v-col>
                                    <h3>
                                        Position
                                    </h3>
                                </v-col>
                                <v-divider class="mx-3"></v-divider>
                                <v-col class="ma-0">
                                    <v-row class="pt-0 mt-0 pb-0 mb-0">
                                        <div class="col-sm-4 pt-0 mt-0 pb-0 mb-0">
                                            <v-combobox
                                                label="Division"
                                                color="orange"
                                                :items="division_information"
                                                :rules="[v => !!v || 'Division is required']"
                                                disabled
                                                :outlined="foreditstatus"
                                                v-model="user_information_data.division_name"
                                            ></v-combobox>
                                        </div>
                                        <div class="col-sm-4 pt-0 mt-0 pb-0 mb-0">
                                            <v-combobox
                                                label="Role"
                                                color="orange"
                                                :items="role_information"
                                                disabled
                                                :outlined="foreditstatus"
                                                v-model="user_information_data.role_name"
                                            ></v-combobox>
                                        </div>
                                        <div class="col-sm-4 pt-0 mt-0 pb-0 mb-0">
                                            <v-combobox
                                                label="Branch"
                                                color="orange"
                                                :items="branch_information"
                                                disabled
                                                :outlined="foreditstatus"
                                                v-model="user_information_data.branch_name"
                                            ></v-combobox>
                                        </div>
                                    </v-row>
                                    <v-row class="pt-0 mt-0 pb-0 mb-0">
                                        <div class="col-sm-12 pt-0 mt-0 pb-0 mb-0">
                                            <v-combobox
                                                label="Schedule"
                                                color="orange"
                                                :items="schedule_information"
                                                v-model="user_information_data.schedule_id"
                                                disabled
                                                :outlined="foreditstatus"
                                            ></v-combobox>
                                        </div>
                                    </v-row>
                                </v-col>
                                <v-col>
                                    <h3>
                                        Address Information
                                    </h3>
                                </v-col>
                                <v-divider class="mx-3"></v-divider>
                                <v-col class="ma-0">
                                    <v-row class="pt-0 mt-0 pb-0 mb-0">
                                        <div class="col-sm-4 pt-0 mt-0 pb-0 mb-0">
                                            <v-combobox
                                            :disabled="foreditstatusdisable"
                                            color="orange"
                                                :outlined="foreditstatus"
                                                v-model="user_information_data.country"
                                                :items="countrycombobox"
                                                @change="FetchAllLocationAddressProvince(user_information_data.country.value), user_information_data.province='', user_information_data.city_municipality=''"
                                                label="Country *"
                                                :rules="[v => !!v || 'Country is required']"
                                            ></v-combobox>
                                        </div>
                                        <div class="col-sm-4 pt-0 mt-0 pb-0 mb-0">
                                            <v-combobox
                                            :disabled="foreditstatusdisable"
                                            color="orange"
                                                :outlined="foreditstatus"
                                                :items="province_information"
                                                v-model="user_information_data.province"
                                                :readonly="user_information_data.country == ''"
                                                @change="FetchAllLocationAddressMunicipality(user_information_data.province.code), user_information_data.city_municipality=''"
                                                label="State *"
                                                :rules="[v => !!v || 'State is required']"
                                            ></v-combobox>
                                        </div>
                                        <div class="col-sm-4 pt-0 mt-0 pb-0 mb-0">
                                            <v-combobox
                                            :disabled="foreditstatusdisable"
                                            color="orange"
                                                :outlined="foreditstatus"
                                                :items="municipality_information"
                                                :readonly="user_information_data.province == ''"
                                                v-model="user_information_data.city_municipality"
                                                label="City *"
                                                @change="mucinipality_checking(user_information_data.city_municipality.code)"
                                                :rules="[v => !!v || 'City is required']"
                                            ></v-combobox>
                                        </div>
                                    </v-row>
                                    <v-row class="pt-0 mt-0 pb-0 mb-0">
                                        
                                        <div class="col-sm-2 pt-0 mt-0 pb-0 mb-0">
                                            <v-text-field
                                            :disabled="foreditstatusdisable"
                                            color="orange"
                                                :outlined="foreditstatus"
                                                v-model="user_information_data.zip_code"
                                                label="Zip Code *"
                                                :rules="[v => !!v || 'Zip Code is required']"
                                            ></v-text-field>
                                        </div>

                                        <div class="col-sm-10 pt-0 mt-0 pb-0 mb-0">
                                            <v-text-field
                                            :disabled="foreditstatusdisable"
                                            color="orange"
                                                :outlined="foreditstatus"
                                                v-model="user_information_data.street_name"
                                                label="Address *"
                                                :rules="[v => !!v || 'Address is required']"
                                            ></v-text-field>
                                        </div>
                                    </v-row>
                                </v-col>
                                <v-col>
                                    <h3>
                                        Contact Information
                                    </h3>
                                </v-col>
                                <v-divider class="mx-2"></v-divider>
                                <v-col class="ma-0">
                                    <v-row class="pt-0 mt-0 pb-0 mb-0">
                                        <div class="col-sm-3 pt-0 mt-0 pb-0 mb-0">
                                            <v-text-field
                                                disabled
                                                :outlined="foreditstatus"
                                                color="orange"
                                                v-model="user_information_data.email"
                                                label="Email"
                                                :rules="[v => !!v || 'E-mail is required']"
                                            ></v-text-field>
                                        </div>
                                        <div class="col-sm-3 pt-0 mt-0 pb-0 mb-0">
                                            <v-text-field
                                                :disabled="foreditstatusdisable"
                                                :outlined="foreditstatus"
                                                color="orange"
                                                v-model="user_information_data.mobile_number"
                                                v-mask="'09#########'"
                                                label="Mobile Number *"
                                            ></v-text-field>
                                        </div>
                                        <div class="col-sm-3 pt-0 mt-0 pb-0 mb-0">
                                            <v-text-field
                                                :disabled="foreditstatusdisable"
                                                color="orange"
                                                :outlined="foreditstatus"
                                                v-model="user_information_data.work_phone"
                                                v-mask="'###########'"
                                                label="Work Phone"
                                            ></v-text-field>
                                        </div>
                                        <div class="col-sm-3 pt-0 mt-0 pb-0 mb-0">
                                            <v-text-field
                                                :disabled="foreditstatusdisable"
                                                color="orange"
                                                :outlined="foreditstatus"
                                                v-model="user_information_data.home_phone"
                                                v-mask="'###########'"
                                                label="Home Phone"
                                            ></v-text-field>
                                        </div>
                                    </v-row>
                                    <v-spacer></v-spacer>
                                    <div class="text-right">
                                        <v-btn
                                        color="orange"
                                        class="white--text"
                                        outlined
                                        block
                                        v-if="hidebutton == '2'"
                                        @click="valid == false ? validationfalse() : changeStatusDialogSave(true)"
                                        >
                                            {{ listempdialoglabel }}
                                        </v-btn>
                                    </div>
                                </v-col>
                            </v-col>
                        </v-card-text>
                    </v-form>
                    <!-- Profile edit form --> 

                    <!-- Document edit form -->  
                    <v-form  ref="form" v-model="valid" lazy-validation v-if="tab == 'MyDocuments'">
                        <v-card-text>                 
                            <v-col md="12" offset-md="0" class="ma-0">
                                <v-data-table
                                    :hide-default-footer="true"
                                    :headers="checkliststatus"
                                    :items="checkliststatusdata"
                                    :footer-props="{
                                    'items-per-page-options':[1000],
                                    'disable-items-per-page': true,
                                    }"
                                >
                                        
                                    <template v-slot:item.status="props">
                                        <div>
                                            <v-checkbox 
                                                v-model="props.item.status"
                                                readonly
                                                v-if="props.item.status == 1"
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

                                    <template v-slot:item.action="props">
                                        <template>
                                            <v-row v-if="props.item.file == null">
                                            <v-btn
                                            @click="handleFileImport(props.item)"
                                            elevation="2"
                                            class="mx-2"
                                            dark
                                            outlined
                                            small
                                            color="orange"
                                            >
                                            <v-icon
                                                small
                                            >
                                                mdi-upload
                                            </v-icon>
                                            Upload
                                            </v-btn>
                                            <input 
                                            ref="uploader" 
                                            class="d-none" 
                                            type="file" 
                                            @change="onFileChanged"
                                            >
                                            </v-row>
                                            <v-row v-else>
                                                <v-btn
                                                v-if="props.item.upload_status == 2 || props.item.upload_status == 0"
                                                @click="handleFileImport(props.item)"
                                                elevation="2"
                                                class="mx-2"
                                                dark
                                                outlined
                                                small
                                                color="orange"
                                                >
                                                <v-icon
                                                    small
                                                >
                                                    mdi-upload
                                                </v-icon>
                                                Reupload
                                                </v-btn>
                                                <input 
                                                ref="uploader" 
                                                class="d-none" 
                                                type="file" 
                                                @change="onFileChanged"
                                                >
                                                <v-btn
                                                v-if="props.item.upload_status == 1"
                                                elevation="2"
                                                class="mx-2"
                                                dark
                                                outlined
                                                small
                                                color="orange"
                                                @click.prevent="getfile(props.item.file)"
                                                >
                                                <v-icon
                                                        small
                                                    >
                                                        mdi-eye-outline
                                                    </v-icon>
                                                    View
                                                </v-btn>
                                            </v-row>
                                        </template>  
                                    </template>
                                </v-data-table>
                            </v-col>
                        </v-card-text>
                    </v-form>
                    <!-- Document edit form --> 
                </v-card>
            </v-col>
        </v-row>

        <!-- Dialog save confirmation -->  
        <v-row justify="center">
            <v-dialog
                persistent :retain-focus="false"
                v-model="saveconfirmation"
                max-width="290"
            >
                <v-card>
                    <v-card-title class="text-h5">
                        {{ listempdialoglabel }}
                    </v-card-title>
                    <v-card-text>Are you sure you want to {{ listempdialoglabel }} ?</v-card-text>
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
                        @click="SaveorUpdate()"
                        >
                        Confirm
                    </v-btn>
                    </center>
                    <br>                
                </v-card>
            </v-dialog>
        </v-row>
        <!-- Dialog save confirmation -->  

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
                    <v-card-text>Profile has been updated.</v-card-text>
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
                        @click="savesignature()"
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
    </v-container>
</template>
  
<script>
    import divisionservices from '../services/divisionservices';
    import roleservices from '../services/roleservices';
    import branchservices from '../services/branchservices';
    import userservices from '../services/userservices';
    import scheduleservices from '../services/scheduleservices';
    import locationaddressservices from '../services/locationaddressservices';
    import resourcesservice from '../services/resourcesservices';
    import userchecklistservices from '../services/userchecklistservices';
    import checkliststatusservices from '../services/checkliststatusservices';

    export default {
        name: 'EmployeeInformation',
        data: () => ({
            signature : '',
            createsignaturesaveconfirmation : false,
            createsignaturedialog : false,
            image_path : [],
            isSelecting: false,
            checkliststatus: [
                { text: 'Name',sortable: true, value: 'checklist_info.name' },
                { text: 'Status',sortable: true, value: 'status',width:'90px' },
                { text: 'File',sortable: false, value: 'file' },
                { text: 'Remarks',sortable: false, value: 'remarks' },
                { text: 'Action',sortable: false, value: 'action' },
            ],
            checkliststatusdata: [],
            tab : 'MyProfile',
            maxdate: '',
            hidebutton: 1,
            systemmessagedialog: false,
            foreditstatus: false,
            foreditstatusdisable: true,
            forupdateyes : false,
            valid: false,
            menudatehired: false,
            menubirthdate: false,
            activeinactive : 'Active',
            gendercombobox : ['Male' , 'Female'],
            countrycombobox : ['Philippines'],
            maritalstatuscombobox : ['Single' , 'Married', 'Divorced', 'Separated', 'Widowed'],
            loading: false,
            division_information: [],
            municipality_information: [],
            emailreadonly: 'edit',
            listempdialoglabel: 'Update',
            role_information: [],
            branch_information: [],
            user_information: [],
            region_information: [],
            province_information: [],
            schedule_information: [],
            status_email_verify: '',
            icon_email_verify: '',
            btncolor_email_verify: '',
            user_information_data: {
                date_hired: '',
                switch_email_verified_at: false,
                switch_flag: false,
                firstname: '',
                middlename: '',
                lastname: '',
                suffix: '',
                division_name: '',
                role_name: '',
                branch_name: '',
                birth_date: '',
                gender: '',
                marital_status: '',
                sss: '',
                philhealth: '',
                pagibig: '',
                tin: '',
                house_no: '',
                subdivision: '',
                street_name: '',
                barangay: '',
                city_municipality: '',
                province: '',
                country: '',
                zip_code: '',
                email: '',
                mobile_number: '',
                work_phone: '',
                home_phone: '',
                schedule_id: '',
                employee_id: '',
            },
            saveconfirmation: false,
            loader: false,
        }),
        created(){
            this.$store.state.header = false;
            this.$store.state.footer = false;
            this.$store.state.snackbar.color = 'orange';
            this.GetUser();
            this.FetchWorldInformation();
            this.fetchDivisionInformation();
            this.fetchRoleInformation();
            this.fetchBranchInformation();
            this.FetchAllLocationAddressRegion();
            this.FetchAllSchedule();
            this.FetchChecklistStatusViaUserId();
        },
        mounted(){
            this.$store.state.title = "My Profile";
            var selDate = new Date()
            var today = new Date(selDate+2*24*60*60*1000);
            var date = today.getDate()
            var month = today.getMonth()
            var year = today.getFullYear()
            this.maxdate = year+"-"+this.strPad((month+1))+"-"+this.strPad((date));
        },
        methods: {
            GetUser(){ // fetch user information via id
                let payload = {
                    id: this.$store.getters.getUserID,
                    user_id: this.$store.getters.getUserID,
                };
                userservices.GetUser(payload, this.$store.getters.getAccessToken).then(response => {
                    if(response.data.success){
                        this.user_information = response.data.data;
                        console.log(response.data.data)
                    
                        if(this.user_information.email_verified_at)
                        {
                            this.status_email_verify = 'Email Verified',
                            this.icon_email_verify = 'mdi-checkbox-marked-circle',
                            this.btncolor_email_verify = 'orange'
                        }else{
                            this.status_email_verify = 'Email Not Verified',
                            this.icon_email_verify = 'mdi-cancel',
                            this.btncolor_email_verify = 'red'
                        }
                        if(this.user_information.flag)
                        {
                            this.user_information_data.switch_flag = true;
                        }
                        this.user_information_data.date_hired =  this.user_information.user_other_personal_information == null ? '' : this.user_information.user_other_personal_information.date_hired
                        this.user_information_data.firstname = this.user_information.personal_information.firstname
                        this.user_information_data.middlename = this.user_information.personal_information.middlename
                        this.user_information_data.lastname = this.user_information.personal_information.lastname
                        this.user_information_data.suffix = this.user_information.personal_information.sufix
                        this.user_information_data.division_name = this.user_information.division_information == null ? '' : this.user_information.division_information.name
                        this.user_information_data.role_name = this.user_information.role_information == null ? '' : this.user_information.role_information.name
                        this.user_information_data.branch_name =this.user_information.branch_information == null ? '' :  this.user_information.branch_information.branch_name
                        this.user_information_data.birth_date = this.user_information.personal_information.birth_date
                        this.user_information_data.gender =  this.user_information.user_other_personal_information == null ? '' : this.user_information.user_other_personal_information.gender
                        this.user_information_data.marital_status =  this.user_information.user_other_personal_information == null ? '' : this.user_information.user_other_personal_information.marital_status
                        this.user_information_data.sss =  this.user_information.user_other_personal_information == null ? '' : this.user_information.user_other_personal_information.sss
                        this.user_information_data.philhealth =  this.user_information.user_other_personal_information == null ? '' : this.user_information.user_other_personal_information.philhealth
                        this.user_information_data.pagibig =  this.user_information.user_other_personal_information == null ? '' : this.user_information.user_other_personal_information.pagibig
                        this.user_information_data.tin =  this.user_information.user_other_personal_information == null ? '' : this.user_information.user_other_personal_information.tin
                        this.user_information_data.house_no =  this.user_information.user_other_personal_information == null ? '' : this.user_information.user_other_personal_information.house_no
                        this.user_information_data.subdivision =  this.user_information.user_other_personal_information == null ? '' : this.user_information.user_other_personal_information.subdivision
                        this.user_information_data.street_name =  this.user_information.user_other_personal_information == null ? '' : this.user_information.user_other_personal_information.street_name
                        this.user_information_data.barangay =  this.user_information.user_other_personal_information == null ? '' : this.user_information.user_other_personal_information.barangay
                        this.user_information_data.city_municipality =  this.user_information.user_other_personal_information == null ? '' : this.user_information.user_other_personal_information.city_municipality
                        this.user_information_data.province =  this.user_information.user_other_personal_information == null ? '' : this.user_information.user_other_personal_information.province
                        this.user_information_data.region =  this.user_information.user_other_personal_information == null ? '' : this.user_information.user_other_personal_information.region
                        this.user_information_data.country =  this.user_information.user_other_personal_information == null ? '' : this.user_information.user_other_personal_information.country
                        this.user_information_data.zip_code =  this.user_information.user_other_personal_information == null ? '' : this.user_information.user_other_personal_information.zip_code
                        this.user_information_data.email = this.user_information.email
                        this.user_information_data.mobile_number = this.user_information.personal_information.mobile_number
                        this.user_information_data.work_phone =  this.user_information.user_other_personal_information == null ? '' : this.user_information.user_other_personal_information.work_phone
                        this.user_information_data.home_phone =  this.user_information.user_other_personal_information == null ? '' : this.user_information.user_other_personal_information.home_phone
                        this.user_information_data.schedule_id =  this.user_information.user_other_personal_information.schedule_info == null ? '' : this.user_information.user_other_personal_information.schedule_info.name
                        this.user_information_data.employee_id = this.user_information.user_other_personal_information == null ? '' : this.user_information.user_other_personal_information.employee_id
                        this.signature = this.user_other_personal_information.signature
                        console.log(this.signature);
                    }
                }).catch(error => console.log(error));
            },
            fetchDivisionInformation(){ // fetch division
                let payload = {
                    user_id: this.$store.getters.getParentID
                };
                divisionservices.fetchDivisionInformation(payload, this.$store.getters.getAccessToken).then(response => {
                    if(response.data.success){
                        response.data.result.forEach((value) => {
                            this.division_information.push({
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
            fetchRoleInformation(){ // fetch role
                let payload = {
                    user_id: this.$store.getters.getParentID
                };
                roleservices.fetchRoleInformation(payload, this.$store.getters.getAccessToken).then(response => {
                    if(response.data.success){
                        response.data.result.forEach((value) => {
                            this.role_information.push({
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
            fetchBranchInformation(){ // fetch branch
                let payload = {
                user_id: this.$store.getters.getParentID
                };
                branchservices.fetchBranchInformation(payload, this.$store.getters.getAccessToken).then(response => {
                    if(response.data.success){
                        response.data.result.forEach((value) => {
                            this.branch_information.push({
                                text: value.branch_name,
                                value: value.id
                            });
                        });
                    }
                    else{
                        console.log(response.data.message);
                    }
                }).catch(error => console.log(error));
            },
            activeinactivetrigger(){ // switch active in active
                if(this.user_information_data.switch_flag ==true){
                    this.activeinactive = 'Active'
                }else{
                    this.activeinactive = 'Inactive'
                }
            },
            SaveorUpdate(){ // Update User Information Confirmation
                let val = this.$refs.form.validate();
                this.saveconfirmation = false;

                if(val){
                    if(this.valid == true){
                        this.UpdateEmployeeInformation()
                    }
                }
            },
            UpdateEmployeeInformation(){ // Update User Information Confirmation
                let loader = this.$loading.show();

                if(this.user_information_data.switch_flag == true)
                {
                    this.user_information.flag = 1
                    this.activeinactive = 'Active'
                }else{
                    this.user_information.flag = 0
                    this.activeinactive = 'Inactive'
                }
                
                let payload = {
                    id : this.$store.getters.getUserID,
                    // user_table
                    flag : this.user_information.flag,
                    is_parent : 0,
                    parent_id : this.$store.getters.getParentID,
                    // user_personal_information_table
                    user_id: this.$store.getters.getUserID,
                    firstname : this.user_information_data.firstname,
                    middlename : this.user_information_data.middlename,
                    lastname : this.user_information_data.lastname,
                    sufix : this.user_information_data.suffix,
                    address : this.user_information_data.address,
                    mobile_number :  this.user_information_data.country.phone_code != this.user_information_data.mobile_number ? this.user_information_data.mobile_number : '',
                    birth_date : this.user_information_data.birth_date,
                    // user_other_information_table
                    gender : this.user_information_data.gender,
                    marital_status : this.user_information_data.marital_status,
                    sss : this.user_information_data.sss,
                    philhealth : this.user_information_data.philhealth,
                    pagibig : this.user_information_data.pagibig,
                    tin : this.user_information_data.tin,
                    country : !this.user_information_data.country.text ? this.user_information_data.country : this.user_information_data.country.country,
                    province : !this.user_information_data.province.text ? this.user_information_data.province : this.user_information_data.province.text,
                    region: this.user_information_data.region,
                    city_municipality : !this.user_information_data.city_municipality.text ? this.user_information_data.city_municipality : this.user_information_data.city_municipality.text,
                    barangay : this.user_information_data.barangay,
                    street_name : this.user_information_data.street_name,
                    subdivision : this.user_information_data.subdivision,
                    house_no : this.user_information_data.house_no,
                    zip_code : this.user_information_data.zip_code,
                    work_phone : this.user_information_data.country.phone_code != this.user_information_data.work_phone ? this.user_information_data.work_phone : '',
                    home_phone :  this.user_information_data.country.phone_code != this.user_information_data.home_phone ? this.user_information_data.home_phone : '',
                    date_hired : this.user_information_data.date_hired,
                    employment_status : this.user_information_data.employment_status,
                };

                console.log('payload ito');
                console.log(payload);

                userservices.UpdateOneEmployeeInformation(payload, this.$store.getters.getAccessToken).then(response => {
                    if(response.data.success){
                        loader.hide();
                        this.$store.state.snackbar.message = 'Profile has been updated.';
                        this.$store.state.snackbar.show = true;
                        this.GetUser();
                        this.listempdialog = false
                        this.$refs.form.resetValidation();
                        this.foreditstatus = false,
                        this.foreditstatusdisable = true
                        this.hidebutton=1
                    }
                }).catch(error =>{ 
                    this.$store.state.snackbar.message = error.response.data.message
                    this.$store.state.snackbar.show = true;
                });
            },
            validationfalse(){
                this.$refs.form.validate()
            },
            FetchAllLocationAddressRegion(){ // fetch region
                let payload = {
                    user_id: this.$store.getters.getParentID
                };
                locationaddressservices.FetchAllLocationAddressRegion(payload, this.$store.getters.getAccessToken).then(response => {
                    if(response.data.success){
                        response.data.data.forEach((value) => {
                            this.region_information.push({
                                text: value.name,
                                value: value.id,
                                code: value.code
                            });
                        });
                    }
                    else{
                        console.log(response.data.message);
                    }
                }).catch(error => console.log(error));
            },
            FetchAllLocationAddressProvince(region_code){ // fetch province
                this.user_information_data.mobile_number = this.user_information_data.country.phone_code
                this.user_information_data.work_phone = this.user_information_data.country.phone_code
                this.user_information_data.home_phone = this.user_information_data.country.phone_code
                this.province_information = [];
                let payload = {
                    region_code: region_code
                };
                locationaddressservices.FetchAllLocationAddressProvince(payload, this.$store.getters.getAccessToken).then(response => {
                    if(response.data.success){
                        response.data.data.forEach((value) => {
                            this.province_information.push({
                                text: value.name,
                                value: value.id,
                                code: value.code
                            });
                        });
                    }
                    else{
                        console.log(response.data.message);
                    }
                }).catch(error => console.log(error));
            },
            FetchAllLocationAddressMunicipality(province_code){ // fetch municipality
                console.log(province_code)
                this.municipality_information = [];
                let payload = {
                    province_code: province_code
                };
                locationaddressservices.FetchAllLocationAddressMunicipality(payload, this.$store.getters.getAccessToken).then(response => {
                    if(response.data.success){
                        response.data.data.forEach((value) => {
                            this.municipality_information.push({
                                text: value.name,
                                value: value.id,
                                code: value.code
                            });
                        });
                    }
                    else{
                        console.log(response.data.message);
                    }
                }).catch(error => console.log(error));
            },
            mucinipality_checking(municipality_city){ // checking municipality
                console.log(municipality_city);
            },
            changeStatusDialogSave(status){
                this.saveconfirmation = status;
            },
            FetchAllSchedule(){ // fetch schedule 
                let payload = {
                    user_id: this.$store.getters.getParentID
                };
                scheduleservices.FetchAllSchedule(payload, this.$store.getters.getAccessToken).then(response => {
                    if(response.data.success){
                        response.data.data.forEach((value) => {
                            this.schedule_information.push({
                                text: value.name,
                                value: value.id,
                                value_in: value.in,
                                value_out: value.out
                            });
                        });
                    }
                    else{
                        console.log(response.data.message);
                    }
                }).catch(error => console.log(error));
            },
            editprofileto(){
                this.foreditstatus = true,
                this.foreditstatusdisable = false
                this.hidebutton=2
            },
            canceleditprofileto(){
                this.foreditstatus = false,
                this.foreditstatusdisable = true
                this.hidebutton=1
                this.GetUser();
            },
            strPad(str){ // max date 
                return (str).toString().padStart(2,'0')
            },
            FetchWorldInformation(){ // fetch country

                this.countrycombobox = [];
                let payload = {
                    country_code: process.env.VUE_APP_WEB_COUNTRY_CODE
                };

                resourcesservice.fetchWorldInformation(payload).then(response => {
                    if(response.data.success){
                        response.data.result.forEach((value) => {
                            this.countrycombobox.push({
                                text: value.emoji + ' ' + value.name,
                                value: value.id,
                                phone_code: value.phonecode,
                                country: value.name,
                            });
                        });
                    }
                }).catch(error => console.log(error));
            },
            FetchChecklistStatusViaUserId(){ // fetch checklist status via user id
                let payload = {
                    user_id: this.$store.getters.getUserID
                };
                userchecklistservices.FetchChecklistStatusViaUserId(payload, this.$store.getters.getAccessToken).then(response => {
                    if(response.data.success){
                        this.checkliststatusdata = response.data.data.checklist_status_info
                        this.image_path = response.data.image_path
                    }
                }).catch(error => console.log(error));
            },
            handleFileImport(item) { // upload image
                this.isSelecting = true;
                window.addEventListener('focus', () => {
                    this.isSelecting = false
                }, { once: true });
                this.$refs.uploader.click();

                this.forAllUpdate = {
                    id: item.id,
                    type: item.checklist_info.type
                }
            },
            onFileChanged(e) { // upload image
                this.selectedFile = e.target.files[0];
                if(!this.selectedFile){
                    this.url=null;
                    return;
                } 
                this.url= URL.createObjectURL(this.selectedFile);

                const formData = new FormData();
                formData.append('id', this.forAllUpdate.id); 
                formData.append('file', this.selectedFile);
                formData.append('type', this.forAllUpdate.type);
                formData.append('upload_by', this.$store.getters.getUserID);
                formData.append('approved_by', 0);
                formData.append('upload_status', 0);

                checkliststatusservices.UpdateChecklistStatus(formData, this.$store.getters.getAccessToken).then(response => {
                    if(response.data.success){
                        this.$store.state.snackbar.message = 'User ' + this.forAllUpdate.type + ' has been uploaded.';
                        this.$store.state.snackbar.show = true;
                        this.$store.state.snackbar.colors = 'xgreen';
                        this.$store.state.snackbar.icon = "mdi-check-circle-outline";           
                        this.FetchChecklistStatusViaUserId();
                    }
                    }).catch(error =>{
                    this.errorDAW = error.response.data.message
                    this.$store.state.snackbar.message = error.response.data.message;
                    this.$store.state.snackbar.colors = 'xred';
                    this.$store.state.snackbar.icon = "mdi-alert-outline";  
                    this.$store.state.snackbar.show = true;
                });
            },
            getfile(file) {
                window.open(this.image_path + file, "_blank");
            },
            undo() {
            this.$refs.signaturePad.undoSignature();
            },
            savesignature() { // saving of signature
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
                            this.GetUser();
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
        }
    }
</script>
  
<style scoped>

</style>
