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

                                <!-- &nbsp;
                            
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
                                </template> -->
                                
                            </v-toolbar>
                        </template>
                        <!-- One liner filtering -->
                        <br>
                        <!-- Data table Incident Report -->
                        <v-data-table
                        :headers="showHeaders"
                        :items="incidentreportdata"
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
                                    <!-- <v-row> -->
                                        <div class="d-flex justify-center">   
                                            <v-btn
                                                elevation="2"
                                                class="mx-2"
                                                dark
                                                outlined
                                                small
                                                color="orange"
                                                @click="PrintPreviewIncidentReport(props.item)"
                                            >
                                                <v-icon
                                                    small
                                                >
                                                    mdi-eye-outline
                                                </v-icon>
                                                Preview IR
                                            </v-btn>
                                            <!-- <v-btn
                                                elevation="2"
                                                class="mx-2"
                                                dark
                                                outlined
                                                small
                                                color="orange"
                                                @click="PreviewPrintIncidentReport(props.item)"
                                            >
                                                <v-icon
                                                    small
                                                >
                                                    mdi-eye-outline
                                                </v-icon>
                                                Print IR
                                            </v-btn> -->
                                            <v-btn
                                                elevation="2"
                                                class="mx-2"
                                                dark
                                                outlined
                                                small
                                                color="orange"
                                                @click="PreviewPrintNTE(props.item)"
                                                v-if="props.item.nte_info != null"
                                            >
                                                <v-icon
                                                    small
                                                >
                                                    mdi-eye-outline
                                                </v-icon>
                                                Preview NTE 
                                            </v-btn>
                                            <template v-if="props.item.nte_info != null">
                                                <v-btn
                                                    elevation="2"
                                                    class="mx-2"
                                                    dark
                                                    outlined
                                                    small
                                                    color="orange"
                                                    @click="MakeNTE(props.item)"
                                                    v-if="props.item.nte_info.explanation == null"
                                                >
                                                    <v-icon
                                                        small
                                                    >
                                                        mdi-note-edit-outline
                                                    </v-icon>
                                                    Make Explanation 
                                                </v-btn>
                                            </template>
                                            <!-- <v-btn
                                                elevation="2"
                                                class="mx-2"
                                                dark
                                                outlined
                                                small
                                                color="orange"
                                                @click="NOH(props.item)"
                                                v-if="props.item.nte_info != null && props.item.noh_info == null"
                                            >
                                                <v-icon
                                                    small
                                                >
                                                    mdi-note-edit-outline
                                                </v-icon>
                                                Subject for NOH
                                            </v-btn> -->
                                            <v-btn
                                                elevation="2"
                                                class="mx-2"
                                                dark
                                                outlined
                                                small
                                                color="orange"
                                                @click="PreviewPrintNOH(props.item)"
                                                v-if="props.item.noh_info != null && props.item.nte_info != null"
                                            >
                                                <v-icon
                                                    small
                                                >
                                                    mdi-eye-outline
                                                </v-icon>
                                                Preview NOH 
                                            </v-btn>
                                            <!-- <v-btn
                                                elevation="2"
                                                class="mx-2"
                                                dark
                                                outlined
                                                small
                                                color="orange"
                                                @click="NOD(props.item)"
                                                v-if="props.item.nte_info != null && props.item.nod_info == null"
                                            >
                                                <v-icon
                                                    small
                                                >
                                                    mdi-note-edit-outline
                                                </v-icon>
                                                Subject for NOD
                                            </v-btn> -->
                                            <v-btn
                                                elevation="2"
                                                class="mx-2"
                                                dark
                                                outlined
                                                small
                                                color="orange"
                                                @click="PreviewPrintNOD(props.item)"
                                                v-if="props.item.nod_info != null && props.item.nte_info != null"
                                            >
                                                <v-icon
                                                    small
                                                >
                                                    mdi-eye-outline
                                                </v-icon>
                                                Preview NOD 
                                            </v-btn>
                                            <template v-if="props.item.nte_info != null">
                                                <template v-if="props.item.nod_info == null">
                                                    <v-btn
                                                    elevation="2"
                                                    class="mx-2"
                                                    dark
                                                    outlined
                                                    small
                                                    color="orange"
                                                    @click="AcknowledgeNod(props.item)"
                                                    v-if="props.item.nod_info != null"
                                                    >
                                                        <v-icon
                                                            small
                                                        >
                                                            mdi-note-edit-outline
                                                        </v-icon>
                                                        Acknowledge NOD
                                                    </v-btn>
                                                </template>
                                                <template v-else>
                                                    <v-btn
                                                    elevation="2"
                                                    class="mx-2"
                                                    dark
                                                    outlined
                                                    small
                                                    color="orange"
                                                    @click="AcknowledgeNod(props.item)"
                                                    v-if="props.item.nod_info.acknowledge_by == 0"
                                                    >
                                                        <v-icon
                                                            small
                                                        >
                                                            mdi-note-edit-outline
                                                        </v-icon>
                                                        Acknowledge NOD
                                                    </v-btn>
                                                </template>
                                            </template>
                                        </div>
                                    <!-- </v-row> -->
                                </template>  
                            </template>

                        </v-data-table>
                        <!-- Data table Incident Report -->
                        
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
                        <v-toolbar-title>Add IncidentReport</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-toolbar-items>
                        </v-toolbar-items>
                    </v-toolbar>
                    
                    <v-col sm="12" md="6" offset-md="3" class="mt-3 text-center"> 
                        <h4>Note: Here you can add another incident report.</h4>
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
                    <v-col sm="12" md="6" offset-md="3">
                        <v-file-input
                        outlined
                        v-model="attachment"
                        label="Attachment"
                        color="orange"
                        truncate-length="50"
                        @change="getfilename()"
                        ></v-file-input>
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
                    <v-toolbar-title>Edit Incident Report</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                    </v-toolbar-items>
                </v-toolbar>
                
                <v-col sm="12" md="6" offset-md="3" class="mt-3 text-center"> 
                    <h4>Note: Here you can edit incident report in employees.</h4>
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
                <v-col sm="12" md="6" offset-md="3">
                    <v-row>
                        <v-file-input
                        outlined
                        v-model="attachment"
                        label="Attachment"
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

                <center>
                    <v-col sm="12" md="6">
                        <v-btn
                        color="orange"
                        block
                        outlined
                        @click="valid == false ? validationfalse() : changeStatusDialogNTE(true)"
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
                            @click="SaveIncidentReport()"
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

        <!-- Dialog nte form -->
        <v-dialog
        v-model="ntefullscreendialog"
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
                    <v-btn icon dark @click="ntefullscreendialog = false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-toolbar-title>Add Explanation</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                    </v-toolbar-items>
                </v-toolbar>
                
                <v-col sm="12" md="6" offset-md="3" class="mt-3 text-center"> 
                    <h4>Note: Here you can add explanation.</h4>
                </v-col>

                <v-col sm="12" md="6" offset-md="3">
                    <v-menu
                    color="orange"
                        ref="menuntedate"
                        v-model="menuntedate"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        max-width="290px"
                        min-width="auto"
                    >      
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                            color="orange"
                                v-model="datente"
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
                            v-model="datente"
                            @input="menuntedate = false"
                        ></v-date-picker>
                    </v-menu>
                </v-col>

                <v-col sm="12" md="6" offset-md="3">
                    <tiptap-vuetify
                    v-model="content"
                    :extensions="extensions"
                    placeholder="Explanation letter body"
                    :rules="[v => !!v || 'Explanation letter is required']"
                    />
                </v-col>
                <br>

                <center>
                    <v-col sm="12" md="6">
                        <v-btn
                        color="orange"
                        block
                        outlined
                        @click="valid == false ? validationfalse() : changeStatusDialogNTE(true)"
                        >
                        Make a explanation
                    </v-btn>
                    </v-col>
                </center>
                </v-form>
            </v-card>
        </v-dialog>
        <!-- Dialog nte form -->

        <!-- Dialog nte confirmation -->
        <template>
            <v-row justify="center">
                <v-dialog
                v-model="ntesaveconfirmation"
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
                        @click="changeStatusDialogNTE(false)"
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
                        @click="confirmSaveExplanationNte()"
                        >
                            Confirm
                    </v-btn>
                    </center>
                    <br>
                </v-card>
                </v-dialog>
            </v-row>
        </template>
        <!-- Dialog nte confirmation -->
        

        <!-- Dialog noh form -->
        <v-dialog
        v-model="nohfullscreendialog"
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
                    <v-btn icon dark @click="nohfullscreendialog = false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-toolbar-title>Add Notice of Hearing</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                    </v-toolbar-items>
                </v-toolbar>
                
                <v-col sm="12" md="6" offset-md="3" class="mt-3 text-center"> 
                    <h4>Note: Here you can add noh for employee.</h4>
                </v-col>

                <v-col sm="12" md="6" offset-md="3">
                    <v-menu
                    color="orange"
                        ref="menunohdate"
                        v-model="menunohdate"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        max-width="290px"
                        min-width="auto"
                    >      
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                            color="orange"
                                v-model="datenoh"
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
                            v-model="datenoh"
                            @input="menunohdate = false"
                        ></v-date-picker>
                    </v-menu>
                </v-col>

                <v-col sm="12" md="6" offset-md="3">
                    <v-combobox
                        outlined
                        color="orange"
                        v-model="user_info"
                        label="Attendance for hearing"
                        :clearable="this.user_info != ''"
                        :items="listemployeedata"
                        :rules="[v => !!v || 'Attendance for hearing is required']"
                        multiple
                    ></v-combobox>
                </v-col>

                <v-col sm="12" md="6" offset-md="3">
                    <v-text-field
                        v-model="venue"
                        label="Venue"
                        required
                        color="orange"
                        outlined
                        :rules="[v => !!v || 'Venue is required']"
                    ></v-text-field>
                </v-col>

                <v-col sm="12" md="6" offset-md="3">
                    <v-file-input
                    outlined
                    v-model="picture_noh"
                    label="Picture"
                    color="orange"
                    truncate-length="50"
                    ></v-file-input>
                </v-col>

                <v-col sm="12" md="6" offset-md="3">
                    <v-file-input
                    outlined
                    v-model="video_noh"
                    label="Video"
                    color="orange"
                    truncate-length="50"
                    ></v-file-input>
                </v-col>

                <v-col sm="12" md="6" offset-md="3">
                    <v-file-input
                    outlined
                    v-model="video_recording_noh"
                    label="Video Recording"
                    color="orange"
                    truncate-length="50"
                    ></v-file-input>
                </v-col>

                <center>
                    <v-col sm="12" md="6">
                        <v-btn
                        color="orange"
                        block
                        outlined
                        @click="valid == false ? validationfalse() : changeStatusDialogNOH(true)"
                        >
                        Make a notice of hearing
                    </v-btn>
                    </v-col>
                </center>
                </v-form>
            </v-card>
        </v-dialog>
        <!-- Dialog noh form -->

        <!-- Dialog nte confirmation -->
        <template>
            <v-row justify="center">
                <v-dialog
                v-model="nohsaveconfirmation"
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
                        @click="changeStatusDialogNOH(false)"
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
                        @click="confirmSaveNoh()"
                        >
                            Confirm
                    </v-btn>
                    </center>
                    <br>
                </v-card>
                </v-dialog>
            </v-row>
        </template>
        <!-- Dialog nte confirmation -->

        <!-- Dialog nod form -->
        <v-dialog
        v-model="nodfullscreendialog"
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
                    <v-btn icon dark @click="nodfullscreendialog = false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-toolbar-title>Add Notice of Decision</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                    </v-toolbar-items>
                </v-toolbar>
                
                <v-col sm="12" md="6" offset-md="3" class="mt-3 text-center"> 
                    <h4>Note: Here you can add nod for employee.</h4>
                </v-col>

                <v-col sm="12" md="6" offset-md="3">
                    <v-menu
                    color="orange"
                        ref="menunoddate"
                        v-model="menunoddate"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        max-width="290px"
                        min-width="auto"
                    >      
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                            color="orange"
                                v-model="datenod"
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
                            v-model="datenod"
                            @input="menunoddate = false"
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
                </v-col>
                <br>

                <v-col sm="12" md="6" offset-md="3">
                    <v-combobox
                        outlined
                        color="orange"
                        v-model="decisionnod"
                        label="Decision"
                        :items="decisiondata"
                        :rules="[v => !!v || 'Decision is required']"
                    ></v-combobox>
                </v-col>

                <center>
                    <v-col sm="12" md="6">
                        <v-btn
                        color="orange"
                        block
                        outlined
                        @click="valid == false ? validationfalse() : changeStatusDialogNOD(true)"
                        >
                        Make a notice of decision
                    </v-btn>
                    </v-col>
                </center>
                </v-form>
            </v-card>
        </v-dialog>
        <!-- Dialog nod form -->

        <!-- Dialog nod confirmation -->
        <template>
            <v-row justify="center">
                <v-dialog
                v-model="nodsaveconfirmation"
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
                        @click="changeStatusDialogNOD(false)"
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
                        @click="confirmSaveNod()"
                        >
                            Confirm
                    </v-btn>
                    </center>
                    <br>
                </v-card>
                </v-dialog>
            </v-row>
        </template>
        <!-- Dialog nod confirmation -->

        <!-- Dialog nod acknowledge confirmation -->
        <template>
            <v-row justify="center">
                <v-dialog
                v-model="nodackconfirmation"
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
                        @click="nodackconfirmation = false"
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
                        @click="confirmAcknowledgeNod()"
                        >
                            Confirm
                    </v-btn>
                    </center>
                    <br>
                </v-card>
                </v-dialog>
            </v-row>
        </template>
        <!-- Dialog nod acknowledge confirmation -->

        <!-- <v-dialog
        v-model="stepperfullscreendialog"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
        >
            <v-card>
                <v-toolbar
                    dark
                    dense
                    color="orange"
                >
                    <v-btn icon dark @click="stepperfullscreendialog = false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-toolbar-title >Add Notice of Hearing</v-toolbar-title>
                </v-toolbar>
                <div>
                    <v-stepper non-linear>
                        <v-stepper-header>
                            <v-stepper-step
                            editable
                            color="orange"
                            step="1"
                            @click="Stepper(1)"
                            >
                            Incident Report
                            </v-stepper-step>

                            <v-divider></v-divider>

                            <v-stepper-step
                            editable
                            color="orange"
                            step="2"
                            @click="Stepper(2)"
                            >
                            Notice to Explain
                            </v-stepper-step>

                            <v-divider></v-divider>

                            <v-stepper-step
                            step="3"
                            color="orange"
                            editable
                            @click="Stepper(3)"
                            >
                            Notice of Hearing
                            </v-stepper-step>

                            <v-divider></v-divider>

                            <v-stepper-step
                            step="4"
                            color="orange"
                            editable
                            @click="Stepper(4)"
                            >
                            Notice of Decision
                            </v-stepper-step>
                        </v-stepper-header>


                        <v-stepper-items>
                            <v-stepper-content step="1">
                                <v-card>
                                    <div class="pa-5" style="max-width: 100%;">
                                        <center>
                                            <table>
                                                <tr>
                                                    <td class="text-right">
                                                        <v-img
                                                        max-width="120"
                                                        class="pa-7 rounded-circle d-inline-block align-self-stretch mt-1 ml-5"
                                                        style="margin: 0px auto;"
                                                        src="../../assets/images/victoria_court.png"
                                                        ></v-img>
                                                    </td>
                                                    <td>
                                                        <h3 class="text-center"><b> VICTORIA COURT </b></h3>
                                                        <div class="text-center">TALENT MANAGEMENT DEPARTMENT</div>
                                                        <h3 class="text-center"><b> INCIDENT REPORT </b></h3>
                                                    </td>
                                                </tr>
                                            </table>
                                        </center>
                                        <div class="pa-10">
                                            <div class="pa-10">
                                                <p class="mt-0 mb-0 pt-0 pb-0">{{ moment(String(itemir.date)).format('LL') }}</p>
                                                <br>
                                                <div v-html='itemir.content'></div>
                                            </div>
                                            <v-row align="center" justify="space-around">
                                                <v-btn
                                                    elevation="2"
                                                    class="mx-2"
                                                    dark
                                                    outlined
                                                    small
                                                    color="orange"
                                                    @click="PrintPreviewIncidentReport(itemir)"
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
                                                    @click="PreviewPrintIncidentReport(itemir)"
                                                >
                                                    <v-icon
                                                        small
                                                    >
                                                        mdi-printer
                                                    </v-icon>
                                                    Print
                                                </v-btn>
                                            </v-row>
                                        </div>
                                    </div>
                                </v-card>
                            </v-stepper-content>

                            <v-stepper-content step="2">
                                <v-card>
                                    <div class="pa-5" style="max-width: 100%;">
                                        <center>
                                        </center>
                                    </div>
                                </v-card>
                            </v-stepper-content>
                        </v-stepper-items>
                    </v-stepper>
                </div>
            </v-card>
        </v-dialog> -->

    </v-container>
