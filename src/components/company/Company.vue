<template>
  <v-container>
    <!-- company picture form -->
    <v-row>
        <v-col sm="12" md="6" offset-md="3">
            <center>
                <div >
                    <v-img
                    v-if="business_information.business_image == null"
                    class="pa-7 rounded-circle d-inline-block align-self-stretch"
                    width="250"
                    height="250"
                    src="../../assets/images/circle_wirewolf.png"
                    ></v-img>
                    <v-img
                    v-else
                    class="pa-7 rounded-circle d-inline-block align-self-stretch"
                    width="250"
                    height="250"
                    :src="imagepath +  business_information.business_image"
                    ></v-img>
                </div>
            </center>
            <center>
            <v-btn
                @click="handleFileImport"
                v-if="$store.getters.valAccess(231)"
                elevation="5"
                icon
                :loading="isSelecting" 
                class="btn-camera"
                >
                    <v-icon>mdi-camera</v-icon>
                </v-btn>
                <input 
                ref="uploader" 
                class="d-none" 
                type="file" 
                @change="onFileChanged"
                >
            </center>
        </v-col>
    </v-row>
    <!-- company picture form -->

    <!-- company form -->
    <v-row>
        <v-col sm="12" md="6" offset-md="3">
            <v-card
                :loading="loading"
            >
                <template slot="progress">
                    <v-progress-linear
                        color="deep-purple"
                        height="10"
                        indeterminate
                    ></v-progress-linear>
                </template>

                <v-card-text>

                    <v-form
                        ref="form"
                        v-model="valid"
                        lazy-validation
                    >
                    <v-row dense class="mt-5">
                        <v-col cols="12">
                            <v-text-field
                                color="orange"
                                v-model="business_information.business_name"
                                label="Business Name"
                                :rules="[v => !!v || 'Business Name is required']"
                                :outlined="outlinedornot"
                                :disabled="viewingoredit"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-combobox
                                color="orange"
                                label="Country"
                                :outlined="outlinedornot"
                                :disabled="viewingoredit"
                                :rules="[v => !!v || 'Country is required']"
                                :items="country_information"
                                v-model="business_information.country_id"
                                @change="FetchCountryStateInformation()"
                            ></v-combobox>
                        </v-col>
                        <v-col cols="12">
                            <v-combobox
                                color="orange"
                                label="State"
                                :outlined="outlinedornot"
                                :disabled="viewingoredit"
                                :rules="[v => !!v || 'State is required']"
                                :items="state_information"
                                v-model="business_information.state_id"
                                @change="FetchStateCitiesInformation()"
                            ></v-combobox>
                        </v-col>
                        <v-col cols="12">
                            <v-combobox
                                color="orange"
                                label="City"
                                :outlined="outlinedornot"
                                :disabled="viewingoredit"
                                :rules="[v => !!v || 'City is required']"
                                :items="city_information"
                                v-model="business_information.city_id"
                            ></v-combobox>
                        </v-col>

                        <v-col cols="12">
                            <v-text-field
                                color="orange"
                                v-model="business_information.business_address"
                                label="Business Address"
                                :rules="[v => !!v || 'Business Address is required']"
                                :outlined="outlinedornot"
                                :disabled="viewingoredit"
                            ></v-text-field>
                        </v-col>
                        <v-col>
                            <v-btn
                            elevation="2"
                            outlined
                            dark
                            small
                            block
                            color="orange"
                            v-if="hidebutton == '1' && $store.getters.valAccess(231)"
                            @click="forupdate()"
                            >
                            Edit
                            </v-btn>
                            <div>
                                <v-row>
                                    <div class="col-sm-6 pt-0 mt-0 pb-0 mb-0">
                                        <v-btn
                                        elevation="2"
                                        outlined
                                        dark
                                        small
                                        block
                                        color="orange"
                                        v-if="hidebutton == '2'"
                                        @click="forcancel()"
                                        >
                                        Cancel
                                        </v-btn>
                                    </div>
                                    <div class="col-sm-6 pt-0 mt-0 pb-0 mb-0">
                                        <v-btn
                                        elevation="2"
                                        outlined
                                        dark
                                        small
                                        block
                                        color="orange"
                                        v-if="hidebutton == '2'"
                                        @click="valid == false ? validationfalse() : changeStatusDialogEdit(true)"
                                        >
                                        Update
                                        </v-btn>
                                    </div>
                                </v-row>
                            </div>
                        </v-col>
                    </v-row>
                </v-form>
                </v-card-text>
                <br>
            </v-card>
        </v-col>
    </v-row>
    <!-- company form -->

    <!-- edit confirmation dialog -->
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
                    @click="UpdateBusinessInformation()"
                    >
                    Confirm
                </v-btn>
                </center>
                <br>
            </v-card>
            </v-dialog>
        </v-row>
    </template>
    <!-- edit confirmation dialog -->
  </v-container>
