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
                                        <v-text-field v-model="search" append-icon="mdi-magnify" placeholder="Search"
                                            hide-details color="purple" overflow solo dense
                                            style="min-width: 60px;"></v-text-field>
                                    </v-col>
                                </v-row>
                                &nbsp;
                                <template v-if="$vuetify.breakpoint.mdAndUp">
                                    <div class="text-center">
                                        <v-menu v-model="menucolumn" :close-on-content-click="false" :nudge-width="60"
                                            :nudge-left="60" offset-y>
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-btn color="purple" dark v-bind="attrs" v-on="on">
                                                    <v-icon>mdi-view-column</v-icon>Column
                                                </v-btn>
                                            </template>

                                            <v-card style="padding-top:10px;min-width:50px;">
                                                <v-list>
                                                    <ul>
                                                        <div v-for="(item, index) in headers" :key="index">
                                                            <input type="checkbox" :id="item.text" :value="item"
                                                                v-model="selectedHeaders">
                                                            &nbsp;<label :for="item.text">{{ item.text }}</label>
                                                        </div>
                                                    </ul>
                                                </v-list>

                                            </v-card>
                                        </v-menu>
                                    </div>
                                </template>

                                <template v-if="$vuetify.breakpoint.smAndDown">
                                    <div class="text-center">
                                        <v-menu v-model="menucolumn" :close-on-content-click="false" :nudge-width="100"
                                            :nudge-left="100" offset-y>
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-btn color="purple" dark v-bind="attrs" v-on="on">
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
                                                            <input type="checkbox" :id="item.text" :value="item"
                                                                v-model="selectedHeaders">
                                                            &nbsp;<label :for="item.text">{{ item.text }}</label>
                                                        </div>
                                                    </ul>
                                                </v-list>
                                            </v-card>
                                        </v-menu>
                                    </div>
                                </template>

                                &nbsp;

                                <template v-if="$vuetify.breakpoint.mdAndUp">
                                    <v-btn medium dark color="purple" elevation="2" @click="NewClinicSchedule()">
                                        <v-icon>mdi-plus</v-icon>Create
                                    </v-btn>
                                </template>

                                <template v-if="$vuetify.breakpoint.smAndDown">
                                    <v-btn medium dark color="purple" elevation="2"
                                        style="padding-left: 12px;padding-right: 12px;" @click="NewClinicSchedule()">
                                        <v-icon>mdi-plus</v-icon>
                                    </v-btn>
                                </template>
                            </v-toolbar>
                        </template>
                        <!-- One liner filtering -->
                        <br>
                        <!-- Clinic Schedule data table -->
                        <v-data-table :headers="showHeaders" :items="clinicscheduledata" :search="search"
                                        align="center" :page.sync="page" must-sort :sort-by.sync="sortBy"
                                        :sort-desc.sync="sortDesc" @page-count="pageCount = $event" :footer-props="{
                                            'items-per-page-options': [10],
                                            'disable-items-per-page': true,
                                        }">
                            <template v-slot:item.notes="props">
                                <div @click="inlineblock()">
                                    <span :class="classito" style="max-width: 300px;">
                                        {{ props.item.notes }}
                                    </span>
                                </div>
                            </template>
                            <template v-slot:item.schedule_time="{ item }">
                                {{
                                    item.schedule_time
                                        ? formatAMPM(item.schedule_time)
                                        : 'No Data'
                                }}
                            </template>
                            <template v-slot:item.schedule_date="{ item }">
                                {{ formatDate(item.schedule_date) }}
                            </template>
                            <template v-slot:item.patient_id="{ item }">
                                {{
                                    item.patient_info
                                        ? (item.patient_info.lastname + ", " +
                                            item.patient_info.firstname + " " +
                                            (item.patient_info.middlename ? item.patient_info.middlename + " " : "") +
                                            (item.patient_info.suffix ? item.patient_info.suffix : ""))
                                        : 'No Data'
                                }}
                            </template>


                            <template v-slot:item.action="props">
                                <template v-if="$vuetify.breakpoint.xsOnly">
                                    <v-row>
                                        <v-btn elevation="2" class="mx-2" dark outlined small color="purple"
                                            @click="UpdateAllClinicSchedule(props.item.id, props.item)">
                                            <v-icon small @click="UpdateAllClinicSchedule(props.item.id, props.item)">
                                                mdi-file-edit-outline
                                            </v-icon>
                                            Edit
                                        </v-btn>
                                        <template v-if="$vuetify.breakpoint.xsOnly">
                                            <br>&nbsp;
                                        </template>
                                        <v-btn elevation="2" class="mx-2" dark outlined small color="red"
                                            @click="DeleteClinicSchedule(props.item.id, props.item.name)">
                                            <v-icon small @click="DeleteClinicSchedule(props.item.id, props.item.name)">
                                                mdi-delete
                                            </v-icon>
                                            Delete
                                        </v-btn>
                                    </v-row>
                                </template>
                                <template v-else>
                                    <div v-if="$vuetify.breakpoint.mdAndDown">
                                        &nbsp;
                                    </div>
                                    <v-btn elevation="2" class="mx-2" dark outlined small color="purple"
                                        @click="UpdateAllClinicSchedule(props.item.id, props.item)">
                                        <v-icon small @click="UpdateAllClinicSchedule(props.item.id, props.item)">
                                            mdi-file-edit-outline
                                        </v-icon>
                                        Edit
                                    </v-btn>
                                    <div v-if="$vuetify.breakpoint.mdAndDown">
                                        &nbsp;
                                    </div>
                                    <v-btn elevation="2" class="mx-2" dark outlined small color="red"
                                        @click="DeleteClinicSchedule(props.item.id, props.item.name)">
                                        <v-icon small @click="DeleteClinicSchedule(props.item.id, props.item.name)">
                                            mdi-delete
                                        </v-icon>
                                        Delete
                                    </v-btn>
                                    <div v-if="$vuetify.breakpoint.mdAndDown">
                                        &nbsp;
                                    </div>
                                </template>
                            </template>
                        </v-data-table>
                        <!-- Clinic Schedule data table -->
                        <v-pagination color="purple" v-model="page" :length="pageCount"></v-pagination>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>

        <!-- dialog add form -->
        <v-dialog v-model="fullscreendialog" fullscreen hide-overlay transition="dialog-bottom-transition">
            <v-card>
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-toolbar dark color="purple">
                        <v-btn icon dark @click="CloseDialogFullScreen()">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                        <v-toolbar-title>Add Clinic Schedule</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-toolbar-items>
                        </v-toolbar-items>
                    </v-toolbar>

                    <v-col sm="12" md="6" offset-md="3" class="mt-3 text-center">
                        <h4>Note: Here you can create clinic schedule</h4>
                    </v-col>

                    <v-col sm="12" md="6" offset-md="3">
                        <v-combobox outlined color="purple" v-model="clinic_schedule.patient_id"
                            :items="patientcombobox" label="Name *" :rules="[validateName]"></v-combobox>

                        <v-menu v-model="menuscheduledate" color="purple" :close-on-content-click="false"
                            :nudge-right="40" transition="scale-transition" min-width="auto">
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field color="purple" v-model="clinic_schedule.schedule_date"
                                    label="Schedule Date *" readonly outlined
                                    :rules="[v => !!v || 'Schedule date is required']" v-bind="attrs" v-on="on">
                                </v-text-field>
                            </template>
                            <v-date-picker v-model="clinic_schedule.schedule_date" color="purple"
                                @input="menuscheduledate = false" :min="mindate">
                            </v-date-picker>
                        </v-menu>

                        <v-text-field v-model="clinic_schedule.schedule_time" color="purple" type="time"
                            label="Schedule Time *" outlined :rules="[v => !!v || 'Schedule Time is required']">
                        </v-text-field>

                        <v-btn color="purple" block outlined
                            @click="valid == false ? validationfalse() : changeStatusDialogSave(true)">
                            Save
                        </v-btn>
                    </v-col>
                </v-form>
            </v-card>
        </v-dialog>
        <!-- dialog add form -->

        <!-- dialog edit form -->
        <v-dialog v-model="editfullscreendialog" fullscreen hide-overlay transition="dialog-bottom-transition">
            <v-card>
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-toolbar dark color="purple">
                        <v-btn icon dark @click="CloseDialogEditFullScreen()">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                        <v-toolbar-title>Edit Clinic Schedule</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-toolbar-items>
                        </v-toolbar-items>
                    </v-toolbar>

                    <v-col sm="12" md="6" offset-md="3" class="mt-3 text-center">
                        <h4>Note: Here you can edit clinic schedule</h4>
                    </v-col>
                    <v-col sm="12" md="6" offset-md="3">
                        <v-combobox outlined color="purple" v-model="clinic_schedule.patient_id"
                            :items="patientcombobox" label="Name *" :rules="[validateName]"></v-combobox>

                        <v-menu v-model="menuscheduledate" color="purple" :close-on-content-click="false"
                            :nudge-right="40" transition="scale-transition" min-width="auto">
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field color="purple" v-model="clinic_schedule.schedule_date"
                                    label="Schedule Date *" readonly outlined
                                    :rules="[v => !!v || 'Schedule date is required']" v-bind="attrs" v-on="on">
                                </v-text-field>
                            </template>
                            <v-date-picker v-model="clinic_schedule.schedule_date" color="purple"
                                @input="menuscheduledate = false" :min="mindate">
                            </v-date-picker>
                        </v-menu>

                        <v-text-field v-model="clinic_schedule.schedule_time" color="purple" type="time"
                            label="Schedule Time *" outlined :rules="[v => !!v || 'Schedule Time is required']">
                        </v-text-field>

                        <v-combobox outlined color="purple" v-model="clinic_schedule.status" :items="statuscombobox"
                            label="Status" :rules="[validateStatus]"></v-combobox>

                        <v-text-field outlined color="purple" v-model="clinic_schedule.notes" label="Note">
                        </v-text-field>

                        <v-btn color="purple" block outlined
                            @click="valid == false ? validationfalse() : changeStatusDialogEdit(true)">
                            Update
                        </v-btn>
                    </v-col>
                </v-form>
            </v-card>
        </v-dialog>
        <!-- dialog edit form -->

        <!-- dialog save confirmation -->
        <template>
            <v-row justify="center">
                <v-dialog v-model="saveconfirmation" persistent max-width="290">
                    <v-card>
                        <v-card-title class="text-h5">
                            Save
                        </v-card-title>
                        <v-card-text>Are you sure you want to save?</v-card-text>
                        <center>
                            <v-btn elevation="2" class="mx-2" dark outlined small color="red"
                                @click="changeStatusDialogSave(false)">
                                Cancel
                            </v-btn>
                            <v-btn elevation="2" class="mx-2" dark outlined small color="purple"
                                @click="SaveClinicSchedule()">
                                Confirm
                            </v-btn>
                        </center>
                        <br>

                    </v-card>
                </v-dialog>
            </v-row>
        </template>
        <!-- dialog save confirmation -->

        <!-- dialog delete confirmation -->
        <template>
            <v-row justify="center">
                <v-dialog v-model="deleteconfirmation" persistent max-width="290">
                    <v-card>
                        <v-card-title class="text-h5">
                            Delete
                        </v-card-title>
                        <v-card-text>Are you sure you want to delete {{ fordeletename }}?</v-card-text>
                        <center>
                            <v-btn elevation="2" class="mx-2" dark outlined small color="red"
                                @click="changeStatusDialogDelete(false)">
                                Cancel
                            </v-btn>
                            <v-btn elevation="2" class="mx-2" dark outlined small color="purple"
                                @click="confirmDelete()">
                                Confirm
                            </v-btn>
                        </center>
                        <br>
                    </v-card>
                </v-dialog>
            </v-row>
        </template>
        <!-- dialog delete confirmation -->

        <!-- dialog edit confirmation -->
        <v-row justify="center">
            <v-dialog v-model="editconfirmation" persistent max-width="290">
                <v-card>
                    <v-card-title class="text-h5">
                        Edit
                    </v-card-title>
                    <v-card-text>Are you sure you want to update?</v-card-text>
                    <center>
                        <v-btn elevation="2" class="mx-2" dark outlined small color="red"
                            @click="changeStatusDialogEdit(false)">
                            Cancel
                        </v-btn>
                        <v-btn elevation="2" class="mx-2" dark outlined small color="purple" @click="confirmUpdate()">
                            Confirm
                        </v-btn>
                    </center>
                    <br>
                </v-card>
            </v-dialog>
        </v-row>
        <!-- dialog edit confirmation -->
    </v-container>
