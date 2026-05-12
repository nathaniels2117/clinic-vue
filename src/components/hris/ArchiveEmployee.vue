<template>
    <v-container style="max-width: 95%; position: relative;">
        <v-row>
            <v-col cols="12">
                <v-card
                    :loading="loading"
                >
                    <v-card-text>
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
                            </v-toolbar>
                        </template>
                        <br>
                        <v-row justify="center" v-if="prodApp=='listemployee'">
                            <v-col cols="12">
                                <center>
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
                                    }">
                                   
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
                                                    mdi-archive-arrow-up-outline
                                                </v-icon>
                                                Archive
                                            </v-btn>                                            
                                        </template>   
                                    </v-data-table>
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
            { text: 'Employee Id', value: 'user_other_personal_information.employee_id',sortable: true ,width: '120px'},
            { text: 'First Name', value: 'personal_information.firstname',sortable: true,width: '130px'},
            { text: 'Middle Name', value: 'personal_information.middlename',sortable: true,width: '130px'},
            { text: 'Last Name', value: 'personal_information.lastname',sortable: true,width: '130px'},
            { text: 'Suffix', value: 'personal_information.suffix',sortable: false},
            { text: 'Division', value: 'division_information.name',sortable: false},  
            { text: 'Role', value: 'role_information.name',sortable: false},  
            { text: 'Branch', value: 'branch_information.branch_name',sortable: false},
            { text: 'Mobile Number', value: 'personal_information.mobile_number',sortable: false},  
            { text: 'Email', value: 'email' ,sortable: false},  
            { text: 'Action', value: 'action' ,sortable: false}
            ],
            saveconfirmation: false,
            editconfirmation: false
      }),
      created(){
            this.$store.state.header = false;
            this.$store.state.footer = false;
            this.$store.state.snackbar.color = 'orange';
            this.FetchAllArchiveUser();
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
        FetchAllArchiveUser(){ // fetch all archive employee
            let payload = {
                parent_id: this.$store.getters.getParentID
            };
            userservices.FetchAllArchiveUser(payload, this.$store.getters.getAccessToken).then(response => {
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
        activeinactivetrigger(){ // switch active in active
            if(this.user_information_data.switch_flag ==true){
                this.activeinactive = 'Active'
            }else{
                this.activeinactive = 'Inactive'
            }
        },
        UpdateEmployee(id, action){ // Update User Information Archive
            if(action == 'edit'){
                this.emailreadonly = action;
            }
            this.forUpdate = {
                id: id,
            }
            this.listempdialoglabel = 'Archive';
            this.title_profile = 'Archive Employee Profile';
            this.saveconfirmation = true;
        },
        SaveorUpdate(){
            this.saveconfirmation = false;
            this.UpdateEmployeeInformation()
        },
        validationfalse(){
            this.$refs.form.validate()
        },
        UpdateEmployeeInformation(){ // Update User Information Archive
            let payload = {
                id : this.forUpdate.id,
            };
            userservices.ArchiveEmployee(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    this.$store.state.snackbar.message = 'Employee has been archived.';
                    this.$store.state.snackbar.colors = 'xgreen';
                    this.$store.state.snackbar.icon = "mdi-check-circle-outline";  
                    this.$store.state.snackbar.show = true;
                    this.FetchAllArchiveUser();
                    this.listempdialog = false
                }
            }).catch(error =>{ 
                this.$store.state.snackbar.colors = 'xred';
                this.$store.state.snackbar.icon = "mdi-alert-outline";               
                this.$store.state.snackbar.message = error
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
        UpdateSchedule(other_information_id, user_id,schedule_id){ // for updating of schedule
            console.log(other_information_id, user_id,schedule_id)
            this.forUpdateSched = {
                other_information_id: other_information_id,
                user_id : user_id,
                schedule_id: schedule_id,
            }
            this.editconfirmation = true
        },
        confirmUpdate(){ // for updating of schedule
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
        this.FetchAllArchiveUser();
        this.editconfirmation = false
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
    },
}
</script>

<style scoped>
  input[type=checkbox] {
  accent-color: orange;
}
</style>