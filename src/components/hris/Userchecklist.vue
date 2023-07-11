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

                                        <v-card style="padding-top:10px;min-width:50px;" height="200px" class="scroll">
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

                                            <v-card style="padding-bottom:10px" height="200px" class="scroll">
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
                                    @click="NewChecklist()" 
                                    v-if="$store.getters.valAccess(205)"
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
                                    @click="NewChecklist()" 
                                    v-if="$store.getters.valAccess(205)"
                                    >
                                    <v-icon>mdi-plus</v-icon>
                                    </v-btn>
                                </template>
                            </v-toolbar>
                        </template>
                        <!-- One liner filtering -->  
                        <br>
                        <!-- Data table On Boarding User -->  
                        <v-data-table
                        :headers="showHeaders"
                        :items="userchecklistdata"
                        :search="search" 
                        :page.sync="page"
                        @page-count="pageCount = $event"
                        :footer-props="{
                        'items-per-page-options':[10],
                        'disable-items-per-page': true,
                        }">

                            <template v-slot:[checklistdatacell(b)]="props" v-for="(b,counter) in templateheaders" >
                                <template>
                                    <div :key="counter">
                                        <v-checkbox 
                                            v-model="props['item'][b['value']]"
                                            readonly
                                            v-if="props['item'][b['value']] == 1"
                                            color="orange"
                                        ></v-checkbox> 
                                        <v-checkbox 
                                            v-else
                                            value="false"
                                            readonly
                                            color="orange"
                                        ></v-checkbox>  
                                    </div>
                                </template>
                            </template>

                            <template v-slot:item.action="props">
                                <v-btn
                                elevation="2"
                                    class="mx-2"
                                    dark
                                    outlined
                                    small
                                    color="orange"
                                    v-if="$store.getters.valAccess(206) && props.item.name != 'Offset Leave'"
                                    @click="UpdateAllUserchecklist(props.item.id, props.item)"
                                >
                                <v-icon
                                        small
                                        @click="UpdateAllUserchecklist(props.item.id, props.item)"
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
                                    v-if="$store.getters.valAccess(207) && props.item.name != 'Offset Leave'"
                                    @click="DeleteChecklist(props.item.id, props.item.name)"
                                >
                                <v-icon
                                        small
                                        @click="DeleteChecklist(props.item.id, props.item.name)"
                                    >
                                        mdi-delete
                                    </v-icon>
                                    Delete
                                </v-btn>       
                            </template>
                        </v-data-table>
                        <!-- Data table On Boarding User -->  
                        <v-pagination
                        color="orange"
                        v-model="page"
                        :length="pageCount"
                        ></v-pagination>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
  

        <!-- Dialog save form-->
        <v-dialog
        v-model="fullscreendialog"
        persistent
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
                    <v-toolbar-title>Add Onboarding</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                    </v-toolbar-items>
                </v-toolbar>
                
                <v-col sm="12" md="6" offset-md="3" class="mt-3 text-center"> 
                    <h4>Note: Here you can add Onboarding User here</h4>
                </v-col>

                <v-col sm="12" md="6" offset-md="3" class="mt-3 text-left">
                    <div class="sm-12">
                        <v-combobox
                            outlined
                            color="orange"
                            v-model="user_info"
                            label="Employee"
                            :clearable="this.user_info != ''"
                            @change="clickuser()"
                            :items="listemployeedata"
                        ></v-combobox>
                    </div>
                    <div class="sm-12">
                      <v-text-field
                          required
                          color="orange"
                          outlined
                          label="First Name"
                          v-model="firstname"
                          :rules="[v => !!v || 'First Name is required']"
                      ></v-text-field>
                    </div>
                    <div class="sm-12">
                      <v-text-field
                          required
                          color="orange"
                          outlined
                          label="Middle Name"
                          v-model="middlename"
                      ></v-text-field>
                    </div>
                    <div class="sm-12">
                      <v-text-field
                          required
                          color="orange"
                          outlined
                          label="Last Name"
                          :rules="[v => !!v || 'Last Name is required']"
                          v-model="lastname"
                      ></v-text-field>
                    </div>
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
        <!-- Dialog save form-->

        <!-- Dialog edit form-->
        <v-dialog
        v-model="editfullscreendialog"
        persistent
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
                    <v-toolbar-title>Files</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                    </v-toolbar-items>
                </v-toolbar>
                
                <v-col sm="12" md="6" offset-md="3" class="mt-3 text-center"> 
                    <h4>Note: Here you can upload files , view files and assign to employee here</h4>
                </v-col>

                <v-col>
                  <div class="sm-12">
                        <v-combobox
                            outlined
                            color="orange"
                            v-model="user_info"
                            label="Employee"
                            :clearable="this.user_info != ''"
                            @change="clickuser()"
                            :items="listemployeedata"
                        ></v-combobox>
                    </div>
                    <v-row>
                        <v-col sm="4">
                            <v-text-field
                                required
                                color="orange"
                                label="First Name"
                                v-model="firstname"
                                :rules="[v => !!v || 'First Name is required']"
                            ></v-text-field>
                        </v-col>
                        <v-col sm="4">
                            <v-text-field
                                required
                                color="orange"
                                label="Middle Name"
                                v-model="middlename"
                            ></v-text-field>
                        </v-col>
                        <v-col sm="4">
                            <v-text-field
                                required
                                color="orange"
                                label="Last Name"
                                :rules="[v => !!v || 'Last Name is required']"
                                v-model="lastname"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-data-table
                        :headers="checkliststatus"
                        :items="checkliststatusdata"
                        :search="search"
                        :page.sync="page"
                        :sort-by.sync="sortBy"
                        :sort-desc.sync="sortDesc"
                    @page-count="pageCount = $event"
                    group-by="checklist_info.type"
                    :footer-props="{
                    'items-per-page-options':[1000],
                    'disable-items-per-page': true,
                }"
                    >

                    <template v-slot:group.header="{items, isOpen, toggle}">
                        <th colspan="6">
                            <v-icon @click="toggle"
                                >{{ isOpen ? 'mdi-minus' : 'mdi-plus' }}
                            </v-icon>
                            {{ items[0]['checklist_info']['type'] }}
                        </th>
                    </template>
                            
                        <template v-slot:item.status="props">
                            <div>
                                <v-checkbox 
                                    v-model="props.item.status"
                                    readonly
                                    v-if="props.item.status == 1"
                                    color="orange"
                                ></v-checkbox> 
                                <v-checkbox 
                                    v-else
                                    value="false"
                                    readonly
                                    @click="UpdateChecklistStatus(props.item.id, props.item.checklist_info.type)"
                                    color="orange"
                                ></v-checkbox>  
                            </div>
                        </template>

                        <template v-slot:item.action="props">
                            <template>
                                <v-row v-if="props.item.file == null">
                                  <v-btn
                                  @click="handleFileImport(props.item)"
                                  elevation="2"
                                  class="mx-2"
                                  dark
                                  outlined
                                  small
                                  color="orange"
                                  >
                                  <v-icon
                                      small
                                  >
                                      mdi-upload
                                  </v-icon>
                                  Upload
                                  </v-btn>
                                  <input 
                                  ref="uploader" 
                                  class="d-none" 
                                  type="file" 
                                  @change="onFileChanged"
                                  >
                                </v-row>
                                <v-row v-else>
                                    <template v-if="props.item.upload_status != 0 && props.item.upload_status != 2">
                                        <v-btn
                                        @click="handleFileImport(props.item)"
                                        elevation="2"
                                        class="mx-2"
                                        dark
                                        outlined
                                        small
                                        color="orange"
                                        >
                                        <v-icon
                                            small
                                        >
                                            mdi-upload
                                        </v-icon>
                                        Reupload
                                        </v-btn>
                                        <input 
                                        ref="uploader" 
                                        class="d-none" 
                                        type="file" 
                                        @change="onFileChanged"
                                        >
                                        <v-btn
                                            elevation="2"
                                            class="mx-2"
                                            dark
                                            outlined
                                            small
                                            color="orange"
                                            @click.prevent="getfile(props.item.file)"
                                        >
                                        <v-icon
                                                small
                                            >
                                                mdi-eye-outline
                                            </v-icon>
                                            View
                                        </v-btn>
                                    </template>
                                    <template v-else>
                                        <template v-if="props.item.upload_status == 2">
                                            <v-btn
                                            @click="handleFileImport(props.item)"
                                            elevation="2"
                                            class="mx-2"
                                            dark
                                            outlined
                                            small
                                            color="orange"
                                            >
                                            <v-icon
                                                small
                                            >
                                                mdi-upload
                                            </v-icon>
                                            Upload
                                            </v-btn>
                                            <input 
                                            ref="uploader" 
                                            class="d-none" 
                                            type="file" 
                                            @change="onFileChanged"
                                            >
                                        </template>
                                        <template v-else>
                                            <v-btn
                                                elevation="2"
                                                class="mx-2"
                                                dark
                                                outlined
                                                small
                                                color="red"
                                                @click="OpenDialogApproveDisapprove(props.item, 'disapprove')"
                                                >
                                                Disapprove
                                            </v-btn>
                                            <v-btn
                                                elevation="2"
                                                class="mx-2"
                                                dark
                                                outlined
                                                small
                                                color="orange"
                                                @click="OpenDialogApproveDisapprove(props.item, 'approve')"
                                                >
                                                Approve
                                            </v-btn>
                                            <v-btn
                                                elevation="2"
                                                class="mx-2"
                                                dark
                                                outlined
                                                small
                                                color="orange"
                                                @click.prevent="getfile(props.item.file)"
                                            >
                                            <v-icon
                                                    small
                                                >
                                                    mdi-eye-outline
                                                </v-icon>
                                                View
                                            </v-btn>
                                        </template>
                                    </template>
                                </v-row>
                            </template>  
                        </template>
                </v-data-table>
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
        <!-- Dialog edit form-->
  
        <!-- Dialog save confirmation-->
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
                            @click="SaveChecklist()"
                            >
                            Confirm
                        </v-btn>
                        </center>
                        <br>
                    </v-card>
                </v-dialog>
            </v-row>
        </template>
        <!-- Dialog save confirmation-->

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

        <!-- Dialog approved disapproved confirmation --> 
        <v-row justify="center">
            <v-dialog
            persistent :retain-focus="false"
            v-model="approvedisapprove"
            max-width="500"
            >
                <v-form
                    ref="form"
                    v-model="valid"
                    lazy-validation
                >
                    <v-card>
                        <v-card-title class="text-h5">
                        Remarks
                        </v-card-title>
                        <v-card-actions>
                            <v-textarea
                                solo
                                name="input-7-4"
                                outlined
                                padding="120"
                                no-resize
                                counter
                                color="orange"
                                v-model="approverremarks"
                                :rules="[v => !!v || 'Remarks is required']"
                            ></v-textarea>
                        </v-card-actions>
                        <center>
                        <v-btn
                            elevation="2"
                            class="mx-2"
                            dark
                            outlined
                            small
                            color="red"
                            @click="approvedisapprove = false, approverremarks = ''"
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
                            @click="ApproveDisapproveChecklistStatus()"
                            >
                                Confirm
                        </v-btn>
                        </center>
                        <br>                      
                    </v-card>
                </v-form>
            </v-dialog>
        </v-row>
        <!-- Dialog approved disapproved confirmation --> 
    </v-container>
