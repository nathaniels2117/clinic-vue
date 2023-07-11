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

    <v-col class="mb-4">
            <v-card-text>
              <h5 class="text-left">Please enter your Email to receive password reset Email.</h5>
              <br>
                <v-text-field
                  v-model="email"
                  color="orange"
                  label="Email"
                  outlined
                ></v-text-field>
                
            </v-card-text>
            <v-row>
          <v-col cols="2"></v-col>
          <v-col cols="8">
            <v-btn
                    @click="ForgotPassword()" style="font-size: 12px;"
                    block
                    rounded
                >
                    <span class="text-gradiant-link">Submit</span>
                </v-btn>
              </v-col>
          <v-col cols="2"></v-col>
          </v-row>                
                <br>
                </v-col>
        </v-card>

      </v-row>
    </v-container>
  </v-form>
    
</template>

<script>

  import emailservices from '../services/emailservices';

  export default {
     name: 'emailconfirm',
     data: () => ({
          email: '',
      }
    ),
    created(){
          this.$store.state.header = false;
          this.$store.state.footer = false;
    },
    mounted(){
    },
    methods: {
      ForgotPassword(){

        if(this.email == ""){
              this.$store.state.snackbar.message = "The email field is required.";
                    this.$store.state.snackbar.colors = "xred";
                    this.$store.state.snackbar.icon = "mdi-alert-outline";
                    this.$store.state.snackbar.show = true;
            }else{
            //Set Loader
            
            let loader = this.$loading.show();
            //Set Payload
            let payload = {
                email: this.email,
                url: window.location.origin
            };

            emailservices.forgotPassword(payload).then(response =>{
                if(response.data.success){
                  loader.hide();
                    this.$router.push('/login');
                    //For Snackbar
                    this.$store.state.snackbar.message = "Change password link was sent, please check your e-mail";
                    this.$store.state.snackbar.colors = 'xgreen';
                    this.$store.state.snackbar.icon = "mdi-check-circle-outline";
                    this.$store.state.snackbar.show = true;
                }
                else{
                  this.$store.state.snackbar.message = response.data.message;
                    this.$store.state.snackbar.colors = "xred";
                    this.$store.state.snackbar.icon = "mdi-alert-outline";
                    this.$store.state.snackbar.show = true;
                   loader.hide();
                    // console.log(response.data.message);
                }
                
            }).catch(error => console.log(error));
          }
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