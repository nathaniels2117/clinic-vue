<template>
  <v-form>
  <v-container fluid>
    <br>
    <br>
    <br>
    <br>
    <v-row class="text-center">
        <v-card>
      <v-col cols="12">

        <v-img
          :src="require('../../assets/images/wirewolf_logo1.png')"
          class="my-3"
          contain
          height="190"
        />
      </v-col>

      <v-col class="mb-4">
        <v-col
          cols="12"
        >
        <v-text-field
            v-model="email"
            label="Email"
            color="orange"
            outlined
        ></v-text-field>

        <v-text-field
            v-model="password"
            label="Password"
            outlined
            color="orange"
            :append-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show_password ? 'text' : 'password'"
            @click:append="show_password = !show_password"
        ></v-text-field>

        <p class="text-right">
            <!-- <a href="https://nerdvana.com.ph/wirewolf/register" target="_blank">Forgot Password?</a> -->
            <!-- <v-btn
              text
              color="primary"
              style="font-size: 11px;"> -->
              <a href="" class="subheading font-weight-regular text-gradiant-link">
            <span class="text-gradiant-link" @click="FogotPassword()">Forgot Password?</span>
          </a>
              
            <!-- </v-btn> -->
            <!-- <p><span class="display-2 font-weight-bold mb-3 text-gradiant">Forgot Password</span></p>             -->
        </p>

        
        </v-col>
        <v-row>
          <v-col cols="2"></v-col>
      <v-col cols="8">
        <v-btn
            rounded
            block
            background-color="lightgray"
            class=""
            @click="userLogin()"
        >
        <span class="text-gradiant-link">Login</span>
      </v-btn>
    </v-col>
    <v-col cols="2"></v-col>
    </v-row>

    <v-row>
          <v-col cols="2"></v-col>
      <v-col cols="8">
        <!-- <div>
        <div id="signin_button"></div>
    </div> -->

    
    <!-- localhost -->
    <div id="g_id_onload"
     data-client_id="this.url">
    </div>

    <!-- for test server -->
    <!-- <div id="g_id_onload"
        data-client_id="605937123582-2v86p1vpacnn4hc3mmcdbo5l4nl7jv6e.apps.googleusercontent.com">
    </div> -->


    <div id="signin_button" ></div>
<!-- <div id="g_id_onload"
     data-client_id="605937123582-e55km36m224h3rqrgs65bmqalrkn1in9.apps.googleusercontent.com"
     data-context="use"
     data-ux_mode="redirect"
     data-auto_select="true"
     data-close_on_tap_outside="false"
     data-itp_support="true"
     data-callback="handleCredentialResponse"
     data-login_uri="https://positive.com.ph/login/">
</div>

<div class="g_id_signin"
     data-type="standard"
     data-shape="pill"
     data-theme="outline"
     data-text="continue_with"
     data-size="large"
     data-logo_alignment="left">
</div> -->


    </v-col>
    </v-row>
      <br>
        <p class="subheading font-weight-regular">
          Don't have an account yet?
          <!-- <v-btn
            text
            color="primary"
            style="font-size: 11px;"
            @click="Register()"
          > -->
          <a href="" class="subheading font-weight-regular text-gradiant-link">
          <span class="text-gradiant-link" @click="Register()">Register Here</span>
          </a>
          <!-- </v-btn> -->
        </p>
      
      </v-col>
    </v-card>
    <!-- </table>
  </div> -->
    <!-- </v-card> -->
    </v-row>
  
  </v-container>
</v-form>
</template>

