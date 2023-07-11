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
    <v-col cols="12">

      <v-img
        :src="require('../../assets/images/wirewolf_logo.png')"
        class="my-3"
        contain
        height="190"
      />
    </v-col>
            <v-card-text>
                        
              <h5 class="text-left">Please enter your new password</h5>
              <br>
              <v-form
                ref="form"
                v-model="valid"
                lazy-validation
              >
                <v-text-field
                  v-model="password"
                  color="orange"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show1 ? 'text' : 'password'"
                  name="input-10-1"
                  label="Enter Your Password"
                  @click:append="show1 = !show1"
                  :rules="[(password === confirm_password) || 'The password and confirmation password do not match', v => !!v || 'Password is required',(password && password.length >= 6) || 'minimum 6 characters']"
                  outlined
                ></v-text-field>
                <v-text-field
                  v-model="confirm_password"
                  color="orange"
                  :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show2 ? 'text' : 'password'"
                  name="input-10-1"
                  label="Confirm Your Password"
                  @click:append="show2 = !show2"
                  :rules="[(password === confirm_password) || 'The confirmation password and password do not match', v => !!v || 'Confirm Password is required',(confirm_password && confirm_password.length >= 6) || 'minimum 6 characters']"
                  outlined
                ></v-text-field>
                <v-row>
                <v-col cols="2"></v-col>
                <v-col cols="8">
                <v-btn
                    @click="ResetPassword()"
                    block
                    rounded
                >
                <span class="text-gradiant-link">Confirm</span>
                </v-btn>
              </v-col>
              <v-col cols="2"></v-col>
            </v-row>
                <br>
              </v-form>
            </v-card-text>
        </v-card>

      </v-row>
    </v-container>

    <v-row justify="center">
        <v-dialog
            transition="dialog-bottom-transition"
            persistent
            v-model="systemmessagedialogsuccess"
            max-width="250px"
        >
              <v-card>
                <br>
            <br>
            <center>
            <v-icon style="font-size: 100px" x-large color="green">
              mdi-check-circle-outline
            </v-icon>
          </center>
                <!-- <v-toolbar
                  color="primary"
                  class="text-h6 white--text"
                >Successfully verified</v-toolbar> -->
                <v-card-text>
                  <br>
                  <center>
                  <div class="text-h8">Your password has been changed successfully</div>
                </center>
                </v-card-text>
                <v-card-actions class="justify-end">
                  <!-- <v-btn
                    color="primary"
                    text
                    class="white--text"
                    href='https://play.google.com/store/apps'
                  >
                      Proceed
                  </v-btn> -->

                  <v-row>
          <v-col cols="2"></v-col>
          <v-col cols="8">
              <center>
              <v-btn
                rounded
                block
                @click="gotologin()"
              >
              <span class="text-gradiant-link">Go to login</span>
            </v-btn>
          </center>
        <br>
          </v-col>
            <v-col cols="2"></v-col>
            </v-row>
                </v-card-actions>

    <br>
              </v-card>
        </v-dialog>
    </v-row>
  </v-form>
    
</template>

<script>

  import emailservices from '../services/emailservices';

  export default {
     name: 'emailconfirm',
     data: () => ({
      systemmessagedialogsuccess: false,
            password: '',
            confirm_password: '',
            show1: false,
            show2: false,
            token: 0,
            valid:false,
      }
    ),
    created(){
            this.$store.state.header = false;
            this.$store.state.footer = false;
    },
    mounted(){
            this.token = this.$route.params.token; //get params from url vue
            emailservices.validateResetToken({ token: this.token }).then(response => {
                if(!response.data.success){
                    this.$router.push('/login');
                }
            }).catch(error => console.log(error));
    },
    methods: {
      ResetPassword(){
        let val = this.$refs.form.validate();
  
       if(val){
        //Set Loader
        let loader = this.$loading.show();

        //function
        let payload= {
            token: this.token,
            password: this.password,
            confirm_password: this.confirm_password
        };

        emailservices.resetPassword(payload).then(res =>{
          if(res.data.success){
                loader.hide();
                this.clearPass();
                this.$refs.form.resetValidation();
                this.systemmessagedialogsuccess = true;
                // this.$router.push('/login');
          }
          else{
                console.log(res.data.message);
          }
        });
      }

      },
      clearPass(){
          this.password = '';
          this.confirm_password = '';
      },
      gotologin(){
        this.$router.push('/login');
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