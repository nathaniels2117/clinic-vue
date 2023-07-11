<template>
    <v-card>
        <div class="pa-5" style="max-width: 100%;">
            <center>
                <!-- style="border: 1px solid black;" -->
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
                    <p class="mt-0 mb-0 pt-0 pb-0">{{ moment(String(date)).format('LL') }}</p>
                    <!-- <p class="mt-0 mb-0 pt-0 pb-0">{{ street_name + ' ' +  city_municipality}}</p>
                    <p>{{ province + ' ' +  country}}</p>
                    <br>
                    <p>Dear {{ user_involved }}</p> -->
                    <br>
                    <div v-html='content'></div>
                    <br>
                    <v-row>
                        <v-file-input
                        outlined
                        v-model="attachment_file"
                        label="Attachment"
                        color="orange"
                        dense
                        truncate-length="50"
                        ></v-file-input>
                        <v-btn
                            elevation="2"
                            class="mx-2 mt-0"
                            dark
                            outlined
                            color="orange"
                            @click.prevent="getfile(attachment)"
                        >
                        <v-icon
                                small
                            >
                                mdi-file-edit-outline
                            </v-icon>
                            View
                        </v-btn>
                    </v-row>
                    <v-img :src="incident_report_path+attachment" width="300" height="300" style="margin: 0px auto;"></v-img>   
                    <br>
                    <p>Prepared by : </p>
                    <v-img :src="signature_path+created_signature" style="height: 20%; width: 20%; object-fit: contain"></v-img>
                    <p>{{ created_by }}</p>
                    <br>
                    <br>
                    <p v-if="is_acknowledge != 0">Acknowledge by : </p>
                    <v-img v-if="is_acknowledge != 0" :src="signature_path+user_involved_signature" style="height: 20%; width: 20%; object-fit: contain"></v-img>
                    <p v-if="is_acknowledge != 0">{{ user_involved }}</p>
                </div>
            </div>
        </div>
    </v-card>
</template>
  
<script>

import incidentreportservices from '../services/incidentreportservices';

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
    }),
    created(){
        this.$store.state.header = false;
        this.$store.state.footer = false;
        this.$store.state.snackbar.color = 'orange';
        this.$store.state.isChat = 1
        localStorage.setItem('is_hris', 0)
        this.GetIncidentReport()
        if(localStorage.getItem('forprintpreviewincidentreport') != 1){
            setTimeout(function(){
                window.print();
            },1000);
        }
    },
    mounted(){
        this.$store.state.title = "Print Incident Report";
    },
    updated(){
        if(localStorage.getItem('forprintpreviewincidentreport') != 1){
            this.$nextTick(function () {
                window.onfocus=function(){ window.close();}
            })
        }else{
            localStorage.setItem('forprintpreviewincidentreport', 0)
            window.onblur=function(){ window.close();}
        }
    },
    methods: {
        GetIncidentReport(){ // get incident report
            let payload = {
                id: localStorage.getItem('incidentreport')
            };
            incidentreportservices.GetIncidentReport(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    console.log(response.data.data)
                    this.signature_path = response.data.signature_path
                    this.incident_report_path = response.data.incident_report_path
                    this.content = response.data.data.content
                    this.date = response.data.data.date
                    this.created_by = response.data.data.created_info.personal_information.lastname + ' , ' + response.data.data.created_info.personal_information.firstname
                    this.created_signature = response.data.data.created_info.user_other_personal_information.signature
                    this.user_involved = response.data.data.user_info.personal_information.lastname + ' , ' + response.data.data.user_info.personal_information.firstname
                    this.user_involved_signature = response.data.data.user_info.user_other_personal_information.signature
                    this.street_name = response.data.data.user_info.user_other_personal_information.street_name
                    this.city_municipality = response.data.data.user_info.user_other_personal_information.city_municipality
                    this.province = response.data.data.user_info.user_other_personal_information.province
                    this.country = response.data.data.user_info.user_other_personal_information.country
                    this.is_acknowledge = response.data.data.acknowledge_by
                    this.attachment = response.data.data.attachment
                    this.attachment_file = new File(["foo"], response.data.data.attachment)
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
</style>