</template>

<script>
import incidentreportservices from '../services/incidentreportservices';
import userservices from '../services/userservices';
import careservices from '../services/careservices';
import nteservices from '../services/nteservices';
import nohservices from '../services/nohservices';
import nodservices from '../services/nodservices';
import { TiptapVuetify, Heading, Bold, Italic, Strike, Underline, Code, Paragraph, BulletList, ListItem, Link, Blockquote, HardBreak, HorizontalRule, History } from 'tiptap-vuetify'

export default {
    name: 'IncidentReport',
    components: { TiptapVuetify },
    data: () => ({
        nodackconfirmation : false,
        nodsaveconfirmation : false,
        decisionnod : '',
        decisiondata : ['Not Guilty' , 'Found Guilty'],
        datenod : '',
        menunoddate : false,
        nodfullscreendialog : false,
        venue : '',
        nohsaveconfirmation : false,
        picture_noh : [],
        video_noh : [],
        video_recording_noh : [],
        nte_data : [],
        step : '',
        itemir : [],
        stepperfullscreendialog : false,
        datenoh : '',
        menunohdate : false,
        nohfullscreendialog : false,
        incident_report_path : '',
        file_name: '',
        search: '',
        page: 1,
        pageCount: 0,
        menucolumn: false,
        headers:[],
        selectedHeaders: [],
        sortBy: 'date',
        sortDesc: false,
        fullscreendialog : false,
        headersMap: [
            // { text: 'Last Name',sortable: true, value: 'user_info.personal_information.lastname',width: '140px' },
            // { text: 'First Name',sortable: true, value: 'user_info.personal_information.firstname' },
            { text: 'Date Issued',sortable: true, value: 'date' },
            { text: 'Created By',sortable: false, value: 'created_by' },
            { text: 'Action',sortable: false, value: 'action',align: 'center' }
        ],
        valid: false,
        incidentreportdata : [],
        signature_path : '',
        listemployeedata : [],
        menuldate : false,
        attachment : [],
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
        ntefullscreendialog : false,
        caredata : [],
        careinfo : [],
        menuntedate : false,
        datente : '',
        ntesaveconfirmation : '',
        date_filed : '',
    }),
    created(){
        this.$store.state.header = false;
        this.$store.state.footer = false;
        this.FetchAllIncidentReportViaUser();
        this.FetchAllUser();
        this.FetchAllCare();
        this.headers = Object.values(this.headersMap);
        this.selectedHeaders = this.headers;
    },
    mounted(){
        this.$store.state.title = "IncidentReport";
        var selDate = new Date()
        var today = new Date(selDate+2*24*60*60*1000);
        var date = today.getDate()
        var month = today.getMonth()
        var year = today.getFullYear()
        this.maxdate = year+"-"+this.strPad((month+1))+"-"+this.strPad((date)); 
        this.date_filed = this.$dayjs().format('YYYY-MM-DD');   
        console.log(this.date_filed)
    },
    computed: {
        showHeaders () {
            return this.headers.filter(s => this.selectedHeaders.includes(s));
        }
    },      
    methods: {
        FetchAllIncidentReportViaUser(){ // fetch all incident report
            let payload = {
                user_id: this.$store.getters.getUserID
            };
            incidentreportservices.FetchAllIncidentReportViaUser(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    this.incidentreportdata = response.data.data;
                    this.incident_report_path = response.data.incident_report_path
                    console.log(response.data)
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
        ClearIncidentReport(){
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
        UpdateAllIncidentReport(id, item){ // fetch info for update
            console.log(id, item);
            this.content = item.content
            this.date = item.date
            this.attachment = new File(["foo"], item.attachment)
            this.file_name = item.attachment
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
        SaveIncidentReport(){ // save incident report

            let val = this.$refs.form.validate();

            if(val){
                const formData = new FormData();
                formData.append('parent_user_id', this.$store.getters.getParentID)
                formData.append('user_id', this.user_info.value)
                formData.append('date', this.date)
                formData.append('content', this.content)
                formData.append('created_by', this.$store.getters.getUserID)
                formData.append('file', this.attachment);

                // let payload = {
                //     parent_user_id: this.$store.getters.getParentID,
                //     user_id: this.user_info.value,
                //     date : this.date,
                //     letter: this.content,
                //     created_by: this.$store.getters.getUserID,
                // };
                console.log(formData);
                incidentreportservices.SaveIncidentReport(formData, this.$store.getters.getAccessToken).then(response => {
                    if(response.data.success){
                        this.fullscreendialog = false;
                        this.$store.state.snackbar.message = 'Incident Report has been created.';
                        this.$store.state.snackbar.show = true;
                        this.FetchAllIncidentReportViaUser();
                        this.ClearIncidentReport();
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
            this.ClearIncidentReport();
            this.editfullscreendialog = false
        },
        changeStatusDialogEdit(status){
            this.editconfirmation = status;
        },
        confirmUpdate(){ // update incident report
            let val = this.$refs.form.validate();

            if(val){
                const formData = new FormData();
                formData.append('id', this.forAllUpdate.id)
                formData.append('parent_user_id', this.$store.getters.getParentID)
                formData.append('user_id', this.user_info.value)
                formData.append('date', this.date)
                formData.append('content', this.content)
                formData.append('created_by', this.$store.getters.getUserID)
                formData.append('file', this.attachment);
                formData.append('file_name', this.file_name);
                // let payload = {
                //     id: this.forAllUpdate['id'],
                //     letter: this.content,
                //     user_id : this.user_info.value,
                //     date : this.date,
                //     created_by: this.forAllUpdate['created_by'],
                //     parent_user_id: this.$store.getters.getParentID,
                // }
                incidentreportservices.UpdateIncidentReport(formData, this.$store.getters.getAccessToken).then(response => {
                    if(response.data.success){
                        this.$store.state.snackbar.message = 'Incident Report has been updated.';
                        this.$store.state.snackbar.show = true;
                        this.editfullscreendialog = false
                        this.editconfirmation = false
                        this.ClearIncidentReport()
                        this.$refs.form.resetValidation();
                        this.FetchAllIncidentReportViaUser();
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
        DeleteIncidentReport(id, name){
            this.fordeletename = name
            this.forDelete = {
                id: id
            }
            this.deleteconfirmation = true;
        },
        confirmDelete(){ // delete Incident Report
            let payload = {
                id: this.forDelete['id']
            }
            console.log(payload);
            incidentreportservices.DeleteIncidentReport(payload, this.$store.getters.getAccessToken).catch(error =>{
                this.errorDAW = error.response.data.message
                this.$store.state.snackbar.message = error.response.data.message;
                this.$store.state.snackbar.show = true;
            });

            this.$store.state.snackbar.message = 'Incident Report has been deleted.';
            this.$store.state.snackbar.show = true;
            this.deleteconfirmation = false;
            this.FetchAllIncidentReportViaUser();
            this.$store.state.snackbar.colors = 'xgreen';
            this.$store.state.snackbar.icon = "mdi-check-circle-ouGetIncidentReporttline";                                  
        },
        PreviewPrintIncidentReport(item){ // print preview incident report
            localStorage.setItem('is_hris', 0)
            localStorage.setItem('incidentreport', item.id)
            localStorage.setItem('forprintpreviewincidentreport', 1)
            window.open("/printincidentreport","_blank")
        },
        PrintPreviewIncidentReport(item){ // print preview of clearance form
            localStorage.setItem('is_hris', 0)
            localStorage.setItem('incidentreport', item.id)
            localStorage.setItem('forprintpreviewincidentreport', 1)
            window.open("/printincidentreport","_blank")
        },
        getfile(file) {
            window.open(this.incident_report_path + file, "_blank");
        },
        getfilename(){
            this.file_name = this.attachment;
        },
        MakeNTE(item){
            console.log(item)
            this.fornte = {
                id: item.nte_info.id,
                user_id: item.user_id
            }
            this.ntefullscreendialog = true;
        },
        FetchAllCare(){ // fetch all user for combobox
            let payload = {
                parent_id: this.$store.getters.getParentID
            };
            careservices.FetchAllCare(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    response.data.data.forEach((value) => {
                        this.caredata.push({
                            text: value.article_no + ' ' + value.description,
                            rule: value.rule,
                            severity_code: value.severity_code,
                            value: value.id
                        });
                    });

                    // console.log(this.caredata)
                }
            }).catch(error => console.log(error));
        },
        changeStatusDialogNTE(status){
            this.ntesaveconfirmation = status;
        },
        confirmSaveNte(){ // Save Notice to Explain
            let payload = {
                parent_user_id: this.$store.getters.getParentID,
                incident_report_id: this.fornte.id,
                careinfo: this.careinfo,
                date: this.datente,
                content: this.content,
                created_by: this.$store.getters.getUserID,
                user_id: this.fornte.user_id,
            };
            nteservices.SaveNte(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    this.ntesaveconfirmation = false;
                    this.ntefullscreendialog = false
                    this.$store.state.snackbar.message = 'NTE has been created.';
                    this.$store.state.snackbar.show = true;
                    this.FetchAllIncidentReportViaUser();
                    this.ClearNte();
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
            console.log(payload)
        },
        ClearNte(){
            this.careinfo = ''
            this.datente = ''
            this.content = ''
        },
        PreviewPrintNTE(item){ // Print Preview Notice to Explain
            console.log(item)
            localStorage.setItem('is_hris', 0)
            localStorage.setItem('nte', item.id)
            localStorage.setItem('forprintpreviewnte', 1)
            window.open("/printnte","_blank")
        },
        NOH(item){
            this.fornoh = {
                id: item.id,
                user_id: item.user_id
            }
            this.nohfullscreendialog = true;
        },
        changeStatusDialogNOH(status){
            this.nohsaveconfirmation = status;
        },
        confirmSaveNoh(){ // Save Notice Of Hearing
            const formData = new FormData();
            formData.append('parent_user_id', this.$store.getters.getParentID)
            formData.append('incident_report_id', this.fornoh.id)
            formData.append('date', this.datenoh)
            formData.append('attendance_info', JSON.stringify(this.user_info))
            formData.append('venue', this.venue)
            formData.append('picture_file', this.picture_noh)
            formData.append('video_file', this.video_noh);
            formData.append('video_recording_file', this.video_recording_noh);
            formData.append('created_by', this.$store.getters.getUserID)
            nohservices.SaveNoh(formData, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    this.nohsaveconfirmation = false;
                    this.nohfullscreendialog = false
                    this.$store.state.snackbar.message = 'NOH has been created.';
                    this.$store.state.snackbar.show = true;
                    this.FetchAllIncidentReportViaUser();
                    this.ClearNoh();
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
        },
        ClearNoh(){
            this.datenoh = ''
            this.user_info = []
            this.picture_noh = []
            this.video_noh = []
            this.video_recording_noh = []
        },
        ClearNod(){
            this.datenod = ''
            this.content = ''
            this.decisionnod = ''
        },
        PreviewPrintNOH(item){ // Print Preview Notice Of Hearing
            console.log(item)
            localStorage.setItem('is_hris', 0)
            localStorage.setItem('noh_id', item.noh_info.id)
            localStorage.setItem('noh', item.id)
            localStorage.setItem('forprintpreviewnoh', 1)
            window.open("/printnoh","_blank")
        },
        NOD(item){
            this.fornod = {
                id: item.id,
                user_id: item.user_id
            }
            this.nodfullscreendialog = true;
        },
        changeStatusDialogNOD(status){
            this.nodsaveconfirmation = status;
        },
        confirmSaveNod(){  // Save Notice Of Dismissal
            let payload = {
                parent_user_id: this.$store.getters.getParentID,
                incident_report_id: this.fornod.id,
                date: this.datenod,
                content: this.content,
                is_guilty: this.decisionnod,
                created_by: this.$store.getters.getUserID,
            };
            nodservices.SaveNod(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    this.nodsaveconfirmation = false;
                    this.nodfullscreendialog = false
                    this.$store.state.snackbar.message = 'NOD has been created.';
                    this.$store.state.snackbar.show = true;
                    this.FetchAllIncidentReportViaUser();
                    this.ClearNod();
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
        },
        PreviewPrintNOD(item){ // Print Preview Notice Of Dismissal
            console.log(item)
            localStorage.setItem('is_hris', 0)
            localStorage.setItem('nod', item.id)
            localStorage.setItem('nod_id', item.nod_info.id)
            localStorage.setItem('forprintpreviewnod', 1)
            window.open("/printnod","_blank")
        },
        confirmSaveExplanationNte(){ // Save Explanation to Notice to Explain
            let payload = {
                id : this.fornte.id,
                date_explanation: this.datente,
                explanation: this.content,
                acknowledge_by: this.$store.getters.getUserID,
                for_explanation: 1,
            };
            nteservices.UpdateNte(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    this.ntesaveconfirmation = false;
                    this.ntefullscreendialog = false
                    this.$store.state.snackbar.message = 'NTE Explanation has been created.';
                    this.$store.state.snackbar.show = true;
                    this.FetchAllIncidentReportViaUser();
                    this.ClearNte();
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
        },
        AcknowledgeNod(item){ // Acknowledge Notice of Dismissal Confirmation
            this.fornodack = {
                id: item.nod_info.id,
            }
            this.nodackconfirmation = true
        },
        confirmAcknowledgeNod(){ // Acknowledge Notice of Dismissal
            let payload = {
                id: this.fornodack.id,
                date_acknowledge: this.date_filed,
                acknowledge_by: this.$store.getters.getUserID,
            };
            console.log(payload)
            nodservices.AcknowledgeNod(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    this.nodackconfirmation = false;
                    this.nodfullscreendialog = false
                    this.$store.state.snackbar.message = 'NOD has been acknowledge.';
                    this.$store.state.snackbar.show = true;
                    this.FetchAllIncidentReportViaUser();
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
    },
}
</script>

<style>
/* #carecss .v-list-item__title, .v-list-item__subtitle {
    white-space: normal !important;
} */
/* .v-select__slot .v-select__selections .v-select__selection--comma{
    white-space: normal;
} */
.v-list-item__content .v-list-item__title{
    white-space: normal;
}
/* #carecss .v-list-item__title{
    white-space: normal;
} */
</style>