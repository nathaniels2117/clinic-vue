<template>
    <v-container style="max-width: 95%; position: relative;" >
        <!-- time in time out outside via employee id -->
        <v-row>
            <v-col cols="12">
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
                            <v-col sm="12" md="6" offset-md="3" class="mt-3 text-center">
                                <v-text-field
                                    v-model="todate"
                                    outlined
                                    label="Date and Time"
                                    color="orange"
                                    disabled
                                ></v-text-field>
                            </v-col>
                         
                            <v-col sm="12" md="6" offset-md="3" class="mt-3 text-center">
                                <v-text-field
                                    v-model="email"
                                    outlined
                                    label="Employee Id"
                                    color="orange"
                                    @change="GetUserViaEmployeeId()"
                                    :rules="[v => !!v || 'Employee Id is required', (messageito != erorrmessage) || 'Employee Id not found']"
                                ></v-text-field>
                            </v-col>
                            
                            <!-- <v-row>
                                <v-col>
                                    <v-btn elevation="2" block outlined dark small color="orange" @click="GetGetUserViaEmail()">
                                        {{"TIME IN"}}
                                    </v-btn>
                                </v-col>                                          
                                <v-col>
                                    <v-btn elevation="2" block outlined dark small color="orange" @click="GetGetUserViaEmail()">
                                        {{"TIME OUT"}}
                                    </v-btn>
                                </v-col>
                            </v-row> -->
                            
                            <v-col sm="12" md="6" offset-md="3" class="mt-3 text-center">
                                <v-btn elevation="2" block outlined dark small color="orange" @click="GetGetUserViaEmployeeId()">
                                    {{"Submit"}}
                                </v-btn>
                            </v-col>  
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <!-- time in time out outside via employee id -->
    </v-container>
</template>
  
  <script>

    import timeintimeoutservices from '../services/timeintimeoutservices'
    export default {

        name: 'Timeintimeout',
            data: () => ({
                loading: false,
                todate: '',
                email: '',
                timeinortimeout: 'Submit',
                erorrmessage: '',
                messageito: 'Employee not found',
                valid: '',
                user_id : '',
                parent_id : '',
                branch_id : '',
            }),
            created(){
                this.$store.state.header = true;
                this.$store.state.footer = true;
                this.$store.state.snackbar.color = 'orange';
                
                setInterval(()=>{
                const today = new Date();
                const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
                const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                const dateTime = date +' '+ time;
                this.todate = dateTime;

                }, 1000);
            },
            mounted(){
                this.$store.state.title = "Timeintimeout Information";
            },
            methods: {
            GetUserViaEmail(){ // get user via email

                let payload = {
                    email: this.email,
                };

                timeintimeoutservices.GetUserViaEmail(payload).then(response => {
                    if(response.data.success){
                        console.log(response.data.data)
                        this.user_id = response.data.data.id;
                        this.parent_id = response.data.data.parent_id;
                        this.branch_id = response.data.data.branch_id;
                        this.erorrmessage = 'Email Found';
                    }
                }).catch(error =>{
                    this.erorrmessage = error.response.data.message;
                    console.log(error);
                });
            },
            GetGetUserViaEmail(){ // get user via email
            let val = this.$refs.form.validate();

            if (val) {
                let payload = {
                    email: this.email,
                };

                timeintimeoutservices.GetUserViaEmail(payload).then(response => {
                    if(response.data.success){
                        console.log(response.data.data)
                        this.user_id = response.data.data.id;
                        this.parent_id = response.data.data.parent_id;
                        this.branch_id = response.data.data.branch_id;
                        this.erorrmessage = 'Email Found';
                        this.SaveTimeInTimeOutVialogin();
                    }
                }).catch(error =>{ 
                    this.$store.state.snackbar.message = error.response.data.message;
                    this.$store.state.snackbar.show = true;
                });
            }

            },

            SaveTimeInTimeOutVialogin(){ // save time in time out 
                // this.GetGetUserViaEmail();

                let val = this.$refs.form.validate();

                if (val) {
                    let payload = {
                        parent_user_id: this.parent_id,
                        user_id: this.user_id,
                        date_time: this.todate,
                        action: 0,
                        device_use: 3,
                        branch_id: this.branch_id
                    };
                    console.log(payload);
                    timeintimeoutservices.SaveTimeInTimeOutVialogin(payload).then(response => {
                        if(response.data.success){
                            console.log(response.data);
                            this.$store.state.snackbar.message = response.data.message;
                            this.$store.state.snackbar.show = true;
                            this.$refs.form.resetValidation();
                        }
                    }).catch(error =>{ 
                        this.$store.state.snackbar.message = error.response.data.message
                        this.$store.state.snackbar.show = true;
                    });
                }

            },
            GetUserViaEmployeeId(){ // get user via employee id
                let payload = {
                    employee_id: this.email,
                };

                timeintimeoutservices.GetUserViaEmployeeId(payload).then(response => {
                    if(response.data.success){
                        console.log(response.data.data)
                        this.user_id = response.data.data.user_id;
                        this.parent_id = response.data.data.created_info.parent_id;
                        this.branch_id = response.data.data.created_info.branch_id;
                        this.erorrmessage = 'Employee Found';
                    }
                }).catch(error =>{ 
                    this.erorrmessage = error.response.data.message;
                    console.log(error);
                });
            },
            GetGetUserViaEmployeeId(){ // get user via employee id
                let val = this.$refs.form.validate();

                if (val) {
                    let payload = {
                        employee_id: this.email,
                    };

                    timeintimeoutservices.GetUserViaEmployeeId(payload).then(response => {
                        if(response.data.success){
                            console.log(response.data.data)
                            this.user_id = response.data.data.user_id;
                            this.parent_id = response.data.data.created_info.parent_id;
                            this.branch_id = response.data.data.created_info.branch_id;
                            this.$store.state.snackbar.colors = 'xgreen';
                            this.$store.state.snackbar.icon = "mdi-check-circle-outline";
                            this.erorrmessage = 'Employee Found';
                            this.SaveTimeInTimeOutVialogin();
                        }
                    }).catch(error =>{ 
                        this.$store.state.snackbar.message = error.response.data.message;
                        this.$store.state.snackbar.colors = "xred";
                        this.$store.state.snackbar.icon = "mdi-alert-outline";
                        this.$store.state.snackbar.show = true;
                    });
                }

            },
        }
    }
  </script>
  
  <style scoped>
  
  </style>