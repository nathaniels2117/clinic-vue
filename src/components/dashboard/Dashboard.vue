<!-- Positive Dashboard after login  -->
<template>
    <v-container style="max-width: 95%; position: relative;" >

      <!-- One liner for filtering -->
      <v-row>
        <v-col :md="9"
          :sm="6"
          :cols="12"
          :lg="9">
        <v-col
          v-for="card in cards"
          :key="card.title"
          :md="12"
          :sm="12"
          :cols="12"
          :lg="12"
        >
          <v-card
          :color="card.color" style="border-radius:20px; border: 1px solid black;">
          <v-card-text>
            <div v-if="(card.value == 'gross')">
              <br>
              <center>
              <h1 style="color:white; padding:0px 0px 5px 0px">{{ parseFloat(gross).toFixed(2) }}</h1>
              </center>
            </div>
            <div v-if="(card.value == 'net')">
              <br>
              <center>
              <h1 style="color:white; padding:0px 0px 5px 0px">{{ parseFloat(net).toFixed(2) }}</h1>
              </center>
            </div>
            <div v-if="(card.value == 'cost')">
              <br>
              <center>
              <h1 style="color:white; padding:0px 0px 5px 0px">{{ parseFloat(cost).toFixed(2) }}</h1>
              </center>
            </div>

            <center>
              <h1 style="color:white;">{{ card.title }}</h1>
            </center>
            <v-card-actions>
              <v-spacer></v-spacer>
            </v-card-actions>
            </v-card-text>
          </v-card>
        </v-col>
      </v-col>
    <v-col       
          :md="3"
          :sm="6"
          :cols="12"
          :lg="3">
&nbsp;
    <template  v-if="$vuetify.breakpoint.mdAndUp">
      <v-card cols="12" class="scrollable overflow-auto" style="border-radius:20px;">
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
            <hr>
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
        <v-divider></v-divider>
      </v-card>
</template> 
    <template  v-if="$vuetify.breakpoint.smAndDown">
      <v-card cols="12" class="scrollable overflow-auto" style="border-radius:20px;">
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
            <hr>
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
        <v-divider></v-divider>
      </v-card>
  &nbsp;
  </template>
  </v-col>
<!-- End of one liner for filtering -->
<!-- Dashboard UI -->
  <v-col
