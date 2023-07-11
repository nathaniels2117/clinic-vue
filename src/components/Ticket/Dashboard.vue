<template>
    <v-container style="max-width: 90%">
      <v-row>
          <v-col cols="12">
             
                  <template slot="progress">
                      <v-progress-linear
                          color="deep-purple"
                          height="10"
                          indeterminate
                      ></v-progress-linear>
                  </template>
  
            <v-card-text>
  <v-row class="ma-0 pa-0 text-center"><template>
    <v-col 
            :md="3"
            :sm="3"
            :cols="12"
            :lg="3">
            <v-card
    class="mx-auto elevation-20"
    
    color="white"
    dark
    style="max-width: 400px;"
  >
    <v-row justify="space-between">
      <v-col cols="12">
        <v-card-title style="max-width:100%">
            <!-- <v-row
            no-gutters
            style="flex-wrap: nowrap;"
            >
            <v-col
              cols="3"
            > -->
            <v-layout   warp>
              <v-flex xs12 sm6 lg5 cols12  class="pa-0">
            <div class="text-h2 center" id="fontnumbercard" style="color: orange"> {{ this.ticketrequest }}</div>
            <!-- </v-col> -->
            </v-flex>
            <!-- <v-col col="1"> -->

              <v-flex xs12 sm6  class="pa-0">
              <v-icon large style="color:orange">
                mdi-email-fast
              </v-icon>
              <br>
              <font class="center" id="fontsizecard" style="color: orange">   Ticket Request</font>&nbsp;
              </v-flex>
            </v-layout>
            <!-- </v-row> -->
        </v-card-title>
      </v-col>
      <!-- <v-img
        class="shrink ma-2"
        contain
        height="125px"
        src="https://cdn.vuetifyjs.com/images/cards/halcyon.png"
        style="flex-basis: 125px"
      ></v-img> -->
    </v-row>
    <v-divider dark></v-divider>
    <v-spacer></v-spacer>
  </v-card>
</v-col>

<v-col 
            :md="3"
            :sm="3"
            :cols="12"
            :lg="3">
            <v-card
    class="mx-auto elevation-20"
    
    color="white"
    dark
    style="max-width: 400px;"
  >
    <v-row justify="space-between">
      <v-col cols="12">
        <v-card-title style="max-width:100%">
            <!-- <v-row
            no-gutters
            style="flex-wrap: nowrap;"
            >
            <v-col
              cols="3"
            > -->
            <v-layout   warp>
              <v-flex xs12 sm6 lg5 cols12  class="pa-0">
            <div class="text-h2 center" id="fontnumbercard" style="color: #dc2424dc"> {{ this.ticketpending }}</div>
            <!-- </v-col> -->
            </v-flex>
            <!-- <v-col col="1"> -->

              <v-flex xs12 sm6  class="pa-0">
              <v-icon large style="color:#dc2424dc">
                mdi-table-clock
              </v-icon>
              <br>
              <font class="center" id="fontsizecard" style="color: #dc2424dc">   Pending Ticket</font>&nbsp;
              </v-flex>
            </v-layout>
            <!-- </v-row> -->
        </v-card-title>
      </v-col>
      <!-- <v-img
        class="shrink ma-2"
        contain
        height="125px"
        src="https://cdn.vuetifyjs.com/images/cards/halcyon.png"
        style="flex-basis: 125px"
      ></v-img> -->
    </v-row>
    <v-divider dark></v-divider>
    <v-spacer></v-spacer>
  </v-card>
</v-col>


