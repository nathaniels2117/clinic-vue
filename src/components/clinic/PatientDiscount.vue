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
                  <v-btn medium dark color="purple" elevation="2" @click="NewPatientDiscount()">
                    <v-icon>mdi-plus</v-icon>Create
                  </v-btn>
                </template>

                <template v-if="$vuetify.breakpoint.smAndDown">
                  <v-btn medium dark color="purple" elevation="2" style="padding-left: 12px;padding-right: 12px;"
                    @click="NewPatientDiscount()">
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </template>
              </v-toolbar>
            </template>
            <!-- One liner filtering -->
            <br>
            <!-- Patient Discount data table -->
            <v-data-table :headers="showHeaders" :items="patientdiscountdata" :search="search" :page.sync="page"
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

              <template v-slot:item.action="props">
                <template v-if="$vuetify.breakpoint.xsOnly">
                  <v-row>
                    <v-btn elevation="2" class="mx-2" dark outlined small color="purple"
                      @click="UpdateAllPatientDiscount(props.item.id, props.item)">
                      <v-icon small @click="UpdateAllPatientDiscount(props.item.id, props.item)">
                        mdi-file-edit-outline
                      </v-icon>
                      Edit
                    </v-btn>
                    <template v-if="$vuetify.breakpoint.xsOnly">
                      <br>&nbsp;
                    </template>
                    <v-btn elevation="2" class="mx-2" dark outlined small color="red"
                      @click="DeletePatientDiscount(props.item.id, props.item.name)">
                      <v-icon small @click="DeletePatientDiscount(props.item.id, props.item.name)">
                        mdi-delete
                      </v-icon>
                      Delete
                    </v-btn>
                  </v-row>
                </template>
                <template v-else>
                  <div v-if="$vuetify.breakpoint.mdAndDown">
                    &nbsp;
                  </div>
                  <v-btn elevation="2" class="mx-2" dark outlined small color="purple"
                    @click="UpdateAllPatientDiscount(props.item.id, props.item)">
                    <v-icon small @click="UpdateAllPatientDiscount(props.item.id, props.item)">
                      mdi-file-edit-outline
                    </v-icon>
                    Edit
                  </v-btn>
                  <div v-if="$vuetify.breakpoint.mdAndDown">
                    &nbsp;
                  </div>
                  <v-btn elevation="2" class="mx-2" dark outlined small color="red"
                    @click="DeletePatientDiscount(props.item.id, props.item.name)">
                    <v-icon small @click="DeletePatientDiscount(props.item.id, props.item.name)">
                      mdi-delete
                    </v-icon>
                    Delete
                  </v-btn>
                  <div v-if="$vuetify.breakpoint.mdAndDown">
                    &nbsp;
                  </div>
                </template>
              </template>
            </v-data-table>
            <!-- Patient Discount data table -->
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
            <v-toolbar-title>Add Patient Discount</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
            </v-toolbar-items>
          </v-toolbar>

          <v-col sm="12" md="6" offset-md="3" class="mt-3 text-center">
            <h4>Note: Here you can create patient discount</h4>
          </v-col>

          <v-col sm="12" md="6" offset-md="3">
            <v-text-field v-model="patient_discount.code" label="Code *" color="purple" required outlined
              :rules="[v => !!v || 'Code is required']"></v-text-field>

            <v-text-field v-model="patient_discount.name" label="Name *" color="purple" required outlined
              :rules="[v => !!v || 'Name is required']"></v-text-field>

            <v-textarea v-model="patient_discount.description" label="Description *" clearable counter required
              color="purple" outlined :rules="[v => !!v || 'Description is required']"></v-textarea>

            <v-radio-group v-model="patient_discount.is_percentage" row class="mt-n3">
              <v-radio label="₱ Pesos" :value="0" color="purple"></v-radio>
              <v-radio label="% Percentage" :value="1" color="purple"></v-radio>
            </v-radio-group>

            <v-text-field v-model="patient_discount.amount_percentage" label="Amount / Percentage" color="purple"
              required outlined :rules="[priceRules]"></v-text-field>

            <v-radio-group v-model="patient_discount.is_all" row class="mt-n3">
              <v-radio label="Pharmacy Items Only" :value="0" color="purple"></v-radio>
              <v-radio label="All (Products & Services)" :value="1" color="purple"></v-radio>
            </v-radio-group>

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
    <v-dialog v-model="editfullscreendialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-toolbar dark color="purple">
            <v-btn icon dark @click="CloseDialogEditFullScreen()">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>Edit Patient Discount</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
            </v-toolbar-items>
          </v-toolbar>

          <v-col sm="12" md="6" offset-md="3" class="mt-3 text-center">
            <h4>Note: Here you can edit patient discount</h4>
          </v-col>
          <v-col sm="12" md="6" offset-md="3">
            <v-text-field v-model="patient_discount.code" label="Code *" color="purple" required outlined
              :rules="[v => !!v || 'Code is required']"></v-text-field>

            <v-text-field v-model="patient_discount.name" label="Name *" color="purple" required outlined
              :rules="[v => !!v || 'Name is required']"></v-text-field>

            <v-textarea v-model="patient_discount.description" label="Description *" clearable counter required
              color="purple" outlined :rules="[v => !!v || 'Description is required']"></v-textarea>

            <v-radio-group v-model="patient_discount.is_percentage" row class="mt-n3">
              <v-radio label="₱ Pesos" :value="0" color="purple"></v-radio>
              <v-radio label="% Percentage" :value="1" color="purple"></v-radio>
            </v-radio-group>

            <v-text-field v-model="patient_discount.amount_percentage" label="Amount / Percentage" color="purple"
              required outlined :rules="[priceRules]"></v-text-field>

            <v-radio-group v-model="patient_discount.is_all" row class="mt-n3">
              <v-radio label="Pharmacy Items Only" :value="0" color="purple"></v-radio>
              <v-radio label="All (Products & Services)" :value="1" color="purple"></v-radio>
            </v-radio-group>

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
              <v-btn elevation="2" class="mx-2" dark outlined small color="purple" @click="SavePatientDiscount()">
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

