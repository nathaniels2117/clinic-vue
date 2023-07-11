<template>
    <v-container style="max-width: 95%; position: relative;" >
        <v-row class="bars">
            <v-col cols="12" sm="12" md="12" lg="8">
                <v-row class="bars">
                    <v-col cols="12" lg="6" md="6" sm="12">
                        <!-- Employment Status Dashboard -->
                        <v-card cols="12" elevation="5">
                            <v-card-text>
                                <h4><b>Employment Status</b></h4>
                                <br>
                                <v-row>
                                    <v-col>
                                        <h5 class="text-left"><b>Total</b></h5>
                                    </v-col>
                                    <v-col class="ml-auto">
                                        <h5 class="text-right"><b>{{employment_status.Total}}</b></h5>
                                    </v-col>
                                </v-row>
                                <br>
                                <v-progress-linear
                                class="pt-0 pb-0 mt-0 mb-0"
                                background-color="purple"
                                color="orange"
                                rounded
                                height="10"
                                :value="percentage(employment_status.Permanent, employment_status.Total)"
                                ></v-progress-linear>
                                <v-row>
                                    <v-col>
                                        <h5 class="text-left"><b>{{ 0 + '%' }}</b></h5>
                                    </v-col>
                                    <v-col class="ml-auto">
                                        <h5 class="text-right"><b>{{ 100 + '%' }}</b></h5>
                                    </v-col>
                                </v-row>

                                <br>
                                <v-row>
                                    <div class="col-1 pt-0 pb-0 mt-0 mb-0">
                                        <v-icon dense color="orange">mdi-checkbox-blank-circle </v-icon>
                                    </div>
                                    <div class="col-4 pt-0 pb-0 mt-0 mb-0">
                                        <h5 class="text-left"><b>Permanent</b></h5>
                                    </div>
                                    <div class="col-3 pt-0 pb-0 mt-0 mb-0">
                                        <h5 class="text-center"><b>{{employment_status.Permanent}}</b></h5>
                                    </div>
                                    <div class="col-4 pt-0 pb-0 mt-0 mb-0">
                                        <h5 class="text-right"><b>{{ percentage(employment_status.Permanent, employment_status.Total).toFixed(2)  + '%' }}</b></h5>
                                    </div>
                                </v-row>
                                <v-row>
                                    <div class="col-1">
                                        <v-icon dense color="purple">mdi-checkbox-blank-circle </v-icon>
                                    </div>
                                    <div class="col-4">
                                        <h5 class="text-left"><b>Probationary</b></h5>
                                    </div>
                                    <div class="col-3">
                                        <h5 class="text-center"><b>{{employment_status.Probationary}}</b></h5>
                                    </div>
                                    <div class="col-4">
                                        <h5 class="text-right"><b>{{ percentage(employment_status.Probationary, employment_status.Total).toFixed(2)  + '%' }}</b></h5>
                                    </div>
                                </v-row>
                            </v-card-text>
                        </v-card>
                        <!-- Employment Status Dashboard -->
                    </v-col>
                    <v-col cols="12" lg="6" md="6" sm="12">
                        <!-- Gender Diversity Dashboard -->
                        <v-card cols="12" elevation="5">
                            <v-card-text>
                                <h4><b>Gender Diversity</b></h4>
                                <br>
                                <v-row>
                                    <v-col>
                                        <h5 class="text-left"><b>Total</b></h5>
                                    </v-col>
                                    <v-col class="ml-auto">
                                        <h5 class="text-right"><b>{{gender_diversity.Total}}</b></h5>
                                    </v-col>
                                </v-row>
                                <br>
                                <v-progress-linear
                                class="pt-0 pb-0 mt-0 mb-0"
                                background-color="orange"
                                color="purple"
                                rounded
                                height="10"
                                :value="percentage(gender_diversity.Male, gender_diversity.Total)"
                                ></v-progress-linear>
                                <v-row>
                                    <v-col>
                                        <h5 class="text-left"><b>{{ 0 + '%' }}</b></h5>
                                    </v-col>
                                    <v-col class="ml-auto">
                                        <h5 class="text-right"><b>{{ 100 + '%' }}</b></h5>
                                    </v-col>
                                </v-row>
                                <br>
                                <v-row>
                                    <div class="col-1 pt-0 pb-0 mt-0 mb-0">
                                        <v-icon dense color="purple">mdi-checkbox-blank-circle </v-icon>
                                    </div>
                                    <div class="col-4 pt-0 pb-0 mt-0 mb-0">
                                        <h5 class="text-left"><b>Man</b></h5>
                                    </div>
                                    <div class="col-3 pt-0 pb-0 mt-0 mb-0">
                                        <h5 class="text-center"><b>{{gender_diversity.Male}}</b></h5>
                                    </div>
                                    <div class="col-4 pt-0 pb-0 mt-0 mb-0">
                                        <h5 class="text-right"><b>{{ percentage(gender_diversity.Male, gender_diversity.Total).toFixed(2) + '%' }}</b></h5>
                                    </div>
                                </v-row>
                                <v-row>
                                    <div class="col-1">
                                        <v-icon dense color="orange">mdi-checkbox-blank-circle </v-icon>
                                    </div>
                                    <div class="col-4">
                                        <h5 class="text-left"><b>Woman</b></h5>
                                    </div>
                                    <div class="col-3">
                                        <h5 class="text-center"><b>{{gender_diversity.Female}}</b></h5>
                                    </div>
                                    <div class="col-4">
                                        <h5 class="text-right"><b>{{ percentage(gender_diversity.Female, gender_diversity.Total).toFixed(2) + '%' }}</b></h5>
                                    </div>
                                </v-row>
                            </v-card-text>
                        </v-card>
                        <!-- Gender Diversity Dashboard -->
                    </v-col>
                    <v-col cols="12" lg="6" md="6" sm="12">
                        <!-- Attendance Dashboard -->
                        <v-card cols="12" elevation="5">
                            <v-card-text>
                                <h4><b>Attendance</b></h4>
                                <br>
                                <v-row>
                                    <v-col>
                                        <h5 class="text-left"><b>Total</b></h5>
                                    </v-col>
                                    <v-col class="ml-auto">
                                        <h5 class="text-right"><b>{{attendance.Total}}</b></h5>
                                    </v-col>
                                </v-row>
                                <br>
                                <v-progress-linear
                                    rounded
                                    class="purple"
                                    :buffer-value="percentage(attendance.Present + attendance.Absent, attendance.Total)"
                                    color="orange"
                                    background-color="red"
                                    height="10"
                                    :value="percentage(attendance.Present, attendance.Total)"
                                >
                                </v-progress-linear>
                                <v-row>
                                    <v-col>
                                        <h5 class="text-left"><b>{{ 0 + '%' }}</b></h5>
                                    </v-col>
                                    <v-col class="ml-auto">
                                        <h5 class="text-right"><b>{{ 100 + '%' }}</b></h5>
                                    </v-col>
                                </v-row>

                                <br>
                                <v-row>
                                    <div class="col-1 pt-0 pb-0 mt-0 mb-0">
                                        <v-icon dense color="orange">mdi-checkbox-blank-circle </v-icon>
                                    </div>
                                    <div class="col-4 pt-0 pb-0 mt-0 mb-0">
                                        <h5 class="text-left"><b>Present</b></h5>
                                    </div>
                                    <div class="col-3 pt-0 pb-0 mt-0 mb-0">
                                        <h5 class="text-center"><b>{{attendance.Present}}</b></h5>
                                    </div>
                                    <div class="col-4 pt-0 pb-0 mt-0 mb-0">
                                        <h5 class="text-right"><b>{{ percentage(attendance.Present, attendance.Total).toFixed(2) + '%' }}</b></h5>
                                    </div>
                                </v-row>
                                <v-row>
                                    <div class="col-1">
                                        <v-icon dense color="red">mdi-checkbox-blank-circle </v-icon>
                                    </div>
                                    <div class="col-4">
                                        <h5 class="text-left"><b>Absent</b></h5>
                                    </div>
                                    <div class="col-3">
                                        <h5 class="text-center"><b>{{ attendance.Absent }}</b></h5>
                                    </div>
                                    <div class="col-4">
                                        <h5 class="text-right"><b>{{ percentage(attendance.Absent, attendance.Total).toFixed(2) + '%' }}</b></h5>
                                    </div>
                                </v-row>
                                <v-row>
                                    <div class="col-1 pt-0 mt-0">
                                        <v-icon dense color="purple">mdi-checkbox-blank-circle </v-icon>
                                    </div>
                                    <div class="col-4 pt-0 mt-0">
                                        <h5 class="text-left"><b>On leave</b></h5>
                                    </div>
                                    <div class="col-3 pt-0 mt-0">
                                        <h5 class="text-center"><b>{{ attendance.Leave }}</b></h5>
                                    </div>
                                    <div class="col-4 pt-0 mt-0">
                                        <h5 class="text-right"><b>{{ percentage(attendance.Leave, attendance.Total).toFixed(2) + '%' }}</b></h5>
                                    </div>
                                </v-row>
                            </v-card-text>
                        </v-card>
                        <!-- Attendance Dashboard -->
                    </v-col>
                    <v-col cols="12" lg="6" md="6" sm="12">
                        <!-- For Approval Dashboard -->
                        <v-card cols="12" elevation="5">
                            <v-card-text>
                                <h4><b>For Approval</b></h4>
                                <br>
                                <v-row>
                                    <v-col>
                                        <h5 class="text-left"><b>Total</b></h5>
                                    </v-col>
                                    <v-col class="ml-auto">
                                        <h5 class="text-right"><b>{{ for_approval.Total }}</b></h5>
                                    </v-col>
                                </v-row>
                                <br>
                                <v-progress-linear
                                    rounded
                                    class="red"
                                    :buffer-value="percentage(for_approval.Pending + for_approval.Approved, for_approval.Total)"
                                    color="orange"
                                    background-color="green"
                                    height="10"
                                    :value="percentage(for_approval.Pending, for_approval.Total)"
                                >
                                </v-progress-linear>
                                <v-row>
                                    <v-col>
                                        <h5 class="text-left"><b>{{ 0 + '%' }}</b></h5>
                                    </v-col>
                                    <v-col class="ml-auto">
                                        <h5 class="text-right"><b>{{ 100 + '%' }}</b></h5>
                                    </v-col>
                                </v-row>
                                <br>
                                <v-row>
                                    <div class="col-1  pt-0 pb-0 mt-0 mb-0">
                                        <v-icon dense color="orange">mdi-checkbox-blank-circle </v-icon>
                                    </div>
                                    <div class="col-4  pt-0 pb-0 mt-0 mb-0">
                                        <h5 class="text-left"><b>Pending</b></h5>
                                    </div>
                                    <div class="col-3  pt-0 pb-0 mt-0 mb-0">
                                        <h5 class="text-center"><b>{{ for_approval.Pending }}</b></h5>
                                    </div>
                                    <div class="col-4  pt-0 pb-0 mt-0 mb-0">
                                        <h5 class="text-right"><b>{{ percentage(for_approval.Pending, for_approval.Total).toFixed(2) + '%' }}</b></h5>
                                    </div>
                                </v-row>
                                <v-row>
                                    <div class="col-1">
                                        <v-icon dense color="green">mdi-checkbox-blank-circle </v-icon>
                                    </div>
                                    <div class="col-4">
                                        <h5 class="text-left"><b>Approved</b></h5>
                                    </div>
                                    <div class="col-3">
                                        <h5 class="text-center"><b>{{ for_approval.Approved }}</b></h5>
                                    </div>
                                    <div class="col-4">
                                        <h5 class="text-right"><b>{{ percentage(for_approval.Approved, for_approval.Total).toFixed(2) + '%' }}</b></h5>
                                    </div>
                                </v-row>
                                <v-row>
                                    <div class="col-1  pt-0 mt-0">
                                        <v-icon dense color="red">mdi-checkbox-blank-circle </v-icon>
                                    </div>
                                    <div class="col-4  pt-0 mt-0">
                                        <h5 class="text-left"><b>Disapproved</b></h5>
                                    </div>
                                    <div class="col-3  pt-0 mt-0">
                                        <h5 class="text-center"><b>{{ for_approval.Disapproved }}</b></h5>
                                    </div>
                                    <div class="col-4  pt-0 mt-0">
                                        <h5 class="text-right"><b>{{ percentage(for_approval.Disapproved, for_approval.Total).toFixed(2) + '%' }}</b></h5>
                                    </div>
                                </v-row>
                            </v-card-text>
                        </v-card>
                        <!-- For Approval Dashboard -->
                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="12" lg="4" md="12" sm="12" class="grow" >
                <!-- Announcement Dashboard -->
                <v-card cols="12" elevation="5" class="scrollable overflow-auto" height="495px">
                    <v-card-text>
                        <h4><b>Announcements</b></h4>
                        <v-card-text>
                            <div v-for="(item, index) in announcement" :key="index">
                                <!-- conditon for change of color for announcement -->
                                <div v-if="index % 2 == 0">
                                    <v-card style="border: 1px solid black; border-radius:20px; background-color:aliceblue" height="80px" @click="openannouncement(item.id)">
                                        <v-card-text>
                                            <v-row class="pa-1">
                                                <v-card style="border: 1px solid black; border-radius:20px;  background-color:white" class="col-3" height="60px"> 
                                                    <h1 class="text-center"><b>{{ moment(item.date).format('D')}}</b></h1>
                                                    <h5 class="text-center"><b>{{ moment(item.date).format('ddd')}}</b></h5>
                                                </v-card>
                                                <div class="col-9">
                                                    <h4 class="text-left"><b>{{ item.title }}</b></h4>
                                                    <h4 class="text-left"><b>{{ item.start_time != null || item.end_time != null ? moment(item.start_time, 'hh:mm A').format('hh:mm A') + ' - '+ moment(item.end_time, 'hh:mm A').format('hh:mm A') : '' }}</b></h4>
                                                </div>
                                            </v-row>
                                        </v-card-text>
                                    </v-card>
                                    <br>
                                </div>
                                <div v-else>
                                    <v-card style="border: 1px solid black; border-radius:20px; background-color:lightcyan" height="80px" @click="openannouncement(item.id)">
                                        <v-card-text>
                                            <v-row class="pa-1">
                                                <v-card style="border: 1px solid black; border-radius:20px;  background-color:white" class="col-3" height="60px"> 
                                                    <h1 class="text-center"><b>{{ moment(item.date).format('d')}}</b></h1>
                                                    <h5 class="text-center"><b>{{ moment(item.date).format('ddd')}}</b></h5>
                                                </v-card>
                                                <div class="col-9">
                                                    <h4 class="text-left"><b>{{ item.title }}</b></h4>
                                                    <h4 class="text-left"><b>{{ item.start_time != null || item.end_time != null ? moment(item.start_time, 'hh:mm A').format('hh:mm A') + ' - '+ moment(item.end_time, 'hh:mm A').format('hh:mm A') : '' }}</b></h4>
                                                </div>
                                            </v-row>
                                        </v-card-text>
                                    </v-card>
                                    <br>
                                </div>
                            </div>
                        </v-card-text>
                    </v-card-text>
                </v-card>
                <!-- Announcement Dashboard -->
            </v-col>
        </v-row>

        <v-row class="bars">
            <v-col cols="12" lg="4" md="12" sm="12" class="grow" >
                <!-- Birthday Dashboard -->
                <v-card cols="12" elevation="5" class="scrollable overflow-auto" height="555px">
                    <v-card-text>
                        <h4><b>Birthdays</b></h4>
                        <v-card-text>
                            <div v-for="(item, index) in birth_day" :key="index">
                                <v-card style="border: 1px solid black; border-radius:20px;" height="80px">
                                    <v-card-text>
                                        <v-row class="pa-0">
                                            <div>
                                                <v-img
                                                v-if="item.user_other_personal_information.profile_picture != null"
                                                max-width="60"
                                                class="pa-7 rounded-circle d-inline-block align-self-stretch mt-1 ml-2"
                                                style="margin: 0px auto;"
                                                :src="imagepath +  item.user_other_personal_information.profile_picture"
                                                ></v-img>
                                                <v-img
                                                v-else
                                                src="../../assets/images/circle_wirewolf.png"
                                                max-width="60"
                                                class="pa-7 rounded-circle d-inline-block align-self-stretch mt-1 ml-2"
                                                style="margin: 0px auto;"
                                                ></v-img>
                                            </div>
                                            <div class="col-8">
                                                <h4 class="text-left"  v-if="$vuetify.breakpoint.lgAndUp"><b> {{ item.personal_information.firstname + ' ' +  item.personal_information.lastname}}</b></h4>
                                                <h4 class="text-left" v-else><b> {{ item.personal_information.firstname + ' ' +  item.personal_information.lastname + ' ' + '(' + item.role_information.name + ')'}}</b></h4>
                                                <h5 class="text-left">{{ moment(item.personal_information.birth_date).format('LL')}}</h5>
                                            </div>
                                        </v-row>
                                    </v-card-text>
                                </v-card>
                                <br>
                            </div>
                        </v-card-text>
                    </v-card-text>
                </v-card>
                <!-- Birthday Dashboard -->
            </v-col>

            <v-col cols="12" lg="4" md="12" sm="12" class="grow" >
                <!-- Who's off Dashboard -->
                <v-card cols="12" elevation="5" class="scrollable overflow-auto" height="555px">
                        <v-card-text>
                            <v-row>
                                <div class="col-6">
                                    <h4><b>Who's Off</b></h4>
                                </div>
                                <div class="col-6">
                                    <h5 class="text-right">{{ moment(date).format('LL') }}</h5>
                                </div>
                            </v-row>
                        <v-card-text>
                            <div v-if="whos_leave.length==0" >
                                <div class="col-12">
                                    <h5 class="text-center"><b> Nothing is off today.</b></h5>
                                </div>
                            </div>
                            <div v-for="(item, index) in whos_leave" :key="index">
                                <v-card style="border: 1px solid black; border-radius:20px;" height="80px">
                                    <v-card-text>
                                        <v-row class="pa-0">
                                            <div>
                                                <v-img
                                                v-if="item.created_info.user_other_personal_information.profile_picture != null"
                                                max-width="60"
                                                class="pa-7 rounded-circle d-inline-block align-self-stretch mt-1 ml-2"
                                                style="margin: 0px auto;"
                                                :src="imagepath +  item.created_info.user_other_personal_information.profile_picture"
                                                ></v-img>
                                                <v-img
                                                v-else
                                                src="../../assets/images/circle_wirewolf.png"
                                                max-width="60"
                                                class="pa-7 rounded-circle d-inline-block align-self-stretch mt-1 ml-2"
                                                style="margin: 0px auto;"
                                                ></v-img>
                                            </div>
                                            <div class="col-8">
                                                <h4 class="text-left" v-if="$vuetify.breakpoint.lgAndUp"><b> {{ item.created_info.personal_information.firstname + ' ' +  item.created_info.personal_information.lastname}}</b></h4>
                                                <h4 class="text-left" v-else><b> {{ item.created_info.personal_information.firstname + ' ' +  item.created_info.personal_information.lastname + ' ' + '(' + item.created_info.role_information.name + ')'}}</b></h4>
                                                <h5 class="text-left">{{ moment(item.created_info.personal_information.birth_date).format('LL')}}</h5>
                                            </div>
                                        </v-row>
                                    </v-card-text>
                                </v-card>
                                <br>
                            </div>
                        </v-card-text>
                    </v-card-text>
                </v-card>
                <!-- Who's off Dashboard -->
            </v-col>

            <v-col cols="12" lg="4" md="12" sm="12" class="grow" >
                <!-- Most Applied Position Dashboard -->
                <v-card cols="12" elevation="5" class="scrollable overflow-auto" height="555px">
                    <v-card-text>
                        <v-row>
                            <div class="col-12">
                                <h4><b>Most Applied Position</b></h4>
                            </div>
                        </v-row>
                        <div>
                        <zingchart v-if="$vuetify.breakpoint.lgAndUp" :data="most_applied_positionsm" id="myChart"></zingchart>
                        <zingchart v-else :data="most_applied_position" id="myChart"></zingchart>
                        </div>
                        <div v-if="$vuetify.breakpoint.lgAndUp">
                            <v-row class="yaxis_lg" v-for="(item, index) in most_applied" :key="index">
                                <div class="col-1">
                                    <v-icon dense :color="random_color[index]">mdi-checkbox-blank-circle </v-icon>
                                </div>
                                <div class="col-4">
                                    <h5 class="text-left"><b>{{ item.Name }}</b></h5>
                                </div>
                                <div class="col-3">
                                    <h5 class="text-center"><b>{{ item.Data }}</b></h5>
                                </div>
                                <div class="col-4">
                                    <h5 class="text-right"><b>{{ percentage(item.Data, most_applied_total).toFixed(2) + '%' }}</b></h5>
                                </div>
                            </v-row>
                        </div>
                        <div v-else>
                            <v-row class="yaxis_sm" v-for="(item, index) in most_applied" :key="index">
                                <div class="col-1">
                                    <v-icon dense :color="random_color[index]">mdi-checkbox-blank-circle </v-icon>
                                </div>
                                <div class="col-4">
                                    <h5 class="text-left"><b>{{ item.Name }}</b></h5>
                                </div>
                                <div class="col-3">
                                    <h5 class="text-center"><b>{{ item.Data }}</b></h5>
                                </div>
                                <div class="col-4">
                                    <h5 class="text-right"><b>{{ percentage(item.Data, most_applied_total).toFixed(2) + '%' }}</b></h5>
                                </div>
                            </v-row>
                        </div>
                    </v-card-text>
                </v-card>
                <!-- Most Applied Position Dashboard -->
            </v-col>
        </v-row>

        <v-row class="bar" v-if="!$store.getters.valParent()">
            <v-col cols="12" lg="12" md="12" sm="12" >
                <v-card>
                    <v-toolbar color="orange" height="40px">
                            <v-toolbar-title class="white--text flex text-center">Leave Credits</v-toolbar-title>
                    </v-toolbar>
                    <v-card>
                        <v-data-table
                        :headers="leaveheaders"
                        :items="leavebalancedata"
                        hide-default-footer
                        height="34.2vh"
                        >
                        </v-data-table>
                    </v-card>
                </v-card>
            </v-col>
        </v-row>

        <!-- Dialog viewing annoucement information and photos -->
        <v-dialog
        style="border: 1px solid black; border-radius:20px;" height="700px" width="700px"
        v-model="announcementdialog"
        hide-overlay
        transition="dialog-bottom-transition">
            <v-col>
                <v-card>
                    <v-carousel
                    :continuous="false"
                    :show-arrows="false"
                    hide-delimiters
                    hide-delimiter-background
                    >
                        <v-carousel-item
                        :src="image_path+annoucement['image']"
                        >
                            <div style="float: right;" class="pa-2">
                                <v-btn
                                    elevation="2"
                                    small
                                    color="red"
                                    dark
                                    v-if="$store.getters.valAccess(279)"
                                    @click="employeelistacknowledge()"
                                    > {{ percentage(acknowledge_by_data.Acknowledge, acknowledge_by_data.Total).toFixed(2)  + '%' }} 
                                </v-btn>
                            </div>
                        </v-carousel-item>
                    </v-carousel>
                    <v-card color="#D3D3D3" height="5px"></v-card>
                    <v-layout fill-height align-end pb-2 mb-0>
                        <v-flex xs12 class="pa-3">
                            <span v-text="annoucement['description']"></span>
                        </v-flex>
                    </v-layout>
                </v-card>
            </v-col>
        </v-dialog>
        <!-- Dialog viewing annoucement information and photos -->

        <!-- Dialog viewing annoucement acknowledge by employee -->
        <v-dialog
        style="border: 1px solid black; border-radius:20px;" height="700px" width="700px"
        v-model="employeelistacknowledgedialog"
        hide-overlay
        transition="dialog-bottom-transition">
            <v-col>
                <v-card>
                    <v-data-table
                    dense
                    :headers="EmployeeListAcknowledgeheaders"
                    :items="acknowledge_by_info"
                    :sort-by.sync="sortBy"
                    :sort-desc.sync="sortDesc"
                    :page.sync="page"
                    @page-count="pageCount = $event"
                    :footer-props="{
                    'items-per-page-options':[10],
                    'disable-items-per-page': true,
                    }"
                    >

                        <template v-slot:item.id="props">
                            {{ props.item.personal_information != null ? props.item.personal_information.lastname + ' , ' + props.item.personal_information.firstname : 'No Data' }}
                        </template>

                        <template v-slot:item.is_acknowledge="props">
                            <div>
                                <div class="d-flex justify-left"
                                    v-if="props.item.is_acknowledge == 1">
                                    <h3 style="color: orange;">✓</h3>
                                </div>
                                <div class="d-flex justify-left"
                                    v-else>
                                    <h3 style="color: red;">⨉</h3>
                                </div>
                                <!-- <v-checkbox 
                                    v-model="props.item.is_acknowledge"
                                    readonly
                                    v-if="props.item.is_acknowledge == 1"
                                    color="orange"
                                ></v-checkbox> 
                                <v-checkbox 
                                    v-else
                                    value="false"
                                    readonly
                                    color="orange"
                                ></v-checkbox>   -->
                            </div>
                        </template>
                    </v-data-table>
                    <v-pagination
                        color="orange"
                        v-model="page"
                        :length="pageCount"
                    ></v-pagination>
                </v-card>
            </v-col>
        </v-dialog>
        <!-- Dialog viewing annoucement acknowledge by employee -->

        <!-- Dialog viewing annoucement information and photos -->
        <v-dialog
        style="border: 1px solid black; border-radius:20px;" height="700px" width="700px"
        v-model="announcementdialog"
        hide-overlay
        transition="dialog-bottom-transition">
            <v-col>
                <v-card>
                    <v-carousel
                    :continuous="false"
                    :show-arrows="false"
                    hide-delimiters
                    hide-delimiter-background
                    >
                        <v-carousel-item
                        :src="image_path+annoucement['image']"
                        >
                            <div style="float: right;" class="pa-2">
                                <v-btn
                                    elevation="2"
                                    small
                                    color="red"
                                    dark
                                    v-if="$store.getters.valAccess(279)"
                                    @click="employeelistacknowledge()"
                                    > {{ percentage(acknowledge_by_data.Acknowledge, acknowledge_by_data.Total).toFixed(2)  + '%' }} 
                                </v-btn>
                            </div>
                        </v-carousel-item>
                    </v-carousel>
                    <v-card color="#D3D3D3" height="5px"></v-card>
                    <v-layout fill-height align-end pb-2 mb-0>
                        <v-flex xs12 class="pa-3">
                            <span v-text="annoucement['description']"></span>
                            <div style="float: right;" class="pt-3 pb-0 mb-0">
                                <v-btn
                                    elevation="2"
                                    small
                                    color="red"
                                    dark
                                    v-if="!acknowledge_by.includes($store.getters.getUserID) && !$store.getters.valParent()"
                                    @click="employeelistacknowledgebyemployee()"
                                    > 
                                    Acknowledge
                                </v-btn>
                            </div>
                        </v-flex>
                    </v-layout>
                </v-card>
            </v-col>
        </v-dialog>
        <!-- Dialog viewing annoucement information and photos -->

        <!-- <v-row>
            <v-col cols="12">
                <v-card
                    :loading="loading"
                >
                    <template slot="progress">
                        <v-progress-linear
                            color="deep-purple"
                            height="10"
                            indeterminate
                        ></v-progress-linear>
                    </template>

                    <v-card-text>
                        <v-col>
                            <v-card>
                                <v-toolbar color="orange">
                                        <v-toolbar-title class="white--text flex text-center">Announcement</v-toolbar-title>
                                </v-toolbar>
                                <v-carousel
                                cycle
                                hide-delimiters
                                show-arrows-on-hover
                                >
                                    <v-carousel-item
                                    v-for="(slide, i) in announcementdata"
                                    :key="i"
                                    :src="image_path+slide['image']"
                                    >
                                        <v-container
                                        fill-height
                                        fluid
                                        pa-0 ma-0 pb-0 
                                        >
                                            <v-layout fill-height align-end pb-2 mb-0>
                                                <v-flex xs12>
                                                    <v-card color="orange" class="pa-2">
                                                        <span class="white--text" v-text="slide['description']"></span>
                                                    </v-card>
                                                </v-flex>
                                            </v-layout>
                                        </v-container>
                                    </v-carousel-item>
                                </v-carousel>
                            </v-card>
                        </v-col>
                        <v-col>
                            <v-row>
                                <div class="col-sm-6">
                                    <v-card>
                                        <v-toolbar color="orange" height="40px">
                                                <v-toolbar-title class="white--text flex text-center">Leave Credits</v-toolbar-title>
                                        </v-toolbar>
                                        <v-card>
                                            <v-data-table
                                            :headers="leaveheaders"
                                            :items="leavebalancedata"
                                            hide-default-footer
                                            height="34.2vh"
                                            >
                                            </v-data-table>
                                        </v-card>
                                    </v-card>
                                </div>
                                <div class="col-sm-6">
                                    <v-card>
                                        <v-toolbar color="orange" height="40px">
                                                <v-toolbar-title class="white--text flex text-center">For Approval</v-toolbar-title>
                                        </v-toolbar>
                                        <v-card>
                                            <v-data-table
                                            :headers="forapprovalheaders"
                                            :items="forapprovaldata"
                                            hide-default-footer
                                            height="34.2vh"
                                            >
                                            </v-data-table>
                                        </v-card>
                                    </v-card>
                                </div>
                            </v-row>
                        </v-col>
                        <v-col>
                            <v-row>
                                <div class="col-sm-6">
                                    <v-card>
                                        <v-toolbar color="orange" height="40px">
                                                <v-toolbar-title class="white--text flex text-center">Disciplinary Action</v-toolbar-title>
                                        </v-toolbar>
                                        <v-data-table
                                        :headers="disciplinaryheaders"
                                        :items="ey"  
                                        hide-default-footer
                                        >
                                        </v-data-table>
                                    </v-card>
                                </div>
                                <div class="col-sm-6">
                                    <v-card>
                                        <v-toolbar color="orange" height="40px">
                                                <v-toolbar-title class="white--text flex text-center">Commendation</v-toolbar-title>
                                        </v-toolbar>
                                        <v-data-table
                                        :headers="commendationheaders"
                                        :items="ey" 
                                        hide-default-footer
                                        >
                                        </v-data-table>
                                    </v-card>
                                </div>
                            </v-row>
                        </v-col>
                        <v-col>
                            <v-row>
                                <div class="col-sm-6">
                                    <v-card>
                                        <v-toolbar color="orange" height="40px">
                                                <v-toolbar-title class="white--text flex text-center">Active Loan</v-toolbar-title>
                                        </v-toolbar>
                                        <v-data-table
                                        :headers="activeloanheaders"
                                        :items="ey"  
                                        hide-default-footer
                                        >
                                        </v-data-table>
                                    </v-card>
                                </div>
                                <div class="col-sm-6">
                                    <v-card>
                                        <v-toolbar color="orange" height="40px">
                                                <v-toolbar-title class="white--text flex text-center">Trainings</v-toolbar-title>
                                        </v-toolbar>
                                        <v-data-table
                                        :headers="trainingheaders"
                                        :items="ey"
                                        hide-default-footer
                                        >
                                        </v-data-table>
                                    </v-card>
                                </div>
                            </v-row>
                        </v-col>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row> -->
    </v-container>
    
