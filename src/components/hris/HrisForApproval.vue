<template>
    <v-container style="max-width: 95%; position: relative;">
        <v-row>
            <v-col cols="12">
                <v-card
                    :loading="loading"
                >
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
                                        v-model="menusss"
                                        :close-on-content-click="false"
                                        :nudge-width="100"
                                        offset-y
                                        >
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-btn
                                                color="orange"
                                                dark
                                                v-bind="attrs"
                                                v-on="on"
                                                >
                                                <v-icon>mdi-file-sign</v-icon>List & For Approval
                                                </v-btn>
                                            </template>
                                            <v-card> 
                                                <br>
                                                <v-list>
                                                    <v-list-item>
                                                        <v-combobox
                                                            v-model="ForAppTab"
                                                            :items="forapprovalorlist"
                                                            label="Type"
                                                            dense
                                                            outlined
                                                            color="orange"
                                                            @change="changelistapproval(ForAppTab, ApprovalTab)"
                                                        ></v-combobox>
                                                    </v-list-item>
                                                    <v-list-item>
                                                        <v-combobox
                                                            v-model="ApprovalTab"
                                                            :items="itemmodule"
                                                            label="Request"
                                                            dense
                                                            outlined
                                                            color="orange"
                                                            @change="changelistapproval(ForAppTab, ApprovalTab)"
                                                        ></v-combobox>
                                                    </v-list-item>
                                                </v-list>
                                            </v-card>
                                        </v-menu>
                                    </div>
                                </template>

                                <template  v-if="$vuetify.breakpoint.smAndDown">
                                    <div class="text-center">
                                        <v-menu
                                        v-model="menusss"
                                        :close-on-content-click="false"
                                        :nudge-width="100"
                                        offset-y
                                        >
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-btn
                                                color="orange"
                                                dark
                                                v-bind="attrs"
                                                v-on="on"
                                                >
                                                <v-icon>mdi-file-sign</v-icon>
                                                </v-btn>
                                            </template>

                                            <v-card>
                                                <b>List & For Approval</b>
                                                <v-list>
                                                    <v-list-item>
                                                        <v-combobox
                                                            v-model="ForAppTab"
                                                            :items="forapprovalorlist"
                                                            label="Type"
                                                            dense
                                                            outlined
                                                            color="orange"
                                                            @change="changelistapproval(ForAppTab, ApprovalTab)"
                                                        ></v-combobox>
                                                    </v-list-item>
                                                    <v-list-item>
                                                        <v-combobox
                                                            v-model="ApprovalTab"
                                                            :items="itemmodule"
                                                            label="Request"
                                                            dense
                                                            outlined
                                                            color="orange"
                                                            @change="changelistapproval(ForAppTab, ApprovalTab)"
                                                        ></v-combobox>
                                                    </v-list-item>

                                                </v-list>

                                            </v-card>
                                        </v-menu>
                                    </div>
                                </template>

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
                                                    <ul v-if="ForAppTab == 'For Approval' && ApprovalTab == 'Leave'">
                                                        <div v-for="(item, index) in headersfaleave" :key="index">
                                                            <input type="checkbox" :id="item.text" :value="item" v-model="selectedHeadersfaleave">
                                                            &nbsp;<label :for="item.text">{{item.text}}</label>
                                                        </div>
                                                    </ul>
                                                    <ul v-if="ForAppTab == 'For Approval' && ApprovalTab == 'Overtime'">
                                                        <div v-for="(item, index) in headersfaovertime" :key="index">
                                                            <input type="checkbox" :id="item.text" :value="item" v-model="selectedHeadersfaovertime">
                                                            &nbsp;<label :for="item.text">{{item.text}}</label>
                                                        </div>
                                                    </ul>
                                                    <ul v-if="ForAppTab == 'For Approval' && ApprovalTab == 'Official Business'">
                                                        <div v-for="(item, index) in headersfaob" :key="index">
                                                            <input type="checkbox" :id="item.text" :value="item" v-model="selectedHeadersfaob">
                                                            &nbsp;<label :for="item.text">{{item.text}}</label>
                                                        </div>
                                                    </ul>
                                                    <ul v-if="ForAppTab == 'For Approval' && ApprovalTab == 'Undertime'">
                                                        <div v-for="(item, index) in headersfaut" :key="index">
                                                            <input type="checkbox" :id="item.text" :value="item" v-model="selectedHeadersfaut">
                                                            &nbsp;<label :for="item.text">{{item.text}}</label>
                                                        </div>
                                                    </ul>
                                                    
                                                    <ul v-if="ForAppTab == 'List' && ApprovalTab == 'Leave'">
                                                        <div v-for="(item, index) in headerslileave" :key="index">
                                                            <input type="checkbox" :id="item.text" :value="item" v-model="selectedHeaderslileave">
                                                            &nbsp;<label :for="item.text">{{item.text}}</label>
                                                        </div>
                                                    </ul>
                                                    <ul v-if="ForAppTab == 'List' && ApprovalTab == 'Overtime'">
                                                        <div v-for="(item, index) in headersliot" :key="index">
                                                            <input type="checkbox" :id="item.text" :value="item" v-model="selectedHeadersliot">
                                                            &nbsp;<label :for="item.text">{{item.text}}</label>
                                                        </div>
                                                    </ul>
                                                    <ul v-if="ForAppTab == 'List' && ApprovalTab == 'Official Business'">
                                                        <div v-for="(item, index) in headersliob" :key="index">
                                                            <input type="checkbox" :id="item.text" :value="item" v-model="selectedHeadersliob">
                                                            &nbsp;<label :for="item.text">{{item.text}}</label>
                                                        </div>
                                                    </ul>
                                                    <ul v-if="ForAppTab == 'List' && ApprovalTab == 'Undertime'">
                                                        <div v-for="(item, index) in headersliut" :key="index">
                                                            <input type="checkbox" :id="item.text" :value="item" v-model="selectedHeadersliut">
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
                                                &nbsp;&nbsp;
                                            <b>Column</b>
                                                <v-list>
                                                    <ul v-if="ForAppTab == 'For Approval' && ApprovalTab == 'Leave'">
                                                        <div v-for="(item, index) in headersfaleave" :key="index">
                                                            <input type="checkbox" :id="item.text" :value="item" v-model="selectedHeadersfaleave">
                                                            &nbsp;<label :for="item.text">{{item.text}}</label>
                                                        </div>
                                                    </ul>
                                                    <ul v-if="ForAppTab == 'For Approval' && ApprovalTab == 'Overtime'">
                                                        <div v-for="(item, index) in headersfaovertime" :key="index">
                                                            <input type="checkbox" :id="item.text" :value="item" v-model="selectedHeadersfaovertime">
                                                            &nbsp;<label :for="item.text">{{item.text}}</label>
                                                        </div>
                                                    </ul>
                                                    <ul v-if="ForAppTab == 'For Approval' && ApprovalTab == 'Official Business'">
                                                        <div v-for="(item, index) in headersfaob" :key="index">
                                                            <input type="checkbox" :id="item.text" :value="item" v-model="selectedHeadersfaob">
                                                            &nbsp;<label :for="item.text">{{item.text}}</label>
                                                        </div>
                                                    </ul>
                                                    <ul v-if="ForAppTab == 'For Approval' && ApprovalTab == 'Undertime'">
                                                        <div v-for="(item, index) in headersfaut" :key="index">
                                                            <input type="checkbox" :id="item.text" :value="item" v-model="selectedHeadersfaut">
                                                            &nbsp;<label :for="item.text">{{item.text}}</label>
                                                        </div>
                                                    </ul>
                                                    
                                                    <ul v-if="ForAppTab == 'List' && ApprovalTab == 'Leave'">
                                                        <div v-for="(item, index) in headerslileave" :key="index">
                                                            <input type="checkbox" :id="item.text" :value="item" v-model="selectedHeaderslileave">
                                                            &nbsp;<label :for="item.text">{{item.text}}</label>
                                                        </div>
                                                    </ul>
                                                    <ul v-if="ForAppTab == 'List' && ApprovalTab == 'Overtime'">
                                                        <div v-for="(item, index) in headersliot" :key="index">
                                                            <input type="checkbox" :id="item.text" :value="item" v-model="selectedHeadersliot">
                                                            &nbsp;<label :for="item.text">{{item.text}}</label>
                                                        </div>
                                                    </ul>
                                                    <ul v-if="ForAppTab == 'List' && ApprovalTab == 'Official Business'">
                                                        <div v-for="(item, index) in headersliob" :key="index">
                                                            <input type="checkbox" :id="item.text" :value="item" v-model="selectedHeadersliob">
                                                            &nbsp;<label :for="item.text">{{item.text}}</label>
                                                        </div>
                                                    </ul>
                                                    <ul v-if="ForAppTab == 'List' && ApprovalTab == 'Undertime'">
                                                        <div v-for="(item, index) in headersliut" :key="index">
                                                            <input type="checkbox" :id="item.text" :value="item" v-model="selectedHeadersliut">
                                                            &nbsp;<label :for="item.text">{{item.text}}</label>
                                                        </div>
                                                    </ul>
                                                </v-list>
                                            </v-card>
                                        </v-menu>
                                    </div>
                                </template>
                            </v-toolbar>
                        </template>
                        <!-- One liner filtering -->  
                        <v-row justify="center">
                            <v-col cols="13">
                                <!-- Data table for Approval -->  
                                <template v-if="ForAppTab=='For Approval'">
                                    <!-- Data table for Approval Leave-->  
                                    <v-row justify="center" v-if="ApprovalTab=='Leave'">
                                        <v-col cols="12">
                                            <br>
                                            <v-data-table
                                            id="showselectcheckbox"
                                            v-model="selected"
                                            :headers="showHeadersfaleave"
                                            :search="search"
                                            :items="leavedata"
                                            show-select
                                            :page.sync="page"
                                            must-sort
                                            :sort-by.sync="sortByleave"
                                            :sort-desc.sync="sortDescleave"
                                            @page-count="pageCount = $event"
                                            :footer-props="{
                                            'items-per-page-options':[10],
                                            'disable-items-per-page': true,
                                            }">

                                                <template v-slot:item.emp_id="props">
                                                    {{ props.item.created_info.id}}
                                                </template>

                                                <template v-slot:item.user_id="props">
                                                    {{ props.item.created_info != null ? props.item.created_info.personal_information.lastname + ' , ' + props.item.created_info.personal_information.firstname : 'No Data' }}
                                                </template>

                                                <template v-slot:item.leave_type_id="props">
                                                    {{ props.item.leave_type_info.name }}
                                                </template>

                                                <template v-slot:item.time_in="props">
                                                    {{ moment(props.item.time_in, 'hh:mm A').format('hh:mm A')}}
                                                </template>
                                                
                                                <template v-slot:item.time_out="props">
                                                    {{ moment(props.item.time_out, 'hh:mm A').format('hh:mm A') }}
                                                </template>
                                                
                                                <template v-slot:item.is_emergency="props" align="center">
                                                    <v-checkbox 
                                                        v-model="props.item.is_emergency"
                                                        color="orange"
                                                        v-if="props.item.is_emergency == 1"
                                                        readonly
                                                    ></v-checkbox>
                                                    <v-checkbox
                                                        v-model="props.item.is_emergency"
                                                        color="orange"
                                                        v-else
                                                        readonly
                                                    ></v-checkbox>
                                                </template>

                                                <template v-slot:item.with_pay="props" align="center">
                                                    <v-checkbox
                                                        v-model="props.item.with_pay"
                                                        color="orange"
                                                        v-if="props.item.with_pay == 1"
                                                        readonly
                                                    ></v-checkbox>
                                                    <v-checkbox
                                                        v-model="props.item.with_pay"
                                                        color="orange"
                                                        v-else
                                                        readonly
                                                    ></v-checkbox>
                                                </template>

                                                <template v-slot:item.is_wholeday="props" align="center">
                                                    <template>
                                                        <v-checkbox
                                                            v-model="props.item.is_wholeday"
                                                            color="orange"
                                                            v-if="props.item.is_wholeday == 1"
                                                            readonly
                                                        ></v-checkbox>
                                                        <v-checkbox
                                                            v-model="props.item.is_wholeday"
                                                            color="orange"
                                                            v-else
                                                            readonly
                                                        ></v-checkbox>
                                                    </template>
                                                </template>

                                                <template v-slot:item.status="props">
                                                    <v-chip
                                                        class="ma-2"
                                                        color="blue"
                                                        outlined
                                                        v-if="props.item.status == '1'"
                                                    >
                                                        Pending
                                                    </v-chip>
                                                    <v-chip
                                                        class="ma-2"
                                                        color="success"
                                                        outlined
                                                        v-else-if="props.item.status == '2'"
                                                    >
                                                        Approved
                                                    </v-chip>
                                                    <v-chip
                                                        class="ma-2"
                                                        color="red"
                                                        outlined
                                                        v-else-if="props.item.status == '3'"
                                                    >
                                                        Disapproved
                                                    </v-chip>
                                                    <v-chip
                                                        class="ma-2"
                                                        color="red"
                                                        outlined
                                                        v-else
                                                    >
                                                        Cancel
                                                    </v-chip>
                                                </template>

                                                <template v-slot:item.approved_user_id="props">
                                                    {{ props.item.approver_info != null ? props.item.approver_info.personal_information.lastname + ' , ' + props.item.approver_info.personal_information.firstname : 'No Data' }}
                                                </template>
                                                
                                                <template v-slot:footer>
                                                    <v-row class="pa-5">
                                                        <v-col>
                                                            <v-btn
                                                                elevation="2"
                                                                dark
                                                                block
                                                                small
                                                                outlined
                                                                color="red"
                                                                v-if="$store.getters.valAccess(152)"
                                                                @click="changeStatusDialogApproveDisapprove(true, 'disapprove', 'leave')"
                                                                >
                                                                Disapprove
                                                            </v-btn>
                                                        </v-col>                                          
                                                        <v-col>
                                                            <v-btn
                                                                elevation="2"
                                                                class="mx-2"
                                                                dark
                                                                block
                                                                small
                                                                outlined
                                                                color="orange"
                                                                v-if="$store.getters.valAccess(151)"
                                                                @click="changeStatusDialogApproveDisapprove(true, 'approve', 'leave')"
                                                                >
                                                                Approve
                                                            </v-btn>
                                                        </v-col>                                                          
                                                    </v-row>
                                                </template>
                                            </v-data-table>
                                            <v-pagination
                                                color="orange"
                                                v-model="page"
                                                :length="pageCount"
                                            ></v-pagination>       
                                        </v-col>
                                    </v-row>    
                                    <!-- Data table for Approval Leave-->  
                                    
                                    <!-- Data table for Approval Overtime-->  
                                    <v-row justify="center" v-if="ApprovalTab=='Overtime'">
                                        <v-col cols="12">
                                            <br>
                                            <v-data-table
                                            id="showselectcheckbox"
                                            v-model="overtimeselected"
                                            :headers="showHeadersfaovertime"
                                            :search="search"
                                            :items="overtimedata"
                                            :page.sync="page"
                                            @page-count="pageCount = $event"
                                            must-sort
                                            :sort-by.sync="sortByot"
                                            :sort-desc.sync="sortDescot"
                                            :footer-props="{
                                            'items-per-page-options':[10],
                                            'disable-items-per-page': true,
                                            }"                        
                                            show-select
                                            >
                                                <template v-slot:item.emp_id="props">
                                                    {{ props.item.created_info.id}}
                                                </template>
                                                
                                                <template v-slot:item.user_id="props">
                                                    {{ props.item.created_info != null ? props.item.created_info.personal_information.lastname + ' , ' + props.item.created_info.personal_information.firstname : 'No Data' }}
                                                </template>

                                                <template v-slot:item.leave_type_id="props">
                                                    {{ props.item.leave_type_info.name }}
                                                </template>
                                            
                                                <template v-slot:item.is_emergency="props" align="center">
                                                    <v-checkbox 
                                                        v-model="props.item.is_emergency"
                                                        color="orange"
                                                        v-if="props.item.is_emergency == 1"
                                                        readonly
                                                    ></v-checkbox>
                                                    <v-checkbox
                                                        v-model="props.item.is_emergency"
                                                        color="orange"
                                                        v-else
                                                        readonly
                                                    ></v-checkbox>
                                                </template>

                                                <template v-slot:item.is_following="props" align="center">
                                                    <template>
                                                        <v-checkbox 
                                                            v-model="props.item.is_following"
                                                            color="orange"
                                                            v-if="props.item.is_following == 1"
                                                            readonly
                                                        ></v-checkbox>
                                                        <v-checkbox
                                                            v-model="props.item.is_following"
                                                            color="orange"
                                                            v-else
                                                            readonly
                                                        ></v-checkbox>
                                                    </template>
                                                </template>

                                                <template v-slot:item.start_time="props">
                                                    {{ moment(props.item.start_time, 'hh:mm A').format('hh:mm A')}}
                                                </template>
                                                
                                                <template v-slot:item.end_time="props">
                                                    {{ moment(props.item.end_time, 'hh:mm A').format('hh:mm A') }}
                                                </template>

                                                <template v-slot:item.with_pay="props" align="center">
                                                    <v-checkbox
                                                        v-model="props.item.with_pay"
                                                        color="orange"
                                                        v-if="props.item.with_pay == 1"
                                                        readonly
                                                    ></v-checkbox>
                                                    <v-checkbox
                                                        v-model="props.item.with_pay"
                                                        color="orange"
                                                        v-else
                                                        readonly
                                                    ></v-checkbox>
                                                </template>

                                                <template v-slot:item.status="props">
                                                    <v-chip
                                                        class="ma-2"
                                                        color="blue"
                                                        outlined
                                                        v-if="props.item.status == '1'"
                                                    >
                                                        Pending
                                                    </v-chip>
                                                    <v-chip
                                                        class="ma-2"
                                                        color="success"
                                                        outlined
                                                        v-else-if="props.item.status == '2'"
                                                    >
                                                        Approved
                                                    </v-chip>
                                                    <v-chip
                                                        class="ma-2"
                                                        color="red"
                                                        outlined
                                                        v-else-if="props.item.status == '3'"
                                                    >
                                                        Disapproved
                                                    </v-chip>
                                                    <v-chip
                                                        class="ma-2"
                                                        color="red"
                                                        v-else
                                                    >
                                                        Cancel
                                                    </v-chip>
                                                </template>

                                                <template v-slot:item.approved_user_id="props">
                                                    {{ props.item.approver_info != null ? props.item.approver_info.personal_information.lastname + ' , ' + props.item.approver_info.personal_information.firstname : 'No Data' }}
                                                </template>
                                            
                                                <template v-slot:footer>
                                                    <v-row class="pa-5">
                                                        <v-col>
                                                            <v-btn
                                                                elevation="2"
                                                                dark
                                                                block
                                                                small
                                                                outlined
                                                                color="red"
                                                                v-if="$store.getters.valAccess(152)"
                                                                @click="changeStatusDialogApproveDisapprove(true, 'disapprove', 'overtime')"
                                                                >
                                                                Disapprove
                                                            </v-btn>
                                                        </v-col>                                          
                                                        <v-col>
                                                            <v-btn
                                                                elevation="2"
                                                                class="mx-2"
                                                                dark
                                                                block
                                                                small
                                                                outlined
                                                                color="orange"
                                                                v-if="$store.getters.valAccess(151)"
                                                                @click="changeStatusDialogApproveDisapprove(true, 'approve', 'overtime')"
                                                                >
                                                                Approve
                                                            </v-btn>
                                                        </v-col>                                            
                                                    </v-row>
                                                </template>
                                            </v-data-table>
                                            <v-pagination
                                            color="orange"
                                            v-model="page"
                                            :length="pageCount"
                                            ></v-pagination>           
                                        </v-col>
                                    </v-row>    
                                    <!-- Data table for Approval Overime-->  

                                    <!-- Data table for Approval Official Business-->  
                                    <v-row justify="center" v-if="ApprovalTab=='Official Business'">
                                        <v-col cols="12">
                                            <br>
                                            <v-data-table
                                            id="showselectcheckbox"
                                            v-model="officialbusinessselected"
                                            :headers="showHeadersfaob"
                                            :search="search"
                                            :items="officialbusinessdata"
                                            :page.sync="page"
                                            must-sort
                                            :sort-by.sync="sortByob"
                                            :sort-desc.sync="sortDescob"
                                            @page-count="pageCount = $event"
                                            :footer-props="{
                                            'items-per-page-options':[10],
                                            'disable-items-per-page': true,
                                            }"                         
                                            show-select
                                            >
                                                <template v-slot:item.emp_id="props">
                                                    {{ props.item.created_info.id}}
                                                </template>
                                                
                                                <template v-slot:item.user_id="props">
                                                    {{ props.item.created_info != null ? props.item.created_info.personal_information.lastname + ' , ' + props.item.created_info.personal_information.firstname : 'No Data' }}
                                                </template>

                                                <template v-slot:item.time_in="props">
                                                    {{ moment(props.item.time_in, 'hh:mm A').format('hh:mm A')}}
                                                </template>
                                                
                                                <template v-slot:item.time_out="props">
                                                    {{ moment(props.item.time_out, 'hh:mm A').format('hh:mm A') }}
                                                </template>

                                                <template v-slot:item.leave_type_id="props">
                                                    {{ props.item.leave_type_info.name }}
                                                </template>
                                                
                                                <template v-slot:item.is_emergency="props" align="center">
                                                    <v-checkbox 
                                                        v-model="props.item.is_emergency"
                                                        color="orange"
                                                        v-if="props.item.is_emergency == 1"
                                                        readonly
                                                    ></v-checkbox>
                                                    <v-checkbox
                                                        v-model="props.item.is_emergency"
                                                        color="orange"
                                                        v-else
                                                        readonly
                                                    ></v-checkbox>
                                                </template>

                                                <template v-slot:item.with_pay="props" align="center">
                                                    <v-checkbox
                                                        v-model="props.item.with_pay"
                                                        color="orange"
                                                        v-if="props.item.with_pay == 1"
                                                        readonly
                                                    ></v-checkbox>
                                                    <v-checkbox
                                                        v-model="props.item.with_pay"
                                                        color="orange"
                                                        v-else
                                                        readonly
                                                    ></v-checkbox>
                                                </template>

                                                <template v-slot:item.status="props">
                                                    <v-chip
                                                        class="ma-2"
                                                        color="blue"
                                                        outlined
                                                        v-if="props.item.status == '1'"
                                                    >
                                                        Pending
                                                    </v-chip>
                                                    <v-chip
                                                        class="ma-2"
                                                        color="success"
                                                        outlined
                                                        v-else-if="props.item.status == '2'"
                                                    >
                                                        Approved
                                                    </v-chip>
                                                    <v-chip
                                                        class="ma-2"
                                                        color="red"
                                                        outlined
                                                        v-else-if="props.item.status == '3'"
                                                    >
                                                        Disapproved
                                                    </v-chip>
                                                    <v-chip
                                                        class="ma-2"
                                                        color="red"
                                                        outlined
                                                        v-else
                                                    >
                                                        Cancel
                                                    </v-chip>
                                                </template>

                                                <template v-slot:item.approved_user_id="props">
                                                    {{ props.item.approver_info != null ? props.item.approver_info.personal_information.lastname + ' , ' + props.item.approver_info.personal_information.firstname : 'No Data' }}
                                                </template>
                                
                                                <template v-slot:footer>
                                                    <v-row class="pa-5">
                                                        <v-col>
                                                            <v-btn
                                                                elevation="2"
                                                                dark
                                                                block
                                                                small
                                                                outlined
                                                                color="red"
                                                                v-if="$store.getters.valAccess(152)"
                                                                @click="changeStatusDialogApproveDisapprove(true, 'disapprove', 'officialbusiness')"
                                                                >
                                                                Disapprove
                                                            </v-btn>
                                                        </v-col>                                          
                                                        <v-col>
                                                            <v-btn
                                                                elevation="2"
                                                                class="mx-2"
                                                                dark
                                                                block
                                                                small
                                                                outlined
                                                                color="orange"
                                                                v-if="$store.getters.valAccess(151)"
                                                                @click="changeStatusDialogApproveDisapprove(true, 'approve', 'officialbusiness')"
                                                                >
                                                                Approve
                                                            </v-btn>
                                                        </v-col>
                                                    </v-row>
                                                </template>
                                            </v-data-table>
                                            <v-pagination
                                                color="orange"
                                                v-model="page"
                                                :length="pageCount"
                                            ></v-pagination>   
                                        </v-col>
                                    </v-row> 
                                    <!-- Data table for Approval Official Business-->  
                
                                    <!-- Data table for Approval Undertime-->  
                                    <v-row justify="center" v-if="ApprovalTab=='Undertime'">
                                        <v-col cols="12">
                                            <br>
                                            <v-data-table
                                            id="showselectcheckbox"
                                            v-model="undertimeselected"
                                            :headers="showHeadersfaut"
                                            :search="search"
                                            :items="undertimedata"
                                            :page.sync="page"
                                            @page-count="pageCount = $event"
                                            must-sort
                                            :sort-by.sync="sortByut"
                                            :sort-desc.sync="sortDescut"
                                            :footer-props="{
                                            'items-per-page-options':[10],
                                            'disable-items-per-page': true,
                                            }"                          
                                            show-select
                                            >
                                                <template v-slot:item.emp_id="props">
                                                    {{ props.item.created_info.id}}
                                                </template>
                                                
                                                <template v-slot:item.user_id="props">
                                                    {{ props.item.created_info != null ? props.item.created_info.personal_information.lastname + ' , ' + props.item.created_info.personal_information.firstname : 'No Data' }}
                                                </template>

                                                <template v-slot:item.leave_type_id="props">
                                                    {{ props.item.leave_type_info.name }}
                                                </template>

                                                <template v-slot:item.time_in="props">
                                                    {{ moment(props.item.time_in, 'hh:mm A').format('hh:mm A')}}
                                                </template>
                                                
                                                <template v-slot:item.time_out="props">
                                                    {{ moment(props.item.time_out, 'hh:mm A').format('hh:mm A') }}
                                                </template>
                                                
                                                <template v-slot:item.is_emergency="props" align="center">
                                                    <v-checkbox 
                                                        v-model="props.item.is_emergency"
                                                        color="orange"
                                                        v-if="props.item.is_emergency == 1"
                                                        readonly
                                                    ></v-checkbox>
                                                    <v-checkbox
                                                        v-model="props.item.is_emergency"
                                                        color="orange"
                                                        v-else
                                                        readonly
                                                    ></v-checkbox>
                                                </template>

                                                <template v-slot:item.with_pay="props" align="center">
                                                    <v-checkbox
                                                        v-model="props.item.with_pay"
                                                        color="orange"
                                                        v-if="props.item.with_pay == 1"
                                                        readonly
                                                    ></v-checkbox>
                                                    <v-checkbox
                                                        v-model="props.item.with_pay"
                                                        color="orange"
                                                        v-else
                                                        readonly
                                                    ></v-checkbox>
                                                </template>

                                                <template v-slot:item.status="props">
                                                    <v-chip
                                                        class="ma-2"
                                                        color="blue"
                                                        outlined
                                                        v-if="props.item.status == '1'"
                                                    >
                                                        Pending
                                                    </v-chip>
                                                    <v-chip
                                                        class="ma-2"
                                                        color="success"
                                                        outlined
                                                        v-else-if="props.item.status == '2'"
                                                    >
                                                        Approved
                                                    </v-chip>
                                                    <v-chip
                                                        class="ma-2"
                                                        color="red"
                                                        outlined
                                                        v-else-if="props.item.status == '3'"
                                                    >
                                                        Disapproved
                                                    </v-chip>
                                                    <v-chip
                                                        class="ma-2"
                                                        color="red"
                                                        outlined
                                                        v-else
                                                    >
                                                        Cancel
                                                    </v-chip>
                                                </template>

                                                <template v-slot:item.approved_user_id="props">
                                                    {{ props.item.approver_info != null ? props.item.approver_info.personal_information.lastname + ' , ' + props.item.approver_info.personal_information.firstname : 'No Data' }}
                                                </template>
                                
                                                <template v-slot:footer>
                                                    <v-row class="pa-5">
                                                        <v-col>
                                                            <v-btn
                                                                elevation="2"
                                                                dark
                                                                block
                                                                small
                                                                outlined
                                                                color="red"
                                                                v-if="$store.getters.valAccess(152)"
                                                                @click="changeStatusDialogApproveDisapprove(true, 'disapprove', 'undertime')"
                                                                >
                                                                Disapprove
                                                            </v-btn>
                                                        </v-col>                                          
                                                        <v-col>
                                                            <v-btn
                                                                elevation="2"
                                                                class="mx-2"
                                                                dark
                                                                block
                                                                small
                                                                outlined
                                                                color="orange"
                                                                v-if="$store.getters.valAccess(151)"
                                                                @click="changeStatusDialogApproveDisapprove(true, 'approve', 'undertime')"
                                                                >
                                                                Approve
                                                            </v-btn>
                                                        </v-col>                                        
                                                    </v-row>
                                                </template>
                                            </v-data-table>
                                            <v-pagination
                                                color="orange"
                                                v-model="page"
                                                :length="pageCount"
                                            ></v-pagination>          
                                        </v-col>
                                    </v-row>
                                    <!-- Data table for Approval Undertime-->  
                                </template>
                                <!-- Data table for Approval -->  

                                <!-- Data table File List of Apporved / Disapproved and Cancel -->  
                                <template v-if="ForAppTab=='List'">
                                    <!-- Data table for List of Apporved / Disapproved and Cancel Leave-->  
                                    <v-row justify="center" v-if="ApprovalTab=='Leave'">
                                        <v-col cols="12">
                                            <br>
                                            <v-data-table
                                                v-model="selected"
                                                :search="search"
                                                :headers="showHeaderslileave"
                                                :items="leaveappdisdata"
                                                :page.sync="page"
                                                @page-count="pageCount = $event"
                                                must-sort
                                                :sort-by.sync="sortByleave"
                                                :sort-desc.sync="sortDescleave"
                                                :footer-props="{
                                                'items-per-page-options':[10],
                                                'disable-items-per-page': true,
                                                }"               
                                            >
                                                <template v-slot:item.emp_id="props">
                                                    {{ props.item.created_info.id}}
                                                </template>
                                                
                                                <template v-slot:item.user_id="props">
                                                    {{ props.item.created_info != null ? props.item.created_info.personal_information.lastname + ' , ' + props.item.created_info.personal_information.firstname : 'No Data' }}
                                                </template>
                    
                                                <template v-slot:item.leave_type_id="props">
                                                    {{ props.item.leave_type_info.name }}
                                                </template>

                                                <template v-slot:item.time_in="props">
                                                    {{ moment(props.item.time_in, 'hh:mm A').format('hh:mm A')}}
                                                </template>
                                                
                                                <template v-slot:item.time_out="props">
                                                    {{ moment(props.item.time_out, 'hh:mm A').format('hh:mm A') }}
                                                </template>
                                                
                                                <template v-slot:item.is_emergency="props" align="center">
                                                    <v-checkbox 
                                                        v-model="props.item.is_emergency"
                                                        color="orange"
                                                        v-if="props.item.is_emergency == 1"
                                                        readonly
                                                    ></v-checkbox>
                                                    <v-checkbox
                                                        v-model="props.item.is_emergency"
                                                        color="orange"
                                                        v-else
                                                        readonly
                                                    ></v-checkbox>
                                                </template>
                    
                                                <template v-slot:item.with_pay="props" align="center">
                                                    <v-checkbox
                                                        v-model="props.item.with_pay"
                                                        color="orange"
                                                        v-if="props.item.with_pay == 1"
                                                        readonly
                                                    ></v-checkbox>
                                                    <v-checkbox
                                                        v-model="props.item.with_pay"
                                                        color="orange"
                                                        v-else
                                                        readonly
                                                    ></v-checkbox>
                                                </template>

                                                <template v-slot:item.is_wholeday="props" align="center">
                                                    <template>
                                                        <v-checkbox
                                                            v-model="props.item.is_wholeday"
                                                            color="orange"
                                                            v-if="props.item.is_wholeday == 1"
                                                            readonly
                                                        ></v-checkbox>
                                                        <v-checkbox
                                                            v-model="props.item.is_wholeday"
                                                            color="orange"
                                                            v-else
                                                            readonly
                                                        ></v-checkbox>
                                                    </template>
                                                </template>
                    
                                                <template v-slot:item.status="props">
                                                    <v-chip
                                                        class="ma-2"
                                                        color="blue"
                                                        outlined
                                                        v-if="props.item.status == '1'"
                                                    >
                                                        Pending
                                                    </v-chip>
                                                    <v-chip
                                                        class="ma-2"
                                                        color="success"
                                                        outlined
                                                        v-else-if="props.item.status == '2'"
                                                    >
                                                        Approved
                                                    </v-chip>
                                                    <v-chip
                                                        class="ma-2"
                                                        color="red"
                                                        outlined
                                                        v-else-if="props.item.status == '3'"
                                                    >
                                                        Disapproved
                                                    </v-chip>
                                                    <v-chip
                                                        class="ma-2"
                                                        color="red"
                                                        outlined
                                                        v-else
                                                    >
                                                        Cancel
                                                    </v-chip>
                                                </template>
                    
                                                <template v-slot:item.approved_user_id="props">
                                                    {{ props.item.approver_info != null ? props.item.approver_info.personal_information.lastname + ' , ' + props.item.approver_info.personal_information.firstname : 'No Data' }}
                                                </template>
                                            </v-data-table>
                                            <v-pagination
                                                color="orange"
                                                v-model="page"
                                                :length="pageCount"
                                            ></v-pagination>       
                                        </v-col>
                                    </v-row>    
                                    <!-- Data table for List of Apporved / Disapproved and Cancel Leave--> 

                                    <!-- Data table for List of Apporved / Disapproved and Cancel Overtime--> 
                                    <v-row justify="center" v-if="ApprovalTab=='Overtime'">
                                        <v-col cols="12">
                                            <br>
                                            <v-data-table
                                            v-model="overtimeselected"
                                            :search="search"
                                            :headers="showHeadersliot"
                                            :items="overtimeappdisdata"
                                            :page.sync="page"
                                            @page-count="pageCount = $event"
                                            must-sort
                                            :sort-by.sync="sortByot"
                                            :sort-desc.sync="sortDescot"
                                            :footer-props="{
                                            'items-per-page-options':[10],
                                            'disable-items-per-page': true,
                                            }"                        
                                            >
                                                <template v-slot:item.emp_id="props">
                                                    {{ props.item.created_info.id}}
                                                </template>
                                                        
                                                <template v-slot:item.user_id="props">
                                                    {{ props.item.created_info != null ? props.item.created_info.personal_information.lastname + ' , ' + props.item.created_info.personal_information.firstname : 'No Data' }}
                                                </template>

                                                <template v-slot:item.leave_type_id="props">
                                                    {{ props.item.leave_type_info.name }}
                                                </template>
                                                        
                                                <template v-slot:item.is_emergency="props" align="center">
                                                    <v-checkbox 
                                                        v-model="props.item.is_emergency"
                                                        color="orange"
                                                        v-if="props.item.is_emergency == 1"
                                                        readonly
                                                    ></v-checkbox>
                                                    <v-checkbox
                                                        v-model="props.item.is_emergency"
                                                        color="orange"
                                                        v-else
                                                        readonly
                                                    ></v-checkbox>
                                                </template>

                                                <template v-slot:item.start_time="props">
                                                    {{ moment(props.item.start_time, 'hh:mm A').format('hh:mm A')}}
                                                </template>
                                                
                                                <template v-slot:item.end_time="props">
                                                    {{ moment(props.item.end_time, 'hh:mm A').format('hh:mm A') }}
                                                </template>

                                                <template v-slot:item.is_following="props" align="center">
                                                    <template>
                                                        <v-checkbox 
                                                            v-model="props.item.is_following"
                                                            color="orange"
                                                            v-if="props.item.is_following == 1"
                                                            readonly
                                                        ></v-checkbox>
                                                        <v-checkbox
                                                            v-model="props.item.is_following"
                                                            color="orange"
                                                            v-else
                                                            readonly
                                                        ></v-checkbox>
                                                    </template>
                                                </template>

                                                <template v-slot:item.with_pay="props" align="center">
                                                    <v-checkbox
                                                        v-model="props.item.with_pay"
                                                        color="orange"
                                                        v-if="props.item.with_pay == 1"
                                                        readonly
                                                    ></v-checkbox>
                                                    <v-checkbox
                                                        v-model="props.item.with_pay"
                                                        color="orange"
                                                        v-else
                                                        readonly
                                                    ></v-checkbox>
                                                </template>

                                                <template v-slot:item.status="props">
                                                    <v-chip
                                                        class="ma-2"
                                                        color="blue"
                                                        outlined
                                                        v-if="props.item.status == '1'"
                                                    >
                                                        Pending
                                                    </v-chip>
                                                    <v-chip
                                                        class="ma-2"
                                                        color="success"
                                                        outlined
                                                        v-else-if="props.item.status == '2'"
                                                    >
                                                        Approved
                                                    </v-chip>
                                                    <v-chip
                                                        class="ma-2"
                                                        color="red"
                                                        outlined
                                                        v-else-if="props.item.status == '3'"
                                                    >
                                                        Disapproved
                                                    </v-chip>
                                                    <v-chip
                                                        class="ma-2"
                                                        color="red"
                                                        outlined
                                                        v-else
                                                    >
                                                        Cancel
                                                    </v-chip>
                                                </template>

                                                <template v-slot:item.approved_user_id="props">
                                                    {{ props.item.approver_info != null ? props.item.approver_info.personal_information.lastname + ' , ' + props.item.approver_info.personal_information.firstname : 'No Data' }}
                                                </template>

                                            </v-data-table>
                                            <v-pagination
                                                color="orange"
                                                v-model="page"
                                                :length="pageCount"
                                            ></v-pagination>     
                                        </v-col>
                                    </v-row>    
                                    <!-- Data table for List of Apporved / Disapproved and Cancel Overtime--> 

                                    <!-- Data table for List of Apporved / Disapproved and Cancel Official Business--> 
                                    <v-row justify="center" v-if="ApprovalTab=='Official Business'">
                                        <v-col cols="12">
                                            <br>
                                            <v-data-table
                                                v-model="officialbusinessselected"
                                                :search="search"
                                                :headers="showHeadersliob"
                                                :items="officialbusinessappdisdata"
                                                :page.sync="page"
                                                @page-count="pageCount = $event"
                                                must-sort
                                                :sort-by.sync="sortByob"
                                                :sort-desc.sync="sortDescob"
                                                :footer-props="{
                                                'items-per-page-options':[10],
                                                'disable-items-per-page': true,
                                                }"                        
                                            >

                                                <template v-slot:item.emp_id="props">
                                                    {{ props.item.created_info.id}}
                                                </template>
                                                
                                                <template v-slot:item.user_id="props">
                                                    {{ props.item.created_info != null ? props.item.created_info.personal_information.lastname + ' , ' + props.item.created_info.personal_information.firstname : 'No Data' }}
                                                </template>

                                                <template v-slot:item.leave_type_id="props">
                                                    {{ props.item.leave_type_info.name }}
                                                </template>
                                                
                                                <template v-slot:item.is_emergency="props" align="center">
                                                    <v-checkbox 
                                                        v-model="props.item.is_emergency"
                                                        color="orange"
                                                        v-if="props.item.is_emergency == 1"
                                                        readonly
                                                    ></v-checkbox>
                                                    <v-checkbox
                                                        v-model="props.item.is_emergency"
                                                        color="orange"
                                                        v-else
                                                        readonly
                                                    ></v-checkbox>
                                                </template>

                                                <template v-slot:item.time_in="props">
                                                    {{ moment(props.item.time_in, 'hh:mm A').format('hh:mm A')}}
                                                </template>
                                                
                                                <template v-slot:item.time_out="props">
                                                    {{ moment(props.item.time_out, 'hh:mm A').format('hh:mm A') }}
                                                </template>

                                                <template v-slot:item.with_pay="props" align="center">
                                                    <v-checkbox
                                                        v-model="props.item.with_pay"
                                                        color="orange"
                                                        v-if="props.item.with_pay == 1"
                                                        readonly
                                                    ></v-checkbox>
                                                    <v-checkbox
                                                        v-model="props.item.with_pay"
                                                        color="orange"
                                                        v-else
                                                        readonly
                                                    ></v-checkbox>
                                                </template>

                                                <template v-slot:item.status="props">
                                                    <v-chip
                                                        class="ma-2"
                                                        color="blue"
                                                        outlined
                                                        v-if="props.item.status == '1'"
                                                    >
                                                        Pending
                                                    </v-chip>
                                                    <v-chip
                                                        class="ma-2"
                                                        color="success"
                                                        outlined
                                                        v-else-if="props.item.status == '2'"
                                                    >
                                                        Approved
                                                    </v-chip>
                                                    <v-chip
                                                        class="ma-2"
                                                        color="red"
                                                        outlined
                                                        v-else-if="props.item.status == '3'"
                                                    >
                                                        Disapproved
                                                    </v-chip>
                                                    <v-chip
                                                        class="ma-2"
                                                        color="red"
                                                        outlined
                                                        v-else
                                                    >
                                                        Cancel
                                                    </v-chip>
                                                </template>

                                                <template v-slot:item.approved_user_id="props">
                                                    {{ props.item.approver_info != null ? props.item.approver_info.personal_information.lastname + ' , ' + props.item.approver_info.personal_information.firstname : 'No Data' }}
                                                </template>

                                            </v-data-table>
                                            <v-pagination
                                            color="orange"
                                                v-model="page"
                                                :length="pageCount"
                                            ></v-pagination>          
                                        </v-col>
                                    </v-row>    
                                    <!-- Data table for List of Apporved / Disapproved and Cancel Official Business--> 

                                    <!-- Data table for List of Apporved / Disapproved and Cancel Undertime--> 
                                    <v-row justify="center" v-if="ApprovalTab=='Undertime'">
                                        <v-col cols="12">
                                            <br>
                                            <v-data-table
                                                v-model="undertimeselected"
                                                :search="search"
                                                :headers="showHeadersliut"
                                                :items="undertimeappdisdata"
                                                :page.sync="page"
                                                @page-count="pageCount = $event"
                                                must-sort
                                                :sort-by.sync="sortByut"
                                                :sort-desc.sync="sortDescut"
                                                :footer-props="{
                                                'items-per-page-options':[10],
                                                'disable-items-per-page': true,
                                                }"                      
                                            >
                                                <template v-slot:item.emp_id="props">
                                                    {{ props.item.created_info.id}}
                                                </template>
                                                
                                                <template v-slot:item.user_id="props">
                                                    {{ props.item.created_info != null ? props.item.created_info.personal_information.lastname + ' , ' + props.item.created_info.personal_information.firstname : 'No Data' }}
                                                </template>

                                                <template v-slot:item.leave_type_id="props">
                                                    {{ props.item.leave_type_info.name }}
                                                </template>
                                                
                                                <template v-slot:item.is_emergency="props" align="center">
                                                    <v-checkbox 
                                                        v-model="props.item.is_emergency"
                                                        color="orange"
                                                        v-if="props.item.is_emergency == 1"
                                                        readonly
                                                    ></v-checkbox>
                                                    <v-checkbox
                                                        v-model="props.item.is_emergency"
                                                        color="orange"
                                                        v-else
                                                        readonly
                                                    ></v-checkbox>
                                                </template>

                                                <template v-slot:item.time_in="props">
                                                    {{ moment(props.item.time_in, 'hh:mm A').format('hh:mm A')}}
                                                </template>
                                                
                                                <template v-slot:item.time_out="props">
                                                    {{ moment(props.item.time_out, 'hh:mm A').format('hh:mm A') }}
                                                </template>

                                                <template v-slot:item.with_pay="props" align="center">
                                                    <v-checkbox
                                                        v-model="props.item.with_pay"
                                                        color="orange"
                                                        v-if="props.item.with_pay == 1"
                                                        readonly
                                                    ></v-checkbox>
                                                    <v-checkbox
                                                        v-model="props.item.with_pay"
                                                        color="orange"
                                                        v-else
                                                        readonly
                                                    ></v-checkbox>
                                                </template>

                                                <template v-slot:item.status="props">
                                                    <v-chip
                                                        class="ma-2"
                                                        color="blue"
                                                        outlined
                                                        v-if="props.item.status == '1'"
                                                    >
                                                        Pending
                                                    </v-chip>
                                                    <v-chip
                                                        class="ma-2"
                                                        color="success"
                                                        outlined
                                                        v-else-if="props.item.status == '2'"
                                                    >
                                                        Approved
                                                    </v-chip>
                                                    <v-chip
                                                        class="ma-2"
                                                        color="red"
                                                        outlined
                                                        v-else-if="props.item.status == '3'"
                                                    >
                                                        Disapproved
                                                    </v-chip>
                                                    <v-chip
                                                        class="ma-2"
                                                        color="red"
                                                        outlined
                                                        v-else
                                                    >
                                                        Cancel
                                                    </v-chip>
                                                </template>

                                                <template v-slot:item.approved_user_id="props">
                                                    {{ props.item.approver_info != null ? props.item.approver_info.personal_information.lastname + ' , ' + props.item.approver_info.personal_information.firstname : 'No Data' }}
                                                </template>

                                            </v-data-table>
                                            <v-pagination
                                                color="orange"
                                                v-model="page"
                                                :length="pageCount"
                                            ></v-pagination>     
                                        </v-col>
                                    </v-row>   
                                    <!-- Data table for List of Apporved / Disapproved and Cancel Undertime--> 
                                </template>
                                <!-- Data table File List of Apporved / Disapproved and Cancel -->  
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>

        <!-- Dialog approved disapproved confirmation --> 
        <v-row justify="center">
            <v-dialog
            persistent :retain-focus="false"
            v-model="approvedisapprove"
            max-width="500"
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
                            v-model="updateapproverremarks"
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
                        @click="changeStatusDialogApproveDisapprove(false)"
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
                        @click="ApproveDisapproveLeave()"
                        >
                        Confirm
                    </v-btn>
                    </center>
                    <br>                      
                </v-card>
            </v-dialog>
        </v-row>
        <!-- Dialog approved disapproved confirmation --> 

        <!-- Dialog update remarks confirmation --> 
        <div class="text-center">
            <v-dialog
                v-model="updateremarksdialog"
                width="500"
            >
                <v-card>
                    <v-card-title class="text-h8 lighten-2">
                        Remarks
                    </v-card-title>
            
                    <v-textarea
                        solo
                        name="input-7-4"
                        v-model="updateremarksito"
                    ></v-textarea>
            
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            color="orange"
                            text
                            class="white--text"
                            @click="changeStatusDialogRemarks(false)"
                        >
                            Cancel
                        </v-btn>
                        <v-btn
                            color="orange"
                            text
                            class="white--text"
                            @click="confirmUpdate()"
                        >
                            Update
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </div>
        <!-- Dialog update remarks confirmation --> 

        <!-- Dialog approved disapproved confirmation --> 
        <v-row justify="center">
            <v-dialog
                persistent :retain-focus="false"
                v-model="approvedisapprovedconfirmation"
                max-width="290"
            >
                <v-card>
                    <v-card-title class="text-h5 text-uppercase">
                        {{this.appdis}}
                    </v-card-title>
                    <v-card-text>Are you sure you want to {{this.appdis}}?</v-card-text>
                    <center>
                    <v-btn
                        elevation="2"
                        class="mx-2"
                        dark
                        outlined
                        small
                        color="red"
                        @click="changeStatusDialogApproveDisApproveConfirmation(false)"
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
                        @click="ApproveDisapproveLeave()"
                        >
                        Confirm
                    </v-btn>
                    </center>
                    <br>
                </v-card>
            </v-dialog>
        </v-row>
        <!-- Dialog approved disapproved confirmation --> 
    </v-container>
