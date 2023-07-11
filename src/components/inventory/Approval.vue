<template>
    <v-container style="max-width: 95%; position: relative;" >
        <v-row>
        <v-col cols="12">
          <v-card>
              <v-card-text>
        <template>
        <v-toolbar dense style="">

            <!-- check approval type -->
            <template  v-if="prodApp=='si'">
                <v-row>
                    <v-col cols="12">
                <v-text-field
                    v-model="searchsi"
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
                    <v-select v-model="selectedHeaderssi"  solo dense :menu-props="{ bottom: true, offsetY: true }" color="orange"
                    hide-details :items="headerssi" multiple return-object overflow style="max-width: 200px;min-width: 5px;">
                        <template v-slot:selection="{ item, index }">
                        <span v-if="index === 2" class="grey--text caption"></span>
                        <div
                        v-if="index === 0"
                            >
                        <v-icon color="orange">mdi-view-column</v-icon><font color="orange"> Column</font>
                    </div>
                        </template>
                    </v-select>
                    </template>


                    <template v-if="$vuetify.breakpoint.smAndDown">

                    
                    <v-select v-model="selectedHeaderssi" dense solo :menu-props="{ bottom: true, offsetY: true }" color="orange"
                    hide-details :items="headerssi" multiple return-object overflow  style="max-width: 76px;" background-color="orange">
                        <template v-slot:selection="{ item, index }">
                        <span v-if="index === 2" class="grey--text caption"></span>
                        <div
                        v-if="index === 0"
                            >
                        <v-icon color="white">mdi-filter</v-icon><font color="orange"></font>
                    </div>
                        </template>
                    </v-select>
                    </template>
            </template>

            <!-- check approval type -->
            <template  v-if="prodApp=='so'">
                <v-row>
                    <v-col cols="12">
                <v-text-field
                    v-model="searchso"
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
                    <v-select v-model="selectedHeadersso"  solo dense :menu-props="{ bottom: true, offsetY: true }" color="orange"
                    hide-details :items="headersso" multiple return-object overflow style="max-width: 200px;min-width: 5px;">
                        <template v-slot:selection="{ item, index }">
                        <span v-if="index === 2" class="grey--text caption"></span>
                        <div
                        v-if="index === 0"
                            >
                        <v-icon color="orange">mdi-view-column</v-icon><font color="orange"> Column</font>
                    </div>
                        </template>
                    </v-select>
                    </template>


                    <template v-if="$vuetify.breakpoint.smAndDown">

                    
                    <v-select v-model="selectedHeadersso" dense solo :menu-props="{ bottom: true, offsetY: true }" color="orange"
                    hide-details :items="headersso" multiple return-object overflow  style="max-width: 76px;" background-color="orange">
                        <template v-slot:selection="{ item, index }">
                        <span v-if="index === 2" class="grey--text caption"></span>
                        <div
                        v-if="index === 0"
                            >
                        <v-icon color="white">mdi-filter</v-icon><font color="orange"></font>
                    </div>
                        </template>
                    </v-select>
                    </template>
            </template>

            <!-- check approval type -->
            <template  v-if="prodApp=='ti'">
                <v-row>
                    <v-col cols="12">
                <v-text-field
                    v-model="searchti"
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
                    <v-select v-model="selectedHeadersto"  solo dense :menu-props="{ bottom: true, offsetY: true }" color="orange"
                    hide-details :items="headersto" multiple return-object overflow style="max-width: 200px;min-width: 5px;">
                        <template v-slot:selection="{ item, index }">
                        <span v-if="index === 2" class="grey--text caption"></span>
                        <div
                        v-if="index === 0"
                            >
                        <v-icon color="orange">mdi-view-column</v-icon><font color="orange"> Column</font>
                    </div>
                        </template>
                    </v-select>
                    </template>


                    <template v-if="$vuetify.breakpoint.smAndDown">

                    
                    <v-select v-model="selectedHeadersto" dense solo :menu-props="{ bottom: true, offsetY: true }" color="orange"
                    hide-details :items="headersto" multiple return-object overflow  style="max-width: 76px;" background-color="orange">
                        <template v-slot:selection="{ item, index }">
                        <span v-if="index === 2" class="grey--text caption"></span>
                        <div
                        v-if="index === 0"
                            >
                        <v-icon color="white">mdi-filter</v-icon><font color="orange"></font>
                    </div>
                        </template>
                    </v-select>
                    </template>
            </template>

            <!-- check approval type -->
            <template  v-if="prodApp=='to'">
                <v-row>
                    <v-col cols="12">
                <v-text-field
                    v-model="searchto"
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
                    <v-select v-model="selectedHeadersto"  solo dense :menu-props="{ bottom: true, offsetY: true }" color="orange"
                    hide-details :items="headersto" multiple return-object overflow style="max-width: 200px;min-width: 5px;">
                        <template v-slot:selection="{ item, index }">
                        <span v-if="index === 2" class="grey--text caption"></span>
                        <div
                        v-if="index === 0"
                            >
                        <v-icon color="orange">mdi-view-column</v-icon><font color="orange"> Column</font>
                    </div>
                        </template>
                    </v-select>
                    </template>


                    <template v-if="$vuetify.breakpoint.smAndDown">

                    
                    <v-select v-model="selectedHeadersto" dense solo :menu-props="{ bottom: true, offsetY: true }" color="orange"
                    hide-details :items="headersto" multiple return-object overflow  style="max-width: 76px;" background-color="orange">
                        <template v-slot:selection="{ item, index }">
                        <span v-if="index === 2" class="grey--text caption"></span>
                        <div
                        v-if="index === 0"
                            >
                        <v-icon color="white">mdi-filter</v-icon><font color="orange"></font>
                    </div>
                        </template>
                    </v-select>
                    </template>
            </template>

            <!-- check approval type -->
            <template  v-if="prodApp=='dis'">
                <v-row>
                    <v-col cols="12">
                <v-text-field
                    v-model="searchdis"
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
                    <v-select v-model="selectedHeadersto"  solo dense :menu-props="{ bottom: true, offsetY: true }" color="orange"
                    hide-details :items="headersto" multiple return-object overflow style="max-width: 200px;min-width: 5px;">
                        <template v-slot:selection="{ item, index }">
                        <span v-if="index === 2" class="grey--text caption"></span>
                        <div
                        v-if="index === 0"
                            >
                        <v-icon color="orange">mdi-view-column</v-icon><font color="orange"> Column</font>
                    </div>
                        </template>
                    </v-select>
                    </template>


                    <template v-if="$vuetify.breakpoint.smAndDown">

                    
                    <v-select v-model="selectedHeadersto" dense solo :menu-props="{ bottom: true, offsetY: true }" color="orange"
                    hide-details :items="headersto" multiple return-object overflow  style="max-width: 76px;" background-color="orange">
                        <template v-slot:selection="{ item, index }">
                        <span v-if="index === 2" class="grey--text caption"></span>
                        <div
                        v-if="index === 0"
                            >
                        <v-icon color="white">mdi-filter</v-icon><font color="orange"></font>
                    </div>
                        </template>
                    </v-select>
                    </template>
            </template>
            &nbsp;

            <!-- check approval type -->
                <div v-if="prodApp=='si'">
                </div>

            <!-- check approval type -->
                <div v-if="prodApp=='so'">
                </div>

            <!-- check approval type -->
                <div v-if="prodApp=='ti'">
                </div>

            <!-- check approval type -->
                <div v-if="prodApp=='to'">
                </div>

            <!-- check approval type -->
                <div v-if="prodApp=='dis'">
                </div>
                

                &nbsp;
            <template v-if="$vuetify.breakpoint.mdAndUp">
            
                <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                    color="orange"
                    elevation="2"
                    dark
                    medium
                    v-bind="attrs"
                    v-on="on"
                    >
                    <v-icon>mdi-chart-bar-stacked</v-icon>
                    Stock Process
                    </v-btn>
                </template>
                <v-list>
                    <v-list-item
                    v-for="(item, index) in exportimport"
                    :key="index"
                    >
                    <div v-if="item.linktrigger == 1">
                    <v-list-item-title v-if="$store.getters.valAccess(48)" @click="alertsin()"> <v-icon>{{ item.icon }}</v-icon>{{ item.text }}</v-list-item-title>
                    </div>
                    <div v-else-if="item.linktrigger == 2">
                    <v-list-item-title v-if="$store.getters.valAccess(48)" @click="alertsout()"> <v-icon>{{ item.icon }}</v-icon>{{ item.text }}</v-list-item-title>
                    </div>
                    <div v-else-if="item.linktrigger == 3">
                    <v-list-item-title v-if="$store.getters.valAccess(48)" @click="alertstransferin()"> <v-icon>{{ item.icon }}</v-icon>{{ item.text }}</v-list-item-title>
                    </div>
                    <div v-else-if="item.linktrigger == 4">
                    <v-list-item-title v-if="$store.getters.valAccess(48)" @click="alertstransferout()"> <v-icon>{{ item.icon }}</v-icon>{{ item.text }}</v-list-item-title>
                    </div>
                    <div v-else>
                    <v-list-item-title @click="alertsdisposal()"> <v-icon>{{ item.icon }}</v-icon>{{ item.text }}</v-list-item-title>
                    </div>
                    </v-list-item>
                </v-list>
                </v-menu>
            </template>

            &nbsp;
            <template v-if="$vuetify.breakpoint.smAndDown">
            
                <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                    color="orange"
                    elevation="2"
                    dark
                    medium
                    v-bind="attrs"
                    v-on="on"
                    >
                    <v-icon>mdi-chart-bar-stacked</v-icon>
                    </v-btn>
                </template>
                <v-list>
                    <v-list-item
                    v-for="(item, index) in exportimport"
                    :key="index"
                    >
                    <div v-if="item.linktrigger == 1">
                    <v-list-item-title v-if="$store.getters.valAccess(48)" @click="alertsin()"> <v-icon>{{ item.icon }}</v-icon>{{ item.text }}</v-list-item-title>
                    </div>
                    <div v-else-if="item.linktrigger == 2">
                    <v-list-item-title v-if="$store.getters.valAccess(48)" @click="alertsout()"> <v-icon>{{ item.icon }}</v-icon>{{ item.text }}</v-list-item-title>
                    </div>
                    <div v-else-if="item.linktrigger == 3">
                    <v-list-item-title v-if="$store.getters.valAccess(48)" @click="alertstransferin()"> <v-icon>{{ item.icon }}</v-icon>{{ item.text }}</v-list-item-title>
                    </div>
                    <div v-else-if="item.linktrigger == 4">
                    <v-list-item-title v-if="$store.getters.valAccess(48)" @click="alertstransferout()"> <v-icon>{{ item.icon }}</v-icon>{{ item.text }}</v-list-item-title>
                    </div>
                    <div v-else>
                    <v-list-item-title @click="alertsdisposal()"> <v-icon>{{ item.icon }}</v-icon>{{ item.text }}</v-list-item-title>
                    </div>
                    </v-list-item>
                </v-list>
                </v-menu>
            </template>

                
            </v-toolbar>
        </template>



            <!-- check approval type -->
    <v-row v-if="prodApp=='si'">
        <v-col cols="12">
                <template slot="progress">
                    <v-progress-linear
                        color="orange"
                        height="10"
                        indeterminate
                    ></v-progress-linear>
                </template>
                <br>  
                    <template>
                        <v-data-table
                            :headers="showHeaderssi"
                            :search="searchsi"
                            :items="product"
                            :items-per-page="10"
                            :page.sync="page"
                      @page-count="pageCount = $event"
                      :footer-props="{
                      showFirstLastPage: false,
                      'items-per-page-options':[10],
                      'disable-items-per-page': true
    }"
                        >
                            <template v-slot:item.process="props">
                                {{ props.item.action == 1 ? 'Stock In' : props.item.action == 2 ? 'Stock Out' : props.item.action == 3 ? 'Transfer Out' : props.item.action }}
                            </template>
                            
                            <template v-slot:item.action="props">
                                <v-btn
                                elevation="2"
                                    dark
                                    outlined
                                    small
                                    color="orange"
                                    v-if="$store.getters.valAccess(129)"
                                    @click="ApproveStockCard(props.item.id)"
                                >
                                <v-icon
                                        extra small
                                    @click="ApproveStockCard(props.item.id)"
                                    >
                                    mdi-file-edit-outline
                                    </v-icon>
                                    Edit
                                </v-btn>                                
                            </template>
                        </v-data-table>
                        <v-pagination
                  color="orange"
        v-model="page"
        :length="pageCount"
      ></v-pagination>
                    </template>
        </v-col>

    </v-row>

            <!-- check approval type -->
    <v-row v-if="prodApp=='so'">
        <v-col cols="12">
                <template slot="progress">
                    <v-progress-linear
                        color="orange"
                        height="10"
                        indeterminate
                    ></v-progress-linear>
                </template>
                <br>
                    <template>
                        <v-data-table
                            :headers="showHeadersso"
                            :search="searchso"
                            :items="product"
                            :items-per-page="10"
                            :page.sync="page"
                      @page-count="pageCount = $event"
                      :footer-props="{
                      showFirstLastPage: false,
                      'items-per-page-options':[10],
                      'disable-items-per-page': true
    }"
                        >
                            <template v-slot:item.process="props">
                                {{ props.item.action == 1 ? 'Stock In' : props.item.action == 2 ? 'Stock Out' : props.item.action == 3 ? 'Transfer Out' : props.item.action }}
                            </template>

                            
                            <template v-slot:item.action="props">
                                <v-btn
                                elevation="2"
                                    dark
                                    outlined
                                    small
                                    color="orange"
                                    v-if="$store.getters.valAccess(130)"
                                    @click="ApproveStockCard(props.item.id)"
                                >
                                <v-icon
                                        extra small
                                    @click="ApproveStockCard(props.item.id)"
                                    >
                                    mdi-file-edit-outline
                                    </v-icon>
                                    Edit
                                </v-btn>                                  
                            </template>
                        </v-data-table>
                        <v-pagination
                  color="orange"
        v-model="page"
        :length="pageCount"
      ></v-pagination>
                    </template>
        </v-col>
    </v-row>

            <!-- check approval type -->
    <v-row v-if="prodApp=='ti'">
        <v-col cols="12">
                <template slot="progress">
                    <v-progress-linear
                        color="orange"
                        height="10"
                        indeterminate
                    ></v-progress-linear>
                </template>
                <br>
                    <template>
                        <v-data-table
                            :headers="showHeadersto"
                            :items="product"
                            :search="searchti"
                            :items-per-page="10"
                            :page.sync="page"
                      @page-count="pageCount = $event"
                      :footer-props="{
                      showFirstLastPage: false,
                      'items-per-page-options':[10],
                      'disable-items-per-page': true
    }"
                        >
                            <template v-slot:item.process="props">
                                {{ props.item.action == 1 ? 'Stock In' : props.item.action == 2 ? 'Stock Out' : props.item.action == 3 ? 'Transfer Out': props.item.action == 4 ? 'Transfer In' : props.item.action }}
                            </template>
                
                            <template v-slot:item.action="props">
                                <v-btn
                                elevation="2"
                                    dark
                                    outlined
                                    small
                                    color="orange"
                                    v-if="$store.getters.valAccess(210)"
                                        @click="ApproveStockCard(props.item.id)"
                                >
                                <v-icon
                                        extra small
                                        @click="ApproveStockCard(props.item.id)"
                                    >
                                    mdi-file-edit-outline
                                    </v-icon>
                                    Edit
                                </v-btn>                                  
                            </template>
                        </v-data-table>
                        <v-pagination
                        color="orange"
        v-model="page"
        :length="pageCount"
      ></v-pagination>                        
                    </template>
        </v-col>

    </v-row>

            <!-- check approval type -->
    <v-row v-if="prodApp=='to'">
        <v-col cols="12">
                <template slot="progress">
                    <v-progress-linear
                        color="orange"
                        height="10"
                        indeterminate
                    ></v-progress-linear>
                </template>
                <br>  
                    <template>
                        <v-data-table
                            :headers="showHeadersto"
                            :search="searchto"
                            :items="product"
                            :items-per-page="10"
                            :page.sync="page"
                      @page-count="pageCount = $event"
                      :footer-props="{
                      showFirstLastPage: false,
                      'items-per-page-options':[10],
                      'disable-items-per-page': true
    }"
                        >
                            <template v-slot:item.process="props">
                                {{ props.item.action == 1 ? 'Stock In' : props.item.action == 2 ? 'Stock Out' : props.item.action == 3 ? 'Transfer Out' : props.item.action }}
                            </template>

                            <template v-slot:item.action="props">
                                <v-btn
                                elevation="2"
                                    dark
                                    outlined
                                    small
                                    color="orange"
                                    v-if="$store.getters.valAccess(131)"
                                    @click="ApproveStockCard(props.item.id)"
                                >
                                <v-icon
                                        extra small
                                        v-if="props.item.status== 0 || props.item.status_in==0"
                                    @click="ApproveStockCard(props.item.id)"
                                    >
                                    mdi-file-edit-outline
                                    </v-icon>
                                    Edit
                                </v-btn>                                 
                                <h1 v-if="props.item.status_in!= 0">
                                {{ props.item.status_remarks }}
                                </h1>
                            </template>
                        </v-data-table>
                        <v-pagination
                        color="orange"
        v-model="page"
        :length="pageCount"
      ></v-pagination>                        
                    </template>
        </v-col>

    </v-row>

            <!-- check approval type -->
        <v-row v-if="prodApp=='dis'">
        <v-col cols="12">
                <template slot="progress">
                    <v-progress-linear
                        color="orange"
                        height="10"
                        indeterminate
                    ></v-progress-linear>
                </template>
                <br>
                    <template>
                        <v-data-table
                            :headers="showHeadersto"
                            :search="searchdis"
                            :items="product"
                            :items-per-page="10"
                            :page.sync="page"
                      @page-count="pageCount = $event"
                      :footer-props="{
                      showFirstLastPage: false,
                      'items-per-page-options':[10],
                      'disable-items-per-page': true
    }"                            
                        >
                            <template v-slot:item.process="props">
                                {{ props.item.action == 1 ? 'Stock In' : props.item.action == 2 ? 'Stock Out' : props.item.action == 3 ? 'Transfer Out' : props.item.action }}
                            </template>

                            
                            <template v-slot:item.action="props">
                                <v-btn
                                elevation="2"
                                    dark
                                    outlined
                                    small
                                    color="orange"
                                    v-if="$store.getters.valAccess(132)"
                                    @click="ApproveStockCard(props.item.id)"
                                >
                                <v-icon
                                        extra small
                                        v-if="$store.getters.valAccess(132)"
                                    @click="ApproveStockCard(props.item.id)"
                                    >
                                    mdi-file-edit-outline
                                    </v-icon>
                                    Edit
                                </v-btn>                                  
                            </template>
                        </v-data-table>
                        <v-pagination
                        color="orange"
        v-model="page"
        :length="pageCount"
      ></v-pagination>                        
                    </template>
        </v-col>
    </v-row>

                    <!-- New Dialog -->
                    <v-dialog
                    v-model="approve"
                    fullscreen
                    hide-overlay
                    transition="dialog-bottom-transition"
                    >
                    <v-card>
                        <v-toolbar
                        dark
                        color="orange"
                        >
                        <v-btn
                            icon
                            dark
                            @click="approve = false"
                        >
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                        <v-toolbar-title>Product</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-toolbar-items>
                        </v-toolbar-items>
                        <v-toolbar-items>
                        </v-toolbar-items>
                        </v-toolbar> 
                        <br>
                            <v-row v-for="stocks in stock" :key="stocks.id">
                                <v-col md="3">
                                    <v-text-field
                                        label="Product Name"
                                        outlined
                                        v-model="stocks.get_product_information_via_i_d.name"
                                        readonly=""
                                        color="orange"
                                    ></v-text-field>
                                </v-col>
                                <v-col md="2">
                                    <v-text-field
                                        outlined
                                        label="Quantity"
                                        v-model="stocks.qty"
                                        :rules="[numberRule]"
                                        @keypress="filter(event)"
                                        @change="checkValue(stocks.qty, stocks.get_product_information_via_i_d.name)"
                                        color="orange"
                                    ></v-text-field>
                                </v-col>
                                <v-col md="1">
                                    <v-text-field
                                        outlined
                                        label="Unit Measurement"
                                        v-model="stocks.uom"
                                        readonly=""
                                        color="orange"
                                    ></v-text-field>
                                </v-col>
                                <v-col md="2">
                                    <v-text-field
                                        outlined
                                        label="Cost"
                                        v-model="stocks.approved_cost"
                                        :rules="[numberRule]"
                                        @keypress="filter(event)"
                                        color="orange"
                                    ></v-text-field>
                                </v-col>
                                <v-col md="4">
                                        <!-- single-line -->
                                    <v-text-field
                                        outlined
                                        label="Remarks"
                                        v-model="stocks.remarks"
                                        :required="isRequired ? true : false"
                                        color="orange"
                                    ></v-text-field>
                                </v-col>

                            </v-row>
                            <v-row>
                                <v-col>
                                    <v-btn
                          elevation="2"
                          class="mx-2"
                          dark
                          block
                          small
                          outlined
                          color="orange"
                          @click="confirmApprove()"
                        >
                          Approve
                      </v-btn>
                                </v-col>
                                <v-col>
                      <v-btn
                          elevation="2"
                          dark
                          block
                          small
                          outlined
                          color="red"
                          @click="confirmDispprove()"
                        >
                          Disapprove
                      </v-btn>
                                </v-col>
                            </v-row>
                        
                    </v-card>
                    </v-dialog>