v-for="transactions in total_transactions"
:key="transactions.title"
:md="3"
:sm="3"
:cols="12"
:lg="3"
>
  <div v-if="(transactions.value == 'ttransaction')">
    <div>
        <v-card style="border: 1px solid black; border-radius:20px; background-color:aliceblue" height="130px">
            <v-card-text>
                <v-row class="pa-1"> 
                      <v-icon x-large>mdi-cart</v-icon>
                    <div class="col-9">
                        <h2 class="text-center" style="color:black; padding:0px"><b>{{ ttransaction }}</b></h2>
                        <h4 class="text-center" style="color:black; padding:0px"><b>{{ transactions.title }}</b></h4>
                        <h6 class="text-center" style="color:gray; padding:0px; font-style: italic;">{{ transactions.description }}</h6 >
                    </div>
                </v-row>
            </v-card-text>
        </v-card>
    </div>
  </div>
  <div v-if="(transactions.value == 'tcustomer')">
  <div>
        <v-card style="border: 1px solid black; border-radius:20px; background-color:aliceblue" height="130px">
            <v-card-text>
                <v-row class="pa-1"> 
                      <v-icon x-large>mdi-account-arrow-right</v-icon>
                    <div class="col-9">
                        <h2 class="text-center" style="color:black; padding:0px"><b>{{ tcustomer }}</b></h2>
                        <h4 class="text-center" style="color:black; padding:0px"><b>{{ transactions.title }}</b></h4>
                        <h6 class="text-center" style="color:gray; padding:0px; font-style: italic;">{{ transactions.description }}</h6 >
                    </div>
                </v-row>
            </v-card-text>
        </v-card>
    </div>
  </div>
  <div v-if="(transactions.value == 'profit')">
  <div>
        <v-card style="border: 1px solid black; border-radius:20px; background-color:aliceblue" height="130px">
            <v-card-text>
                <v-row class="pa-1"> 
                      <v-icon style="color:deepskyblue;" x-large>mdi-chart-timeline-variant-shimmer</v-icon>
                    <div class="col-9">
                        <h2 class="text-center" style="color:deepskyblue; padding:0px"><b>{{ parseFloat(profit).toFixed(2) }}</b></h2>
                        <h4 class="text-center" style="color:black; padding:0px"><b>{{ transactions.title }}</b></h4>
                        <h6 class="text-center" style="color:gray; padding:0px; font-style: italic;">{{ transactions.description }}</h6 >
                    </div>
                </v-row>
            </v-card-text>
        </v-card>
    </div>            
  </div>  
  <div v-if="(transactions.value == 'atransaction')">
  <div>
        <v-card style="border: 1px solid black; border-radius:20px; background-color:aliceblue" height="130px">
            <v-card-text>
                <v-row class="pa-1"> 
                      <v-icon style="color:yellowgreen;" x-large>mdi-cart-arrow-right</v-icon>
                    <div class="col-9">
                        <h2 class="text-center" style="color:yellowgreen; padding:0px"><b>{{ atransaction }}</b></h2>
                        <h4 class="text-center" style="color:black; padding:0px"><b>{{ transactions.title }}</b></h4>
                        <h6 class="text-center" style="color:gray; padding:0px; font-style: italic;">{{ transactions.description }}</h6 >
                    </div>
                </v-row>
            </v-card-text>
        </v-card>
    </div>             
  </div>
 </v-col>
         <v-col :md="3"
          :sm="6"
          :cols="12"
          :lg="3">
        <v-col
          v-for="transaction in transactions"
          :key="transaction.title"
          :md="12"
          :sm="12"
          :cols="12"
          :lg="12"
        >
        <v-card style="border: 1px solid black; border-radius:20px; background-color:aliceblue">

            <div v-if="(transaction.value == 'paused')">
              <h1><center>{{ paused }}</center></h1>
            </div>
            <div v-if="(transaction.value == 'voidt')">
              <h1 style="color:#fb8675"><center>{{ voidt }}</center></h1>
            </div>
            <div v-if="(transaction.value == 'backout')">
              <h1><center>{{ backout }}</center></h1>
            </div>  
            <div v-if="(transaction.value == 'returned')">
              <h1><center>{{ settleds }}</center></h1>
            </div>
            <center>
              <b>{{ transaction.title }}</b>
            </center>
            <br>
              <v-spacer></v-spacer>
          </v-card>
        </v-col>     
        </v-col>  

        <v-col       
          :md="9"
          :sm="6"
          :cols="12"
          :lg="9">
          <v-card cols="12" elevation="5" class="scrollable overflow-auto" height="500px" style="border-radius:20px;">
            <v-toolbar>
            <v-toolbar-title>Total Payment Summary</v-toolbar-title>
          </v-toolbar>
          <zingchart :data="most_applied_positionsm" ></zingchart>
                            <v-row class="yaxis_lg" v-for="(item, index) in this.paymenttype" :key="index" >
                                <div class="col-1">
                                </div>
                                <div class="col-1">
                                    <v-icon dense :color="random_color[index]">mdi-checkbox-blank-circle </v-icon>
                                </div>
                                <div class="col-3">
                                    <h5 class="text-left"><b>{{ item.payment_type_info.name }}</b></h5>
                                </div>
                                <div class="col-5">
                                    <h5 class="text-center"><b>{{ parseFloat(item.sum).toFixed(2) }}</b></h5>
                                </div>
                            </v-row>
                          </v-card>
        </v-col>  

        <v-col
        :md="12"
          :sm="12"
          :cols="12"
          :lg="12">
          <v-card style="border-radius:20px;">
            <v-toolbar>
                  <v-toolbar-title>Fast Moving Product</v-toolbar-title>

                  <v-progress-linear
                    :active="top_ten_product_loading"
                    :indeterminate="top_ten_product_loading"
                    absolute
                    bottom
                    color="deep-purple accent-4"
                  ></v-progress-linear>

                  <v-spacer></v-spacer>
              </v-toolbar>              
              <zingchart :data="myConfigBar" ></zingchart>
          </v-card>
          </v-col>
      </v-row>

    </v-container>

</template>
<!-- End of Dashboard UI -->
<script>

