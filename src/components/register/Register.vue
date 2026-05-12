<template>
  <v-form>
    <v-container fluid class="clinic-container">
      <v-row class="text-center">
        <v-card class="clinic-card" elevation="10">
          <v-stepper v-model="steps" vertical>
            <v-col cols="12">
              <!-- Replace logo -->
              <v-img :src="require('../../assets/images/tldc_logo.png')" class="my-3" contain height="190" />
            </v-col>

            <!-- Step 1 -->
            <v-stepper-step color="purple" :complete="steps > 1" step="1">
              Personal Information
            </v-stepper-step>
            <v-stepper-content step="1">
              <v-form ref="form" v-model="valid" lazy-validation>
                <br>
                <v-text-field label="First name *" outlined prepend-inner-icon="mdi-account"
                  color="purple" :rules="[v => !!v || 'First name is required']"
                  v-model="personal_information.firstname"></v-text-field>
                <v-text-field label="Middle name" outlined prepend-inner-icon="mdi-account"
                  color="purple" v-model="personal_information.middlename"></v-text-field>
                <v-text-field label="Last name *" outlined prepend-inner-icon="mdi-account"
                  color="purple" :rules="[v => !!v || 'Last name is required']"
                  v-model="personal_information.lastname"></v-text-field>
                <v-text-field label="Suffix" prepend-inner-icon="mdi-account" outlined color="purple"
                  v-model="personal_information.suffix"></v-text-field>
                <v-btn class="clinic-btn" @click="validate(2)" :disabled="!valid">
                  Next
                </v-btn>
              </v-form>
              <br>
            </v-stepper-content>

            <!-- Step 2 -->
            <v-stepper-step color="purple" :complete="steps > 2" step="2">
              Clinic Details
            </v-stepper-step>
            <v-stepper-content step="2">
              <v-form ref="formstep3" v-model="validstep2" lazy-validation>
                <v-text-field label="Clinic name *" prepend-inner-icon="mdi-office-building" outlined
                  color="purple" class="mt-2" :rules="[v => !!v || 'Clinic name is required']"
                  v-model="business_details.business_name"></v-text-field>
                <v-combobox label="Country *" prepend-inner-icon="mdi-map-marker" outlined
                  color="purple" :rules="[v => !!v || 'Country is required']"
                  :items="country_information" v-model="business_details.country_id"
                  @change="FetchCountryStateInformation()" disabled></v-combobox>
                <v-combobox label="Province *" prepend-inner-icon="mdi-map-marker" outlined
                  color="purple" :rules="[validateState]" :items="state_information"
                  v-model="business_details.state_id"
                  @change="FetchStateCitiesInformation()"></v-combobox>
                <v-combobox label="City *" prepend-inner-icon="mdi-map-marker" color="purple" outlined
                  :rules="[validateCity]" :items="cities_information"
                  v-model="business_details.city_id"></v-combobox>
                <v-text-field label="Clinic address *" prepend-inner-icon="mdi-map-marker" outlined
                  color="purple" :rules="[v => !!v || 'Clinic address is required']"
                  v-model="business_details.business_address"></v-text-field>
                <v-text-field label="Mobile number *" prepend-inner-icon="mdi-phone" color="purple"
                  outlined v-mask="phonecodemask" :rules="[v => !!v || 'Mobile number is required']"
                  v-model="personal_information.mobile_number"></v-text-field>
                <v-btn text class="clinic-link" @click="steps = 1">Back</v-btn>
                <v-btn class="clinic-btn" @click="validate(3)" :disabled="!validstep2">Next</v-btn>
              </v-form>
              <br>
            </v-stepper-content>

            <!-- Step 3 -->
            <v-stepper-step color="purple" :complete="steps > 3" step="3">
              Account Information
            </v-stepper-step>
            <v-stepper-content step="3">
              <v-form ref="formstep4" v-model="validstep3" lazy-validation>
                <v-text-field label="Email *" prepend-inner-icon="mdi-email" color="purple" outlined
                  class="mt-2" :rules="[v => !!v || 'Email is required']"
                  v-model="account_information.email"></v-text-field>
                <v-text-field v-model="account_information.password" prepend-inner-icon="mdi-lock"
                  color="purple" :append-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show_password ? 'text' : 'password'" label="Password *"
                  @click:append="show_password = !show_password"
                  :rules="[(account_information.password === confirm_password) || 'Passwords do not match',
                  v => !!v || 'Password is required',
                  (account_information.password && account_information.password.length >= 6) || 'Password must be at least 6 characters']" outlined></v-text-field>
                <v-text-field v-model="confirm_password" prepend-inner-icon="mdi-lock" color="purple"
                  :append-icon="show_confirm_password ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show_confirm_password ? 'text' : 'password'" label="Confirm password *"
                  @click:append="show_confirm_password = !show_confirm_password" :rules="[(account_information.password === confirm_password) || 'Passwords do not match',
                  v => !!v || 'Confirm password is required',
                  (confirm_password && confirm_password.length >= 6) || 'Password must be at least 6 characters']"
                  outlined></v-text-field>
                <v-btn text class="clinic-link" @click="steps = 2">Back</v-btn>
                <v-btn class="clinic-btn" @click="validate(4)" :disabled="!validstep2">Create</v-btn>
              </v-form>
              <br>
            </v-stepper-content>

            <!-- Step 4 -->
            <v-stepper-step color="purple" :complete="steps > 4" step="4">
              Thank You
            </v-stepper-step>
            <v-stepper-content step="4" class="text-center">
              <h3 class="clinic-success">Registration completed successfully.</h3>
              <br>
              <v-btn class="clinic-btn" @click="BackToLogin()">Back to Login</v-btn>
              <br>
            </v-stepper-content>
          </v-stepper>
        </v-card>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>

