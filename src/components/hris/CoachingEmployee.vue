<template>
    <v-container style="max-width: 95%; position: relative;">
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
                                            &nbsp; &nbsp;
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
                                
                            </v-toolbar>
                        </template>
                        <!-- One liner filtering -->
                        <br>
                        <!-- Data table Coaching -->
                        <v-data-table
                        :headers="showHeaders"
                        :items="coachingdata"
                        :search="search"
                        :page.sync="page"
                        :sort-by.sync="sortBy"
                        :sort-desc.sync="sortDesc"
                        @page-count="pageCount = $event"
                        :footer-props="{
                        'items-per-page-options':[10],
                        'disable-items-per-page': true,
                        }"
                        >

                            <template v-slot:item.created_by="props">
                                {{ props.item.created_info != null ? props.item.created_info.personal_information.lastname + ' , ' + props.item.created_info.personal_information.firstname : 'No Data' }}
                            </template>

                            <template v-slot:item.action="props">
                                <template>
                                    <v-row>
                                        <v-btn
                                            elevation="2"
                                            class="mx-2"
                                            dark
                                            outlined
                                            small
                                            color="orange"
                                            @click="UpdateAllCoaching(props.item.id, props.item)"
                                            v-if="props.item.acknowledge_by != 1"
                                        >
                                            <v-icon
                                            small
                                            >
                                                mdi-file-check-outline
                                            </v-icon>
                                            Acknowledge
                                        </v-btn>   
                                        <v-btn
                                            elevation="2"
                                            class="mx-2"
                                            dark
                                            outlined
                                            small
                                            color="orange"
                                            @click="PrintPreviewCoaching(props.item)"
                                        >
                                            <v-icon
                                                small
                                            >
                                                mdi-eye-outline
                                            </v-icon>
                                            Preview
                                        </v-btn>
                                    </v-row>
                                </template>  
                            </template>

                        </v-data-table>
                        <!-- Data table Coaching -->
                        
                        <v-pagination
                        color="orange"
                        v-model="page"
                        :length="pageCount"
                        ></v-pagination>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        
        <!-- Dialog edit confirmation -->
        <v-row justify="center">
            <v-dialog
            v-model="editconfirmation"
            persistent
            max-width="290"
            >
                <v-card>
                    <v-card-title class="text-h5">
                    Acknowledge
                    </v-card-title>
                    <v-card-text>Are you sure you want to acknowledge?</v-card-text>
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
        <!-- Dialog edit confirmation -->
    </v-container>
</template>

<script>
import coachingservices from '../services/coachingservices';

