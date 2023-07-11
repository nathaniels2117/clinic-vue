<template>
    
<v-app>

    <div class="box">
      <v-toolbar
        dark
        prominent
        src="../../assets/images/ticketbanner.jpg" 
      >
        <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->
<!--   
        <v-toolbar-title>Ticketing</v-toolbar-title> -->
  
        <v-spacer></v-spacer>
  
        <!-- <v-btn icon>
          <v-icon>mdi-export</v-icon>
        </v-btn> -->
      </v-toolbar>
    </div>
    <v-main class="darkthemes">
    <v-container  style="max-width: 90%; position: relative;" >
    <div class="box stack-top">
      <v-row>
          <v-col cols="12">
              <v-card
                  :loading="loading"
                  elevation="10"
              >
                  <template slot="progress">
                      <v-progress-linear
                          color="deep-purple"
                          height="10"
                          indeterminate
                      ></v-progress-linear>
                  </template>
  
                  <v-card-text>
                    <h3>Ticketing</h3>
                  </v-card-text>

<!-- one liner -->

<!-- <v-form
            ref="forms"
            v-model="valids"
            lazy-validation
        > -->
                  <template>
  <v-toolbar dense style="background:#cacaca">
    <v-row>
        <v-col cols="12">
    <v-text-field
          v-model="search"
          prepend-inner-icon="mdi-magnify"
          placeholder="Search"
          solo
          dense
          hide-details
          color="orange"
          overflow
          style="max-width: 100%;"
      ></v-text-field>
      </v-col>
      </v-row>

    <!-- <template v-if="$vuetify.breakpoint.mdAndUp"> -->

      
      <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
            <v-btn
                color="orange"
                dark
                v-bind="attrs"
                v-on="on"
                class="mx-1"
                style="height:39px"
            >
            <v-icon>mdi-office-building</v-icon>Select Department
            </v-btn>
            </template>
            <v-list>
            <v-list-item
                v-for="(item, index) in concern_department"
                :key="index"
            >
                <v-list-item-title @click="chkdepartment(item.value)"> {{ item.text }}</v-list-item-title>
            </v-list-item>
            </v-list>
        </v-menu>

      <!-- <v-divider vertical></v-divider> -->
        <v-text-field
            hide-details
            placeholder="Email"
            v-model="searchemail"
            small
            dense
            solo
            color="orange">
            <template #append>
                <v-btn
                    color="orange"
                    type="submit"
                    value="Subscribe"
                    class="rounded-l-0"
                    style="height:38px; width:100%"
                    @click="employeesearch()"
                    >
                    <v-icon color="white">mdi-at</v-icon><font color="white"> Search Email</font>
                </v-btn>
            </template>
        </v-text-field>
        <!-- <v-flex class="pt-1"> 
            <v-btn dark small color="orange" @click="validates()" class="pt-1"><v-icon>mdi-account-group</v-icon>Search Email</v-btn> -->
        <!-- </v-flex> -->
      <!-- <v-flex class=""> -->
            <v-btn
                class="mx-1 pt-1"
                dark
                medium
                color="orange"
                @click="CreateTicket()"
            >
                <v-icon small>
                    <!-- mdi-ticket-confirmation -->
                     mdi-plus
                </v-icon>
                Create
            </v-btn>
        <!-- </v-flex> -->
    <!-- </template> -->

  </v-toolbar>
</template>