import resourcesservice from '../services/resourcesservices';
import registerservices from '../services/registerservices';

export default {
    name: 'Login',
    data: () => ({          
        phonecodemask: '+639#########',
        valid: false,
        validstep2: false,
        validstep3: false,
        steps: 1,
        confirm_password: '',
        show_password: false,
        show_confirm_password: false,
        // Personal Information
        personal_information: {
            firstname: '',
            lastname: '',
            middlename: '',
            mobile_number: '',
            suffix: ''
        },
        // Business Details
        business_details: {
            business_name: '',
            business_address: '',
            business_type_id: null,
            country_id: null,
            city_id: null,
            state_id: null
        },
        // Account Information
        account_information: {
            email: '',
            password: '',
            facebook_id: '',
            google_id: '',
            is_parent: 1,
            division_id: 1,
            role_id: 1
        },
        business_type_information: [],
        country_information: [],
        state_information: [],
        cities_information: []
    }),
    created() {
        this.$store.state.header = false;
        this.$store.state.footer = false;
        this.business_details.country_id = {
            text: "🇵🇭 Philippines",
            value: 174,
            phone_code: "+63"
        };
        this.FetchCountryStateInformation();
    },
    methods: {
        BackToLogin() {
            this.$router.push('/cliniclogin');
        },
        SaveUserInformation() {
            let loader = this.$loading.show();

            let payload = {
                personal_information: JSON.stringify(this.personal_information),
                business_details: JSON.stringify({
                    business_name: this.business_details.business_name,
                    business_address: this.business_details.business_address,
                    business_type_id: 4,
                    country_id: this.business_details.country_id.value,
                    city_id: this.business_details.city_id.value,
                    state_id: this.business_details.state_id.value
                }),
                account_information: JSON.stringify(this.account_information)
            };

            registerservices.saveUserInformation(payload).then(response => {
                if (response.data.success) {
                    loader.hide();
                    this.steps = 4;
                } else {
                    loader.hide();
                    this.$store.state.snackbar.message = response.data.message;
                    this.$store.state.snackbar.show = true;
                }
            }).catch(error => {
                loader.hide();
                this.$store.state.snackbar.message = error.response.data.message;
                this.$store.state.snackbar.show = true;
                console.log(error.response.data.message)
            });
        },
        FetchBusinessType() {
            this.business_type_information = [];
            resourcesservice.fetchBusinessType().then(response => {
                if (response.data.success) {
                    response.data.result.forEach((value) => {
                        this.business_type_information.push({
                            text: value.name,
                            value: value.id
                        });
                    });
                } else {
                    console.log(response.data.message);
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
            this.business_details.state_id = '';
            this.business_details.city_id = '';
            this.state_information = [];
            let payload = {
                country_id: this.business_details.country_id.value
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
            this.business_details.city_id = '';
            this.cities_information = [];
            let payload = {
                state_id: this.business_details.state_id.value
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
        validate(step) {
            if (step == 2) {
                let val = this.$refs.form.validate();
                if (val) this.steps = step;
            } else if (step == 3) {
                let val = this.$refs.formstep3.validate();
                if (val) this.steps = step;
            } else if (step == 4) {
                let val = this.$refs.formstep4.validate();
                if (val) this.SaveUserInformation();
            }
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
    }
}
</script>

<style scoped>
.clinic-container {
    max-width: 480px;
    margin: auto;
    padding-top: 40px;
}

.clinic-card {
    border-radius: 16px;
    background: #ffffff;
    box-shadow: 0 4px 20px rgba(106, 27, 154, 0.2);
}

.clinic-btn {
    background: linear-gradient(90deg, #6A1B9A, #9C27B0);
    color: white;
    font-weight: bold;
    letter-spacing: 0.5px;
    margin: 8px 0;
}

.clinic-link {
    color: #6A1B9A;
    font-weight: 500;
}

.text-gradiant-link {
    background-image: linear-gradient(to right, #6A1B9A, #9C27B0);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: 500;
}

.clinic-success {
    color: #6A1B9A;
    font-weight: bold;
}
</style>
