<template>
  <v-container style="max-width: 95%; position: relative;" >
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-text>
            <!-- One liner filtering -->
            <template>
              <v-toolbar dense style="">
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                        v-model="search"
                        append-icon="mdi-magnify"
                        placeholder="Search"
                        hide-details
                        color="orange"
                        overflow
                        solo
                        dense
                        style="min-width: 60px;"
                    ></v-text-field>
                  </v-col>
                </v-row>
                &nbsp;
                <template  v-if="$vuetify.breakpoint.mdAndUp">
                  <div class="text-center">
                    <v-menu
                      v-model="menucolumn"
                      :close-on-content-click="false"
                      :nudge-width="60"
                      :nudge-left="60"      
                      offset-y
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          color="orange"
                          dark
                          v-bind="attrs"
                          v-on="on"
                        >
                        <v-icon>mdi-view-column</v-icon>Column
                        </v-btn>
                      </template>

                      <v-card style="padding-top:10px;min-width:50px;">
                        <v-list>
                                <ul>
                            <div v-for="(item, index) in headers" :key="index">
                              <input type="checkbox" :id="item.text" :value="item" v-model="selectedHeaders">
                              &nbsp;<label :for="item.text">{{item.text}}</label>
                            </div>
                          </ul>
                        </v-list>

                      </v-card>
                    </v-menu>
                  </div>
                </template>

                <template  v-if="$vuetify.breakpoint.smAndDown">
                  <div class="text-center">
                    <v-menu
                      v-model="menucolumn"
                      :close-on-content-click="false"
                      :nudge-width="100"
                      :nudge-left="100"
                      offset-y
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          color="orange"
                          dark
                          v-bind="attrs"
                          v-on="on"
                        >
                        <v-icon>mdi-view-column</v-icon>
                        </v-btn>
                      </template>

                      <v-card style="padding-bottom:10px">
                        <br>
                        &nbsp;&nbsp;
                        <b>Column</b>
                        <v-list>
                                <ul>
                            <div v-for="(item, index) in headers" :key="index">
                              <input type="checkbox" :id="item.text" :value="item" v-model="selectedHeaders">
                              &nbsp;<label :for="item.text">{{item.text}}</label>
                            </div>
                          </ul>
                        </v-list>
                      </v-card>
                    </v-menu>
                  </div>
                </template>
                &nbsp;
              </v-toolbar>
            </template>
            <!-- One liner filtering -->
            <br>
            <!-- Leave balance data table -->
            <v-data-table
              :headers="showHeaders"
              :search="search"
              :items="leavebalancedataviauserleavetype" 
              :page.sync="page"
              @page-count="pageCount = $event"
              :footer-props="{
              showFirstLastPage: false,
              'items-per-page-options':[10],
              'disable-items-per-page': true
              }"
              >
              
                <template v-slot:item.user_id="props">
                    {{ props.item.user_info != null ? props.item.user_info.lastname + ' , ' + props.item.user_info.firstname : 'No Data' }}
                </template>

                <template v-slot:item.leave_type_id="props">
                        {{ props.item.leave_type_info != null ? props.item.leave_type_info.name : 'No Data' }}
                </template>

                <template v-slot:item.total="props">
                    {{ totalito(props.item) }}
                </template>

                <template v-slot:item.action="props">
                    <v-btn
                    elevation="2"
                        class="mx-2"
                        dark
                        outlined
                        small
                        color="orange"
                        v-if="$store.getters.valAccess(83)"
                        @click="UpdateAllLeaveBalance(props.item)"
                    >
                    <v-icon
                            small
                            @click="UpdateAllLeaveBalance(props.item)"
                        >
                            mdi-file-edit-outline
                        </v-icon>
                        Edit
                    </v-btn>      
                </template>
            </v-data-table>
            <!-- Leave balance data table -->
            <v-pagination
            color="orange"
            v-model="page"
            :length="pageCount"
            ></v-pagination>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  
    <!-- dialog add form -->
    <v-dialog
      v-model="fullscreendialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      >
      <v-card>
          <v-form
              ref="form"
              v-model="valid"
              lazy-validation
          >
            <v-toolbar
                dark
                color="orange"
            >
                <v-btn icon dark @click="CloseDialogFullScreen()">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>Add Leave Credit</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                </v-toolbar-items>
            </v-toolbar>
              
            <v-col sm="12" md="6" offset-md="3" class="mt-3 text-center"> 
                <h4>Note: Here you can create leave credit</h4>
            </v-col>
              
            <v-col sm="12" md="6" offset-md="3"> 
                <v-combobox
                    v-model="leave_balance.user_id"
                    outlined
                    color="orange"
                    label="Employee"
                    :rules="[v => !!v || 'Employee is required']"
                    :items="employeecombobox"
                    class="pt-5"
                    single
                ></v-combobox>
            </v-col>

            <v-col sm="12" md="6" offset-md="3"> 
                <v-combobox
                    v-model="leave_balance.leave_type_id"
                    outlined
                    color="orange"
                    label="Leave type"
                    :rules="[v => !!v || 'Leave type is required']"
                    :items="leavetypecombobox"
                    class="pt-5"
                    single
                ></v-combobox>
            </v-col>

            <v-col sm="12" md="6" offset-md="3"> 
                <v-text-field
                    v-model="leave_balance.balance"
                    label="Credit"
                    required
                    color="orange"
                    outlined
                    :rules="[v => !!v || 'Credit is required']"
                ></v-text-field>
            </v-col>
            <center>
              <v-col sm="12" md="6">
                <v-btn
                  color="orange"
                  block
                  outlined
                  @click="valid == false ? validationfalse() : changeStatusDialogSave(true)"
                  >
                  Save
                </v-btn>
              </v-col>
            </center>
          </v-form>
      </v-card>
    </v-dialog>
    <!-- dialog add form -->

    <!-- dialog edit form -->
    <v-dialog
      v-model="editfullscreendialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      >
      <v-card>
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
          >
          <v-toolbar
              dark
              color="orange"
          >
            <v-btn icon dark @click="CloseDialogEditFullScreen()">
                <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>Edit Leave Credit</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
            </v-toolbar-items>
          </v-toolbar>
            
          <v-col sm="12" md="6" offset-md="3" class="mt-3 text-center"> 
            <h4>Note: Here you can edit leave credit</h4>
          </v-col>

          <v-col sm="12" md="6" offset-md="3" class="pt-0 mt-0 pb-0 mb-0" v-for="(item, counter) in leavebalancedataviauserleavetypeheaders" v-bind:key="counter"> 
            <v-text-field
                v-if="item.text != 'Total' && item.text != 'Action'"
                v-model="leave_employee_info[item.value]"
                :label="item.text"
                required
                color="orange"
                outlined
                :disabled="item.text == 'Last Name' || item.text == 'First Name' || item.text == 'Middle Name'"
                :rules="[leave_employee_info[item.value] >= 0 || item.text + ' is invalid']"
            ></v-text-field>
          </v-col>

          <center>
            <v-col sm="12" md="6" class="pt-0 mt-0">
                <v-btn
                color="orange"
                block
                outlined
                @click="valid == false ? validationfalse() : changeStatusDialogEdit(true)"
                >
                Update
              </v-btn>
            </v-col>
          </center>
        </v-form>
      </v-card>
    </v-dialog>
    <!-- dialog edit form -->

    <!-- dialog edit confirmation -->
    <v-row justify="center">
      <v-dialog
        v-model="editconfirmation"
        persistent
        max-width="290"
      >
        <v-card>
            <v-form
                ref="form"
                v-model="valid"
                lazy-validation
            >
                <v-card-title class="text-h5">
                    Edit
                </v-card-title>
                <v-card-text>Are you sure you want to update?</v-card-text>
                <center>
                    <v-btn
                        elevation="2"
                        class="mx-2"
                        dark
                        outlined
                        small
                        color="red"
                        @click="changeStatusDialogEdit(false)"
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
                        @click="confirmUpdate()"
                        >
                        Confirm
                    </v-btn>
                    </center>
                    <br>    
                </v-form>
            </v-card>
      </v-dialog>
    </v-row>
    <!-- dialog edit confirmation -->

    <!-- dialog save confirmation -->
    <v-row justify="center">
      <v-dialog
          persistent :retain-focus="false"
          v-model="saveconfirmation"
          max-width="290"
      >
          <v-card>
              <v-card-title class="text-h5">
                  Save
              </v-card-title>
              <v-card-text>Are you sure you want to save?</v-card-text>
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
                  @click="SaveLeaveBalance()"
                  >
                  Confirm
              </v-btn>
              </center>
              <br>  
          </v-card>
      </v-dialog>
    </v-row>
    <!-- dialog save confirmation -->
  </v-container>
