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
                                    @click="NewAccountabilityType()" 
                                    v-if="$store.getters.valAccess(242)"
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
                                    @click="NewAccountabilityType()" 
                                    v-if="$store.getters.valAccess(242)"
                                    >
                                    <v-icon>mdi-plus</v-icon>
                                    </v-btn>
                                </template>
                            </v-toolbar>
                        </template>
                        <!-- One liner filtering -->
                        <br>
                        <!-- Data table Accountability Type -->
                        <v-data-table
                            :headers="showHeaders"
                            :items="accountabilitytypedata"
                            :search="search"
                            :page.sync="page"
                            @page-count="pageCount = $event"
                            :footer-props="{
                            'items-per-page-options':[10],
                            'disable-items-per-page': true,
                            }"
                            >
                            
                            <template v-slot:item.created_by="props">
                                {{ props.item.created_info != null ? props.item.created_info.personal_information.lastname + ' , ' + props.item.created_info.personal_information.firstname : 'No Data' }}
                            </template>
                            
                            <template v-slot:item.division_id="props">
                                {{ props.item.division_info != null ? props.item.division_info.name : '' }}
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
                                            @click="UpdateAllAccountabilityType(props.item.id, props.item)"
                                            v-if="$store.getters.valAccess(243)"
                                        >
                                        <v-icon
                                                small
                                                @click="UpdateAllAccountabilityType(props.item.id, props.item)"
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
                                            @click="DeleteAccountabilityType(props.item.id, props.item.name)"
                                            v-if="$store.getters.valAccess(244)"
                                        >
                                        <v-icon
                                                small
                                                @click="DeleteAccountabilityType(props.item.id, props.item.name)"
                                            >
                                                mdi-delete
                                            </v-icon>
                                            Delete
                                        </v-btn>       
                                    </v-row>
                                </template>  
                            </template>
                        </v-data-table>
                        <!-- Data table Accountability Type -->
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
                    <v-toolbar-title>Add Accountability Type</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                    </v-toolbar-items>
                </v-toolbar>
                
                <v-col sm="12" md="6" offset-md="3" class="mt-3 text-center"> 
                    <h4>Note: Here you can create accountability type</h4>
                </v-col>

                <v-col sm="12" md="6" offset-md="3"> 
                    <v-text-field
                        v-model="accountability_type.name"
                        label="Name"
                        color="orange"
                        required
                        outlined
                        :rules="[v => !!v || 'Name is required']"
                    ></v-text-field>
                </v-col>

                <v-col sm="12" md="6" offset-md="3">
                    <v-combobox
                        outlined
                        color="orange"
                        v-model="division_info"
                        label="Division"
                        :clearable="this.division_info != ''"
                        :items="listdivisiondata"
                        :rules="[v => !!v || 'Division is required']"
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
                    <v-toolbar-title>Edit Accountability Type</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                    </v-toolbar-items>
                </v-toolbar>
                
                <v-col sm="12" md="6" offset-md="3" class="mt-3 text-center"> 
                    <h4>Note: Here you can edit accountability type</h4>
                </v-col>

                <v-col sm="12" md="6" offset-md="3"> 
                    <v-text-field
                        v-model="accountability_type.name"
                        label="Name"
                        color="orange"
                        required
                        outlined
                        :rules="[v => !!v || 'Name is required']"
                    ></v-text-field>
                </v-col>
                
                <template v-if="divisionname != 'Immediate Superior (Supervisor)' && divisionname != 'Department Head'">
                    <v-col sm="12" md="6" offset-md="3">
                        <v-combobox
                            outlined
                            color="orange"
                            v-model="division_info"
                            label="Division"
                            :clearable="this.division_info != ''"
                            :items="listdivisiondata"
                            :rules="[v => !!v || 'Division is required']"
                        ></v-combobox>
                    </v-col>
                </template>
                
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
                            @click="SaveAccountabilityType()"
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

import accountabilitytypeservices from '../services/accountabilitytypeservices';
import divisionservices from '../services/divisionservices';

