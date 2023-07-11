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
    <template v-if="$vuetify.breakpoint.mdAndUp">
  
          &nbsp;
          <v-btn
            dark
            color="orange"
            elevation="2"
            @click="printReport()"
          >
          <!-- insert val access supplier upload -->
            <v-icon>mdi-printer</v-icon> Print
          </v-btn>
          </template>

          <template v-if="$vuetify.breakpoint.smAndDown">

            &nbsp;          
              <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
          color="orange"
          dark
          v-bind="attrs"
          v-on="on"
        >
        <v-icon>mdi-printer</v-icon>
        </v-btn>
      </template>
                <v-list>
                  <v-list-item
                    v-for="(item, index) in exportimport"
                    :key="index"
                  >
                  <div v-if="item.linktrigger == 1">
                    <v-list-item-title @click="printReport()"> <v-icon>{{ item.icon }}</v-icon>{{ item.text }}</v-list-item-title>
                  </div>
                  </v-list-item>
                </v-list>
              </v-menu>
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

        


  </v-toolbar>
</template>
<br>   


            <v-data-table
                    dense
                    :headers="showHeaders"
                    :items="stockreport"
                    :items-per-page="10"
                    :search="search"
                    id="reportTable"
                    :page.sync="page"
                      @page-count="pageCount = $event"
                      :footer-props="{
                      'items-per-page-options':[10],
                      'disable-items-per-page': true,
    }"        
                >
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
import moment from 'moment';
  import productservices from "../services/productservices";
  import reportservices from "../services/reportservices";

  export default {
    name: 'Reports',
    data: () => ({
        page: 1,
        pageCount: 0,
        loading: false,
          menus: false,
          menubranch: false,
          menusss: false,
          menucolumn: false,
        search: '',
        headers:[],
        radioGroup: [],
        exportimport: [{ text: 'Print', icon: 'mdi-print', linktrigger: 1 }],
        filterdate: [{ text: 'Today', icon: 'mdi-elevator-down', linktrigger: 1 },
          { text: 'Last Day', icon: 'mdi-elevator-up', linktrigger: 2 },
          { text: 'Last 15 Days', icon: 'mdi-elevator', linktrigger: 3 },
          { text: 'Last 30 Days', icon: 'mdi-elevator', linktrigger: 4 }],
        selectedHeaders: [],
        headersMap: [
          {
            text: 'Date',
            align: 'start',
            sortable: true,
            value: 'approved_date',
          },
          { text: 'Product',sortable: false, value: 'product' },
          { text: 'UOM',sortable: false, value: 'uom' },
          { text: 'Initial Balance',sortable: false, value: 'initialbalance' },
          { text: 'Stock In',sortable: false, value: 'stockin' },
          { text: 'Stock Out',sortable: false, value: 'stockout' },
          { text: 'Transfer In',sortable: false, value: 'transferin' },
          { text: 'Transfer Out',sortable: false, value: 'transferout' },
          { text: 'Disposal',sortable: false, value: 'disposal' },
          { text: 'End Balance', sortable: false, value: 'endbalance' },
          { text: 'Physical Count', value: 'pcount' },
        ],
        date_from: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        date_to: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        menu: false,
        menu2: false,
        branch_id: "",
        branch_information: [],
        product: "",
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
            {
                "text": 'Transfer Out',
                "value": 3
            }
        ],
        products: [],
        stockreport: [],
        xstockcard: [],
        stockmain: [],
        xstockitems: []
    }),
    created(){
        this.$store.state.header = true;
        this.$store.state.footer = true;
        this.$store.state.snackbar.color = 'orange';
        this.FetchBranchInformation();
        this.FetchProductInformation();
        this.getDates();
        this.headers = Object.values(this.headersMap);
        this.selectedHeaders = this.headers;        
        localStorage.setItem('totalCost', 0);
        this.setTotal();
    },
    mounted(){
        this.$store.state.title = "Stock Card Report";
    },
    computed: {
      //Done to get the ordered headers
      showHeaders () {
        return this.headers.filter(s => this.selectedHeaders.includes(s));
      }
    },
    methods: {

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
        // clear all filter fields         
        clearfilter(){
            this.branch_id = "";
            this.action = "";
            this.search = "";
            this.getDates()
        },

        // printing report
        printReport(){
            var el = document.querySelector('#reportTable')
            console.log(el)
            this.PrintElem('#reportTable')
            window.open('/test?el='+JSON.stringify(el),'_blank')
        },

        // redirect stockcard report printing
        PrintElem(elem)
            {
                var mywindow = window.open('/summary', 'PRINT', 'height=400,width=600');

                var myCSS = `
                    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
                `;

                console.log(myCSS)

                mywindow.document.write('<h1><center>Stock Detailed Report</center></h1><br>');
                mywindow.document.write(myCSS);
                mywindow.document.write(document.querySelector(elem).innerHTML);
                
                setTimeout(() => {
                    
                    mywindow.document.close(); // necessary for IE >= 10
                    mywindow.focus(); // necessary for IE >= 10*/

                    mywindow.print();
                    mywindow.close();

                    return true;
                }, 200);
            },

            // set total cost
        setTotal(){
        this.$store.state.totalcosts = localStorage.getItem('totalCost')
        this.totalcosts = this.$store.getters.fetchtotalcost;
        },

        // get stockcard report information via filter fields
        getDates(){
            var filters = {
                date_from: this.date_from,
                date_to: this.date_to,
                branch_id: (this.branch_id['value'] != undefined)?this.branch_id['value']:"",
                myBranch: this.$store.getters.getBranchID,
                action: (this.action['value'] != undefined)?this.action['value']:"",
                product: (this.product['value'] != undefined)?this.product['value']:""
            }
            let payload = {
                    stockcard_report: JSON.stringify(filters)
                };
                var xstockitems =[]
            var accessToken = this.$store.getters.getAccessToken
            reportservices.fetchStockCardReportInformation(payload, accessToken).then(response => {
                if(response.data.success){
                    const xobj = response.data.result
                    for (const [key, value] of Object.entries(xobj)) {
                        console.log(key)
                        xstockitems.push(value);
                    }
                    this.stockreport = xstockitems
                    console.log(this.stockreport)
                }
                else{
                    console.log(response.data.message);
                }

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

        },

        // get product information
        FetchProductInformation(){

            this.products = [];

            let payload = {
                user_id: this.$store.getters.getParentID
            };
            
            productservices.fetchProductInformation(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    response.data.result.forEach((value) => {
                        this.products.push({
                            text: value.name,
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
  </style>