import patientdiscountservices from '../services/patientdiscountservices';

export default {
  name: 'PatientDiscount',
  data: () => ({
    menucolumn: false,
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
    patient_discount: {
      code: '',
      name: '',
      description: '',
      amount_percentage: '',
      is_percentage: 0,
      is_all: 0,
    },
    headers: [],
    selectedHeaders: [],
    headersMap: [
      { text: 'Code', sortable: true, value: 'code' },
      { text: 'Name', sortable: true, value: 'name' },
      { text: 'Description', sortable: false, value: 'description' },
      { text: 'Amount / Percentage', sortable: false, value: 'amount_percentage' },
      { text: 'Coverage', sortable: false, value: 'is_all' },
      { text: 'Action', sortable: false, value: 'action' }
    ],
    patientdiscountdata: [],
    categorycombobox: [],
  }),
  created() {
    this.$store.state.header = false;
    this.$store.state.footer = false;
    this.$store.state.snackbar.color = 'purple';
    this.FetchAllPatientDiscount();
    this.headers = Object.values(this.headersMap);
    this.selectedHeaders = this.headers;
  },
  mounted() {
    this.$store.state.title = "Patient Discount";
  },
  computed: {
    showHeaders() {
      return this.headers.filter(s => this.selectedHeaders.includes(s));
    }
  },
  methods: {
    FetchAllPatientDiscount() { // fetch all patient discount
      let payload = {
        parent_id: this.$store.getters.getParentID
      };
      patientdiscountservices.FetchAllPatientDiscount(payload, this.$store.getters.getAccessToken).then(response => {
        if (response.data.success) {
          this.patientdiscountdata = response.data.data;
        }
      }).catch(error => console.log(error));
    },
    UpdateAllPatientDiscount(id, item) {
      console.log(id, item);
      this.patient_discount.code = item.code
      this.patient_discount.name = item.name
      this.patient_discount.description = item.description
      this.patient_discount.amount_percentage = item.amount_percentage
      this.patient_discount.is_percentage = item.is_percentage
      this.patient_discount.is_all = item.is_all
      this.forAllUpdate = {
        id: id,
      }

      this.editfullscreendialog = true
    },
    confirmUpdate() { // update patient discount
      let val = this.$refs.form.validate();

      if (val) {
        let payload = {
          parent_id: this.$store.getters.getParentID,
          id: this.forAllUpdate['id'],
          code: this.patient_discount.code,
          name: this.patient_discount.name,
          description: this.patient_discount.description,
          amount_percentage: this.patient_discount.amount_percentage,
          is_percentage: this.patient_discount.is_percentage,
          is_all: this.patient_discount.is_all
        }
        console.log(payload)
        patientdiscountservices.UpdatePatientDiscount(payload, this.$store.getters.getAccessToken).then(response => {
          if (response.data.success) {
            this.$store.state.snackbar.message = 'Patient Discount has been updated.';
            this.$store.state.snackbar.show = true;
            this.editfullscreendialog = false
            this.ClearPatientDiscount()
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
      this.FetchAllPatientDiscount();
      this.editconfirmation = false
    },
    changeStatusDialogEdit(status) {
      this.editconfirmation = status;
      this.FetchAllPatientDiscount();
    },
    NewPatientDiscount() {
      this.fullscreendialog = true
      this.patient_discount.price = 0
      this.patient_discount.stock_quantity = 0
    },
    SavePatientDiscount() { // save patient discount

      let val = this.$refs.form.validate();

      if (val) {
        let payload = {
          parent_id: this.$store.getters.getParentID,
          code: this.patient_discount.code,
          name: this.patient_discount.name,
          description: this.patient_discount.description,
          amount_percentage: this.patient_discount.amount_percentage,
          is_percentage: this.patient_discount.is_percentage,
          is_all: this.patient_discount.is_all
        };
        console.log(payload);
        patientdiscountservices.SavePatientDiscount(payload, this.$store.getters.getAccessToken).then(response => {
          if (response.data.success) {
            this.fullscreendialog = false;
            this.$store.state.snackbar.message = 'Patient Discount has been created.';
            this.$store.state.snackbar.show = true;
            this.FetchAllPatientDiscount();
            this.ClearPatientDiscount();
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
      this.ClearPatientDiscount();
      this.fullscreendialog = false
    },
    CloseDialogEditFullScreen() {
      this.ClearPatientDiscount();
      this.editfullscreendialog = false
    },
    ClearPatientDiscount() {
      this.patient_discount.code = ''
      this.patient_discount.name = ''
      this.patient_discount.description = ''
      this.patient_discount.amount_percentage = ''
      this.patient_discount.is_percentage = 0
      this.patient_discount.is_all = 0
    },
    DeletePatientDiscount(id, name) {
      this.fordeletename = name
      this.forDelete = {
        id: id
      }
      this.deleteconfirmation = true;
    },
    confirmDelete() { // delete patient discount
      let payload = {
        id: this.forDelete['id']
      }
      console.log(payload);
      patientdiscountservices.DeletePatientDiscount(payload, this.$store.getters.getAccessToken).catch(error => {
        this.errorDAW = error.response.data.message
        this.$store.state.snackbar.message = error.response.data.message;
        this.$store.state.snackbar.show = true;
      });

      this.$store.state.snackbar.message = 'Patient Discount has been deleted.';
      this.$store.state.snackbar.show = true;
      this.deleteconfirmation = false;
      this.FetchAllPatientDiscount();
      this.$store.state.snackbar.colors = 'xgreen';
      this.$store.state.snackbar.icon = "mdi-check-circle-outline";
    },
    changeStatusDialogSave(status) {
      this.saveconfirmation = status;
    },
    changeStatusDialogDelete(status) {
      this.deleteconfirmation = status;
      this.FetchAllPatientDiscount();
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

      if (this.patient_discount.is_percentage == 1 && parseFloat(value) > 100) {
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
  }
}
</script>

<style scoped>
input[type=checkbox] {
  accent-color: purple;
}
</style>