<v-col 
            :md="3"
            :sm="3"
            :cols="12"
            :lg="3">
            <v-card
    class="mx-auto elevation-20"
    
    color="white"
    dark
    style="max-width: 400px;"
  >
    <v-row justify="space-between">
      <v-col cols="12">
        <v-card-title style="max-width:100%">
            <!-- <v-row
            no-gutters
            style="flex-wrap: nowrap;"
            >
            <v-col
              cols="3"
            > -->
            <v-layout   warp>
              <v-flex xs12 sm6 lg5 cols12  class="pa-0">
            <div class="text-h2 center" id="fontnumbercard" style="color: #0974f7"> {{ this.ticketresponded }}</div>
            <!-- </v-col> -->
            </v-flex>
            <!-- <v-col col="1"> -->

              <v-flex xs12 sm6  class="pa-0">
              <v-icon large style="color:#0974f7">
                mdi-email-newsletter
              </v-icon>
              <br>
              <font class="center" id="fontsizecard" style="color: #0974f7"> Ticket Responded</font>&nbsp;
              </v-flex>
            </v-layout>
            <!-- </v-row> -->
        </v-card-title>
      </v-col>
      <!-- <v-img
        class="shrink ma-2"
        contain
        height="125px"
        src="https://cdn.vuetifyjs.com/images/cards/halcyon.png"
        style="flex-basis: 125px"
      ></v-img> -->
    </v-row>
    <v-divider dark></v-divider>
    <v-spacer></v-spacer>
  </v-card>
</v-col>


<v-col 
            :md="3"
            :sm="3"
            :cols="12"
            :lg="3">
            <v-card
    class="mx-auto elevation-20"
    
    color="white"
    dark
    style="max-width: 400px;"
  >
    <v-row justify="space-between">
      <v-col cols="12">
        <v-card-title style="max-width:100%">
            <!-- <v-row
            no-gutters
            style="flex-wrap: nowrap;"
            >
            <v-col
              cols="3"
            > -->
            <v-layout   warp>
              <v-flex xs12 sm6 lg5 cols12  class="pa-0">
            <div class="text-h2 center" id="fontnumbercard" style="color: #05c318cb"> {{ this.ticketfinish }}</div>
            <!-- </v-col> -->
            </v-flex>
            <!-- <v-col col="1"> -->

              <v-flex xs12 sm6  class="pa-0">
              <v-icon large style="color:#05c318cb">
                mdi-flag-checkered
              </v-icon>
              <br>
              <font class="center" id="fontsizecard" style="color: #05c318cb"> Finished Ticket</font>&nbsp;
              </v-flex>
            </v-layout>
            <!-- </v-row> -->
        </v-card-title>
      </v-col>
      <!-- <v-img
        class="shrink ma-2"
        contain
        height="125px"
        src="https://cdn.vuetifyjs.com/images/cards/halcyon.png"
        style="flex-basis: 125px"
      ></v-img> -->
    </v-row>
    <v-divider dark></v-divider>
    <v-spacer></v-spacer>
  </v-card>
