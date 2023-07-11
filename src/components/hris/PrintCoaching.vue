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
                            <h3 class="text-center"><b> COACHING </b></h3>
                        </td>
                    </tr>
                </table>
            </center>
            <div class="pa-10">
                <div class="pa-10">
                    <p class="mt-0 mb-0 pt-0 pb-0">{{ moment(String(date)).format('LL') }}</p>
                    <p class="mt-0 mb-0 pt-0 pb-0">{{ street_name + ' ' +  city_municipality}}</p>
                    <p>{{ province + ' ' +  country}}</p>
                    <br>
                    <p>Dear {{ user_involved }}</p>
                    <br>
                    <div v-html='content'></div>
                    <br>
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

import coachingservices from '../services/coachingservices';

export default {
    name: 'Coaching',
    data: () => ({
        signature_path : '',
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
    }),
    created(){
        this.$store.state.header = false;
        this.$store.state.footer = false;
        this.$store.state.snackbar.color = 'orange';
        this.$store.state.isChat = 1
        localStorage.setItem('is_hris', 0)
        this.GetCoaching()
        if(localStorage.getItem('forprintpreviewcoaching') != 1){
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
        GetCoaching(){ // get coaching
            let payload = {
                id: localStorage.getItem('coaching')
            };
            coachingservices.GetCoaching(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    console.log(response.data.data)
                    this.signature_path = response.data.signature_path
                    this.content = response.data.data.letter
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