</template>
  
<script>
  
  import userchecklistservices from '../services/userchecklistservices';
  import checklistservices from '../services/checklistservices';
  import userservices from '../services/userservices';
  import checkliststatusservices from '../services/checkliststatusservices';
  
    export default {
      name: 'Userchecklist',
      data: () => ({
        approverremarks : '',
        approvedisapprove: false,
        sortBy: 'status',
        sortDesc: false,
        checklistid: '',
        isSelecting: false,
        selectedFile: null,
        url: null,
        checkliststatusdata: [],
        menucolumn: false,
        listemployeedata: [],
        user_info: [],
        linkType: 'true',
        linkTypeCheck: 'true',
        hahahaha: '',
        hamehame: 'Job_Offer',
        current: '',
        triggerto: 0,
        employeeid: 0,
        firstname: '',
        middlename: '',
        lastname: '',
        search: '',
        page: 1,
        pageCount: 0,
        valid: false,
        saveconfirmation: false,
        editconfirmation: false,
        deleteconfirmation: false,
        editfullscreendialog: false,
        fordeletename: '',
        date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        dialog: false,
        fullscreendialog: false,
        checklisttypeitems : ['Checklist', 'Requirement'],
        checklist: {
            name: '',
            type: ''
        },
        headers:[],
        selectedHeaders: [],
        headersMap: [
            { text: 'First Name',sortable: true, value: 'firstname',width: '130px' },
            { text: 'Middle Name',sortable: false, value: 'middlename',width: '130px' },
            { text: 'Last Name',sortable: false, value: 'lastname',width: '130px' },
            { text: 'Checklist',sortable: false, value: 'checklist' },
            { text: 'Requirement',sortable: false, value: 'requirement' },
            { text: 'Action',sortable: false, value: 'action' }
        ],
        headerchecklist: [
            { text: 'First Name',sortable: true, value: 'firstname',width: '130px' },
            { text: 'Middle Name',sortable: false, value: 'middlename',width: '130px' },
            { text: 'Last Name',sortable: false, value: 'lastname',width: '130px' },
        ],

        checkliststatus: [
            { text: 'Name',sortable: true, value: 'checklist_info.name' },
            { text: 'Status',sortable: true, value: 'status' },
            { text: 'File',sortable: false, value: 'file' },
            { text: 'Action',sortable: false, value: 'action' },
        ],

        userchecklistdata: [],

        checklistdatalength: '',
        checklistdata: [],
        checklistcheckboxdata: [],
        checklistfiledata: [],
        checklistnamedata: [],
        finaldatachecklist: [],
        subfinaldatachecklist: [],

        requirementdatalength: '',
        requirementdata: [],
        requirementcheckboxdata: [],
        requirementfiledata: [],
        requirementnamedata: [],
        finaldatarequirement: [],
        subfinaldatarequirement: [],

        templateheaders:[],
        parasaprops:[],

        checkname:'',
        reqname:'',
        image_path: [],
        requirementfiledatapath: [],
        checklistfiledatapath: [],
      }),
      created(){
        this.$store.state.header = false;
        this.$store.state.footer = false;
        this.$store.state.snackbar.color = 'orange';
        this.FetchAllUserchecklist();
        this.FetchAllUser();
        this.headers = Object.values(this.headersMap);
        this.selectedHeaders = this.headers;          
      },
      mounted(){
          this.$store.state.title = "User Onboarding";
      },
      computed: {
      //Done to get the ordered headers
      showHeaders () {
        return this.headers.filter(s => this.selectedHeaders.includes(s));
      }
    },      
      methods: {
        FetchAllUserchecklist(){ // fetch all user and checklist and requriements
            let payload = {
                parent_id: this.$store.getters.getParentID
            };
            userchecklistservices.FetchAllUserchecklist(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    this.userchecklistdata = response.data.data;
                    this.image_path = response.data.image_path

                    if(this.triggerto == 0){
                        response.data.headers.forEach((value) => {
                            this.headerchecklist.push({
                                text: value.text,
                                value: value.value,
                                width: '130px',
                                sortable: false
                            });
                            this.templateheaders.push({
                                value: value.value,
                            })
                        });
                        this.headerchecklist.push({
                            text: 'Action',
                            value: 'action'
                        });
                        this.headers = Object.values(this.headerchecklist);
                        this.selectedHeaders = this.headers;
                        this.triggerto = 1;
                    }       
                }
            }).catch(error => console.log(error));
        },
        FetchAllbyTypeChecklist(){  // fetch all checklist "type"
            let payload = {
                parent_id: this.$store.getters.getParentID,
                type: 'Checklist'
            };
            checklistservices.FetchAllbyType(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    this.checklistdata = response.data.data;
                    this.checklistdatalength = this.checklistdata.length;
                }
            }).catch(error => console.log(error));
        },
        FetchAllbyTypeRequirement(){ // fetch all checklist "requirements"
            let payload = {
                parent_id: this.$store.getters.getParentID,
                type: 'Requirement'
            };
            checklistservices.FetchAllbyType(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    this.requirementdata = response.data.data;
                    this.requirementdatalength=this.requirementdata.length;
                }
            }).catch(error => console.log(error));
        },
        UpdateChecklist(id, name, code, description, created_by){ // fetch on boarding info for update
            this.forUpdate = {
                id: id,
                name: name,
                code: code,
                description: description,
                created_by: created_by
            }
            this.editconfirmation = true
            console.log(id, name, code, description, created_by);
        },
        confirmUpdate(){ // edit onboarding
            let loader = this.$loading.show();
            let val = this.$refs.form.validate();
            if(val){
                let payload = {
                  id : this.forAllUpdate.id,
                  user_id: this.employeeid,
                  firstname: this.firstname,
                  lastname: this.lastname,
                  middlename: this.middlename == null ? '' : this.middlename,
                };
                
                userchecklistservices.UpdateUserchecklist(payload, this.$store.getters.getAccessToken).then(response => {
                        if(response.data.success){
                            loader.hide();
                            this.$store.state.snackbar.message = 'User Onboarding has been updated.';
                            this.$store.state.snackbar.show = true;
                            this.editfullscreendialog = false
                            this.$store.state.snackbar.colors = 'xgreen';
                            this.$store.state.snackbar.icon = "mdi-check-circle-outline";   
                            this.FetchAllUserchecklist();
                            this.ClearChecklist();
                            this.$refs.form.resetValidation();
                        }
                    }).catch(error =>{
                    loader.hide();
                    this.errorDAW = error.response.data.message
                    this.$store.state.snackbar.message = error.response.data.message;
                    this.$store.state.snackbar.show = true;
                    this.$store.state.snackbar.colors = 'xred';
                    this.$store.state.snackbar.icon = "mdi-alert-outline"; 
                });
            }

            this.editconfirmation = false
        },
        changeStatusDialogEdit(status){
            this.editconfirmation = status;
            this.FetchAllUserchecklist();        
        },
        NewChecklist(){
            this.ClearChecklist();
            this.fullscreendialog = true
        },
        SaveChecklist(){ // save onboarding
            let val = this.$refs.form.validate();
            if(val){

            let loader = this.$loading.show();
                let payload = {
                  firstname: this.firstname,
                  middlename: this.middlename,
                  lastname: this.lastname,
                  user_id: this.employeeid,
                  parent_user_id: this.$store.getters.getParentID,
                  created_by: this.$store.getters.getUserID,
                }
                console.log(payload)

                userchecklistservices.SaveUserchecklist(payload, this.$store.getters.getAccessToken).then(response => {
                      if(response.data.success){
                          loader.hide();
                          this.fullscreendialog = false;
                          this.$store.state.snackbar.message = 'Onboarding has been created.';
                          this.$store.state.snackbar.show = true;
                          this.$store.state.snackbar.colors = 'xgreen';
                          this.$store.state.snackbar.icon = "mdi-check-circle-outline";   
                          this.FetchAllUserchecklist();
                          this.ClearChecklist();
                          this.$refs.form.resetValidation();
                      }
                  }).catch(error =>{
                  loader.hide();
                  this.$store.state.snackbar.message = error.response.data.message;
                  this.$store.state.snackbar.show = true;
                  this.$store.state.snackbar.colors = 'xred';
                  this.$store.state.snackbar.icon = "mdi-alert-outline";  
                });

            }
            this.saveconfirmation = false;
            
        }, 
        CloseDialogFullScreen(){
            this.ClearChecklist();
            this.fullscreendialog = false
        },
        CloseDialogEditFullScreen(){
            this.FetchAllUserchecklist();
            this.ClearChecklist();
            this.editfullscreendialog = false
        },
        ClearChecklist(){
            this.firstname = ''
            this.middlename = ''
            this.lastname = ''
            this.checklistcheckboxdata= []
            this.checklistfiledata= []
            this.checklistnamedata= []
            this.finaldatachecklist= []
            this.subfinaldatachecklist= []
            this.requirementcheckboxdata= []
            this.requirementfiledata= []
            this.requirementnamedata= []
            this.finaldatarequirement= []
            this.subfinaldatarequirement= []
            this.requirementfiledatapath= []
            this.checklistfiledatapath= []
            this.user_info=[]
        },
        DeleteChecklist(id, name){
            this.fordeletename = name
            this.forDelete = {
                id: id
            }
            this.deleteconfirmation = true;
        },
        confirmDelete(){ // delete onboarding
            let payload = {
                id: this.forDelete['id']
            }
            userchecklistservices.DeleteUserchecklist(payload, this.$store.getters.getAccessToken).catch(error =>{
                this.$store.state.snackbar.message = error.response.data.message;
                this.$store.state.snackbar.show = true;
            });

            this.$store.state.snackbar.message = 'User Onboarding has been deleted.';
            this.$store.state.snackbar.show = true;
            this.deleteconfirmation = false;
            this.FetchAllUserchecklist();
        },
        changeStatusDialogSave(status){
            this.saveconfirmation = status;
        },
        changeStatusDialogDelete(status){
            this.deleteconfirmation = status;
            this.FetchAllUserchecklist();
        },
        validationfalse(){
            this.$refs.form.validate()
        },
        changechangelistto(haha){
            this.checklistcheckboxdata[haha] = true
            if(this.checklistfiledata[haha] == null){
                this.checklistcheckboxdata[haha] = false
            }
        },
        changerequirelistto(haha){
            this.requirementcheckboxdata[haha] = true
            if(this.requirementfiledata[haha] == null){
                this.requirementcheckboxdata[haha] = false
            }
        },
        UpdateAllUserchecklist(id, item){ // fetch on boarding info for update
            console.log(item)
            this.checklistid = id
            this.firstname = item.firstname
            this.middlename = item.middlename
            this.lastname = item.lastname

            this.user_info = {
                text: item.middlename == null ? item.lastname + ', ' + item.firstname : item.lastname + ', ' + item.firstname + ', ' + item.middlename,
                firstname: item.firstname,
                lastname: item.lastname,
                middlename: item.middlename == null ? '' : item.middlename,
                value: item.user_id
            }
            this.checkliststatusdata = item.checklist_status_info
            this.forAllUpdate = {
                id: id
            }

            this.editfullscreendialog = true
        },
        checklistdatacell(key) {
            // console.log(`item.${key['value']}`)
            return `item.${key['value']}`; // simple string interpolation
        },
        checklistcell(key) {
            // console.log(key.text.replaceAll(' ', '_'))
            return key.text.replaceAll(' ', '_'); // simple string interpolation
        },
        getfile(file) {
            window.open(this.image_path + file, "_blank");
        },
        FetchAllUser(){  // fetch all user
            let payload = {
                parent_id: this.$store.getters.getParentID
            };
            userservices.FetchAllUser(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
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
        handleFileImport(item) { // upload image
            console.log(item)
            this.isSelecting = true;
            window.addEventListener('focus', () => {
                this.isSelecting = false
            }, { once: true });
            this.$refs.uploader.click();

            this.forAllUpdate = {
                id: item.id,
                type: item.checklist_info.type
            }
        },
        onFileChanged(e) { // upload image
            this.selectedFile = e.target.files[0];
            if(!this.selectedFile){
                this.url=null;
                return;
            } 
            this.url= URL.createObjectURL(this.selectedFile);

            const formData = new FormData();
            formData.append('id', this.forAllUpdate.id); 
            formData.append('file', this.selectedFile);
            formData.append('type', this.forAllUpdate.type);
            formData.append('upload_by', this.$store.getters.getUserID);
            formData.append('approved_by', this.$store.getters.getUserID);
            formData.append('upload_status', 1);

            checkliststatusservices.UpdateChecklistStatus(formData, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    this.$store.state.snackbar.message = 'User ' + this.forAllUpdate.type + ' has been uploaded.';
                    this.$store.state.snackbar.show = true;
                    this.$store.state.snackbar.colors = 'xgreen';
                    this.$store.state.snackbar.icon = "mdi-check-circle-outline";           
                    this.GetUserchecklist();
                }
                }).catch(error =>{
                this.errorDAW = error.response.data.message
                this.$store.state.snackbar.message = error.response.data.message;
                this.$store.state.snackbar.colors = 'xred';
                this.$store.state.snackbar.icon = "mdi-alert-outline";  
                this.$store.state.snackbar.show = true;
            });
        },
        GetUserchecklist(){ // get onboarding info
            let payload = {
                id: this.checklistid
            };
            userchecklistservices.GetUserchecklist(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                  this.checkliststatusdata = response.data.data.checklist_status_info
                }
            }).catch(error => console.log(error));
        },
        UpdateChecklistStatus(id,item) { // update checklist status
            let payload = {
                id: id
            };

            checkliststatusservices.UpdateChecklistStatus(payload, this.$store.getters.getAccessToken).then(response => {
                    if(response.data.success){
                        this.$store.state.snackbar.message = 'User ' + item + ' has been checked.';
                        this.$store.state.snackbar.show = true;
                        this.$store.state.snackbar.colors = 'xgreen';
                        this.$store.state.snackbar.icon = "mdi-check-circle-outline";  
                        this.GetUserchecklist();
                    }
                }).catch(error =>{
                this.errorDAW = error.response.data.message
                this.$store.state.snackbar.message = error.response.data.message;
                this.$store.state.snackbar.colors = 'xred';
                this.$store.state.snackbar.icon = "mdi-alert-outline";  
                this.$store.state.snackbar.show = true;
            });
        },
        OpenDialogApproveDisapprove(item, upload_status){ // dialog for approve disapprove
            this.forUpdateUploadStatus = {
                id: item.id,
                upload_status: upload_status == 'disapprove' ? 2 : 1,
                text : upload_status
            }
            this.approvedisapprove = true
        },
        ApproveDisapproveChecklistStatus(){ // approve disapprove checklist
            let val = this.$refs.form.validate();

            if(val){
                let payload = {
                id : this.forUpdateUploadStatus.id,
                upload_status : this.forUpdateUploadStatus.upload_status,
                remarks: this.approverremarks
                };
                checkliststatusservices.ApproveDisapproveChecklistStatus(payload, this.$store.getters.getAccessToken).then(response => {
                    if(response.data.success){
                        this.$store.state.snackbar.message = 'Upload has beed ' + this.forUpdateUploadStatus.text + 'd.';
                        this.$store.state.snackbar.show = true;
                        this.$store.state.snackbar.colors = 'xgreen';
                        this.$store.state.snackbar.icon = "mdi-check-circle-outline";      
                        this.approverremarks = ''     
                        this.GetUserchecklist();
                    }
                    }).catch(error =>{
                    this.errorDAW = error.response.data.message
                    this.$store.state.snackbar.message = error.response.data.message;
                    this.$store.state.snackbar.colors = 'xred';
                    this.$store.state.snackbar.icon = "mdi-alert-outline";  
                    this.$store.state.snackbar.show = true;
                });
                this.approvedisapprove = false
            }   
        }
      }
    }
</script>
  
<style scoped>
    input[type=checkbox] {
        accent-color: orange;
    }
</style>