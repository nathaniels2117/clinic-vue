<template>
    <v-container style="max-width: 95%; position: relative;">
        <v-row>
            <v-col cols="15">
                <v-card :loading="loading">
                    <!-- Profile Form -->
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-card-text>
                            <!-- <div class="text-right">
                                <v-icon medium color="purple" class="white--text" block v-if="hidebutton == '2'"
                                    @click="canceleditprofileto()"> 
                                    mdi-close
                                </v-icon>
                            </div>
                            <v-col sm="12" md="6" offset-md="3">
                                <center>
                                    <div v-if="profilepicture == null">
                                        <v-img src="../../assets/images/circle_wirewolf.png"
                                            class="pa-2 rounded-circle d-inline-block align-self-stretch" width="250"
                                            height="250" style="margin: 0px auto;"></v-img>
                                    </div>
                                    <div v-else>
                                        <v-img v-if="this.url == null" :src=this.image_path + profilepicture
                                            class="pa-2 rounded-circle d-inline-block align-self-stretch" width="250"
                                            height="250" style="margin: 0px auto;"></v-img>
                                        <v-img v-else :src=this.url v-model="profilepicture"
                                            class="pa-2 rounded-circle d-inline-block align-self-stretch" width="250"
                                            height="250" style="margin: 0px auto;"></v-img>
                                    </div>
                                </center>
                                <center>
                                    <v-btn @click="handleFileImport" elevation="5" icon :loading="isSelecting"
                                        class="btn-camera">
                                        <v-icon>mdi-camera</v-icon>
                                    </v-btn>
                                    <input ref="uploader" class="d-none" type="file" @change="onFileChanged">
                                </center>
                            </v-col> -->
                            <br>
                            <v-col md="12" offset-md="0" class="ma-0">
                                <v-col>
                                    <v-row>
                                        <v-col>
                                            <h3>
                                                Personal Information
                                            </h3>
                                        </v-col>
                                    </v-row>
                                </v-col>
                                <v-divider class="mx-2"></v-divider>
                                <v-col class="ma-0">
                                    <v-row class="pt-0 mt-0 pb-0 mb-0">
                                        <div class="col-sm-12 pt-0 mt-0 pb-0 mb-0">
                                            <v-text-field outlined color="purple"
                                                v-model="user_information_data.firstname" label="First Name *"
                                                :rules="[v => !!v || 'First Name is required']"></v-text-field>
                                        </div>
                                        <div class="col-sm-12 pt-0 mt-0 pb-0 mb-0">
                                            <v-text-field outlined color="purple"
                                                v-model="user_information_data.middlename"
                                                label="Middle Name"></v-text-field>
                                        </div>
                                        <div class="col-sm-12 pt-0 mt-0 pb-0 mb-0">
                                            <v-text-field outlined color="purple"
                                                v-model="user_information_data.lastname" label="Last Name *"
                                                :rules="[v => !!v || 'Last Name is required']"></v-text-field>
                                        </div>
                                        <div class="col-sm-12 pt-0 mt-0 pb-0 mb-0">
                                            <v-text-field outlined color="purple" v-model="user_information_data.suffix"
                                                label="Suffix Name"></v-text-field>
                                        </div>
                                    </v-row>
                                    <v-row class="pt-0 mt-0 pb-0 mb-0">
                                        <div class="col-sm-12 pt-0 mt-0 pb-0 mb-0">
                                            <v-menu v-model="menubirthdate" :close-on-content-click="false"
                                                color="purple" :nudge-right="40" transition="scale-transition"
                                                min-width="auto">
                                                <template v-slot:activator="{ on, attrs }">
                                                    <v-text-field v-model="user_information_data.birth_date"
                                                        label="Birthday *" color="purple" outlined v-bind="attrs"
                                                        v-on="on"
                                                        :rules="[v => !!v || 'Birthday is required']"></v-text-field>
                                                </template>
                                                <v-date-picker color="purple" v-model="user_information_data.birth_date"
                                                    @input="menubirthdate = false" :max="maxdate"></v-date-picker>
                                            </v-menu>
                                        </div>
                                        <div class="col-sm-12 pt-0 mt-0 pb-0 mb-0">
                                            <v-text-field outlined color="purple"
                                                v-model="user_information_data.mobile_number" label="Mobile Number *"
                                                v-mask="phonecodemask"
                                                :rules="[v => !!v || 'Mobile Number is required']"></v-text-field>
                                        </div>

                                    </v-row>
                                </v-col>
                                <v-col>
                                    <h3>
                                        Change Password
                                    </h3>
                                </v-col>
                                <v-divider class="mx-2"></v-divider>
                                <v-col class="ma-0">
                                    <v-row class="pt-0 mt-0 pb-0 mb-0">
                                        <div class="col-sm-4 pt-0 mt-0 pb-0 mb-0">
                                            <v-text-field v-model="current_password" color="purple"
                                                :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                                                :type="show3 ? 'text' : 'password'" name="input-10-1"
                                                label="Current Password" @click:append="show3 = !show3"
                                                outlined></v-text-field>
                                        </div>
                                        <div class="col-sm-4 pt-0 mt-0 pb-0 mb-0">
                                            <v-text-field v-model="password" color="purple"
                                                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                                :type="show1 ? 'text' : 'password'" name="input-10-1"
                                                label="New Password"
                                                :rules="[(password === confirm_password) || 'The new password and confirmation password do not match' || (password && password.length >= 6) || 'minimum 6 characters']"
                                                @click:append="show1 = !show1" outlined></v-text-field>
                                        </div>
                                        <div class="col-sm-4 pt-0 mt-0 pb-0 mb-0">
                                            <v-text-field v-model="confirm_password" color="purple"
                                                :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                                                :type="show2 ? 'text' : 'password'" name="input-10-1"
                                                label="Confirm New Password"
                                                :rules="[(password === confirm_password) || 'The confirmation password and new password do not match' || (confirm_password && confirm_password.length >= 6) || 'minimum 6 characters']"
                                                @click:append="show2 = !show2" outlined></v-text-field>
                                        </div>
                                    </v-row>
                                </v-col>
                                <v-col class="ma-0">
                                    <div class="text-right">
                                        <v-btn color="purple" class="white--text" outlined block
                                            @click="valid == false ? validationfalse() : changeStatusDialogSave(true)">
                                            {{ listempdialoglabel }}
                                        </v-btn>
                                    </div>
                                </v-col>
                            </v-col>
                        </v-card-text>
                    </v-form>
                    <!-- Profile Form -->
                </v-card>
            </v-col>
        </v-row>

        <!-- Dialog box for Save/Update Confirmation -->
        <v-row justify="center">
            <v-dialog persistent :retain-focus="false" v-model="saveconfirmation" max-width="290">
                <v-card>
                    <v-card-title class="text-h5">
                        {{ listempdialoglabel }}
                    </v-card-title>
                    <v-card-text>Are you sure you want to {{ listempdialoglabel }} ?</v-card-text>
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
        <!-- Dialog box for Save/Update Confirmation -->

        <!-- Dialog box for System Message -->
        <v-row justify="center">
            <v-dialog persistent :retain-focus="false" v-model="systemmessagedialog" max-width="290">
                <v-card>
                    <v-card-title class="text-h6">
                        System Message
                    </v-card-title>
                    <v-card-text>Profile has been updated.</v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="purple" text class="white--text" @click="systemmessagedialog = false">
                            Close
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>
        <!-- Dialog box for System Message -->
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