</template>
  
<script>

    import announcementservices from '../services/announcementservices';
    import hrisdashboardservices from '../services/hrisdashboardservices';

    export default {
        name: 'HrisDashboard',
        data: () => ({
            // HRIS ADMIN DASH BOARD
            page: 1,
            pageCount: 0,
            acknowledge_by : [],
            sortBy: 'is_acknowledge',
            sortDesc: false,
            employeelistacknowledgedialog :false,
            annoucement : [],
            acknowledge_by_info : [],
            acknowledge_by_data : [],
            announcementdialog : false,
            random_color : [],
            employment_status : [],
            gender_diversity : [],
            attendance : []  ,
            for_approval : [],
            profile_picture : null,
            birth_day : [],
            whos_leave : [],
            most_applied : [],
            most_applied_total : 0,
            imagepath: '',
            date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            most_applied_position: [],
            most_applied_positionsm : [],
            most_applied_position_series: [],
            most_applied_position_data: [],
            announcement : [],
            // HRIS ADMIN DASH BOARD
            announcementdata:[],
            ey:[],
            loading: false,
            ApprovalTab : 'leaveapproval',
            leaveheaders: [
                { text: 'Leave Type', value: 'leave_type_info.name' },
                { text: 'Actual Balance', value: 'balance'},
                // { text: 'Current Balance', value: ''}
            ],  
            forapprovalheaders: [
                { text: 'Type', value: 'name' },
                { text: 'Pending', value: 'pending'}
            ],
            disciplinaryheaders: [
                { text: 'Violation', value: '' },
                { text: 'Date', value: ''},
                { text: 'Violation', value: '' },
            ],
            commendationheaders: [
                { text: 'Date', value: '' },
                { text: 'Commendation', value: ''}
            ],
            activeloanheaders: [
                { text: 'Type', value: '' },
                { text: 'Date', value: '' },
                { text: 'Principal', value: ''}
            ],
            trainingheaders: [
                { text: 'Type', value: '' },
                { text: 'Date', value: '' },
                { text: 'Hours', value: ''}
            ],
            EmployeeListAcknowledgeheaders: [
                { text: 'Name', value: 'id' },
                { text: 'Division', value: 'division_information.name'},
                { text: 'Acknowledge', value: 'is_acknowledge'},
            ],
            url : '',
            image_path: [],
            forapprovaldata: [
                {
                    name: 'Overtime',
                    pending: 0
                },
                {
                    name: 'Leave',
                    pending: 0
                },
                {
                    name: 'Undertime',
                    pending: 0
                },
                {
                    name: 'Official Business',
                    pending: 0
                }
            ],
            leavebalancedata:[],
        }),
        created(){
            this.$store.state.header = false;
            this.$store.state.footer = false;
            this.generaterandomcolor();
            this.FetchInfoforDashboard();
            this.FetchAllActiveAnnouncement();
            this.FetchAllPendingApprovalViaUser();
            this.FetchAllLeaveBalanceViaUser();
            this.most_applied_datalg();
            this.most_applied_datasm();
        },
        mounted(){
            this.$store.state.title = "Dashboard";
        },
        methods: {
            FetchAllActiveAnnouncement(){ // fetch all announcement via parent id
                let payload = {
                    parent_id: this.$store.getters.getParentID
                };
                announcementservices.FetchAllActiveAnnouncement(payload, this.$store.getters.getAccessToken).then(response => {
                    if(response.data.success){
                        // console.log(response.data.data);
                        this.announcementdata = response.data.data;
                        this.image_path = response.data.image_path;
                    }
                }).catch(error => console.log(error));
            },
            FetchAllPendingApprovalViaUser(){ // fetch all pending approval via user id
                let payload = {
                    id : this.$store.getters.getUserID
                };
                hrisdashboardservices.FetchAllPendingApprovalViaUser(payload, this.$store.getters.getAccessToken).then(response => {
                    if(response.data.success){
                        // console.log(response.data);
                        this.forapprovaldata[0].pending = response.data.pending_count_overtime
                        this.forapprovaldata[1].pending = response.data.pending_count_leave
                        this.forapprovaldata[2].pending = response.data.pending_count_undertime
                        this.forapprovaldata[3].pending = response.data.pending_count_officialbusiness
                    }
                }).catch(error => console.log(error));
            },
            Preview_image() {
                if(!this.annoucement_image){
                    this.url=null;
                    return;
                } 
                this.url= URL.createObjectURL(this.annoucement_image);
            },
            FetchAllLeaveBalanceViaUser(){  // fetch all leave balance via user id
                let payload = {
                    id: this.$store.getters.getUserID,
                    parent_user_id: this.$store.getters.getParentID
                };
                hrisdashboardservices.FetchAllLeaveBalanceViaUser(payload, this.$store.getters.getAccessToken).then(response => {
                    if(response.data.success){
                        this.leavebalancedata = response.data.data;
                    }
                }).catch(error => console.log(error));
            },

            // HRIS ADMIN DASH BOARD
            FetchInfoforDashboard(){
                let payload = {
                    parent_id: this.$store.getters.getParentID
                };
                hrisdashboardservices.FetchInfoforDashboard(payload, this.$store.getters.getAccessToken).then(response => {
                    if(response.data.success){
                        this.gender_diversity = response.data.gender_diversity;
                        this.employment_status = response.data.employment_status;
                        this.attendance = response.data.attendance;
                        this.for_approval = response.data.for_approval;
                        this.imagepath = response.data.image_path;
                        this.birth_day = response.data.birth_day;
                        this.whos_leave = response.data.whos_leave;
                        this.most_applied = response.data.most_applied;
                        this.most_applied_total = response.data.most_applied_total;
                        this.announcement = response.data.announcement;
                        var i=0;
                        this.most_applied.forEach((value) => {
                            this.most_applied_position_data.push(value.Data)
                            this.most_applied_position_series.push({
                                values: this.most_applied_position_data,
                                slice: "85%",
                                'background-color' : this.random_color[i]
                            });
                            this.most_applied_position_data = [];
                            i++;
                        });
                        this.most_applied_datalg() // data in for most applied position
                        this.most_applied_datasm(); // data in for most applied position
                  }
                }).catch(error => console.log(error));
            },
            percentage( key,maxValue) {
                let total=key;
                if(isNaN((100 * total) / maxValue)){
                    return 0;
                }else{
                    return (100 * total) / maxValue;
                }
            },
            most_applied_datalg(){  // data in for most applied position
                // zingchart.bind('myChart', 'contextmenu', function() { return false;});
                this.most_applied_position = {
                    x : '0%',
                    y : '0%',
                    type: "ring",
                    plotarea: { margin: '0 0 0 0', },
                    scale: {
                        layout: "2x1",
                        'size-factor':1
                    },
                    plot: {
                        "animation": {
                            "on-legend-toggle": true,
                            "effect": 2,
                            "method": 1,
                            "sequence": 1,
                            "speed": 1
                        },
                        'detach': false,
                        pieTransform: [0, '10%', 'flow=-99', 'fixed=10%;10%'][2] ,
                        'value-box': {
                        text: "%pie-total-value" + '<br>' +  "Applicants",
                        placement: "center",
                        'font-color': "black",
                        'font-size':20,
                        'font-family': "Georgia",
                        'font-weight': "normal",
                        rules: [
                                {
                                rule: "%p != 0",
                                visible: false
                                }
                            ]
                        },
                    },
                    gui: {
                        contextMenu: {
                            button: {
                                visible: false
                            }
                        }
                    },
                    series : this.most_applied_position_series
                }
            },
            most_applied_datasm(){  // data in for most applied position
                this.most_applied_positionsm = {
                    x : '0%',
                    y : '0%',
                    type: "ring",
                    plotarea: { margin: '0 0 0 0', },
                    scale: {
                        layout: "2x1",
                        'size-factor':1
                    },
                    plot: {
                        "animation": {
                            "on-legend-toggle": true,
                            "effect": 2,
                            "method": 1,
                            "sequence": 1,
                            "speed": 1
                        },
                        'detach': false,
                        pieTransform: [0, '10%', 'flow=-99', 'fixed=10%;10%'][2] ,
                        'value-box': {
                        text: "%pie-total-value" + '<br>' +  "Applicants",
                        placement: "center",
                        'font-color': "black",
                        'font-size':20,
                        'font-family': "Georgia",
                        'font-weight': "normal",
                        rules: [
                            {
                            rule: "%p != 0",
                            visible: false
                            }
                            ]
                        },
                    },
                     gui: {
                        contextMenu: {
                            button: {
                                visible: false
                            }
                        }
                    },
                    series : this.most_applied_position_series
                }
            },
            generaterandomcolor(){ // generate colors for zing charts
                for(var i = 0; i < 100; i++){
                    var randomColor = Math.floor(Math.random()*16777215).toString(16);
                    this.random_color.push('#'+randomColor);
                }
            },
            AcknowledgebyEmployee(){ // acknowledge by employee
                let payload = {
                    id: this.forAcknowledgeAnnouncement.id,
                    user_id: this.$store.getters.getUserID,
                    parent_id: this.$store.getters.getParentID
                };
                announcementservices.AcknowledgebyEmployee(payload, this.$store.getters.getAccessToken).then(response => {
                    if(response.data.success){
                        this.annoucement = response.data.data;
                        this.acknowledge_by_data = response.data.acknowledge_by_data;
                        this.acknowledge_by_info = response.data.acknowledge_by_info;
                    }
                }).catch(error => console.log(error));
            },
            employeelistacknowledge(){
                this.employeelistacknowledgedialog = true;
            },
            openannouncement(id){
                this.forAcknowledgeAnnouncement = {
                    id: id,
                }
                this.FetchAnnouncementInfo()
                this.announcementdialog = true;
            },
            FetchAnnouncementInfo(){ // fetch announcement info
                let payload = {
                    id: this.forAcknowledgeAnnouncement.id,
                    user_id: this.$store.getters.getUserID,
                    parent_id: this.$store.getters.getParentID
                };
                announcementservices.FetchAnnouncementInfo(payload, this.$store.getters.getAccessToken).then(response => {
                    if(response.data.success){
                        this.annoucement = response.data.data;
                        this.acknowledge_by_data = response.data.acknowledge_by_data;
                        this.acknowledge_by_info = response.data.acknowledge_by_info;
                        this.acknowledge_by = response.data.data.acknowledge_by;
                    }
                }).catch(error => console.log(error));
            },
            employeelistacknowledgebyemployee(){
                this.AcknowledgebyEmployee()
                this.announcementdialog = false;
            }
        }
    }
</script>

<style scoped>
.scrollable {
   overflow-y: scroll;
}
.yaxis_lg {
  position: relative;
  bottom: 220px;
}

.yaxis_sm {
  position: relative;
  bottom: 210px;
}
</style>