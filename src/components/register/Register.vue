<template>
 <v-form>
    <v-container fluid>
    <br>
    <br>
    <br>
    <br>
    <v-row class="text-center">
    
    <!-- <div width="20px">
    <table border="1" class="white"> -->
      <v-card>
        <v-stepper
            v-model="steps"
            vertical
        >
    <v-col cols="12">

      <v-img
        :src="require('../../assets/images/wirewolf_logo.png')"
        class="my-3"
        contain
        height="190"
      />
    </v-col>
            <v-stepper-step
                color="orange"
                :complete="steps > 1"
                step="1"
            >
                Personal Information
            <small class="mt-1" v-if="steps == 1"></small>
            </v-stepper-step>

            <v-stepper-content step="1">
                <v-form
                ref="form"
                v-model="valid"
                lazy-validation
                >
                    <v-text-field
                        label="First Name *"
                        outlined
                        prepend-inner-icon="mdi-account"
                        class="mt-2"
                        color="orange"
                        :rules="[v => !!v || 'First Name is required']"
                        v-model="personal_information.firstname"
                    ></v-text-field>
                    <v-text-field
                        label="Middle Name"
                        outlined
                        prepend-inner-icon="mdi-account"
                        color="orange"
                        v-model="personal_information.middlename"
                    ></v-text-field>
                    <v-text-field
                        label="Last Name *"
                        outlined
                        prepend-inner-icon="mdi-account"
                        color="orange"
                        :rules="[v => !!v || 'Last Name is required']"
                        v-model="personal_information.lastname"
                    ></v-text-field>
                    <v-text-field
                        label="Suffix"
                        prepend-inner-icon="mdi-account"
                        outlined
                        color="orange"
                        v-model="personal_information.sufix"
                    ></v-text-field>
                    <v-btn
                        rounded
                        @click="validate(2)"
                        :disabled="!valid"
                    >
                    <span class="text-gradiant-link">Next</span>
                    </v-btn>
                </v-form>
                <br>
            </v-stepper-content>

            <v-stepper-step
            color="orange"
            :complete="steps > 2"
            step="2"
            >
                Business Details
            </v-stepper-step>

            <v-stepper-content step="2">
                <v-form
                ref="formstep3"
                v-model="validstep2"
                lazy-validation
                >
                    <v-text-field
                        label="Business Name *"
                        prepend-inner-icon="mdi-office-building"
                        outlined
                        color="orange"
                        class="mt-2"
                        :rules="[v => !!v || 'Business Name is required']"
                        v-model="business_details.business_name"
                    ></v-text-field>
                    <!-- <v-combobox
                        label="Business Type"
                        outlined
                        :rules="[v => !!v || 'Business Type is required']"
                        :items="business_type_information"
                        v-model="business_details.business_type_id"
                    ></v-combobox> -->
                    <v-combobox
                        label="Country *"
                        prepend-inner-icon="mdi-map-marker"
                        outlined
                        color="orange"
                        :rules="[v => !!v || 'Country is required']"
                        :items="country_information"
                        v-model="business_details.country_id"
                        @change="FetchCountryStateInformation()"
                    ></v-combobox>
                    <v-combobox
                        label="State *"
                        prepend-inner-icon="mdi-map-marker"
                        outlined
                        color="orange"
                        :rules="[v => !!v || 'State is required']"
                        :items="state_information"
                        v-model="business_details.state_id"
                        @change="FetchStateCitiesInformation()"
                    ></v-combobox>
                    <v-combobox
                        label="City *"
                        prepend-inner-icon="mdi-map-marker"
                        color="orange"
                        outlined
                        :rules="[v => !!v || 'City is required']"
                        :items="cities_information"
                        v-model="business_details.city_id"
                    ></v-combobox>
                    <v-text-field
                        label="Business Address *"
                        prepend-inner-icon="mdi-map-marker"
                        outlined
                        color="orange"
                        :rules="[v => !!v || 'Business Address is required']"
                        v-model="business_details.business_address"
                    ></v-text-field>
                    <v-text-field
                        label="Mobile Number *"
                        prepend-inner-icon="mdi-phone"
                        color="orange"
                        outlined
                        v-mask="phonecodemask"
                        :rules="[v => !!v || 'Mobile Number is required']"
                        v-model="personal_information.mobile_number"
                    ></v-text-field>
                    <v-btn rounded class="mr-2" @click="steps = 1" text>
                        <span class="text-gradiant-link">Back</span>
                    </v-btn>
                    <v-btn
                        @click="validate(3)"
                        rounded
                        :disabled="!validstep2"
                        class="mr-2"
                    >
                    <span class="text-gradiant-link">Next</span>
                    </v-btn>                    
                </v-form>
                <br>
            </v-stepper-content>

            <v-stepper-step
            color="orange"
                :complete="steps > 3"
                step="3"
            >
                Account Information
            </v-stepper-step>

            <v-stepper-content step="3">
                <v-form
                ref="formstep4"
                v-model="validstep3"
                lazy-validation
                >
                    <v-text-field
                        label="Email *"
                        prepend-inner-icon="mdi-email"
                        color="orange"
                        outlined
                        class="mt-2"
                        :rules="[v => !!v || 'Email is required']"
                        v-model="account_information.email"
                    ></v-text-field>
                    <!-- <v-text-field
                        label="Password"
                        outlined
                        color="orange"
                        :append-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="show_password ? 'text' : 'password'"
                        @click:append="show_password = !show_password"
                        v-model="account_information.password"
                    ></v-text-field>
                    <v-text-field
                        label="Confirm Password"
                        outlined
                        color="orange"
                        :append-icon="show_confirm_password ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="show_confirm_password ? 'text' : 'password'"
                        @click:append="show_confirm_password = !show_confirm_password"
                        v-model="confirm_password"
                    ></v-text-field> -->

                    <v-text-field
                    v-model="account_information.password"
                    prepend-inner-icon="mdi-lock"
                    color="orange"
                    :append-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show_password ? 'text' : 'password'"
                    name="input-10-1"
                    label="Password *"
                    @click:append="show_password = !show_password"
                    :rules="[(account_information.password === confirm_password) || 'The password and confirmation password do not match', v => !!v || 'Password is required',(account_information.password && account_information.password.length >= 6) || 'minimum 6 characters']"
                    outlined
                  ></v-text-field>
                  <v-text-field
                    v-model="confirm_password"
                    prepend-inner-icon="mdi-lock"
                    color="orange"
                    :append-icon="show_confirm_password ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show_confirm_password ? 'text' : 'password'"
                    name="input-10-1"
                    label="Confirm Password *"
                    @click:append="show_confirm_password = !show_confirm_password"
                    :rules="[(account_information.password === confirm_password) || 'The confirmation password and password do not match', v => !!v || 'Confirm Password is required',(confirm_password && confirm_password.length >= 6) || 'minimum 6 characters']"
                    outlined
                  ></v-text-field>

                    <v-btn rounded @click="steps = 2" text>
                        <span class="text-gradiant-link">Back</span>
                    </v-btn>
                    <v-btn
                        rounded
                        class="mr-2"
                        @click="validate(4)"
                        :disabled="!validstep2"
                    >
                    <span class="text-gradiant-link">Create</span>
                    </v-btn>                    
                </v-form>
                <br>
            </v-stepper-content>

            <v-stepper-step
            color="orange"
                :complete="steps > 4"
                step="4"
            >
                Thank You
            </v-stepper-step>
            <v-stepper-content step="4" class="text-center">
            <h3>Registration Successful.</h3>
            <br>
            <v-btn style="margin-bottom:10px"  @click="BackToLogin()">
                <span class="text-gradiant-link">Back To Login</span>
            </v-btn>
            <br>
            </v-stepper-content>
            <br>
        </v-stepper>
