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
              <h5 class="text-left">Please enter the desired password.</h5>
              <br>
              <v-form
                ref="form"
                v-model="valid"
                lazy-validation
              >
                  <v-text-field
                    v-model="password"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show1 ? 'text' : 'password'"
                    name="input-10-1"
                    color="orange"
                    label="Enter Password"
                    @click:append="show1 = !show1"
                    :rules="[(password === cpassword) || 'The password and confirmation password do not match', v => !!v || 'Password is required',(password && password.length >= 6) || 'minimum 6 characters']"
                    outlined
                  ></v-text-field>
                  <v-text-field
                    v-model="cpassword"
                    color="orange"
                    :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show2 ? 'text' : 'password'"
                    name="input-10-1"
                    label="Confirm Password"
                    @click:append="show2 = !show2"
                    :rules="[(password === cpassword) || 'The confirmation password and password do not match', v => !!v || 'Confirm Password is required',(cpassword && cpassword.length >= 6) || 'minimum 6 characters']"
                    outlined
                  ></v-text-field>
                  <br>
                  <!-- <v-btn
                      color="primary"
                      @click="savePass()" style="font-size: 12px;"
                      block
                  >
                    CONFIRM VERIFICATION
                </v-btn> -->
                <v-row>
                <v-col cols="2"></v-col>
                <v-col cols="8">
                <v-btn
                    @click="savePass()"
                    block
                    rounded
                >
                <span class="text-gradiant-link">Confirm Verification</span>
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
                  <div class="text-h7">Click the "Proceed" button to download the application.</div>
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
          <v-col cols="3"></v-col>
          <v-col cols="6">
              <v-btn
                rounded
                block
                href='https://play.google.com/store/apps'
              >
              <span class="text-gradiant-link">Proceed</span>
            </v-btn>
            <br>
          </v-col>
            <v-col cols="3"></v-col>
            </v-row>
                </v-card-actions>
              </v-card>
        </v-dialog>
    </v-row>
  </v-form>
    
</template>

<script>

  import emailserv from '../services/emailservices';

  export default {
     name: 'emailconfirm',
     data: () => ({
          systemmessagedialogsuccess: false,
          systemmessage: '',
          valid:false,
          password: '',
          cpassword: '',
          show1: false,
          show2: false,
          user_id: 0
      }
    ),
    created(){
          this.$store.state.header = false;
          this.$store.state.footer = false;
    },
    mounted(){
          this.user_id = this.$route.params.id; //get params from url vue
    },
    methods: {
      savePass(){
        let val = this.$refs.form.validate();
  
        if(val){
          //function
          let payload= {
              user_id: this.user_id,
              password: this.password,
              confirm_password: this.cpassword
          };

          emailserv.savePass(payload).then(res =>{
            console.log(res.data)
            if(res.data.success){
                this.clearPass();
                this.systemmessagedialogsuccess = true
            }
            else{
                console.log(res.data.message);
            }
          });
        }
      },
      clearPass(){
          this.password = '';
          this.cpassword = '';
          this.systemmessage = '',
          this.systemmessagedialog = false
      }
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