<template>
  <v-container style="max-width: 95%; position: relative;" >
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
                      v-model="menus"
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
                        <v-icon>mdi-calendar</v-icon>Filter Date
                        </v-btn>
                      </template>
                      <v-card>
                        <v-list>
                          <v-list-item>
                            <v-radio-group v-model="radioGroup"  style="margin-top: ;5px">
                              <v-list-item 
                                  v-for="(item, index) in filterdate"
                                  :key="index">
                                  <v-radio
                                  color="orange"
                                  :label="`${item.text}`"
                                  :value="item.linktrigger"
                                  @click="rdbfilter(item.linktrigger)"
                                  ></v-radio>
                              </v-list-item>
                            </v-radio-group>
                          </v-list-item>
                          <hr>
                          <v-list-item>
                            <b>Custom Date</b>
                          </v-list-item>  
                          <v-list-item>
                            <v-menu
                              v-model="menu"
                              :close-on-content-click="false"
                              :nudge-left="40"
                              transition="scale-transition"
                              offset-y
                              min-width="auto"
                            >
                              <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                v-model="date_from"
                                label="Date From"
                                prepend-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                                color="orange"
                              ></v-text-field>
                              </template>
                              <v-date-picker
                                v-model="date_from"
                                @input="menu = false"
                                @change="getDates()"
                                color="orange"
                              ></v-date-picker>
                            </v-menu>
                          </v-list-item>
                          <v-list-item>
                            <v-menu
                                v-model="menu2"
                                :close-on-content-click="false"
                                :nudge-right="40"
                                transition="scale-transition"
                                offset-y
                                min-width="auto"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                    v-model="date_to"
                                    label="Date To"
                                    prepend-icon="mdi-calendar"
                                    readonly
                                    v-bind="attrs"
                                    v-on="on"
                                    color="orange"
                                ></v-text-field>
                                </template>
                                <v-date-picker
                                  v-model="date_to"
                                  @input="menu2 = false"
                                  @change="getDates()"
                                  color="orange"
                                ></v-date-picker>
                            </v-menu>
                          </v-list-item>
                        </v-list>
                        <v-divider></v-divider>
                      </v-card>
                    </v-menu>
                  </div>
                </template>

                <template  v-if="$vuetify.breakpoint.smAndDown">
                  <div class="text-center">
                    <v-menu
                      v-model="menus"
                      :close-on-content-click="false"
                      :nudge-width="150"
                      :nudge-left="1"
                      offset-y
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          color="orange"
                          dark
                          v-bind="attrs"
                          v-on="on"
                        >
                        <v-icon>mdi-calendar</v-icon>
                        </v-btn>
                      </template>

                      <v-card> 
                        <br>
                        &nbsp;&nbsp;
                        <b>Filter by date</b>
                        <v-list>
                            <v-list-item>
                              <v-radio-group v-model="radioGroup">
                                  <v-list-item 
                                      v-for="(item, index) in filterdate"
                                      :key="index">
                                      <v-radio
                                      color="orange"
                                      :label="`${item.text}`"
                                      :value="item.linktrigger"
                                      @click="rdbfilter(item.linktrigger)"
                                      ></v-radio>
                                  </v-list-item>
                              </v-radio-group>
                            </v-list-item>
                            <hr>
                            &nbsp;&nbsp;
                            <b>Custom Date</b>
                            <v-list-item>
                              <v-menu
                                v-model="menu"
                                :close-on-content-click="false"
                                :nudge-left="80"
                                transition="scale-transition"
                                offset-y
                                min-width="auto"
                              >
                                <template v-slot:activator="{ on, attrs }">
                                  <v-text-field
                                    v-model="date_from"
                                    label="Date From"
                                    prepend-icon="mdi-calendar"
                                    readonly
                                    v-bind="attrs"
                                    v-on="on"
                                    color="orange"
                                  ></v-text-field>
                                </template>
                                <v-date-picker
                                  v-model="date_from"
                                  @input="menu = false"
                                  @change="getDates()"
                                  color="orange"
                                ></v-date-picker>
                              </v-menu>
                            </v-list-item>
                            <v-list-item>
                              <v-menu
                                v-model="menu2"
                                :close-on-content-click="false"
                                :nudge-left="80"
                                transition="scale-transition"
                                offset-y
                                min-width="auto"
                              >
                                <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                    v-model="date_to"
                                    label="Date To"
                                    prepend-icon="mdi-calendar"
                                    readonly
                                    v-bind="attrs"
                                    v-on="on"
                                    color="orange"
                                ></v-text-field>
                                </template>
                                <v-date-picker
                                v-model="date_to"
                                @input="menu2 = false"
                                    @change="getDates()"
                                    color="orange"
                                ></v-date-picker>
                              </v-menu>
                            </v-list-item>
                          </v-list>
                        <v-divider></v-divider>
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
                        &nbsp;&nbsp;
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
                &nbsp;
              </v-toolbar>
            </template>
            <!-- One liner filtering -->  
            <template slot="progress">
                <v-progress-linear
                    color="deep-purple"
                    height="10"
                    indeterminate
                ></v-progress-linear>
            </template>
            <br>
            <!-- Time in time out Data table -->  
            <v-data-table
              :headers="showHeaders"
              :items="timeintimeoutdata"
              :search="search"
              :page.sync="page"
              @page-count="pageCount = $event"
              :footer-props="{
              showFirstLastPage: false,
              'items-per-page-options':[10],
              'disable-items-per-page': true
              }" 
              must-sort
              :sort-by.sync="sortBy"
              :sort-desc.sync="sortDesc"
            >

              <template v-slot:item.in="props">
                  {{  props.item.in != null ? moment(props.item.in).format("hh:mm A") : '' }}
              </template>

              <template v-slot:item.out="props">
                  {{ props.item.out != null ? moment(props.item.out).format("hh:mm A") : '' }}
              </template>

            </v-data-table>
            <!-- Time in time out Data table -->

            <v-pagination
              color="orange"
              v-model="page"
              :length="pageCount"
            ></v-pagination>        
  
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>  
</template>

