<template>
  <v-form>
    <v-container fluid class="clinic-container">
      <v-row class="text-center">
        <v-card class="clinic-card" elevation="10">
          <v-col cols="12">
            <!-- Replace with TLDC Clinic logo -->
            <v-img
              :src="require('../../assets/images/tldc_logo.png')"
              class="my-3"
              contain
              height="190"
            />
          </v-col>

          <v-col class="mb-4">
            <v-card-text>
              <h5 class="text-left clinic-text">
                Please enter your email address to receive a password reset link.
              </h5>
              <br>
              <v-text-field
                v-model="email"
                color="purple"
                label="Email"
                outlined
              ></v-text-field>
            </v-card-text>

            <v-row>
              <v-col cols="2"></v-col>
              <v-col cols="8">
                <v-btn
                  @click="ForgotPassword()"
                  block
                  rounded
                  class="clinic-btn"
                >
                  <span>Submit</span>
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
  }),
  created() {
    this.$store.state.header = false;
    this.$store.state.footer = false;
  },
  methods: {
    ForgotPassword() {
      if (this.email == "") {
        this.$store.state.snackbar.message = "The email field is required.";
        this.$store.state.snackbar.colors = "xred";
        this.$store.state.snackbar.icon = "mdi-alert-outline";
        this.$store.state.snackbar.show = true;
      } else {
        let loader = this.$loading.show();
        let payload = {
          email: this.email,
          url: window.location.origin
        };

        emailservices.forgotPassword(payload).then(response => {
          if (response.data.success) {
            loader.hide();
            this.$router.push('/login');
            this.$store.state.snackbar.message = "A password reset link has been sent. Please check your email.";
            this.$store.state.snackbar.colors = 'xgreen';
            this.$store.state.snackbar.icon = "mdi-check-circle-outline";
            this.$store.state.snackbar.show = true;
          } else {
            this.$store.state.snackbar.message = response.data.message;
            this.$store.state.snackbar.colors = "xred";
            this.$store.state.snackbar.icon = "mdi-alert-outline";
            this.$store.state.snackbar.show = true;
            loader.hide();
          }
        }).catch(error => console.log(error));
      }
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

.clinic-text {
  color: #6A1B9A;
  font-weight: 500;
}

.text-gradiant-link {
  background-image: linear-gradient(to right, #6A1B9A, #9C27B0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 500;
}
</style>
