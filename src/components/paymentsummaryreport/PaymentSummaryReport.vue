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
                        label="From"
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
                        label="To"
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
        <v-icon>mdi-calendar</v-icon>
        </v-btn>
      </template>

      <v-card> <br>
        &nbsp;&nbsp;&nbsp;
      <b>
        Filter by date
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
              <v-list-item>
                <b>
                  Custom Date
                </b>
              </v-list-item>
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
                        label="From"
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
                        label="To"
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
        &nbsp;
        &nbsp;
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
              <v-data-table
                              :headers="showHeaders"
                              :search="search"
                              :items="paymentsummaryreport"
                              :items-per-page="10"
                              :page.sync="page"
                      @page-count="pageCount = $event"
                      :footer-props="{
                      'items-per-page-options':[10],
                      'disable-items-per-page': true,
    }"
                          >
                        <template v-slot:item.payment_type_info="props">
                          <v-btn
                            outlined
                            color="orange"
                            @click="FetchPaymentTypeTransactionInformationViaID(props.item.payment_type_id, props.item.payment_type_info.name)"
                            >
                            {{props.item.payment_type_info.name}}
                            </v-btn>
                        </template>
                        <template v-slot:item.local_date_time="props">
                            {{ moment(String(props.item.local_date_time)).format('MM/DD/YYYY') }}
                        </template>     
                        <template v-slot:item.total_amount="props">
                          {{ parseFloat(props.item.total_amount - props.item.total_change).toFixed(2) }}
                        </template> 
                        <template slot="body.append">
                  <tr class="orange--text">
                          <th>Grand Total</th>
                          <th color="orange">{{ this.grand_total.toFixed(2) }}</th>
                      </tr>
                  </template>
              </v-data-table>
              <v-pagination
                  color="orange"
        v-model="page"
        :length="pageCount"
      ></v-pagination>
              </v-card-text>
              <br><br><br>
              </v-card>
          </v-col> 
      </v-row>
      <v-dialog
        v-model="viewdialog"
        transition="dialog-top-transition"
        max-width="650"
        >
            <v-card>
                <v-toolbar
                dark
                color="orange"
                >
                <v-toolbar-title>{{ this.paymenttypename }} Transaction</v-toolbar-title>
                <v-spacer></v-spacer><v-toolbar-items>
                  <br>
                  <v-btn
                    icon
                    dark
                    @click="viewdialog = false"
                    color="white"
                >
                    <v-icon>mdi-close</v-icon>
                </v-btn>
                </v-toolbar-items>
                </v-toolbar>
                <v-card-actions class="justify-end">
                <v-btn
                    dark
                    @click="ExportPaymentSummaryReportInformation()"
                    v-if="$store.getters.valAccess(270)"
                    color="orange"
                >
                <v-icon>mdi-download-outline</v-icon>
                Download    
                </v-btn>
            </v-card-actions>                   
            <br>
                <v-data-table
                              :headers="showTransactionHeaders"  
                              :items="paymentsummaryreports"
                              :items-per-page="10"
                              :page.sync="page"
                      @page-count="pageCount = $event"
                      :footer-props="{
                      'items-per-page-options':[10],
                      'disable-items-per-page': true,
    }"
                          >
                        <template v-slot:item.amount="props">
                            {{ parseFloat(props.item.amount - props.item.change).toFixed(2) }}
                        </template>
                          <template v-slot:item.payment_subtype_infos="props">
                            <div v-if="props.item.payment_subtype_info == null">
                              Cash
                            </div>
                            <div v-if="props.item.payment_subtype_info != null">
                              {{ props.item.payment_subtype_info.name }}
                            </div>
                        </template>
                        <template v-slot:item.completed_infos="props">
                            {{props.item.firstname}},&nbsp;{{props.item.lastname}} 
                        </template>
                        <template v-slot:item.local_date_time="props">
                            {{ moment(String(props.item.local_date_time)).format('MM/DD/YYYY') }}
                        </template>
                        <template slot="body.append">
                  <tr class="orange--text">
                          <th>Grand Total</th>
                          <th></th>
                          <th></th>
                          <th></th>
                          <th></th>
                          <th color="orange">{{ this.grandtotal_subtype_amount.toFixed(2) }}</th>
                      </tr>
                  </template>                        
              </v-data-table>
              <v-pagination
                  color="orange"
        v-model="page"
        :length="pageCount"
      ></v-pagination>   
              <br>
            </v-card>
        </v-dialog>
    </v-container>
      
  </template>
  
  <script>
  
