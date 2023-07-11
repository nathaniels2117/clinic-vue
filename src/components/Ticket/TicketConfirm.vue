<template>
    <v-app>
    <v-main class="darkthemes">
        <v-card
                  :loading="loading"
              >
    <v-form class="darkthemes">
        <v-container fluid>
          <v-row>
          <v-col cols="12">
            <v-img
              :src="require('../../assets/images/wirewolf.png')"
              contain
              height="190"
            />
          <h2 class="text-center">Ticket</h2>
          </v-col>
           <v-col sm="12" md="12" offset-md="12">
              <v-card>
                <v-data-table
                    :headers="headers"
                    :items="ticket_info"
                    
                    :page.sync="page"
                      @page-count="pageCount = $event"
                      :footer-props="{
                      showFirstLastPage: false
                      }"
                >

                    <template v-slot:item.name="props">
                        {{ props.item.req_firstname }} {{ props.item.req_lastname }}
                    </template>
                    <template v-slot:item.proof_file="props">
                        <div v-if="props.item.proof != null">
                            <a href="#" @click.prevent="getfile(props.item.proof)">View</a>
                        </div>
                    </template>
                    <template v-slot:item.jor_informations="props">
                        <div v-if="(props.item.jor_id != 0)">
                        {{ props.item.jor_info.name }}
                        </div>
                        <div v-else>
                        {{ props.item.others }}
                        </div>
                    </template>
                    <template v-slot:item.responses="props">
                      <v-btn
                            v-if="(props.item.status==0)"
                            color="primary"
                            @click="respondticket(props.item.id, 1)" style="font-size: 12px;"
                        >
                          Respond
                      </v-btn>

                      <v-btn
                            v-if="(props.item.status==1)"
                            color="success"
                            @click="closeticket(props.item.id, 2)" style="font-size: 12px;"
                        >
                          Finish
                      </v-btn>

                      <v-btn
                            v-if="(props.item.status==2)"
                            color="information"
                        >
                          Closed
                      </v-btn>
                    </template>
                </v-data-table>
                <v-pagination
                    color="orange"
                    v-model="page"
                    :length="pageCount"
                ></v-pagination>

                <v-card-text>
                  <v-form
                    ref="form"
                    v-model="valid"
                    lazy-validation
                  >
                      
                  <!-- <center>
                      <v-btn
                          v-if="this.ticket_check.res_date==null"
                          color="success"
                          @click="respondticket()" style="font-size: 12px;"
                      >
                        Respond
                    </v-btn>
                </center> -->
                  </v-form>
                </v-card-text>
            </v-card>
            </v-col>
    
          </v-row>
        </v-container>
      
        <v-row justify="center">

      <v-form
            ref="form"
            v-model="valid"
            lazy-validation
        >
            <v-dialog
                transition="dialog-bottom-transition"
                persistent
                v-model="respondticketdialog"
                max-width="60%"
                class="darkthemes"
            >
                  <v-card>
                    <v-toolbar
                      color="orange"
                      class="text-h6 white--text"
                    >Respond</v-toolbar>
                    <v-card-text>
                      <br>
                      <v-col sm="12" md="6" offset-md="3"> 
                            <v-menu
                                v-model="menuenddate"
                                :close-on-content-click="false"
                                :nudge-right="40"
                                transition="scale-transition"
                                offset-y
                                min-width="auto"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                        v-model="ticket_information.req_estimated_date"
                                        label="Estimated Date"
                                        prepend-icon="mdi-calendar"
                                        readonly
                                        color="orange"
                                        v-bind="attrs"
                                        v-on="on"
                                        :rules="[v => !!v || 'Estimated Date is required']"
                                    ></v-text-field>
                                </template>
                                <v-date-picker
                                v-model="ticket_information.req_estimated_date"
                                color="orange"
                                @input="menuenddate = false"
                                ></v-date-picker>
                            </v-menu>
                        </v-col>
                            <v-text-field
                                v-model="ticket_information.res_firstname"
                                label="Firstname"
                                color="orange"
                                :rules="[v => !!v || 'Firstname is required']"
                            ></v-text-field>
                            <v-text-field
                                v-model="ticket_information.res_lastname"
                                label="Lastname"
                                color="orange"
                                :rules="[v => !!v || 'Lastname is required']"
                            ></v-text-field>
                            <v-text-field
                                v-model="ticket_information.res_email"
                                label="Email"
                                color="orange"
                                :rules="[v => !!v || 'Email is required']"
                            ></v-text-field>
                            <v-text-field
                                v-model="ticket_information.res_number"
                                label="Mobile Number"
                                single-line
                                :rules="[v => !!v || 'Mobile number is required',(ticket_information.res_number && ticket_information.res_number.length >= 11) || 'minimum 11 numbers']"
                                v-mask="'09#########'"
                                color="orange"
                            ></v-text-field>
                    </v-card-text>
                    <v-card-actions class="justify-end">
                      <v-btn
                        color="red"
                        text
                        class="white--text"
                        @click="respondticketdialog = false"
                      >
                          Cancel
                      </v-btn>
                      <v-btn
                        color="orange"
                        text
                        class="white--text"
                        @click="validate()"
                      >
                          Submit
                      </v-btn>
                    </v-card-actions>
                  </v-card>
            </v-dialog>

      </v-form>
        </v-row>
      </v-form>
      </v-card>

                <!-- save confirmation dialog -->
                <template>
            <v-row justify="center">
              <v-dialog
                v-model="finishticketconfirmation"
                persistent
                max-width="290"
              >
                <v-card>
                  <v-card-title class="text-h5">
                    Save
                  </v-card-title>
                  <v-card-text>Are you sure you want to finish ticket?</v-card-text>
                  <!-- <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="orange"
                      text
                      @click="changeStatusDialogSave(false)"
                    >
                      Cancel
                    </v-btn>
                    <v-btn
                      color="orange"
                      text
                      @click="SaveProductInformation()"
                    >
                      Save
                    </v-btn>
                  </v-card-actions> -->
                  <center>
                    <v-btn
                      elevation="2"
                      class="mx-2"
                      dark
                      outlined
                      small
                      color="red"
                      @click="changeStatusDialogSave(false)"
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
                      @click="FinishTicket()"
                      >
                      Confirm
                    </v-btn>
                  </center>
                  <br>
                </v-card>
              </v-dialog>
            </v-row>
          </template>
              <!-- end save confirmation dialog -->

        </v-main>
        </v-app>
    </template>
    
    <script>
    
    import ticketservices from "../services/ticketservices";
    
      export default {
         name: 'TicketConfirm',
         data: () => ({
          loading: false,
          ticket_check:[],
          saveconfirmation: false,
          finishticketconfirmation: false,
          finshidticket: 0,
          finshtypeticket: 0,
          action_type: 0,
            respondticketdialog: false,
            action_ticket_id: 0,
                valid: '',
                proof_path: null,
              ticket_id: 0,
              ticket_info : [],
              menuenddate: false,
              ticket_information: {
                res_date: '',
                res_firstname: '',
                res_lastname: '',
                res_email: '',
                res_number: '',
                req_estimated_date: '',
                status: 0
              },
            page: 1,
            pageCount: 0,
              headers: [
            {
                text: '#',
                align: 'start',
                sortable: true,
                value: 'id',
            },
            { text: 'Date of Request',sortable: false, value: 'created_at' },
            { text: 'Name',sortable: false, value: 'name' },
            { text: 'Role/Position',sortable: false, value: 'req_role' },
            { text: 'Email',sortable: false, value: 'req_email' },
            { text: 'Locale/Branch',sortable: false, value: 'div_info.branch_name' },
            { text: 'Department',sortable: false, value: 'dept_info.name' },
            { text: 'Mobile Number',sortable: false, value: 'req_number' },
            { text: 'JOR',sortable: false, value: 'jor_informations' },
            { text: 'Location of Concern',sortable: false, value: 'div_info_res.branch_name' },
            { text: 'Statement of Request',sortable: false, value: 'sor' },
            { text: 'Proof',sortable: false, value: 'proof_file' },
            { text: 'Action',sortable: false, value: 'responses' }
            ],
          }
        ),
        created(){
              this.$store.state.header = false;
              this.$store.state.footer = false;
              this.ticket_id = this.$route.params.id
              this.FetchTicketInformation(this.$route.params.id)
              this.FetchTicketViaID(this.$route.params.id)
        },
        mounted(){
            //   this.ticket_id = this.$route.params.id; get params from url vue
            //   this.FetchTicketInformation(this.$route.params.id)
        },
        methods: {
        changeStatusDialogSave(status){
            this.finishticketconfirmation = status;
        },
            getdate(){
                const today = new Date();
                const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
                const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                const dateTime = date +' '+ time;
                this.ticket_information.res_date = dateTime;  
            },
            getfile(file) {
                // alert(file);
                window.open(this.proof_path + file, "_blank");
            },
            async FetchTicketInformation(id){
            let payload = {
                res_dept: parseInt(id)
            };

            await ticketservices.fetchTicketInformationViaRespondDepartment(payload).then(response => {
                    if(response.data.success){
                            this.ticket_info = response.data.result
                            console.log(this.ticket_info)
                            this.proof_path = response.data.path
                    }
                }).catch(error => console.log(error));
          },
          FetchTicketViaID(id){
            let payload = {
                ticketid: parseInt(id)
            };

            ticketservices.fetchTicketInformationViaID(payload).then(response => {
                    if(response.data.success){
                            this.ticket_check = response.data.result
                            // console.log(this.ticket_check.res_date)
                    }
                }).catch(error => console.log(error));
          },
          respondticket(id, type){
            this.action_ticket_id = id
            this.action_type = type
            this.respondticketdialog = true
          },
        validate(){
            this.$refs.form.validate();
            let val = this.$refs.form.validate();
            if(val){
                this.confirmticket();
            }
        },
        FinishTicket(){
          this.ticket_information['status'] = this.finshtypeticket
            let loader = this.$loading.show();
            let payload = {
                    ticketid: this.finshidticket,
                    ticket_information: JSON.stringify(this.ticket_information)
                };

                    ticketservices.updateTicketInformation(payload).then(response => {
                        if(response.data.success){

                            loader.hide();
                            this.respondticketdialog = false;
                            this.$store.state.snackbar.message = response.data.message;
                            this.$store.state.snackbar.show = true;
                            window.location.reload();
                        }
                    }).catch(error => console.log(error));
        },
        closeticket(id, type){
            this.finshidticket = id
            this.finshtypeticket = type
            this.finishticketconfirmation = true
        },
        confirmticket(){
            this.getdate()
            this.ticket_information['status'] = this.action_type
            let loader = this.$loading.show();
            let payload = {
                    ticketid: this.action_ticket_id,
                    ticket_information: JSON.stringify(this.ticket_information)
                };

                    ticketservices.updateTicketInformation(payload).then(response => {
                        if(response.data.success){

                            loader.hide();
                            this.respondticketdialog = false;
                            this.$store.state.snackbar.message = response.data.message;
                            this.$store.state.snackbar.show = true;
                            window.location.reload();
                        }
                    }).catch(error => console.log(error));
        }
        }

      }
    </script>
    
    <style scoped>
    .darkthemes {
      background-color: gray;
    }
    </style>
    