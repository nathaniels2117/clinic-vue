<template>
    <v-container style="max-width: 95%; position: relative;" >
        <v-row>
            <v-col cols="15">
                <v-card
                    :loading="loading"
                >
                    <!-- Employee information form registration -->
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
                                                v-model="user_information_data.suffix"
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
                                                :rules="[v => !!v || 'Gender is required']"
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
                                                :rules="[v => !!v || 'Marital Status is required']"
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
                                                :rules="[v => !!v || 'Country is required']"
                                                @change="FetchAllLocationAddressProvince(user_information_data.country.value), user_information_data.province='', user_information_data.city_municipality=''"
                                                label="Country *"
                                            ></v-combobox>
                                        </div>
                                        <div class="col-sm-4 pt-0 mt-0 pb-0 mb-0">
                                            <v-combobox
                                                :disabled="foreditstatusdisable"
                                                color="orange"
                                                :outlined="foreditstatus"
                                                :items="province_information"
                                                v-model="user_information_data.province"
                                                :readonly="user_information_data.region == ''"
                                                :rules="[v => !!v || 'State is required']"
                                                @change="FetchAllLocationAddressMunicipality(user_information_data.province.code), user_information_data.city_municipality=''"
                                                label="State"
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
                                                :rules="[v => !!v || 'City is required']"
                                                label="City *"
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
                                                :outlined="foreditstatus"
                                                color="orange"
                                                v-model="user_information_data.email"
                                                label="Email *"
                                                :rules="[v => !!v || 'E-mail is required']"
                                            ></v-text-field>
                                        </div>
                                        <div class="col-sm-3 pt-0 mt-0 pb-0 mb-0">
                                            <v-text-field
                                                :disabled="foreditstatusdisable"
                                                :outlined="foreditstatus"
                                                color="orange"
                                                v-model="user_information_data.mobile_number"
                                                :rules="[v => !!v || 'Mobile Number is required']"
                                                label="Mobile Number *"
                                            ></v-text-field>
                                        </div>
                                        <div class="col-sm-3 pt-0 mt-0 pb-0 mb-0">
                                            <v-text-field
                                                :disabled="foreditstatusdisable"
                                                color="orange"
                                                :outlined="foreditstatus"
                                                v-model="user_information_data.work_phone"
                                                label="Work Phone"
                                            ></v-text-field>
                                        </div>
                                        <div class="col-sm-3 pt-0 mt-0 pb-0 mb-0">
                                            <v-text-field
                                                :disabled="foreditstatusdisable"
                                                color="orange"
                                                :outlined="foreditstatus"
                                                v-model="user_information_data.home_phone"
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
                                        @click="valid == false ? validationfalse() : changeStatusDialogSave(true)"
                                        >
                                            Register
                                        </v-btn>
                                    </div>
                                </v-col>
                            </v-col>
                        </v-card-text>
                    </v-form>
                    <!-- Employee information form registration -->
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
                            Register
                    </v-card-title>
                    <v-card-text>Are you sure you want to register ?</v-card-text>
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
    import divisionservices from '../services/divisionservices';
    import roleservices from '../services/roleservices';
    import branchservices from '../services/branchservices';
    import registerservices from '../services/registerservices';
    import scheduleservices from '../services/scheduleservices';
    import locationaddressservicesoutside from '../services/locationaddressservicesoutside';
    import resourcesservice from '../services/resourcesservices';

    export default {
    name: 'EmployeeInformation',
    data: () => ({
        maxdate: '',
        hidebutton: 1,
        foreditstatus: true,
        foreditstatusdisable: false,
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
        },
        saveconfirmation: false,
        loader: false,
    }),
    created(){
        this.$store.state.header = false;
        this.$store.state.footer = false;
        this.$store.state.snackbar.color = 'orange';
        this.FetchAllLocationAddressRegion();
        this.FetchWorldInformation();
        this.$store.state.isChat = 1
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
        fetchDivisionInformation(){ // fetch division
            let payload = {
                user_id: this.$route.params.parent_id
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
                user_id: this.$route.params.parent_id
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
            user_id: this.$route.params.parent_id
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
        SaveorUpdate(){ // save register employee information confirmation
            let val = this.$refs.form.validate();
            this.saveconfirmation = false;

            if(val){
                if(this.valid == true){
                    console.log('hahahha');
                    this.SaveEmployeeInformation()
                }
            }
        },
        SaveEmployeeInformation(){ // save register employee information
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
            flag : 0,
            is_parent : 0,
            parent_id : this.$route.params.parent_id,
            // user_personal_information_table
            firstname : this.user_information_data.firstname,
            middlename : this.user_information_data.middlename,
            lastname : this.user_information_data.lastname,
            suffix : this.user_information_data.suffix,
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
        };
        console.log(payload);
        registerservices.RegisterEmployee(payload, this.$store.getters.getAccessToken).then(response => {
            if(response.data.success){
                this.$router.push('/successregisteremployee');
            }
        }).catch(error =>{ 
            console.log(error.response.data);
            this.$store.state.snackbar.message = error.response.data.message
            this.$store.state.snackbar.show = true;
        });
        },
        validationfalse(){
            this.$refs.form.validate()
        },
        hehehehe(){
            this.$refs.form.resetValidation();
        },
        FetchAllLocationAddressRegion(){ // fetch region
            let payload = {
                user_id: this.$route.params.parent_id
            };
            locationaddressservicesoutside.FetchAllLocationAddressRegion(payload).then(response => {
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
            locationaddressservicesoutside.FetchAllLocationAddressProvince(payload, this.$store.getters.getAccessToken).then(response => {
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
            locationaddressservicesoutside.FetchAllLocationAddressMunicipality(payload, this.$store.getters.getAccessToken).then(response => {
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
        mucinipality_checking(municipality_city){
            console.log(municipality_city);
        },
        changeStatusDialogSave(status){
            this.saveconfirmation = status;
        },
        FetchAllSchedule(){ // fetch schedule
            let payload = {
                user_id: this.$route.params.parent_id
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
                    console.log(response.data.data);
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
    }
}
</script>

<style scoped>

</style>