<script>
  import timeintimeoutservices from '../services/timeintimeoutservices';
  import moment from 'moment';

  export default {
      name: 'Tito',
      data: () => ({
        hrisdata: 0,
        menu : false,
        menu2 : false,
        menus: false,
        radioGroup: [],
        filterdate: [{ text: 'Today', icon: 'mdi-elevator-down', linktrigger: 1 },
        { text: 'Last Day', icon: 'mdi-elevator-up', linktrigger: 2 },
        { text: 'Last 15 Days', icon: 'mdi-elevator', linktrigger: 3 },
        { text: 'Last 30 Days', icon: 'mdi-elevator', linktrigger: 4 }],
        date_from: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        date_to: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        menucolumn: false,
        sortBy: 'date',
        sortDesc: true,
        exportimport: [{ text: 'Upload', icon: 'mdi-upload-outline', linktrigger: 1 },
        { text: 'Download', icon: 'mdi-download-outline', linktrigger: 2 }],
        fordeletename: '',
        deleteconfirmation: false,
        valid:false,
        pageCount: 0,
        page: 1,
        headers:[],
        selectedHeaders: [],
        headersMap: [
        { text: 'Date',sortable: true, value: 'date' },
        { text: 'Time In',sortable: false, value: 'in' },
        { text: 'Time Out',sortable: false, value: 'out' }
        ],
        loading: false,
        search: '',
        timeintimeoutdata: [],
        titoheaders: [
        { text: 'Date',sortable: false, value: 'date' },
        { text: 'Time In',sortable: false, value: 'in' },
        { text: 'Time Out',sortable: false, value: 'out' }
        ],
      }),
      created(){
        this.hrisdata = localStorage.getItem('is_hris')
        if(this.hrisdata == 1){
          this.$store.state.header = false;
          this.$store.state.footer = false;
        }else{
          this.$store.state.header = true;
          this.$store.state.footer = true;
        }
        this.FetchAllTimeInTimeOutViaUser();
        this.headers = Object.values(this.headersMap);
        this.selectedHeaders = this.headers;
      },
      mounted(){
        this.$store.state.title = "Time in time out Information";
      },
      computed: {
        //Done to get the ordered headers
        showHeaders () {
        return this.headers.filter(s => this.selectedHeaders.includes(s));
        }
      },
      methods: {
        FetchAllTimeInTimeOutViaUser(){ // fetch time in time out via user id
          let payload = {
              user_id: this.$store.getters.getUserID,
              parent_user_id : this.$store.getters.getParentID,
          };
          timeintimeoutservices.FetchAllTimeInTimeOutViaUser(payload, this.$store.getters.getAccessToken).then(response => {
              if(response.data.success){
                  this.timeintimeoutdata = response.data.data;
                  console.log(this.timeintimeoutdata);
              }
          }).catch(error => console.log(error));
        },
        rdbfilter(id){
          if(id == 1){ // alert("Today");
            this.date_from = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)
            this.date_to = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)
            this.getDates();
          }else if(id == 2){ // alert("Yesterday");
            var fromdate = moment().subtract(1, 'day').toDate();
            this.date_from = moment(fromdate).format("YYYY-MM-DD");
            this.date_to = moment(fromdate).format("YYYY-MM-DD");
            this.getDates();
          }else if(id == 3){ // alert("last 15 Days")
            var fromdate_15days = moment().subtract(14, 'day').toDate();
            this.date_from = moment(fromdate_15days).format("YYYY-MM-DD");
            this.date_to = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10);
            this.getDates();
          }else{ // alert("Last 30 Days");
            var fromdate_30days = moment().subtract(29, 'day').toDate();
            this.date_from = moment(fromdate_30days).format("YYYY-MM-DD");
            this.date_to = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10);
            this.getDates();
          }
        },
        getDates(){ // date filtering
          var filters = {
              date_from: this.date_from,
              date_to: this.date_to,
              user_id:this.$store.getters.getUserID,
              parent_user_id:this.$store.getters.getParentID
          }
          timeintimeoutservices.FilterbyDateUser(filters, this.$store.getters.getAccessToken).then(response => {
              if(response.data.success){
                  this.timeintimeoutdata = response.data.data;
                  console.log(this.timeintimeoutdata);
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
  .v-input--selection-controls {
    margin-top: 0px;
    padding-top: 0px;
  }
</style>