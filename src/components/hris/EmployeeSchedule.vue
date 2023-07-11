<template>
    <v-container style="max-width: 95%; position: relative;">
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
                                    @click="UpdateSchedule()"
                                    >
                                    <v-icon>mdi-file-edit-outline</v-icon>Edit
                                    </v-btn>
                                </template>

                                <template v-if="$vuetify.breakpoint.smAndDown">
                                    <v-btn
                                    medium
                                    dark
                                    color="orange"
                                    elevation="2"
                                    style="padding-left: 12px;padding-right: 12px;"
                                    @click="UpdateSchedule()"
                                    >
                                    <v-icon>mdi-file-edit-outline</v-icon>
                                    </v-btn>
                                </template>
                            </v-toolbar>
                        </template>
                        <!-- One liner filtering -->  
                        <br>
                        <v-row justify="center">
                            <v-col cols="12">
                                <center>
                                    <!-- Data table list of employee -->  
                                    <v-data-table
                                    v-model="selectedemployee"
                                    id="showselectcheckbox"
                                    :headers="showHeaders"
                                    :items="listemployeedata"
                                    :search="search"
                                    align="center"  
                                    :page.sync="page"
                                    must-sort
                                    show-select
                                    :sort-by.sync="sortBy"
                                    :sort-desc.sync="sortDesc"
                                    @page-count="pageCount = $event"
                                    :footer-props="{
                                    'items-per-page-options':[10],
                                    'disable-items-per-page': true,
                                    }"                                 
                                    >
                                        <template v-slot:item.email_verified_at="props">
                                            <div class="text-center">
                                            <v-chip
                                                outlined
                                                class="ma-2"
                                                color="red"
                                                v-if="props.item.email_verified_at == null"
                                            >
                                                Not Verified
                                            </v-chip>
                                            <v-chip
                                                outlined
                                                class="ma-2"
                                                color="success"
                                                v-else
                                            >
                                                Verified  
                                            </v-chip>
                                            </div>
                                        </template>
                                        <template v-slot:item.flag="props">
                                            <div class="text-center">
                                                <v-chip
                                                    outlined
                                                    class="ma-2"
                                                    color="red"
                                                    v-if="props.item.flag == 0"
                                                >
                                                    Inactive
                                                </v-chip>
                                                <v-chip
                                                    outlined
                                                    class="ma-2"
                                                    color="success"
                                                    v-else
                                                >
                                                    Active  
                                                </v-chip>
                                            </div>
                                        </template>
                                    </v-data-table>
                                    <!-- Data table list of employee -->  
                                    <v-pagination
                                        color="orange"
                                        v-model="page"
                                        :length="pageCount"
                                    ></v-pagination>                                    
                                </center>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>

        <!-- Dialog edit confirmation -->  
        <v-row justify="center">
            <v-dialog
                persistent :retain-focus="false"
                v-model="editconfirmation"
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
                            @click="UpdateBulkUserSchedule()"
                            >
                            Confirm
                        </v-btn>
                    </center>
                    <br>                             
                </v-card>
            </v-dialog>
        </v-row>
        <!-- Dialog edit confirmation -->   

        <!-- Dialog  Schedule edit form -->  
        <template>
            <v-row justify="center">
                <v-dialog
                    v-model="scheduleemployeedialog"
                    max-width="450px"
                    >
                    <v-card>
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <v-card tile color="orange">
                                    <template>
                                        <v-toolbar color="orange" height="50px">
                                            <v-toolbar-title class="white--text flex text-left">Select Schedule</v-toolbar-title>
                                            <div class="text-right">
                                                <v-icon
                                                    medium
                                                    color="white"
                                                    class="white--text"
                                                    block
                                                    @click="scheduleemployeedialog = false"
                                                    >
                                                    mdi-close
                                                </v-icon>
                                            </div>
                                        </v-toolbar>
                                    </template>
                                </v-card>
                            <v-card-text>
                                <v-col md="12" offset-md="0" class="ma-0">
                                    <v-col class="ma-0">
                                        <v-row class="pt-0 mt-0 pb-0 mb-0">
                                            <div class="col-sm-12 pt-0 mt-0 pb-0 mb-0">
                                                <v-combobox
                                                    label="Schedule *"
                                                    color="orange"
                                                    outlined
                                                    :items="schedule_information"
                                                    v-model="schedule_id"
                                                    :rules="[v => !!v || 'Schedule is required']"
                                                ></v-combobox>
                                            </div>
                                        </v-row>
                                        <v-card-actions class="col-sm-12 pt-0 mt-0 pb-0 mb-0">
                                            <v-spacer></v-spacer>
                                            <v-btn
                                            color="orange"
                                            width="100"
                                            outlined
                                            block
                                            class="white--text"
                                            @click="valid == false ? validationfalse() : changeStatusDialogEdit(true)"
                                            >
                                                Update
                                            </v-btn>
                                        </v-card-actions>
                                    </v-col>
                                </v-col>
                            </v-card-text>
                        </v-form>
                    </v-card>
                </v-dialog>
            </v-row>
        </template>
        <!-- Dialog  Schedule edit form -->
    </v-container>
