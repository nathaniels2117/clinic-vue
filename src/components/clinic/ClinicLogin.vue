<template>
  <v-form>
    <v-container fluid class="clinic-container">
      <v-row class="text-center">
        <v-card class="clinic-card" elevation="10">
          <v-col cols="12">
            <v-img :src="require('../../assets/images/tldc_logo.png')" class="my-3" contain height="190" />
          </v-col>

          <v-col class="mb-4">
            <v-col cols="12">
              <v-text-field v-model="email" label="Email" color="purple" outlined></v-text-field>

              <v-text-field v-model="password" label="Password" outlined color="purple"
                :append-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'" :type="show_password ? 'text' : 'password'"
                @click:append="show_password = !show_password"></v-text-field>

              <p class="text-right">
                <a href="" class="subheading font-weight-regular text-gradiant-link">
                  <span class="text-gradiant-link" @click="FogotPassword()">Forgot Password?</span>
                </a>
              </p>
            </v-col>

            <v-row>
              <v-col cols="2"></v-col>
              <v-col cols="8">
                <v-btn rounded block class="clinic-btn" @click="userLogin()">
                  <span>Login</span>
                </v-btn>
              </v-col>
              <v-col cols="2"></v-col>
            </v-row>
            <!-- 
            <v-row>
              <v-col cols="2"></v-col>
              <v-col cols="8">
                <div id="g_id_onload" :data-client_id="url"></div>
                <div id="signin_button"></div>
              </v-col>
            </v-row>
            -->
            <br>
            <p class="subheading font-weight-regular">
              Don't have an account yet?
              <a href="" class="subheading font-weight-regular text-gradiant-link">
                <span class="text-gradiant-link" @click="Register()">Register Here</span>
              </a>
            </p>
          </v-col>
        </v-card>
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
  mounted() {
    let googleScript = document.createElement('script');
    googleScript.src = 'https://accounts.google.com/gsi/client';
    document.head.appendChild(googleScript);

    window.addEventListener('load', () => {
      window.google.accounts.id.initialize({
        client_id: this.url,
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
        }
      );
    })
  },
  methods: {
    googlesigin(response) {
      console.log(jwt_decode(response.credential));
      let google_id = (jwt_decode(response.credential));
      let payload = { google_id: google_id.sub, login_type: 1 };

      loginservices.userLogin(payload).then(response => {
        if (response.data.success) {
          let response_data = {
            access_token: response.data.access_token,
            account_information: response.data.account_information
          };
          this.$store.state.userinfo.push(response_data);
          localStorage.setItem("userinfo", JSON.stringify(response_data));
          localStorage.setItem("is_hris", 1);
          localStorage.setItem("sub_type", response.data.subscription_type);
          this.$router.push('/hrisdashboard');

          this.$store.state.snackbar.message = response.data.message;
          this.$store.state.snackbar.colors = 'xgreen';
          this.$store.state.snackbar.icon = "mdi-check-circle-outline";
          this.$store.state.snackbar.show = true;
        } else {
          this.$store.state.snackbar.message = response.data.message;
          this.$store.state.snackbar.colors = "xred";
          this.$store.state.snackbar.icon = "mdi-alert-outline";
          this.$store.state.snackbar.show = true;
        }
      }).catch(error => console.log(error));
    },
    userLogin() {
      let payload = { email: this.email, password: this.password, login_type: 1 };
      loginservices.userLogin(payload).then(response => {
        if (response.data.success) {
          let response_data = {
            access_token: response.data.access_token,
            account_information: response.data.account_information
          };
          this.$store.state.userinfo.push(response_data);
          localStorage.setItem("userinfo", JSON.stringify(response_data));
          localStorage.setItem("is_hris", 1);
          localStorage.setItem("nav_hide", 0);
          localStorage.setItem("company_image_path", response.data.company_image_path);
          localStorage.setItem("business_information", JSON.stringify(response.data.account_information.parent_business_information));
          localStorage.setItem("sub_type", response.data.subscription_type);

          this.$router.push('/clinicdashboard');

          this.$store.state.snackbar.message = response.data.message;
          this.$store.state.snackbar.colors = 'xgreen';
          this.$store.state.snackbar.icon = "mdi-check-circle-outline";
          this.$store.state.snackbar.show = true;
        } else {
          this.$store.state.snackbar.message = response.data.message;
          this.$store.state.snackbar.colors = "xred";
          this.$store.state.snackbar.icon = "mdi-alert-outline";
          this.$store.state.snackbar.show = true;
        }
      }).catch(error => console.log(error));
    },
    Register() {
      this.$router.push('/register');
    },
    FogotPassword() {
      this.$router.push('/forgotpassword');
    }
  }
}
</script>

<style scoped>
.clinic-container {
  max-width: 420px;
  margin: auto;
  padding-top: 60px;
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
}

.text-gradiant-link {
  background-image: linear-gradient(to right, #6A1B9A, #9C27B0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 500;
}

.v-text-field {
  margin-bottom: 16px;
}
</style>
