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
                                <!--
                                &nbsp;
                                <template v-if="$vuetify.breakpoint.mdAndUp">
                                    <v-btn dark medium color="purple" elevation="2" @click="CreatePatientDiagnosis('create')">
                                        <v-icon>mdi-plus</v-icon>Create
                                    </v-btn>
                                </template>

                                <template v-if="$vuetify.breakpoint.smAndDown">
                                    <v-btn dark medium color="purple" elevation="2" @click="CreatePatientDiagnosis('create')">
                                        <v-icon>mdi-plus</v-icon>
                                    </v-btn>
                                </template>
                                -->
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
                                        <template v-slot:item.address="{ item }">
                                            {{ item.address }}, {{ item.city_info?.name }}, {{ item.state_info?.name }},
                                            {{ item.country_info?.name }}
                                        </template>
                                        <template v-slot:item.birth_date="{ item }">
                                            {{ formatDate(item.birth_date) }}
                                        </template>
                                        <template v-slot:item.action="props">
                                            <template v-if="$vuetify.breakpoint.xsOnly">
                                                <v-row>
                                                    <v-btn elevation="2" class="mx-2" dark small outlined color="purple"
                                                        @click="UpdatePatient(props.item, 'edit')">
                                                        <v-icon small>
                                                            mdi-file-edit-outline
                                                        </v-icon>
                                                        View
                                                    </v-btn>
                                                    <template v-if="$vuetify.breakpoint.xsOnly">
                                                        <br>&nbsp;
                                                    </template>
                                                    <v-btn elevation="2" class="mx-2" dark small outlined color="purple"
                                                        @click="CreatePatientDiagnosis(props.item, 'create')">
                                                        <v-icon small>
                                                            mdi-file-edit-outline
                                                        </v-icon>
                                                        Create Diagnosis
                                                    </v-btn>
                                                </v-row>
                                            </template>
                                            <template v-else>
                                                <div v-if="$vuetify.breakpoint.mdAndDown">
                                                    &nbsp;
                                                </div>
                                                <v-btn elevation="2" class="mx-2" dark small outlined color="purple"
                                                    @click="UpdatePatient(props.item, 'edit')">
                                                    <v-icon small>
                                                        mdi-file-edit-outline
                                                    </v-icon>
                                                    View
                                                </v-btn>
                                                <div v-if="$vuetify.breakpoint.mdAndDown">
                                                    &nbsp;
                                                </div>

                                                <v-btn elevation="2" class="mx-2" dark small outlined color="purple"
                                                    @click="CreatePatientDiagnosis(props.item, 'create')">
                                                    <v-icon small>
                                                        mdi-file-edit-outline
                                                    </v-icon>
                                                    Create Diagnosis
                                                </v-btn>
                                                <div v-if="$vuetify.breakpoint.mdAndDown">
                                                    &nbsp;
                                                </div>
                                            </template>
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
                                        <v-row>
                                            <div class="col-sm-6 pt-0 mt-0 pb-0 mb-0">
                                                <h3>Personal Information</h3>
                                            </div>
                                            <div class="col-sm-6 pt-0 mt-0 pb-0 mb-0 text-right">
                                                <h3> Date : {{ todayFormatted }}</h3>
                                            </div>
                                        </v-row>
                                    </v-col>
                                    <v-divider class="mx-2"></v-divider>
                                    <v-col class="ma-0">
                                        <v-row class="pt-0 mt-0 pb-0 mb-0">
                                            <div class="col-sm-12 pt-0 mt-0 pb-0 mb-0">
                                                <strong>Name of Patient : </strong> {{ patient_information_data.fullname
                                                }}
                                            </div>
                                        </v-row>

                                        <v-row class="pt-0 mt-0 pb-0 mb-0">
                                            <div class="col-sm-12 pt-0 mt-0 pb-0 mb-0">
                                                <strong>Address : </strong> {{ patient_information_data.fulladdress }}
                                            </div>
                                        </v-row>

                                        <v-row class="pt-0 mt-0 pb-0 mb-0">
                                            <div class="col-sm-6 pt-0 mt-0 pb-0 mb-0">
                                                <strong>Date of Birth : </strong> {{ patient_information_data.birth_date
                                                }}
                                            </div>
                                            <div class="col-sm-6 pt-0 mt-0 pb-0 mb-0">
                                                <strong>Age : </strong> {{ patient_information_data.age }}
                                            </div>
                                        </v-row>

                                        <v-row class="pt-0 mt-0 pb-0 mb-0">
                                            <div class="col-sm-6 pt-0 mt-0 pb-0 mb-0">
                                                <strong>Height : </strong> {{ patient_information_data.height }}
                                            </div>
                                            <div class="col-sm-6 pt-0 mt-0 pb-0 mb-0">
                                                <strong>Weight : </strong> {{ patient_information_data.weight }}
                                            </div>
                                        </v-row>

                                        <v-row class="pt-0 mt-0 pb-0 mb-0">
                                            <div class="col-sm-6 pt-0 mt-0 pb-0 mb-0">
                                                <strong>Gender : </strong> {{ patient_information_data.gender }}
                                            </div>
                                            <div class="col-sm-6 pt-0 mt-0 pb-0 mb-0">
                                                <strong>Civil Status : </strong> {{
                                                    patient_information_data.civil_status
                                                }}
                                            </div>
                                        </v-row>

                                        <v-row class="pt-0 mt-0 pb-0 mb-0">
                                            <div class="col-sm-6 pt-0 mt-0 pb-0 mb-0">
                                                <strong>Blood Type:</strong> {{ patient_information_data.blood_type }}
                                            </div>
                                            <div class="col-sm-6 pt-0 mt-0 pb-0 mb-0">
                                                <strong>Contact No. : </strong> {{
                                                    patient_information_data.mobile_number
                                                }}
                                            </div>
                                        </v-row>
                                    </v-col>
                                    <v-divider class="mx-2"></v-divider>
                                    <v-col class="ma-0" v-if="listpatientinformationdialoglabel === 'Save'">
                                        <v-row class="pt-0 mt-0 pb-0 mb-0">
                                            <div class="col-sm-12 pt-0 mt-0 pb-0 mb-0">
                                                <v-textarea v-model="patient_information_data.diagnosis"
                                                    label="Diagnosis / Instruction" clearable counter required
                                                    color="purple" outlined
                                                    :rules="[v => !!v || 'Diagnosis / Instruction is required']"></v-textarea>
                                            </div>
                                        </v-row>
                                        <v-row>
                                            <div class="col-sm-6">
                                                Prescriptions
                                            </div>
                                            <div class="col-sm-6 text-right">
                                                <v-btn elevation="2" class="mx-2" dark outlined small color="purple"
                                                    @click="addPrescription()">
                                                    add
                                                </v-btn>
                                            </div>
                                        </v-row>
                                        <br>
                                        <v-row class="pt-0 mt-0 pb-0 mb-0"
                                            v-for="(prescription, index) in prescriptions" :key="index">
                                            <div class="col-sm-6 pt-0 mt-0 pb-0 mb-0">
                                                <v-combobox outlined color="purple" v-model="prescription.item"
                                                    :items="pharmacyitemdata" label="Pharmacy Item"
                                                    :rules="[validatePharmacyItem]"></v-combobox>
                                            </div>
                                            <div class="col-sm-5 pt-0 mt-0 pb-0 mb-0">
                                                <v-combobox outlined color="purple" v-model="prescription.instruction"
                                                    :items="instructiondata" label="Instruction"
                                                    :rules="[validateInstruction]"></v-combobox>
                                            </div>
                                            <div class="col-sm-1 text-center ">
                                                <v-btn icon color="red" @click="removePrescription(index)">
                                                    <v-icon>mdi-delete</v-icon>
                                                </v-btn>
                                            </div>
                                        </v-row>
                                        <v-row class="pt-0 mt-0 pb-0 mb-0">
                                            <v-btn color="purple" block outlined @click="changeStatusDialogSave(true)">
                                                Create
                                            </v-btn>
                                        </v-row>
                                    </v-col>
                                    <v-col class="ma-0" v-else-if="listpatientinformationdialoglabel === 'Edit'">
                                        <v-row class="pt-0 mt-0 pb-0 mb-0">
                                            <div class="col-sm-12 pt-0 mt-0 pb-0 mb-0">
                                                <v-textarea v-model="patient_information_data.diagnosis"
                                                    label="Diagnosis / Instruction" clearable counter required
                                                    color="purple" outlined
                                                    :rules="[v => !!v || 'Diagnosis / Instruction is required']"></v-textarea>
                                            </div>
                                        </v-row>
                                        <v-row>
                                            <div class="col-sm-6">
                                                Prescriptions
                                            </div>
                                            <div class="col-sm-6 text-right">
                                                <v-btn elevation="2" class="mx-2" dark outlined small color="purple"
                                                    @click="addPrescription()">
                                                    add
                                                </v-btn>
                                            </div>
                                        </v-row>
                                        <br>
                                        <v-row class="pt-0 mt-0 pb-0 mb-0"
                                            v-for="(prescription, index) in prescriptions" :key="index">
                                            <div class="col-sm-6 pt-0 mt-0 pb-0 mb-0">
                                                <v-combobox outlined color="purple" v-model="prescription.item"
                                                    :items="pharmacyitemdata" label="Pharmacy Item"
                                                    :rules="[validatePharmacyItem]"></v-combobox>
                                            </div>
                                            <div class="col-sm-5 pt-0 mt-0 pb-0 mb-0">
                                                <v-combobox outlined color="purple" v-model="prescription.instruction"
                                                    :items="instructiondata" label="Instruction"
                                                    :rules="[validateInstruction]"></v-combobox>
                                            </div>
                                            <div class="col-sm-1 text-center ">
                                                <v-btn icon color="red" @click="removePrescription(index)">
                                                    <v-icon>mdi-delete</v-icon>
                                                </v-btn>
                                            </div>
                                        </v-row>
                                        <v-row class="pt-0 mt-0 pb-0 mb-0">
                                            <div class="col-sm-6">
                                                <v-btn color="red" block outlined
                                                    @click="listpatientinformationdialoglabel = 'View'">
                                                    Cancel
                                                </v-btn>
                                            </div>
                                            <div class="col-sm-6">
                                                <v-btn color="purple" block outlined
                                                    @click="changeStatusDialogSave(true)">
                                                    Update
                                                </v-btn>
                                            </div>
                                        </v-row>
                                    </v-col>
                                    <v-col class="ma-0" v-else>
                                        <h3 class="col-sm-12 text-center"><strong> Diagnosis / Instruction</strong>
                                        </h3>
                                        <v-row v-for="diagnosis in patient_diagnosis_information" :key="diagnosis.id"
                                            class="mb-4">
                                            <v-col cols="12">
                                                <v-row>
                                                    <div class="col-sm-6">
                                                        <p><strong>Date:</strong> {{ formatDate(diagnosis.date) }}</p>
                                                    </div>
                                                    <div class="col-sm-6 text-right">
                                                        <v-btn elevation="2" dark outlined small color="purple"
                                                            @click="printPrescription(diagnosis)">
                                                            print
                                                        </v-btn>
                                                        &nbsp;
                                                        <v-btn elevation="2" dark outlined small color="purple"
                                                            @click="editPrescription(diagnosis)">
                                                            edit
                                                        </v-btn>
                                                    </div>
                                                </v-row>
                                                <p><strong>Diagnosis:</strong> {{ diagnosis.diagnosis }}</p>
                                                <p><strong>Prescriptions:</strong></p>
                                                <ul>
                                                    <li v-for="(pres, idx) in diagnosis.prescription" :key="idx">
                                                        {{ pres.pharmacy_item_name }} – {{ pres.instruction_text }}
                                                    </li>
                                                </ul>
                                            </v-col>
                                            <v-divider class="mx-2"></v-divider>
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
import pharmacyitemservices from '../services/pharmacyitemservices';
import instructionservices from '../services/instructionservices';
import patientdiagnosisservices from '../services/patientdiagnosisservices';

