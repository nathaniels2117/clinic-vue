<template>
  <v-container style="max-width: 95%; position: relative;">
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-text>
            <!-- One liner filtering -->
            <template>
              <v-toolbar dense style="">
                <v-row>
                  <v-col cols="12">
                    <v-text-field v-model="search" append-icon="mdi-magnify" placeholder="Search" hide-details
                      color="purple" overflow solo dense style="min-width: 60px;"></v-text-field>
                  </v-col>
                </v-row>
                &nbsp;
                <template v-if="$vuetify.breakpoint.mdAndUp">
                  <div class="text-center">
                    <v-menu v-model="menucolumn" :close-on-content-click="false" :nudge-width="60" :nudge-left="60"
                      offset-y>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn color="purple" dark v-bind="attrs" v-on="on">
                          <v-icon>mdi-view-column</v-icon>Column
                        </v-btn>
                      </template>

                      <v-card style="padding-top:10px;min-width:50px;">
                        <v-list>
                          <ul>
                            <div v-for="(item, index) in headers" :key="index">
                              <input type="checkbox" :id="item.text" :value="item" v-model="selectedHeaders">
                              &nbsp;<label :for="item.text">{{ item.text }}</label>
                            </div>
                          </ul>
                        </v-list>

                      </v-card>
                    </v-menu>
                  </div>
                </template>

                <template v-if="$vuetify.breakpoint.smAndDown">
                  <div class="text-center">
                    <v-menu v-model="menucolumn" :close-on-content-click="false" :nudge-width="100" :nudge-left="100"
                      offset-y>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn color="purple" dark v-bind="attrs" v-on="on">
                          <v-icon>mdi-view-column</v-icon>
                        </v-btn>
                      </template>

                      <v-card style="padding-bottom:10px">
                        <br>
                        &nbsp; &nbsp;
                        <b>Column</b>
                        <v-list>
                          <ul>
                            <div v-for="(item, index) in headers" :key="index">
                              <input type="checkbox" :id="item.text" :value="item" v-model="selectedHeaders">
                              &nbsp;<label :for="item.text">{{ item.text }}</label>
                            </div>
                          </ul>
                        </v-list>
                      </v-card>
                    </v-menu>
                  </div>
                </template>

                &nbsp;

                <template v-if="$vuetify.breakpoint.mdAndUp">
                  <v-btn medium dark color="purple" elevation="2" @click="NewPatientPayment()">
                    <v-icon>mdi-plus</v-icon>Create
                  </v-btn>
                </template>

                <template v-if="$vuetify.breakpoint.smAndDown">
                  <v-btn medium dark color="purple" elevation="2" style="padding-left: 12px;padding-right: 12px;"
                    @click="NewPatientPayment()">
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </template>
              </v-toolbar>
            </template>
            <!-- One liner filtering -->
            <br>
            <!-- Patient Payment data table -->
            <v-data-table :headers="showHeaders" :items="patientpaymentservicesdata" :search="search" align="center"
              :page.sync="page" must-sort :sort-by.sync="sortBy" :sort-desc.sync="sortDesc"
              @page-count="pageCount = $event" :footer-props="{
                'items-per-page-options': [10],
                'disable-items-per-page': true,
              }">
              <template v-slot:item.description="props">
                <div @click="inlineblock()">
                  <span :class="classito" style="max-width: 300px;">
                    {{ props.item.description }}
                  </span>
                </div>
              </template>

              <template v-slot:item.amount_percentage="{ item }">
                <span>
                  {{ item.is_percentage ? item.amount_percentage + '%' : '₱' + item.amount_percentage }}
                </span>
              </template>

              <template v-slot:item.is_all="{ item }">
                <span>
                  {{ item.is_all == 0 ? 'Pharmacy Only' : 'All (Products & Services)' }}
                </span>
              </template>

              <template v-slot:item.category_id="{ item }">
                {{ item.category_info && item.category_info.name ? item.category_info.name : 'No Data' }}
              </template>

              <template v-slot:item.payment_date="{ item }">
                {{ formatDate(item.payment_date) }}
              </template>
              <template v-slot:item.action="props">
                <template v-if="$vuetify.breakpoint.xsOnly">
                  <v-row>
                    <v-btn elevation="2" class="mx-2" dark outlined small color="purple"
                      @click="UpdateAllPatientPayment(props.item.id, props.item)">
                      <v-icon small @click="UpdateAllPatientPayment(props.item.id, props.item)">
                        mdi-file-edit-outline
                      </v-icon>
                      Edit
                    </v-btn>
                    <template v-if="$vuetify.breakpoint.xsOnly">
                      <br>&nbsp;
                    </template>
                    <v-btn elevation="2" class="mx-2" dark outlined small color="purple"
                      @click="printPatientPayment(props.item)">
                      <v-icon small @click="printPatientPayment(props.item)">
                        mdi-printer
                      </v-icon>
                      Print
                    </v-btn>
                    <!-- 
                    <v-btn elevation="2" class="mx-2" dark outlined small color="red"
                      @click="DeletePatientPayment(props.item.id, props.item.name)">
                      <v-icon small @click="DeletePatientPayment(props.item.id, props.item.name)">
                        mdi-delete
                      </v-icon>
                      Delete
                    </v-btn>
                     -->
                  </v-row>
                </template>
                <template v-else>
                  <div v-if="$vuetify.breakpoint.mdAndDown">
                    &nbsp;
                  </div>
                  <v-btn elevation="2" class="mx-2" dark outlined small color="purple"
                    @click="UpdateAllPatientPayment(props.item.id, props.item)">
                    <v-icon small @click="UpdateAllPatientPayment(props.item.id, props.item)">
                      mdi-file-edit-outline
                    </v-icon>
                    Edit
                  </v-btn>
                  <div v-if="$vuetify.breakpoint.mdAndDown">
                    &nbsp;
                  </div>
                  <!-- 
                  <v-btn elevation="2" class="mx-2" dark outlined small color="red"
                    @click="DeletePatientPayment(props.item.id, props.item.name)">
                    <v-icon small @click="DeletePatientPayment(props.item.id, props.item.name)">
                      mdi-delete
                    </v-icon>
                    Delete
                  </v-btn>
                   -->
                  <v-btn elevation="2" class="mx-2" dark outlined small color="purple"
                    @click="printPatientPayment(props.item)">
                    <v-icon small @click="printPatientPayment(props.item)">
                      mdi-printer
                    </v-icon>
                    Print
                  </v-btn>
                  <div v-if="$vuetify.breakpoint.mdAndDown">
                    &nbsp;
                  </div>
                </template>
              </template>
            </v-data-table>
            <!-- Patient Payment data table -->
            <v-pagination color="purple" v-model="page" :length="pageCount"></v-pagination>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- dialog add form -->
    <v-dialog v-model="fullscreendialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-toolbar dark color="purple">
            <v-btn icon dark @click="CloseDialogFullScreen()">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>Add Patient Payment</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
            </v-toolbar-items>
          </v-toolbar>

          <v-col sm="12" md="6" offset-md="3" class="mt-3 ">
            <h4>Date : {{ todayFormatted }}</h4>
          </v-col>

          <v-col sm="12" md="6" offset-md="3">
            <v-combobox outlined color="purple" v-model="patient_payment.patient_id" :items="patientcombobox"
              label="Patient Name *" :rules="[validatePatient]"></v-combobox>

            <!-- Services Section -->
            <v-row>
              <div class="col-sm-6">
                Services
              </div>
              <div class="col-sm-6 text-right">
                <v-btn elevation="2" class="mx-2" dark outlined small color="purple" @click="addService()">
                  add
                </v-btn>
              </div>
            </v-row>
            <br>
            <v-row class="pt-0 mt-0 pb-0 mb-0" v-for="(service, index) in clinic_services_item" :key="service.id">
              <div class="col-sm-8 pt-0 mt-0 pb-0 mb-0">
                <v-combobox outlined color="purple" v-model="service.item" :items="clinicservicescombobox"
                  label="Service" :rules="[validateService]" item-text="text" item-value="value" return-object />
              </div>

              <div class="col-sm-3 pt-0 mt-0 pb-0 mb-0">
                <v-text-field outlined color="purple" v-model="service.displayPrice" label="Price" readonly />
              </div>

              <div class="col-sm-1 text-center">
                <v-btn icon color="red" @click="removeService(index)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </div>
            </v-row>

            <!-- Pharmacy Section -->
            <v-row>
              <div class="col-sm-6">
                Pharmacy Item
              </div>
              <div class="col-sm-6 text-right">
                <v-btn elevation="2" class="mx-2" dark outlined small color="purple" @click="addPharmacyItem()">
                  add
                </v-btn>
              </div>
            </v-row>
            <br>
            <v-row class="pt-0 mt-0 pb-0 mb-0" v-for="(pharmacy, index) in pharmacy_item" :key="pharmacy.id">
              <div class="col-sm-5 pt-0 mt-0 pb-0 mb-0">
                <v-combobox outlined color="purple" v-model="pharmacy.item" :items="pharmacyitemcombobox"
                  label="Pharmacy Item" :rules="[validatePharmacyItem]" item-text="text" item-value="value"
                  return-object />
              </div>

              <div class="col-sm-2 pt-0 mt-0 pb-0 mb-0">
                <v-text-field outlined color="purple" v-model="pharmacy.displayPrice" label="Price" readonly />
              </div>

              <div class="col-sm-2 pt-0 mt-0 pb-0 mb-0">
                <v-text-field outlined color="purple" v-model="pharmacy.displayStock" label="Stock" readonly />
              </div>

              <div class="col-sm-2 pt-0 mt-0 pb-0 mb-0">
                <v-text-field outlined color="purple" v-model="pharmacy.quantity" label="Quantity *"
                  :rules="[quantityRules]" />
              </div>

              <div class="col-sm-1 text-center">
                <v-btn icon color="red" @click="removePharmacyItem(index)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </div>
            </v-row>

            <!-- Discount + Total -->
            <v-combobox outlined color="purple" v-model="patient_payment.discount_id" :items="patientdiscountcombobox"
              label="Discount" :rules="[validateDiscount]" return-object />

            <v-text-field outlined color="purple" :value="patient_payment.price !== null && patient_payment.price !== undefined
              ? '₱' + Number(patient_payment.price).toFixed(2)
              : ''" label="Total Payment" required readonly />


            <v-btn color="purple" block outlined
              @click="valid == false ? validationfalse() : changeStatusDialogSave(true)">
              Save
            </v-btn>
          </v-col>
        </v-form>
      </v-card>
    </v-dialog>
    <!-- dialog add form -->

    <!-- dialog edit form -->
    <v-dialog v-model="editfullscreendialog" fullscreen hide-overlay transition="dialog-bottom-transition"
      @keydown.esc="ClearPatientPayment">
      <v-card>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-toolbar dark color="purple">
            <v-btn icon dark @click="CloseDialogEditFullScreen()">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>Edit Patient Payment</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
            </v-toolbar-items>
          </v-toolbar>

          <v-col sm="12" md="6" offset-md="3" class="mt-3 ">
            <h4>Date : {{ patient_payment.payment_date_display }}</h4>
          </v-col>

          <v-col sm="12" md="6" offset-md="3">
            <v-combobox outlined color="purple" v-model="patient_payment.patient_id" :items="patientcombobox"
              label="Patient Name *" :rules="[validatePatient]"></v-combobox>

            <!-- Services Section -->
            <v-row>
              <div class="col-sm-6">
                Services
              </div>
              <div class="col-sm-6 text-right">
                <v-btn elevation="2" class="mx-2" dark outlined small color="purple" @click="addService()">
                  add
                </v-btn>
              </div>
            </v-row>
            <br>
            <v-row class="pt-0 mt-0 pb-0 mb-0" v-for="(service, index) in clinic_services_item" :key="service.id">
              <div class="col-sm-8 pt-0 mt-0 pb-0 mb-0">
                <v-combobox outlined color="purple" v-model="service.item" :items="clinicservicescombobox"
                  label="Service" :rules="[validateService]" item-text="text" item-value="value" return-object />
              </div>

              <div class="col-sm-3 pt-0 mt-0 pb-0 mb-0">
                <v-text-field outlined color="purple" v-model="service.displayPrice" label="Price" readonly />
              </div>

              <div class="col-sm-1 text-center">
                <v-btn icon color="red" @click="removeService(index)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </div>
            </v-row>

            <!-- Pharmacy Section -->
            <v-row>
              <div class="col-sm-6">
                Pharmacy Item
              </div>
              <div class="col-sm-6 text-right">
                <v-btn elevation="2" class="mx-2" dark outlined small color="purple" @click="addPharmacyItem()">
                  add
                </v-btn>
              </div>
            </v-row>
            <br>
            <v-row class="pt-0 mt-0 pb-0 mb-0" v-for="(pharmacy, index) in pharmacy_item" :key="pharmacy.id">
              <div :class="['pt-0 mt-0 pb-0 mb-0', pharmacy.displayStock ? 'col-sm-5' : 'col-sm-7']">
                <v-combobox outlined color="purple" v-model="pharmacy.item" :items="pharmacyitemcombobox"
                  label="Pharmacy Item" :rules="[validatePharmacyItem]" item-text="text" item-value="value"
                  return-object />
              </div>

              <div class="col-sm-2 pt-0 mt-0 pb-0 mb-0">
                <v-text-field outlined color="purple" v-model="pharmacy.displayPrice" label="Price" readonly />
              </div>

              <div class="col-sm-2 pt-0 mt-0 pb-0 mb-0" v-show="pharmacy.displayStock">
                <v-text-field outlined color="purple" v-model="pharmacy.displayStock" label="Stock" readonly />
              </div>

              <div class="col-sm-2 pt-0 mt-0 pb-0 mb-0">
                <v-text-field outlined color="purple" v-model="pharmacy.quantity" label="Purchased *"
                  :rules="[quantityRules]" :hint="'Prev. : ' + (pharmacy.original_quantity || 0)" />
              </div>

              <div class="col-sm-1 text-center">
                <v-btn icon color="red" @click="removePharmacyItem(index)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </div>
            </v-row>


            <!-- Discount + Total -->
            <v-combobox outlined color="purple" v-model="patient_payment.discount_id" :items="patientdiscountcombobox"
              label="Discount" :rules="[validateDiscount]" return-object />

            <v-text-field outlined color="purple" :value="patient_payment.price !== null && patient_payment.price !== undefined
              ? '₱' + Number(patient_payment.price).toFixed(2)
              : ''" label="Total Payment" required readonly />

            <v-btn color="purple" block outlined
              @click="valid == false ? validationfalse() : changeStatusDialogEdit(true)">
              Update
            </v-btn>
          </v-col>
        </v-form>
      </v-card>
    </v-dialog>
    <!-- dialog edit form -->

    <!-- dialog save confirmation -->
    <template>
      <v-row justify="center">
        <v-dialog v-model="saveconfirmation" persistent max-width="290">
          <v-card>
            <v-card-title class="text-h5">
              Save
            </v-card-title>
            <v-card-text>Are you sure you want to save?</v-card-text>
            <center>
              <v-btn elevation="2" class="mx-2" dark outlined small color="red" @click="changeStatusDialogSave(false)">
                Cancel
              </v-btn>
              <v-btn elevation="2" class="mx-2" dark outlined small color="purple" @click="SavePatientPayment()">
                Confirm
              </v-btn>
            </center>
            <br>

          </v-card>
        </v-dialog>
      </v-row>
    </template>
    <!-- dialog save confirmation -->

    <!-- dialog delete confirmation -->
    <template>
      <v-row justify="center">
        <v-dialog v-model="deleteconfirmation" persistent max-width="290">
          <v-card>
            <v-card-title class="text-h5">
              Delete
            </v-card-title>
            <v-card-text>Are you sure you want to delete {{ fordeletename }}?</v-card-text>
            <center>
              <v-btn elevation="2" class="mx-2" dark outlined small color="red"
                @click="changeStatusDialogDelete(false)">
                Cancel
              </v-btn>
              <v-btn elevation="2" class="mx-2" dark outlined small color="purple" @click="confirmDelete()">
                Confirm
              </v-btn>
            </center>
            <br>
          </v-card>
        </v-dialog>
      </v-row>
    </template>
    <!-- dialog delete confirmation -->

    <!-- dialog edit confirmation -->
    <v-row justify="center">
      <v-dialog v-model="editconfirmation" persistent max-width="290">
        <v-card>
          <v-card-title class="text-h5">
            Edit
          </v-card-title>
          <v-card-text>Are you sure you want to update?</v-card-text>
          <center>
            <v-btn elevation="2" class="mx-2" dark outlined small color="red" @click="changeStatusDialogEdit(false)">
              Cancel
            </v-btn>
            <v-btn elevation="2" class="mx-2" dark outlined small color="purple" @click="confirmUpdate()">
              Confirm
            </v-btn>
          </center>
          <br>
        </v-card>
      </v-dialog>
    </v-row>
    <!-- dialog edit confirmation -->
  </v-container>
