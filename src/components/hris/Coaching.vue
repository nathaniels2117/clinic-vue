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

                                &nbsp;
                            
                                <template v-if="$vuetify.breakpoint.mdAndUp">
                                    <v-btn
                                    medium
                                    dark
                                    color="orange"
                                    elevation="2"
                                    @click="fullscreendialog = true" 
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
                                    @click="fullscreendialog = true" 
                                    >
                                    <v-icon>mdi-plus</v-icon>
                                    </v-btn>
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
                                        >
                                            <v-icon
                                            small
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
                                            @click="DeleteCoaching(props.item.id, props.item.name)"
                                        >
                                            <v-icon
                                            small
                                            >
                                                mdi-delete
                                            </v-icon>
                                            Delete
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
                                        <v-btn
                                            elevation="2"
                                            class="mx-2"
                                            dark
                                            outlined
                                            small
                                            color="orange"
                                            @click="PrintCoaching(props.item)"
                                        >
                                            <v-icon
                                                small
                                            >
                                                mdi-printer
                                            </v-icon>
                                            Print
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
                        <v-btn icon dark @click="CloseDialogFullScreen()">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                        <v-toolbar-title>Add Coaching</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-toolbar-items>
                        </v-toolbar-items>
                    </v-toolbar>
                    
                    <v-col sm="12" md="6" offset-md="3" class="mt-3 text-center"> 
                        <h4>Note: Here you can add another coaching.</h4>
                    </v-col>

                    <v-col sm="12" md="6" offset-md="3">
                        <v-combobox
                            outlined
                            color="orange"
                            v-model="user_info"
                            label="Employee Name"
                            :clearable="this.user_info != ''"
                            :items="listemployeedata"
                            :rules="[v => !!v || 'Employee Name is required']"
                        ></v-combobox>
                    </v-col>

                    <v-col sm="12" md="6" offset-md="3">
                        <v-menu
                        color="orange"
                            ref="menuldate"
                            v-model="menuldate"
                            :close-on-content-click="false"
                            transition="scale-transition"
                            offset-y
                            max-width="290px"
                            min-width="auto"
                        >      
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                color="orange"
                                    v-model="date"
                                    label="Date"
                                    readonly
                                    v-bind="attrs"
                                    v-on="on"
                                    outlined
                                    :rules="[v => !!v || 'Date is required']"
                                ></v-text-field>
                            </template>
                            <v-date-picker
                                color="orange"
                                v-model="date"
                                @input="menuldate = false"
                                :max="maxdate"
                            ></v-date-picker>
                        </v-menu>
                    </v-col>

                    <v-col sm="12" md="6" offset-md="3">
                        <tiptap-vuetify
                        v-model="content"
                        :extensions="extensions"
                        placeholder="Content letter body"
                        :rules="[v => !!v || 'Content is required']"
                        />
                        <!-- <div v-html='content'></div> -->
                    </v-col>
                    <br>
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
                    <v-btn icon dark @click="CloseDialogEditFullScreen()">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-toolbar-title>Edit Coaching</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                    </v-toolbar-items>
                </v-toolbar>
                
                <v-col sm="12" md="6" offset-md="3" class="mt-3 text-center"> 
                    <h4>Note: Here you can edit assets that are given to employees.</h4>
                </v-col>

                <v-col sm="12" md="6" offset-md="3">
                    <v-combobox
                        outlined
                        color="orange"
                        v-model="user_info"
                        label="Employee Name"
                        :clearable="this.user_info != ''"
                        :items="listemployeedata"
                        :rules="[v => !!v || 'Employee Name is required']"
                    ></v-combobox>
                </v-col>

                <v-col sm="12" md="6" offset-md="3">
                    <v-menu
                    color="orange"
                        ref="menuldate"
                        v-model="menuldate"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        max-width="290px"
                        min-width="auto"
                    >      
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                            color="orange"
                                v-model="date"
                                label="Date"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                                outlined
                                :rules="[v => !!v || 'Date is required']"
                            ></v-text-field>
                        </template>
                        <v-date-picker
                            color="orange"
                            v-model="date"
                            @input="menuldate = false"
                            :max="maxdate"
                        ></v-date-picker>
                    </v-menu>
                </v-col>

                <v-col sm="12" md="6" offset-md="3">
                    <tiptap-vuetify
                    v-model="content"
                    :extensions="extensions"
                    placeholder="Content letter body"
                    :rules="[v => !!v || 'Content is required']"
                    />
                    <!-- <div v-html='content'></div> -->
                </v-col>
                <br>

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

        <!-- Dialog save confirmation -->
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
                            @click="SaveCoaching()"
                            >
                            Confirm
                        </v-btn>
                        </center>
                        <br>
                    </v-card>
                </v-dialog>
            </v-row>
        </template>
        <!-- Dialog save confirmation -->
        
        <!-- Dialog edit confirmation -->
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
        <!-- Dialog edit confirmation -->

        <!-- Dialog delete confirmation -->
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
        <!-- Dialog delete confirmation -->
    </v-container>
</template>