<!-- approve confirmation dialog -->
    <template>
  <v-row justify="center">
    <v-dialog
      v-model="approveconfirmation"
      persistent
      max-width="290"
        color="orange"
    >
      <v-card>
        <v-card-title class="text-h5">
          Approve
        </v-card-title>
        <v-card-text>Are you sure you want to Approve?</v-card-text>
        <center>
          <v-btn
            elevation="2"
            class="mx-2"
            dark
            outlined
            small
            color="red"
            @click="changeStatusDialogApprove(false)"
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
            @click="UpdateStockCardApproval('APPROVED',1)"
            >
            Confirm
          </v-btn>
        </center>
        <br>        
      </v-card>
    </v-dialog>
  </v-row>
</template>
<!-- end approve confirmation dialog -->

<!-- disapprove confirmation dialog -->
    <template>
  <v-row justify="center">
    <v-dialog
      v-model="disapproveconfirmation"
      persistent
      max-width="290"
    >
      <v-card>
        <v-card-title class="text-h5">
          Disapprove
        </v-card-title>
        <v-card-text>Are you sure you want to Disapprove?</v-card-text>
        <center>
          <v-btn
            elevation="2"
            class="mx-2"
            dark
            outlined
            small
            color="red"
            @click="changeStatusDialogDisapprove(false)"
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
            @click="UpdateStockCardApproval('DISAPPROVED',2)"
            >
            Confirm
          </v-btn>
        </center>
        <br>         
      </v-card>
    </v-dialog>
  </v-row>