</v-card>
    </v-row>
    <br>
  </v-container>
  </v-form>
</template>

<script>

  import resourcesservice from '../services/resourcesservices';
  import registerservices from '../services/registerservices';

  export default {
    name: 'Login',
    data: () => ({
        phonecodemask : '###############',
        valid: false,
        validstep2: false,
        validstep3: false,
        steps: 1,
        confirm_password: '',
        show_password: false,
        show_confirm_password: false,
        // PERSONAL
        personal_information: {
            firstname: '',
            lastname: '',
            middlename: '',
            mobile_number: '',
            sufix: ''
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
    mounted() {
        
    },
    created() {
        this.FetchBusinessType();
        this.FetchWorldInformation();
        this.$store.state.header = false;
        this.$store.state.footer = false;
    },
    methods: {
        BackToLogin(){
            this.$router.push('/login');
        },
        SaveUserInformation(){
            
            //Set Loader
            let loader = this.$loading.show();

            //Set Payload
            let payload = {
                personal_information: JSON.stringify(this.personal_information),
                business_details: JSON.stringify({
                    business_name: this.business_details.business_name,
                    business_address: this.business_details.business_address,
                    business_type_id: 4,
                    // business_type_id: this.business_details.business_type_id.value,
                    country_id: this.business_details.country_id.value,
                    city_id: this.business_details.city_id.value,
                    state_id: this.business_details.state_id.value
                }),
                account_information: JSON.stringify(this.account_information)
            };
            // let payload = {
            //         personal_information: {
            //         firstname: this.personal_information.firstname,
            //         middlename: this.personal_information.middlename,
            //         lastname: this.personal_information.lastname,
            //         mobile_number: this.personal_information.mobile_number
            //     },
            //         business_details: {
            //         business_name: this.business_details.business_name,
            //         business_address: this.business_details.business_address,
            //         business_type_id: this.business_details.business_type_id.value,
            //         country_id: this.business_details.country_id.value,
            //         city_id: this.business_details.city_id.value,
            //         state_id: this.business_details.state_id.value
            //     },
            //         account_information: {
            //         email: this.account_information.email,
            //         password: this.account_information.password,
            //         facebook_id: '',
            //         google_id: '',
            //         is_parent: 1,
            //         division_id: 1,
            //         role_id: 1
            //     },
            // }

            registerservices.saveUserInformation(payload).then(response => {
                console.log(response.data);
                if(response.data.success){
                    loader.hide();
                    this.steps = 4;
                    // this.$store.state.snackbar.message = response.data.message;
                    // this.$store.state.snackbar.show = true;
                }
                else{
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
        FetchBusinessType(){

            this.business_type_information = [];
            resourcesservice.fetchBusinessType().then(response => {
                if(response.data.success){
                    response.data.result.forEach((value) => {
                        this.business_type_information.push({
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
        FetchWorldInformation(){

            this.country_information = [];
            let payload = {
                country_code: process.env.VUE_APP_WEB_COUNTRY_CODE
            };

            resourcesservice.fetchWorldInformation(payload).then(response => {
                if(response.data.success){
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
        FetchCountryStateInformation(){
            this.personal_information.mobile_number = this.business_details.country_id.phone_code
            this.business_details.state_id = ''
            this.business_details.city_id = ''
            this.state_information = [];
            let payload = {
                country_id: this.business_details.country_id.value
            };

            resourcesservice.fetchStateInformation(payload).then(response => {
                if(response.data.success){
                    response.data.result.forEach((value) => {
                        this.state_information.push({
                            text: value.name,
                            value: value.id
                        });
                    });
                }
            }).catch(error => console.log(error));

        },
        FetchStateCitiesInformation(){
            this.business_details.city_id = ''
            this.cities_information = [];
            let payload = {
                state_id: this.business_details.state_id.value
            };

            resourcesservice.fetchCitiesInformation(payload).then(response => {
                if(response.data.success){
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
            if(step == 2){
                let val = this.$refs.form.validate();
                
                if (val) {
                this.steps = step
                }
            }else if(step == 3){
                console.log(step)
                let val = this.$refs.formstep3.validate();

                if (val) {
                this.steps = step
                }
            }else if(step == 4){
                console.log(step)
                let val = this.$refs.formstep4.validate();

                if (val) {
                    this.SaveUserInformation()
                }
            }
        },
    }
  }
</script>

<style scoped>
.text-gradiant-link{
      /* Fallback: Set a background color. */
    background-color: red;
    font-weight: bold;
    /* Create the gradient. */
    background-image: linear-gradient(to right, #f54001 , #efb923);
    
    /* Set the background size and repeat properties. */
    /* background-size: 100%; */
    background-repeat: repeat;

    /* Use the text as a mask for the background. */
    /* This will show the gradient as a text color rather than element bg. */
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent; 
    -moz-background-clip: text;
    -moz-text-fill-color: transparent;
  }  
  .container{
    max-width: 370px;
    min-width: 100px;
  }
</style>