<script>
import coachingservices from '../services/coachingservices';
import userservices from '../services/userservices';
import { TiptapVuetify, Heading, Bold, Italic, Strike, Underline, Code, Paragraph, BulletList, ListItem, Link, Blockquote, HardBreak, HorizontalRule, History } from 'tiptap-vuetify'

export default {
    name: 'Coaching',
    components: { TiptapVuetify },
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
            { text: 'Last Name',sortable: true, value: 'user_info.personal_information.lastname',width: '140px' },
            { text: 'First Name',sortable: true, value: 'user_info.personal_information.firstname' },
            { text: 'Date Issued',sortable: false, value: 'date' },
            { text: 'Created By',sortable: false, value: 'created_by' },
            { text: 'Action',sortable: false, value: 'action',width: '430px' }
        ],
        valid: false,
        coachingdata : [],
        signature_path : '',
        listemployeedata : [],
        menuldate : false,
        user_info : '',
        date : '',
        maxdate: '',
        content : '',
        saveconfirmation : false,
        editfullscreendialog : false,
        editconfirmation : false,
        deleteconfirmation : false,
        extensions: [
            History,
            Blockquote,
            Link,
            Underline,
            Strike,
            Italic,
            ListItem,
            BulletList,
            [Heading, {
            options: {
                levels: [1, 2, 3]
            }
            }],
            Bold,
            Code,
            HorizontalRule,
            Paragraph,
            HardBreak,
        ],
        fordeletename : '',
    }),
    created(){
        this.$store.state.header = false;
        this.$store.state.footer = false;
        this.FetchAllCoaching();
        this.FetchAllUser();
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
        FetchAllCoaching(){ // fetch all coaching
            let payload = {
                parent_id: this.$store.getters.getParentID
            };
            coachingservices.FetchAllCoaching(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    this.coachingdata = response.data.data;
                    console.log(this.coachingdata)
                }
            }).catch(error => console.log(error));
        },
        FetchAllUser(){ // fetch all user for combobox
            let payload = {
                parent_id: this.$store.getters.getParentID
            };
            userservices.FetchAllUser(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    this.signature_path = response.data.signature_path;
                    response.data.data.forEach((value) => {
                        value.personal_information.middlename == null ? value.personal_information.middlename = '' : value.personal_information.middlename
                        value.user_other_personal_information.employee_id == null ? value.user_other_personal_information.employee_id = '' : value.user_other_personal_information.employee_id
                        this.listemployeedata.push({
                            text: value.personal_information.middlename == '' ? value.personal_information.lastname + ', ' + value.personal_information.firstname : value.personal_information.lastname + ', ' + value.personal_information.firstname + ', ' + value.personal_information.middlename,
                            firstname: value.personal_information.firstname,
                            lastname: value.personal_information.lastname,
                            middlename: value.personal_information.middlename == null ? '' : value.personal_information.middlename,
                            employee_id: value.user_other_personal_information.employee_id == null ? '' : value.user_other_personal_information.employee_id,
                            value: value.id
                        });
                    });
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
                created_by: item.created_by
            }

            this.editfullscreendialog = true
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
                        this.FetchAllCoaching();
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
            this.editfullscreendialog = false
        },
        changeStatusDialogEdit(status){
            this.editconfirmation = status;
        },
        confirmUpdate(){ // update coaching
            let val = this.$refs.form.validate();

            if(val){
                let payload = {
                    id: this.forAllUpdate['id'],
                    letter: this.content,
                    user_id : this.user_info.value,
                    date : this.date,
                    created_by: this.forAllUpdate['created_by'],
                    parent_user_id: this.$store.getters.getParentID,
                }
                console.log(payload)
                coachingservices.UpdateCoaching(payload, this.$store.getters.getAccessToken).then(response => {
                    if(response.data.success){
                        this.$store.state.snackbar.message = 'Coaching has been updated.';
                        this.$store.state.snackbar.show = true;
                        this.editfullscreendialog = false
                        this.editconfirmation = false
                        this.ClearCoaching()
                        this.$refs.form.resetValidation();
                        this.FetchAllCoaching();
                        this.$store.state.snackbar.colors = 'xgreen';
                        this.$store.state.snackbar.icon = "mdi-check-circle-outline";                      
                    }
                    }).catch(error =>{
                    this.$store.state.snackbar.colors = 'xred';
                    this.$store.state.snackbar.icon = "mdi-alert-outline";   
                    this.errorDAW = error.response.data.message
                    this.$store.state.snackbar.message = error.response.data.message;
                    this.$store.state.snackbar.show = true;
                });
            }
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
            this.FetchAllCoaching();
            this.$store.state.snackbar.colors = 'xgreen';
            this.$store.state.snackbar.icon = "mdi-check-circle-ouGetCoachingtline";                                  
        },
        PrintCoaching(item){
            localStorage.setItem('is_hris', 0)
            localStorage.setItem('coaching', item.id)
            localStorage.setItem('forprintpreviewcoaching', 0)
            window.open("/printcoaching","_blank")
        },
        PrintPreviewCoaching(item){ // print preview of clearance form
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