export default {
    name: 'EmployeeInformation',
    data: () => ({
        phonecodemask: '+639#########',
        employee_id: '',
        image_path: [],
        old_password: '',
        new_password: '',
        old_pin: '',
        new_pin: '',
        current_pin: '',
        pin: '',
        confirm_pin: '',
        show4: false,
        show5: false,
        show6: false,
        current_password: '',
        password: '',
        confirm_password: '',
        show1: false,
        show2: false,
        show3: false,
        profilepicture: '',
        isSelecting: false,
        selectedFile: null,
        url: null,
        maxdate: '',
        hidebutton: 1,
        systemmessagedialog: false,
        foreditstatus: true,
        foreditstatusdisable: false,
        forupdateyes: false,
        valid: false,
        menudatehired: false,
        menubirthdate: false,
        activeinactive: 'Active',
        gendercombobox: ['Male', 'Female'],
        countrycombobox: ['Philippines'],
        maritalstatuscombobox: ['Single', 'Married', 'Divorced', 'Separated', 'Widowed'],
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
            region: '',
            zip_code: '',
            email: '',
            mobile_number: '',
            work_phone: '',
            home_phone: '',
            schedule_id: '',
            pin: '',
        },
        saveconfirmation: false,
        loader: false,
        hrisdata: 0,
    }),
    created() {
        this.hrisdata = localStorage.getItem('is_hris')
        if (this.hrisdata == 1) {
            this.$store.state.header = false;
            this.$store.state.footer = false;
        } else {
            this.$store.state.header = true;
            this.$store.state.footer = true;
        }
        this.$store.state.snackbar.color = 'purple';
        this.GetUser();
        if (!this.$store.getters.valAccess(229)) {
            this.foreditstatus = false,
                this.foreditstatusdisable = true
        }
    },
    mounted() {
        this.$store.state.title = "My Profile";

        var selDate = new Date()
        var today = new Date(selDate + 2 * 24 * 60 * 60 * 1000);
        var date = today.getDate()
        var month = today.getMonth()
        var year = today.getFullYear()
        this.maxdate = year + "-" + this.strPad((month + 1)) + "-" + this.strPad((date));
    },
    methods: {
        GetUser() { // get user information
            let payload = {
                id: this.$store.getters.getUserID,
                user_id: this.$store.getters.getUserID,
            };
            userservices.GetUser(payload, this.$store.getters.getAccessToken).then(response => {
                if (response.data.success) {
                    this.user_information = response.data.data;
                    this.employee_id = this.user_information.user_other_personal_information.employee_id
                    this.image_path = response.data.image_path;

                    if (this.user_information.email_verified_at) {
                        this.status_email_verify = 'Email Verified',
                            this.icon_email_verify = 'mdi-checkbox-marked-circle';
                        this.btncolor_email_verify = 'purple'
                    } else {
                        this.status_email_verify = 'Email Not Verified',
                            this.icon_email_verify = 'mdi-cancel',
                            this.btncolor_email_verify = 'red'
                    }
                    if (this.user_information.flag) {
                        this.user_information_data.switch_flag = true;
                    }
                    this.user_information_data.date_hired = this.user_information.user_other_personal_information.date_hired
                    this.user_information_data.firstname = this.user_information.personal_information.firstname
                    this.user_information_data.middlename = this.user_information.personal_information.middlename
                    this.user_information_data.lastname = this.user_information.personal_information.lastname
                    this.user_information_data.suffix = this.user_information.personal_information.suffix
                    this.user_information_data.division_name = this.user_information.division_information.name
                    this.user_information_data.role_name = this.user_information.role_information.name
                    this.user_information_data.branch_name = this.user_information.branch_information.branch_name
                    this.user_information_data.birth_date = this.user_information.personal_information.birth_date
                    this.user_information_data.gender = this.user_information.user_other_personal_information.gender
                    this.user_information_data.marital_status = this.user_information.user_other_personal_information.marital_status
                    this.user_information_data.sss = this.user_information.user_other_personal_information.sss
                    this.user_information_data.philhealth = this.user_information.user_other_personal_information.philhealth
                    this.user_information_data.pagibig = this.user_information.user_other_personal_information.pagibig
                    this.user_information_data.tin = this.user_information.user_other_personal_information.tin
                    this.user_information_data.house_no = this.user_information.user_other_personal_information.house_no
                    this.user_information_data.subdivision = this.user_information.user_other_personal_information.subdivision
                    this.user_information_data.street_name = this.user_information.user_other_personal_information.street_name
                    this.user_information_data.barangay = this.user_information.user_other_personal_information.barangay
                    this.user_information_data.city_municipality = this.user_information.user_other_personal_information.city_municipality
                    this.user_information_data.province = this.user_information.user_other_personal_information.province
                    this.user_information_data.region = this.user_information.user_other_personal_information.region
                    this.user_information_data.country = this.user_information.user_other_personal_information.country
                    this.user_information_data.zip_code = this.user_information.user_other_personal_information.zip_code
                    this.user_information_data.email = this.user_information.email
                    this.user_information_data.mobile_number = this.user_information.personal_information.mobile_number
                    this.user_information_data.work_phone = this.user_information.user_other_personal_information.work_phone
                    this.user_information_data.home_phone = this.user_information.user_other_personal_information.work_phone
                    this.user_information_data.pin = this.user_information.pin
                    this.profilepicture = this.user_information.user_other_personal_information.profile_picture
                    this.$refs.form.resetValidation();

                }
            }).catch(error => console.log(error));
        },
        fetchDivisionInformation() { // fetch division
            let payload = {
                user_id: this.$store.getters.getParentID
            };
            divisionservices.fetchDivisionInformation(payload, this.$store.getters.getAccessToken).then(response => {
                if (response.data.success) {
                    response.data.result.forEach((value) => {
                        this.division_information.push({
                            text: value.name,
                            value: value.id
                        });
                    });
                }
                else {
                    console.log(response.data.message);
                }
            }).catch(error => console.log(error));
        },
        fetchRoleInformation() { // fetch role
            let payload = {
                user_id: this.$store.getters.getParentID
            };
            roleservices.fetchRoleInformation(payload, this.$store.getters.getAccessToken).then(response => {
                if (response.data.success) {
                    response.data.result.forEach((value) => {
                        this.role_information.push({
                            text: value.name,
                            value: value.id
                        });
                    });
                }
                else {
                    console.log(response.data.message);
                }
            }).catch(error => console.log(error));
        },
        fetchBranchInformation() { // fetch branch
            let payload = {
                user_id: this.$store.getters.getParentID
            };
            branchservices.fetchBranchInformation(payload, this.$store.getters.getAccessToken).then(response => {
                if (response.data.success) {
                    response.data.result.forEach((value) => {
                        this.branch_information.push({
                            text: value.branch_name,
                            value: value.id
                        });
                    });
                }
                else {
                    console.log(response.data.message);
                }
            }).catch(error => console.log(error));
        },
        activeinactivetrigger() { // switch active in active
            if (this.user_information_data.switch_flag == true) {
                this.activeinactive = 'Active'
            } else {
                this.activeinactive = 'Inactive'
            }
        },
        SaveorUpdate() { // Update User Information Confirmation
            let val = this.$refs.form.validate();
            this.saveconfirmation = false;

            if (val) {
                if (this.valid == true) {
                    this.UpdateEmployeeInformation()
                }
            }
        },
        UpdateEmployeeInformation() {  // Update User Information
            let loader = this.$loading.show();

            if (this.current_pin != '' && this.pin != '' && this.confirm_pin != '') {
                this.new_pin = this.pin;
                this.old_pin = this.current_pin;
            }

            if (this.current_password != '' && this.password != '' && this.confirm_password != '') {
                this.new_password = this.password;
                this.old_password = this.current_password;
            }

            if (this.user_information_data.switch_flag == true) {
                this.user_information.flag = 1
                this.activeinactive = 'Active'
            } else {
                this.user_information.flag = 0
                this.activeinactive = 'Inactive'
            }

            let payload = {
                id: this.$store.getters.getUserID,
                // user_table
                old_password: this.old_password,
                new_password: this.new_password,
                current_pin: this.current_pin,
                old_pin: this.old_pin,
                new_pin: this.new_pin,
                // user_personal_information_table
                user_id: this.$store.getters.getUserID,
                firstname: this.user_information_data.firstname,
                middlename: this.user_information_data.middlename,
                lastname: this.user_information_data.lastname,
                suffix: this.user_information_data.suffix,
                mobile_number: this.user_information_data.mobile_number,
                birth_date: this.user_information_data.birth_date,
                // user_other_information_table
                gender: '',
                marital_status: '',
                country: '',
                province: '',
                region: '',
                city_municipality: '',
                barangay: '',
                street_name: '',
                subdivision: '',
                house_no: '',
                zip_code: '',
                work_phone: '',
                home_phone: '',
            };
            const formData = new FormData();
            formData.append('file', this.selectedFile);
            formData.append('user_information', JSON.stringify(payload));
            userservices.UpdateOneEmployeeInformationWithPasswordPin(formData, this.$store.getters.getAccessToken).then(response => {
                if (response.data.success) {
                    loader.hide();
                    this.$store.state.snackbar.colors = 'xgreen';
                    this.$store.state.snackbar.icon = "mdi-check-circle-outline";
                    this.$store.state.snackbar.message = 'Profile has been updated.';
                    this.$store.state.snackbar.show = true;
                    this.GetUser();
                    this.password = '',
                        this.confirm_password = '',
                        this.$refs.form.resetValidation();
                    this.hidebutton = 1
                }
            }).catch(error => {
                loader.hide();
                this.$store.state.snackbar.icon = "mdi-alert-outline";
                this.$store.state.snackbar.colors = "xred";
                this.$store.state.snackbar.message = error.response.data.message
                this.$store.state.snackbar.show = true;
            });
        },
        validationfalse() { // validation in forms
            this.$refs.form.validate()
        },
        FetchWorldInformation() { // fetch country
            this.countrycombobox = [];
            let payload = {
                country_code: process.env.VUE_APP_WEB_COUNTRY_CODE
            };

            resourcesservice.fetchWorldInformation(payload).then(response => {
                if (response.data.success) {
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
        FetchAllLocationAddressRegion() { // fetch region
            let payload = {
                user_id: this.$store.getters.getParentID
            };
            locationaddressservices.FetchAllLocationAddressRegion(payload, this.$store.getters.getAccessToken).then(response => {
                if (response.data.success) {
                    response.data.data.forEach((value) => {
                        this.region_information.push({
                            text: value.name,
                            value: value.id,
                            code: value.code
                        });
                    });
                }
                else {
                    console.log(response.data.message);
                }
            }).catch(error => console.log(error));
        },
        FetchAllLocationAddressProvince(region_code) { // fetch province
            this.user_information_data.mobile_number = this.user_information_data.country.phone_code
            this.user_information_data.work_phone = this.user_information_data.country.phone_code
            this.user_information_data.home_phone = this.user_information_data.country.phone_code
            console.log(region_code);
            this.province_information = [];
            let payload = {
                region_code: region_code
            };
            locationaddressservices.FetchAllLocationAddressProvince(payload, this.$store.getters.getAccessToken).then(response => {
                if (response.data.success) {
                    response.data.data.forEach((value) => {
                        this.province_information.push({
                            text: value.name,
                            value: value.id,
                            code: value.code
                        });
                    });
                }
                else {
                    console.log(response.data.message);
                }
            }).catch(error => console.log(error));
        },
        FetchAllLocationAddressMunicipality(province_code) { // fetch municipality
            console.log(province_code)
            this.municipality_information = [];
            let payload = {
                province_code: province_code
            };
            locationaddressservices.FetchAllLocationAddressMunicipality(payload, this.$store.getters.getAccessToken).then(response => {
                if (response.data.success) {
                    response.data.data.forEach((value) => {
                        this.municipality_information.push({
                            text: value.name,
                            value: value.id,
                            code: value.code
                        });
                    });
                }
                else {
                    console.log(response.data.message);
                }
            }).catch(error => console.log(error));
        },
        mucinipality_checking(municipality_city) { // checking municipality
            console.log(municipality_city);
        },
        changeStatusDialogSave(status) {
            this.saveconfirmation = status;
        },
        FetchAllSchedule() { // fetch schedule 
            let payload = {
                user_id: this.$store.getters.getParentID
            };
            scheduleservices.FetchAllSchedule(payload, this.$store.getters.getAccessToken).then(response => {
                if (response.data.success) {
                    response.data.data.forEach((value) => {
                        this.schedule_information.push({
                            text: value.name,
                            value: value.id,
                            value_in: value.in,
                            value_out: value.out
                        });
                    });
                }
                else {
                    console.log(response.data.message);
                }
            }).catch(error => console.log(error));
        },
        editprofileto() {
            this.foreditstatus = true,
                this.foreditstatusdisable = false
            this.hidebutton = 2
        },
        canceleditprofileto() {
            this.foreditstatus = false,
                this.foreditstatusdisable = true
            this.hidebutton = 1
            this.GetUser();
        },
        strPad(str) { // max date 
            return (str).toString().padStart(2, '0')
        },
        handleFileImport() {
            this.isSelecting = true;

            // After obtaining the focus when closing the FilePicker, return the button state to normal
            window.addEventListener('focus', () => {
                this.isSelecting = false
            }, { once: true });

            // Trigger click on the FileInput
            this.$refs.uploader.click();
        },
        onFileChanged(e) { // upload profile
            this.selectedFile = e.target.files[0];
            if (!this.selectedFile) {
                this.url = null;
                return;
            }
            this.url = URL.createObjectURL(this.selectedFile);
            this.profilepicture = 1;
        },
    }
}
</script>


<style scoped>
.btn-camera {
    margin-top: -25px;
    position: absolute;
    margin-left: -18px;
    background-color: white;
}
</style>