<!-- </v-form> -->
<!-- end one liner -->


                        <!-- <center>
                    <v-btn
                            elevation="2"
                            class="mx-6"
                            outlined
                            dark
                            small
                            color="orange"
                            width="250px"
                            @click="CreateTicket()"
                        >
                            <v-icon small>
                                mdi-ticket-confirmation
                            </v-icon>
                            Create
                        </v-btn>
                        <br>
                        <br>

                            <v-btn
                            elevation="2"
                            class="mx-2"
                            outlined
                            dark
                            small
                            color="orange"
                            @click="employeesearch()"
                        >
                            <v-icon small>
                                mdi-account-group
                            </v-icon>
                            Employee
                        </v-btn>
                        <v-btn
                            elevation="2"
                            class="mx-2"
                            outlined
                            dark
                            small
                            color="orange"
                            @click="departmentsearch()"
                        >
                            <v-icon small>
                                mdi-office-building
                            </v-icon>
                            Department
                        </v-btn>
                        </center>
                        <br><br>
                        <div v-show="employee_stats">
                    <v-form
                        ref="forms"
                        v-model="valids"
                        lazy-validation
                    >
                  <v-row>
                    <v-col 
            :md="4"
            :sm="4"
            :cols="12"
            :lg="4">
  
                        <v-text-field
                            elevation="2"
                            class="mx-2"
                            hint="Email *"
                            persistent-hint
                            single-line
                            v-model="searchemail"
                            small
                            :rules="[v => !!v || 'Email is required']"
                            color="orange">
                        </v-text-field>

                    </v-col>
                    <v-col 
            :md="4"
            :sm="4"
            :cols="12"
            :lg="4">
                        <v-btn
                            elevation="2"
                            class="mx-2"
                            outlined
                            dark
                            small
                            color="orange"
                            @click="validates()">
                            <v-icon small>
                                mdi-magnify
                            </v-icon>
                            View Ticket
                        </v-btn>
                    </v-col>
                    </v-row>
                    </v-form>
                </div>
                <div v-show="department_stats">
                  <v-row>
                    <v-col 
            :md="4"
            :sm="4"
            :cols="12"
            :lg="4">
                        <v-combobox
                            elevation="2"
                            class="mx-2"
                            hint="Department *"
                            persistent-hint
                            single-line
                            small
                            color="orange"
                            v-model="filter_department"
                            :items="concern_department"
                            @change="chkdepartment()"
                        ></v-combobox>
                    </v-col>
                </v-row>
                </div> -->
                <br>
                  <!-- <div v-if="(ticket_informations) != 0"> -->
                  <v-data-table
                    :headers="headers"
                    :items="ticket_informations"
                    :search="search"
                    :page.sync="page"
                      @page-count="pageCount = $event"
                      :footer-props="{
                      showFirstLastPage: false
                      }"
                >
                <!-- :item-class="itemRowBackground" -->


                <template v-slot:item.req_estimated_date="props">
                    <div v-if="props.item.status!=2 && props.item.req_estimated_date < todate">
                            <font color="red">
                        {{ props.item.req_estimated_date }}
                            </font>
                    </div>
                    <div v-else>
                        {{ props.item.req_estimated_date }}
                    </div>
                    </template>
                    <template v-slot:item.name="props">
                        {{ props.item.req_firstname }} {{ props.item.req_lastname }}
                    </template>
                    <template v-slot:item.res_name="props">

                        <!-- <div v-if="props.item.status!=2 && props.item.req_estimated_date < todate">
                            <font color="red">
                                <div v-if="props.item.res_firstname!=null">
                                {{ props.item.res_firstname != "" ? props.item.res_lastname+' '+props.item.res_firstname : "" }}
                                </div>
                            </font>
                        </div> -->

                        <!-- <div v-else> -->
                        <div v-if="props.item.res_firstname!=null">
                        {{ props.item.res_firstname != "" ? props.item.res_lastname+' '+props.item.res_firstname : "" }}
                        </div>
                        <!-- </div> -->
                    </template>
                    <template v-slot:item.stats="props">
                        {{ props.item.status == 0 ? 'Pending' : props.item.status == 1 ? 'Ongoing' : props.item.status == 2 ? 'Finished': props.item.status }}
                    </template>
                    <template v-slot:item.jor_informations="props">
                        <div v-if="(props.item.jor_id != 0)">
                        {{ props.item.jor_info.name }}
                        </div>
                        <div v-else>
                        {{ props.item.others }}
                        </div>
                    </template>
                    
                    <!-- <template v-slot:item.proof_file="props">
                        <div v-if="props.item.proof != null">
                            <a href="#" @click.prevent="getfile(props.item.proof)">View</a>
                        </div>
                    </template> -->
                </v-data-table>
                <v-pagination
                    color="orange"
                    v-model="page"
                    :length="pageCount"
                ></v-pagination>

                <!-- </div> -->
              </v-card>
              
          </v-col>
  
      </v-row>
    </div>
  

      <v-form
            ref="form"
            v-model="valid"
            lazy-validation
        >
    <v-dialog
      v-model="ticketdialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar
          dark
          color="orange"
        >
          <v-btn
            icon
            dark
            @click="ticketdialog = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Create Ticket</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>

        <v-col sm="12" md="6" offset-md="3" class="mt-3 text-center"> 
        </v-col>


            <!-- <v-stepper v-model="e1" max-height="100%">
                            <v-stepper-header>
                            <v-stepper-step

                                color="orange"
                                :complete="e1 > 1"
                                step="1"
                            >
                                Physical Count
                            </v-stepper-step>

                            <v-divider></v-divider>

                            <v-stepper-step
                                color="orange"
                                :complete="e1 > 2"
                                step="2"
                            >
                                Post Physical Count
                            </v-stepper-step>

                            <v-divider></v-divider>

                            <v-stepper-step 
                                color="orange"
                                step="3">
                               Complete
                            </v-stepper-step>
                            </v-stepper-header>

                            <v-stepper-items>

                            </v-stepper-items>
            </v-stepper> -->

            <!-- <v-col sm="12" md="6" offset-md="3">  -->
                <v-row style="padding: 10px 50px !important">
            <!-- <v-col md="1">
            </v-col> -->
