<template>
    <v-card>
        <div class="pa-5" style="max-width: 100%;">
            <center>
                <table style="width:100%">
                    <tr>
                        <th rowspan="2">
                            <v-img
                            max-width="100"
                            class="rounded-circle d-inline-block align-self-stretch"
                            style="margin: 0px auto;"
                            src="../../assets/images/victoria_court.png"
                            ></v-img>
                        </th>
                        <td rowspan="2">
                            <h3 class="text-center"><b> VICTORIA COURT </b></h3>
                            <h4 class="text-center"><b> ( Code of Attitude, Responsibility and Ethics ) </b></h4>
                        </td>
                        <td>
                            <h4 class="text-center"><b> Document No. VC-AK-F-04-TMD-{{ this.noh_data.id }} </b></h4>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <h4 class="text-center"><b> {{ moment(String(this.noh_data.date)).format('LL') }} </b></h4>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="3">
                            <h3 class="text-center"><b> NOTICE OF HEARING </b></h3>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="3">
                            <h4 class="text-left ml-3"><b> To : {{ this.nte_data.incident_report_info.user_info.personal_information.firstname + ' ' + this.nte_data.incident_report_info.user_info.personal_information.lastname}}</b></h4>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="3">
                            <h4 class="text-left ml-3"><b> From : {{ this.nte_data.created_info.personal_information.firstname + ' ' +  this.nte_data.created_info.personal_information.lastname }}</b></h4>
                        </td>
                    </tr>
                    <tr v-for="(item, index) in nte_data.offense_info" :key="index">
                        <td v-if="index == 0" :rowspan="nte_data.offense_info.length">
                            <h4 class="text-left ml-3"><b> Subject : </b></h4>
                        </td>
                        <td colspan="2" class="col-md-11 pt-1 pb-1 mb-0 mt-0">{{item.care_info.description}}</td>
                    </tr>
                </table>
            </center>
            <div class="pa-2">
                <div class="pa-2">
                    <p class="mt-0 mb-0 pt-0 pb-0">This   in   connection   of   your    alleged    violation   of   the   Company   Code   of   Discipline   on as detailed below: </p>
                    <br>
                    <p class="pl-10 pb-0 pt-0 mt-0 mb-2" v-for="(item, index) in nte_data.offense_info" :key="index">
                        <b>Article - {{item.care_info.article_no + ' ' +item.care_info.description}}</b>
                        <!-- <span v-if="item.care_info.severity_code == 'A'">
                            <br>
                            <span class="pl-10">Light Offense</span>
                            <br>
                            <span v-if="item.offense_counter == 1" class="pl-15"><b>1st Offense : Written Warning</b></span>
                            <span v-else-if="item.offense_counter == 2" class="pl-15"><b>2nd Offense : Suspension (1 Day)</b></span>
                            <span v-else-if="item.offense_counter == 3" class="pl-15"><b>3rd Offense : Suspension (3 Days)</b></span>
                            <span v-else-if="item.offense_counter == 4" class="pl-15"><b>4th Offense : Suspension (5 Days)</b></span>
                            <span v-else class="pl-15"><b>5th Offense : Dismissal</b></span>
                        </span>
                        <span v-else-if="item.care_info.severity_code == 'B'">
                            <br>
                            <span class="pl-10">Serious Offense</span>
                            <br>
                            <span v-if="item.offense_counter == 1" class="pl-15"><b>1st Offense : Suspension (1 Day)</b></span>
                            <span v-else-if="item.offense_counter == 2" class="pl-15"><b>2nd Offense : Suspension (3 Days)</b></span>
                            <span v-else-if="item.offense_counter == 3" class="pl-15"><b>3rd Offense : Suspension (5 Days)</b></span>
                            <span v-else class="pl-15"><b>4th Offense : Dismissal</b></span>
                        </span>
                        <span v-else-if="item.care_info.severity_code == 'C'">
                            <br>
                            <span class="pl-10">Grave Offense</span>
                            <br>
                            <span v-if="item.offense_counter == 1" class="pl-15"><b>1st Offense : Suspension (3 Days)</b></span>
                            <span v-else-if="item.offense_counter == 2" class="pl-15"><b>2nd Offense : Suspension (5 Days)</b></span>
                            <span v-else class="pl-15"><b>3rd Offense : Dismissal</b></span>
                        </span>
                        <span v-else-if="item.care_info.severity_code == 'D'">
                            <br>
                            <span class="pl-10">Very Grave Offense</span>
                            <br>
                            <span v-if="item.offense_counter == 1" class="pl-15"><b>1st Offense : Suspension (5 Days)</b></span>
                            <span v-else class="pl-15"><b>1st Offense : Dismissal</b></span>
                        </span>
                        <span v-else-if="item.care_info.severity_code == 'E'">
                            <br>
                            <span class="pl-10">Ruinous Offense</span>
                            <br>
                            <span class="pl-15"><b>1st Offense : Dismissal</b></span>
                        </span>
                        <span v-else>
                            <br>
                            <span class="pl-10">Special Offense</span>
                            <br>
                            <span v-if="item.offense_counter == 1" class="pl-15"><b>1st Offense : Written Warning</b></span>
                            <span v-else-if="item.offense_counter == 2" class="pl-15"><b>2nd Offense : Suspension (3 Days)</b></span>
                            <span v-else class="pl-15"><b>4th Offense : Dismissal</b></span>
                        </span> -->
                    </p>
                    <br>
                    <p class="mt-0 mb-0 pt-0 pb-0">In such case, you are hereby invited to attend hearing set on <b>{{ moment(String(this.noh_data.date)).format('LL') }}</b>, <b>{{ moment(this.noh_data.date).format('dddd') }}</b>, <b>{{ this.noh_data.venue }}</b> at Venue with regard to the Company Violation stated above.</p>
                    <br>
                    <p class="mt-0 mb-0 pt-0 pb-0">This is to reiterate your side to be heard. You may bring any document, witnesses and/ or representative to assist you, if you desire. Failure on your part to appear will be construed as a waiver of your right to due process and will compel the company to decide based on the documents and testimonies on hand.</p>
                    <br>
                    <table style="width:100%">
                        <tr>
                            <th colspan="2"><h3>Attendance</h3></th>
                        </tr>
                        <tr>
                            <th>Name</th>
                            <th>Signature</th>
                        </tr>
                        <tr v-for="(item, index) in noh_data.attendance" :key="index">
                            <td class="pl-5">{{item.personal_information.firstname + ' ' + item.personal_information.lastname}}</td>
                            <td style="height: 50px; width: 50%">
                                <center>
                                    <img v-if="item.user_other_personal_information.signature != null" style="display:block;" width="20%" height="20%" :src="signature_path+item.user_other_personal_information.signature" />
                                </center>
                            </td>
                        </tr>
                        <!-- <tr>
                            <td>Centro comercial Moctezuma</td>
                            <td>Francisco Chang</td>
                        </tr> -->
                    </table>
                </div>
            </div>
        </div>
    </v-card>
