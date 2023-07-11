<template>
    <v-card>
        <div class="pa-5" style="max-width: 100%;">
            <center>
                <!-- style="border: 1px solid black;" -->
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
                            <h4 class="text-center"><b> Document No. VC-AK-F-04-TMD-{{ this.nte_data.id }} </b></h4>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <h4 class="text-center"><b> {{ moment(String(this.nte_data.date)).format('LL') }} </b></h4>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="3">
                            <h3 class="text-center"><b> NOTICE TO EXPLAIN </b></h3>
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
                    <p class="mt-0 mb-0 pt-0 pb-0">I am sending you this memorandum to give you the opportunity to explain the information I received, as stated  below: </p>
                    <br>
                    <p class="mt-0 mb-0 pt-0 pb-0">The company’s Code of Attitude, Responsibility and Ethics (CARE) provides the below probable sanctions should your alleged violation/s be proven to be true. </p>
                    <br>
                    <div class="pl-10" v-html='this.nte_data.content'></div>
                    <p class="pl-10 pb-0 pt-0 mt-0 mb-2" v-for="(item, index) in nte_data.offense_info" :key="index">
                        <b>Article - {{item.care_info.article_no + ' ' +item.care_info.description}}</b>
                        <span v-if="item.care_info.severity_code == 'A'">
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
                        </span>
                    </p>
                    <br>
                    <p class="mt-0 mb-0 pt-0 pb-0">You are hereby directed to explain in writing within five (5) days from receipt of this notice <b>why you should not  be held responsible for the said offense.</b></p>
                    <br>
                    <p class="mt-0 mb-0 pt-0 pb-0">You are hereby directed to submit your signed written explanation within <b>five (5)</b> calendar days from receipt of this Notice to Explain why no disciplinary action should be taken by the management for the above-mentioned offense/s. Your written explanation shall form part of the records of this case. Failure on your part to submit an explanation within the given period shall constitute a waiver of your right to be heard. After due deliberation, a decision shall be rendered based on available records. In the event you are found guilty of the alleged violation/s, the company will impose the appropriate penalty including and up to termination of employment as indicated in CARE.</p>
                    <br>
                    <p>Prepared by : </p>
                    <v-img :src="signature_path+this.nte_data.created_info.user_other_personal_information.signature" style="height: 20%; width: 20%; object-fit: contain"></v-img>
                    <p>{{ this.nte_data.created_info.personal_information.lastname + ' , ' + this.nte_data.created_info.personal_information.firstname}}</p>
                    <br>
                    <br>
                    <p v-if="this.nte_data.acknowledge_by != 0">Acknowledge by : </p>
                    <v-img v-if="this.nte_data.acknowledge_by != 0" :src="signature_path+this.nte_data.acknowledge_info.user_other_personal_information.signature" style="height: 20%; width: 20%; object-fit: contain"></v-img>
                    <p v-if="this.nte_data.acknowledge_by != 0">{{ this.nte_data.acknowledge_info.personal_information.lastname + ' , ' + this.nte_data.acknowledge_info.personal_information.firstname }}</p>
                </div>
            </div>
        </div>
    </v-card>
</template>
  
<script>

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
        nte_data : []
    }),
    created(){
        this.$store.state.header = false;
        this.$store.state.footer = false;
        this.$store.state.snackbar.color = 'orange';
        this.$store.state.isChat = 1
        localStorage.setItem('is_hris', 0)
        this.GetNte()
        if(localStorage.getItem('forprintpreviewnte') != 1){
            setTimeout(function(){
                window.print();
            },1000);
        }
    },
    mounted(){
        this.$store.state.title = "Print Nte";
    },
    updated(){
        if(localStorage.getItem('forprintpreviewnte') != 1){
            this.$nextTick(function () {
                window.onfocus=function(){ window.close();}
            })
        }else{
            localStorage.setItem('forprintpreviewnte', 0)
            window.onblur=function(){ window.close();}
        }
    },
    methods: {
        GetNte(){ // get notice to explain
            let payload = {
                id: localStorage.getItem('nte')
            };
            nteservices.GetNte(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    console.log(response.data.data)
                    this.nte_data = response.data.data
                    this.signature_path = response.data.signature_path;
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