<template>
    <v-card>
        <div class="pa-5" style="max-width: 100%;">
            <div class="d-flex justify-center">
                <h4>VICTORIA COURT</h4>
            </div>
            <div class="d-flex justify-center">
                <td>TALENT MANAGEMENT DEPARTMENT</td>
            </div>
            <div class="d-flex justify-center">
                <h4>CLEARANCE FORM</h4>
            </div>
            <br>
            <v-simple-table dense style=" border: 1px solid rgba(0,0,0,0.12); ">
                <tbody>
                    <tr>
                        <td><b>Employee Name : </b> {{ employee_name }}</td>
                        <td><b>Date Filed : </b>{{ date_filed }}</td>
                    </tr>
                    <tr>
                        <td><b>Position : </b> {{ position }}</td>
                        <td><b>Date Hired : </b>{{ date_hired }}</td>
                    </tr>
                    <tr>
                        <td><b>Locale / Department : </b> {{ locale }}</td>
                        <td><b>Last Day of Employment : </b>{{ last_day }}</td>
                    </tr>
                    <tr>
                        <td><b>Reason for Separation : </b> {{ reason }}</td>
                    </tr>
                </tbody>
            </v-simple-table>
            <br>
            <h4>Accountability Checklist</h4>
            <br>
            <v-data-table
            dense
            style=" border: 1px solid rgba(0,0,0,0.12); "
            :headers="headersSign"
            :items="accountabilitytypedata"
            hide-default-footer
            group-by="accountability_field_info.accountability_type_id"
            :footer-props="{
            'items-per-page-options':[500],
            'disable-items-per-page': false,
            }"
            >

                <template v-slot:group.header="{items}">
                    <th colspan="6">
                        {{ items[0]['accountability_field_info']['accountability_type_info']['name']}}
                    </th>
                </template>

                <template v-slot:item.signature="props">
                    <div class="d-flex justify-center">
                        <v-img :src="signature_path+props.item.signature" height="65px" width="150px"></v-img>
                    </div>
                </template>

                <template v-slot:item.is_clear>
                    <div class="d-flex justify-center">
                        <h3>✓</h3>
                    </div>
                </template>
                    
                <template v-slot:item.process_by="props">
                    {{ props.item.processby_info != null ? props.item.processby_info.personal_information.lastname + ' , ' + props.item.processby_info.personal_information.firstname : 'No Data' }}
                </template>

            </v-data-table>
            <br>
            <v-simple-table dense style=" border: 1px solid rgba(0,0,0,0.12); ">
                <tbody>
                    <tr>
                        <td colspan="2"><b>RELEASE OF LAST PAY THRU : </b> (please check the option) </td>
                    </tr>
                    <tr>
                        <td rowspan="4"><b>Thru Check </b></td>
                    </tr>
                    <tr>
                        <td><b>Thru Bank Account</b></td>
                    </tr>
                    <tr>
                        <td><b>Bank : </b> {{ bank }}</td>
                    </tr>
                    <tr>
                        <td><b>Acct # : </b> {{ account_number }}</td>
                    </tr>
                    <tr>
                        <td colspan="2"><i>Accounting Department  to ensure that Quit Claim has been properly filled out, notarized, and submitted original copy to the Accounting Department before releasing the last pay.</i></td>
                    </tr>
                </tbody>
            </v-simple-table>
        </div>
    </v-card>
</template>
  
<script>

import userservices from '../services/userservices';
import accountabilitychecklistservices from '../services/accountabilitychecklistservices';
import clearanceformservices from '../services/clearanceformservices';

export default {
    name: 'ClearanceForm',
    data: () => ({
        userdata : [],
        employee_name : '',
        position : '',
        locale : '',
        reason : '',
        date_filed : '',
        date_hired : '',
        last_day : '',
        listemployeedata: [],
        signature_path: '',
        clearance_form: {
            name: '',
            date_filed: '',
            last_day_employment : '',
            separation_reason : '',
            last_pay_type : '',
            bank: '',
            account_number : '',
            otherreason : '',
        },
        user_info: [],
        accountabilitytypedata : [],
        headersSign: [
            { text: 'Accountability',sortable: true, value: 'accountability_field_info.name'},
            { text: 'Cleared',sortable: false, value: 'is_clear', align:'center'},
            { text: 'Remarks',sortable: false, value: 'remarks', align:'center' },
            { text: 'Signature',sortable: false, value: 'signature', align:'center'}
        ],
        }),
        created(){
            this.$store.state.header = false;
            this.$store.state.footer = false;
            this.$store.state.snackbar.color = 'orange';
            this.FetchAllAccountabilityChecklist();
            this.GetUser();
            this.GetClearanceFormViaUserid();
            this.$store.state.isChat = 1
            localStorage.setItem('is_hris', 1)
            if(localStorage.getItem('forprintpreview') != 1){
                setTimeout(function(){
                    window.print();
                },1000);
            }
        },
        mounted(){
            this.$store.state.title = "Print Clearance Form";
        },
        updated(){
            if(localStorage.getItem('forprintpreview') != 1){
                this.$nextTick(function () {
                    window.onfocus=function(){ window.close();}
                })
            }else{
                localStorage.setItem('forprintpreview', 0)
                window.onblur=function(){ window.close();}
            }
        },
        methods: {
        GetUser(){ // get user information
            let payload = {
                id: localStorage.getItem('printclearanceformuserid')
            };
            userservices.GetUser(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    this.signature_path = response.data.signature_path;
                    this.userdata = response.data.data;
                    this.employee_name = this.userdata.personal_information.middlename == null ? this.userdata.personal_information.lastname + ', ' + this.userdata.personal_information.firstname : this.userdata.personal_information.lastname + ', ' + this.userdata.personal_information.firstname + ', ' + this.userdata.personal_information.middlename,
                    this.position = this.userdata.role_information.name
                    this.locale = this.userdata.division_information.name
                    this.date_hired = this.userdata.user_other_personal_information.date_hired
                }
            }).catch(error => console.log(error));
        },
        FetchAllAccountabilityChecklist(){ // fetch all accountability checklist
            let payload = {
                clearance_form_id: localStorage.getItem('printclearanceform')
            };
            accountabilitychecklistservices.FetchAllAccountabilityChecklist(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    this.accountabilitytypedata = response.data.data;
                }
            }).catch(error => console.log(error));
        },
        GetClearanceFormViaUserid(){ // get clearance form via user id
            let payload = {
                user_id: localStorage.getItem('printclearanceformuserid')
            };
            clearanceformservices.GetClearanceFormViaUserid(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    this.reason = response.data.data.separation_reason
                    this.date_filed = response.data.data.date_filed
                    this.last_day = response.data.data.last_day_employment
                    this.bank = response.data.data.bank
                    this.account_number = response.data.data.account_number
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