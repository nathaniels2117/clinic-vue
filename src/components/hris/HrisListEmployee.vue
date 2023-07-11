<template>
    <v-container style="max-width: 95%; position: relative;">
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
                                    dark
                                    medium
                                    color="orange"
                                    elevation="2"
                                    v-if="$store.getters.valAccess(147)"
                                    @click="CreateEmployee('create')"
                                    >
                                        <v-icon>mdi-plus</v-icon>Create
                                    </v-btn>
                                </template>

                                <template v-if="$vuetify.breakpoint.smAndDown">
                                    <v-btn
                                    dark
                                    medium
                                    color="orange"
                                    elevation="2"
                                    v-if="$store.getters.valAccess(147)"
                                        @click="CreateEmployee('create')"
                                    >
                                        <v-icon>mdi-plus</v-icon>
                                    </v-btn>
                                </template>
                            </v-toolbar>
                        </template>
                        <!-- One liner filtering -->  
                        <br>
                        <v-row justify="center" v-if="prodApp=='listemployee'">
                            <v-col cols="12">
                                <center>
                                    <!-- Data table list of employee -->  
                                    <v-data-table
                                    :headers="showHeaders"
                                    :items="listemployeedata"
                                    :search="search"
                                    align="center"  
                                    :page.sync="page"
                                    must-sort
                                    :sort-by.sync="sortBy"
                                    :sort-desc.sync="sortDesc"
                                    @page-count="pageCount = $event"
                                    :footer-props="{
                                    'items-per-page-options':[10],
                                    'disable-items-per-page': true,
                                    }"                                 
                                    >
                                        <template v-slot:item.email_verified_at="props">
                                            <div class="text-center">
                                            <v-chip
                                                outlined
                                                class="ma-2"
                                                color="red"
                                                v-if="props.item.email_verified_at == null"
                                            >
                                                Not Verified
                                            </v-chip>
                                            <v-chip
                                                outlined
                                                class="ma-2"
                                                color="success"
                                                v-else
                                            >
                                                Verified  
                                            </v-chip>
                                            </div>
                                        </template>
                                        <template v-slot:item.flag="props">
                                            <div class="text-center">
                                                <v-chip
                                                    outlined
                                                    class="ma-2"
                                                    color="red"
                                                    v-if="props.item.flag == 0"
                                                >
                                                    Inactive
                                                </v-chip>
                                                <v-chip
                                                    outlined
                                                    class="ma-2"
                                                    color="success"
                                                    v-else
                                                >
                                                    Active  
                                                </v-chip>
                                            </div>
                                        </template>
                                        <template v-slot:item.action="props">
                                            <v-btn
                                            elevation="2"
                                                class="mx-2"
                                                dark
                                                small
                                                outlined
                                                color="orange"
                                                v-if="$store.getters.valAccess(148)"
                                                @click="UpdateEmployee(props.item.id, 'edit')"
                                            >
                                                <v-icon small>
                                                    mdi-file-edit-outline
                                                </v-icon>
                                                Edit
                                            </v-btn>                                            
                                        </template>   
                                    </v-data-table>
                                    <!-- Data table list of employee -->  
                                    <v-pagination
                                        color="orange"
                                        v-model="page"
                                        :length="pageCount"
                                    ></v-pagination>                                    
                                </center>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>

        <!-- Dialog add form -->  
        <template>
            <v-row justify="center">
                <v-dialog
                v-model="listempdialog"
                max-width="85%"
                >
                    <v-card>
                        <v-card tile color="orange">
                            <template>
                                <v-toolbar color="orange" height="50px">
                                    <v-toolbar-title class="white--text flex text-center">{{ title_profile }}</v-toolbar-title>
                                    <div class="text-right">
                                        <v-icon
                                            medium
                                            color="white"
                                            class="white--text"
                                            block
                                            @click="listempdialog = false, hehehehe()"
                                            >
                                            mdi-close
                                        </v-icon>
                                    </div>
                                </v-toolbar>
                            </template>
                        </v-card>
                        <v-form  ref="form" v-model="valid" lazy-validation>
                            
                            <v-card-text>
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
                                            <div class="col-sm-10 pt-0 mt-0 pb-0 mb-0">
                                                <v-menu
                                                v-model="menudatehired"
                                                color="orange"
                                                :close-on-content-click="false"
                                                :nudge-right="40"
                                                transition="scale-transition"
                                                min-width="auto"
                                                >
                                                <template v-slot:activator="{ on, attrs }">
                                                    <v-text-field
                                                        outlined
                                                        color="orange"
                                                        v-model="user_information_data.date_hired"
                                                        label="Date Hired *"
                                                        :rules="[v => !!v || 'Date Hired is required']"
                                                        readonly
                                                        v-bind="attrs"
                                                        v-on="on"
                                                    ></v-text-field>
                                                    </template>
                                                    <v-date-picker
                                                        color="orange"
                                                        v-model="user_information_data.date_hired"
                                                        @input="menudatehired = false"
                                                    ></v-date-picker>
                                                </v-menu>
                                            </div>
                                            <div class="col-sm-2 pt-0 mt-0 pb-0 mb-0">
                                                <v-switch
                                                    v-model="user_information_data.switch_flag"
                                                    inset
                                                    :label="activeinactive"
                                                    color="orange"
                                                    @change="activeinactivetrigger()"
                                                ></v-switch>
                                            </div>
                                        </v-row>
                                        <v-row class="pt-0 mt-0 pb-0 mb-0">
                                            <div class="col-sm-3 pt-0 mt-0 pb-0 mb-0">
                                                <v-text-field
                                                    outlined
                                                    color="orange"
                                                    v-model="user_information_data.firstname"
                                                    label="First Name *"
                                                    :rules="[v => !!v || 'First Name is required']"
                                                ></v-text-field>
                                            </div>
                                            <div class="col-sm-3 pt-0 mt-0 pb-0 mb-0">
                                                <v-text-field
                                                    outlined
                                                    color="orange"
                                                    v-model="user_information_data.middlename"
                                                    label="Middle Name"
                                                ></v-text-field>
                                            </div>
                                            <div class="col-sm-3 pt-0 mt-0 pb-0 mb-0">
                                                <v-text-field
                                                    outlined
                                                    color="orange"
                                                    v-model="user_information_data.lastname"
                                                    label="Last Name *"
                                                    :rules="[v => !!v || 'Last Name is required']"
                                                ></v-text-field>
                                            </div>
                                            <div class="col-sm-3 pt-0 mt-0 pb-0 mb-0">
                                                <v-text-field
                                                    outlined
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
                                                color="orange"
                                                :close-on-content-click="false"
                                                :nudge-right="40"
                                                transition="scale-transition"
                                                min-width="auto"
                                                >
                                                    <template v-slot:activator="{ on, attrs }">
                                                        <v-text-field
                                                        color="orange"
                                                        v-model="user_information_data.birth_date"
                                                        label="Birthday *"
                                                        readonly
                                                        outlined
                                                        :rules="[v => !!v || 'Birthday is required']"
                                                        v-bind="attrs"
                                                        v-on="on"
                                                        ></v-text-field>
                                                    </template>
                                                    <v-date-picker
                                                        v-model="user_information_data.birth_date"
                                                        color="orange"
                                                        @input="menubirthdate = false"
                                                        :max="maxdate"
                                                    ></v-date-picker>
                                                </v-menu>
                                            </div>
                                            <div class="col-sm-4 pt-0 mt-0 pb-0 mb-0">
                                                <v-combobox
                                                    outlined
                                                    color="orange"
                                                    v-model="user_information_data.gender"
                                                    :items="gendercombobox"
                                                    label="Gender  *"
                                                    :rules="[v => !!v || 'Gender is required']"
                                                ></v-combobox>
                                            </div>
                                            <div class="col-sm-4 pt-0 mt-0 pb-0 mb-0">
                                                <v-combobox
                                                    outlined
                                                    color="orange"
                                                    v-model="user_information_data.marital_status"
                                                    :items="maritalstatuscombobox"
                                                    label="Marital Status  *"
                                                    :rules="[v => !!v || 'Marital Status is required']"
                                                ></v-combobox>
                                            </div>
                                        </v-row>
                                        <v-row class="pt-0 mt-0 pb-0 mb-0">
                                            <div class="col-sm-3 pt-0 mt-0 pb-0 mb-0">
                                                <v-text-field
                                                outlined
                                                color="orange"
                                                    v-model="user_information_data.sss"
                                                    label="SSS"
                                                    v-mask="'##-#######-#'"
                                                ></v-text-field>
                                            </div>
                                            <div class="col-sm-3 pt-0 mt-0 pb-0 mb-0">
                                                <v-text-field
                                                    outlined
                                                    color="orange"
                                                    v-model="user_information_data.philhealth"
                                                    label="Philhealth"
                                                    v-mask="'##-#########-#'"
                                                ></v-text-field>
                                            </div>
                                            <div class="col-sm-3 pt-0 mt-0 pb-0 mb-0">
                                                <v-text-field
                                                    outlined
                                                    color="orange"
                                                    v-model="user_information_data.pagibig"
                                                    label="Pag-IBIG"
                                                    v-mask="'####-####-####'"
                                                ></v-text-field>
                                            </div>
                                            <div class="col-sm-3 pt-0 mt-0 pb-0 mb-0">
                                                <v-text-field
                                                    outlined
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
                                                    label="Division *"
                                                    color="orange"
                                                    outlined
                                                    :items="division_information"
                                                    :rules="[v => !!v || 'Division is required']"
                                                    v-model="user_information_data.division_name"
                                                ></v-combobox>
                                            </div>
                                            <div class="col-sm-4 pt-0 mt-0 pb-0 mb-0">
                                                <v-combobox
                                                    label="Role *"
                                                    color="orange"
                                                    outlined
                                                    :items="role_information"
                                                    :rules="[v => !!v || 'Role is required']"
                                                    v-model="user_information_data.role_name"
                                                ></v-combobox>
                                            </div>
                                            <div class="col-sm-4 pt-0 mt-0 pb-0 mb-0">
                                                <v-combobox
                                                    label="Branch *"
                                                    color="orange"
                                                    outlined
                                                    :items="branch_information"
                                                    :rules="[v => !!v || 'Branch is required']"
                                                    v-model="user_information_data.branch_name"
                                                ></v-combobox>
                                            </div>
                                        </v-row>
                                        <v-row class="pt-0 mt-0 pb-0 mb-0">
                                            <div class="col-sm-12 pt-0 mt-0 pb-0 mb-0">
                                                <v-combobox
                                                    label="Schedule *"
                                                    color="orange"
                                                    outlined
                                                    :items="schedule_information"
                                                    v-model="user_information_data.schedule_id"
                                                    :rules="[v => !!v || 'Schedule is required']"
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
                                                    outlined
                                                    color="orange"
                                                    v-model="user_information_data.country"
                                                    :items="countrycombobox"
                                                    label="Country  *"
                                                    @change="FetchAllLocationAddressProvince(user_information_data.country.value), user_information_data.province='', user_information_data.city_municipality=''"
                                                    :rules="[v => !!v || 'Country is required']"
                                                ></v-combobox>
                                            </div>

                                            <div class="col-sm-4 pt-0 mt-0 pb-0 mb-0">
                                                <v-combobox
                                                    outlined
                                                    color="orange"
                                                    :items="province_information"
                                                    v-model="user_information_data.province"
                                                    :rules="[v => !!v || 'State is required']"
                                                    :readonly="user_information_data.country == ''"
                                                    @change="FetchAllLocationAddressMunicipality(user_information_data.province.code), user_information_data.city_municipality=''"
                                                    label="State  *"
                                                ></v-combobox>
                                            </div>
                                            <div class="col-sm-4 pt-0 mt-0 pb-0 mb-0">
                                                <v-combobox
                                                    outlined
                                                    color="orange"
                                                    :items="municipality_information"
                                                    :rules="[v => !!v || 'City is required']"
                                                    :readonly="user_information_data.province == ''"
                                                    v-model="user_information_data.city_municipality"
                                                    label="City *"
                                                    @change="checkingmunicipality(user_information_data.city_municipality.code)"
                                                ></v-combobox>
                                            </div>
                                        </v-row>
                                        <v-row class="pt-0 mt-0 pb-0 mb-0">
                                            <div class="col-sm-2 pt-0 mt-0 pb-0 mb-0">
                                                <v-text-field
                                                    outlined
                                                    color="orange"
                                                    v-model="user_information_data.zip_code"
                                                    label="Zip Code *"
                                                    :rules="[v => !!v || 'Zip Code is required']"
                                                ></v-text-field>
                                            </div>

                                            <div class="col-sm-10 pt-0 mt-0 pb-0 mb-0">
                                                <v-text-field
                                                    outlined
                                                    color="orange"
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
                                                    outlined
                                                    color="orange"
                                                    v-model="user_information_data.email"
                                                    label="Email  *"
                                                    :rules="[v => !!v || 'E-mail is required']"
                                                    :readonly="this.emailreadonly == 'edit'"
                                                ></v-text-field>
                                            </div>
                                            <div class="col-sm-3 pt-0 mt-0 pb-0 mb-0">
                                                <v-text-field
                                                    outlined
                                                    color="orange"
                                                    v-model="user_information_data.mobile_number"
                                                    :rules="[v => !!v || 'Mobile Number is required']"
                                                    label="Mobile Number  *"
                                                ></v-text-field>
                                            </div>
                                            <div class="col-sm-3 pt-0 mt-0 pb-0 mb-0">
                                                <v-text-field
                                                    outlined
                                                    color="orange"
                                                    v-model="user_information_data.work_phone"
                                                    label="Work Phone"
                                                ></v-text-field>
                                            </div>
                                            <div class="col-sm-3 pt-0 mt-0 pb-0 mb-0">
                                                <v-text-field
                                                    outlined
                                                    color="orange"
                                                    v-model="user_information_data.home_phone"
                                                    label="Home Phone"
                                                ></v-text-field>
                                            </div>
                                        </v-row>
                                    </v-col>
                                </v-col>
                                <v-card-actions class="pt-0 mt-0 pb-0 mb-0">
                                    <v-spacer></v-spacer>
                                    <v-btn
                                    color="orange"
                                    width="100"
                                    outlined
                                    block
                                    class="white--text"
                                    @click="valid == false ? validationfalse() : changeStatusDialogSave(true)"
                                    >
                                        {{ listempdialoglabel }}
                                    </v-btn>
                                </v-card-actions>
                            </v-card-text>
                        </v-form>
                    </v-card>
                </v-dialog>
            </v-row>
        </template>
        <!-- Dialog add form -->  

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
    </v-container>
