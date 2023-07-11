<template>
    <v-container style="max-width: 95%; position: relative;" >
        <v-row>
            <v-col cols="12">
                <v-card
                :loading="loading"
                >
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
                                
                                <template v-if="$vuetify.breakpoint.mdAndUp">
                                    <v-btn
                                    medium
                                    dark
                                        color="orange"
                                        elevation="2"
                                        @click="NewCutoff()" 
                                        v-if="$store.getters.valAccess(89)"
                                    >
                                        <v-icon>mdi-plus</v-icon>Create
                                    </v-btn>
                                </template>

                                <template v-if="$vuetify.breakpoint.smAndDown">
                                <v-btn
                                    medium
                                    dark
                                        color="orange"
                                        elevation="2"
                                        style="padding-left: 12px;padding-right: 12px;"
                                        @click="NewCutoff()" 
                                        v-if="$store.getters.valAccess(89)"
                                    >
                                        <v-icon>mdi-plus</v-icon>
                                    </v-btn>
                                </template>
                            </v-toolbar>
                        </template>
                        <!-- One liner filtering -->
                        <br>
                        <!-- Data table cutoff -->
                        <v-data-table
                            :headers="showHeaders"
                            :search="search"
                            :items="cutoffdata"
                            :page.sync="page"
                            @page-count="pageCount = $event"
                            :footer-props="{
                            'items-per-page-options':[10],
                            'disable-items-per-page': true,
                            }"    
                        >
                            <template v-slot:item.start_date="props">
                                {{ moment(props.item.start_date).date() }}
                            </template>

                            <template v-slot:item.end_date="props">
                                {{ moment(props.item.end_date).date() }}
                            </template>

                            <template v-slot:item.is_endofmonth="props" align="center">
                                <template>
                                    <v-checkbox 
                                        v-model="props.item.is_endofmonth"
                                        color="orange"
                                        readonly
                                        v-if="props.item.is_endofmonth == 1"
                                    ></v-checkbox>
                                    <v-checkbox
                                        v-model="props.item.is_endofmonth"
                                        readonly
                                        color="orange"
                                        v-else
                                    ></v-checkbox>
                                </template>
                            </template>

                            <template v-slot:item.created_by="props">
                                {{ props.item.created_info != null ? props.item.created_info.personal_information.lastname + ' , ' + props.item.created_info.personal_information.firstname : 'No Data' }}
                            </template>

                            <template v-slot:item.action="props">
                                <v-btn
                                    elevation="2"
                                    class="mx-2"
                                    dark
                                    outlined
                                    small
                                    color="orange"
                                    v-if="$store.getters.valAccess(90)"
                                    @click="UpdateAllCutoff(props.item.id, props.item)"
                                >
                                <v-icon
                                        small
                                        @click="UpdateAllCutoff(props.item.id, props.item)"
                                    >
                                        mdi-file-edit-outline
                                    </v-icon>
                                    Edit
                                </v-btn>
                                <v-btn
                                elevation="2"
                                    class="mx-2"
                                    dark
                                    outlined
                                    small
                                    color="red"
                                    v-if="$store.getters.valAccess(91)"
                                    @click="DeleteCutoff(props.item.id, props.item.name)"
                                >
                                <v-icon
                                        small
                                        @click="DeleteCutoff(props.item.id, props.item.name)"
                                    >
                                        mdi-delete
                                    </v-icon>
                                    Delete
                                </v-btn>    
                            </template>
                        </v-data-table>
                        <!-- Data table cutoff -->
                        <v-pagination
                        color="orange"
                        v-model="page"
                        :length="pageCount"
                        ></v-pagination>                
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>

        <!-- Dialog save form -->
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
                        <v-btn icon dark @click="CloseDialogFullScreen(), ClearCutoff()">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                        <v-toolbar-title>Add Cutoff</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-toolbar-items>
                        </v-toolbar-items>
                    </v-toolbar>
                    
                    <v-col sm="12" md="6" offset-md="3" class="mt-3 text-center"> 
                        <h4>Note: Here you can create cutoff</h4>
                    </v-col>

                    <v-col sm="12" md="6" offset-md="3"> 
                        <v-text-field
                            v-model="cutoff.name"
                            label="Name"
                            required
                            color="orange"
                            outlined
                            :rules="[v => !!v || 'Name is required']"
                        ></v-text-field>
                    </v-col>

                    <v-col sm="12" md="6" offset-md="3"> 
                        <v-text-field
                            v-model="cutoff.start_date"
                            label="Start Date"
                            required
                            v-mask="'##'"
                            color="orange"
                            outlined
                            @input="checkernumber"
                            :rules="[v => !!v || 'Start date is required']"
                        ></v-text-field>
                    </v-col>

                    <v-col sm="12" md="6" offset-md="3"> 
                        <v-text-field
                            v-model="cutoff.end_date"
                            label="End Date"
                            required
                            v-mask="'##'"
                            @input="checkernumber"
                            color="orange"
                            outlined
                            :rules="[v => !!v || 'End date is required']"
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
        <!-- Dialog save form -->

        <!-- Dialog edit form -->
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
                    <v-btn icon dark @click="CloseDialogEditFullScreen(), ClearCutoff()">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-toolbar-title>Edit Cutoff</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                    </v-toolbar-items>
                </v-toolbar>
                
                <v-col sm="12" md="6" offset-md="3" class="mt-3 text-center"> 
                    <h4>Note: Here you can edit cutoff</h4>
                </v-col>

                <v-col sm="12" md="6" offset-md="3"> 
                    <v-text-field
                        v-model="cutoff.name"
                        label="Name"
                        required
                        color="orange"
                        outlined
                        :rules="[v => !!v || 'Name is required']"
                    ></v-text-field>
                </v-col>

                <v-col sm="12" md="6" offset-md="3"> 
                    <v-text-field
                        v-model="cutoff.start_date"
                        label="Start Date"
                        required
                        v-mask="'##'"
                        color="orange"
                        outlined
                        @input="checkernumber"
                        :rules="[v => !!v || 'Start date is required']"
                    ></v-text-field>
                </v-col>

                <v-col sm="12" md="6" offset-md="3"> 
                    <v-text-field
                        v-model="cutoff.end_date"
                        label="End Date"
                        required
                        v-mask="'##'"
                        @input="checkernumber"
                        color="orange"
                        outlined
                        :rules="[v => !!v || 'End date is required']"
                    ></v-text-field>
                </v-col>
                <center>
                    <v-col sm="12" md="6">
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
        <!-- Dialog edit form -->

        <!-- Dialog save confirmation-->
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
                        @click="SaveCutoff()"
                        >
                        Confirm
                    </v-btn>
                    </center>
                    <br>  
                </v-card>
            </v-dialog>
        </v-row>
        <!-- Dialog save confirmation-->

        <!-- Dialog edit confirmation-->
        <v-row justify="center">
            <v-dialog
            v-model="editconfirmation"
            persistent
            max-width="290"
            >
                <v-card>
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
                </v-card>
            </v-dialog>
        </v-row>
        <!-- Dialog edit confirmation-->

        <!-- Dialog delete confirmation-->
        <template>
            <v-row justify="center">
                <v-dialog
                v-model="deleteconfirmation"
                persistent
                max-width="290"
                >
                <v-card>
                    <v-card-title class="text-h5">
                    Delete
                    </v-card-title>
                    <v-card-text>Are you sure you want to delete {{ fordeletename }}?</v-card-text>
                    <center>
                    <v-btn
                        elevation="2"
                        class="mx-2"
                        dark
                        outlined
                        small
                        color="red"
                        @click="changeStatusDialogDelete(false)"
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
                        @click="confirmDelete()"
                        >
                        Confirm
                    </v-btn>
                    </center>
                    <br>
                </v-card>
                </v-dialog>
            </v-row>
        </template>
        <!-- Dialog delete confirmation-->
    </v-container>