export default {
    name: 'AccountabilityType',
    data: () => ({
    divisionname : '',
    division_info : '',
    listdivisiondata : [],
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
    accountability_type: {
        name: '',
    },
    headers:[],
    selectedHeaders: [],
    headersMap: [
        { text: 'Name',sortable: true, value: 'name' },
        { text: 'Division',sortable: true, value: 'division_id' },
        { text: 'Created By',sortable: false, value: 'created_by' },
        { text: 'Action',sortable: false, value: 'action', width: '230'}
        ],
        accountabilitytypedata: [],
    }),
    created(){
        this.$store.state.header = false;
        this.$store.state.footer = false;
        this.$store.state.snackbar.color = 'orange';
        this.FetchAllAccountabilityType();
        this.FetchDivisionInformation();
        this.headers = Object.values(this.headersMap);
    this.selectedHeaders = this.headers;          
    },
    mounted(){
        this.$store.state.title = "Accountability Type";
    },
    computed: {
    showHeaders () {
            return this.headers.filter(s => this.selectedHeaders.includes(s));
        }
    },      
    methods: {
    FetchAllAccountabilityType(){ // fetch all accountability type
        let payload = {
            parent_id: this.$store.getters.getParentID
        };
        accountabilitytypeservices.FetchAllAccountabilityType(payload, this.$store.getters.getAccessToken).then(response => {
            if(response.data.success){
                this.accountabilitytypedata = response.data.data;
            }
        }).catch(error => console.log(error));
    },
    UpdateAllAccountabilityType(id, item){ // fetch info for update accountability type
        console.log(id, item);
        this.division_info = []
        this.accountability_type.name = item.name
        this.forAllUpdate = {
            id: id,
            created_by: item.created_by,
        }
        this.divisionname = item.name

        if(item.division_id != 0){
            this.division_info = {
                text: item.division_info.name,
                value: item.division_id
            }
        }

        this.editfullscreendialog = true
    },
    confirmUpdate(){ // update accountability type
        let val = this.$refs.form.validate();

        if(val){
        let payload = {
            id: this.forAllUpdate['id'],
            name: this.accountability_type.name,
            created_by: this.forAllUpdate['created_by'],
            parent_user_id: this.$store.getters.getParentID,
            flag: "1",
            division_id : this.division_info.value
        }
        console.log(payload)
        accountabilitytypeservices.UpdateAccountabilityType(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    this.$store.state.snackbar.message = 'Accountability type has been updated.';
                    this.$store.state.snackbar.show = true;
                    this.editfullscreendialog = false
                    this.editconfirmation = false
                    this.ClearAccountabilityType()
                    this.$refs.form.resetValidation();
                    this.$store.state.snackbar.colors = 'xgreen';
                    this.$store.state.snackbar.icon = "mdi-check-circle-outline";                      
            }else{
                    this.$store.state.snackbar.colors = 'xred';
                    this.$store.state.snackbar.icon = "mdi-alert-outline";                      
                }

            }).catch(error =>{
            this.errorDAW = error.response.data.message
            this.$store.state.snackbar.message = error.response.data.message;
            this.$store.state.snackbar.show = true;
        });
        }
        this.FetchAllAccountabilityType();
    },
    NewAccountabilityType(){
        this.fullscreendialog = true
    },
    SaveAccountabilityType(){ // save accountability type

        let val = this.$refs.form.validate();

        if(val){
            let payload = {
                parent_user_id: this.$store.getters.getParentID,
                name: this.accountability_type['name'],
                created_by: this.$store.getters.getUserID,
                division_id: this.division_info.value,
            };
            accountabilitytypeservices.SaveAccountabilityType(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    this.fullscreendialog = false;
                    this.$store.state.snackbar.message = 'Accountability type has been created.';
                    this.$store.state.snackbar.show = true;
                    this.FetchAllAccountabilityType();
                    this.ClearAccountabilityType();
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
        this.ClearAccountabilityType();
        this.fullscreendialog = false
    },
    CloseDialogEditFullScreen(){
        this.ClearAccountabilityType();
        this.editfullscreendialog = false
    },
    ClearAccountabilityType(){
        this.accountability_type['name'] = ''
    },
    DeleteAccountabilityType(id, name){
        this.fordeletename = name
        this.forDelete = {
            id: id
        }
        this.deleteconfirmation = true;
    },
    confirmDelete(){ // delete accountability type
        let payload = {
            id: this.forDelete['id']
        }
        console.log(payload);
        accountabilitytypeservices.DeleteAccountabilityType(payload, this.$store.getters.getAccessToken).catch(error =>{
            this.errorDAW = error.response.data.message
            this.$store.state.snackbar.message = error.response.data.message;
            this.$store.state.snackbar.show = true;
        });

        this.$store.state.snackbar.message = 'Accountability type has been deleted.';
        this.$store.state.snackbar.show = true;
        this.deleteconfirmation = false;
        this.FetchAllAccountabilityType();
        this.$store.state.snackbar.colors = 'xgreen';
        this.$store.state.snackbar.icon = "mdi-check-circle-outline";                                  
    },
    changeStatusDialogSave(status){
        this.saveconfirmation = status;
    },
    changeStatusDialogDelete(status){
        this.deleteconfirmation = status;
        this.FetchAllAccountabilityType();
    },
    changeStatusDialogEdit(status){
        this.editconfirmation = status;
        this.FetchAllAccountabilityType();
    },
    validationfalse(){
        this.$refs.form.validate()
    },
    FetchDivisionInformation(){ // fetch all division for combobox
        let payload = {
            user_id: this.$store.getters.getParentID
        };
        divisionservices.fetchDivisionInformation(payload, this.$store.getters.getAccessToken).then(response => {
            if(response.data.success){
                response.data.result.forEach((value) => {
                    this.listdivisiondata.push({
                        text: value.name,
                        value: value.id
                    });
                });
            }
        }).catch(error => console.log(error));
    },
    }
}
</script>
  
<style scoped>
    input[type=checkbox] {
        accent-color: orange;
    }
</style>