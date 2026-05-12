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
                  <v-btn medium dark color="purple" elevation="2" @click="NewClinicServices()">
                    <v-icon>mdi-plus</v-icon>Create
                  </v-btn>
                </template>

                <template v-if="$vuetify.breakpoint.smAndDown">
                  <v-btn medium dark color="purple" elevation="2" style="padding-left: 12px;padding-right: 12px;"
                    @click="NewClinicServices()">
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </template>
              </v-toolbar>
            </template>
            <!-- One liner filtering -->
            <br>
            <!-- Clinic Services data table -->
            <v-data-table :headers="showHeaders" :items="clinicservicesdata" :search="search" :page.sync="page"
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

              <template v-slot:item.category_id="{ item }">
                {{ item.category_info && item.category_info.name ? item.category_info.name : 'No Data' }}
              </template>

              <template v-slot:item.action="props">
                <template v-if="$vuetify.breakpoint.xsOnly">
                  <v-row>
                    <v-btn elevation="2" class="mx-2" dark outlined small color="purple"
                      @click="UpdateAllClinicServices(props.item.id, props.item)">
                      <v-icon small @click="UpdateAllClinicServices(props.item.id, props.item)">
                        mdi-file-edit-outline
                      </v-icon>
                      Edit
                    </v-btn>
                    <template v-if="$vuetify.breakpoint.xsOnly">
                      <br>&nbsp;
                    </template>
                    <v-btn elevation="2" class="mx-2" dark outlined small color="red"
                      @click="DeleteClinicServices(props.item.id, props.item.name)">
                      <v-icon small @click="DeleteClinicServices(props.item.id, props.item.name)">
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
                    @click="UpdateAllClinicServices(props.item.id, props.item)">
                    <v-icon small @click="UpdateAllClinicServices(props.item.id, props.item)">
                      mdi-file-edit-outline
                    </v-icon>
                    Edit
                  </v-btn>
                  <div v-if="$vuetify.breakpoint.mdAndDown">
                    &nbsp;
                  </div>
                  <v-btn elevation="2" class="mx-2" dark outlined small color="red"
                    @click="DeleteClinicServices(props.item.id, props.item.name)">
                    <v-icon small @click="DeleteClinicServices(props.item.id, props.item.name)">
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
            <!-- Clinic Services data table -->
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
            <v-toolbar-title>Add Clinic Services</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
            </v-toolbar-items>
          </v-toolbar>

          <v-col sm="12" md="6" offset-md="3" class="mt-3 text-center">
            <h4>Note: Here you can create clinic services</h4>
          </v-col>

          <v-col sm="12" md="6" offset-md="3">
            <v-text-field v-model="clinic_services.name" label="Name *" color="purple" required outlined
              :rules="[v => !!v || 'Name is required']"></v-text-field>

            <v-textarea v-model="clinic_services.description" label="Description *" clearable counter required
              color="purple" outlined :rules="[v => !!v || 'Description is required']"></v-textarea>

            <v-text-field v-model="clinic_services.price" label="Price" color="purple" required outlined
              :rules="[priceRules]"></v-text-field>

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
            <v-toolbar-title>Edit Clinic Services</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
            </v-toolbar-items>
          </v-toolbar>

          <v-col sm="12" md="6" offset-md="3" class="mt-3 text-center">
            <h4>Note: Here you can edit clinic services</h4>
          </v-col>
          <v-col sm="12" md="6" offset-md="3">
            <v-text-field v-model="clinic_services.name" label="Name *" color="purple" required outlined
              :rules="[v => !!v || 'Name is required']"></v-text-field>

            <v-textarea v-model="clinic_services.description" label="Description *" clearable counter required
              color="purple" outlined :rules="[v => !!v || 'Description is required']"></v-textarea>

            <v-text-field v-model="clinic_services.price" label="Price" color="purple" required outlined
              :rules="[priceRules]"></v-text-field>

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
              <v-btn elevation="2" class="mx-2" dark outlined small color="purple" @click="SaveClinicServices()">
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

import clinicservices from '../services/clinicservices';

