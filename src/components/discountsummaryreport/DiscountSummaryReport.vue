<!-- Discount Summary Report UI -->
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
<!-- End One liner filtering -->
<!-- Datatable -->
<br>
              <v-data-table
                              :headers="showHeaders"
                              :search="search"
                              :items="discountsummaryreport"
                              :items-per-page="10"
                              :page.sync="page"
                      @page-count="pageCount = $event"
                      :footer-props="{
                      'items-per-page-options':[10],
                      'disable-items-per-page': true,
    }"
                          >
                        <template v-slot:item.total_amount="props">
                            {{ parseFloat(props.item.total_amount).toFixed(2) }}
                        </template>
                        <template v-slot:item.discount_type_info="props">
                            <v-btn
                            outlined
                            color="orange"
                            @click="FetchDiscountTransactionInformationViaID(props.item.discount_id, props.item.discount_type_info.name, props.item.discount_type_info.amount_percentage, props.item.discount_type_info.is_custom)"
                            >
                            {{props.item.discount_type_info.name}}
                            </v-btn>
                        </template>
                        <template v-slot:item.local_date_time="props">
                            {{ moment(String(props.item.local_date_time)).format('MM/DD/YYYY') }}
                        </template>      
                        <template slot="body.append">
                  <tr class="orange--text">
                          <th>Grand Total</th>
                          <th color="orange">{{ this.grandtotal_amount.toFixed(2) }}</th>
                      </tr>
                  </template>
              </v-data-table>
<!-- Datatable -->
<!-- Pagination -->              
              <v-pagination
                  color="orange"
        v-model="page"
        :length="pageCount"
      ></v-pagination>
<!-- End Pagination -->                    
                  </v-card-text>
  <br>
  <br>
  <br>
              </v-card>
          </v-col>
        </v-row>
        <!-- View Discount transaction per discount name -->
      <v-dialog
        v-model="viewdialog"
        transition="dialog-top-transition"
        max-width="80%"
        >
            <v-card>
                <v-toolbar
                dark
                color="orange"
                >
                <v-toolbar-title>{{ this.discountname }} Discount Transaction</v-toolbar-title>
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
                    @click="ExportDiscountSummaryReportInformation()"
                    color="orange"
                    v-if="$store.getters.valAccess(264)"
                >
                <v-icon>mdi-download-outline</v-icon>
                Download    
                </v-btn>
            </v-card-actions>                   
            <br>
                <v-data-table
                              :headers="showTransactionHeaders"  
                              :items="discountsummaryreports"
                              :items-per-page="10"
                              :page.sync="page"
                      @page-count="pageCount = $event"
                      :footer-props="{
                      'items-per-page-options':[10],
                      'disable-items-per-page': true,
    }"
                          >            
                          <template v-slot:item.value="props">
                            <div v-if="props.item.is_percentage == 1">
                            {{ parseFloat(props.item.value).toFixed(0) }}%
                            </div>
                            <div v-else>
                              {{ parseFloat(props.item.value).toFixed(2) }}
                            </div>
                        </template>
                        <template v-slot:item.amount="props">
                          {{ parseFloat(props.item.amount).toFixed(2) }}
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
                          <th></th>
                          <th color="orange">{{ this.grandtotal_type_amount.toFixed(2) }}</th>
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
        <v-dialog
        v-model="viewmanualdialog"
        transition="dialog-top-transition"
        max-width="80%"
        >
            <v-card>
                <v-toolbar
                dark
                color="orange"
                >
                <v-toolbar-title>{{ this.discountname }} Discount Transaction</v-toolbar-title>
                <v-spacer></v-spacer><v-toolbar-items>
                  <br>
                  <v-btn
                    icon
                    dark
                    @click="viewmanualdialog = false"
                    color="white"
                >
                    <v-icon>mdi-close</v-icon>
                </v-btn>
                </v-toolbar-items>
                </v-toolbar>
                <v-card-actions class="justify-end">
                <v-btn
                    dark
                    @click="ExportDiscountSummaryReportInformation()"
                    color="orange"
                >
                <v-icon>mdi-download-outline</v-icon>
                Download    
                </v-btn>
            </v-card-actions>                   
            <br>
                <v-data-table
                              :headers="showTransactionManualHeaders"  
                              :items="discountsummaryreports"
                              :items-per-page="10"
                              :page.sync="page"
                      @page-count="pageCount = $event"
                      :footer-props="{
                      'items-per-page-options':[10],
                      'disable-items-per-page': true,
    }"
                          >
                        <template v-slot:item.name="props">
                            {{ props.item.name }}
                        </template>
                        <template v-slot:item.Address="props">
                            {{ props.item.Address }}
                        </template>
                        <template v-slot:item.cardNumber="props">
                            {{ props.item.cardNumber }}
                        </template>
                        <template v-slot:item.value="props">
                            <div v-if="props.item.is_percentage == 1">
                            {{ parseFloat(props.item.value).toFixed(0) }}%
                            </div>
                            <div v-else>
                              {{ parseFloat(props.item.value).toFixed(2) }}
                            </div>
                        </template>
                        <template v-slot:item.amount="props">
                          {{ parseFloat(props.item.amount).toFixed(2) }}
                        </template>
                        <template v-slot:item.local_date_time="props">
                            {{ moment(String(props.item.local_date_time)).format('MM/DD/YYYY') }}
                        </template>
                        <template slot="body.append">
                  <tr class="orange--text">
                          <th>Grand Total</th>
                          <th></th>
                          <th></th>
                          <th color="orange">{{ this.grandtotal_type_amount.toFixed(2) }}</th>
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
  