</v-col>





  
</template>
</v-row>
                    <zingchart :data="chartData1"></zingchart>
                    <br>
                    <v-card
                      elevation="11"
                    >
                    <v-card-title class="justify-center">
                      Tickets Finished per Department
                    </v-card-title>
                    <v-row>
                      <v-col cols="1"></v-col>
                      <v-col
            :md="2"
            :sm="2"
            :cols="12"
            :lg="2">
                        <center>
                          <div class="text-h2" style="color: orange">{{ this.finishitd }}<font size="3px"> out of <b>{{ this.itdtotaltickets }}</b></font></div>
                    <b>ITD</b>
                    </center>
                      </v-col>
                      <v-col cols="1" id="divIWantedToHide" style="max-width: 0;">
                      <hr class="divider">
                      </v-col>
                      <v-col
            :md="2"
            :sm="2"
            :cols="12"
            :lg="2">
                        <center>
                          <div class="text-h2" style="color: orange">{{ this.finishtmd }}<font size="3px"> out of <b>{{ this.tmdtotaltickets }}</b></font></div>
                    <b>TMD</b>
                    </center>
                      </v-col>
                      <v-col cols="1" id="divIWantedToHide" style="max-width: 0;">
                      <hr class="divider">
                      </v-col>
                      <v-col
            :md="2"
            :sm="2"
            :cols="12"
            :lg="2">
                        <center>
                          <div class="text-h2" style="color: orange">{{ this.finishprocurement }}<font size="3px"> out of <b>{{ this.procurementtotaltickets }}</b></font></div>
                    <b>Procurement</b>
                    </center>
                      </v-col>
                      <v-col cols="1" id="divIWantedToHide" style="max-width: 0;">
                      <hr class="divider">
                      </v-col>
                      <v-col
            :md="2"
            :sm="2"
            :cols="12"
            :lg="2">
                        <center>
                          <div class="text-h2" style="color: orange">{{ this.finishisid }}<font size="4px"> out of <b>{{ this.isidtotaltickets }}</b></font></div>
                          <b>ISID</b>
                    </center>
                      </v-col>
                      <v-col cols="1" id="divIWantedToHide" style="max-width: 0;">
                      <hr class="divider">
                      </v-col>
                      <v-col
            :md="2"
            :sm="2"
            :cols="12"
            :lg="2">
                        <center>
                          <div class="text-h2" style="color: orange">{{ this.finishmarketing }}<font size="3px"> out of  <b>{{ this.marketingtotaltickets }}</b></font></div>
                          <b>Marketing</b>
                    </center>
                      </v-col>
                    </v-row>
                    </v-card>
                    <br>

                    <zingchart :data="chartData"></zingchart><br>
                    



                    <v-card
                      elevation="11"
                    >
                    <v-card-title class="justify-center">
                      Delayed Ticket
                    </v-card-title>
                    <v-row>
                      <v-col cols="1"></v-col>
                      <v-col
            :md="2"
            :sm="2"
            :cols="12"
            :lg="2">
                        <center>
                          <v-card color="blue" style="padding:10px">
                          <div class="text-h2" style="color: white;">{{ this.delayitd }}</div>
                    <b style="color: white">ITD</b>

                          </v-card>
                    </center>
                      </v-col>
                      <v-col
            :md="2"
            :sm="2"
            :cols="12"
            :lg="2">
                        <center>
                          <v-card color="red" style="padding:10px">
                          <div class="text-h2" style="color: white">{{ this.delaytmd }}</div>
                    <b style="color: white">TMD</b>

                          </v-card>
                    </center>
                      </v-col>
                      <v-col
            :md="2"
            :sm="2"
            :cols="12"
            :lg="2">
                        <center>
                          <v-card color="green" style="padding:10px">
                          <div class="text-h2" style="color: white">{{ this.delayprocurement }}</div>
                    <b style="color: white">Procurement</b>

                          </v-card>
                    </center>
                      </v-col>
                      <v-col
            :md="2"
            :sm="2"
            :cols="12"
            :lg="2">
                        <center>
                          <v-card color="purple" style="padding:10px">
                          <div class="text-h2" style="color: white">{{ this.delayisid }}</div>
                          <b style="color: white">ISID</b>
                          </v-card>
                    </center>
                      </v-col>
                      <v-col
                      :md="2"
                      :sm="2"
                      :cols="12"
                      :lg="2">
                        <center>
                          <v-card color="orange" style="padding:10px">
                          <div class="text-h2" style="color: white">{{ this.delaymarketing }}</div>
                          <b style="color: white">Marketing</b>
                          </v-card>
                    </center>
                      </v-col>
                      <v-col cols="1"></v-col>
                    </v-row>
                    <br>
                    </v-card>
                    <br>

                    <zingchart :data="linedata"></zingchart>
   
                    
                  </v-card-text>
  
              
          </v-col>
  
      </v-row>
  
    </v-container>
      
  </template>
  
  <script>
  
  import ticketservices from "../services/ticketservices";

    export default {
      name: 'TicketDashboard',
      data: () => ({
          loading: false,
          todate: '',
          ticketrequest: 0,
          ticketpending: 0,
          ticketresponded: 0,
          ticketfinish: 0,
          delayitd: 0,
          delaytmd: 0,
          delayprocurement: 0,
          delaymarketing: 0,
          delayisid: 0,
          finishitd: 0,
          finishtmd: 0,
          finishprocurement: 0,
          finishmarketing: 0,
          finishisid: 0,
          marketingtotaltickets: 0,
          procurementtotaltickets: 0,
          isidtotaltickets: 0,
          itdtotaltickets: 0,
          tmdtotaltickets: 0,
          depts: [],
          maxtat: 0,
          maximumtickets: 0,
          seriesticket: {},

  //         chartData: {
  //               type: 'hbar',
  //             legend: {    layout: "5x1", //row x column 
  //              x: "90%",    y: "8%",  },
  //              plotarea: {    'margin-bottom': "15%",    'margin-top': "25%"  },
  //                'scale-y': {
  //                     values: "0:100:10",    
  //                     guide: {      'line-style': "dotted"    },  
  //                     // label: { /* Scale Title */      
  //                     //   text: "ITD",    
  //                     // }, 
  //                   },  
  // //               plot: {
  // //   'border-radius': "8px", /* Rounded Corners */
  // // },
  // plot: {    animation: {        effect: 11, delay: "500"    }},
               
  //              'scale-x':{
  //               labels: [ "Jan", "Feb", "March", "April", "May", "June", "July", "Aug" ] /* Scale Labels */ 
  //              },
  //               series: [
  //                   {values: [10,30,3,10,5,15],text: "ITD",'background-color': "#f54001 #efb923", /* Bar fill color (gradient) */
  //     alpha: 0.5 /* Transparency (more transparent) */},
  //                   {values: [2,20,30,30,20,10],text: "TMD",'background-color': "#f54001 #efb923", /* Bar fill color (gradient) */
  //     alpha: 0.5 /* Transparency (more transparent) */},
  //                   {values: [10,15,2,20,25,15],text: "MKTG",'background-color': "#f54001 #efb923", /* Bar fill color (gradient) */
  //     alpha: 0.5 /* Transparency (more transparent) */},
  //                   {values: [10,15,2,20,25,15],text: "PROC",'background-color': "#f54001 #efb923", /* Bar fill color (gradient) */
  //     alpha: 0.5 /* Transparency (more transparent) */},
  //                   {values: [10,15,2,20,25,15],text: "ISID",'background-color': "#f54001 #efb923", /* Bar fill color (gradient) */
  //     alpha: 0.5 /* Transparency (more transparent) */},
  //               ]
  //           },
            chartData: [],
            chartData1: [],

      //           series: [
      //               {values: [10,30,3,10,5,15],'background-color': "#f54001 #efb923", /* Bar fill color (gradient) */
      // alpha: 0.5 /* Transparency (more transparent) */},
      //               {values: [2,20,30,30,20,10],'background-color': "#f54001 #efb923", /* Bar fill color (gradient) */
      // alpha: 0.5 /* Transparency (more transparent) */},
      //               {values: [10,15,2,20,25,15],'background-color': "#f54001 #efb923", /* Bar fill color (gradient) */
      // alpha: 0.5 /* Transparency (more transparent) */},
      //           ]
      linedata: []
            // linedata: {  type: "pie",
            //   legend: {    layout: "1x5", //row x column 
            //    x: "35%",    y: "8%",  },
            //    plotarea: {    'margin-bottom': "15%",    'margin-top': "25%"  },
            //      'scale-y': {
            //           values: "0:10:2",    
            //           guide: {      'line-style': "dotted"    }  
            //         },  
            //         series: [
            //           // {      values: [1,2,3,4,5],      text: "TMD"    },
            //           // {      values: [2,3,4,5,6],      text: "ITD"    },    
            //           // {      values: [3,4,5,6,7],      text: "PROC"    },    
            //           // {      values: [4,5,6,7,8],      text: "ISID"    },    
            //           // {      values: [5,6,7,8,9],      text: "MKTG"    }
            //           {      values: [1],      text: "TMD"    },
            //           {      values: [2],      text: "ITD"    },    
            //           {      values: [3],      text: "PROC"    },    
            //           {      values: [4],      text: "ISID"    },    
            //           {      values: [5],      text: "MKTG"    }
            //           ]},
          
                  
        
      }),
      // components: {
        
      //   zingchartVue
      // },
      created(){
          this.$store.state.header = true;
          this.$store.state.footer = true;
          this.FetchTicketInformation();
      },
      mounted(){
          this.$store.state.title = "Ticketing Dashboard";
      },
      methods: {
        FetchTicketInformation(){
            const today = new Date();
            const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

            // const date2 = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+(today.getDate()+1);
            // const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            // const dateTime = date +' '+ time;
            this.todate = date; 
          let payload = {
                todate: date,
                dept_id: 1,
                parent_id: 1
            };
            ticketservices.fetchTicketInformationViaDate(payload).then(response => {
                if(response.data.success){
                    this.ticketrequest = response.data.ticketrequest;
                    this.ticketpending = response.data.ticketpending;
                    this.ticketresponded = response.data.ticketresponded;
                    this.ticketfinish = response.data.ticketfinish;

                    this.maximumtickets = Math.max.apply(Math, response.data.maxs);
                    this.generateDataChar1(response.data.seriepending, response.data.seriesongoing, response.data.seriesfinish, response.data.departments, this.maximumtickets)
                    this.maxtat = Math.max.apply(Math, response.data.tat);
                    this.generateTAT(response.data.tat, response.data.departments, this.maxtat)
                    // console.log(response.data.itd);
                    // console.log(response.data.departments)
                    this.delayitd = response.data.delayitd;
                    this.delaytmd = response.data.delaytmd;
                    this.delayprocurement = response.data.delayprocurement;
                    this.delaymarketing = response.data.delaymarketing;
                    this.delayisid = response.data.delayisid;
                    this.finishitd = response.data.finishitd;
                    this.finishtmd = response.data.finishtmd;
                    this.finishprocurement = response.data.finishprocurement;
                    this.finishmarketing = response.data.finishmarketing;
                    this.finishisid = response.data.finishisid;


                    this.finishitd = response.data.finishitd;
                    this.finishtmd = response.data.finishtmd;
                    this.finishprocurement = response.data.finishprocurement;
                    this.finishmarketing = response.data.finishmarketing;
                    this.finishisid = response.data.finishisid;


                    this.marketingtotaltickets = response.data.marketingtotaltickets
                    this.procurementtotaltickets = response.data.procurementtotaltickets
                    this.isidtotaltickets = response.data.isidtotaltickets
                    this.itdtotaltickets = response.data.itdtotaltickets
                    this.tmdtotaltickets = response.data.tmdtotaltickets
                    
                    this.generatePie(response.data.itd, response.data.tmd, response.data.procurement, response.data.marketing, response.data.isid)

                    // this.seriesticket = response.data.seriesticket;
                }
            }).catch(error => console.log(error));
        },
        // generateDataChar1(itd, tmd, procurement, marketing, isid){
          // console.log(itd)
          // console.log(tmd)
          // console.log(procurement)
          // console.log(marketing)
          // console.log(isid)
        generateDataChar1(ticketpending, ticketongoing, ticketfinish, depts, maxs){
          this.chartData1 = {
                      type: 'bar',
                      legend: {    layout: "1x3", //row x column 
                      x: "35%",    y: "2%",  },
                      plot: {    animation: {        effect: 11, delay: "500"    }},
                        'scale-x': {    
                      label: { /* Scale Title */      
                        text: this.todate,    
                      },    
                        // labels: [ "Pending", "Ongoing", "Finish" ] /* Scale Labels */ 
                        // labels: [ 'ITD', 'TMD', 'Procurement', 'Marketing', 'ISID' ]
                        labels: depts
                      }, 
                      'scale-y': {
                      values: "0:"+maxs+":2",    
                      guide: {      'line-style': "dotted"    }  
                      },
                      series:[
                      {values: ticketpending,
                        'background-color': "red",
                        alpha: 0.3,
                        text: "Pending",
                      },
                      {values: ticketongoing,
                        'background-color': "blue",
                        alpha: 0.3,
                        text: "Ongoing",
                      },
                      {values: ticketfinish,
                        'background-color': "green",
                        alpha: 0.3,
                        text: "Finished",
                      }
                      //   {values: itd,
                      //   // 'background-color': "#f54001 #efb923",
                      //   alpha: 0.5,
                      //   text: "ITD",
                      // },
                      // {values: tmd,
                      //   // 'background-color': "#f54001 #efb923",
                      //   alpha: 0.5,
                      //   text: "TMD",
                      // },
                      // {values: procurement,
                      //   // 'background-color': "#f54001 #efb923",
                      //   alpha: 0.5,
                      //   text: "Procurement",
                      // },
                      // {values: marketing,
                      //   // 'background-color': "#f54001 #efb923",
                      //   alpha: 0.5,
                      //   text: "Marketing",
                      // },
                      // {values: isid,
                      //   // 'background-color': "#f54001 #efb923",
                      //   alpha: 0.5,
                      //   text: "ISID",
                      // }
                    ]
                    }
        },
        generateTAT(tat, depts, maxhrs){
          this.chartData = {
                      type: 'hbar',
                      legend: {    layout: "1x1", //row x column 
                      x: "50%",    y: "2%",  },
                      plot: {    animation: {        effect: 11, delay: "500"    }},
                        'scale-x': {    
                      // label: { /* Scale Title */      
                      //   text: "Turn Around Time / Hour",    
                      // },    
                        labels: depts,
                        // x: "10%",
                        // y: "5%"
                      }, 
                      'scale-y': {
                      values: "0:"+maxhrs+":2",  
                      guide: {      'line-style': "dotted"    }  ,
                      label: { 
                        text: "Turn Around Time / Hour",    
                      }
                      },
                      series:[
                      {values: tat,
                        'background-color': "red",
                        alpha: 0.3,
                        text: "TAT",
                      }
                    ]
                    }

        },
        generatePie(itd, tmd, procurement, marketing, isid){
          this.linedata = {
                      type: 'pie',
                      legend: {    layout: "1x5", //row x column 
                      x: "30%",    y: "2%",  },
                      plot: {    animation: {        effect: 11, delay: "500"    }},
                        'scale-x': {    
                      label: { /* Scale Title */      
                        text: this.todate,    
                      },    
                        // labels: [ "Pending", "Ongoing", "Finish" ] /* Scale Labels */ 
                        labels: [ 'ITD', 'TMD', 'Procurement', 'Marketing', 'ISID' ]
                      }, 
                      'scale-y': {
                      values: "0:10:2",    
                      guide: {      'line-style': "dotted"    }  
                      },
                      series:[
                        {values: itd,
                        // 'background-color': "#f54001 #efb923",
                        'background-color': "blue",
                        alpha: 0.5,
                        text: "ITD",
                      },
                      {values: tmd,
                        // 'background-color': "#f54001 #efb923",
                        'background-color': "red",
                        alpha: 0.5,
                        text: "TMD",
                      },
                      {values: procurement,
                        // 'background-color': "#f54001 #efb923",
                        'background-color': "green",
                        alpha: 0.5,
                        text: "Procurement",
                      },
                      {values: marketing,
                        // 'background-color': "#f54001 #efb923",
                        'background-color': "orange",
                        alpha: 0.5,
                        text: "Marketing",
                      },
                      {values: isid,
                        // 'background-color': "#f54001 #efb923",
                        'background-color': "purple",
                        alpha: 0.5,
                        text: "ISID",
                      }
                    ]
                    }
        }
      }
    }

  </script>
  <style>
  .center{
    text-align: center;
    color: black;
  }
  .divider{
    margin-left: 5px;
    margin-right: 5px;
    height: 100px;
    width: 1px;
    background-color: red;
}
@media only screen and (max-width: 629px) {
  #divIWantedToHide {
    display: none;
  }
}

@media only screen and (max-width: 320px) {
  #fontsizecard {
    font-size: 10px;
  }
  #fontnumbercard{
    font-size: 10px;
  }
}

@media only screen and (max-width: 768px) {
  #fontsizecard {
    font-size: 8px;
  }
  #fontnumbercard{
    font-size: 10px;
  }
}
</style>