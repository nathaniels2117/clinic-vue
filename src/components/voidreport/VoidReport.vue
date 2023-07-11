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

<template v-if="$vuetify.breakpoint.mdAndUp">
  
  &nbsp;
  <v-btn
    dark
    color="orange"
    elevation="2"
    @click="ExportVoidTransactionInformation()"
    v-if="$store.getters.valAccess(273)"
  >
    <v-icon>mdi-download-outline</v-icon> Download
  </v-btn>
  </template> 

    <template  v-if="$vuetify.breakpoint.smAndDown">
  <div class="text-center">
    <v-menu
      v-model="menus"
      :close-on-content-click="false"
      :nudge-width="100"
      :nudge-left="35"
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

<template v-if="$vuetify.breakpoint.smAndDown">

  &nbsp;
  <v-btn
    dark
    color="orange"
    elevation="2"
    @click="ExportVoidTransactionInformation()"
    v-if="$store.getters.valAccess(273)"
  >
    <v-icon>mdi-download-outline</v-icon>
  </v-btn>
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
                              :items="voidreport"
                              :items-per-page="10"
                              :page.sync="page"
                      @page-count="pageCount = $event"
                      :footer-props="{
                      'items-per-page-options':[10],
                      'disable-items-per-page': true,
    }"
                          >
                          <template v-slot:item.gross_sales="props">
                            {{ parseFloat(props.item.gross_sales).toFixed(2) }}
                        </template>
                        <template v-slot:item.net_sales="props">
                            {{ parseFloat(props.item.net_sales).toFixed(2) }}
                        </template>
                        <template v-slot:item.vat_exempt="props">
                            {{ parseFloat(props.item.vat_exempt).toFixed(2) }}
                        </template>
                        <template v-slot:item.vat_amount="props">
                            {{ parseFloat(props.item.vat_amount).toFixed(2) }}
                        </template>
                        <template v-slot:item.vatable_sales="props">
                            {{ parseFloat(props.item.vatable_sales).toFixed(2) }}
                        </template>
                        <template v-slot:item.discount="props">
                            {{ parseFloat(props.item.discount).toFixed(2) }}
                        </template>
                        <template v-slot:item.change_amount="props">
                            {{ parseFloat(props.item.change_amount).toFixed(2) }}
                        </template>
                        <template v-slot:item.less_vat="props">
                            {{ parseFloat(props.item.less_vat).toFixed(2) }}
                        </template>
                        <template v-slot:item.tendered_amount="props">
                            {{ parseFloat(props.item.tendered_amount).toFixed(2) }}
                        </template>
                          <template v-slot:item.transaction_item_info="props">
                            <span v-for="info in props.item.transaction_payment_info" :key="info.id">
                                
                                {{ info.payment_type_info.name }}
                                <br>
                            </span>
                        </template>
                        <template v-slot:item.voided_info="props">
                            {{props.item.voided_info.employee_information.firstname}},&nbsp;{{props.item.voided_info.employee_information.lastname}} 
                        </template>
                        <template v-slot:item.local_date_time="props">
                            {{ moment(String(props.item.local_date_time)).format('MM/DD/YYYY') }}
                        </template>      

                          <template v-slot:item.id="props">
                                  <v-btn
                          elevation="2"
                          dark
                          small
                          outlined
                          color="orange"
                          @click="gotoVoidReportPreview(props.item.id)"
                        >
                        <v-icon
                                    small
                                    @click="gotoVoidReportPreview(props.item.id)"
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
                  <template slot="body.append">
                  <tr class="orange--text">
                          <th>Grand Total</th>
                          <th></th>
                          <th></th>
                          <th></th>
                          <th></th>
                          <th color="orange">{{ this.total_gross.toFixed(2) }}</th>
                          <th color="orange">{{ this.total_net.toFixed(2) }}</th>
                          <th color="orange">{{ this.total_vat.toFixed(2) }}</th>
                          <th color="orange">{{ this.total_vamount.toFixed(2) }}</th>
                          <th color="orange">{{ this.total_vexempt.toFixed(2) }}</th>
                          <th color="orange">{{ this.total_lessvat.toFixed(2) }}</th>
                          <th color="orange">{{ this.total_discount.toFixed(2) }}</th>
                          <th></th>
                          <th color="orange">{{ this.total_quantity.toFixed(2) }}</th>
                          <th color="orange">{{ this.total_amountpaid.toFixed(2) }}</th>
                          <th color="orange">{{ this.total_change.toFixed(2) }}</th>
                      </tr>
                  </template>
              </v-data-table>
              <v-pagination
                  color="orange"
        v-model="page"
        :length="pageCount"
      ></v-pagination>
                  </v-card-text>
  <br>
  <br>
  <br>
              </v-card>
              
          </v-col>
  
      </v-row>
  
    </v-container>
      
  </template>
  
  <script>
  