</template>
  
<script>

import nohservices from '../services/nohservices';
import nteservices from '../services/nteservices';

export default {
    name: 'Coaching',
    data: () => ({
        signature_path : '',
        attachment : '',
        attachment_file : '',
        content : '',
        date : '',
        created_by : '',
        created_signature : '',
        user_involved : '',
        user_involved_signature : '',
        is_acknowledge : '',
        street_name : '',
        city_municipality : '',
        province : '',
        country : '',
        incident_report_path : '',
        noh_data : [],
        nte_data : []
    }),
    created(){
        this.$store.state.header = false;
        this.$store.state.footer = false;
        this.$store.state.snackbar.color = 'orange';
        this.$store.state.isChat = 1
        localStorage.setItem('is_hris', 0)
        this.GetNoh()
        this.GetNte()
        if(localStorage.getItem('forprintpreviewnoh') != 1){
            setTimeout(function(){
                window.print();
            },1000);
        }
    },
    mounted(){
        this.$store.state.title = "Print Noh";
    },
    updated(){
        if(localStorage.getItem('forprintpreviewnoh') != 1){
            this.$nextTick(function () {
                window.onfocus=function(){ window.close();}
            })
        }else{
            localStorage.setItem('forprintpreviewnoh', 0)
            window.onblur=function(){ window.close();}
        }
    },
    methods: {
        GetNoh(){ // get notice of hearing
            let payload = {
                id: localStorage.getItem('noh_id')
            };
            nohservices.GetNoh(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    console.log(response.data.data)
                    this.noh_data = response.data.data
                    this.signature_path = response.data.signature_path;
                }
            }).catch(error => console.log(error));
        },
        GetNte(){ // get nte
            let payload = {
                id: localStorage.getItem('noh')
            };
            nteservices.GetNte(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    console.log(response.data.data)
                    this.nte_data = response.data.data
                }
            }).catch(error => console.log(error));
        },
        getfile(file) {
            window.open(this.incident_report_path + file, "_blank");
        },
    }
}
</script>
  
<style scoped>
    input[type=checkbox] {
        accent-color: orange;
    }

    table, th, td {
    border:1px solid black;
    }
</style>