export default {
  name: 'ClinicServices',
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
    clinic_services: {
      name: '',
      description: '',
      price : '',
    },
    headers: [],
    selectedHeaders: [],
    headersMap: [
      { text: 'Name', sortable: true, value: 'name' },
      { text: 'Description', sortable: false, value: 'description' },
      { text: 'Price', sortable: false, value: 'price' },
      { text: 'Action', sortable: false, value: 'action' }
    ],
    clinicservicesdata: [],
    categorycombobox: [],
  }),
  created() {
    this.$store.state.header = false;
    this.$store.state.footer = false;
    this.$store.state.snackbar.color = 'purple';
    this.FetchAllClinicServices();
    this.headers = Object.values(this.headersMap);
    this.selectedHeaders = this.headers;
  },
  mounted() {
    this.$store.state.title = "Clinic Services";
  },
  computed: {
    showHeaders() {
      return this.headers.filter(s => this.selectedHeaders.includes(s));
    }
  },
  methods: {
    FetchAllClinicServices() { // fetch all clinic services
      let payload = {
        parent_id: this.$store.getters.getParentID
      };
      clinicservices.FetchAllClinicServices(payload, this.$store.getters.getAccessToken).then(response => {
        if (response.data.success) {
          this.clinicservicesdata = response.data.data;
        }
      }).catch(error => console.log(error));
    },
    UpdateAllClinicServices(id, item) {
      console.log(id, item);
      this.clinic_services.name = item.name
      this.clinic_services.description = item.description
      this.clinic_services.price = item.price
      this.forAllUpdate = {
        id: id,
      }

      this.editfullscreendialog = true
    },
    confirmUpdate() { // update clinic services
      let val = this.$refs.form.validate();

      if (val) {
        let payload = {
          parent_id: this.$store.getters.getParentID,
          id: this.forAllUpdate['id'],
          name: this.clinic_services.name,
          description: this.clinic_services.description,
          price: this.clinic_services.price,
        }
        console.log(payload)
        clinicservices.UpdateClinicServices(payload, this.$store.getters.getAccessToken).then(response => {
          if (response.data.success) {
            this.$store.state.snackbar.message = 'Clinic Services has been updated.';
            this.$store.state.snackbar.show = true;
            this.editfullscreendialog = false
            this.ClearClinicServices()
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
      this.FetchAllClinicServices();
      this.editconfirmation = false
    },
    changeStatusDialogEdit(status) {
      this.editconfirmation = status;
      this.FetchAllClinicServices();
    },
    NewClinicServices() {
      this.fullscreendialog = true
      this.clinic_services.price = 0
      this.clinic_services.stock_quantity = 0
    },
    SaveClinicServices() { // save clinic services

      let val = this.$refs.form.validate();

      if (val) {
        let payload = {
          parent_id: this.$store.getters.getParentID,
          name: this.clinic_services.name,
          description: this.clinic_services.description,
          price: this.clinic_services.price,
        };
        console.log(payload);
        clinicservices.SaveClinicServices(payload, this.$store.getters.getAccessToken).then(response => {
          if (response.data.success) {
            this.fullscreendialog = false;
            this.$store.state.snackbar.message = 'Clinic Services has been created.';
            this.$store.state.snackbar.show = true;
            this.FetchAllClinicServices();
            this.ClearClinicServices();
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
      this.ClearClinicServices();
      this.fullscreendialog = false
    },
    CloseDialogEditFullScreen() {
      this.ClearClinicServices();
      this.editfullscreendialog = false
    },
    ClearClinicServices() {
      this.clinic_services.name = ''
      this.clinic_services.description = ''
      this.clinic_services.price = ''
    },
    DeleteClinicServices(id, name) {
      this.fordeletename = name
      this.forDelete = {
        id: id
      }
      this.deleteconfirmation = true;
    },
    confirmDelete() { // delete clinic services
      let payload = {
        id: this.forDelete['id']
      }
      console.log(payload);
      clinicservices.DeleteClinicServices(payload, this.$store.getters.getAccessToken).catch(error => {
        this.errorDAW = error.response.data.message
        this.$store.state.snackbar.message = error.response.data.message;
        this.$store.state.snackbar.show = true;
      });

      this.$store.state.snackbar.message = 'Clinic Services has been deleted.';
      this.$store.state.snackbar.show = true;
      this.deleteconfirmation = false;
      this.FetchAllClinicServices();
      this.$store.state.snackbar.colors = 'xgreen';
      this.$store.state.snackbar.icon = "mdi-check-circle-outline";
    },
    changeStatusDialogSave(status) {
      this.saveconfirmation = status;
    },
    changeStatusDialogDelete(status) {
      this.deleteconfirmation = status;
      this.FetchAllClinicServices();
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