<!-- 
            <v-col md="1">
                </v-col> -->
            <v-col 
            :md="4"
            :sm="4"
            :cols="12"
            :lg="4">
                <!-- <v-text-field
                    label="Concern Location"
                    append-icon="mdi-map-marker"
                    @click="getconcernlocation()"
                ></v-text-field> -->
                    <span>Requestor</span>
                    
                <v-text-field
                    v-model="ticket_information.req_email"
                    hint="Email *"
                    persistent-hint
                    single-line
                    :rules="emailrule"
                    color="orange"
                ></v-text-field>

                <v-combobox
                    single-line
                    v-model="ticket_information.req_branch"
                    hint="Locale / Company *"
                    persistent-hint
                    :items="concern_location"
                    :rules="[v => !!v || 'Locale / Company is required']"
                    color="orange"
                ></v-combobox>
                <v-combobox
                    single-line
                    v-model="ticket_information.req_department"
                    hint="Department *"
                    persistent-hint
                    :items="concern_department"
                    color="orange"
                    :rules="[v => !!v || 'Department is required']"
                ></v-combobox>

                <v-text-field
                    v-model="ticket_information.req_role"
                    hint="Role / Position *"
                    persistent-hint
                    single-line
                    :rules="[v => !!v || 'Role / Position is required']"
                    color="orange"
                ></v-text-field>
                

                <v-text-field
                    v-model="ticket_information.req_firstname"
                    hint="Firstname *"
                    persistent-hint
                    single-line
                    :rules="[v => !!v || 'Firstname is required']"
                    color="orange"
                ></v-text-field>

                <v-text-field
                    v-model="ticket_information.req_lastname"
                    hint="Lastname *"
                    persistent-hint
                    single-line
                    :rules="[v => !!v || 'Lastname is required']"
                    color="orange"
                ></v-text-field>

                <v-text-field
                    v-model="ticket_information.req_number"
                    hint="Mobile Number *"
                    persistent-hint
                    single-line
                    :rules="[v => !!v || 'Mobile number is required',(ticket_information.req_number && ticket_information.req_number.length >= 11) || 'minimum 11 numbers']"
                    v-mask="'09#########'"
                    color="orange"
                ></v-text-field>
            </v-col>
            
            <v-col
            :md="4"
            :sm="4"
            :cols="12"
            :lg="4">
                <!-- <v-text-field
                    hint="Concern Location *"
                    persistent-hint
                    append-icon="mdi-map-marker"
                    @click="getconcernlocation()"
                ></v-text-field> -->
                <span>Responder</span>

                <v-combobox
                    single-line
                    v-model="ticket_information.res_department"
                    hint="Concern Department *"
                    persistent-hint
                    :items="concern_department"
                    color="orange"
                    :rules="[v => !!v || 'Concern Department is required']"
                    @change="getJOR(ticket_information.res_department.text)"
                ></v-combobox>

                <v-text-field
                    v-model="ticket_information.sor"
                    hint="Statement of Request *"
                    persistent-hint
                    single-line
                    :rules="[v => !!v || 'Statement of Request is required']"
                    color="orange"
                ></v-text-field>


                <v-combobox
                    single-line
                    v-model="ticket_information.res_branch"
                    hint="Location of Concern *"
                    persistent-hint
                    :items="concern_location"
                    :rules="[v => !!v || 'Location of Concern is required']"
                    color="orange"
                ></v-combobox>

                <!-- <v-text-field
                    v-model="ticket_information.reason"
                    hint="Reason *"
                    persistent-hint
                    single-line
                    :rules="[v => !!v || 'Reason is required']"
                    value="ticket_information.sor"
                    color="orange"
                ></v-text-field> -->

                <v-text-field
                    v-show="this.budgetshow"
                    v-model="ticket_information.budget"
                    hint="Budget *"
                    persistent-hint
                    single-line
                    @keypress="filter(event)"
                    color="orange"
                ></v-text-field>
                <br>
                <!-- <input type="file" @change="uploadFile" ref="file"> -->
                <v-file-input 
                hint="Upload Proof *"
                persistent-hint
                prepend-icon="mdi-file"
                :rules="[v => !!v || 'Proof is required']"
                v-model="proof">
                </v-file-input>

        </v-col>

        <v-col
            :md="4"
            :sm="4"
            :cols="12"
            :lg="4">
            <!-- <div v-for="(branch_location, counter) in concern_location" v-bind:key="counter">
                <input type="radio" v-model="ticket_information.concern_location" :value="branch_location.id" > {{ branch_location.branch_name }}
            </div> -->
            <div v-for="(jor_infos, counter) in jor_information" v-bind:key="counter">
                <input type="radio" v-model="ticket_information.jor_id" :value="jor_infos.id" @change="getJORinfo(ticket_information.jor_id)" :rules="[v => !!v || 'JOR is required']"> {{ jor_infos.name }}
            </div>
            <v-text-field
                    v-show="this.others_stat"
                    v-model="ticket_information.others"
                    label="Others"
                    single-line
                    color="orange"
                ></v-text-field>
                <br>
                <v-btn
                        v-show="this.submitbtn"
                        color="orange"
                        block
                        outlined
                        @click="validate()"
              id="btn-next" class="btn btn-primary btn-sm p-2" style="font-size: 12px;"
                        >
                        Submit
                </v-btn>
        </v-col>

        <v-col md="1">
                </v-col>
    </v-row>
    <!-- <v-row>
        <v-col sm="4"></v-col>
        <v-col sm="4" md="4">
                        <v-btn
                        color="orange"
                        block
                        outlined
                        @click="validate()"
              id="btn-next" class="btn btn-primary btn-sm p-2" style="font-size: 12px;"
                        >
                        Submit
                      </v-btn>
                    </v-col>
        <v-col sm="4"></v-col>
    </v-row> -->
        
      </v-card>
    </v-dialog>
    </v-form>


           <!-- save confirmation dialog -->
           <template>
            <v-row justify="center">
              <v-dialog
                v-model="saveconfirmation"
                persistent
                max-width="290"
              >
                <v-card>
                  <v-card-title class="text-h5">
                    Save
                  </v-card-title>
                  <v-card-text>Are you sure you want to submit ticket?</v-card-text>
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
                      @click="SubmitTicket()"
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
    </v-container>
    </v-main>