</template>
  
<script>
    import userservices from '../services/userservices';
    import divisionservices from '../services/divisionservices';
    import roleservices from '../services/roleservices';
    import branchservices from '../services/branchservices';
    import locationaddressservices from '../services/locationaddressservices';
    import scheduleservices from '../services/scheduleservices';
    import userotherinformationservices from '../services/userotherinformationservices';
    import resourcesservice from '../services/resourcesservices';

    export default {
        name: 'HrisListEmployee',
        data: () => ({
        sortBy: 'user_other_personal_information.employee_id',
        sortDesc: false,
        menucolumn: false,
        page: 1,
        pageCount: 0,
        search: '',
        maxdate: '',
        valid: false,
        allerror: '',
        loading: false,
        prodApp: "listemployee",
        listemployeedata: [],
        listempdialog: false,
        user_information: [],
        menudatehired: false,
        menubirthdate: false,
        activePicker: null,
        schedule_information: [],
        region_information: [],
        province_information: [],
        municipality_information: [],
        division_information: [],
        role_information: [],
        branch_information: [],
        gendercombobox : ['Male' , 'Female'],
        maritalstatuscombobox : ['Single' , 'Married', 'Divorced', 'Separated', 'Widowed'],
        countrycombobox : ['Philippines'],
        activeinactive : 'Active',
        emailreadonly: 'edit',
        listempdialoglabel: 'Save',
        title_profile: 'Add Employee Profile',
        user_information_data: {
            date_hired: '',
            switch_email_verified_at: false,
            switch_flag: true,
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
            region:'',
            country: '',
            zip_code: '',
            mobile_number: '',
            work_phone: '',
            home_phone: '',
            schedule_id: '',
        },
        headers:[],
        selectedHeaders: [],
        headersMap: [
        { text: 'Employee Id', value: 'user_other_personal_information.employee_id',sortable: true ,width: '120px'}, // Employee ID
        { text: 'First Name', value: 'personal_information.firstname',sortable: true,width: '130px'},
        { text: 'Middle Name', value: 'personal_information.middlename',sortable: true,width: '130px'},
        { text: 'Last Name', value: 'personal_information.lastname',sortable: true,width: '130px'},
        { text: 'Suffix', value: 'personal_information.sufix',sortable: false},
        { text: 'Division', value: 'division_information.name',sortable: false},  
        { text: 'Role', value: 'role_information.name',sortable: false},  
        { text: 'Branch', value: 'branch_information.branch_name',sortable: false},
        { text: 'SSS', value: 'user_other_personal_information.sss',width: '120px',sortable: false},
        { text: 'Philhealth', value: 'user_other_personal_information.philhealth',width: '140px',sortable: false},
        { text: 'Pagibig', value: 'user_other_personal_information.pagibig',width: '140px',sortable: false},
        { text: 'Tin', value: 'user_other_personal_information.tin',width: '140px',sortable: false},  
        { text: 'Mobile Number', value: 'personal_information.mobile_number',sortable: false},  
        { text: 'Email', value: 'email' ,sortable: false},  
        { text: 'Email Verify', value: 'email_verified_at' ,sortable: false},  
        { text: 'Status', value: 'flag' ,sortable: false}, 
        { text: 'Action', value: 'action' ,sortable: false}
        ],
        saveconfirmation: false,
        editconfirmation: false
        }),
        created(){
            this.$store.state.header = false;
            this.$store.state.footer = false;
            this.$store.state.snackbar.color = 'orange';
            this.FetchAllUser();
            this.FetchWorldInformation();
            this.fetchDivisionInformation();
            this.fetchRoleInformation();
            this.fetchBranchInformation();
            this.FetchAllLocationAddressRegion();
            this.FetchAllSchedule();
            this.headers = Object.values(this.headersMap);
            this.selectedHeaders = this.headers;
        },
        mounted(){
            this.$store.state.title = "Employee Information"
            var selDate = new Date()
            var today = new Date(selDate+2*24*60*60*1000);
            var date = today.getDate()
            var month = today.getMonth()
            var year = today.getFullYear()
            this.maxdate = year+"-"+this.strPad((month+1))+"-"+this.strPad((date));
        },
        computed: {
        //Done to get the ordered headers
        showHeaders () {
            return this.headers.filter(s => this.selectedHeaders.includes(s));
        }
    },
    methods: {
        FetchAllUser(){ // fetch all user
            let payload = {
                parent_id: this.$store.getters.getParentID
            };
            userservices.FetchAllUser(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    this.listemployeedata = response.data.data;
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
        activeinactivetrigger(){
            if(this.user_information_data.switch_flag ==true){
                this.activeinactive = 'Active'
            }else{
                this.activeinactive = 'Inactive'
            }
        },
        alertdata(){
            this.prodApp = "dataemployee"
        },
        alertlist(){
            this.prodApp = "listemployee"
        },
        Clear(){
            this.user_information_data.date_hired = '',
            this.user_information_data.switch_email_verified_at = false,
            this.user_information_data.switch_flag = false,
            this.user_information_data.firstname = '',
            this.user_information_data.middlename = '',
            this.user_information_data.lastname = '',
            this.user_information_data.suffix = '',
            this.user_information_data.division_name = '',
            this.user_information_data.role_name = '',
            this.user_information_data.branch_name = '',
            this.user_information_data.birth_date = '',
            this.user_information_data.gender = '',
            this.user_information_data.marital_status = '',
            this.user_information_data.sss = '',
            this.user_information_data.philhealth = '',
            this.user_information_data.pagibig = '',
            this.user_information_data.tin = '',
            this.user_information_data.house_no = '',
            this.user_information_data.subdivision = '',
            this.user_information_data.street_name = '',
            this.user_information_data.barangay = '',
            this.user_information_data.city_municipality = '',
            this.user_information_data.province = '',
            this.user_information_data.region = '',
            this.user_information_data.country = '',
            this.user_information_data.zip_code = '',
            this.user_information_data.email = '',
            this.user_information_data.mobile_number = '',
            this.user_information_data.work_phone = '',
            this.user_information_data.home_phone = ''
            this.user_information_data.schedule_id= ''
        },
        UpdateEmployee(id, action){ // fetch employee information for update
            this.Clear();
            if(action == 'edit'){
                this.emailreadonly = action;
            }
            this.forUpdate = {
                id: id,
            }
            this.GetUser(id);
            this.listempdialoglabel = 'Update';
            this.title_profile = 'Update Employee Profile';
            this.listempdialog = true;
        },
        CreateEmployee(action){
            this.Clear();
            this.user_information_data.switch_flag = true
            if(action == 'create'){
                this.emailreadonly = action;
            }
            this.listempdialoglabel = 'Save';
            this.title_profile = 'Save Employee Profile';
            this.listempdialog = true;
            this.hehehehe();
        },
        GetUser(id){ // get employee information
            let payload = {
                id: id,
                user_id: id,
            };
            userservices.GetUser(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    console.log(response.data.data)
                    this.user_information = response.data.data;
                    if(this.user_information.flag == 1)
                    {
                        this.activeinactive = 'Active'
                        this.user_information_data.switch_flag = true;
                    }else{
                        this.activeinactive = 'Inactive'
                        this.user_information_data.switch_flag = false;
                    }
                    // user table
                    this.user_information_data.email = this.user_information.email
                    this.user_information_data.division_name = this.user_information.division_information == null ? '' : this.user_information.division_information.name
                    this.user_information_data.role_name = this.user_information.role_information == null ? '' : this.user_information.role_information.name
                    this.user_information_data.branch_name =this.user_information.branch_information == null ? '' :  this.user_information.branch_information.branch_name

                    // personal information table
                    this.user_information_data.firstname = this.user_information.personal_information.firstname
                    this.user_information_data.middlename = this.user_information.personal_information.middlename
                    this.user_information_data.lastname = this.user_information.personal_information.lastname
                    this.user_information_data.suffix = this.user_information.personal_information.sufix
                    this.user_information_data.birth_date = this.user_information.personal_information.birth_date
                    this.user_information_data.mobile_number = this.user_information.personal_information.mobile_number

                    //other personal table
                    if(this.user_information.user_other_personal_information){
                        this.user_information_data.date_hired = this.user_information.user_other_personal_information == null ? '' : this.user_information.user_other_personal_information.date_hired
                        this.user_information_data.gender = this.user_information.user_other_personal_information == null ? '' : this.user_information.user_other_personal_information.gender
                        this.user_information_data.marital_status = this.user_information.user_other_personal_information == null ? '' : this.user_information.user_other_personal_information.marital_status
                        this.user_information_data.sss = this.user_information.user_other_personal_information == null ? '' : this.user_information.user_other_personal_information.sss
                        this.user_information_data.philhealth = this.user_information.user_other_personal_information == null ? '' : this.user_information.user_other_personal_information.philhealth
                        this.user_information_data.pagibig = this.user_information.user_other_personal_information == null ? '' : this.user_information.user_other_personal_information.pagibig
                        this.user_information_data.tin = this.user_information.user_other_personal_information == null ? '' : this.user_information.user_other_personal_information.tin
                        this.user_information_data.house_no = this.user_information.user_other_personal_information == null ? '' : this.user_information.user_other_personal_information.house_no
                        this.user_information_data.subdivision = this.user_information.user_other_personal_information == null ? '' : this.user_information.user_other_personal_information.subdivision
                        this.user_information_data.street_name = this.user_information.user_other_personal_information == null ? '' : this.user_information.user_other_personal_information.street_name
                        this.user_information_data.barangay = this.user_information.user_other_personal_information == null ? '' : this.user_information.user_other_personal_information.barangay
                        this.user_information_data.city_municipality = this.user_information.user_other_personal_information == null ? '' : this.user_information.user_other_personal_information.city_municipality
                        this.user_information_data.region = this.user_information.user_other_personal_information == null ? '' : this.user_information.user_other_personal_information.region
                        this.user_information_data.province = this.user_information.user_other_personal_information == null ? '' : this.user_information.user_other_personal_information.province
                        this.user_information_data.country = this.user_information.user_other_personal_information == null ? '' : this.user_information.user_other_personal_information.country
                        this.user_information_data.zip_code = this.user_information.user_other_personal_information == null ? '' : this.user_information.user_other_personal_information.zip_code
                        this.user_information_data.work_phone = this.user_information.user_other_personal_information == null ? '' : this.user_information.user_other_personal_information.work_phone
                        this.user_information_data.home_phone = this.user_information.user_other_personal_information == null ? '' : this.user_information.user_other_personal_information.home_phone
                        this.user_information_data.schedule_id = this.user_information.user_other_personal_information.schedule_info == null ? '' : this.user_information.user_other_personal_information.schedule_info.name
                    }
                    this.hehehehe();
                }
            }).catch(error => console.log(error));
        },
        SaveorUpdate(){ // save or update of employee information
            this.$refs.form.validate()

            let val = this.$refs.form.validate();
            this.saveconfirmation = false;

            if(val){
                if(this.valid == true){
                    if(this.listempdialoglabel == 'Save'){
                        this.SaveEmployeeInformation()
                    }else{
                        this.UpdateEmployeeInformation()
                    }
                }
            }
        },
        validationfalse(){
            this.$refs.form.validate()
        },
        hehehehe(){
            this.$refs.form.resetValidation();
        },
        SaveEmployeeInformation(){ // save employee information
            let loader = this.$loading.show();
            if(this.user_information_data.switch_flag == true)
            {
                this.user_information.flag = 1
                this.activeinactive = 'Active'
                ;
            }else{
                this.user_information.flag = 0
                this.activeinactive = 'Inactive'
            }
            let payload = {
                // user_table
                email : this.user_information_data.email,
                role_id : this.user_information_data.role_name.value,
                division_id : this.user_information_data.division_name.value,
                branch_id : this.user_information_data.branch_name.value,
                flag : this.user_information.flag,
                is_parent : 0,
                parent_id : this.$store.getters.getParentID,
                // user_personal_information_table
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
                country : this.user_information_data.country.country,
                region: this.user_information_data.region.text,
                province : this.user_information_data.province.text,
                city_municipality : this.user_information_data.city_municipality.text,
                barangay : this.user_information_data.barangay,
                street_name : this.user_information_data.street_name,
                subdivision : this.user_information_data.subdivision,
                house_no : this.user_information_data.house_no,
                zip_code : this.user_information_data.zip_code,
                work_phone : this.user_information_data.country.phone_code != this.user_information_data.work_phone ? this.user_information_data.work_phone : '',
                home_phone :  this.user_information_data.country.phone_code != this.user_information_data.home_phone ? this.user_information_data.home_phone : '',
                date_hired : this.user_information_data.date_hired,
                employment_status : this.user_information_data.employment_status, 
                schedule_id : this.user_information_data.schedule_id.value
            };
            console.log(payload);
            userservices.SaveEmployeeInformation(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    loader.hide();
                    this.$store.state.snackbar.message = 'Employees have been created.';
                    this.$store.state.snackbar.show = true;
                    this.FetchAllUser();
                    this.Clear();
                    this.listempdialog = false
                    this.$refs.form.resetValidation();
                }
            }).catch(error =>{ 
                loader.hide();
                console.log(error.response.data);
                this.$store.state.snackbar.message = error.response.data.message
                this.$store.state.snackbar.show = true;
            });
        },
        UpdateEmployeeInformation(){ // update employee information
            if(this.user_information_data.switch_flag == true)
            {
                this.user_information.flag = 1
                this.activeinactive = 'Active'
            }else{
                this.user_information.flag = 0
                this.activeinactive = 'Inactive'
            }

            let payload = {
                id : this.forUpdate.id,
                user_id: this.forUpdate.id,
                role_id : !this.user_information_data.role_name.value ? this.user_information.role_information.id : this.user_information_data.role_name.value,
                division_id : !this.user_information_data.division_name.value ? this.user_information.division_information.id : this.user_information_data.division_name.value,
                branch_id : !this.user_information_data.branch_name.value ? this.user_information.branch_information.id : this.user_information_data.branch_name.value,
                flag : this.user_information.flag,
                is_parent : 0,
                parent_id : this.$store.getters.getParentID,
                // user_personal_information_table
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
                schedule_id : !this.user_information_data.schedule_id.value ? this.user_information.user_other_personal_information.schedule_info.id : this.user_information_data.schedule_id.value 
            };
            console.log(payload)
            userservices.UpdateEmployeeInformation(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    this.$store.state.snackbar.message = 'Employee Profile has been updated.';
                    this.$store.state.snackbar.show = true;
                    this.FetchAllUser();
                    this.Clear();
                    this.listempdialog = false
                    this.$refs.form.resetValidation();
                }
            }).catch(error =>{ 
                this.$store.state.snackbar.message = error.response.data.message
                this.$store.state.snackbar.show = true;
            });
        },
        FetchAllLocationAddressRegion(){ // fetch region
            let payload = {
                parent_id: this.$store.getters.getParentID
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
            console.log(region_code);
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
        checkingmunicipality(municipality_city){
            console.log(municipality_city);
        },
        changeStatusDialogSave(status){
            this.saveconfirmation = status;
        },
        changeStatusDialogEdit(status){
            this.editconfirmation = status;
        },
        FetchAllSchedule(){ // fetch schedule
            let payload = {
                parent_id: this.$store.getters.getParentID
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
        UpdateSchedule(other_information_id, user_id,schedule_id){ // fetch schedule info for update
            console.log(other_information_id, user_id,schedule_id)
            this.forUpdateSched = {
                other_information_id: other_information_id,
                user_id : user_id,
                schedule_id: schedule_id,
            }
            this.editconfirmation = true
        },
        confirmUpdate(){ // update schedule
        let payload = {
            id: this.forUpdateSched['other_information_id'],
            user_id: this.forUpdateSched['user_id'],
            schedule_id: this.forUpdateSched['schedule_id'],
        }
        userotherinformationservices.UpdateUserOtherInformationSchedule(payload, this.$store.getters.getAccessToken).catch(error =>{
            this.$store.state.snackbar.message = error.response.data.message;
            this.$store.state.snackbar.show = true;
        });

        this.$store.state.snackbar.message = 'Schedule has been updated.';
        this.$store.state.snackbar.show = true;
        this.FetchAllUser();
        this.editconfirmation = false
        },
        strPad(str){
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
    },
}
</script>

<style scoped>
input[type=checkbox] {
accent-color: orange;
}
</style>