export default {
    name: 'PatientDiagnosis',
    data: () => ({
        phonecodemask: '+639#########',
        sortBy: 'firstname',
        sortDesc: false,
        menucolumn: false,
        page: 1,
        pageCount: 0,
        search: '',
        maxdate: '',
        todayFormatted: '',
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
            fullname: '',
            fulladdress: '',
            age: '',
            date: '',
            diagnosis: '',
            items: '',
            instruction: '',
        },
        headers: [],
        selectedHeaders: [],
        headersMap: [
            { text: 'First Name', value: 'firstname', sortable: true, width: '130px' },
            { text: 'Middle Name', value: 'middlename', sortable: true, width: '130px' },
            { text: 'Last Name', value: 'lastname', sortable: true, width: '130px' },
            { text: 'Suffix', value: 'suffix', sortable: false },
            { text: 'Birthdate', value: 'birth_date', sortable: false, width: '120px' },
            { text: 'Mobile Number', value: 'mobile_number', width: '140px', sortable: false },
            { text: 'Gender', value: 'gender', sortable: false },
            { text: 'Action', value: 'action', sortable: false, width: '320px' }
        ],
        saveconfirmation: false,
        editconfirmation: false,
        country_information: [],
        state_information: [],
        cities_information: [],
        patien_information: [],
        pharmacyitemdata: [],
        instructiondata: [],
        prescriptions: [],
        patient_diagnosis_information: []
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
        this.FetchAllPharmacyItem();
        this.FetchAllInstruction();
        //this.FetchCountryStateInformation();
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
        const todayDate = new Date(this.maxdate);
        const options = { month: 'short', day: 'numeric', year: 'numeric' };
        this.todayFormatted = todayDate.toLocaleDateString('en-US', options);
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
        SavePatientDiagnosis() { // save patient information
            let loader = this.$loading.show();
            let payload = {
                parent_id: this.$store.getters.getParentID,
                patient_id: this.forCreateDiagnosis.id,
                date: this.maxdate,
                diagnosis: this.patient_information_data.diagnosis,
                prescription: this.prescriptions.map(p => ({
                    pharmacy_item_id: p.item.value,
                    instruction_id: p.instruction.value
                }))
            };
            patientdiagnosisservices.SavePatientDiagnosis(payload, this.$store.getters.getAccessToken).then(response => {
                if (response.data.success) {
                    loader.hide();
                    this.$store.state.snackbar.message = 'Patient Diagnosis have been created.';
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
        FetchAllPatientDiagnosisViaPatientID(id) { // get patient information
            let payload = {
                patient_id: id,
            };
            patientdiagnosisservices.FetchAllPatientDiagnosisViaPatientID(payload, this.$store.getters.getAccessToken).then(response => {
                if (response.data.success) {
                    this.patient_diagnosis_information = response.data.data;
                    this.hehehehe();
                }
            }).catch(error => console.log(error));
        },
        UpdatePatientDiagnosis() { // update patient information
            let payload = {
                id: this.forUpdate.id,
                parent_id: this.$store.getters.getParentID,
                patient_id: this.forUpdate.patient_id,
                date: this.forUpdate.date,
                diagnosis: this.patient_information_data.diagnosis,
                prescription: this.prescriptions.map(p => ({
                    pharmacy_item_id: p.item.value,
                    instruction_id: p.instruction.value
                }))
            };
            console.log(payload)
            patientdiagnosisservices.UpdatePatientDiagnosis(payload, this.$store.getters.getAccessToken).then(response => {
                if (response.data.success) {
                    this.$store.state.snackbar.message = 'Patient Diagnosis has been updated.';
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
            this.patient_information_data.fullname = '',
                this.patient_information_data.fulladdress = '',
                this.patient_information_data.birth_date = '',
                this.patient_information_data.gender = '',
                this.patient_information_data.civil_status = '',
                this.patient_information_data.height = '',
                this.patient_information_data.weight = '',
                this.patient_information_data.blood_type = '',
                this.patient_information_data.mobile_number = '',
                this.patient_information_data.diagnosis = '',
                this.prescriptions = []
        },
        UpdatePatient(item, action) { // fetch patient information for update
            this.Clear();
            this.patient_information_data.fullname =
                item.lastname + ", " +
                item.firstname + " " +
                (item.middlename ? item.middlename + " " : "") +
                (item.suffix ? item.suffix : "");
            this.patient_information_data.fulladdress =
                item.address
                + (item.city_info?.name ? `, ${item.city_info.name}` : '')
                + (item.state_info?.name ? `, ${item.state_info.name}` : '')
                + (item.country_info?.name ? `, ${item.country_info.name}` : '');

            // Birthdate (formatted)
            if (item.birth_date) {
                const birthDate = new Date(item.birth_date);
                const options = { month: 'short', day: 'numeric', year: 'numeric' };
                this.patient_information_data.birth_date = birthDate.toLocaleDateString('en-US', options);

                // Compute Age
                const today = new Date();
                let age = today.getFullYear() - birthDate.getFullYear();
                const m = today.getMonth() - birthDate.getMonth();
                if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                    age--;
                }
                this.patient_information_data.age = age;
            } else {
                this.patient_information_data.birth_date = null;
                this.patient_information_data.age = null;
            }
            this.patient_information_data.gender = item.gender;
            this.patient_information_data.civil_status = item.civil_status;
            this.patient_information_data.blood_type = item.blood_type;
            this.patient_information_data.height = item.height;
            this.patient_information_data.weight = item.weight;
            this.patient_information_data.mobile_number = item.mobile_number;
            this.patient_information_data.date = this.maxdate;

            if (action == 'edit') {
                this.emailreadonly = action;
            }
            this.forUpdate = {
                id: item.id,
            }
            this.FetchAllPatientDiagnosisViaPatientID(item.id);
            this.listpatientinformationdialoglabel = 'View';
            this.title_profile = 'Patient Diagnosis';
            this.listempdialog = true;
        },
        CreatePatientDiagnosis(item, action) {
            this.Clear();
            this.forCreateDiagnosis = {
                id: item.id,
            }
            if (action == 'create') {
                this.emailreadonly = action;
            }
            this.patient_information_data.fullname =
                item.lastname + ", " +
                item.firstname + " " +
                (item.middlename ? item.middlename + " " : "") +
                (item.suffix ? item.suffix : "");

            this.patient_information_data.fulladdress =
                item.address
                + (item.city_info?.name ? `, ${item.city_info.name}` : '')
                + (item.state_info?.name ? `, ${item.state_info.name}` : '')
                + (item.country_info?.name ? `, ${item.country_info.name}` : '');

            // Birthdate (formatted)
            if (item.birth_date) {
                const birthDate = new Date(item.birth_date);
                const options = { month: 'short', day: 'numeric', year: 'numeric' };
                this.patient_information_data.birth_date = birthDate.toLocaleDateString('en-US', options);

                // Compute Age
                const today = new Date();
                let age = today.getFullYear() - birthDate.getFullYear();
                const m = today.getMonth() - birthDate.getMonth();
                if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                    age--;
                }
                this.patient_information_data.age = age;
            } else {
                this.patient_information_data.birth_date = null;
                this.patient_information_data.age = null;
            }
            this.patient_information_data.gender = item.gender;
            this.patient_information_data.civil_status = item.civil_status;
            this.patient_information_data.blood_type = item.blood_type;
            this.patient_information_data.height = item.height;
            this.patient_information_data.weight = item.weight;
            this.patient_information_data.mobile_number = item.mobile_number;
            this.patient_information_data.date = this.maxdate;
            this.listpatientinformationdialoglabel = 'Save';
            this.title_profile = 'Diagnosis / Instruction';
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
                        this.SavePatientDiagnosis()
                    }
                    else {
                        this.UpdatePatientDiagnosis()
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
        },
        FetchAllPharmacyItem() {
            this.pharmacyitemdata = [];
            let payload = {
                parent_id: this.$store.getters.getParentID
            };
            pharmacyitemservices.FetchAllPharmacyItem(payload).then(response => {
                if (response.data.success) {
                    response.data.data.forEach((value) => {
                        this.pharmacyitemdata.push({
                            text: value.name,
                            value: value.id
                        });
                    });
                }
            }).catch(error => console.log(error));
        },
        FetchAllInstruction() {
            this.instructiondata = [];
            let payload = {
                parent_id: this.$store.getters.getParentID
            };
            instructionservices.FetchAllInstruction(payload).then(response => {
                if (response.data.success) {
                    response.data.data.forEach((value) => {
                        this.instructiondata.push({
                            text: value.instruction,
                            value: value.id
                        });
                    });
                }
            }).catch(error => console.log(error));
        },
        validatePharmacyItem(value) {
            if (!value) return 'Pharmacy Item is required';

            if (typeof value === 'object' && value.value) return true;

            const exists = this.pharmacyitemdata.find(item => item === value);
            if (!exists) return 'Please select a valid pharmacy item from the list';

            return true;
        },
        validateInstruction(value) {
            if (!value) return 'Instruction is required';

            if (typeof value === 'object' && value.value) return true;

            const exists = this.categorycombobox.find(item => item === value);
            if (!exists) return 'Please select a valid pharmacy item from the list';

            return true;
        },
        addPrescription() {
            this.prescriptions.push({ item: '', instruction: '' });
        },
        removePrescription(index) {
            this.prescriptions.splice(index, 1);
        },
        editPrescription(diagnosis) {
            console.log(diagnosis);
            this.prescriptions = [];

            this.patient_information_data.diagnosis = diagnosis.diagnosis;

            this.prescriptions = diagnosis.prescription.map(p => ({
                item: {
                    text: p.pharmacy_item_name,
                    value: p.pharmacy_item_id
                },
                instruction: {
                    text: p.instruction_text,
                    value: p.instruction_id
                }
            }));

            this.forUpdate = {
                id: diagnosis.id,
                patient_id: diagnosis.patient_id,
                date: diagnosis.date,
            };
            this.listpatientinformationdialoglabel = 'Edit';
        },

        printPrescription(diagnosis) {
            console.log(diagnosis);
            // Clear old values
            localStorage.removeItem('diagnosisForPrint');
            localStorage.removeItem('print_diagnosis');
            // Populate data
            localStorage.setItem('print_diagnosis', 0)
            this.prescriptions = diagnosis.prescription.map(p => ({
                item: { text: p.pharmacy_item_name, value: p.pharmacy_item_id },
                instruction: { text: p.instruction_text, value: p.instruction_id }
            }));
            this.patient_information_data.diagnosis = diagnosis.diagnosis;

            // Save to localStorage para ma-pass sa /printdiagnosis route
            localStorage.setItem('diagnosisForPrint', JSON.stringify(diagnosis));
            localStorage.setItem('nav_hide', 1);
            // Open print view
            const printWin = window.open("/printdiagnosis", "_blank");

            // Safeguard: reset nav_hide kapag nagsara yung print window
            const checkClosed = setInterval(() => {
                if (printWin.closed) {
                    localStorage.setItem('nav_hide', 0);
                    clearInterval(checkClosed);
                }
            }, 500);
        }

    },
}
</script>

<style scoped>
input[type=checkbox] {
    accent-color: purple;
}
</style>