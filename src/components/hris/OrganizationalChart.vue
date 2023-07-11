<template>
    <v-container style="max-width: 95%; position: relative;">
        <v-row>
            <v-col cols="12">
                <v-card tile color="orange">
                    <template>
                        <v-toolbar color="orange" height="35px">
                            <v-toolbar-title class="white--text flex text-center"> Organizational Chart</v-toolbar-title>
                            <v-btn
                                class = "orange--text"
                                elevation="2"
                                small
                                color="white"
                                @click="setupfullscreendialog = true"
                                > 
                                Setup
                            </v-btn>
                        </v-toolbar>
                    </template>
                </v-card>
                <v-card>
                    <v-card-text>
                        <div id="tree" ref="tree"></div>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>

        <!-- Dialog for setup form -->
        <v-dialog
        v-model="setupfullscreendialog"
        fullscreen
        persistent
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
                    <v-btn icon dark @click="closesetupfullscreendialog()">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-toolbar-title>Set up Organizational Chart</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                    </v-toolbar-items>
                </v-toolbar>
                    <div class="pa-5">
                        <v-row>
                            <v-col cols="5">
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
                            <v-col cols="5">
                                <v-combobox
                                    label="Division"
                                    color="orange"
                                    outlined
                                    dense
                                    :items="division_information"
                                    :clearable="this.divisioninfo != ''"
                                    v-model="divisioninfo"
                                    @change="FetchAllUserviaDivision()"
                                ></v-combobox>
                            </v-col>
                            <v-col cols="2">
                                <v-btn
                                    elevation="2"
                                    class="mx-2 mt-1"
                                    dark
                                    small
                                    outlined
                                    color="orange"
                                    @click="AssignSelected(selected)"
                                >
                                    <v-icon small>
                                        mdi-clipboard-account
                                    </v-icon>
                                    Assign
                                </v-btn>         
                            </v-col>
                        </v-row>
                        <v-card>
                            <v-data-table
                            id="showselectcheckbox"
                            v-model="selected"
                            show-select
                            :hide-default-footer="true"
                            :headers="headersOrg"
                            :items="listemployeedata"
                            :search="search"
                            :page.sync="page"
                            @page-count="pageCount = $event"
                            :footer-props="{
                            'items-per-page-options':[100],
                            'disable-items-per-page': true,
                            }"
                            :sort-by.sync="sortBy"
                            :sort-desc.sync="sortDesc"
                            >

                            <!-- @toggle-select-all="selectAllToggle"
                                <template v-slot:item.data-table-select="{ item, isSelected, select }">
                                    <v-simple-checkbox
                                        :ripple="false"
                                        :value="isSelected"
                                        :readonly="item.division_information.division_head_id == item.id"
                                        :disabled="item.division_information.division_head_id == item.id"
                                        @input="select($event)"
                                    ></v-simple-checkbox>
                                </template> -->

                                <template v-slot:item.action="props">
                                    <v-btn
                                        elevation="2"
                                        class="mx-2"
                                        dark
                                        small
                                        outlined
                                        color="orange"
                                        @click="UpdateHead(props.item)"
                                        v-if="props.item.division_information.division_head_id != props.item.id"
                                    >
                                        <v-icon small>
                                            mdi-head
                                        </v-icon>
                                        Assign Head
                                    </v-btn>                                        
                                </template>
                            </v-data-table>
                            <v-pagination
                            color="orange"
                            v-model="page"
                            :length="pageCount"
                            ></v-pagination>
                        </v-card>
                    </div>
                </v-form>
            </v-card>
        </v-dialog>
        <!-- Dialog for setup form -->

        <!-- Dialog assign head confirmation -->
        <template>
            <v-row justify="center">
                <v-dialog
                v-model="updateheadconfirmation"
                persistent
                max-width="290"
                >
                    <v-card>
                        <v-card-title class="text-h5">
                        Assign
                        </v-card-title>
                        <v-card-text>Are you sure you want to assign as head?</v-card-text>
                        <center>
                        <v-btn
                            elevation="2"
                            class="mx-2"
                            dark
                            outlined
                            small
                            color="red"
                            @click="updateheadconfirmation = false"
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
                            @click="AssignHead()"
                            >
                                Confirm
                        </v-btn>
                        </center>
                        <br>
                    </v-card>
                </v-dialog>
            </v-row>
        </template>
        <!-- Dialog assign head confirmation -->

        <!-- Dialog Assign Employee form -->  
        <template>
            <v-row justify="center">
                <v-dialog
                    v-model="assignemployeedialog"
                    max-width="450px"
                    >
                    <v-card>
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <v-card tile color="orange">
                                    <template>
                                        <v-toolbar color="orange" height="50px">
                                            <v-toolbar-title class="white--text flex text-left">Assign</v-toolbar-title>
                                            <div class="text-right">
                                                <v-icon
                                                    medium
                                                    color="white"
                                                    class="white--text"
                                                    block
                                                    @click="assignemployeedialog = false, user_info = ''"
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
                                                    outlined
                                                    color="orange"
                                                    v-model="user_info"
                                                    label="Name"
                                                    :clearable="this.user_info != ''"
                                                    :items="assigneeemployeedata"
                                                    :rules="[v => !!v || 'Name is required']"
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
                                            @click="valid == false ? validationfalse() : assignconfirmation = true"
                                            >
                                                Assign
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
        <!-- Dialog Assign Employee form -->

        <!-- Dialog assign confirmation -->
        <template>
            <v-row justify="center">
                <v-dialog
                v-model="assignconfirmation"
                persistent
                max-width="290"
                >
                    <v-card>
                        <v-card-title class="text-h5">
                        Assign
                        </v-card-title>
                        <v-card-text>Are you sure you want to assign?</v-card-text>
                        <center>
                        <v-btn
                            elevation="2"
                            class="mx-2"
                            dark
                            outlined
                            small
                            color="red"
                            @click="assignconfirmation = false"
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
                            @click="Assign()"
                            >
                                Confirm
                        </v-btn>
                        </center>
                        <br>
                    </v-card>
                </v-dialog>
            </v-row>
        </template>
        <!-- Dialog assign confirmation -->

    </v-container>
