<template>
<v-form>
    <v-container fluid>
      <v-row>
      <v-col cols="12">
        <v-img
          :src="require('../../assets/images/wirewolf.png')"
          contain
          height="190"
        />
      <h2 class="text-center">Please enter desired password</h2>
      </v-col>
       <v-col sm="12" md="6" offset-md="3">
          <v-card>
            <v-card-text>
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
                    label="Enter Your Password"
                    @click:append="show1 = !show1"
                    :rules="[(password === cpassword) || 'The password and confirmation password do not match']"
                    outlined
                  ></v-text-field>
                  <v-text-field
                    v-model="cpassword"
                    :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show2 ? 'text' : 'password'"
                    name="input-10-1"
                    label="Confirm Your Password"
                    @click:append="show2 = !show2"
                    :rules="[(password === cpassword) || 'The confirmation password and password do not match']"
                    outlined
                  ></v-text-field>
                  <v-btn
                      color="primary"
                      @click="savePass()" style="font-size: 12px;"
                      block
                  >
                    CONFIRM VERIFICATION
                </v-btn>
              </v-form>
            </v-card-text>
        </v-card>
        </v-col>

      </v-row>
    </v-container>
  
    <v-row justify="center">
        <v-dialog
            transition="dialog-bottom-transition"
            v-model="systemmessagedialogsuccess"
            max-width="60%"
        >
              <v-card>
                <v-toolbar
                  color="primary"
                ></v-toolbar>
                <v-card-text>
                  <br>
                  <div class="text-h6"> Successfully verified</div>
                </v-card-text>
                <v-card-actions class="justify-end">
                  <v-btn
                    color="primary"
                    text
                    class="white--text"
                    @click="$router.push('/login');"
                  >
                      Close
                  </v-btn>
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

