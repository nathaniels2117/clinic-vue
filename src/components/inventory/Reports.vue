<template>
    <v-container style="max-width: 95%; position: relative;" >
    <v-row>
        <v-col cols="12">
            <v-card
                :loading="loading"
            >
                <template slot="progress">
                    <v-progress-linear
                        color="orange"
                        height="10"
                        indeterminate
                    ></v-progress-linear>
                </template>

                <v-card-text>



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
        <v-icon>mdi-database</v-icon>Filter Data
        </v-btn>
      </template>

      <v-card>
    <br>
        <v-list>
          <v-list-item>

                <v-combobox
                    outlined
                    dense
                    v-model="branch_id"
                    label="Branch"
                    :items="branch_information"
                    @change="getDates()"
                    color="orange"
                ></v-combobox>

            </v-list-item>
          <v-list-item>

                <v-combobox
                    outlined
                    dense
                    v-model="action"
                    label="Process"
                    :items="actions"
                    @change="getDates()"
                    color="orange"
                ></v-combobox>

            </v-list-item>
        </v-list>

        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            text
            @click="clearfilter()"
          >
            Clear
          </v-btn>
        </v-card-actions>
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
        <v-icon>mdi-database</v-icon>
        </v-btn>
      </template>

      <v-card>
         <br>
         &nbsp;
      <b>
        Filter by Data
      </b>
        <v-list>
          <v-list-item>

                <v-combobox
                    v-model="branch_id"
                    label="Branch"
                    dense
                    outlined
                    :items="branch_information"
                    @change="getDates()"
                    color="orange"
                ></v-combobox>

            </v-list-item>
          <v-list-item>

                <v-combobox
                    v-model="action"
                    label="Process"
                    dense
                    outlined
                    :items="actions"
                    @change="getDates()"
                    color="orange"
                ></v-combobox>

            </v-list-item>
        </v-list>

        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            text
            @click="clearfilter()"
          >
            Clear
          </v-btn>
        </v-card-actions>

      </v-card>
    </v-menu>
  </div>
</template>
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
                <v-radio-group v-model="radioGroup" style="margin-top: ;5px">
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
            <b>
              Custom Date
            </b>
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
                        label="Stock From"
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
                        label="Stock To"
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

      <v-card> <br>
        &nbsp;&nbsp;
      <b>
        Filter by Date
      </b>
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
            <b>
                  Custom Date
                </b>
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
                        label="Stock From"
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
                        label="Stock To"
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
        <b>
        Column
        </b>
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

        


  </v-toolbar>
