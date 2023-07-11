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
                    :items="stockcard"
                    :items-per-page="10"
                    :search="search"
                    :page.sync="page"
                      @page-count="pageCount = $event"
                      :footer-props="{
                      'items-per-page-options':[10],
                      'disable-items-per-page': true,
    }"
                    id="reportTable"
                >
                <template v-slot:item.get_main.transfer_from_name="props">
                    {{ props.item.get_main.transfer_from_name }}<br>
                    <font size="1">{{ props.item.get_main.location_from_name }}</font>
                </template>
                <template v-slot:item.get_main.transfer_to_name="props">
                    {{ props.item.get_main.transfer_to_name }}<br>
                    <font size="1">{{ props.item.get_main.location_to_name }}</font>
                </template>
                <template v-slot:item.get_main.approved_at="props">
                    {{ props.item.get_main.approved_at == "1987-01-01 00:00:00" ? '' : props.item.get_main.approved_at }}
                </template>
                <template v-slot:item.process="props">
                        {{ props.item.get_main.action == 1 ? 'Stock In' : props.item.get_main.action == 2 ? 'Stock Out' : props.item.get_main.action == 3 ? 'Transfer Out' : props.item.get_main.action == 4 ? 'Transfer In' : props.item.get_main.action == 5 ? 'Disposal' : props.item.get_main.action }}
                </template>
                <template v-slot:item.qty="props">
                    {{ props.item.approved_qty }}<br>
                    <font size="1">{{ props.item.qty }}</font>
                </template>

                <template v-slot:item.unit_cost="props">
                <div v-if="props.item.get_main.action == 1">
                    {{ props.item.approved_cost }}<br>
                    <font size="1">{{ props.item.unit_cost }}</font>
                </div>
                <div v-else>
                    {{ props.item.unit_cost }}<br>
                </div>
                </template>
                <template v-slot:item.net_cost="props">
                <div v-if="props.item.product_info.is_vatable == 1">
                    {{ parseFloat(props.item.approved_cost/1.12).toFixed(2) }}<br>
                </div>
                <div v-else>
                    {{ props.item.approved_cost/1 }}<br>
                </div>
                </template>
                <template v-slot:item.total_cost="props">
                <div v-if="props.item.product_info.is_vatable == 1">
                    {{ parseFloat((props.item.approved_cost/1.12)*props.item.approved_qty).toFixed(2) }}<br>
                </div>
                <div v-else>
                    {{ props.item.approved_cost*props.item.approved_qty}}<br>
                </div>
                </template>
                <template slot="body.append">
                <tr class="pink--text">
                        <th>Grand Total</th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th>{{ this.totalcosts }}</th>
                    </tr>
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
  import productservices from "../services/productservices";
  import reportservices from "../services/reportservices";
  import moment from 'moment';

  export default {
    name: 'DetailedReport',
    data: () => ({
        loading: false,
        page: 1,
        pageCount: 0,
        search: '',
        headers:[],
        selectedHeaders: [],
        headersMap: [
          {
            text: 'Approved Date',
            align: 'start',
            sortable: true,
            value: 'get_main.approved_at',
          },
          { text: 'MIS',sortable: false, value: 'get_main.mis' },
          { text: 'Process',sortable: false, value: 'process' },
          { text: 'From',sortable: false, value: 'get_main.transfer_from_name' },
          { text: 'To',sortable: false, value: 'get_main.transfer_to_name' },
          { text: 'Product',sortable: false, value: 'product_info.name' },
          { text: 'Approved/Rqstd Qty',sortable: false, value: 'qty' },
          { text: 'UOM',sortable: false, value: 'uom' },
          { text: 'Approved/Rqstd Cost',sortable: false, value: 'unit_cost' },
          { text: 'Net Cost',sortable: false, value: 'net_cost' },
          { text: 'Total Net Cost',sortable: false, value: 'total_cost' },
        ],
        radioGroup: [],
        filterdate: [{ text: 'Today', icon: 'mdi-elevator-down', linktrigger: 1 },
          { text: 'Last Day', icon: 'mdi-elevator-up', linktrigger: 2 },
          { text: 'Last 15 Days', icon: 'mdi-elevator', linktrigger: 3 },
          { text: 'Last 30 Days', icon: 'mdi-elevator', linktrigger: 4 }],        
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
        product: "",
        status: "",
        action: "",
        grandtotalcost: 0,
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
        products: [],
        stockcard: [],
        xstockcard: [],
        stockmain: []
    }),
    created(){
        this.$store.state.header = true;
        this.$store.state.footer = true;
        this.FetchBranchInformation();
        this.FetchProductInformation();
        this.getDates();
        this.$store.state.snackbar.color = 'orange';
        localStorage.setItem('totalCost', 0);
        this.setTotal();
        this.headers = Object.values(this.headersMap);
        this.selectedHeaders = this.headers;        
    },
    mounted(){
        this.$store.state.title = "Stock Detailed Reports";
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
        
        // clear all filters
        clearfilter(){
            this.branch_id = "";
            this.action = "";
            this.search = "";
            this.getDates()
        },

        // printing reports
        printReport(){
            var el = document.querySelector('#reportTable')
            console.log(el)
            this.PrintElem('#reportTable')
            window.open('/test?el='+JSON.stringify(el),'_blank')
        },

        // redirecting printing reports
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

        // get info report via filters
        getDates(){
            var filters = {
                parent_user_id: this.$store.getters.getParentID,
                date_from: this.date_from,
                date_to: this.date_to,
                branch_id: (this.branch_id['value'] != undefined)?this.branch_id['value']:"",
                action: (this.action['value'] != undefined)?this.action['value']:"",
                product: (this.product['value'] != undefined)?this.product['value']:""
            }
            let payload = {
                    summary_report: JSON.stringify(filters)
                };
            var accessToken = this.$store.getters.getAccessToken
            reportservices.fetchDetailedSummaryInformation(payload, accessToken).then(response => {
                if(response.data.success){
                    this.stockmain = response.data.result;
                        var tCost = 0
                        var xStockCard = []
                        this.stockmain.forEach(function(v) {
                            var filtersmain = {
                                id: v['id']
                            }
                            // get via stockmain id
                            reportservices.fetchDetailedSummaryInformationViaMainID(filtersmain, accessToken).then(response2 => {
                                
                                if(response2.data.success){
                                    var xObj = response2.data.result;
                                    xObj.forEach(function(x){
                                        xStockCard.push(x);
                                        if(x.product_info.is_vatable == 1){
                                        tCost += parseFloat((x.approved_cost/1.12)*x.approved_qty)
                                        }else{
                                        tCost += parseFloat(x.approved_cost*x.approved_qty)
                                        }
                                        
                                    });
                                }
                                    localStorage.setItem('totalCost',parseFloat(tCost.toFixed(2)))
                            }).catch(error => console.log(error));
                        });
                        this.stockcard = xStockCard
                        this.setTotal();
                }
            }).catch(error => console.log(error));
        },


        // get branch informations
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