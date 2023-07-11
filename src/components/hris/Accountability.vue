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
                                    @click="NewAccountabilityField()" 
                                    v-if="$store.getters.valAccess(247)"
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
                                    @click="NewAccountabilityField()" 
                                    v-if="$store.getters.valAccess(247)"
                                    >
                                    <v-icon>mdi-plus</v-icon>
                                    </v-btn>
                                </template>
                                
                            </v-toolbar>
                        </template>
                        <!-- One liner filtering -->
                        <br>
                        <!-- Data table accountability Field -->
                        <v-data-table
                            :headers="showHeaders"
                            :items="accountabilityfielddata"
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

                            <!-- <template v-slot:item.user_id="props">
                                {{ props.item.user_info != null ? props.item.user_info.personal_information.lastname + ' , ' + props.item.user_info.personal_information.firstname : 'No Data' }}
                            </template> -->

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
                                            @click="UpdateAllAccountabilityField(props.item.id, props.item)"
                                            v-if="$store.getters.valAccess(248)"
                                        >
                                        <v-icon
                                                small
                                                @click="UpdateAllAccountabilityField(props.item.id, props.item)"
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
                                            @click="DeleteAccountabilityField(props.item.id, props.item.name)"
                                            v-if="$store.getters.valAccess(249)"
                                        >
                                        <v-icon
                                                small
                                                @click="DeleteAccountabilityField(props.item.id, props.item.name)"
                                            >
                                                mdi-delete
                                            </v-icon>
                                            Delete
                                        </v-btn>       
                                    </v-row>
                                </template>  
                            </template>
                        </v-data-table>
                        <!-- Data table accountability Field -->
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
                        <v-toolbar-title>Add Accountability</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-toolbar-items>
                        </v-toolbar-items>
                    </v-toolbar>
                    
                    <v-col sm="12" md="6" offset-md="3" class="mt-3 text-center"> 
                        <h4>Note: Here you can include assets that are given to employees.</h4>
                    </v-col>

                    <v-col sm="12" md="6" offset-md="3"> 
                        <v-text-field
                            v-model="accountability_field.name"
                            label="Asset"
                            color="orange"
                            required
                            outlined
                            :rules="[v => !!v || 'Asset is required']"
                        ></v-text-field>
                    </v-col>

                    <v-col sm="12" md="6" offset-md="3">
                        <tiptap-vuetify
                        v-model="content"
                        :extensions="extensions"
                        :native-extensions="nativeExtensions"
                        placeholder="Add remarks here"
                        />
                        <!-- <div v-html='content'></div> -->
                    </v-col>
                    <br>

                    <v-col sm="12" md="6" offset-md="3">
                        <v-file-input
                        outlined
                        v-model="file"
                        label="File"
                        color="orange"
                        truncate-length="50"
                        ></v-file-input>
                    </v-col>

                    <v-col sm="12" md="6" offset-md="3">
                        <v-combobox
                            outlined
                            color="orange"
                            v-model="user_info"
                            label="Employee Name"
                            :clearable="this.user_info != ''"
                            @change="clickuser()"
                            :items="listemployeedata"
                            :rules="[v => !!v || 'Employee Name is required']"
                        ></v-combobox>
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
                    <v-btn icon dark @click="CloseDialogEditFullScreen()">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-toolbar-title>Edit Accountability Field</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                    </v-toolbar-items>
                </v-toolbar>
                
                <v-col sm="12" md="6" offset-md="3" class="mt-3 text-center"> 
                    <h4>Note: Here you can edit assets that are given to employees.</h4>
                </v-col>

                <v-col sm="12" md="6" offset-md="3"> 
                    <v-text-field
                        v-model="accountability_field.name"
                        label="Asset"
                        color="orange"
                        required
                        outlined
                        :rules="[v => !!v || 'Asset is required']"
                    ></v-text-field>
                </v-col>

                <v-col sm="12" md="6" offset-md="3">
                    <tiptap-vuetify
                    v-model="content"
                    :extensions="extensions"
                    placeholder="Add remarks here"
                    />
                </v-col>
                <br>

                <v-col sm="12" md="6" offset-md="3">
                    <v-row>
                        <v-file-input
                        outlined
                        v-model="file"
                        label="File"
                        color="orange"
                        truncate-length="50"
                        @change="getfilename()"
                        ></v-file-input>
                        <v-btn
                            elevation="2"
                            class="mx-2 mt-2"
                            dark
                            outlined
                            color="orange"
                            @click.prevent="getfile(file_name)"
                        >
                        <v-icon
                                small
                            >
                                mdi-file-edit-outline
                            </v-icon>
                            View
                        </v-btn>
                    </v-row>
                </v-col>

                <v-col sm="12" md="6" offset-md="3">
                    <v-combobox
                        outlined
                        color="orange"
                        v-model="user_info"
                        label="Employee Name"
                        :clearable="this.user_info != ''"
                        @change="clickuser()"
                        :items="listemployeedata"
                        :rules="[v => !!v || 'Employee Name is required']"
                    ></v-combobox>
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
        <!-- Dialog save form -->
    
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
                            @click="SaveAccountabilityField()"
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
    </v-container>