</template>

<script>

import patientpaymentservices from '../services/patientpaymentservices';
import patientinformationservices from '../services/patientinformationservices';
import pharmacyitemservices from '../services/pharmacyitemservices';
import patientdiscountservices from '../services/patientdiscountservices';
import clinicservices from '../services/clinicservices';

export default {
  name: 'PatientPayment',
  data: () => ({
    menucolumn: false,
    sortBy: 'payment_date',
    sortDesc: true,
    exportimport: [{ text: 'Upload', icon: 'mdi-upload-outline', linktrigger: 1 },
    { text: 'Download', icon: 'mdi-download-outline', linktrigger: 2 }],
    classito: 'd-inline-block text-truncate',
    search: '',
    page: 1,
    pageCount: 0,
    valid: false,
    saveconfirmation: false,
    editconfirmation: false,
    deleteconfirmation: false,
    editfullscreendialog: false,
    fordeletename: '',
    date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
    dialog: false,
    fullscreendialog: false,
    patient_payment: {
      patient_id: '',
      service: [],
      pharmacy_item: [{
        id: Date.now(),
        item: { price: null, stock_quantity: null },
        quantity: null
      }],
      discount_id: 0,
      payment_date: '',
      price: 0,
    },
    headers: [],
    selectedHeaders: [],
    headersMap: [
      { text: 'First Name', value: 'patient_info.firstname', sortable: true, width: '130px' },
      { text: 'Middle Name', value: 'patient_info.middlename', sortable: true, width: '130px' },
      { text: 'Last Name', value: 'patient_info.lastname', sortable: true, width: '130px' },
      { text: 'Suffix', value: 'patient_info.suffix', sortable: false },
      { text: 'Mobile Number', value: 'patient_info.mobile_number', width: '140px', sortable: false },
      { text: 'Payment Date', sortable: true, value: 'payment_date' },
      { text: 'Total', sortable: false, value: 'price' },
      { text: 'Action', sortable: false, value: 'action' }
    ],
    patientpaymentservicesdata: [],
    categorycombobox: [],
    listpatientdata: [],
    patientcombobox: [],
    patientdiscountcombobox: [],
    clinicservicescombobox: [],
    pharmacyitemcombobox: [],
    todayFormatted: '',
    maxdate: '',
    pharmacy_item: [],
    clinic_services_item: [],
  }),
  created() {
    this.$store.state.header = false;
    this.$store.state.footer = false;
    this.$store.state.snackbar.color = 'purple';
    this.FetchAllPatientPayment();
    this.FetchAllPatientInformation();
    this.FetchAllPharmacyItem();
    this.FetchAllPatientDiscount();
    this.FetchAllClinicServices();
    this.headers = Object.values(this.headersMap);
    this.selectedHeaders = this.headers;
  },
  mounted() {
    this.$store.state.title = "Patient Payment";
    var selDate = new Date()
    var today = new Date(selDate + 2 * 24 * 60 * 60 * 1000);
    var date = today.getDate()
    var month = today.getMonth()
    var year = today.getFullYear()
    this.maxdate = year + "-" + this.strPad((month + 1)) + "-" + this.strPad((date));
    const todayDate = new Date(this.maxdate);
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    this.todayFormatted = todayDate.toLocaleDateString('en-US', options);
  },
  computed: {
    showHeaders() {
      return this.headers.filter(s => this.selectedHeaders.includes(s));
    }
  },
  watch: {
    clinic_services_item: {
      handler(newVal) {
        newVal.forEach(service => {
          if (service.item && service.item.price != null) {
            // convert to number at lagyan ng ₱ sign
            service.displayPrice = '₱' + Number(service.item.price).toFixed(2);
          } else {
            service.displayPrice = '';
          }
        });
        this.computeTotal();
      },
      deep: true
    },
    pharmacy_item: {
      handler(newVal) {
        newVal.forEach(pharmacy => {
          if (pharmacy.item) {
            // hanapin muna sa combobox kung kulang ang object
            const found = this.pharmacyitemcombobox.find(i => i.value === pharmacy.item.value);
            const itemObj = found || pharmacy.item;

            // price
            pharmacy.displayPrice = itemObj.price != null
              ? '₱' + Number(itemObj.price).toFixed(2)
              : '';

            // stock
            pharmacy.displayStock = itemObj.stock_quantity != null
              ? itemObj.stock_quantity
              : '';
          } else {
            pharmacy.displayPrice = '';
            pharmacy.displayStock = '';
          }
        });
        this.computeTotal();
      },
      deep: true
    },
    'patient_payment.discount_id': function () {
      this.computeTotal();
    },
  },
  methods: {
    FetchAllPatientInformation() {
      this.patientcombobox = [];
      let payload = {
        parent_id: this.$store.getters.getParentID
      };
      patientinformationservices.FetchAllPatientInformation(payload).then(response => {
        if (response.data.success) {
          response.data.data.forEach((value) => {
            this.patientcombobox.push({
              text: value.lastname + ", " +
                value.firstname + " " +
                (value.middlename ? value.middlename + " " : "") +
                (value.suffix ? value.suffix : ""),
              value: value.id
            });
          });
        }
      }).catch(error => console.log(error));
    },
    FetchAllPharmacyItem() {
      this.pharmacyitemcombobox = [];
      let payload = {
        parent_id: this.$store.getters.getParentID
      };
      pharmacyitemservices.FetchAllPharmacyItem(payload).then(response => {
        if (response.data.success) {
          response.data.data.forEach((value) => {
            this.pharmacyitemcombobox.push({
              text: value.name,
              price: value.price,
              value: value.id,
              stock_quantity: value.stock_quantity
            });
          });
        }
      }).catch(error => console.log(error));
    },
    FetchAllPatientDiscount() { // fetch all patient discount
      this.patientdiscountcombobox = [];
      let payload = {
        parent_id: this.$store.getters.getParentID
      };
      patientdiscountservices.FetchAllPatientDiscount(payload).then(response => {
        if (response.data.success) {

          this.patientdiscountcombobox.push({
            text: 'No Discount',
            discount: 0,
            is_percentage: false,
            value: 0
          });

          response.data.data.forEach((value) => {
            this.patientdiscountcombobox.push({
              text: value.name + " (" + value.code + ") : " +
                (value.is_percentage
                  ? value.amount_percentage + '%'
                  : '₱' + value.amount_percentage),
              discount: value.amount_percentage,
              is_percentage: value.is_percentage,
              value: value.id,
              is_all: value.is_all,
            });
          });
        }
      }).catch(error => console.log(error));
    },
    FetchAllClinicServices() { // fetch all clinic services
      this.clinicservicescombobox = [];
      let payload = {
        parent_id: this.$store.getters.getParentID
      };
      clinicservices.FetchAllClinicServices(payload).then(response => {
        if (response.data.success) {
          response.data.data.forEach((value) => {
            this.clinicservicescombobox.push({
              text: value.name,
              price: value.price,
              value: value.id
            });
          });
        }
      }).catch(error => console.log(error));
    },
    FetchAllPatientPayment() { // fetch all patient payment
      let payload = {
        parent_id: this.$store.getters.getParentID
      };
      patientpaymentservices.FetchAllPatientPayment(payload, this.$store.getters.getAccessToken).then(response => {
        if (response.data.success) {
          this.patientpaymentservicesdata = response.data.data;
        }
      }).catch(error => console.log(error));
    },
    UpdateAllPatientPayment(id, item) {
      console.log(id, item);
      this.patient_payment.patient_id = item.patient_info ? {
        text: item.patient_info.lastname + ", " +
          item.patient_info.firstname + " " +
          (item.patient_info.middlename ? item.patient_info.middlename + " " : "") +
          (item.patient_info.suffix ? item.patient_info.suffix : ""),
        value: item.patient_info.id
      } : {
        text: 'No Data',
        value: null
      };


      this.clinic_services_item = item.service
        ? JSON.parse(item.service).map(s => ({
          id: Date.now() + Math.random(),
          item: { text: s.name, value: s.id, price: s.price }
        }))
        : [];


      this.pharmacy_item = item.pharmacy_item
        ? JSON.parse(item.pharmacy_item).map(p => ({
          id: Date.now() + Math.random(),
          item: { text: p.name, value: p.id, price: p.price, stock_quantity: p.stock_quantity },
          quantity: p.quantity,
          original_quantity: p.quantity,
        }))
        : [];

      this.patient_payment.discount_id = item.discount_info
        ? {
          text: item.discount_info.code + " : " +
            (item.discount_is_percentage
              ? item.discount_info.amount_percentage + '%'
              : '₱' + item.discount_info.amount_percentage),
          value: item.discount_info.id,
          discount: item.discount_amount,
          is_percentage: item.discount_is_percentage,
          is_all: item.is_all
        }
        : {
          text: 'No Discount',
          value: 0,
          discount: 0,
          is_percentage: 0,
          is_all: 0
        };

      this.forAllUpdate = {
        id: id,
      }

      this.patient_payment.payment_date = item.payment_date;
      this.patient_payment.payment_date_display = new Date(item.payment_date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });

      this.patient_payment.price = item.price

      this.editfullscreendialog = true
    },
    confirmUpdate() { // update patient payment
      let val = this.$refs.form.validate();

      if (val) {
        let payload = {
          id: this.forAllUpdate['id'],

          parent_id: this.$store.getters.getParentID,
          patient_id: this.patient_payment.patient_id.value,
          payment_date: this.patient_payment.payment_date,
          price: this.patient_payment.price,


          discount_id: this.patient_payment.discount_id ? this.patient_payment.discount_id.value : 0,
          discount_amount: this.patient_payment.discount_id ? parseFloat(this.patient_payment.discount_id.discount) : 0,
          discount_is_percentage: this.patient_payment.discount_id ? this.patient_payment.discount_id.is_percentage : 0,
          discount_is_all: this.patient_payment.discount_id ? this.patient_payment.discount_id.is_all : 0,

          // Services JSON
          service: JSON.stringify(
            this.clinic_services_item.map(s => ({
              id: s.item.value,
              name: s.item.text,
              price: parseFloat(s.item.price)
            }))
          ),

          // Pharmacy JSON
          pharmacy_item: JSON.stringify(
            this.pharmacy_item.map(p => ({
              id: p.item.value,
              name: p.item.text,
              price: parseFloat(p.item.price),
              quantity: parseFloat(p.quantity) || 1
            }))
          ),
        }
        console.log(payload)
        patientpaymentservices.UpdatePatientPayment(payload, this.$store.getters.getAccessToken).then(response => {
          if (response.data.success) {
            this.$store.state.snackbar.message = 'Patient Payment has been updated.';
            this.$store.state.snackbar.show = true;
            this.editfullscreendialog = false
            this.ClearPatientPayment()
            this.$refs.form.resetValidation();
            this.$store.state.snackbar.colors = 'xgreen';
            this.$store.state.snackbar.icon = "mdi-check-circle-outline";
          } else {
            this.$store.state.snackbar.colors = 'xred';
            this.$store.state.snackbar.icon = "mdi-alert-outline";
          }

        }).catch(error => {
          this.$store.state.snackbar.colors = 'xred';
          this.$store.state.snackbar.icon = "mdi-alert-outline";
          this.errorDAW = error.response.data.message
          this.$store.state.snackbar.message = error.response.data.message;
          this.$store.state.snackbar.show = true;
        });
      }
      this.FetchAllPatientPayment();
      this.FetchAllPharmacyItem();
      this.editconfirmation = false
    },
    changeStatusDialogEdit(status) {
      this.editconfirmation = status;
      this.FetchAllPatientPayment();
    },
    NewPatientPayment() {
      this.fullscreendialog = true
      this.patient_payment.price = 0
      this.patient_payment.stock_quantity = 0
    },
    SavePatientPayment() { // save patient payment

      let val = this.$refs.form.validate();

      if (val) {
        let payload = {
          parent_id: this.$store.getters.getParentID,
          patient_id: this.patient_payment.patient_id.value,
          payment_date: this.maxdate,
          price: this.patient_payment.price,

          discount_id: this.patient_payment.discount_id ? this.patient_payment.discount_id.value : 0,
          discount_amount: this.patient_payment.discount_id ? parseFloat(this.patient_payment.discount_id.discount) : 0,
          discount_is_percentage: this.patient_payment.discount_id ? this.patient_payment.discount_id.is_percentage : 0,
          discount_is_all: this.patient_payment.discount_id ? this.patient_payment.discount_id.is_all : 0,

          // Services JSON
          service: JSON.stringify(
            this.clinic_services_item.map(s => ({
              id: s.item.value,
              name: s.item.text,
              price: parseFloat(s.item.price)
            }))
          ),

          // Pharmacy JSON
          pharmacy_item: JSON.stringify(
            this.pharmacy_item.map(p => ({
              id: p.item.value,
              name: p.item.text,
              price: parseFloat(p.item.price),
              quantity: parseFloat(p.quantity) || 1
            }))
          ),
        };
        console.log(payload);
        patientpaymentservices.SavePatientPayment(payload, this.$store.getters.getAccessToken).then(response => {
          if (response.data.success) {
            this.fullscreendialog = false;
            this.$store.state.snackbar.message = 'Patient Payment has been created.';
            this.$store.state.snackbar.show = true;
            this.FetchAllPatientPayment();
            this.FetchAllPharmacyItem();
            this.ClearPatientPayment();
            this.$refs.form.resetValidation();
            this.$store.state.snackbar.colors = 'xgreen';
            this.$store.state.snackbar.icon = "mdi-check-circle-outline";
          } else {
            this.$store.state.snackbar.colors = 'xred';
            this.$store.state.snackbar.icon = "mdi-alert-outline";
          }
        }).catch(error => {
          console.log(error.response.data.errors)
          this.$store.state.snackbar.message = error.response.data.message;
          this.$store.state.snackbar.show = true;
          this.$store.state.snackbar.colors = 'xred';
          this.$store.state.snackbar.icon = "mdi-alert-outline";
        });
      }
      this.saveconfirmation = false;
    },
    CloseDialogFullScreen() {
      this.ClearPatientPayment();
      this.fullscreendialog = false
    },
    CloseDialogEditFullScreen() {
      this.ClearPatientPayment();
      this.editfullscreendialog = false
    },
    ClearPatientPayment() {
      this.patient_payment.patient_id = ''
      this.clinic_services_item = []
      this.pharmacy_item = []
      this.patient_payment.discount_id = null
      this.patient_payment.price = 0
    },
    DeletePatientPayment(id, name) {
      this.fordeletename = name
      this.forDelete = {
        id: id
      }
      this.deleteconfirmation = true;
    },
    confirmDelete() { // delete patient payment
      let payload = {
        id: this.forDelete['id']
      }
      console.log(payload);
      patientpaymentservices.DeletePatientPayment(payload, this.$store.getters.getAccessToken).catch(error => {
        this.errorDAW = error.response.data.message
        this.$store.state.snackbar.message = error.response.data.message;
        this.$store.state.snackbar.show = true;
      });

      this.$store.state.snackbar.message = 'Patient Payment has been deleted.';
      this.$store.state.snackbar.show = true;
      this.deleteconfirmation = false;
      this.FetchAllPatientPayment();
      this.$store.state.snackbar.colors = 'xgreen';
      this.$store.state.snackbar.icon = "mdi-check-circle-outline";
    },
    changeStatusDialogSave(status) {
      this.saveconfirmation = status;
    },
    changeStatusDialogDelete(status) {
      this.deleteconfirmation = status;
      this.FetchAllPatientPayment();
    },
    validationfalse() {
      this.$refs.form.validate()
    },
    inlineblock() { // display text to inline block
      this.classito == 'd-inline-block text-truncate' ? this.classito = '' : this.classito = 'd-inline-block text-truncate';
    },
    priceRules(value) {
      if (isNaN(value)) return 'Price must be a number';
      if (parseFloat(value) < 0) return 'Price must be greater than equal to 0';

      if (this.patient_payment.is_percentage == 1 && parseFloat(value) > 100) {
        return 'Percentage must not exceed 100';
      }
      return true;
    },
    validateCategory(value) {
      if (!value) return 'Category is required';

      if (typeof value === 'object' && value.value) return true;

      const exists = this.categorycombobox.find(item => item === value);
      if (!exists) return 'Please select a valid category from the list';

      return true;
    },
    validatePatient(value) {
      if (!value) return 'Patient is required';

      if (typeof value === 'object' && value.value) return true;

      const exists = this.patientcombobox.find(item => item === value);
      if (!exists) return 'Please select a valid patient name from the list';

      return true;
    },
    validatePharmacyItem(value) {
      if (!value) return 'Pharmacy Item is required';

      if (typeof value === 'object' && value.value) return true;

      const exists = this.pharmacyitemcombobox.find(item => item === value);
      if (!exists) return 'Please select a valid pharmacy item from the list';

      return true;
    },
    validateService(value) {
      if (!value) return 'Service is required';

      if (typeof value === 'object' && value.value) return true;

      const exists = this.clinicservicescombobox.find(item => item === value);
      if (!exists) return 'Please select a valid service from the list';

      return true;
    },
    strPad(str) {
      return (str).toString().padStart(2, '0')
    },
    addService() {
      this.clinic_services_item.push({
        id: Date.now(),
        item: null
      });
    },
    addPharmacyItem() {
      this.pharmacy_item.push({
        id: Date.now(),
        item: null,
        quantity: 1
      });
    },
    removePharmacyItem(index) {
      this.pharmacy_item.splice(index, 1);
      this.computeTotal();
    },
    removeService(index) {
      this.clinic_services_item.splice(index, 1);
      this.computeTotal();
    },
    validateDiscount(value) {
      // allow walang discount (null, undefined, empty string, o object na may value 0)
      if (
        value === null ||
        value === undefined ||
        value === '' ||
        (typeof value === 'object' && (value.value === null || value.value === undefined || value.value === 0))
      ) {
        return true;
      }

      // kung object na may value (positive IDs)
      if (typeof value === 'object' && value.value) {
        return true;
      }

      // kung primitive id
      const exists = this.patientdiscountcombobox.find(
        item => item.value === value || item === value
      );
      if (!exists) {
        return 'Please select a valid discount from the list';
      }

      return true;
    },
    quantityRules(value) {
      if (!value) return 'Quantity is required';
      if (isNaN(value)) return 'Quantity must be a number';
      if (parseFloat(value) < 1) return 'Quantity must be greater than equal to 1';
      return true;
    },
    computeTotal() {
      let totalServices = 0;
      let totalPharmacy = 0;

      // Services (walang discount kapag is_all = 0)
      this.clinic_services_item.forEach(service => {
        if (service.item && service.item.price) {
          totalServices += parseFloat(service.item.price);
        }
      });

      // Pharmacy
      this.pharmacy_item.forEach(pharmacy => {
        if (pharmacy.item && pharmacy.item.price) {
          totalPharmacy += parseFloat(pharmacy.item.price) * parseFloat(pharmacy.quantity || 0);
        }
      });

      // Discount
      const d = this.patient_payment.discount_id;
      if (d && d.value) {
        if (d.is_all) {
          // apply discount sa buong total (services + pharmacy)
          const grandTotal = totalServices + totalPharmacy;
          if (d.is_percentage) {
            totalServices = grandTotal - (grandTotal * (d.discount / 100));
            totalPharmacy = 0; // reset para hindi madoble
          } else {
            totalServices = grandTotal - d.discount;
            totalPharmacy = 0;
          }
        } else {
          // apply discount sa pharmacy subtotal lang
          if (d.is_percentage) {
            totalPharmacy = totalPharmacy - (totalPharmacy * (d.discount / 100));
          } else {
            totalPharmacy = totalPharmacy - d.discount;
          }
        }
      }

      // Final total = services + pharmacy (with discount logic applied correctly)
      this.patient_payment.price = parseFloat((totalServices + totalPharmacy).toFixed(2));
    },
    formatDate(dateString) {
      const options = { month: 'short', day: 'numeric', year: 'numeric' };
      return new Date(dateString).toLocaleDateString('en-US', options);
    },
    printPatientPayment(payment) {
      console.log(payment);

      // Clear old values
      localStorage.removeItem('paymentForPrint');
      localStorage.removeItem('print_payment');

      // Populate data kung kailangan mo i-map
      localStorage.setItem('print_payment', 0);

      // Save to localStorage para ma-pass sa /printpayment route
      localStorage.setItem('paymentForPrint', JSON.stringify(payment));
      localStorage.setItem('nav_hide', 1);

      // Open print view
      window.open("/printpayment", "_blank");
    }
  }
}
</script>

<style scoped>
input[type=checkbox] {
  accent-color: purple;
}
</style>