export default {
    name: 'CoachingEmployee',
    data: () => ({
        search: '',
        page: 1,
        pageCount: 0,
        menucolumn: false,
        headers:[],
        selectedHeaders: [],
        sortBy: 'user_info.personal_information.lastname',
        sortDesc: false,
        fullscreendialog : false,
        headersMap: [
            // { text: 'Last Name',sortable: true, value: 'user_info.personal_information.lastname',width: '140px' },
            // { text: 'First Name',sortable: true, value: 'user_info.personal_information.firstname' },
            { text: 'Date Issued',sortable: false, value: 'date' },
            { text: 'Created By',sortable: false, value: 'created_by' },
            { text: 'Action',sortable: false, value: 'action',width: '290px' }
        ],
        valid: false,
        coachingdata : [],
        user_info : '',
        date : '',
        maxdate: '',
        content : '',
        saveconfirmation : false,
        editconfirmation : false,
        deleteconfirmation : false,
        fordeletename : '',
    }),
    created(){
        this.$store.state.header = false;
        this.$store.state.footer = false;
        this.FetchAllCoachingViaUser();
        this.headers = Object.values(this.headersMap);
        this.selectedHeaders = this.headers;          
    },
    mounted(){
        this.$store.state.title = "Coaching";
        var selDate = new Date()
        var today = new Date(selDate+2*24*60*60*1000);
        var date = today.getDate()
        var month = today.getMonth()
        var year = today.getFullYear()
        this.maxdate = year+"-"+this.strPad((month+1))+"-"+this.strPad((date)); 
        this.date_filed = this.$dayjs().format('YYYY-MM-DD');   
    },
    computed: {
        showHeaders () {
            return this.headers.filter(s => this.selectedHeaders.includes(s));
        }
    },      
    methods: {
        FetchAllCoachingViaUser(){ // fetch all coaching
            let payload = {
                user_id: this.$store.getters.getUserID
            };
            coachingservices.FetchAllCoachingViaUser(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    this.coachingdata = response.data.data;
                    console.log(this.coachingdata)
                }
            }).catch(error => console.log(error));
        },
        CloseDialogFullScreen(){
            // this.ClearClearanceForm();
            this.fullscreendialog = false
        },
        strPad(str){
            return (str).toString().padStart(2,'0')
        },
        ClearCoaching(){
            this.date = ''
            this.content = ``
            this.user_info = ''
        },
        validationfalse(){
            this.$refs.form.validate()
        },
        changeStatusDialogSave(status){
            this.saveconfirmation = status;
        },
        UpdateAllCoaching(id, item){ // fetch info for update
            console.log(id, item);
            this.content = item.letter
            this.date = item.date
            this.user_info = { 
                text: item.user_info.personal_information.middlename == null ? item.user_info.personal_information.lastname + ', ' + item.user_info.personal_information.firstname : item.user_info.personal_information.lastname + ', ' + item.user_info.personal_information.firstname + ', ' + item.user_info.personal_information.middlename,
                firstname: item.user_info.personal_information.firstname,
                lastname: item.user_info.personal_information.lastname,
                middlename: item.user_info.personal_information.middlename,
                value: item.user_id 
            }
            this.forAllUpdate = {
                id: id,
                created_by: item.created_by,
                acknowledge : 1
            }

            this.editconfirmation = true
        },
        SaveCoaching(){ // save coaching

            let val = this.$refs.form.validate();

            if(val){
                let payload = {
                    parent_user_id: this.$store.getters.getParentID,
                    user_id: this.user_info.value,
                    date : this.date,
                    letter: this.content,
                    created_by: this.$store.getters.getUserID,
                };
                console.log(payload);
                coachingservices.SaveCoaching(payload, this.$store.getters.getAccessToken).then(response => {
                    if(response.data.success){
                        this.fullscreendialog = false;
                        this.$store.state.snackbar.message = 'Coaching has been created.';
                        this.$store.state.snackbar.show = true;
                        this.FetchAllCoachingViaUser();
                        this.ClearCoaching();
                        this.$refs.form.resetValidation();
                        this.$store.state.snackbar.colors = 'xgreen';
                        this.$store.state.snackbar.icon = "mdi-check-circle-outline";                      
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
        CloseDialogEditFullScreen(){
            this.ClearCoaching();
        },
        changeStatusDialogEdit(status){
            this.editconfirmation = status;
        },
        confirmUpdate(){ // update coaching
            let payload = {
                id: this.forAllUpdate['id'],
                letter: this.content,
                user_id : this.user_info.value,
                date : this.date,
                created_by: this.forAllUpdate['created_by'],
                parent_user_id: this.$store.getters.getParentID,
                acknowledge_by : this.forAllUpdate['acknowledge']
            }
            console.log(payload)
            coachingservices.UpdateCoaching(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    this.$store.state.snackbar.message = 'Coaching has been acknowledge.';
                    this.$store.state.snackbar.show = true;
                    this.editconfirmation = false
                    this.ClearCoaching()
                    this.FetchAllCoachingViaUser();
                    this.$store.state.snackbar.colors = 'xgreen';
                    this.$store.state.snackbar.icon = "mdi-check-circle-outline";                      
                }
                }).catch(error =>{
                this.$store.state.snackbar.colors = 'xred';
                this.$store.state.snackbar.icon = "mdi-alert-outline";   
                this.$store.state.snackbar.message = error.response.data.message;
                this.$store.state.snackbar.show = true;
            });
        },
        DeleteCoaching(id, name){
            this.fordeletename = name
            this.forDelete = {
                id: id
            }
            this.deleteconfirmation = true;
        },
        confirmDelete(){ // delete Coaching
            let payload = {
                id: this.forDelete['id']
            }
            console.log(payload);
            coachingservices.DeleteCoaching(payload, this.$store.getters.getAccessToken).catch(error =>{
                this.errorDAW = error.response.data.message
                this.$store.state.snackbar.message = error.response.data.message;
                this.$store.state.snackbar.show = true;
            });

            this.$store.state.snackbar.message = 'Coaching has been deleted.';
            this.$store.state.snackbar.show = true;
            this.deleteconfirmation = false;
            this.FetchAllCoachingViaUser();
            this.$store.state.snackbar.colors = 'xgreen';
            this.$store.state.snackbar.icon = "mdi-check-circle-ouGetCoachingtline";                                  
        },
        PrintCoaching(item){ // print of coaching form
            localStorage.setItem('is_hris', 0)
            localStorage.setItem('coaching', item.id)
            localStorage.setItem('forprintpreviewcoaching', 0)
            window.open("/printcoaching","_blank")
        },
        PrintPreviewCoaching(item){ // print preview of coaching form
            localStorage.setItem('is_hris', 0)
            localStorage.setItem('coaching', item.id)
            localStorage.setItem('forprintpreviewcoaching', 1)
            window.open("/printcoaching","_blank")
        },
    },
}
</script>

<style scoped>
</style>