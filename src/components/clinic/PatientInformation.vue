<template>
    <v-container style="max-width: 95%; position: relative;">
        <v-row>
            <v-col cols="12">
                <v-card :loading="loading">
                    <v-card-text>
                        <!-- One liner filtering -->
                        <template>
                            <v-toolbar dense style="">
                                <v-row>
                                    <v-col cols="12">
                                        <v-text-field v-model="search" append-icon="mdi-magnify" placeholder="Search"
                                            hide-details color="purple" overflow solo dense
                                            style="min-width: 60px;"></v-text-field>
                                    </v-col>
                                </v-row>
                                &nbsp;
                                <template v-if="$vuetify.breakpoint.mdAndUp">
                                    <div class="text-center">
                                        <v-menu v-model="menucolumn" :close-on-content-click="false" :nudge-width="60"
                                            :nudge-left="60" offset-y>
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-btn color="purple" dark v-bind="attrs" v-on="on">
                                                    <v-icon>mdi-view-column</v-icon>Column
                                                </v-btn>
                                            </template>

                                            <v-card style="padding-top:10px;min-width:50px;">
                                                <v-list>
                                                    <ul>
                                                        <div v-for="(item, index) in headers" :key="index">
                                                            <input type="checkbox" :id="item.text" :value="item"
                                                                v-model="selectedHeaders">
                                                            &nbsp;<label :for="item.text">{{ item.text }}</label>
                                                        </div>
                                                    </ul>
                                                </v-list>
                                            </v-card>
                                        </v-menu>
                                    </div>
                                </template>

                                <template v-if="$vuetify.breakpoint.smAndDown">
                                    <div class="text-center">
                                        <v-menu v-model="menucolumn" :close-on-content-click="false" :nudge-width="100"
                                            :nudge-left="100" offset-y>
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-btn color="purple" dark v-bind="attrs" v-on="on">
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
                                                            <input type="checkbox" :id="item.text" :value="item"
                                                                v-model="selectedHeaders">
                                                            &nbsp;<label :for="item.text">{{ item.text }}</label>
                                                        </div>
                                                    </ul>
                                                </v-list>
                                            </v-card>
                                        </v-menu>
                                    </div>
                                </template>
                                &nbsp;
                                <template v-if="$vuetify.breakpoint.mdAndUp">
                                    <!-- val access sample
                                    <v-btn dark medium color="purple" elevation="2" v-if="$store.getters.valAccess(147)"
                                        @click="CreatePatient('create')">
                                        <v-icon>mdi-plus</v-icon>Create
                                    </v-btn>
                                    -->
                                    <v-btn dark medium color="purple" elevation="2" @click="CreatePatient('create')">
                                        <v-icon>mdi-plus</v-icon>Create
                                    </v-btn>
                                </template>

                                <template v-if="$vuetify.breakpoint.smAndDown">
                                    <v-btn dark medium color="purple" elevation="2" @click="CreatePatient('create')">
                                        <v-icon>mdi-plus</v-icon>
                                    </v-btn>
                                </template>
                            </v-toolbar>
                        </template>
                        <!-- One liner filtering -->
                        <br>
                        <v-row justify="center" v-if="prodApp == 'listpatient'">
                            <v-col cols="12">
                                <center>
                                    <!-- Data table list of patient -->
                                    <v-data-table :headers="showHeaders" :items="listpatientdata" :search="search"
                                        align="center" :page.sync="page" must-sort :sort-by.sync="sortBy"
                                        :sort-desc.sync="sortDesc" @page-count="pageCount = $event" :footer-props="{
                                            'items-per-page-options': [10],
                                            'disable-items-per-page': true,
                                        }">
                                        <template v-slot:item.email_verified_at="props">
                                            <div class="text-center">
                                                <v-chip outlined class="ma-2" color="red"
                                                    v-if="props.item.email_verified_at == null">
                                                    Not Verified
                                                </v-chip>
                                                <v-chip outlined class="ma-2" color="success" v-else>
                                                    Verified
                                                </v-chip>
                                            </div>
                                        </template>
                                        <template v-slot:item.address="{ item }">
                                            {{ item.address }}, {{ item.city_info?.name }}, {{ item.state_info?.name }},
                                            {{ item.country_info?.name }}
                                        </template>
                                        <template v-slot:item.birth_date="{ item }">
                                            {{ formatDate(item.birth_date) }}
                                        </template>
                                        <template v-slot:item.action="props">
                                            <v-btn elevation="2" class="mx-2" dark small outlined color="purple"
                                                @click="UpdatePatient(props.item.id, 'edit')">
                                                <v-icon small>
                                                    mdi-file-edit-outline
                                                </v-icon>
                                                Edit
                                            </v-btn>
                                        </template>
                                    </v-data-table>
                                    <!-- Data table list of patient -->
                                    <v-pagination color="purple" v-model="page" :length="pageCount"></v-pagination>
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
                <v-dialog v-model="listempdialog" max-width="65%">
                    <v-card>
                        <v-card tile color="purple">
                            <template>
                                <v-toolbar color="purple" height="50px">
                                    <v-toolbar-title class="white--text flex text-center">{{ title_profile
                                        }}</v-toolbar-title>
                                    <div class="text-right">
                                        <v-icon medium color="white" class="white--text" block
                                            @click="listempdialog = false, hehehehe()">
                                            mdi-close
                                        </v-icon>
                                    </div>
                                </v-toolbar>
                            </template>
                        </v-card>
                        <v-form ref="form" v-model="valid" lazy-validation>

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
                                            <div class="col-sm-3 pt-0 mt-0 pb-0 mb-0">
                                                <v-text-field outlined color="purple"
                                                    v-model="patient_information_data.firstname" label="First Name *"
                                                    :rules="[v => !!v || 'First Name is required']"></v-text-field>
                                            </div>
                                            <div class="col-sm-3 pt-0 mt-0 pb-0 mb-0">
                                                <v-text-field outlined color="purple"
                                                    v-model="patient_information_data.middlename"
                                                    label="Middle Name"></v-text-field>
                                            </div>
                                            <div class="col-sm-3 pt-0 mt-0 pb-0 mb-0">
                                                <v-text-field outlined color="purple"
                                                    v-model="patient_information_data.lastname" label="Last Name *"
                                                    :rules="[v => !!v || 'Last Name is required']"></v-text-field>
                                            </div>
                                            <div class="col-sm-3 pt-0 mt-0 pb-0 mb-0">
                                                <v-text-field outlined color="purple"
                                                    v-model="patient_information_data.suffix"
                                                    label="Suffix"></v-text-field>
                                            </div>
                                        </v-row>
                                        <v-row class="pt-0 mt-0 pb-0 mb-0">
                                            <div class="col-sm-4 pt-0 mt-0 pb-0 mb-0">
                                                <v-menu v-model="menubirthdate" color="purple"
                                                    :close-on-content-click="false" :nudge-right="40"
                                                    transition="scale-transition" min-width="auto">
                                                    <template v-slot:activator="{ on, attrs }">
                                                        <v-text-field color="purple"
                                                            v-model="patient_information_data.birth_date"
                                                            label="Birthdate *" readonly outlined
                                                            :rules="[v => !!v || 'Birthdate is required']"
                                                            v-bind="attrs" v-on="on"></v-text-field>
                                                    </template>
                                                    <v-date-picker v-model="patient_information_data.birth_date"
                                                        color="purple" @input="menubirthdate = false"
                                                        :max="maxdate"></v-date-picker>
                                                </v-menu>
                                            </div>
                                            <div class="col-sm-4 pt-0 mt-0 pb-0 mb-0">
                                                <v-combobox outlined color="purple"
                                                    v-model="patient_information_data.gender" :items="gendercombobox"
                                                    label="Gender  *" :rules="[validateGender]"></v-combobox>
                                            </div>
                                            <div class="col-sm-4 pt-0 mt-0 pb-0 mb-0">
                                                <v-combobox outlined color="purple"
                                                    v-model="patient_information_data.civil_status"
                                                    :items="maritalstatuscombobox" label="Marital Status  *"
                                                    :rules="[validateMaritalStatus]"></v-combobox>
                                            </div>
                                        </v-row>
                                        <v-row class="pt-0 mt-0 pb-0 mb-0">
                                            <div class="col-sm-3 pt-0 mt-0 pb-0 mb-0">
                                                <v-text-field outlined color="purple"
                                                    v-model="patient_information_data.height" label="Height">
                                                </v-text-field>
                                            </div>
                                            <div class="col-sm-3 pt-0 mt-0 pb-0 mb-0">
                                                <v-text-field outlined color="purple"
                                                    v-model="patient_information_data.weight" label="Weight">
                                                </v-text-field>
                                            </div>
                                            <div class="col-sm-3 pt-0 mt-0 pb-0 mb-0">
                                                <v-combobox outlined color="purple"
                                                    v-model="patient_information_data.blood_type"
                                                    :items="bloodtypecombobox" label="Blood Type"
                                                    :rules="[validateBloodType]">
                                                </v-combobox>
                                            </div>
                                            <div class="col-sm-3 pt-0 mt-0 pb-0 mb-0">
                                                <v-text-field outlined color="purple"
                                                    v-model="patient_information_data.mobile_number"
                                                    v-mask="phonecodemask"
                                                    :rules="[v => !!v || 'Mobile Number is required']"
                                                    label="Mobile Number  *"></v-text-field>
                                            </div>
                                        </v-row>
                                        <v-row class="pt-0 mt-0 pb-0 mb-0">
                                            <div class="col-sm-12 pt-0 mt-0 pb-0 mb-0">
                                                <v-text-field outlined color="purple"
                                                    v-model="patient_information_data.address" label="Address *"
                                                    :rules="[v => !!v || 'Address is required']"></v-text-field>
                                            </div>
                                        </v-row>
                                        <v-row class="pt-0 mt-0 pb-0 mb-0">
                                            <div class="col-sm-4 pt-0 mt-0 pb-0 mb-0">
                                                <v-combobox outlined color="purple"
                                                    v-model="patient_information_data.country_id"
                                                    :items="country_information" label="Country  *"
                                                    :rules="[v => !!v || 'Country is required']" disabled>
                                                </v-combobox>
                                            </div>
                                            <div class="col-sm-4 pt-0 mt-0 pb-0 mb-0">
                                                <v-combobox outlined color="purple" :items="state_information"
                                                    v-model="patient_information_data.state_id"
                                                    :readonly="patient_information_data.country_id == ''"
                                                    :rules="[validateState]"
                                                    @change="FetchStateCitiesInformation(patient_information_data.state_id.value)"
                                                    label="Province  *"></v-combobox>
                                            </div>
                                            <div class="col-sm-4 pt-0 mt-0 pb-0 mb-0">
                                                <v-combobox outlined color="purple" :items="cities_information"
                                                    :rules="[validateCity]"
                                                    :readonly="patient_information_data.state_id == ''"
                                                    v-model="patient_information_data.city_id" label="City *">
                                                </v-combobox>
                                            </div>
                                        </v-row>
                                        <v-row class="pt-0 mt-0 pb-0 mb-0">
                                            <div class="col-sm-12 pt-0 mt-0 pb-0 mb-0">
                                                <v-btn color="purple" width="100" outlined block class="white--text"
                                                    @click="valid == false ? validationfalse() : changeStatusDialogSave(true)">
                                                    {{ listpatientinformationdialoglabel }}
                                                </v-btn>
                                            </div>
                                        </v-row>
                                    </v-col>
                                </v-col>
                            </v-card-text>
                        </v-form>
                    </v-card>
                </v-dialog>
            </v-row>
        </template>
        <!-- Dialog add form -->

        <!-- Dialog edit confirmation -->
        <v-row justify="center">
            <v-dialog persistent :retain-focus="false" v-model="editconfirmation" max-width="290">
                <v-card>
                    <v-card-title class="text-h5">
                        Edit
                    </v-card-title>
                    <v-card-text>Are you sure you want to update?</v-card-text>
                    <center>
                        <v-btn elevation="2" class="mx-2" dark outlined small color="red"
                            @click="changeStatusDialogEdit(false)">
                            Cancel
                        </v-btn>
                        <v-btn elevation="2" class="mx-2" dark outlined small color="purple" @click="confirmUpdate()">
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
            <v-dialog persistent :retain-focus="false" v-model="saveconfirmation" max-width="290">
                <v-card>
                    <v-card-title class="text-h5">
                        {{ listpatientinformationdialoglabel }}
                    </v-card-title>
                    <v-card-text>Are you sure you want to {{ listpatientinformationdialoglabel }} ?</v-card-text>
                    <center>
                        <v-btn elevation="2" class="mx-2" dark outlined small color="red"
                            @click="changeStatusDialogSave(false)">
                            Cancel
                        </v-btn>
                        <v-btn elevation="2" class="mx-2" dark outlined small color="purple" @click="SaveorUpdate()">
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
import resourcesservice from '../services/resourcesservices';
import patientinformationservices from '../services/patientinformationservices';