</template>
  
<script>

import accountabilityfieldservices from '../services/accountabilityfieldservices';
import userservices from '../services/userservices';
import { insertText } from 'tiptap-commands'
import { Extension } from 'tiptap'
import { TiptapVuetify, Heading, Bold, Italic, Strike, Underline, Code, Paragraph, BulletList, ListItem, Link, Blockquote, HardBreak, HorizontalRule, History } from 'tiptap-vuetify'

export default {
    name: 'Accountability',
    components: { TiptapVuetify },
    data: () => ({
        image_path : '',
        file: [],
        file_name: '',
        content: ``,
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
        nativeExtensions: [
            new class extends Extension {
                keys() {
                    return {
                    Tab: insertText('    ')
                    }
                }
            }()
        ],
        sortBy: 'user_info.personal_information.lastname',
        sortDesc: false,
        user_info: '',
        listemployeedata: [],
        menucolumn: false,
        exportimport: [{ text: 'Upload', icon: 'mdi-upload-outline', linktrigger: 1 },
        { text: 'Download', icon: 'mdi-download-outline', linktrigger: 2 }],
        classito: 'd-inline-block text-truncate',
        search: '',
        page: 1,
        pageCount: 0,
        valid: false,
        saveconfirmation: false,
        deleteconfirmation: false,
        editfullscreendialog: false,
        editconfirmation : false,
        fordeletename: '',
        date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        dialog: false,
        fullscreendialog: false,
        accountability_field: {
            name: '',
            accountability_type_id: [],
        },
        headers:[],
        selectedHeaders: [],
        headersMap: [
            { text: 'Name',sortable: true, value: 'name' },
            { text: 'Accountable By',sortable: true, value: 'user_info.personal_information.lastname',width: '140px' },
            { text: '',sortable: true, value: 'user_info.personal_information.firstname' },
            { text: '',sortable: true, value: 'user_info.personal_information.middlename' },
            { text: 'Created By',sortable: false, value: 'created_by' },
            // { text: 'Remarks',sortable: false, value: 'remarks' },
            // { text: 'File',sortable: false, value: 'image' },
            { text: 'Action',sortable: false, value: 'action',width: '235px' }
            ],
        accountabilityfielddata: [],
        }),
        created(){
            this.$store.state.header = false;
            this.$store.state.footer = false;
            this.$store.state.snackbar.color = 'orange';
            this.FetchAllAccountabilityFieldViaParentid();
            this.FetchAllUser();
            this.headers = Object.values(this.headersMap);
            this.selectedHeaders = this.headers;          
        },
        mounted(){
            this.$store.state.title = "Accountability";
        },
        computed: {
        showHeaders () {
                return this.headers.filter(s => this.selectedHeaders.includes(s));
            }
        },      
        methods: {
        FetchAllAccountabilityFieldViaParentid(){ // fetch all accountability field
            let payload = {
                parent_id: this.$store.getters.getParentID
            };
            accountabilityfieldservices.FetchAllAccountabilityFieldViaParentid(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    this.accountabilityfielddata = response.data.data;
                    this.image_path = response.data.image_path;
                    console.log(this.accountabilityfielddata)
                }
            }).catch(error => console.log(error));
        },
        UpdateAllAccountabilityField(id, item){ // fetch info for update accountability field
            console.log(id, item);
            this.file =  new File(["foo"], item.image)
            this.file_name = item.image;
            this.content = item.remarks
            this.accountability_field.name = item.name
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
        confirmUpdate(){ // update accountability field
            let val = this.$refs.form.validate();

            if(val){
            const formData = new FormData();
            formData.append('id', this.forAllUpdate['id']);
            formData.append('name', this.accountability_field['name'])
            formData.append('user_id', this.user_info.value)
            formData.append('created_by', this.$store.getters.getUserID)
            formData.append('parent_user_id', this.$store.getters.getParentID)
            formData.append('remarks', this.content);
            formData.append('file', this.file);
            formData.append('file_name', this.file_name);

            // let payload = {
            //     id: this.forAllUpdate['id'],
            //     name: this.accountability_field.name,
            //     user_id : this.user_info.value,
            //     created_by: this.forAllUpdate['created_by'],
            //     parent_user_id: this.$store.getters.getParentID,
            // }
            // console.log(payload)
            accountabilityfieldservices.UpdateAccountabilityField(formData, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    this.$store.state.snackbar.message = 'Accountability field has been updated.';
                    this.$store.state.snackbar.show = true;
                    this.editfullscreendialog = false
                    this.editconfirmation = false
                    this.ClearAccountabilityField()
                    this.$refs.form.resetValidation();
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
            this.FetchAllAccountabilityFieldViaParentid();
        },
        NewAccountabilityField(){
            this.fullscreendialog = true
        },
        SaveAccountabilityField(){ // save accountability field

            let val = this.$refs.form.validate();

            if(val){
                const formData = new FormData();
                formData.append('parent_user_id', this.$store.getters.getParentID)
                formData.append('name', this.accountability_field['name'])
                formData.append('user_id', this.user_info.value)
                formData.append('created_by', this.$store.getters.getUserID)
                formData.append('remarks', this.content);
                formData.append('file', this.file);

                // let payload = {
                //     parent_user_id: this.$store.getters.getParentID,
                //     name: this.accountability_field['name'],
                //     user_id : this.user_info.value,
                //     created_by: this.$store.getters.getUserID,
                // };
                // console.log(payload);
                accountabilityfieldservices.SaveAccountabilityField(formData, this.$store.getters.getAccessToken).then(response => {
                    if(response.data.success){
                        this.fullscreendialog = false;
                        this.$store.state.snackbar.message = 'Accountability field has been created.';
                        this.$store.state.snackbar.show = true;
                        this.FetchAllAccountabilityFieldViaParentid();
                        this.ClearAccountabilityField();
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
        CloseDialogFullScreen(){
            this.ClearAccountabilityField();
            this.fullscreendialog = false
        },
        CloseDialogEditFullScreen(){
            this.ClearAccountabilityField();
            this.editfullscreendialog = false
        },
        ClearAccountabilityField(){
            this.accountability_field['name'] = ''
            this.accountability_field['accountability_type_id'] = ''
            this.file = []
            this.content = ``
            this.user_info = ''
        },
        DeleteAccountabilityField(id, name){
            this.fordeletename = name
            this.forDelete = {
                id: id
            }
            this.deleteconfirmation = true;
        },
        confirmDelete(){ // delete accountability field
            let payload = {
                id: this.forDelete['id']
            }
            console.log(payload);
            accountabilityfieldservices.DeleteAccountabilityField(payload, this.$store.getters.getAccessToken).catch(error =>{
                this.errorDAW = error.response.data.message
                this.$store.state.snackbar.message = error.response.data.message;
                this.$store.state.snackbar.show = true;
            });

            this.$store.state.snackbar.message = 'Accountability field has been deleted.';
            this.$store.state.snackbar.show = true;
            this.deleteconfirmation = false;
            this.FetchAllAccountabilityFieldViaParentid();
            this.$store.state.snackbar.colors = 'xgreen';
            this.$store.state.snackbar.icon = "mdi-check-circle-outline";                                  
        },
        changeStatusDialogSave(status){
            this.saveconfirmation = status;
        },
        changeStatusDialogDelete(status){
            this.deleteconfirmation = status;
            this.FetchAllAccountabilityFieldViaParentid();
        },
        changeStatusDialogEdit(status){
            this.editconfirmation = status;
            this.FetchAllAccountabilityFieldViaParentid();
        },
        validationfalse(){
            this.$refs.form.validate()
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
        clickuser(){
            this.firstname = this.user_info != null ? this.user_info.firstname : '' 
            this.middlename = this.user_info != null ? this.user_info.middlename : ''
            this.lastname = this.user_info != null ? this.user_info.lastname : ''
            this.employeeid = this.user_info != null ? this.user_info.value : 0
        },
        getfile(file) {
            window.open(this.image_path + file, "_blank");
        },
        getfilename(){
            this.file_name = this.file;
        }
    }
}
</script>
  
<style scoped>
    input[type=checkbox] {
        accent-color: orange;
    }
</style>