</template>

<script>

import clinicscheduleservices from '../services/clinicscheduleservices';
import patientinformationservices from '../services/patientinformationservices';

export default {
    name: 'ClinicSchedule',
    data: () => ({
        sortBy: 'schedule_date',
        sortDesc: true,
        menucolumn: false,
        exportimport: [{ text: 'Upload', icon: 'mdi-upload-outline', linktrigger: 1 },
        { text: 'Download', icon: 'mdi-download-outline', linktrigger: 2 }],
        classito: 'd-inline-block text-truncate',
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
        clinic_schedule: {
            patient_id: [],
            schedule_date: '',
            schedule_time: '',
            status: '',
            notes: '',
        },
        headers: [],
        selectedHeaders: [],
        headersMap: [
            { text: 'Patient Name', sortable: true, value: 'patient_id' },
            { text: 'Date', sortable: true, value: 'schedule_date' },
            { text: 'Time', sortable: true, value: 'schedule_time' },
            { text: 'Status', sortable: false, value: 'status' },
            { text: 'Note', sortable: false, value: 'notes' },
            { text: 'Action', sortable: false, value: 'action' }
        ],
        clinicscheduledata: [],
        patientcombobox: [],
        statuscombobox: ['Pending', 'Cancelled', 'Completed'],
        menuscheduledate: false,
        mindate: new Date().toISOString().substr(0, 10) // today
    }),
    created() {
        this.$store.state.header = false;
        this.$store.state.footer = false;
        this.$store.state.snackbar.color = 'purple';
        this.FetchAllClinicSchedule();
        this.FetchAllPatientInformation();
        this.headers = Object.values(this.headersMap);
        this.selectedHeaders = this.headers;
    },
    mounted() {
        this.$store.state.title = "Clinic Schedule";
    },
    computed: {
        showHeaders() {
            return this.headers.filter(s => this.selectedHeaders.includes(s));
        }
    },
    methods: {
        FetchAllClinicSchedule() { // fetch all clinic schedule
            let payload = {
                parent_id: this.$store.getters.getParentID
            };
            clinicscheduleservices.FetchAllClinicSchedule(payload, this.$store.getters.getAccessToken).then(response => {
                if (response.data.success) {
                    this.clinicscheduledata = response.data.data;
                }
            }).catch(error => console.log(error));
        },
        FetchAllPatientInformation() {
            this.patientcombobox = [];
            let payload = {
                parent_id: this.$store.getters.getParentID
            };
            patientinformationservices.FetchAllPatientInformation(payload).then(response => {
                if (response.data.success) {
                    response.data.data.forEach((value) => {
                        this.patientcombobox.push({
                            text: value.lastname + ", " +
                                value.firstname + " " +
                                (value.middlename ? value.middlename + " " : "") +
                                (value.suffix ? value.suffix : ""),
                            value: value.id
                        });
                    });
                }
                console.log(this.patientcombobox)
            }).catch(error => console.log(error));
        },
        UpdateAllClinicSchedule(id, item) {
            console.log(id, item);
            this.clinic_schedule.patient_id = item.patient_info ? {
                text: item.patient_info.lastname + ", " +
                    item.patient_info.firstname + " " +
                    (item.patient_info.middlename ? item.patient_info.middlename + " " : "") +
                    (item.patient_info.suffix ? item.patient_info.suffix : ""),
                value: item.patient_info.id
            } : {
                text: 'No Data',
                value: null
            };
            this.clinic_schedule.schedule_date = item.schedule_date
            this.clinic_schedule.schedule_time = item.schedule_time
            this.clinic_schedule.status = item.status
            this.clinic_schedule.notes = item.notes
            this.forAllUpdate = {
                id: id,
            }
            this.editfullscreendialog = true
        },
        confirmUpdate() { // update clinic schedule
            let val = this.$refs.form.validate();

            if (val) {
                let payload = {
                    id: this.forAllUpdate['id'],
                    parent_id: this.$store.getters.getParentID,
                    patient_id: this.clinic_schedule.patient_id.value,
                    schedule_date: this.clinic_schedule.schedule_date,
                    schedule_time: this.clinic_schedule.schedule_time,
                    status: this.clinic_schedule.status,
                    notes: this.clinic_schedule.notes,
                }
                console.log(payload)
                clinicscheduleservices.UpdateClinicSchedule(payload, this.$store.getters.getAccessToken).then(response => {
                    if (response.data.success) {
                        this.$store.state.snackbar.message = 'Clinic Schedule has been updated.';
                        this.$store.state.snackbar.show = true;
                        this.editfullscreendialog = false
                        this.ClearClinicSchedule()
                        this.$refs.form.resetValidation();
                        this.$store.state.snackbar.colors = 'xgreen';
                        this.$store.state.snackbar.icon = "mdi-check-circle-outline";
                    } else {
                        this.$store.state.snackbar.colors = 'xred';
                        this.$store.state.snackbar.icon = "mdi-alert-outline";
                    }

                }).catch(error => {
                    this.$store.state.snackbar.colors = 'xred';
                    this.$store.state.snackbar.icon = "mdi-alert-outline";
                    this.errorDAW = error.response.data.message
                    this.$store.state.snackbar.message = error.response.data.message;
                    this.$store.state.snackbar.show = true;
                });
            }
            this.FetchAllClinicSchedule();
            this.editconfirmation = false
        },
        changeStatusDialogEdit(status) {
            this.editconfirmation = status;
            this.FetchAllClinicSchedule();
        },
        NewClinicSchedule() {
            this.fullscreendialog = true
            this.clinic_schedule.price = 0
            this.clinic_schedule.stock_quantity = 0
        },
        SaveClinicSchedule() { // save clinic schedule

            let val = this.$refs.form.validate();

            if (val) {
                let payload = {
                    parent_id: this.$store.getters.getParentID,
                    patient_id: this.clinic_schedule.patient_id.value,
                    schedule_date: this.clinic_schedule.schedule_date,
                    schedule_time: this.clinic_schedule.schedule_time,
                    status: 'Pending',
                };
                console.log(payload);
                clinicscheduleservices.SaveClinicSchedule(payload, this.$store.getters.getAccessToken).then(response => {
                    if (response.data.success) {
                        this.fullscreendialog = false;
                        this.$store.state.snackbar.message = 'Clinic Schedule has been created.';
                        this.$store.state.snackbar.show = true;
                        this.FetchAllClinicSchedule();
                        this.ClearClinicSchedule();
                        this.$refs.form.resetValidation();
                        this.$store.state.snackbar.colors = 'xgreen';
                        this.$store.state.snackbar.icon = "mdi-check-circle-outline";
                    } else {
                        this.$store.state.snackbar.colors = 'xred';
                        this.$store.state.snackbar.icon = "mdi-alert-outline";
                    }
                }).catch(error => {
                    console.log(error.response.data.errors)
                    this.$store.state.snackbar.message = error.response.data.message;
                    this.$store.state.snackbar.show = true;
                    this.$store.state.snackbar.colors = 'xred';
                    this.$store.state.snackbar.icon = "mdi-alert-outline";
                });
            }
            this.saveconfirmation = false;
        },
        CloseDialogFullScreen() {
            this.ClearClinicSchedule();
            this.fullscreendialog = false
        },
        CloseDialogEditFullScreen() {
            this.ClearClinicSchedule();
            this.editfullscreendialog = false
        },
        ClearClinicSchedule() {
            this.clinic_schedule.patient_id = ''
            this.clinic_schedule.schedule_date = ''
            this.clinic_schedule.schedule_time = ''
            this.clinic_schedule.status = ''
            this.clinic_schedule.notes = ''
        },
        DeleteClinicSchedule(id, name) {
            this.fordeletename = name
            this.forDelete = {
                id: id
            }
            this.deleteconfirmation = true;
        },
        confirmDelete() { // delete clinic schedule
            let payload = {
                id: this.forDelete['id']
            }
            console.log(payload);
            clinicscheduleservices.DeleteClinicSchedule(payload, this.$store.getters.getAccessToken).catch(error => {
                this.errorDAW = error.response.data.message
                this.$store.state.snackbar.message = error.response.data.message;
                this.$store.state.snackbar.show = true;
            });

            this.$store.state.snackbar.message = 'Clinic Schedule has been deleted.';
            this.$store.state.snackbar.show = true;
            this.deleteconfirmation = false;
            this.FetchAllClinicSchedule();
            this.$store.state.snackbar.colors = 'xgreen';
            this.$store.state.snackbar.icon = "mdi-check-circle-outline";
        },
        changeStatusDialogSave(status) {
            this.saveconfirmation = status;
        },
        changeStatusDialogDelete(status) {
            this.deleteconfirmation = status;
            this.FetchAllClinicSchedule();
        },
        validationfalse() {
            this.$refs.form.validate()
        },
        inlineblock() { // display text to inline block
            this.classito == 'd-inline-block text-truncate' ? this.classito = '' : this.classito = 'd-inline-block text-truncate';
        },
        priceRules(value) {
            if (isNaN(value)) return 'Price must be a number';
            if (parseFloat(value) < 0) return 'Price must be greater than equal to 0';
            return true;
        },
        validateName(value) {
            if (!value) return 'Name is required';

            if (typeof value === 'object' && value.value) return true;

            const exists = this.patientcombobox.find(item => item === value);
            if (!exists) return 'Please select a valid name from the list';

            return true;
        },
        validateStatus(value) {
            if (typeof value === 'object' && value.value) return true;

            const exists = this.statuscombobox.find(item => item === value);
            if (!exists) return 'Please select a valid status from the list';

            return true;
        },
        formatAMPM(time) {
            if (!time) return '';
            let [hour, minute] = time.split(':');
            hour = parseInt(hour);
            let suffix = hour >= 12 ? "PM" : "AM";
            hour = (hour % 12) || 12;
            return `${hour}:${minute} ${suffix}`;
        },
        formatDate(dateString) {
            const options = { month: 'short', day: 'numeric', year: 'numeric' };
            return new Date(dateString).toLocaleDateString('en-US', options);
        },
    }
}
</script>

<style scoped>
input[type=checkbox] {
    accent-color: purple;
}
</style>