export default {
    name: 'PatientInformation',
    data: () => ({
        phonecodemask: '+639#########',
        sortBy: 'firstname',
        sortDesc: false,
        menucolumn: false,
        page: 1,
        pageCount: 0,
        search: '',
        maxdate: '',
        valid: false,
        loading: false,
        prodApp: "listpatient",
        listpatientdata: [],
        listempdialog: false,
        menubirthdate: false,
        gendercombobox: ['Male', 'Female'],
        maritalstatuscombobox: ['Single', 'Married', 'Divorced', 'Separated', 'Widowed'],
        bloodtypecombobox: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        emailreadonly: 'edit',
        listpatientinformationdialoglabel: 'Save',
        title_profile: 'Add Patient Profile',
        patient_information_data: {
            firstname: '',
            lastname: '',
            middlename: '',
            suffix: '',
            mobile_number: '',
            birth_date: '',
            gender: '',
            civil_status: '',
            height: '',
            weight: '',
            blood_type: '',
            state_id: [],
            country_id: [],
            city_id: [],
            address: '',
            profile_picture: '',
        },
        headers: [],
        selectedHeaders: [],
        headersMap: [
            { text: 'First Name', value: 'firstname', sortable: true, width: '130px' },
            { text: 'Middle Name', value: 'middlename', sortable: true, width: '130px' },
            { text: 'Last Name', value: 'lastname', sortable: true, width: '130px' },
            { text: 'Suffix', value: 'suffix', sortable: false },
            { text: 'Birthdate', value: 'birth_date', sortable: true, width: '120px' },
            { text: 'Gender', value: 'gender', sortable: true, width: '90px' },
            { text: 'Marital Status', value: 'civil_status', sortable: false, width: '110px' },
            { text: 'Height', value: 'height', sortable: false },
            { text: 'Weight', value: 'weight', sortable: false },
            { text: 'Blood Type', value: 'blood_type', width: '50px', sortable: false },
            { text: 'Mobile Number', value: 'mobile_number', width: '140px', sortable: false },
            { text: 'Address', value: 'address', width: '250px', sortable: false },
            { text: 'Action', value: 'action', sortable: false }
        ],
        saveconfirmation: false,
        editconfirmation: false,
        country_information: [],
        state_information: [],
        cities_information: [],
        patien_information: [],
    }),
    created() {
        this.$store.state.header = false;
        this.$store.state.footer = false;
        this.$store.state.snackbar.color = 'purple';
        this.FetchAllPatientInformation();
        this.patient_information_data.country_id = {
            text: "🇵🇭 Philippines",
            value: 174,
            phone_code: "+63"
        };
        this.FetchCountryStateInformation();
        this.headers = Object.values(this.headersMap);
        this.selectedHeaders = this.headers;
    },
    mounted() {
        this.$store.state.title = "Patient Information"
        var selDate = new Date()
        var today = new Date(selDate + 2 * 24 * 60 * 60 * 1000);
        var date = today.getDate()
        var month = today.getMonth()
        var year = today.getFullYear()
        this.maxdate = year + "-" + this.strPad((month + 1)) + "-" + this.strPad((date));
    },
    computed: {
        showHeaders() {
            return this.headers.filter(s => this.selectedHeaders.includes(s));
        }
    },
    methods: {
        FetchAllPatientInformation() {
            let payload = {
                parent_id: this.$store.getters.getParentID
            };
            patientinformationservices.FetchAllPatientInformation(payload, this.$store.getters.getAccessToken).then(response => {
                if (response.data.success) {
                    this.listpatientdata = response.data.data;
                }
            }).catch(error => console.log(error));
        },
        FetchWorldInformation() {
            this.country_information = [];
            let payload = {
                country_code: process.env.VUE_APP_WEB_COUNTRY_CODE
            };

            resourcesservice.fetchWorldInformation(payload).then(response => {
                if (response.data.success) {
                    response.data.result.forEach((value) => {
                        this.country_information.push({
                            text: value.emoji + ' ' + value.name,
                            value: value.id,
                            phone_code: value.phonecode
                        });
                    });
                }
            }).catch(error => console.log(error));
        },
        FetchCountryStateInformation() {
            this.patient_information_data.state_id = '';
            this.patient_information_data.city_id = '';
            this.state_information = [];
            let payload = {
                country_id: this.patient_information_data.country_id.value
            };

            resourcesservice.fetchStateInformation(payload).then(response => {
                if (response.data.success) {
                    response.data.result.forEach((value) => {
                        this.state_information.push({
                            text: value.name,
                            value: value.id
                        });
                    });
                }
            }).catch(error => console.log(error));
        },
        FetchStateCitiesInformation() {
            this.patient_information_data.city_id = '';
            this.cities_information = [];
            let payload = {
                state_id: this.patient_information_data.state_id.value
            };

            resourcesservice.fetchCitiesInformation(payload).then(response => {
                if (response.data.success) {
                    response.data.result.forEach((value) => {
                        this.cities_information.push({
                            text: value.name,
                            value: value.id
                        });
                    });
                }
            }).catch(error => console.log(error));
        },
        validateState(value) {
            if (!value) return 'Province is required';

            if (typeof value === 'object' && value.value) return true;

            const exists = this.state_information.find(item => item.text === value);
            if (!exists) return 'Please select a valid province from the list';

            return true;
        },
        validateCity(value) {
            if (!value) return 'City is required';

            if (typeof value === 'object' && value.value) return true;

            const exists = this.cities_information.find(item => item.text === value);
            if (!exists) return 'Please select a valid city from the list';

            return true;
        },
        validateGender(value) {
            if (typeof value === 'object' && value.value) return true;

            const exists = this.gendercombobox.find(item => item === value);
            if (!exists) return 'Please select a valid gender from the list';

            return true;
        },
        validateMaritalStatus(value) {
            if (typeof value === 'object' && value.value) return true;

            const exists = this.maritalstatuscombobox.find(item => item === value);
            if (!exists) return 'Please select a valid marital status from the list';

            return true;
        },
        validateBloodType(value) {
            if (typeof value === 'object' && value.value) return true;

            const exists = this.bloodtypecombobox.find(item => item === value);
            if (!exists) return 'Please select a valid blood type from the list';

            return true;
        },
        SavePatientInformation() { // save patient information
            let loader = this.$loading.show();
            let payload = {
                parent_id: this.$store.getters.getParentID,
                firstname: this.patient_information_data.firstname,
                lastname: this.patient_information_data.lastname,
                middlename: this.patient_information_data.middlename,
                suffix: this.patient_information_data.suffix,
                mobile_number: this.patient_information_data.country_id != this.patient_information_data.mobile_number ? this.patient_information_data.mobile_number : '',
                birth_date: this.patient_information_data.birth_date,
                gender: this.patient_information_data.gender,
                civil_status: this.patient_information_data.civil_status,
                height: this.patient_information_data.height,
                weight: this.patient_information_data.weight,
                blood_type: this.patient_information_data.blood_type,
                state_id: this.patient_information_data.state_id.value,
                country_id: this.patient_information_data.country_id.value,
                city_id: this.patient_information_data.city_id.value,
                address: this.patient_information_data.address
            };
            console.log(payload);
            patientinformationservices.SavePatientInformation(payload, this.$store.getters.getAccessToken).then(response => {
                if (response.data.success) {
                    loader.hide();
                    this.$store.state.snackbar.message = 'Patient Information have been created.';
                    this.$store.state.snackbar.show = true;
                    this.FetchAllPatientInformation();
                    this.Clear();
                    this.listempdialog = false
                    this.$refs.form.resetValidation();
                    this.$store.state.snackbar.colors = 'xgreen';
                    this.$store.state.snackbar.icon = "mdi-check-circle-outline";
                }
            }).catch(error => {
                loader.hide();
                console.log(error.response.data);
                this.$store.state.snackbar.colors = 'xred';
                this.$store.state.snackbar.icon = "mdi-alert-outline";
                this.$store.state.snackbar.message = error.response.data.message
                this.$store.state.snackbar.show = true;
            });
        },
        GetPatientInformation(id) { // get patient information
            let payload = {
                id: id,
            };
            patientinformationservices.GetPatientInformation(payload, this.$store.getters.getAccessToken).then(response => {
                if (response.data.success) {
                    console.log(response.data.data)
                    this.patien_information = response.data.data;
                    this.patient_information_data.firstname = this.patien_information.firstname,
                    this.patient_information_data.lastname = this.patien_information.lastname,
                    this.patient_information_data.middlename = this.patien_information.middlename,
                    this.patient_information_data.suffix = this.patien_information.suffix,
                    this.patient_information_data.mobile_number = this.patien_information.mobile_number,
                    this.patient_information_data.birth_date = this.patien_information.birth_date,
                    this.patient_information_data.gender = this.patien_information.gender,
                    this.patient_information_data.civil_status = this.patien_information.civil_status,
                    this.patient_information_data.height = this.patien_information.height,
                    this.patient_information_data.weight = this.patien_information.weight,
                    this.patient_information_data.blood_type = this.patien_information.blood_type,
                    this.patient_information_data.state_id = {
                        text: this.patien_information.state_info.name,
                        value: this.patien_information.state_info.id
                    },
                    //this.patient_information_data.country_id = '',
                    this.patient_information_data.city_id = {
                        text: this.patien_information.city_info.name,
                        value: this.patien_information.city_info.id
                    },
                    this.patient_information_data.address = this.patien_information.address,
                    this.patient_information_data.profile_picture = this.patien_information.profile_picture
                    this.hehehehe();
                }
            }).catch(error => console.log(error));
        },
        UpdatePatientInformation() { // update patient information
            let payload = {
                id: this.forUpdate.id,
                parent_id: this.$store.getters.getParentID,
                firstname: this.patient_information_data.firstname,
                lastname: this.patient_information_data.lastname,
                middlename: this.patient_information_data.middlename,
                suffix: this.patient_information_data.suffix,
                mobile_number: this.patient_information_data.country_id != this.patient_information_data.mobile_number ? this.patient_information_data.mobile_number : '',
                birth_date: this.patient_information_data.birth_date,
                gender: this.patient_information_data.gender,
                civil_status: this.patient_information_data.civil_status,
                height: this.patient_information_data.height,
                weight: this.patient_information_data.weight,
                blood_type: this.patient_information_data.blood_type,
                state_id: this.patient_information_data.state_id.value,
                country_id: this.patient_information_data.country_id.value,
                city_id: this.patient_information_data.city_id.value,
                address: this.patient_information_data.address
            };
            console.log(payload)
            patientinformationservices.UpdatePatientInformation(payload, this.$store.getters.getAccessToken).then(response => {
                if (response.data.success) {
                    this.$store.state.snackbar.message = 'Patient Information Profile has been updated.';
                    this.$store.state.snackbar.show = true;
                    this.FetchAllPatientInformation();
                    this.Clear();
                    this.listempdialog = false
                    this.$refs.form.resetValidation();
                    this.$store.state.snackbar.colors = 'xgreen';
                    this.$store.state.snackbar.icon = "mdi-check-circle-outline";
                }
            }).catch(error => {
                this.$store.state.snackbar.colors = 'xred';
                this.$store.state.snackbar.icon = "mdi-alert-outline";
                this.$store.state.snackbar.message = error.response.data.message
                this.$store.state.snackbar.show = true;
            });
        },
        Clear() {
            this.patient_information_data.firstname = '',
                this.patient_information_data.lastname = '',
                this.patient_information_data.middlename = '',
                this.patient_information_data.suffix = '',
                this.patient_information_data.mobile_number = '',
                this.patient_information_data.birth_date = '',
                this.patient_information_data.gender = '',
                this.patient_information_data.civil_status = '',
                this.patient_information_data.height = '',
                this.patient_information_data.weight = '',
                this.patient_information_data.blood_type = '',
                this.patient_information_data.state_id = '',
                //this.patient_information_data.country_id = '',
                this.patient_information_data.city_id = '',
                this.patient_information_data.address = '',
                this.patient_information_data.profile_picture = ''
        },
        UpdatePatient(id, action) { // fetch patient information for update
            this.Clear();
            if (action == 'edit') {
                this.emailreadonly = action;
            }
            this.forUpdate = {
                id: id,
            }
            this.GetPatientInformation(id);
            this.listpatientinformationdialoglabel = 'Update';
            this.title_profile = 'Update Patient Profile';
            this.listempdialog = true;
        },
        CreatePatient(action) {
            this.Clear();
            this.patient_information_data.switch_flag = true
            if (action == 'create') {
                this.emailreadonly = action;
            }
            this.listpatientinformationdialoglabel = 'Save';
            this.title_profile = 'Save Patient Profile';
            this.listempdialog = true;
            this.hehehehe();
        },
        SaveorUpdate() { // save or update of patient information
            this.$refs.form.validate()

            let val = this.$refs.form.validate();
            this.saveconfirmation = false;

            if (val) {
                if (this.valid == true) {
                    if (this.listpatientinformationdialoglabel == 'Save') {
                        this.SavePatientInformation()
                    } else {
                        this.UpdatePatientInformation()
                    }
                }
            }
        },
        validationfalse() {
            this.$refs.form.validate()
        },
        hehehehe() {
            this.$refs.form.resetValidation();
        },
        changeStatusDialogSave(status) {
            this.saveconfirmation = status;
        },
        strPad(str) {
            return (str).toString().padStart(2, '0')
        },
        formatDate(dateString) {
            const options = { month: 'short', day: 'numeric', year: 'numeric' };
            return new Date(dateString).toLocaleDateString('en-US', options);
        }
    },
}
</script>

<style scoped>
input[type=checkbox] {
    accent-color: purple;
}
</style>