import paymentsummaryreportservices from "../services/paymentsummaryreportservices";
  import moment from 'moment';
  
    export default {
        name: 'PaymentSummaryReports',
      data: () => ({
        page: 1,
        pageCount: 0,
        viewdialog: false,
        exportimport: [{ text: 'Daily', icon: 'mdi-upload-outline', linktrigger: 'days' },
          { text: 'Weekly', icon: 'mdi-download-outline', linktrigger: 'week'},
          { text: 'Monthly', icon: 'mdi-download-outline', linktrigger: 'month'},
          { text: 'Yearly', icon: 'mdi-download-outline', linktrigger: 'year'}],
        paymentsummaryreport:[],
        paymentsummaryreports:[],
        paymentsummaryreportlength: 0,
        grandtotal_amount: 0,
        grand_total: 0,
        paymentsummaryreportslength: 0,
        grandtotal_type_amount: 0,
        grandtotal_type_change: 0,
        grandtotal_subtype_amount: 0,
        grandtotal_change: 0,
          loading: false,
          paymenttypename: "",
          paymenttypeid: 0,
          modal: false,
          menu: false,
          menu2: false,
          menus: false,
          menubranch: false,
          menusss: false,
          menucolumn: false,
          max: "2022",
          search: '',
          headers:[],
          radioGroup: [],
        filterdate: [{ text: 'Today', icon: 'mdi-elevator-down', linktrigger: 1 },
          { text: 'Last Day', icon: 'mdi-elevator-up', linktrigger: 2 },
          { text: 'Last 15 Days', icon: 'mdi-elevator', linktrigger: 3 },
          { text: 'Last 30 Days', icon: 'mdi-elevator', linktrigger: 4 }],           
        selectedHeaders: [],
        selectedTransactionHeaders: [],
        headersMap: [
            { text: 'Payment Type', value: 'payment_type_info' },
            { text: 'Total Amount', value: 'total_amount' }
          ],
          headersTransactionMap: [
          { text: 'Date', align: 'start', sortable: false, value: 'local_date_time' },
            { text: 'Machine No.', value: 'pos_id' },
            { text: 'OR No.', value: 'receipt_number' },
            { text: 'Cashier Details', value: 'completed_infos' },
            { text: 'Payment', value: 'payment_subtype_infos' },
            { text: 'Amount', value: 'amount' }
          ],       
          date_from: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
          date_to: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),          
          date_daily: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
          date_week: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
          date_month: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
          date_year: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
          menu_daily: false,
          menu_month: false,
          menu_week: false,
          menu_year: false,
          datetype: 'days'
      }),
      created(){
        this.datetype = 'days';
          this.$store.state.header = true;
          this.$store.state.footer = true;
          this.getDates();
          this.headers = Object.values(this.headersMap);
          this.selectedHeaders = this.headers;
          this.headerstransaction = Object.values(this.headersTransactionMap);
          this.selectedTransactionHeaders = this.headerstransaction;
      },
      mounted(){
          this.$store.state.title = "Payment Summary Report";
      },
      watch: {
            menu_year(val) {
                val && this.$nextTick(() => (this.$refs.picker.internalActivePicker = 'YEAR'))
                this.getDates(4)
            },
        },
        computed: {
            date: {
                get: function () {
                    return this.$store.state.yearNav.yyyy;
                },
                set: function (newValue) {
                    this.$store.commit("yearNav/change", (newValue.slice(0, -8)));
                },
            },
            showHeaders () {
                return this.headers.filter(s => this.selectedHeaders.includes(s));
            },
            showTransactionHeaders () {
                return this.headerstransaction.filter(s => this.selectedTransactionHeaders.includes(s));
            }
        },
      methods: {
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
        checkdaily(){
            this.datetype = 'days';
            this.menu_daily= true;
            this.menu_week= false;
            this.menu_month= false;
            this.menu_year= false;
          },
          checkweekly(){
            this.datetype = 'week';
            this.menu_daily= false;
            this.menu_week= true;
            this.menu_month= false;
            this.menu_year= false;
          },
          checkmonthly(){
            this.menu_month= true;
            this.menu_year= false;
            this.menu_week= false;
            this.menu_daily= false;
            this.datetype = 'month';
          },
          checkyearly(){
            this.datetype = 'year';
            this.menu_year= true;
            this.menu_month= false;
            this.menu_week= false;
            this.menu_daily= false;
          },
          clearfilter(){
              this.branch_id = "";
              this.action = "";
              this.status = "";
              this.getDates()
          },
          gotoPaymentSummaryReportPreview(id) {
              localStorage.setItem('transactionID',id)
              window.open("/previewpaymentsummaryreport","_blank")
          },
          gotoPaymentSummaryPrint(id) {
              localStorage.setItem('transactionID',id)
              window.open("/printpaymentsummaryreport","_blank")
          },
          getDates(){
            this.grandtotal_amount = 0
            this.grandtotal_change = 0
            this.grand_total = 0
            var filters = {
                date_from: this.date_from,
                date_to: this.date_to
            }
            let payload = {
                      paymentsummary_report: JSON.stringify(filters),
                      business_branch_id: this.$store.getters.getBranchID
                  };
              paymentsummaryreportservices.fetchPaymentSummaryReportInformation(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                  this.paymentsummaryreport = response.data.result;
                  this.paymentsummaryreportlength = this.paymentsummaryreport.length;
                    for (var z = 0 ; z < this.paymentsummaryreportlength ; z++){
                    this.grandtotal_amount += parseFloat(this.paymentsummaryreport[z].total_amount)
                    this.grandtotal_change += parseFloat(this.paymentsummaryreport[z].total_change)
                    }                  
                    this.grand_total = this.grandtotal_amount - this.grandtotal_change  
                  }
              }).catch(error => console.log(error));
        },           
        FetchPaymentTypeTransactionInformationViaID(id, name){
          this.grandtotal_type_amount = 0
          this.grandtotal_type_change = 0
          this.grandtotal_subtype_amount = 0
          var filter_date = {
                date_from: this.date_from,
                date_to: this.date_to
            }
            let payload = {
                paymentsummary_report: JSON.stringify(filter_date),
                payment_type_id: id,
                business_branch_id: this.$store.getters.getBranchID
            };
            paymentsummaryreportservices.fetchPaymentSummaryReportViaID(payload,  this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    this.paymentsummaryreports = response.data.result;
                    this.viewdialog = true
                    console.log(this.paymentsummaryreports)
                    localStorage.setItem('transactionID',id)
                    this.paymenttypename = name
                    this.paymentsummaryreportslength = this.paymentsummaryreports.length;
                    for (var z = 0 ; z < this.paymentsummaryreportslength ; z++){
                    this.grandtotal_type_amount += parseFloat(this.paymentsummaryreports[z].amount)
                    this.grandtotal_type_change += parseFloat(this.paymentsummaryreports[z].change)
                    }
                    this.grandtotal_subtype_amount = this.grandtotal_type_amount - this.grandtotal_type_change                 
                }
            }).catch(error => console.log(error));
        },        
          setTotal(){
          this.$store.state.totalcosts = localStorage.getItem('payment_type_id')
          this.totalcosts = this.$store.getters.fetchtotalcost;
          },
        ExportPaymentSummaryReportInformation(){
          this.$store.state.transactionid = localStorage.getItem('transactionID')
            let payload = {
                      date_from: this.date_from,
                      date_to: this.date_to,
                      payment_type_id: this.$store.state.transactionid,
                      payment_type_name: this.paymenttypename,
                      business_branch_id: this.$store.getters.getBranchID,
                      grand_total: this.grandtotal_subtype_amount
                  };
          paymentsummaryreportservices.exportPaymentSummaryReportInformation(payload, this.$store.getters.getAccessToken)
          .then(response => {
              const url = window.URL.createObjectURL(new Blob([response.data]))
              const link = document.createElement('a')
              link.href = url
              link.setAttribute('download','PaymentSummary.xlsx')
              document.body.appendChild(link)
              link.click()
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