</template>

<script>

  import companyservice from '../services/companyservices';
  import resourcesservice from '../services/resourcesservices';

  export default {
    name: 'Company',
    data: () => ({
        hrisdata: 0,
        imagepath: '',
        companyid: '',
        isSelecting: false,
        selectedFile: null,
        image: null,
        url: null,
        editconfirmation: false,
        viewingoredit: true,
        outlinedornot: false,
        hidebutton: 1,
        timeout: null,
        valid: false,
        business_information: {
            business_image: "",
            business_name: "",
            business_address: "",
            business_type_id: [],
            country_id: [],
            state_id: [],
            city_id: []
        },
        business_type_information: [],
        country_information: [],
        state_information: [],
        city_information: [],
        loading: false,
        selection: 1,
        singleSelect: false,
        selected: [],
        headers: [
          { text: 'Branch', value: 'calories' },
          { text: 'Address', value: 'fat' },
          { text: 'Active', value: 'carbs' },
          { text: 'Created By', value: 'protein' }
        ]
    }),
    created(){
        this.hrisdata = localStorage.getItem('is_hris')
        if(this.hrisdata == 1){
            this.$store.state.header = false;
            this.$store.state.footer = false;
        }else{
            this.$store.state.header = true;
            this.$store.state.footer = true;
        }
        this.FetchBusinessInformation();
        this.FetchBusinessType();
        this.$store.state.snackbar.color = 'orange';
    },
    mounted(){
        this.$store.state.title = "Company Information";
    },
    methods: {
        FetchBusinessType(){ // fetch business type
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
        FetchWorldInformation(){ // fetch country
            this.country_information = [];
            let payload = {
                country_code: this.$store.getters.getCountryCode
            };
            resourcesservice.fetchWorldInformation(payload).then(response => {
                if(response.data.success){
                    response.data.result.forEach((value) => {
                        this.country_information.push({
                            text: value.emoji + ' ' + value.name,
                            value: value.id
                        });
                    });
                }
            }).catch(error => console.log(error));

        },
        FetchCountryStateInformation(){ // fetch state
            this.business_information.state_id = ''
            this.business_information.city_id = ''
            this.state_information = [];
            let payload = {
                country_id: this.business_information.country_id.value
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
        FetchStateCitiesInformation(){ // fetch cities
        
            this.business_information.city_id = ''
            this.city_information = [];
            let payload = {
                state_id: this.business_information.state_id.value
            };

            resourcesservice.fetchCitiesInformation(payload).then(response => {
                if(response.data.success){
                    response.data.result.forEach((value) => {
                        this.city_information.push({
                            text: value.name,
                            value: value.id
                        });
                    });
                }
            }).catch(error => console.log(error));

        },
        UpdateBusinessInformation(){ // update business information

            let val = this.$refs.form.validate();

            if(val){
                let payload = {
                user_id: this.$store.getters.getParentID,
                business_information: this.business_information
                };
                companyservice.updateBusinessInformation(payload, this.$store.getters.getAccessToken).then(response => {
                    if(response.data.success){
                        this.$store.dispatch('setUserBusinessInfo', response.data);
                        this.forcancel();
                        this.$store.state.snackbar.message = 'Company information has been updated.';
                        this.$store.state.snackbar.show = true;
                    }
                }).catch(error => console.log(error));
                this.editconfirmation = false
            }
        },
        FetchBusinessInformation(){ // fetch business information
            let payload = {
                parent_user_id: this.$store.getters.fetchUserInfo.account_information.personal_information.user_id
            };

            companyservice.FetchBusinessInformation(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){

                    console.log(response.data)
                    this.imagepath = response.data.image_path
                    this.companyid = response.data.account_information.id
                    this.business_information.country_id.value = response.data.account_information.country_id
                    this.business_information.state_id.value = response.data.account_information.state_id
                    this.business_information.business_image = response.data.account_information.business_image
                    this.FetchWorldInformation();
                    this.FetchCountryStateInformation();
                    this.FetchStateCitiesInformation();
                    this.business_information.business_name = response.data.account_information.business_name
                    this.business_information.business_address = response.data.account_information.business_address
                    this.business_information.business_type_id = { text: response.data.account_information.business_type_id, value: response.data.account_information.business_type_id };
                    this.business_information.country_id = { text: response.data.account_information.country_information.emoji + ' ' + response.data.account_information.country_information.name, value: response.data.account_information.country_id};
                    this.business_information.state_id = { text: response.data.account_information.state_information.name, value: response.data.account_information.state_id };
                    this.business_information.city_id = { text: response.data.account_information.city_information.name, value: response.data.account_information.city_id };
                }
            }).catch(error => console.log(error));
        },
        ChangeStateCitiesInformation(){

            this.city_information = [];
            this.business_information.city_id = [];
            let payload = {
                state_id: this.business_information.state_id.value
            };

            resourcesservice.fetchCitiesInformation(payload).then(response => {
                if(response.data.success){
                    response.data.result.forEach((value) => {
                        this.city_information.push({
                            text: value.name,
                            value: value.id
                        });
                    });
                }
            }).catch(error => console.log(error));
        },
        forupdate(){
            this.viewingoredit = false
            this.outlinedornot = true
            this.hidebutton = 2
        },
        forcancel(){
            this.viewingoredit = true
            this.outlinedornot = false
            this.hidebutton = 1
            this.FetchBusinessInformation();
        },
        changeStatusDialogEdit(status){
            this.editconfirmation = status;
        },
        validationfalse(){
            this.$refs.form.validate()
        },
        Preview_image() { // preview image
          console.log(this.image);
          if(!this.image){
            this.url=null;
            return;
          } 
          this.url= URL.createObjectURL(this.image);
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
        onFileChanged(e) {
            this.selectedFile = e.target.files[0];
            if(!this.selectedFile){
                this.url=null;
                return;
            } 
            this.url= URL.createObjectURL(this.selectedFile);
            this.AddImageCompany()
        },
        AddImageCompany(){ // add image company
          const formData = new FormData();
          formData.append('file', this.selectedFile);
          formData.append('id', this.companyid);

          companyservice.UpdateCompanyImage(formData, this.$store.getters.getAccessToken).then(response => {
              if(response.data.success){
                  this.$store.state.snackbar.message = response.data.message;
                  this.$store.state.snackbar.show = true;
                  this.FetchBusinessInformation();
              }
          }).catch(error =>{ 
                console.log(error)
                this.$store.state.snackbar.message = error.response.data.message;
                this.$store.state.snackbar.show = true;
            }
          );
        },    
    }
}
</script>

<style scoped>
    .btn-camera{
        margin-top: -25px;
        position: absolute;
        margin-left: -18px;
        background-color: white;
    }

</style>