</template>
    
<script>
    import leaveservice from '../services/leaveservice';
    import overtimeservices from '../services/overtimeservices';
    import officialbusinessservices from '../services/officialbusinessservices';
    import leavebalanceservices from '../services/leavebalanceservices';
    import undertimeservices from '../services/undertimeservices';
    
    export default {
        name: 'HrisForApproval',
        created(){
            this.FetchAllLeave();
            this.FetchAllOvertime();
            this.FetchAllUndertime();
            this.FetchAllOfficialBusiness();
            this.FetchAllDoneLeave();
            this.FetchAllDoneOvertime();
            this.FetchAllDoneUndertime();
            this.FetchAllDoneOfficialBusiness();
            this.$store.state.header = false;
            this.$store.state.footer = false;
            this.$store.state.snackbar.color = 'orange';
            this.headersfaleave = Object.values(this.headersMapfaleave);
            this.selectedHeadersfaleave = this.headersfaleave;
            this.headersfaovertime = Object.values(this.headersMapfaovertime);
            this.selectedHeadersfaovertime = this.headersfaovertime;
            this.headersfaob = Object.values(this.headersMapfaob);
            this.selectedHeadersfaob = this.headersfaob;
            this.headersfaut = Object.values(this.headersMapfaut);
            this.selectedHeadersfaut = this.headersfaut;
            this.headerslileave = Object.values(this.headersMaplileave);
            this.selectedHeaderslileave = this.headerslileave;
            this.headersliot = Object.values(this.headersMapliot);
            this.selectedHeadersliot = this.headersliot;
            this.headersliob = Object.values(this.headersMapliob);
            this.selectedHeadersliob = this.headersliob;
            this.headersliut = Object.values(this.headersMapliut);
            this.selectedHeadersliut = this.headersliut;
        },
        mounted(){
            this.$store.state.title = "For Approval";
        },
        computed: {
        //Done to get the ordered headers
        showHeadersfaleave () {
        return this.headersfaleave.filter(s => this.selectedHeadersfaleave.includes(s));
        },
        showHeadersfaovertime () {
        return this.headersfaovertime.filter(s => this.selectedHeadersfaovertime.includes(s));
        },
        showHeadersfaob () {
        return this.headersfaob.filter(s => this.selectedHeadersfaob.includes(s));
        },
        showHeadersfaut () {
        return this.headersfaut.filter(s => this.selectedHeadersfaut.includes(s));
        },
        showHeaderslileave () {
        return this.headerslileave.filter(s => this.selectedHeaderslileave.includes(s));
        },
        showHeadersliot () {
        return this.headersliot.filter(s => this.selectedHeadersliot.includes(s));
        },
        showHeadersliob () {
        return this.headersliob.filter(s => this.selectedHeadersliob.includes(s));
        },
        showHeadersliut () {
        return this.headersliut.filter(s => this.selectedHeadersliut.includes(s));
        }            
        },
        data: () => ({
            sortByut: 'target_date',
            sortDescut: true,
            sortByob: 'target_date',
            sortDescob: true,
            sortByot: 'start_date',
            sortDescot: true,
            sortByleave: 'start_date',
            sortDescleave: true,
            menusss: false,
            menucolumn: false,
            approvedisapprovedconfirmation: false,
            ForAppTab: "For Approval",
            ApprovalTab: "Overtime",
            page: 1,
            pageCount: 0,
            loading: false,
            filingmodule: '',
            listorapproval: '',
            itemmodule: ['Overtime', 'Leave', 'Official Business', 'Undertime'],
            forapprovalorlist: ['List','For Approval'],
            search: '',
            approvedisapprovetablelabel: '',
            selected: [],
            date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            dialog: false,
            editable: false,
            fullscreendialog: false,
            errordialog: false,
            updateremarksdialog: false,
            approvedisapprove: false,
            appdis: '',
            approvaldisapprovetriger: '',
            leave: {
                start_date: '',
                end_date: '',
                days_count: '',
                leave_type_id: '',
                actual_balance: '',
                current_balance: '',
                time_in: '',
                time_out: '',
                is_emergency: '',
                reason: '',
                approved_user_id: '',
                approval_at: '',
                status: '',
                with_pay: '',
                user_id: '',
            },
            leavedata: [],
            leaveappdisdata:[],
            leavetypedata: [],
            leavetypecombobox: [],
            editconfirmation: false,
            errormessage:{
                message:''
            },
            headersfaleave:[],
            selectedHeadersfaleave: [],
            headersMapfaleave: [
            { text: 'Last Name', value: 'created_info.personal_information.lastname' ,width: '130px'}, // Employee Last Name
            { text: 'First Name', value: 'created_info.personal_information.firstname' ,width: '130px'}, // Employee Last Name
            { text: 'Start Date', value: 'start_date',width: '110px' },
            { text: 'End Date', value: 'end_date',width: '105px',sortable:false },
            { text: 'Days Count', value: 'days_count',sortable:false },
            { text: 'Leave Type', value: 'leave_type_id',width: '115px',sortable:false  },
            { text: 'Current Balance', value: 'current_balance',sortable:false }, // Current Balance
            { text: 'Emergency', value: 'is_emergency',sortable:false },
            { text: 'With Pay', value: 'with_pay',sortable:false },
            { text: 'Whole Day', value: 'is_wholeday' ,sortable:false},
            { text: 'Reason', value: 'reason',sortable:false },
            { text: 'Status', value: 'status',sortable:false },
            ],
            headerslileave:[],
            selectedHeaderslileave: [],
            headersMaplileave: [
            { text: 'Last Name', value: 'created_info.personal_information.lastname',width: '130px'}, // Employee Last Name
            { text: 'First Name', value: 'created_info.personal_information.firstname',width: '130px'}, // Employee Last Name
            { text: 'Start Date', value: 'start_date',width: '110px' },
            { text: 'End Date', value: 'end_date',width: '105px',sortable:false },
            { text: 'Days Count', value: 'days_count',sortable:false  },
            { text: 'Leave Type', value: 'leave_type_id',width: '115px',sortable:false },
            { text: 'Current Balance', value: 'current_balance',sortable:false }, // Current Balance
            { text: 'Emergency', value: 'is_emergency',sortable:false },
            { text: 'With Pay', value: 'with_pay',sortable:false },
            { text: 'Whole Day', value: 'is_wholeday',sortable:false },
            { text: 'Reason', value: 'reason' ,sortable:false},
            { text: 'Status', value: 'status',sortable:false },
            { text: 'Cancel Remark', value: 'remarks',sortable:false  },
            { text: 'Approver Remark', value: 'approver_remarks',sortable:false  },
            { text: 'Approver', value: 'approved_user_id' ,width: '130px',sortable:false },
            ],
            datestart: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            date1: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            ListApprovalTab: "leavelistapproval",
            updateremarksito: '',
            updateapproverremarks: '',
            overtimedata: [],
            headersfaovertime:[],
            selectedHeadersfaovertime: [],
            headersMapfaovertime: [
            { text: 'Last Name', value: 'created_info.personal_information.lastname',width: '130px'}, // Employee Last Name
            { text: 'First Name', value: 'created_info.personal_information.firstname',width: '130px'}, // Employee Last Name
            { text: 'Start Date', value: 'start_date',width: '110px' },   
            { text: 'Start Time', value: 'start_time'  ,width: '100px',sortable:false}, 
            { text: 'End Time', value: 'end_time'  ,width: '100px',sortable:false}, 
            { text: 'Hours Count', value: 'total_hour',sortable:false},
            { text: 'Work Credit', value: 'work_credit' ,width: '100px' ,sortable:false},
            { text: 'Reason', value: 'reason' ,sortable:false},
            { text: 'Status', value: 'status',sortable:false },
            ],
            headersliot:[],
            selectedHeadersliot: [],
            headersMapliot: [
            { text: 'Last Name', value: 'created_info.personal_information.lastname',width: '130px'}, // Employee Last Name
            { text: 'First Name', value: 'created_info.personal_information.firstname',width: '130px'}, // Employee Last Name
            { text: 'Start Date', value: 'start_date' ,width: '110px'},   
            { text: 'Start Time', value: 'start_time',sortable:false,width: '100px' }, 
            { text: 'End Time', value: 'end_time',sortable:false,width: '100px' }, 
            { text: 'Hours Count', value: 'total_hour',sortable:false},
            { text: 'Work Credit', value: 'work_credit',sortable:false,width: '100px' },
            { text: 'Reason', value: 'reason' ,sortable:false},
            { text: 'Status', value: 'status' ,sortable:false},
            { text: 'Cancel Remark', value: 'remarks' ,sortable:false },
            { text: 'Approver Remark', value: 'approver_remarks' ,sortable:false },
            { text: 'Approver', value: 'approved_user_id',width: '130px' ,sortable:false },
            ],
            overtimeselected: [],
            overtimeappdisdata: [],
            officialbusinessdata: [],
            headersfaob:[],
            selectedHeadersfaob: [],
            headersMapfaob: [
            { text: 'Last Name', value: 'created_info.personal_information.lastname',width: '130px'}, // Employee Last Name
            { text: 'First Name', value: 'created_info.personal_information.firstname',width: '130px'}, // Employee Last Name
            { text: 'Target Date', value: 'target_date',width: '115px' },   
            { text: 'Time In', value: 'time_in',width: '100px',sortable:false }, 
            { text: 'Time Out', value: 'time_out',width: '100px',sortable:false }, 
            { text: 'Reason', value: 'reason' ,sortable:false},
            { text: 'Status', value: 'status' ,sortable:false},
            ],
            headersliob:[],
            selectedHeadersliob: [],
            headersMapliob: [
            { text: 'Last Name', value: 'created_info.personal_information.lastname',width: '130px'}, // Employee Last Name
            { text: 'First Name', value: 'created_info.personal_information.firstname',width: '130px'}, // Employee Last Name
            { text: 'Target Date', value: 'target_date',width: '115px' },   
            { text: 'Time In', value: 'time_in',width: '100px',sortable:false }, 
            { text: 'Time Out', value: 'time_out',width: '100px',sortable:false }, 
            { text: 'Reason', value: 'reason' ,sortable:false},
            { text: 'Status', value: 'status',sortable:false },
            { text: 'Cancel Remark', value: 'remarks' ,sortable:false },
            { text: 'Approver Remark', value: 'approver_remarks',sortable:false  },
            { text: 'Approver', value: 'approved_user_id',width: '130px',sortable:false  },
            ],
            officialbusinessselected: [],
            officialbusinessappdisdata: [],
            undertimedata: [],
            headersfaut:[],
            selectedHeadersfaut: [],
            headersMapfaut: [
            { text: 'Last Name', value: 'created_info.personal_information.lastname',width: '130px'}, // Employee Last Name
            { text: 'First Name', value: 'created_info.personal_information.firstname',width: '130px'}, // Employee Last Name
            { text: 'Target Date', value: 'target_date',width: '115px'  },   
            { text: 'Time Out', value: 'time_out',width: '110px' ,sortable:false }, 
            { text: 'Reason', value: 'reason',sortable:false },
            { text: 'Status', value: 'status' ,sortable:false},
            ],
            headersliut:[],
            selectedHeadersliut: [],
            headersMapliut: [
            { text: 'Last Name', value: 'created_info.personal_information.lastname',width: '130px'}, // Employee Last Name
            { text: 'First Name', value: 'created_info.personal_information.firstname',width: '130px'}, // Employee Last Name
            { text: 'Target Date', value: 'target_date' ,width: '115px'},   
            { text: 'Time Out', value: 'time_out' ,width: '110px',sortable:false}, 
            { text: 'Reason', value: 'reason',sortable:false },
            { text: 'Status', value: 'status',sortable:false },
            { text: 'Cancel Remark', value: 'remarks',sortable:false  },
            { text: 'Approver Remark', value: 'approver_remarks',sortable:false  },
            { text: 'Approver', value: 'approved_user_id',width: '130px',sortable:false  },
            ],
            undertimeselected: [],
            undertimeappdisdata: [],
            }
        ),
        methods: {
            FetchAllLeave(){ // fetch all leave
                let payload = {
                    parent_id: this.$store.getters.getParentID
                };
                leaveservice.FetchAllLeave(payload, this.$store.getters.getAccessToken).then(response => {
                    if(response.data.success){
                        this.leavedata = response.data.data;
                    }
                }).catch(error => console.log(error));
            },
            FetchAllDoneLeave(){ // fetch all proccessed leave
                let payload = {
                    parent_id: this.$store.getters.getParentID
                };
                leaveservice.FetchAllDoneLeave(payload, this.$store.getters.getAccessToken).then(response => {
                    if(response.data.success){
                        this.leaveappdisdata = response.data.data;
                    }
                }).catch(error => console.log(error));
            },
            FetchAllLeaveViaUser(id){ // fetch all leave via user
                let payload = {
                    user_id: this.$store.getters.getParentID,
                    id : id
                };
                leaveservice.FetchAllLeaveViaUser(payload, this.$store.getters.getAccessToken).then(response => {
                    if(response.data.success){
                        this.leavedata = response.data.data;
                    }
                }).catch(error => console.log(error));
            },
            UpdateLeave(id, field, value, approval)
            {
                this.forUpdate = {
                    id: id,
                    field: field,
                    value: value,
                    approval: approval
                }
                this.editconfirmation = true
            },
            UpdateRemarks(id, field, value, approval)
            {
                this.forUpdate = {
                    id: id,
                    field: field,
                    value: value,
                    approval: approval
                }
                this.updateremarksdialog = true
            },
            confirmUpdate(){ // update leave
                if(this.forUpdate['approval'] == 'update'){
                    let payload = {
                        id: this.forUpdate['id'],
                        field: this.forUpdate['field'],
                        value: this.forUpdate['value']
                    }
                    leaveservice.UpdateLeave(payload, this.$store.getters.getAccessToken).catch(error =>{
                        this.errorDAW = error.response.data.message
                        this.$store.state.snackbar.message = error.response.data.message;
                        this.$store.state.snackbar.show = true;
                    });
                    this.$store.state.snackbar.message = 'Leave has been updated.';
                }
                else if(this.forUpdate['approval'] == 'cancel'){
                    let payload = {
                        id: this.forUpdate['id'],
                        field: this.forUpdate['field'],
                        value: this.forUpdate['value'],
                        remarks: this.updateremarksito
                    }
                    leaveservice.UpdateRemarks(payload, this.$store.getters.getAccessToken).catch(error =>{
                        this.errorDAW = error.response.data.message
                        this.$store.state.snackbar.message = error.response.data.message;
                        this.$store.state.snackbar.show = true;
                    });
                    this.updateremarksdialog = false
                    this.$store.state.snackbar.message = 'Leave has been cancelled.';
                }else{
                        let payload = {
                        id: this.forUpdate['id'],
                        field: this.forUpdate['field'],
                        value: this.forUpdate['value'],
                        approved_user_id: this.$store.getters.getUserID
                    }
                    leaveservice.UpdateApproveDisapprove(payload, this.$store.getters.getAccessToken).catch(error =>{
                        this.errorDAW = error.response.data.message
                        this.$store.state.snackbar.message = error.response.data.message;
                        this.$store.state.snackbar.show = true;
                    });
                    this.$store.state.snackbar.message = 'Leave has been updated.';
                }
            
                this.$store.state.snackbar.show = true;
                this.FetchAllLeaveViaUser(this.$store.getters.getUserID);
                this.editconfirmation = false
            },
            changeStatusDialogEdit(status){
                this.editconfirmation = status;
                this.FetchAllLeaveViaUser(this.$store.getters.getUserID);
            },
            changeStatusDialogApproveDisapprove(status, appdis, table){  // selection of leave , overtime , official business, undertime for ap
                this.approvedisapprovetablelabel = table;
                if(table == 'leave'){ // for leave
                    if(this.selected.length){
                    this.approvaldisapprovetriger = appdis
                    this.appdis= appdis;
                    this.approvedisapprove = status;
                    this.FetchAllLeave();
                    }else{
                        if(status){
                        this.$store.state.snackbar.colors = 'xyellow';
                            this.$store.state.snackbar.icon = "mdi-information-outline"; 
                        this.$store.state.snackbar.message = 'Please select at least one';
                        this.$store.state.snackbar.show = true;
                        }
                    }
                }
                else if(table == 'overtime'){ // for overtime
                    if(this.overtimeselected.length){
                        this.approvaldisapprovetriger = appdis
                        this.appdis= appdis;
                        this.approvedisapprove = status;
                        this.FetchAllOvertime();
                    }else{
                        if(status){
                            this.$store.state.snackbar.colors = 'xyellow';
                            this.$store.state.snackbar.icon = "mdi-information-outline"; 
                        this.$store.state.snackbar.message = 'Please select at least one';
                        this.$store.state.snackbar.show = true;
                        }
                    }
                }
                else if(table == 'officialbusiness'){ // for official business
                    if(this.officialbusinessselected.length){
                        this.approvaldisapprovetriger = appdis
                        this.appdis= appdis;
                        this.approvedisapprove = status;
                        this.FetchAllOfficialBusiness();
                    }else{
                        if(status){
                            this.$store.state.snackbar.colors = 'xyellow';
                            this.$store.state.snackbar.icon = "mdi-information-outline"; 
                        this.$store.state.snackbar.message = 'Please select at least one';
                        this.$store.state.snackbar.show = true;
                        }
                    }
                }
                else if(table == 'undertime'){ // for undertime
                    if(this.undertimeselected.length){
                        this.approvaldisapprovetriger = appdis
                        this.appdis= appdis;
                        this.approvedisapprove = status;
                        this.FetchAllUndertime();
                    }else{
                        if(status){
                            this.$store.state.snackbar.colors = 'xyellow';
                            this.$store.state.snackbar.icon = "mdi-information-outline"; 
                        this.$store.state.snackbar.message = 'Please select at least one';
                        this.$store.state.snackbar.show = true;
                        }
                    }
                }
                else{
                    this.updateapproverremarks = '';
                    this.approvedisapprove = status;
                }
            },
            changeStatusDialogRemarks(status){
                this.updateremarksdialog = status;
                this.updateremarksito = '';
                this.FetchAllLeave();
            },
            ClearLeaveType(){
                this.leave.start_date = ''
                this.leave.end_date = ''
                this.leave.days_count = ''
                this.leave.leave_type_id = ''
                this.leave.actual_balance = ''
                this.leave.current_balance = ''
                this.leave.time_in = ''
                this.leave.time_out = ''
                this.leave.is_emergency = ''
                this.leave.reason = ''
                this.leave.approved_user_id = ''
                this.leave.approval_at = ''
                this.leave.with_pay = ''
                this.leave.user_id = ''
            },
            UpdateCancelLeave(id, field, value, approval)
            {
                this.forUpdate = {
                    id: id,
                    field: field,
                    value: value,
                    approval: approval
                }
                this.editconfirmation = true
            },
            ApproveDisapproveLeave(){

                if(this.approvaldisapprovetriger  == 'approve'){
                    this.approvaldisapprovetriger = 2;
                }else{
                    this.approvaldisapprovetriger = 3;
                }

                if(this.approvedisapprovetablelabel == 'leave')
                {
                    console.log(this.selected);
                    this.selected.forEach((value) => {
                        if(value.id){
                            let payload = {
                            id: value.id,
                            field: 'status',
                            value: this.approvaldisapprovetriger,
                            approved_user_id: this.$store.getters.getUserID,
                            approver_remarks: this.updateapproverremarks
                            }
                            leaveservice.ApproveDisapproveLeave(payload, this.$store.getters.getAccessToken).then(response => {
                                    if(response.data.success){
                                        this.FetchAllLeave(); 
                                    }
                                }).catch(error =>{
                                this.errorDAW = error.response.data.message
                                this.$store.state.snackbar.colors = 'xred';
                                this.$store.state.snackbar.icon = "mdi-alert-outline";           
                                this.$store.state.snackbar.message = error.response.data.message;
                                this.$store.state.snackbar.show = true;
                            });
                            let payloads = {
                            user_id: this.$store.getters.getUserID,
                            parent_user_id: this.$store.getters.getParentID,
                            leave_type_id: value.leave_type_id,
                            days_count: value.days_count,
                            with_pay: value.with_pay,
                            }
                            leavebalanceservices.DeductApproveLeaveBalance(payloads, this.$store.getters.getAccessToken).catch(error =>{
                                this.$store.state.snackbar.colors = 'xred';
                                this.$store.state.snackbar.icon = "mdi-alert-outline";           
                                this.$store.state.snackbar.message = error.response.data.message;
                                this.$store.state.snackbar.show = true;
                            });
                        }
                    });
                    this.$store.state.snackbar.colors = 'xgreen';
                    this.$store.state.snackbar.icon = "mdi-check-circle-outline";                 
                    this.$store.state.snackbar.message = 'Approval record has been updated.';
                    this.$store.state.snackbar.show = true;
                    this.selected = [];
                    this.updateapproverremarks = '';
                    this.approvedisapprovedconfirmation = false;
                    this.approvedisapprove = false
                    this.FetchAllLeave(); 
                }
                else if(this.approvedisapprovetablelabel == 'overtime')
                {
                    this.overtimeselected.forEach((value) => {
                        if(value.id){
                            let payload = {
                            id: value.id,
                            field: 'status',
                            value: this.approvaldisapprovetriger,
                            approved_user_id: this.$store.getters.getUserID,
                            approver_remarks: this.updateapproverremarks,
                            parent_user_id : this.$store.getters.getParentID,
                            user_id : value.user_id,
                            total_hour : value.total_hour,
                            work_credit : value.work_credit,
                            }
                            overtimeservices.ApproveDisapproveOvertime(payload, this.$store.getters.getAccessToken).then(response => {
                                    if(response.data.success){
                                        this.FetchAllOvertime(); 
                                    }
                                }).catch(error =>{
                                this.$store.state.snackbar.colors = 'xred';
                        this.$store.state.snackbar.icon = "mdi-alert-outline";           
                                this.errorDAW = error.response.data.message
                                this.$store.state.snackbar.message = error.response.data.message;
                                this.$store.state.snackbar.show = true;
                            });
                        }
                    });
                    this.$store.state.snackbar.colors = 'xgreen';
                        this.$store.state.snackbar.icon = "mdi-check-circle-outline";                 
                    this.$store.state.snackbar.message = 'Approval record has been updated.';
                    this.$store.state.snackbar.show = true;
                    this.overtimeselected = [];
                    this.updateapproverremarks = '';
                    this.approvedisapprovedconfirmation = false;
                    this.approvedisapprove = false
                    this.FetchAllOvertime(); 
                }  
                else if(this.approvedisapprovetablelabel == 'officialbusiness')
                {
                    this.officialbusinessselected.forEach((value) => {
                        if(value.id){
                            let payload = {
                            id: value.id,
                            field: 'status',
                            value: this.approvaldisapprovetriger,
                            approved_user_id: this.$store.getters.getUserID,
                            approver_remarks: this.updateapproverremarks
                            }
                            officialbusinessservices.ApproveDisapproveOfficialBusiness(payload, this.$store.getters.getAccessToken).then(response => {
                                    if(response.data.success){
                                        this.FetchAllOfficialBusiness(); 
                                    }
                                }).catch(error =>{
                                this.$store.state.snackbar.colors = 'xred';
                        this.$store.state.snackbar.icon = "mdi-alert-outline";           
                                this.errorDAW = error.response.data.message
                                this.$store.state.snackbar.message = error.response.data.message;
                                this.$store.state.snackbar.show = true;
                            });
                        }
                    });
                    this.$store.state.snackbar.colors = 'xgreen';
                        this.$store.state.snackbar.icon = "mdi-check-circle-outline";                 
                    this.$store.state.snackbar.message = 'Approval record has been updated.';
                    this.$store.state.snackbar.show = true;
                    this.officialbusinessselected = [];
                    this.updateapproverremarks = '';
                    this.approvedisapprovedconfirmation = false;
                    this.approvedisapprove = false
                    this.FetchAllOfficialBusiness(); 
                }  
                else{
                    this.undertimeselected.forEach((value) => {
                        if(value.id){
                            let payload = {
                            id: value.id,
                            field: 'status',
                            value: this.approvaldisapprovetriger,
                            approved_user_id: this.$store.getters.getUserID,
                            approver_remarks: this.updateapproverremarks
                            }
                            undertimeservices.ApproveDisapproveUndertime(payload, this.$store.getters.getAccessToken).then(response => {
                                    if(response.data.success){
                                        this.FetchAllUndertime(); 
                                    }
                                }).catch(error =>{
                                this.errorDAW = error.response.data.message
                                this.$store.state.snackbar.message = error.response.data.message;
                                this.$store.state.snackbar.show = true;
                                this.$store.state.snackbar.colors = 'xgreen';
                        this.$store.state.snackbar.icon = "mdi-check-circle-outline";  
                            });
                        }
                    });
                    this.$store.state.snackbar.colors = 'xgreen';
                        this.$store.state.snackbar.icon = "mdi-check-circle-outline";                 
                    this.$store.state.snackbar.message = 'Approval record has been updated.';
                    this.$store.state.snackbar.show = true;
                    this.undertimeselected = [];
                    this.updateapproverremarks = '';
                    this.approvedisapprovedconfirmation = false;
                    this.approvedisapprove = false
                    this.FetchAllUndertime(); 
                }
            },
            FetchAllOvertime(){ // fetch all overtime
            let payload = {
                parent_id: this.$store.getters.getParentID
            };
                overtimeservices.FetchAllOvertime(payload, this.$store.getters.getAccessToken).then(response => {
                    if(response.data.success){
                        this.overtimedata = response.data.data;
                    }
                }).catch(error => console.log(error));
            },
            FetchAllDoneOvertime(){  // fetch all done overtime
                let payload = {
                    parent_id: this.$store.getters.getParentID
                };
                overtimeservices.FetchAllDoneOvertime(payload, this.$store.getters.getAccessToken).then(response => {
                    if(response.data.success){
                        this.overtimeappdisdata = response.data.data;
                    }
                }).catch(error => console.log(error));
            },
            FetchAllOfficialBusiness(){ // fetch all official business
            let payload = {
                parent_id: this.$store.getters.getParentID
            };
                officialbusinessservices.FetchAllOfficialBusiness(payload, this.$store.getters.getAccessToken).then(response => {
                    if(response.data.success){
                        this.officialbusinessdata = response.data.data;
                    }
                }).catch(error => console.log(error));
            },
            FetchAllDoneOfficialBusiness(){ // fetch all done official business
                let payload = {
                    parent_id: this.$store.getters.getParentID
                };
                officialbusinessservices.FetchAllDoneOfficialBusiness(payload, this.$store.getters.getAccessToken).then(response => {
                    if(response.data.success){
                        this.officialbusinessappdisdata = response.data.data;
                    }
                }).catch(error => console.log(error));
            },
            FetchAllUndertime(){ // fetch all undertime
            let payload = {
                parent_id: this.$store.getters.getParentID
            };
                undertimeservices.FetchAllUndertime(payload, this.$store.getters.getAccessToken).then(response => {
                    if(response.data.success){
                        this.undertimedata = response.data.data;
                    }
                }).catch(error => console.log(error));
            },
            FetchAllDoneUndertime(){ // fetch all done undertime
                let payload = {
                    parent_id: this.$store.getters.getParentID
                };
                undertimeservices.FetchAllDoneUndertime(payload, this.$store.getters.getAccessToken).then(response => {
                    if(response.data.success){
                        this.undertimeappdisdata = response.data.data;
                    }
                }).catch(error => console.log(error));
            },
            changelistapproval(ForAppTab, ApprovalTab){  // change of module (leave, overtime , official business, undertime)
                if(ForAppTab == 'List' && ApprovalTab == 'Leave'){
                    this.FetchAllLeave();
                }else if(ForAppTab == 'List' && ApprovalTab == 'Overtime'){
                    this.FetchAllOvertime();
                }else if(ForAppTab == 'List' && ApprovalTab == 'Undertime'){
                    this.FetchAllUndertime();
                }else if(ForAppTab == 'List' && ApprovalTab == 'Official Business'){
                    this.FetchAllOfficialBusiness();
                }else if(ForAppTab == 'For Approval' && ApprovalTab == 'Leave'){
                    this.FetchAllDoneLeave();
                }else if(ForAppTab == 'For Approval' && ApprovalTab == 'Overtime'){
                    this.FetchAllDoneOvertime();
                }else if(ForAppTab == 'For Approval' && ApprovalTab == 'Undertime'){
                    this.FetchAllDoneUndertime();
                }else{
                    this.FetchAllDoneOfficialBusiness();
                }
            },
            changeStatusDialogApproveDisApproveConfirmation(status){
                this.approvedisapprovedconfirmation = status
            }
        }
        }
    </script>

<style>
    input[type=checkbox] {
        accent-color: orange;
    }
    #showselectcheckbox .theme--light.v-icon {
        color: orange !important;
    }
</style>