</template>
<br>
            <br>

            <v-data-table

                            :search="search"
                            :headers="showHeaders"
                            :items="stockcard"
                            :items-per-page="10"
                            :page.sync="page"
                      @page-count="pageCount = $event"
                      :footer-props="{
                      'items-per-page-options':[10],
                      'disable-items-per-page': true,
    }"
                        >

                         <template v-slot:item.status="props">
                                {{ props.item.status == 0 ? 'PENDING' : props.item.status == 1 ? 'APPROVED' : props.item.status == 2 ? 'DISAPPROVED' : props.item.status }}
                            </template>
                         <template v-slot:item.action="props">
                                {{ props.item.action == 1 ? 'Stock In' : props.item.action == 2 ? 'Stock Out' : props.item.action == 3 ? 'Transfer Out': props.item.action == 4 ? 'Transfer In': props.item.action == 5 ? 'Disposal' : props.item.action }}
                            </template>
                        <template v-slot:item.id="props">
                                 <v-icon
                                    small
                                    @click="gotoSummary(props.item.id)"
                                >
                                    mdi-information
                                </v-icon>
                                <v-icon
                                    small
                                    @click="gotoSummaryPrint(props.item.id)"
                                >
                                    mdi-printer
                                </v-icon>
                        </template>

                        <template v-slot:item.approved_at="props">
                                {{ props.item.approved_at == "1987-01-01 00:00:00" ? ''  : props.item.status == 0 ? '' : props.item.approved_at }}
                        </template>
                        <template v-slot:item.actions="props">
                      <v-btn
                          elevation="2"
                          dark
                          small
                          outlined
                          color="orange"
                          v-if="$store.getters.valAccess(139)"
                          @click="gotoSummary(props.item.id)"
                        >
                        <v-icon
                                    small
                                    @click="gotoSummary(props.item.id)"
                                >
                                    mdi-information
                                </v-icon>
                          Preview
                      </v-btn>

                      <v-btn
                          elevation="2"
                          dark
                          small
                          outlined
                          color="orange"
                          @click="gotoSummaryPrint(props.item.id)"
                          v-if="$store.getters.valAccess(140)"
                        >
                        <v-icon
                                    small
                                    @click="gotoSummaryPrint(props.item.id)"
                                >
                                    mdi-printer
                                </v-icon>
                          Print
                      </v-btn>
                        </template>
            </v-data-table>
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

  import branchservices from "../services/branchservices";
  import stockcardservices from "../services/stockcardservices";
  import moment from 'moment';
  export default {
    name: 'Reports',
    data: () => ({
        search: '',
        page: 1,
        pageCount: 0,
        expanded: [],
        singleExpand: false,
        loading: false,
        headers:[],
        selectedHeaders: [],
        radioGroup: [],
        filterdate: [{ text: 'Today', icon: 'mdi-elevator-down', linktrigger: 1 },
          { text: 'Last Day', icon: 'mdi-elevator-up', linktrigger: 2 },
          { text: 'Last 15 Days', icon: 'mdi-elevator', linktrigger: 3 },
          { text: 'Last 30 Days', icon: 'mdi-elevator', linktrigger: 4 }],
        headersMap: [
          {
            text: 'MIS',
            align: 'start',
            sortable: true,
            value: 'mis',
          },
          { text: 'Branch',sortable: false, value: 'branch_name' },
          { text: 'Process',sortable: false, value: 'action' },
          { text: 'Issued Date',sortable: false, value: 'created_at' },
          { text: 'Status',sortable: false, value: 'status' },
          { text: 'Approver',sortable: false, value: 'approver_name' },
          { text: 'Approved Date',sortable: false, value: 'approved_at' },
          { text: 'Action',sortable: false, value: 'actions' }
        ],
        date_from: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        date_to: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        menu: false,
        menu2: false,
        menus: false,
        menubranch: false,
        menusss: false,
        menucolumn: false,
        branch_id: "",
        branch_information: [],
        status: "",
        action: "",
        actions: [
            {
                "text": 'Stock In',
                "value": 1
            },
            {
                "text": 'Stock Out',
                "value": 2
            },
        ],
        stock_status: [
            {
                "text": 'Pending',
                "value": 0
            },
            {
                "text": 'Approved',
                "value": 1
            },
            {
                "text": 'Disapproved',
                "value": 2
            }
        ],
        stockcard: []
    }),
    created(){
        this.$store.state.header = true;
        this.$store.state.footer = true;
        this.$store.state.snackbar.color = 'orange';
        this.FetchBranchInformation();
        this.getDates();
        this.headers = Object.values(this.headersMap);
        this.selectedHeaders = this.headers;        
    },
    mounted(){
        this.$store.state.title = "Stock Summary Report";
    },
    computed: {
      //Done to get the ordered headers
      showHeaders () {
        return this.headers.filter(s => this.selectedHeaders.includes(s));
      }
    },
    methods: {
      // clear filter fields
        clearfilter(){
            this.menusss = false;
            this.branch_id = "";
            this.action = "";
            this.status = "";
            this.getDates()
        },
        // redirect summary information
        gotoSummary(id) {
            localStorage.setItem('summaryID',id)
            window.open("/summary","_blank")
        },

        // redirect print summary information
        gotoSummaryPrint(id) {
            localStorage.setItem('summaryID',id)
            window.open("/summaryprint","_blank")
        },


      // date filtering
        rdbfilter(id){
                if(id == 1){
                    this.date_from = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)
                    this.date_to = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)
                    this.getDates();
                }else if(id == 2){
                    var fromdate = moment().subtract(1, 'day').toDate();
                    this.date_from = moment(fromdate).format("YYYY-MM-DD");
                    this.date_to = moment(fromdate).format("YYYY-MM-DD");
                    this.getDates();

                }else if(id == 3){
                    var fromdate_15days = moment().subtract(14, 'day').toDate();
                    this.date_from = moment(fromdate_15days).format("YYYY-MM-DD");
                    this.date_to = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10);
                    this.getDates();
                }else{
                    var fromdate_30days = moment().subtract(29, 'day').toDate();
                    this.date_from = moment(fromdate_30days).format("YYYY-MM-DD");
                    this.date_to = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10);
                    this.getDates();
                }
        },

        // get info reports via filters
        getDates(){
            var filters = {
                parent_user_id: this.$store.getters.getParentID,
                date_from: this.date_from,
                date_to: this.date_to,
                branch_id: (this.branch_id['value'] != undefined)?this.branch_id['value']:"",
                action: (this.action['value'] != undefined)?this.action['value']:"",
                status: (this.status['value'] != undefined)?this.status['value']:""
            }
            console.log(filters);
            let payload = {
                    summary_report: JSON.stringify(filters)
                };
            stockcardservices.fetchSummaryInformation(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    this.stockcard = response.data.result;
                }

                console.log(response.data.result)
            }).catch(error => console.log(error));

        },

        // get branch information
        FetchBranchInformation(){

            this.branch_information = [];

            let payload = {
                user_id: this.$store.getters.getParentID
            };
            
            branchservices.fetchBranchInformation(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    response.data.result.forEach((value) => {
                        this.branch_information.push({
                            text: value.branch_name,
                            value: value.id
                        });
                    });
                }
                else{
                    console.log(response.data.message);
                }
            }).catch(error => console.log(error));

        }
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
    .v-data-footer {
        justify-content: center;
        padding-bottom: 8px;
    }
        .v-data-footer__select {
            margin: 0 auto;
        }

        .v-data-footer__pagination {
            width: 100%;
            margin: 0;
        }

    .v-application--is-ltr .v-data-footer__select .v-select {
        margin: 5px 0 5px 13px;
    }
    .v-application--is-rtl .v-data-footer__select .v-select {
        margin: 5px 13px 5px 0;
    }
</style>