import discountsummaryreportservices from "../services/discountsummaryreportservices";
  import moment from 'moment';
    export default {
        name: 'Reports',
      data: () => ({
        page: 1,
        pageCount: 0,
        viewdialog: false,
        viewmanualdialog: false,
        exportimport: [{ text: 'Daily', icon: 'mdi-upload-outline', linktrigger: 'days' },
          { text: 'Weekly', icon: 'mdi-download-outline', linktrigger: 'week'},
          { text: 'Monthly', icon: 'mdi-download-outline', linktrigger: 'month'},
          { text: 'Yearly', icon: 'mdi-download-outline', linktrigger: 'year'}],
          discountsummaryreport:[],
          discountsummaryreports:[],
          discountsummaryreportlength: 0,
          grandtotal_amount: 0,
          discountsummaryreportslength: 0,
          grandtotal_type_amount: 0,
          discountname: "",
          is_discount_custom: 0,
          discountid: 0,
          discountamount: 0,
          loading: false,
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
            { text: 'Discount', value: 'discount_type_info' },
            { text: 'Total Amount', value: 'total_amount' }
          ],
          headersTransactionMap: [
          { text: 'Date', align: 'start', sortable: false, value: 'local_date_time' },
            { text: 'Transaction No.', value: 'transaction_info.receipt_number' },
            { text: 'Name', value: 'name' },
            { text: 'Address', value: 'Address' },
            { text: 'Card #', value: 'cardNumber' },
            { text: 'Discount Value', value: 'value' },
            { text: 'Discount Amount', value: 'amount' }
          ],            
          headersManualTransactionMap: [
          { text: 'Date', align: 'start', sortable: false, value: 'local_date_time' },
            { text: 'Transaction No.', value: 'transaction_info.receipt_number' },
            { text: 'Discount Value', value: 'value' },
            { text: 'Discount Amount', value: 'amount' }
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
          this.headersmanualtransaction = Object.values(this.headersManualTransactionMap);
          this.selectedTransactionManualHeaders = this.headersmanualtransaction;
      },
      mounted(){
          this.$store.state.title = "Discount Summary Report";
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
            },
            showTransactionManualHeaders () {
                return this.headersmanualtransaction.filter(s => this.selectedTransactionManualHeaders.includes(s));
            }                        
        },
      methods: {
        // Filter by date
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
          gotoDiscountSummaryReportPreview(id) {
              localStorage.setItem('transactionID',id)
              window.open("/previewdiscountsummaryreport","_blank")
          },
          gotoSummaryPrint(id) {
              localStorage.setItem('transactionID',id)
              window.open("/printdiscountsummaryreport","_blank")
          },
          getDates(){
            this.grandtotal_amount = 0
            var filters = {
                date_from: this.date_from,
                date_to: this.date_to
            }
            let payload = {
                      discountsummary_report: JSON.stringify(filters),
                      business_branch_id: this.$store.getters.getBranchID
                  };
                discountsummaryreportservices.fetchDiscountSummaryReportInformation(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    this.discountsummaryreport = response.data.result;
                    this.discountsummaryreportlength = this.discountsummaryreport.length;
                    for (var z = 0 ; z < this.discountsummaryreportlength ; z++){
                    this.grandtotal_amount += parseFloat(this.discountsummaryreport[z].total_amount)
                    }                     
                  }
              }).catch(error => console.log(error));
        },    
        FetchDiscountTransactionInformationViaID(id, name, amount, is_custom){
          this.grandtotal_type_amount = 0
          var filter_date = {
                date_from: this.date_from,
                date_to: this.date_to
            }
            let payload = {
              discountsummary_report: JSON.stringify(filter_date),
                discountid: id,
                business_branch_id: this.$store.getters.getBranchID
            };
            discountsummaryreportservices.fetchDiscountSummaryReportViaID(payload,  this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    this.discountsummaryreports = response.data.result;
                    localStorage.setItem('transactionID',id)
                    this.discountname = name
                    this.is_discount_custom = is_custom
                    if(name.toLowerCase() == "manual" && is_custom == 0){
                      this.viewmanualdialog = true
                      this.viewdialog = false
                    }else{
                      this.viewdialog = true
                      this.viewmanualdialog = false
                    }
                    this.discountamount = amount
                    this.discountsummaryreportslength = this.discountsummaryreports.length;
                    for (var z = 0 ; z < this.discountsummaryreportslength ; z++){
                    this.grandtotal_type_amount += parseFloat(this.discountsummaryreports[z].amount)
                    }                     
                  }
            }).catch(error => console.log(error));
        },        
        // Export Discount Report
        ExportDiscountSummaryReportInformation(){
          this.$store.state.transactionid = localStorage.getItem('transactionID')
            let payload = {
                      date_from: this.date_from,
                      date_to: this.date_to,
                      discountid: this.$store.state.transactionid,
                      discount_name: this.discountname,
                      is_discount_custom: this.is_discount_custom,
                      business_branch_id: this.$store.getters.getBranchID,
                      grand_total: this.grandtotal_type_amount
                  };
                  discountsummaryreportservices.exportDiscountSummaryReportInformation(payload, this.$store.getters.getAccessToken)
          .then(response => {
              const url = window.URL.createObjectURL(new Blob([response.data]))
              const link = document.createElement('a')
              link.href = url
              link.setAttribute('download','DiscountSummary.xlsx')
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