</template>
  
<script>
    import userservices from '../services/userservices';
    import scheduleservices from '../services/scheduleservices';
    import userotherinformationservices from '../services/userotherinformationservices';

    export default {
    name: 'EmployeeSchedule',
    data: () => ({
        schedule_id : '',
        scheduleemployeedialog : false,
        selectedemployee : [],
        sortBy: 'division_information.name',
        sortDesc: false,
        menucolumn: false,
        valid: false,
        page: 1,
        pageCount: 0,
        search: '',
        maxdate: '',
        loading: false,
        listemployeedata: [],
        schedule_information: [],
        headers:[],
        selectedHeaders: [],
        headersMap: [
        // { text: 'Employee Id', value: 'user_other_personal_information.employee_id',sortable: true ,width: '120px'}, // Employee ID
        { text: 'First Name', value: 'personal_information.firstname',sortable: true,width: '130px'},
        { text: 'Middle Name', value: 'personal_information.middlename',sortable: true,width: '130px'},
        { text: 'Last Name', value: 'personal_information.lastname',sortable: true,width: '130px'},
        { text: 'Schedule', value: 'user_other_personal_information.schedule_info.name',sortable: true,width: '180px'},
        { text: 'Division', value: 'division_information.name',sortable: true},  
        { text: 'Role', value: 'role_information.name',sortable: true},  
        { text: 'Branch', value: 'branch_information.branch_name',sortable: true},
        ],
        editconfirmation: false
        }),
        created(){
            this.$store.state.header = false;
            this.$store.state.footer = false;
            this.$store.state.snackbar.color = 'orange';
            this.FetchAllUser();
            this.FetchAllSchedule();
            this.headers = Object.values(this.headersMap);
            this.selectedHeaders = this.headers;
        },
        mounted(){
            this.$store.state.title = "Employee Information"
            var selDate = new Date()
            var today = new Date(selDate+2*24*60*60*1000);
            var date = today.getDate()
            var month = today.getMonth()
            var year = today.getFullYear()
            this.maxdate = year+"-"+this.strPad((month+1))+"-"+this.strPad((date));
        },
        computed: {
        //Done to get the ordered headers
        showHeaders () {
            return this.headers.filter(s => this.selectedHeaders.includes(s));
        }
    },
    methods: {
        FetchAllUser(){ // fetch all user
            let payload = {
                parent_id: this.$store.getters.getParentID
            };
            userservices.FetchAllUser(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    this.listemployeedata = response.data.data;
                    console.log(this.listemployeedata)
                }
            }).catch(error => console.log(error));
        },
        FetchAllSchedule(){ // fetch schedule
            let payload = {
                parent_id: this.$store.getters.getParentID
            };
            scheduleservices.FetchAllSchedule(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    response.data.data.forEach((value) => {
                        this.schedule_information.push({
                            text: value.name,
                            value: value.id,
                            value_in: value.in,
                            value_out: value.out
                        });
                    });
                }
                else{
                    console.log(response.data.message);
                }
            }).catch(error => console.log(error));
        },
        Clear(){
            this.selectedemployee = []
        },
        strPad(str){
            return (str).toString().padStart(2,'0')
        },
        validationfalse(){
            this.$refs.form.validate()
        },
        UpdateSchedule(){
            if(this.selectedemployee.length != 0){
                this.scheduleemployeedialog = true
            }else{
                this.$store.state.snackbar.colors = 'xyellow';
                this.$store.state.snackbar.icon = "mdi-information-outline"; 
                this.$store.state.snackbar.message = 'Please select at least one';
                this.$store.state.snackbar.show = true;
            }
        },
        changeStatusDialogEdit(status){
            let val = this.$refs.form.validate();

            if(val){
                this.editconfirmation = status;
            }
        },
        UpdateBulkUserSchedule(){  // update bulk user schedule
            let payload = {
                user_schedule_information : this.selectedemployee,
                schedule_id : this.schedule_id.value
            };
            userotherinformationservices.UpdateBulkUserSchedule(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    this.$store.state.snackbar.colors = 'xgreen';
                    this.$store.state.snackbar.icon = "mdi-check-circle-outline"; 
                    this.$store.state.snackbar.message = 'Schedule has been updated.';
                    this.$store.state.snackbar.show = true;
                    this.scheduleemployeedialog = false
                    this.selectedemployee = []
                    this.FetchAllUser();
                }
            }).catch(error => console.log(error));
            this.editconfirmation = false;
        }
    },
}
</script>

<style scoped>
    input[type=checkbox] {
        accent-color: orange;
    }
    #showselectcheckbox .theme--light.v-icon {
        color: orange !important;
    }
</style>
