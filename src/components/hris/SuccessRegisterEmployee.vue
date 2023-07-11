<template>
  <!-- Pop up dialog form for success register employee -->
  <v-form> 
      <v-container fluid>
        <br><br><br><br>
        <v-row class="text-center">
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
                <div>
                    <p class="text-middle font-weight-black">
                        Employee Information has been created
                    </p>
                    <p class="text-left">
                        Please wait for the admin confirmation. An email will be sent to you after the admin confirmation for your password creation.
                    </p>
                    <h2 class="text-middle font-weight-black">
                        Thank you!
                    </h2>
                </div>
                <br>
            </v-card-text>
          </v-card>
        </v-row>
      </v-container>
  </v-form>
  <!-- Pop up dialog form for success register employee -->
</template>
    
<script>

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
          this.$store.state.isChat = 1
    },
    mounted(){
          this.user_id = this.$route.params.id; //get params from url vue
    },
    methods: {
      savePass(){
        close();
        // window.close(``, `_parent`, ``);
        // open(location, '_self').close(); refresh
        // window.open('', '_self', ''); window.close();
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