import voidreportservices from "../services/voidreportservices";
  import moment from 'moment';
  
    export default {
        name: 'Reports',
      data: () => ({
        page: 1,
        pageCount: 0,
        exportimport: [{ text: 'Daily', icon: 'mdi-upload-outline', linktrigger: 'days' },
          { text: 'Weekly', icon: 'mdi-download-outline', linktrigger: 'week'},
          { text: 'Monthly', icon: 'mdi-download-outline', linktrigger: 'month'},
          { text: 'Yearly', icon: 'mdi-download-outline', linktrigger: 'year'}],
        voidreport:[],
          loading: false,
          voidreportlength: 0,
          total_gross: 0,
          total_net: 0,
          total_vat: 0,
          total_vamount: 0,
          total_vexempt: 0,
          total_lessvat: 0,
          total_discount: 0,
          total_quantity: 0,
          total_amountpaid: 0,
          total_change: 0,
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
        headersMap: [
            { text: 'Date', align: 'start', sortable: false, value: 'local_date_time' },
            { text: 'Machine No.', value: 'pos_id' },
            { text: 'OR No.', value: 'receipt_number' },
            { text: 'Cashier Details', value: 'voided_info' },
            { text: 'Shift', value: 'shift_number' },
            { text: 'Gross Sales', value: 'gross_sales' },
            { text: 'Net Sales', value: 'net_sales' },
            { text: 'Vat Sales', value: 'vatable_sales' },
            { text: 'Vat Amount', value: 'vat_amount' },
            { text: 'Vat Exempt', value: 'vat_exempt' },
            { text: 'Less Vat', value: 'less_vat' },
            { text: 'Discount', value: 'discount' },
            { text: 'Voided by', value: 'voided_info' },
            { text: 'Quantity', value: 'transaction_item_info_sum_qty' },
            { text: 'Amount Paid', value: 'tendered_amount' },
            { text: 'Change', value: 'change_amount' }
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
          this.getDates(1);
          this.headers = Object.values(this.headersMap);
        this.selectedHeaders = this.headers;          
      },
      mounted(){
          this.$store.state.title = "Void Transaction Report";
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
          gotoVoidReportPreview(id) {
              localStorage.setItem('transactionID',id)
              window.open("/previewvoidreport","_blank")
          },
          gotoSummaryPrint(id) {
              localStorage.setItem('transactionID',id)
              window.open("/printvoidreport","_blank")
          },
  
          getDates(){
            this.total_gross = 0
            this.total_net = 0
            this.total_vat = 0
            this.total_vamount = 0
            this.total_vexempt = 0
            this.total_lessvat = 0
            this.total_discount = 0
            this.total_quantity = 0
            this.total_amountpaid = 0
            this.total_change = 0
            var filters = {
                date_from: this.date_from,
                date_to: this.date_to
            }
            let payload = {
                      void_report: JSON.stringify(filters),
                      business_branch_id: this.$store.getters.getBranchID
                  };
                
              voidreportservices.fetchVoidReportInformation(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    this.voidreport = response.data.result;
                    this.voidreportlength = this.voidreport.length;
                    for (var z = 0 ; z < this.voidreportlength ; z++){
                    this.total_gross += parseFloat(this.voidreport[z].gross_sales)
                    this.total_net += parseFloat(this.voidreport[z].net_sales)
                    this.total_vat += parseFloat(this.voidreport[z].vatable_sales)
                    this.total_vamount += parseFloat(this.voidreport[z].vat_amount)
                    this.total_vexempt += parseFloat(this.voidreport[z].vat_exempt)
                    this.total_lessvat += parseFloat(this.voidreport[z].less_vat)
                    this.total_discount += parseFloat(this.voidreport[z].discount)
                    this.total_quantity += parseFloat(this.voidreport[z].transaction_item_info_sum_qty)
                    this.total_amountpaid += parseFloat(this.voidreport[z].tendered_amount)
                    this.total_change += parseFloat(this.voidreport[z].change_amount)
                    }                    
                  }
              }).catch(error => console.log(error));
              
        },
        ExportVoidTransactionInformation(){

          var filters = {
                date_from: this.date_from,
                date_to: this.date_to
            }
            console.log(filters);
            let payload = {
                      void_report: JSON.stringify(filters),
                      business_branch_id: this.$store.getters.getBranchID,
                      total_amount: this.total_amount,
                      total_gross: this.total_gross,
                      total_net: this.total_net,
                      total_vat: this.total_vat,
                      total_vamount: this.total_vamount,
                      total_vexempt: this.total_vexempt,
                      total_lessvat: this.total_lessvat,
                      total_discount: this.total_discount,
                      total_quantity: this.total_quantity,
                      total_amountpaid: this.total_amountpaid,
                      total_change: this.total_change
                  };

          voidreportservices.exportVoidTransactionInformation(payload, this.$store.getters.getAccessToken)
          .then(response => {
              const url = window.URL.createObjectURL(new Blob([response.data]))
              const link = document.createElement('a')
              link.href = url
              link.setAttribute('download','VoidTransaction.xlsx')
              document.body.appendChild(link)
              link.click()
          }).catch(error => console.log(error));
          
          },
          setTotal(){
          this.$store.state.totalcosts = localStorage.getItem('totalCost')
          this.totalcosts = this.$store.getters.fetchtotalcost;
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