</template>
  
<script>
  
  import leavebalanceservices from '../services/leavebalanceservices';
  import leavetypeservices from '../services/leavetypeservices';
  import userservices from '../services/userservices';
  
    export default {
      name: 'LeaveBalance',
      data: () => ({
        menucolumn: false,
        valid: false,
        page: 1,
        pageCount: 0,
          date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
          dialog: false,
          fullscreendialog: false,
          editfullscreendialog: false,
          leave_balance: {
              user_id: '',
              leave_type_id: '',
              balance: ''
          },
          search: '',
          headers:[],
        selectedHeaders: [],
        headersMap: [
            { text: 'Employee', value: 'user_id' },
            { text: 'Leave Type', value: 'leave_type_id' },
            { text: 'Credits', value: 'balance' },
            { text: 'Action', value: 'action' },
          ],
          leavebalancedata: [],
          editconfirmation: false,
          leavetypecombobox: [],
          listemployeedata: [],
          employeecombobox: [],
          saveconfirmation: false,
          user_id_update : '',
          leave_type_id_update : '',
          leavebalancedataviauserleavetype: [],
          leave_employee_info: [],
          leavebalancedataviauserleavetypeheaders: [
            { text: 'Last Name', value: 'lastname' ,width: '110px'},
            { text: 'First Name', value: 'firstname' ,width: '120px'},
            { text: 'Middle Name', value: 'middlename' ,width: '125px'},
          ],
          counteritosafetch: 0,
          headersdataito: [],
      }),
      created(){
          this.$store.state.header = false;
          this.$store.state.footer = false;
          this.$store.state.snackbar.color = 'orange';
          this.FetchAllLeaveBalance();
          this.FetchAllLeaveType();
          this.FetchAllUser();  
      },
      mounted(){
          this.$store.state.title = "Leave Credits";
      },
      computed: {
      //Done to get the ordered headers
      showHeaders () {
        return this.headers.filter(s => this.selectedHeaders.includes(s));
      }
    },
      methods: {
        FetchAllBalancebyUserLeaveType(){ 
            let payload = {
                parent_id: this.$store.getters.getParentID
            };
            leavebalanceservices.FetchAllBalancebyUserLeaveType(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    this.leavebalancedataviauserleavetype = response.data.data;
                    
                    response.data.headers.forEach((value) => {
                        this.leavebalancedataviauserleavetypeheaders.push({
                            text: value,
                            value: value.replaceAll(' ', '_'),
                            width: '120px',
                            sortable: false
                        });
                    });
                    this.leavebalancedataviauserleavetypeheaders.push({
                        text: '',
                        value: 'action'
                    });
                    this.headers = Object.values(this.leavebalancedataviauserleavetypeheaders);
                    this.selectedHeaders = this.headers;    
                }
            }).catch(error => console.log(error));
        },
        FetchAllLeaveBalance(){ // fetch leave balance and headers in data table dynamic
            let payload = {
                parent_id: this.$store.getters.getParentID
            };
            leavebalanceservices.FetchAllBalancebyUserLeaveType(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    console.log(response.data);
                    this.leavebalancedataviauserleavetype = response.data.data;
                    
                    if(this.counteritosafetch == 0){
                        response.data.headers.forEach((value) => {
                            this.headersdataito.push(value.replaceAll(' ', '_'));
                        });
                        response.data.headers.forEach((value) => {
                            this.leavebalancedataviauserleavetypeheaders.push({
                                text: value,
                                value: value.replaceAll(' ', '_'),
                                width: '120px',
                                sortable: false
                            });
                        });
                        this.leavebalancedataviauserleavetypeheaders.push({
                            text: 'Total',
                            width: '60px',
                            value: 'total',
                            sortable: false,
                        });
                        this.leavebalancedataviauserleavetypeheaders.push({
                            text: 'Action',
                            width: '50px',
                            sortable: false,
                            value: 'action'
                        });
                        this.headers = Object.values(this.leavebalancedataviauserleavetypeheaders);
                        this.selectedHeaders = this.headers;   
                        this.counteritosafetch = 1;
                    } 
                }
            }).catch(error => console.log(error));
        },
        UpdateLeaveBalance(id, user_id,leave_type_id,balance){
            this.forUpdate = {
                id: id,
                user_id: user_id,
                leave_type_id: leave_type_id,
                balance: balance
            }
            this.editconfirmation = true
            console.log(id, user_id,leave_type_id,balance);
        },
        confirmUpdate(){ // Update leave balance
          console.log(this.leave_employee_info)
          let val = this.$refs.form.validate();

          if(val){
              let payload = {
                  parent_user_id: this.$store.getters.getParentID,
                  created_by: this.$store.getters.getUserID,
                  leave_employee_info: this.leave_employee_info,
              }
              leavebalanceservices.UpdateorCreateLeaveBalance(payload, this.$store.getters.getAccessToken).then(response => {
                  if(response.data.success){
                      this.$store.state.snackbar.message = 'Leave credits have been updated.';
                      this.$store.state.snackbar.show = true;
                      this.editfullscreendialog = false
                      this.ClearLeaveBalance()
                      this.$refs.form.resetValidation();
                      this.$store.state.snackbar.colors = 'xgreen';
                  this.$store.state.snackbar.icon = "mdi-check-circle-outline";                      
              }else{
                  this.$store.state.snackbar.colors = 'xred';
                    this.$store.state.snackbar.icon = "mdi-alert-outline";                      
                }
              }).catch(error =>{
                  this.$store.state.snackbar.message = error.response.data.message;
                  this.$store.state.snackbar.show = true;
                  this.$store.state.snackbar.colors = 'xred';
                    this.$store.state.snackbar.icon = "mdi-alert-outline";                      
                                    
              });
          }
          this.FetchAllLeaveBalance();
          this.editconfirmation = false
        },
        changeStatusDialogEdit(status){
            this.editconfirmation = status;
        },
        NewLeaveType(){
            this.fullscreendialog = true
        },
        SaveLeaveBalance(){ // Save leave balance

          let val = this.$refs.form.validate();

          if(val){
              let payload = {
                  parent_user_id: this.$store.getters.getParentID,
                  user_id: this.leave_balance['user_id']['value'],
                  leave_type_id: this.leave_balance['leave_type_id']['value'],
                  balance: this.leave_balance['balance'],
                  created_by: this.$store.getters.getUserID,
              };
              console.log(payload);
              leavebalanceservices.SaveLeaveBalance(payload, this.$store.getters.getAccessToken).then(response => {
                  if(response.data.success){
                      this.fullscreendialog = false;
                      this.$store.state.snackbar.message = 'Leave credit has been created.';
                      this.$store.state.snackbar.show = true;
                      this.FetchAllLeaveBalance();
                      this.ClearLeaveBalance();
                      this.$refs.form.resetValidation();
                      this.$store.state.snackbar.colors = 'xgreen';
                  this.$store.state.snackbar.icon = "mdi-check-circle-outline";                      
              }else{
                  this.$store.state.snackbar.colors = 'xred';
                    this.$store.state.snackbar.icon = "mdi-alert-outline";                      
                }
              }).catch(error =>{ 
                  console.log(error.response.data.errors)
                  this.$store.state.snackbar.message = error.response.data.message;
                  this.$store.state.snackbar.show = true;
                  this.$store.state.snackbar.colors = 'xred';
                    this.$store.state.snackbar.icon = "mdi-alert-outline";                      

              });
          }

          this.saveconfirmation = false;
        }, 
        CloseDialogFullScreen(){
          this.ClearLeaveBalance();
          this.fullscreendialog = false
        },
        ClearLeaveBalance(){
          this.user_id_update = ''
          this.leave_type_id_update = ''
          this.leave_balance.user_id =''
          this.leave_balance.leave_type_id =''
          this.leave_balance.balance = ''
        },
        DeleteLeaveType(id){ // delete leave balance
          let payload = {
              id: id
          }
          console.log(payload);
          leavebalanceservices.DeleteLeaveType(payload, this.$store.getters.getAccessToken).catch(error =>{
              this.errorDAW = error.response.data.message
              this.$store.state.snackbar.message = error.response.data.message;
              this.$store.state.snackbar.show = true;
          });

          this.$store.state.snackbar.message = 'Leave credit has been deleted.';
          this.$store.state.snackbar.show = true;
          this.editconfirmation = false
          this.FetchAllLeaveBalance();
          this.$store.state.snackbar.colors = 'xgreen';
          this.$store.state.snackbar.icon = "mdi-check-circle-outline";                                  
        },
        FetchAllLeaveType(){
          let payload = {
              parent_id: this.$store.getters.getParentID
          };
          leavetypeservices.FetchAllLeaveType(payload, this.$store.getters.getAccessToken).then(response => {
              if(response.data.success){
                  this.leavetypedata = response.data.data;
                  response.data.data.forEach((value) => {
                      this.leavetypecombobox.push({
                          text: value.name,
                          value: value.id
                      });
                  });
              }
          }).catch(error => console.log(error));
        },
        FetchAllUser(){ // fetch all user
          let payload = {
              parent_id: this.$store.getters.getParentID
          };
          userservices.FetchAllUser(payload, this.$store.getters.getAccessToken).then(response => {
              if(response.data.success){
                  this.listemployeedata = response.data.data;
                  response.data.data.forEach((value) => {
                      this.employeecombobox.push({
                          text: value.personal_information.firstname + ' , ' + value.personal_information.lastname,
                          value: value.id
                      });
                  });
              }
          }).catch(error => console.log(error));
        },
        changeStatusDialogSave(status){
          this.saveconfirmation = status;
        },
        CloseDialogEditFullScreen(){
          this.ClearLeaveBalance();
          this.editfullscreendialog = false
        },
        UpdateAllLeaveBalance(item){
          this.leave_employee_info = item
          let count = Object.keys(item).length
          console.log(count)
          this.editfullscreendialog = true
        },
        validationfalse(){
          this.$refs.form.validate()
        },
        totalito(item){ // total leave balance per user
          var total = 0;
          this.headersdataito.forEach((value) => {
              total = total + parseFloat(item[value]);
          });
          return total
        }
      }
    }
  </script>
  
<style scoped>
  input[type=checkbox] {
    accent-color: orange;
  }
</style>