import dashboardservices from '../services/dashboardservices';
import moment from 'moment';

  export default {
    name: 'Dashboard',
    components: {
    },

    created(){
        this.generaterandomcolor();
        this.$store.state.header = true;
        this.$store.state.footer = true;
        this.$store.state.snackbar.color = 'primary';
        this.most_applied_datasm();
        this.getDates();
        this.most_applied_datasm_bar();
    },
    mounted(){
        this.$store.state.title = "Dashboard";
    },
    data: () => ({
      gross:0,
      net:0,
      cost:0,
      profit:0,
      paused:0,
      backout:0,
      settleds:0,
      voidt:0,
      returned:0,
      ttransaction:0,
      paymenttype: [],
      top10product: [],
      discountitem_total: [{
        values : [],
      }],
      discountitem: [],
      discountitem_data: [],
      discountitem_series: [],
      tcustomer:0,
      atransaction:0,
      most_applied_positionsm : [],
      top10product_data: [],
      myConfigBar: [],
      myConfig: [],
      random_color : [],
      payment_data: [],
      payment_series: [],
      date_from: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      date_to: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),   
      menu: false,
      menu2: false,   
      radioGroup: [],
      menus: false,
filterdate: [{ text: 'Today', icon: 'mdi-elevator-down', linktrigger: 1 },
          { text: 'Last Day', icon: 'mdi-elevator-up', linktrigger: 2 },
          { text: 'Last 15 Days', icon: 'mdi-elevator', linktrigger: 3 },
          { text: 'Last 30 Days', icon: 'mdi-elevator', linktrigger: 4 }],
      cards: [
        { title: 'Gross Sales', value: 'gross', color:"#fb8675", md: 4, sm: 6, lg: 3, cols: 12},
        { title: 'Net Sales', value: 'net', color:"#6bafbc", md: 4, sm: 12, lg: 3, cols: 12 },
        { title: 'Cost Sales', value: 'cost', color:"#f3cf85", md: 4, sm: 12, lg: 3, cols: 12 },
      ],
      total_transactions:[
      { title: 'Total Transaction', value: 'ttransaction',color:"white", description: "Settled, void and cancelled transactions"},
        { title: 'Total Customer', value: 'tcustomer',color:"white", description: "Total count of customer"},
        { title: 'Total Earning', value: 'profit',color:"white", description: "Revenue from first transaction up to latest"},
        { title: 'Active Transaction', value: 'atransaction',color:"white", description: "Ongoing transaction in ordering module"},
      ],
      transactions: [
      { title: 'Paused Transactions', value: 'paused', md: 3, sm: 12 },
        { title: 'Canceled Transactions', value: 'backout', md: 3, sm: 12 },
        { title: 'Voided Transactions', value: 'voidt', md: 3, sm: 12 },
        { title: 'Settled Transactions', value: 'returned', md: 3, sm: 12 },
      ],
      total_payment_loading: false,
      top_ten_product_loading: false
    }),
    methods: {
      FetchTransactionDiscountInformation(){
            var filters = {
                date_from: this.date_from,
                date_to: this.date_to
            }
            let payload={
            dashboard: JSON.stringify(filters),
            business_branch_id: this.$store.getters.getBranchID
        };
              dashboardservices.fetchTransactionDiscountInformation(payload, this.$store.getters.getAccessToken).then(response => {
                  if(response.data.success){
                      this.discountitem = response.data.result;
                      this.discountitem.forEach((value) => {
                        console.log(value.sum)
                            this.discountitem_series.push(
                                value.sum);
                        });
                        this.discountitem_total['values'] =this.discountitem_series
                        console.log(this.discountitem_series)
                        console.log(this.discountitem_total);
                  }
              }).catch(error => console.log(error));
          }, 

      FetchTransactionTopProductInformation(){
            var filters = {
                date_from: this.date_from,
                date_to: this.date_to
            }
            let payload={
            dashboard: JSON.stringify(filters),
            business_branch_id: this.$store.getters.getBranchID
        };
              dashboardservices.fetchTransactionTopProductInformation(payload, this.$store.getters.getAccessToken).then(response => {
                  if(response.data.success){
                      this.top10product = response.data.result;
                      var i=0;
                      
                      this.top10product.forEach((value) => {
                        this.top10product_data.push(parseFloat(value.count))
                            this.top10product_series.push({
                                values: this.top10product_data,
                                "borderRadiusTopLeft": 7,
                                "text": value.product_info.name,
                                'background-color' : this.random_color[i]
                            });
                            this.top10product_data = []
                            i++;
                        });
                        this.most_applied_datasm_bar();
                  }
              }).catch(error => console.log(error));
          },      
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
            localStorage.setItem('date_from',this.date_from)
            localStorage.setItem('date_to',this.date_to)
            this.payment_series = [];
            this.FetchTransactionPaymentInformation();
            this.top10product_series = [];
            this.FetchTransactionTopProductInformation();
            this.FetchTransactionDiscountInformation();
                 let payload = {
                      dashboard: JSON.stringify(filters),
                      business_branch_id: this.$store.getters.getBranchID
                  };
                  dashboardservices.fetchDashboardInformation(payload, this.$store.getters.getAccessToken).then(response => {
                  if(response.data.success){
                      this.dashboard = response.data.result;
                      if(this.dashboard[0].gross_sales == null){
                        this.dashboard[0].gross_sales = 0.00;
                      }
                      if(this.dashboard[0].net_sales == null){
                        this.dashboard[0].net_sales = 0.00;
                      }
                      if(this.dashboard[0].total_cost == null){
                        this.dashboard[0].total_cost = 0.00;
                      }
                      
                      this.gross = this.dashboard[0].gross_sales
                      this.net = this.dashboard[0].net_sales
                      this.cost = this.dashboard[0].total_cost
                      this.ttransaction = this.dashboard[0].ttransaction
                      this.atransaction = response.data.active_info
                      this.tcustomer = response.data.total_customer_info
                      this.profit = response.data.profit_info
                      this.paused = response.data.paused_info
                      this.voidt = response.data.void_info
                      this.backout = response.data.backout_info
                      this.settleds = response.data.settled_info
                  }
              }).catch(error => console.log(error));
        },        
      generaterandomcolor(){
                for(var i = 0; i < 100; i++){
                    var randomColor = Math.floor(Math.random()*16777215).toString(16);
                    this.random_color.push('#'+randomColor);
                }
            },
      FetchTransactionPaymentInformation(){
        var filters = {
                date_from: this.date_from,
                date_to: this.date_to
            }
                 let payload = {
                      dashboard: JSON.stringify(filters),
                      business_branch_id: this.$store.getters.getBranchID
                  };     
              dashboardservices.fetchTransactionPaymentInformation(payload, this.$store.getters.getAccessToken).then(response => {
                  if(response.data.success){
                      this.paymenttype = response.data.result;
                      var i=0;
                      this.paymenttype.forEach((value) => {
                            this.payment_data.push(parseFloat(value.sum))
                            this.payment_series.push({
                                values: this.payment_data,
                                slice: "85%",
                                'background-color' : this.random_color[i]
                            });
                            this.payment_data = []
                            i++;
                        });
                        this.most_applied_datasm();
                  }
              }).catch(error => console.log(error));
          },
          most_applied_datasm_line(){          
            this.myConfig= {
  "type": "line",
  "utc": true,
  "title": {
    "text": "Webpage Analytics",
    "font-size": "24px",
    "adjust-layout": true
  },
  "plotarea": {
    "margin": "dynamic 45 60 dynamic",
  },
  "legend": {
    "layout": "float",
    "background-color": "none",
    "border-width": 0,
    "shadow": 0,
    "align": "center",
    "adjust-layout": true,
    "toggle-action": "remove",
    "item": {
      "padding": 7,
      "marginRight": 17,
      "cursor": "hand"
    }
  },
  "scale-x": {
    "min-value": 1383292800000,
    "shadow": 0,
    "step": 3600000,
    "transform": {
      "type": "date",
      "all": "%D, %d %M<br />%h:%i %A",
      "item": {
        "visible": false
      }
    },
    "label": {
      "visible": false
    },
    "minor-ticks": 0
  },
  "scale-y": {
    "line-color": "#f6f7f8",
    "shadow": 0,
    "guide": {
      "line-style": "dashed"
    },
    "label": {
      "text": "Page Views",
    },
    "minor-ticks": 0,
    "thousands-separator": ","
  },
  "crosshair-x": {
    "line-color": "#efefef",
    "plot-label": {
      "border-radius": "5px",
      "border-width": "1px",
      "border-color": "#f6f7f8",
      "padding": "10px",
      "font-weight": "bold"
    },
    "scale-label": {
      "font-color": "#000",
      "background-color": "#f6f7f8",
      "border-radius": "5px"
    }
  },
  "tooltip": {
    "visible": false
  },
  "plot": {
    "highlight": true,
    "tooltip-text": "%t views: %v<br>%k",
    "shadow": 0,
    "line-width": "2px",
    "marker": {
      "type": "circle",
      "size": 3
    },
    "highlight-state": {
      "line-width": 3
    },
    "animation": {
      "effect": 1,
      "sequence": 2,
      "speed": 100,
    }
  },
  "series": [
    {
      "values": [
        714.6,
        656.3,
        660.6,
        729.8,
        731.6,
        682.3,
        654.6,
        673.5,
        700.6,
        755.2,
        817.8,
        809.1,
        815.2,
        836.6,
        897.3,
        896.9,
        866.5,
        835.8,
        797.9,
        784.7,
        802.8,
        749.3,
        722.1,
        688.1,
        730.4,
        661.5,
        609.7,
        630.2,
        633,
        604.2,
        558.1,
        581.4,
        511.5,
        556.5,
        542.1,
        599.7,
        664.8,
        725.3,
        694.2,
        690.5
      ],
      "text": "Documentation",
      "line-color": "#009872",
      "legend-item": {
        "background-color": "#009872",
        "borderRadius": 5,
        "font-color": "white"
      },
      "legend-marker": {
        "visible": false
      },
      "marker": {
        "background-color": "#009872",
        "border-width": 1,
        "shadow": 0,
        "border-color": "#69f2d0"
      },
      "highlight-marker": {
        "size": 6,
        "background-color": "#009872",
      }
    },
    {
      "values": [
        536.9,
        576.4,
        639.3,
        669.4,
        708.7,
        691.5,
        681.7,
        673,
        701.8,
        636.4,
        637.8,
        640.5,
        653.1,
        613.7,
        583.4,
        538,
        506.7,
        563.1,
        541.4,
        489.3,
        434.7,
        442.1,
        482.3,
        495.4,
        556.1,
        505.4,
        463.8,
        434.7,
        377.4,
        325.4,
        351.7,
        343.5,
        333.2,
        332,
        378.9,
        415.4,
        385,
        412.6,
        445.9,
        441.5
      ],
      "text": "Support",
      "line-color": "#da534d",
      "legend-item": {
        "background-color": "#da534d",
        "borderRadius": 5,
        "font-color": "white"
      },
      "legend-marker": {
        "visible": false
      },
      "marker": {
        "background-color": "#da534d",
        "border-width": 1,
        "shadow": 0,
        "border-color": "#faa39f"
      },
      "highlight-marker": {
        "size": 6,
        "background-color": "#da534d",
      }
    }
  ]
}          
         },
          most_applied_datasm_bar(){
            this.myConfigBar = {
          "graphset": [
          {
            "type": "bar",
            "background-color": "white",
            "title": {
                "font-color": "#7E7E7E",
                "backgroundColor": "none",
                "font-size": "22px",
                "alpha": 1,
                "adjust-layout":true,
            },
            "plotarea": {
                "margin": "dynamic"
            },
            "legend": {
                "layout": "x3",
                "overflow": "page",
                "alpha": 0.05,
                "shadow": false,
                "align":"center",
                "adjust-layout":true,
                "marker": {
                    "type": "circle",
                    "border-color": "none",
                    "size": "10px"
                },
                "border-width": 0,
                "maxItems": 10,
                "toggle-action": "hide",
                "pageOn": {
                    "backgroundColor": "#000",
                    "size": "10px",
                    "alpha": 0.65
                },
                "pageOff": {
                    "backgroundColor": "#7E7E7E",
                    "size": "10px",
                    "alpha": 0.65
                },
                "pageStatus": {
                    "color": "black"
                }
            },
            "plot": {   
                "bars-space-left":0.15,
                "bars-space-right":0.15,
                "animation": {
                    "effect": "ANIMATION_SLIDE_BOTTOM",
                    "sequence": 0, 
                    "speed": 800,
                    "delay": 800
                }
            },
            "scale-y": {
                "line-color": "#7E7E7E",
                "item": {
                    "font-color": "#7e7e7e"
                },
                "values": "0:60:10",
                "guide": {
                    "visible": true
                },
                "label": {
                  "text": "Quantity",
                  "font-family": "arial",
                  "bold": true,
                  "font-size": "14px",
                  "font-color": "#7E7E7E",
                },
            },
            "scaleX":{
                "values": [
                    "Product"
                ],
                "placement":"default",
                "tick":{
                    "size":58,
                    "placement":"cross"
                },
                "itemsOverlap":true,
                "item":{
                    "offsetY":-55
                }
            },
            "tooltip": {
              "visible": false
            },
            "crosshair-x":{
                "line-width":"100%",
                "alpha":0.18,
            },
            "series": this.top10product_series
        }
    ]
}
          },
            most_applied_datasm(){
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
                        text: "%pie-total-value" + '<br>' +  "Total",
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
                    series : this.payment_series
                }

            },
      FetchTransactionGrossInformation(){
        let payload={
          business_branch_id: this.$store.getters.getBranchID
        };
              dashboardservices.fetchTransactionGrossInformation(payload, this.$store.getters.getAccessToken).then(response => {
                  if(response.data.success){
                      this.gross = response.data.result;
                  }
              }).catch(error => console.log(error));
          },
          FetchTransactionNetInformation(){
            let payload={
          business_branch_id: this.$store.getters.getBranchID
        };
              dashboardservices.fetchTransactionNetInformation(payload, this.$store.getters.getAccessToken).then(response => {
                  if(response.data.success){
                      this.net = response.data.result;
                  }
              }).catch(error => console.log(error));
          },
          FetchTransactionCostInformation(){
            let payload={
          business_branch_id: this.$store.getters.getBranchID
        };
              dashboardservices.fetchTransactionCostInformation(payload, this.$store.getters.getAccessToken).then(response => {
                  if(response.data.success){
                      this.cost = response.data.result;
                  }
              }).catch(error => console.log(error));
          },
          FetchTransactionProfitInformation(){
            let payload={
          business_branch_id: this.$store.getters.getBranchID
        };
              dashboardservices.fetchTransactionProfitInformation(payload, this.$store.getters.getAccessToken).then(response => {
                  if(response.data.success){
                      this.profit = response.data.result;
                  }
              }).catch(error => console.log(error));
          },
          FetchTransactionSettledInformation(){
            let payload={
          business_branch_id: this.$store.getters.getBranchID
        };
              dashboardservices.fetchTransactionSettledInformation(payload, this.$store.getters.getAccessToken).then(response => {
                  if(response.data.success){
                      this.settleds = response.data.result;
                  }
              }).catch(error => console.log(error));
          },
          FetchTransactionVoidInformation(){
            let payload={
          business_branch_id: this.$store.getters.getBranchID
        };
              dashboardservices.fetchTransactionVoidInformation(payload, this.$store.getters.getAccessToken).then(response => {
                  if(response.data.success){
                      this.voidt = response.data.result;
                  }
              }).catch(error => console.log(error));
          },
          FetchTransactionBackoutInformation(){
            let payload={
          business_branch_id: this.$store.getters.getBranchID
        };
              dashboardservices.fetchTransactionBackoutInformation(payload, this.$store.getters.getAccessToken).then(response => {
                  if(response.data.success){
                      this.backout = response.data.result;
                  }
              }).catch(error => console.log(error));
          },
          FetchTransactionPausedInformation(){
            let payload={
          business_branch_id: this.$store.getters.getBranchID
        };
              dashboardservices.fetchTransactionPausedInformation(payload, this.$store.getters.getAccessToken).then(response => {
                  if(response.data.success){
                      this.paused = response.data.result;
                  }
              }).catch(error => console.log(error));
          },
          FetchTransactionReturnedInformation(){
            let payload={
          business_branch_id: this.$store.getters.getBranchID
        };
              dashboardservices.fetchTransactionReturnedInformation(payload, this.$store.getters.getAccessToken).then(response => {
                  if(response.data.success){
                      this.returned = response.data.result;
                  }
              }).catch(error => console.log(error));
          },
          FetchTransactionActiveInformation(){
            let payload={
          business_branch_id: this.$store.getters.getBranchID
        };
              dashboardservices.fetchTransactionActiveInformation(payload, this.$store.getters.getAccessToken).then(response => {
                  if(response.data.success){
                      this.atransaction = response.data.result;
                  }
              }).catch(error => console.log(error));
          },
          FetchTransactionTotalInformation(){
            let payload={
          business_branch_id: this.$store.getters.getBranchID
        };
              dashboardservices.fetchTransactionTotalInformation(payload, this.$store.getters.getAccessToken).then(response => {
                  if(response.data.success){
                      this.ttransaction = response.data.result;
                  }
              }).catch(error => console.log(error));
          },
          FetchTransactionTotalCustomerInformation(){
            let payload={
          business_branch_id: this.$store.getters.getBranchID
        };
              dashboardservices.fetchTransactionTotalCustomerInformation(payload,this.$store.getters.getAccessToken).then(response => {
                  if(response.data.success){
                      this.tcustomer = response.data.result;
                  }
              }).catch(error => console.log(error));
          }
    },

  }
</script>

<style scoped>
.chart {
  height: 100vh;
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