</template>

<script>
    import OrgChart from '@balkangraph/orgchart.js'
    import userservices from '../services/userservices';
    import divisionservices from '../services/divisionservices';

    export default {
        name: 'OrganizationalChart',
        data: () => ({
            setupfullscreendialog : false,
            valid : false,
            headersOrg: [
                { text: 'First Name', value: 'personal_information.firstname',sortable: true,width: '130px'},
                { text: 'Middle Name', value: 'personal_information.middlename',sortable: true,width: '130px'},
                { text: 'Last Name', value: 'personal_information.lastname',sortable: true,width: '130px'},
                { text: 'Division', value: 'division_information.name',sortable: false},  
                { text: 'Role', value: 'role_information.name',sortable: false},
                { text: 'Action', value: 'action',sortable: false}
            ],
            listemployeedata : [],
            division_information: [],
            divisioninfo : null,
            search: '',
            page: 1,
            pageCount: 0,
            selected: [],
            disabledCount: 0,
            updateheadconfirmation : false,
            assignemployeedialog : false,
            user_info : [],
            forUpdateAssigningEmployee : [],
            assigneeemployeedata : [],
            assignconfirmation : false,
            sortBy: 'personal_information.lastname',
            sortDesc: false,
            organizationalchartnodes : [],
            image_path : '',
            default_image : '',
        }),
        created(){
            this.$store.state.header = false;
            this.$store.state.footer = false;
            this.FetchAllUser();
            this.fetchDivisionInformation();
            this.FetchOrganizationalChartParent();
        },
        mounted(){
            // this.$store.state.title = "Organizational Chart";
            setTimeout(() => {
                this.mytree(this.$refs.tree)

                OrgChart.templates.orgchartvc = Object.assign({}, OrgChart.templates.ana);
                OrgChart.templates.orgchartvc.node = 
                    '<rect x="0" y="0" height="120" width="250" fill="#FFA500" stroke-width="1" stroke="#000000"></rect>'
                    + '<rect x="-5" y="70" height="30" width="260" fill="#ffffff" stroke-width="1" stroke="#000000">'
                    + '</rect><line x1="-5" x2="0" y1="100" y2="105" stroke-width="1" stroke="#000000" />'
                    + '<line x1="255" x2="250" y1="100" y2="105" stroke-width="1" stroke="#000000" />';
                OrgChart.templates.orgchartvc.img_0 = 
                    '<image preserveAspectRatio="xMidYMid slice" xlink:href="{val}" x="20" y="5" width="64" height="64"></image>';
                OrgChart.templates.orgchartvc.field_0 = 
                    '<text data-width="240" style="font-size: 18px;" fill="#FFA500" x="125" y="92" text-anchor="middle">{val}</text>';
                OrgChart.templates.orgchartvc.nodeMenuButton = 
                    '<g style="cursor:pointer;" transform="matrix(1,0,0,1,225,110)" data-ctrl-n-menu-id="{id}">'
                        + '<rect x="-4" y="-10" fill="#000000" fill-opacity="0" width="22" height="22"></rect><circle cx="0" cy="0" r="2" fill="#ffffff">'
                        + '</circle><circle cx="7" cy="0" r="2" fill="#ffffff"></circle><circle cx="14" cy="0" r="2" fill="#ffffff"></circle>'
                    + '</g>';
            },500);
        },
        methods: {
            mytree: function() {    
                this.chart = new OrgChart(document.getElementById("tree"), {
                template: "orgchartvc",
                enableSearch: false,
                mouseScrool: OrgChart.action.scroll,
                nodeBinding: {
                    field_0: "name",
                    field_1: "title",
                    img_0: "img"
                },
                editForm: {
                    buttons:  {
                        edit : null,
                        pdf : null,
                        share : null
                    }
                },    
                nodes: this.organizationalchartnodes
                });
            },
            FetchAllUser(){ // fetch all user
                let payload = {
                    parent_id: this.$store.getters.getParentID
                };
                userservices.FetchAllUser(payload, this.$store.getters.getAccessToken).then(response => {
                    if(response.data.success){
                        this.selected = []
                        this.listemployeedata = response.data.data;
                        console.log(this.listemployeedata)
                        this.disabledCount = 0
                        const self = this;
                        this.listemployeedata.map(item => {
                        if (item.division_information.division_head_id == item.id) self.disabledCount += 1
                        })
                    }
                }).catch(error => console.log(error));
            },
            fetchDivisionInformation(){ // fetch division
                let payload = {
                    user_id: this.$store.getters.getParentID
                };
                divisionservices.fetchDivisionInformation(payload, this.$store.getters.getAccessToken).then(response => {
                    if(response.data.success){
                        response.data.result.forEach((value) => {
                            this.division_information.push({
                                text: value.name,
                                value: value.id
                            });
                        });
                    }
                    else{
                        console.log(response.data.message);
                    }
                }).catch(error => console.log(error));
            },
            FetchAllUserviaDivision(){
                console.log(this.divisioninfo)
                if(this.divisioninfo != null){
                    let payload = {
                        division_id: this.divisioninfo.value
                    };
                    userservices.FetchAllUserviaDivision(payload, this.$store.getters.getAccessToken).then(response => {
                        if(response.data.success){
                            this.selected = []
                            this.listemployeedata = response.data.data;
                            // console.log(this.listemployeedata)
                            this.disabledCount = 0
                            const self = this;
                            this.listemployeedata.map(item => {
                            if (item.division_information.division_head_id == item.id) self.disabledCount += 1
                            })
                        }
                    }).catch(error => console.log(error));
                }else{
                    this.FetchAllUser();
                }
            },
            selectAllToggle(props) {
                if(this.selected.length != this.listemployeedata.length - this.disabledCount) {
                    this.selected = [];
                    const self = this;
                    props.items.forEach(item => {
                    if(item.division_information.division_head_id != item.id) {
                        self.selected.push(item);
                    } 
                    });
                } else {
                    this.selected = []
                }
            },
            UpdateHead(item){
                this.forUpdate = {
                    id: item.id,
                    division_id : item.division_information.id
                }
                this.updateheadconfirmation = true
            },
            AssignHead(){
                let payload = {
                    id : this.forUpdate.id,
                    division_id : this.forUpdate.division_id,
                    superior: this.$store.getters.getParentID
                };
                divisionservices.AssignHead(payload, this.$store.getters.getAccessToken).then(response => {
                    if(response.data.success){
                        this.$store.state.snackbar.message = 'New Division head has been assigned.';
                        this.$store.state.snackbar.show = true;
                        this.FetchAllUserviaDivision();
                        this.$store.state.snackbar.colors = 'xgreen';
                        this.$store.state.snackbar.icon = "mdi-check-circle-outline";              
                        this.updateheadconfirmation = false
                        this.FetchOrganizationalChartParent();
                    }
                    else{
                        console.log(response.data.message);
                    }
                }).catch(error => console.log(error));
            },
            AssignSelected(assigning_employee){
                if(this.selected.length){
                    this.assignemployeedialog = true
                    this.forUpdateAssigningEmployee = assigning_employee
                    this.FetchAssignee()
                }else{
                    this.$store.state.snackbar.colors = 'xyellow';
                    this.$store.state.snackbar.icon = "mdi-information-outline"; 
                    this.$store.state.snackbar.message = 'Please select at least one';
                    this.$store.state.snackbar.show = true;
                }
            },
            FetchAssignee(){ // fetch all user for combobox
                let payload = {
                    parent_id: this.$store.getters.getParentID
                };
                userservices.FetchAllUser(payload, this.$store.getters.getAccessToken).then(response => {
                    if(response.data.success){
                        this.signature_path = response.data.signature_path;
                        response.data.data.forEach((value) => {
                            value.personal_information.middlename == null ? value.personal_information.middlename = '' : value.personal_information.middlename
                            value.user_other_personal_information.employee_id == null ? value.user_other_personal_information.employee_id = '' : value.user_other_personal_information.employee_id
                            this.assigneeemployeedata.push({
                                text: value.personal_information.middlename == '' ? value.personal_information.lastname + ', ' + value.personal_information.firstname : value.personal_information.lastname + ', ' + value.personal_information.firstname + ', ' + value.personal_information.middlename,
                                firstname: value.personal_information.firstname,
                                lastname: value.personal_information.lastname,
                                middlename: value.personal_information.middlename == null ? '' : value.personal_information.middlename,
                                employee_id: value.user_other_personal_information.employee_id == null ? '' : value.user_other_personal_information.employee_id,
                                value: value.id
                            });
                        });
                        this.FetchAssigneeParent()
                    }
                }).catch(error => console.log(error));
            },
            FetchAssigneeParent(){ // fetch user information via id
                let payload = {
                    id: this.$store.getters.getParentID,
                    user_id: this.$store.getters.getParentID,
                };
                userservices.GetUser(payload, this.$store.getters.getAccessToken).then(response => {
                    if(response.data.success){
                        response.data.data.personal_information.middlename == null ? response.data.data.personal_information.middlename = '' : response.data.data.personal_information.middlename
                        response.data.data.user_other_personal_information.employee_id == null ? response.data.data.user_other_personal_information.employee_id = '' : response.data.data.user_other_personal_information.employee_id
                        this.assigneeemployeedata.push({
                            text: response.data.data.personal_information.middlename == '' ? response.data.data.personal_information.lastname + ', ' + response.data.data.personal_information.firstname + ' (' + response.data.data.role_information.name + ')' : response.data.data.personal_information.lastname + ', ' + response.data.data.personal_information.firstname + ', ' + response.data.data.personal_information.middlename + ' (' + response.data.data.role_information.name + ')',
                            firstname: response.data.data.personal_information.firstname,
                            lastname: response.data.data.personal_information.lastname,
                            middlename: response.data.data.personal_information.middlename == null ? '' : response.data.data.personal_information.middlename,
                            employee_id: response.data.data.user_other_personal_information.employee_id == null ? '' : response.data.data.user_other_personal_information.employee_id,
                            value: response.data.data.id
                        });
                    }
                }).catch(error => console.log(error));
            },
            validationfalse(){
                this.$refs.form.validate()
            },
            Assign(){
                console.log(this.user_info)
                let payload = {
                    superior : this.user_info.value,
                    assigning_employee : this.forUpdateAssigningEmployee
                };
                divisionservices.Assign(payload, this.$store.getters.getAccessToken).then(response => {
                    if(response.data.success){
                        this.$store.state.snackbar.message = 'Successfully Assigned.';
                        this.$store.state.snackbar.show = true;
                        this.assignemployeedialog = false
                        this.assignconfirmation = false
                        this.FetchAllUserviaDivision();
                        this.$store.state.snackbar.colors = 'xgreen';
                        this.$store.state.snackbar.icon = "mdi-check-circle-outline";              
                        this.updateheadconfirmation = false
                    }
                    else{
                        console.log(response.data.message);
                    }
                }).catch(error => console.log(error));
            },
            FetchOrganizationalChartParent(){ // fetch parent
                let payload = {
                    id: this.$store.getters.getParentID,
                    user_id: this.$store.getters.getParentID,
                };
                userservices.GetUser(payload, this.$store.getters.getAccessToken).then(response => {
                    if(response.data.success){
                        this.image_path = response.data.image_path
                        this.default_image = response.data.defaultimage_path
                        // console.log(response.data);
                        this.organizationalchartnodes.push({
                            id : response.data.data.id,
                            name : response.data.data.personal_information.lastname + ' ' + response.data.data.personal_information.firstname,
                            title : response.data.data.role_information.name,
                            img : response.data.data.user_other_personal_information.profile_picture != null ? this.image_path + response.data.data.user_other_personal_information.profile_picture : this.default_image + 'default_image.png',
                            gender : response.data.data.user_other_personal_information.gender,
                            'birth day' : response.data.data.personal_information.birth_date,
                            "mobile number" : response.data.data.personal_information.mobile_number,
                            email : response.data.data.email,
                            division : response.data.data.division_information.name,
                            branch : response.data.data.branch_information.branch_name,
                        });
                        this.FetchOrganizationalChart();
                    }
                }).catch(error => console.log(error));
            },
            FetchOrganizationalChart(){ // fetch all user
                let payload = {
                    parent_id: this.$store.getters.getParentID
                };
                userservices.FetchAllUser(payload, this.$store.getters.getAccessToken).then(response => {
                    if(response.data.success){
                        // console.log(response.data)
                        response.data.data.forEach((value) => {
                            this.organizationalchartnodes.push({
                                id : value.id,
                                pid : value.superior_id,
                                name : value.personal_information.lastname + ' ' + value.personal_information.firstname,
                                title : value.role_information.name,
                                img : value.user_other_personal_information.profile_picture != null ? this.image_path + value.user_other_personal_information.profile_picture : this.default_image + 'default_image.png',
                                gender : value.user_other_personal_information.gender,
                                'birth day' : value.personal_information.birth_date,
                                "mobile number" : value.personal_information.mobile_number,
                                email : value.email,
                                division : value.division_information.name,
                                branch : value.branch_information.branch_name,
                            });
                        });
                        // console.log(this.organizationalchartnodes)
                    }
                }).catch(error => console.log(error));
            },
            closesetupfullscreendialog(){
                window.location.reload();
            }
        }
    }
</script>

<style>
#tree{
  width:100%;
  height:100%;
}

#tree .boc-edit-form-header{
    background-color: #FFA500 !important;
}

#tree [data-ctrl-ec-id] line {
    stroke: #FFA500;
}

#tree [data-ctrl-ec-id] circle {
    stroke: #000000;
}

#tree [data-l-id] path {
    stroke: #000000;
}
#showselectcheckbox .theme--light.v-icon {
    color: orange !important;
}
</style>