<script>
import jwt_decode from "jwt-decode";
  import loginservices from '../services/loginservices';

  export default {
    name: 'Login',
    data: () => ({
        email: "",
        password: "",
        show_password: false,
        isLogin: false,
        url: ""
    }),
    created() {
        this.$store.state.header = false;
        this.$store.state.footer = false;
        this.$store.state.snackbar.color = 'primary';
        this.url = process.env.VUE_APP_GOOGLE_CLIENT_ID;

    },
    mounted: function () {
      // function handleCredentialResponse(response) {
      //   let google_id = jwt_decode(response.credential);
      //   console.log(google_id);
      // }
            let googleScript = document.createElement('script');
            googleScript.src = 'https://accounts.google.com/gsi/client';
            document.head.appendChild(googleScript);
            
            window.addEventListener('load', () => {
                // console.log(window.google);
                window.google.accounts.id.initialize({
                  // credentials for local
                    client_id: this.url,

                    // credentials for test server
                    // client_id: "605937123582-2v86p1vpacnn4hc3mmcdbo5l4nl7jv6e.apps.googleusercontent.com",
                    // callback: handleCredentialResponse,
                    callback: this.googlesigin
                });
                window.google.accounts.id.renderButton(
                    document.getElementById("signin_button"),
                    { 
                      width: "225px",
                      theme: "outline", 
                      size: "large",
                      type: "standard",
                      shape: "pill"
                     }  // customization attributes
                );
            })
        },
    methods: {
      googlesigin(response) {
                console.log(jwt_decode(response.credential));

                let google_id = (jwt_decode(response.credential));


            let payload = {
              google_id: google_id.sub,
              login_type: 1
            };

            loginservices.userLogin(payload).then(response => {
                if(response.data.success){

                    let response_data = {
                        access_token: response.data.access_token,
                        account_information: response.data.account_information
                    };
                    this.$store.state.userinfo.push(response_data);
                    localStorage.setItem("userinfo", JSON.stringify(response_data));

                    // this.$router.push('/dashboard');

                    // if(response.data.user_other_personal_information.employment_status == 0){
                    //   localStorage.setItem("is_hris", 0);
                    //   this.$router.push('/dashboard');
                    // }else{
                      // localStorage.setItem("is_hris", 1);
                      // this.$store.state.is_hris = 1
                      // this.$router.push('/hrisdashboard');
                    // }
                    localStorage.setItem("is_hris", 1);
                    localStorage.setItem("sub_type", response.data.subscription_type);
                      this.$router.push('/hrisdashboard');

                    //For Snackbar
                    this.$store.state.snackbar.message = response.data.message;
                    this.$store.state.snackbar.colors = 'xgreen';
                    this.$store.state.snackbar.icon = "mdi-check-circle-outline";
                    this.$store.state.snackbar.show = true;

                }
                else{
                  // alert('as');
                    this.$store.state.snackbar.message = response.data.message;
                    this.$store.state.snackbar.colors = "xred";
                    this.$store.state.snackbar.icon = "mdi-alert-outline";
                    this.$store.state.snackbar.show = true;
                }
            }).catch(error => console.log(error)); 
            },
        userLogin(){

            let payload = {
                email: this.email,
                password: this.password,
                login_type: 1
            };

            loginservices.userLogin(payload).then(response => {
                if(response.data.success){

                    let response_data = {
                        access_token: response.data.access_token,
                        account_information: response.data.account_information
                    };
                    this.$store.state.userinfo.push(response_data);
                    localStorage.setItem("userinfo", JSON.stringify(response_data));
                    // console.log(response.data.user_other_personal_information.employment_status)
                    // if(response.data.user_other_personal_information.employment_status == 0){
                    //   localStorage.setItem("is_hris", 0);
                    //   this.$router.push('/dashboard');
                    // }else{
                    //   localStorage.setItem("is_hris", 1);
                    //   this.$store.state.is_hris = 1
                    //   this.$router.push('/hrisdashboard');
                    // }
                    localStorage.setItem("is_hris", 1);
                    localStorage.setItem("sub_type", response.data.subscription_type);
                      this.$router.push('/hrisdashboard');


                    //For Snackbar
                    this.$store.state.snackbar.message = response.data.message;
                    this.$store.state.snackbar.colors = 'xgreen';
                    this.$store.state.snackbar.icon = "mdi-check-circle-outline";
                    this.$store.state.snackbar.show = true;

                }
                else{
                  // alert('as');
                    this.$store.state.snackbar.message = response.data.message;
                    this.$store.state.snackbar.colors = "xred";
                    this.$store.state.snackbar.icon = "mdi-alert-outline";
                    this.$store.state.snackbar.show = true;
                }
            }).catch(error => console.log(error)); 

        },
        Register(){
            this.$router.push('/register');
        },
        FogotPassword(){
            this.$router.push('/forgotpassword');
        }
    }
  }
</script>

<style scoped>
.text-gradiant{
      /* Fallback: Set a background color. */
    background-color: red;
    font-weight: bold;
    /* Create the gradient. */
    background-image: linear-gradient(to right, #f54001 , #efb923);
    
    /* Set the background size and repeat properties. */
    background-size: 100%;
    background-repeat: repeat;

    /* Use the text as a mask for the background. */
    /* This will show the gradient as a text color rather than element bg. */
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent; 
    -moz-background-clip: text;
    -moz-text-fill-color: transparent;
  }
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