</template>
  
<script>
    import cutoffservices from '../services/cutoffservices';
    export default {
      name: 'Cutoff',
      data: () => ({
        menucolumn: false,
        fordeletename: '',
        deleteconfirmation: false,
        search: '',
        editfullscreendialog: false,
        saveconfirmation: false,
        valid: false,
        page: 1,
        pageCount: 0,
        startdate: '',
        enddate: '',
        loading: false,
        cutoffdata: [],
        restdaydata: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        editconfirmation: false,
        fullscreendialog: false,
        menustarttime: false,
        menuendtime: false,
        selected_restdayedit: '',
        menuenddate : false,
        menustartdate : false,
        headers:[],
        selectedHeaders: [],
        headersMap: [
            { text: 'Name', sortable: true, value: 'name' },
            { text: 'Start Date',sortable: false, value: 'start_date' },
            { text: 'End Date',sortable: false, value: 'end_date' },
            { text: 'Created By',sortable: false, value: 'created_by' },
            { text: 'Action',sortable: false, value: 'action', width: '230'},
          ],
          cutoff: {
            name: '',
            start_date: '',
            end_date: '',
            is_endofmonth: '',
              is_active: '',
              description: ''
          },
          cutoffampm:{
                ampmstart_time: '',
                ampmend_time: '',
          },
          cutoffrestdaycombo: {
            rest_daycombo: ''
          },
      }),
      created(){
          this.$store.state.header = false;
          this.$store.state.footer = false;
          this.$store.state.snackbar.color = 'orange';
          this.FetchAllCutoff();
          this.headers = Object.values(this.headersMap);
        this.selectedHeaders = this.headers;          
      },
      mounted(){
          this.$store.state.title = "Cutoff";
      },
      computed: {
      //Done to get the ordered headers
      showHeaders () {
        return this.headers.filter(s => this.selectedHeaders.includes(s));
      }
    },      
      methods: {
        FetchAllCutoff(){ // fetch all cut off
            let payload = {
                parent_id: this.$store.getters.getParentID
            };
            cutoffservices.FetchAllCutoff(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    console.log(response.data.data);
                    this.cutoffdata = response.data.data;
                }
            }).catch(error => console.log(error));
        },
        UpdateCutoff(id, name, start_date, end_date, is_endofmonth, created_by){ // fetch info for update cut off
            if(is_endofmonth == true){
                is_endofmonth = 1
            }else{
                is_endofmonth = 0
            }

            this.forUpdate = {
                id: id,
                name: name,
                start_date: start_date,
                end_date: end_date,
                is_endofmonth: is_endofmonth,
                created_by: created_by
            }
            this.editconfirmation = true
        },
        changeStatusDialogEdit(status){
            this.editconfirmation = status;
            this.FetchAllCutoff();
        },
        confirmUpdate(){ // edit cutoff
            let payload = {
                id: this.forAllUpdate.id,
                name: this.cutoff.name,
                start_date: this.cutoff.start_date,
                end_date: this.cutoff.end_date,
                is_endofmonth: this.cutoff.is_endofmonth,
                created_by: this.forAllUpdate.created_by,
                parent_user_id: this.$store.getters.getParentID,
            }
            cutoffservices.UpdateCutoff(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    this.$store.state.snackbar.message = 'Cutoff has been updated.';
                    this.$store.state.snackbar.show = true;
                    this.ClearCutoff();
                    this.editfullscreendialog = false
                    this.$refs.form.resetValidation();
                    this.$store.state.snackbar.colors = 'xgreen';
                    this.$store.state.snackbar.icon = "mdi-check-circle-outline";                      
                }else{
                    this.$store.state.snackbar.colors = 'xred';
                      this.$store.state.snackbar.icon = "mdi-alert-outline";                                          
                }}).catch(error =>{
                this.$store.state.snackbar.message = error.response.data.message;
                this.$store.state.snackbar.show = true;
                    this.$store.state.snackbar.colors = 'xred';
                      this.$store.state.snackbar.icon = "mdi-alert-outline";                                      
            });
            this.FetchAllCutoff();
            this.editconfirmation = false
        },
        NewCutoff(){
            this.fullscreendialog = true
        },
        CloseDialogFullScreen(){
            this.fullscreendialog = false
        },
        AMPMTO(field){ // convertion of military time to AM : PM format
            var datenow = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)
            if(field == 'start_time')
            {
                var StartTime = this.cutoff.in.split(':');
                var date1 = new Date(datenow[0],(datenow[1]-1),datenow[2],StartTime[0],StartTime[1],0,0);
                this.cutoffampm.ampmstart_time = date1.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
            }else
            {
                var EndTime = this.cutoff.out.split(':');
                var date2 = new Date(datenow[0],(datenow[1]-1),datenow[2],EndTime[0],EndTime[1],0,0);
                this.cutoffampm.ampmend_time = date2.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
            }
        },
        SaveCutoff(){ // save cut off
            let val = this.$refs.form.validate();

            this.valid = true;

            if(val){
                if(this.cutoff.is_endofmonth == true){
                    this.cutoff.is_endofmonth = 1
                }else{
                    this.cutoff.is_endofmonth = 0
                }
                let payload = {
                    parent_user_id: this.$store.getters.getParentID,
                    name: this.cutoff.name,
                    start_date: this.cutoff.start_date,
                    end_date: this.cutoff.end_date,
                    is_endofmonth: this.cutoff.is_endofmonth,
                    created_by: this.$store.getters.getUserID
                };
                cutoffservices.SaveCutoff(payload, this.$store.getters.getAccessToken).then(response => {
                    if(response.data.success){
                        this.fullscreendialog = false;
                        this.$store.state.snackbar.message = 'Cutoff has been created.';
                        this.$store.state.snackbar.show = true;
                        this.FetchAllCutoff();
                        this.ClearCutoff();
                        this.$refs.form.resetValidation();
                        this.$store.state.snackbar.colors = 'xgreen';
                        this.$store.state.snackbar.icon = "mdi-check-circle-outline";                      
                    }
                }).catch(error =>{ 
                    console.log(error.response.data)
                    this.$store.state.snackbar.colors = 'xred';
                    this.$store.state.snackbar.icon = "mdi-alert-outline";       
                    this.$store.state.snackbar.message = error.response.data.message;
                    this.$store.state.snackbar.show = true;                                   
                });
            }
            this.saveconfirmation = false;
        }, 
        ClearCutoff(){
            this.cutoff['name'] = ''
            this.cutoff['start_date'] = ''
            this.cutoff['end_date'] = ''
            this.cutoff['is_endofmonth'] = ''
            this.cutoffampm.ampmend_time = ''
            this.cutoffampm.ampmstart_time = ''
            this.selected_restdayedit = ''
        },
        EndOfMonth(){ // check for end of month
            this.cutoff.end_date = 31;
        },
        checkernumber(){ // condition for number date
            if(this.cutoff.start_date > 31){
                this.cutoff.start_date = 31
            }
            if(this.cutoff.end_date > 31){
                this.cutoff.end_date = 31
            }
            if(this.cutoff.end_date == 28 || this.cutoff.end_date == 29 || this.cutoff.end_date == 30 || this.cutoff.end_date == 31){
                this.cutoff.is_endofmonth = 1
            }else{
                this.cutoff.is_endofmonth = 0
            }
        },
        UpdateAllCutoff(id, item){ // fetch infor in cutoff for update
            this.startdate = item.start_date.split('-');
            this.enddate = item.end_date.split('-');
            this.cutoff.name = item.name
            this.cutoff.start_date = this.startdate[2]
            this.cutoff.end_date = this.enddate[2]
            this.cutoff.is_endofmonth = item.is_endofmonth
            this.forAllUpdate = {
                id: id,
                created_by: item.created_by
            }
            this.editfullscreendialog = true
        },
        CloseDialogEditFullScreen(){
            this.editfullscreendialog = false
        },
        validationfalse(){
            this.$refs.form.validate()
        },
        changeStatusDialogSave(status){
            this.saveconfirmation = status;
        },
        DeleteCutoff(id, name){
            this.fordeletename = name
            this.forDelete = {
                id: id
            }
            this.deleteconfirmation = true;
        },
        confirmDelete(){ // delete cut off
            let payload = {
                id: this.forDelete['id']
            }
            cutoffservices.DeleteCutoff(payload, this.$store.getters.getAccessToken).catch(error =>{
                this.$store.state.snackbar.message = error.response.data.message;
                this.$store.state.snackbar.show = true;
                this.$store.state.snackbar.colors = 'xred';
                this.$store.state.snackbar.icon = "mdi-alert-outline";                                      
            });

            this.$store.state.snackbar.message = 'Cutoff has been deleted.';
            this.$store.state.snackbar.show = true;
            this.deleteconfirmation = false;
            this.$store.state.snackbar.colors = 'xgreen';
            this.$store.state.snackbar.icon = "mdi-check-circle-outline";                                  
            this.FetchAllCutoff();
        },
        changeStatusDialogDelete(status){
            this.deleteconfirmation = status;
        },
      }
    }
  </script>
  
<style scoped>
    input[type=checkbox] {
    accent-color: orange;
    }
</style>