</template>
<!-- end disapprove confirmation dialog -->

</v-card-text>
</v-card>
</v-col>
</v-row>
  </v-container>
</template>

<script>

  import approvalservices from "../services/approvalservices";

  export default {
    name: 'Approval',
    data: () => ({
        searchso: '',
        searchsi: '',
        searchti: '',
        searchto: '',
        searchdis: '',
        page: 1,
        pageCount: 0,
        approve: false,
        loading: false,
        exportimport: [{ text: 'Stock In', icon: 'mdi-elevator-down', linktrigger: 1 },
          { text: 'Stock Out', icon: 'mdi-elevator-up', linktrigger: 2 },
          { text: 'Transfer In', icon: 'mdi-elevator', linktrigger: 3 },
          { text: 'Transfer Out', icon: 'mdi-elevator', linktrigger: 4 },
          { text: 'Disposal', icon: 'mdi-delete-forever', linktrigger: 5 }],
        headerssi:[],
        selectedHeaderssi: [],
         stockinheaders: [
          {
            text: 'MIS',
            align: 'start',
            sortable: true,
            value: 'mis',
          },
          { text: 'Process',sortable: false, value: 'process' },
          { text: 'Supplier',sortable: false, value: 'transfer_from_name' },
          { text: 'Branch',sortable: false, value: 'branch_name' },
          { text: 'Location',sortable: false, value: 'location_to_name' },
          { text: 'Remarks',sortable: false, value: 'remarks' },
          { text: 'Created By',sortable: false, value: 'issued_by_name' },
          { text: 'Date Created',sortable: false, value: 'created_at' },
          { text: 'Action',sortable: false, value: 'action' }
        ],
        headersso:[],
        selectedHeadersso: [],
         stockoutheaders: [
          {
            text: 'MIS',
            align: 'start',
            sortable: true,
            value: 'mis',
          },
          { text: 'Process',sortable: false, value: 'process' },
          { text: 'Branch',sortable: false, value: 'branch_name' },
          { text: 'Location From',sortable: false, value: 'location_from_name' },
          { text: 'Location To',sortable: false, value: 'location_to_name' },
          { text: 'Remarks',sortable: false, value: 'remarks' },
          { text: 'Created By',sortable: false, value: 'issued_by_name' },
          { text: 'Date Created',sortable: false, value: 'created_at' },
          { text: 'Action',sortable: false, value: 'action' }
        ],
        headersto:[],
        selectedHeadersto: [],
         transferoutheaders: [
          {
            text: 'MIS',
            align: 'start',
            sortable: true,
            value: 'mis',
          },
          { text: 'Process',sortable: false, value: 'process' },
          { text: 'Branch From', sortable: false, value: 'transfer_from_name' },
          { text: 'Branch To',sortable: false, value: 'transfer_to_name' },
          { text: 'Location From',sortable: false, value: 'location_from_name' },
          { text: 'Location To',sortable: false, value: 'location_to_name' },
          { text: 'Remarks',sortable: false, value: 'remarks' },
          { text: 'Created By',sortable: false, value: 'issued_by_name' },
          { text: 'Date Created', sortable: false, value: 'created_at' },
          { text: 'Action',sortable: false, value: 'action' }
        ],
        isRequired: "",
        product:[],
        status_ins: 0,
        stock:[],
        stockmainID: "",
        remarks: [],
        todate: "",
        sample: [
            
        ],
        numberRule: v  => {
        if (!v.trim()) return true;
        if (!isNaN(parseFloat(v)) && v >= 0 && v <= 999) return true;
        return 'Number has to be between 0 and 999';
        },
        approveconfirmation: false,
        disapproveconfirmation: false,
        prodApp: "si",

    }),
    created(){
        this.$store.state.header = true;
        this.$store.state.footer = true;
        this.FetchStockCardApproval(1);
        this.FetchBranchInformation();
        this.$store.state.snackbar.color = 'orange';
        this.headerssi = Object.values(this.stockinheaders);
        this.selectedHeaderssi = this.headerssi;
        this.headersso = Object.values(this.stockoutheaders);
        this.selectedHeadersso = this.headersso;   
        this.headersto = Object.values(this.transferoutheaders);
        this.selectedHeadersto = this.headersto;                 
    },
    mounted(){
        this.$store.state.title = "Product Approval";
    },
    computed: {
      //Done to get the ordered headers
      showHeaderssi () {
        return this.headerssi.filter(s => this.selectedHeaderssi.includes(s));
      },
      showHeadersso () {
        return this.headersso.filter(s => this.selectedHeadersso.includes(s));
      },
      showHeadersto () {
        return this.headersto.filter(s => this.selectedHeadersto.includes(s));
      }
    },    
    methods: {
        // get today date
        getdate(){
            const today = new Date();
            const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            const dateTime = date +' '+ time;
            this.todate = dateTime;  
        },
        // show alert per type
        alertsin(){
            this.prodApp = "si"
            this.FetchStockCardApproval(1)
        },
        // show alert per type
        alertsout(){
            this.prodApp = "so"
            this.FetchStockCardApproval(2)
        },
        // show alert per type
        alertstransferout(){
            this.prodApp = "to"
            this.FetchStockCardApproval(3)
        },
        // show alert per type
        alertstransferin(){
            this.prodApp = "ti"
            this.FetchStockCardApproval(4)
        },
        // show alert per type
        alertsdisposal(){
            this.prodApp = "dis"
            this.FetchStockCardApproval(5)
        },

        // check pop up message status
        changeStatusDialogApprove(status){
            this.approveconfirmation = status;
        },
        changeStatusDialogDisapprove(status){
            this.disapproveconfirmation = status;
        },
        // end check pop up message status

        // accept only numbers
        filter: function(evt) {
        evt = (evt) ? evt : window.event;
        let expect = evt.target.value.toString() + evt.key.toString();
        
        if (!/^[-+]?[0-9]*\.?[0-9]*$/.test(expect)) {
            evt.preventDefault();
        } else {
            return true;
        }
        },

        // checking if null
        checkValue(id, name){
            if(id == 0.00 || id == 0){
                this.$store.state.snackbar.message = "Please input a remarks on "+name;
                this.$store.state.snackbar.show = true;
            }else if(id == undefined){
                console.log(id)
            }
        },

        // get pending stockcard
        FetchStockCardApproval(action){

            let payload = {
                branch_id: this.$store.getters.getBranchID,
                action: action
            };

            approvalservices.FetchStockCardApproval(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    this.product = response.data.result;
                }
            }).catch(error => console.log(error));
            

        }, 

        // get id approving stockcard
        ApproveStockCard(id){
            this.SetEditStockItemInformation(id);
            this.approve = true;   
            this.checkValue();       
        },

        // set stockcard item
        SetEditStockItemInformation(id){
            let payload = {
                id: id
            };
            
            this.stockmainID = id
            approvalservices.FetchStockCardItemApprovalViaID(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    console.log(response.data.result)
                    this.stock = response.data.result;
                }
            }).catch(error => console.log(error));

        },

        // confirm approval
        confirmApprove(){
            this.approveconfirmation = true
        },
        // confirm disapprove
        confirmDispprove(){
            this.disapproveconfirmation = true
        },

        // update stockcard status and remarks
        UpdateStockCardApproval(status_remarks,status){
            this.getdate();
                let payload = {
                    stockcarditem_information: JSON.stringify(this.stock),
                    stockcard_information:JSON.stringify({
                        id: this.stockmainID, 
                        approver:this.$store.getters.getUserID,
                        approver_name:this.$store.getters.getUserName,
                        status: status,
                        status_remarks: status_remarks,
                        approver_in:null,
                        approver_name_in:null,
                        approved_at_in:null,
                        status_in: status,
                        status_remarks_in: status_remarks
                    })

                }

            
                approvalservices.UpdateStockItemApproval(payload, this.$store.getters.fetchUserInfo.access_token).then(response => {
                    if(response.data.success){
                        this.approve = false;
                        this.$store.state.snackbar.message = response.data.message;
                        this.$store.state.snackbar.show = true;
                        this.FetchStockCardApproval();
                        this.disapproveconfirmation = false;
                        this.approveconfirmation = false;
                    }
                }).catch(error => console.log(error));
        }
    }
  }
</script>

<style scoped>

</style>