</v-app>
  </template>
  
  <script>
  
    import ticketservices from "../services/ticketservices";
    // import divisionservices from "../services/divisionservices";
    // import branchservices from '../services/branchservices';

    export default {
      name: 'Ticket',
      data: () => ({
          loading: false,
          todate: '',
          employee_stats: false,
          department_stats: false,
          valid: '',
          valids: '',
          filter_department: '',
          ticket_check : [],
        search: '',
          searchemail: '',
          e1: 1,
          ticketdialog: false,
          ticket_informations: [],
          ticket_information: {
            req_email: '',
            req_firstname: '',
            req_lastname: '',
            req_branch: '',
            req_department: '',
            req_role: '',
            req_number: '',
            res_branch: '',
            res_department: '',
            jor_id: '',
            sor: '',
            reason: '',
            budget: 0,
            others: '',
            status: 0
          },
          emailrule: [
                value => !!value || 'Email is Required.',
                value => {
                const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                return pattern.test(value) || 'Invalid Email.'
                },
            ],
          proof: null,
          concern_location: [],
          concern_department: [],
          jor_information: [],
          others_stat: false,
          listbranch: false,
          budgetshow: false,
          submitbtn: false,
          saveconfirmation: false,
            page: 1,
            pageCount: 0,
          headers: [
            {
                text: 'Ticket #',
                align: 'start',
                sortable: true,
                value: 'id',
            },
            { text: 'Name',sortable: false, value: 'name' },
            { text: 'Date of Request',sortable: false, value: 'created_at' },
            { text: 'JOR',sortable: false, value: 'jor_informations' },
            { text: 'Concern Department',sortable: false, value: 'dept_info_res.name' },
            { text: 'Assigned',sortable: false, value: 'res_name' },
            { text: 'Location of Concern',sortable: false, value: 'div_info_res.branch_name' },
            { text: 'Estimated Date',sortable: false, value: 'req_estimated_date' },
            { text: 'Date Responded',sortable: false, value: 'res_date' },
            { text: 'Status',sortable: false, value: 'stats' }
            ],
      }),
      created(){
          this.$store.state.header = true;
          this.$store.state.footer = true;
          this.FetchDivisionInformation();
      },
      mounted(){
          this.$store.state.title = "Ticket Information";
      },
      methods: {
        // itemRowBackground: function (item) {
        //     return item.status != 2 ? 'style1' : 'style2'
        // },
        CreateTicket(){
            this.FetchDivisionInformation();
            this.FetchBranchInformation();
            this.ticketdialog = true;
        },
        // getconcernlocation(){
        //     this.FetchBranchInformation()
        // },
        getJOR(id){
            if(id==="Procurement"){
                this.budgetshow = true
            }else{
                this.budgetshow = false
            }
            this.FetchJORInformation()
        },
        filter: function(evt) {
            evt = (evt) ? evt : window.event;
            let expect = evt.target.value.toString() + evt.key.toString();
            
            if (!/^[-+]?[0-9]*\.?[0-9]*$/.test(expect)) {
                evt.preventDefault();
            } else {
                return true;
            }
        },
        uploadFile(){

        },
        chkdepartment(id){
            this.FetchTicketInformationViaDepartment(id)

            // this.FetchTicketInformationViaDepartment(this.filter_department.value)
        },
        // employeesearch(){
        //     this.employee_stats = true
        //     this.department_stats = false
        //     this.ticket_informations = []
        // },
        // departmentsearch(){
        //     this.employee_stats = false
        //     this.department_stats = true
        //     this.ticket_informations = []
        // },
        changeStatusDialogSave(status){
            this.saveconfirmation = status;
        },
        validate(){
            this.$refs.form.validate();
            let val = this.$refs.form.validate();
            if(val){
                this.confirmSubmit();
            }
        },
        employeesearch(){
            // this.$refs.forms.validate();
            // let val = this.$refs.forms.validate();

            // if(val){
                this.fetchTicketViaEmail(this.searchemail);
            // }
        },
        
        confirmSubmit(){
            this.saveconfirmation = true
        },
        getJORinfo(id){
            this.submitbtn = true
            if(id===0){
                this.others_stat = true;
            }else{
                this.others_stat = false;
            }
        },
        FetchBranchInformation(){
        let payload = {
            // user_id: this.$store.getters.getParentID
            // user_id: 21
            user_id: 1
        };

        ticketservices.fetchBranchInformation(payload,  this.$store.getters.getAccessToken).then(response => {
            if(response.data.success){
                    response.data.result.forEach((value) => {
                        this.concern_location.push({
                            text: value.branch_name,
                            value: value.id
                        });
                    });
                    // this.concern_location = response.data.result
            }
        }).catch(error => console.log(error));

        },
        FetchDivisionInformation(){
            let payload = {
                // user_id: this.$store.getters.getParentID
                // user_id: 21
                user_id: 1
            };
            ticketservices.fetchDivisionInformation(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                        response.data.result.forEach((value) => {
                            this.concern_department.push({
                                text: value.name,
                                value: value.id
                            });
                        });
                            // this.concern_department = response.data.result
                    }
            }).catch(error => console.log(error));
        },
        FetchJORInformation(){
            let payload = {
                jor_id: this.ticket_information.res_department.value
            };
            ticketservices.fetchJORInformation(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    this.jor_information = response.data.result
                    this.jor_information.push({
                                name: "OTHERS..",
                                id: 0
                            });
                    }
            }).catch(error => console.log(error));
        },
        FetchTicketInformationViaDepartment(department_id){
            const today = new Date();
            const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

            // const date2 = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+(today.getDate()+1);
            // const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            // const dateTime = date +' '+ time;
            this.todate = date; 

            let payload = {
                department_id: department_id
            };
            ticketservices.fetchTicketInformationViaDepartment(payload).then(response => {
                if(response.data.success){
                    this.ticket_informations = response.data.result
                }
            }).catch(error => console.log(error));
        },
        fetchTicketViaEmail(email){
            const today = new Date();
            const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

            // const date2 = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+(today.getDate()+1);
            // const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            // const dateTime = date +' '+ time;
            this.todate = date; 

            let payload = {
                req_email: email
            };
            ticketservices.fetchTicketInformationViaEmail(payload).then(response => {
                if(response.data.success){
                    this.ticket_informations = response.data.result
                }
            }).catch(error => console.log(error));
        },
        reset() {
            this.$refs.form.reset()
        },
        SubmitTicket(){
            this.ticket_information['req_branch'] = this.ticket_information.req_branch.value
            this.ticket_information['req_department'] = this.ticket_information.req_department.value
            this.ticket_information['res_branch'] = this.ticket_information.res_branch.value
            this.ticket_information['res_department'] = this.ticket_information.res_department.value
            this.ticket_information.reason = this.ticket_information.sor

            let loader = this.$loading.show();

            const payload = new FormData();
            payload.append('file', this.proof);
            payload.append('ticket_information', JSON.stringify(this.ticket_information))
            // // let payload = {
            // //     ticket_information: JSON.stringify(this.ticket_information)
            // //     };
            ticketservices.saveticketInformations(payload).then(response => {
                if(response.data.success){

                    loader.hide();
                    this.ticketdialog = false;
                    this.$store.state.snackbar.message = response.data.message;
                    this.$store.state.snackbar.show = true;
                    this.saveconfirmation = false;
                    this.reset();
                    this.jor_information = [];
                    this.submitbtn = false;
            //         window.location.reload();
                }
            }).catch(error => console.log(error));
        }

      }
    }
  </script>

<style scoped>
.darkthemes {
  background-color: rgb(248, 248, 248);
}
span{
  padding-left: 100px;
}
v-text-field{
  padding-left: 100px;
}
/* tr .style1 {
  background-color: red;
}
tr .style2{
  background-color: gray;
} */


.box{
        width: 100%;
        height: 100%;            
        position: absolute;
        top: 0;
        left: 0;
        /* opacity: 0.9;  for demo purpose  */
    }
    .stack-top{
        z-index: 4;
        margin-top: 90px; /* for demo purpose  */
    }

</style>