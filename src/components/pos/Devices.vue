<template>
  <v-container>
    <v-row>
        <v-col cols="12">
            <v-card
                :loading="loading"
            >
                <template slot="progress">
                    <v-progress-linear
                        color="deep-purple"
                        height="10"
                        indeterminate
                    ></v-progress-linear>
                </template>

                <v-card-text>

                  <template>
  <v-toolbar dense style="">
    <!-- <v-overflow-btn
      :items="dropdown_font"
      label="Select font"
      hide-details
      class="pa-0"
        overflow
    ></v-overflow-btn> -->
    <!-- <v-overflow> -->
      <!-- <v-divider vertical></v-divider> -->
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
    <!-- </v-overflow> -->

    <!-- <template v-if="$vuetify.breakpoint.mdAndUp"> -->

      <!-- <v-overflow-btn
        :items="headers"
        editable
        label="Select size"
        hide-details
      ></v-overflow-btn> -->

      <!-- <v-divider vertical></v-divider> -->

      <!-- &nbsp; -->
      <!-- <v-btn> -->
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
        <!-- &nbsp;<v-icon>mdi-view-column</v-icon>Column -->
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
        &nbsp;&nbsp;
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
        <!-- </v-btn> -->

      <!-- <v-spacer></v-spacer> -->

      <!-- <v-btn-toggle
        v-model="toggle_multiple"
        color="primary"
        dense
        group
        multiple
      > -->
      &nbsp;
        <!-- insert val access supplier download -->
      <!-- <template v-if="$vuetify.breakpoint.mdAndUp">
        
        <v-btn
          text
          color="orange"
          style="border: thin solid orange;"
          @click="ExportSupplierInformation()"
        >
          <v-icon>mdi-download-outline</v-icon>
        </v-btn>
        &nbsp;
        <v-btn
          text
          color="orange"
          style="border: thin solid orange;"
          @click="uploadfileopen()"
        >
          <v-icon>mdi-upload-outline</v-icon>
        </v-btn>
        </template>

        &nbsp;
        <template v-if="$vuetify.breakpoint.smAndDown">
        
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="orange"
                  dark
                  medium
                  v-bind="attrs"
                  v-on="on"
                >
                <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                  v-for="(item, index) in exportimport"
                  :key="index"
                >
                <div v-if="item.linktrigger == 1">
                  <v-list-item-title @click="uploadfileopen()"> <v-icon>{{ item.icon }}</v-icon>{{ item.text }}</v-list-item-title>
                </div>
                <div v-else>
                  <v-list-item-title @click="ExportSupplierInformation()"> <v-icon>{{ item.icon }}</v-icon>{{ item.text }}</v-list-item-title>
                </div>
                </v-list-item>
              </v-list>
            </v-menu>
        </template> -->


        <!-- <v-btn
          text
          color="orange"
          style="border: thin solid orange;"
        >
          <v-icon>mdi-view-column</v-icon>Column
        </v-btn> -->
       
      <template v-if="$vuetify.breakpoint.mdAndUp">
        <v-btn
        medium
        dark
          color="orange"
          elevation="2"
          v-if="$store.getters.valAccess(18)"
                            @click="NewDevices()"
        >
          <v-icon>mdi-plus</v-icon>Create
        </v-btn>
        </template>

        <template v-if="$vuetify.breakpoint.smAndDown">
        <v-btn
        medium
        dark
          color="orange"
          elevation="2"
          style="padding-left: 12px;padding-right: 12px;"
          v-if="$store.getters.valAccess(18)"
                            @click="NewDevices()"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
        </template>
        

        

        
        <!-- <v-btn
          :value="3"
          text
        >
          <v-icon>mdi-format-underline</v-icon>
        </v-btn>

        <v-btn
          :value="4"
          text
        >
          <v-icon>mdi-format-color-fill</v-icon>
        </v-btn> -->
      <!-- </v-btn-toggle> -->


    
    <!-- </template> -->
  </v-toolbar>
</template>
 
                    <!-- <div class="text-right">
                      <v-select v-model="selectedHeaders" :items="headers" label="Select Columns" multiple outlined return-object>
            <template v-slot:selection="{ item, index }">
              <v-chip v-if="index < 2">
                <span>{{ item.text }}</span>
              </v-chip>
              <span v-if="index === 2" class="grey--text caption">(+{{ selectedHeaders.length - 2 }} others)</span>
            </template>
         </v-select>
                      <div class="col-sm-12">
                        <v-btn
                            elevation="2"
                            outlined
                            dark
                            small
                            color="orange"
                            v-if="$store.getters.valAccess(18)"
                            @click="NewDevices()"
                        >
                            <v-icon small>
                                mdi-plus
                            </v-icon>
                            Create
                        </v-btn>
                        </div>
                    </div>
                    <div class="offset-md-9 col-sm-3">
                                        <v-text-field
                                            v-model="search"
                                            append-icon="mdi-magnify"
                                            label="Search"
                                            outlined
                                            hide-details
                                            color="orange"
                                        ></v-text-field>
                                    </div> -->
                            <br>
                    <v-data-table
                        :headers="showHeaders"
                        :items="devices"
                        :search="search"
                        :page.sync="page"
                      @page-count="pageCount = $event"
                      :footer-props="{
                      'items-per-page-options':[10],
                      'disable-items-per-page': true,
    }"
                    >
                    <template v-slot:item.machine_number="props">
                        Machine #: {{ props.item.machine_number }}
                    </template>
                    <template v-slot:item.serial_number="props">
                      {{ props.item.serial_number }}
                        <!-- <v-edit-dialog
                            :return-value.sync="props.item.serial_number"
                            @save="UpdateDeviceshInformation(props.item.id, 'serial_number', props.item.serial_number)"
                        >
                        {{ props.item.serial_number }}
                        <template v-slot:input>
                            <v-text-field
                            v-if="$store.getters.valAccess(19)"
                                v-model="props.item.serial_number"
                                label="Edit"
                                single-line
                            ></v-text-field>
                        </template>
                        </v-edit-dialog> -->
                    </template>
                    <template v-slot:item.min_number="props">
                      {{ props.item.min_number }}
                        <!-- <v-edit-dialog
                            :return-value.sync="props.item.min_number"
                            @save="UpdateDeviceshInformation(props.item.id, 'min_number', props.item.min_number)"
                        >
                        {{ props.item.min_number }}
                        <template v-slot:input>
                            <v-text-field
                            v-if="$store.getters.valAccess(19)"
                                v-model="props.item.min_number"
                                label="Edit"
                                single-line
                            ></v-text-field>
                        </template>
                        </v-edit-dialog> -->
                    </template>
                    <template v-slot:item.permit_number="props">
                      {{ props.item.permit_number }}
                        <!-- <v-edit-dialog
                            :return-value.sync="props.item.permit_number"
                            @save="UpdateDeviceshInformation(props.item.id, 'permit_number', props.item.permit_number)"
                        >
                        {{ props.item.permit_number }}
                        <template v-slot:input>
                            <v-text-field
                            v-if="$store.getters.valAccess(19)"
                                v-model="props.item.permit_number"
                                label="Edit"
                                single-line
                            ></v-text-field>
                        </template>
                        </v-edit-dialog> -->
                    </template>
                    <template v-slot:item.permit_issued_at="props">
                      {{ props.item.permit_issued_at }}
                        <!-- <v-edit-dialog
                            :return-value.sync="props.item.permit_issued_at"
                            @save="UpdateDeviceshInformation(props.item.id, 'permit_issued_at', props.item.permit_issued_at)"
                        >
                        {{ props.item.permit_issued_at }}
                        <template v-slot:input>
                            <v-date-picker v-if="$store.getters.valAccess(19)" style="margin: 10px 0px;" v-model="props.item.permit_issued_at"></v-date-picker>
                        </template>
                        </v-edit-dialog> -->
                    </template>
                    <template v-slot:item.permit_valid_at="props">
                      {{ props.item.permit_valid_at }}
                        <!-- <v-edit-dialog
                            :return-value.sync="props.item.permit_valid_at"
                            @save="UpdateDeviceshInformation(props.item.id, 'permit_valid_at', props.item.permit_valid_at)"
                        >
                        {{ props.item.permit_valid_at }}
                        <template v-slot:input>
                            <v-date-picker v-if="$store.getters.valAccess(19)" style="margin: 10px 0px;" v-model="props.item.permit_valid_at"></v-date-picker>
                        </template>
                        </v-edit-dialog> -->
                    </template>
                    <template v-slot:item.created_by="props">
                        {{ props.item.created_info.personal_information.lastname }}, {{ props.item.created_info.personal_information.firstname }}
                    </template>
                    <template v-slot:item.business_branch="props">
                        {{ props.item.business_branch_info.branch_name }}
                    </template>
                    <template v-slot:item.action="props">
                        <!-- <v-icon
                            small
                            @click="RemoveDevicesInformation(props.item.id, props.item)"
                        >
                            mdi-delete
                        </v-icon> -->
                        <v-btn
                            elevation="2"
                                class="mx-2"
                                dark
                                outlined
                                small
                                color="orange"
                                v-if="$store.getters.valAccess(19)"
                                @click="UpdateAllAnnouncement(props.item.id, props.item)"
                            >
                            <v-icon
                                    small
                                    @click="UpdateAllAnnouncement(props.item.id, props.item)"
                                >
                                    mdi-file-edit-outline
                                </v-icon>
                                Edit
                            </v-btn>
                        <v-btn
                      elevation="2"
                          class="mx-2"
                          dark
                          small
                          outlined
                          color="red"
                          v-if="$store.getters.valAccess(20)"
                          @click="RemoveDevicesInformation(props.item.id, props.item)"
                      >
                          <v-icon small>
                            mdi-delete
                          </v-icon>
                          Delete
                      </v-btn>
                    </template>
                    <template v-slot:item.type="props">
                        <v-edit-dialog>
                            <div v-if="props.item.type == 1">
                                Cashier
                            </div>
                            <div v-else-if="props.item.type == 2">
                                Kiosk
                            </div>
                            <div v-else-if="props.item.type == 3">
                                Take Order
                            </div>
                            <div v-else>
                                Inventory
                            </div>
                            <!-- <template v-slot:input v-if="$store.getters.valAccess(19)">
                                <v-radio-group v-model="props.item.type" @change="UpdateDeviceshInformation(props.item.id, 'type', props.item.type)">
                                    <v-radio
                                        label="Cashier"
                                        :value="1"
                                    ></v-radio>
                                    <v-radio
                                        label="Kiosk"
                                        :value="2"
                                    ></v-radio>
                                    <v-radio
                                        label="Take Order"
                                        :value="3"
                                    ></v-radio>
                                    <v-radio
                                        label="Inventory"
                                        :value="4"
                                    ></v-radio>
                                </v-radio-group>
                            </template> -->
                        </v-edit-dialog>
                    </template>
                    <template v-slot:item.flag="props">
                        <v-edit-dialog>
                            <v-chip
                                class="ma-2"
                                color="orange"
                                outlined
                                v-if="props.item.flag == 1"
                            >
                                Active
                            </v-chip>
                            <v-chip
                                class="ma-2"
                                color="red"
                                outlined
                                v-else
                            >
                                Inactive
                            </v-chip>
                            <!-- <template v-slot:input>
                                <v-switch
                                    v-if="$store.getters.valAccess(19)"
                                    v-model="props.item.flag"
                                    @change="UpdateDeviceshInformation(props.item.id, 'flag', props.item.flag)"
                                ></v-switch>
                            </template> -->
                        </v-edit-dialog>
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

    <!-- Dialog -->

             <!-- edit confirmation dialog -->
    <template>
  <v-row justify="center">
    <v-dialog
      v-model="editconfirmation"
      persistent
      max-width="290"
    >
      <v-card>
        <v-card-title class="text-h5">
          Edit
        </v-card-title>
        <v-card-text>Are you sure you want to update?</v-card-text>
        <!-- <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="changeStatusDialogEdit(false)"
          >
            Cancel
          </v-btn>
          <v-btn
            color="green darken-1"
            text
            @click="confirmUpdate()"
          >
            Update
          </v-btn>
        </v-card-actions> -->
        <center>
          <v-btn
            elevation="2"
            class="mx-2"
            dark
            outlined
            small
            color="red"
            @click="changeStatusDialogEdit(false)"
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
            @click="confirmUpdate()"
            >
            Confirm
          </v-btn>
        </center>
        <br>
      </v-card>
    </v-dialog>
  </v-row>
</template>
    <!-- end edit confirmation dialog -->

           <!-- save confirmation dialog -->
    <template>
  <v-row justify="center">
    <v-dialog
      v-model="saveconfirmation"
      persistent
      max-width="290"
    >
      <v-card>
        <v-card-title class="text-h5">
          Save
        </v-card-title>
        <v-card-text>Are you sure you want to save?</v-card-text>
        <!-- <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="changeStatusDialogSave(false)"
          >
            Cancel
          </v-btn>
          <v-btn
            color="green darken-1"
            text
            @click="SaveDevicesInformation()"
          >
            Save
          </v-btn>
        </v-card-actions> -->

        <center>
          <v-btn
            elevation="2"
            class="mx-2"
            dark
            outlined
            small
            color="red"
            @click="changeStatusDialogSave(false)"
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
            @click="SaveDevicesInformation()"
            >
              Confirm
          </v-btn>
        </center>
        <br>        
      </v-card>
    </v-dialog>
  </v-row>
</template>
    <!-- end save confirmation dialog -->

    <!-- delete confirmation dialog -->
    <template>
  <v-row justify="center">
    <v-dialog
      v-model="confirmation"
      persistent
      max-width="290"
    >
      <v-card>
        <v-card-title class="text-h5">
          Delete
        </v-card-title>
        <v-card-text>Are you sure you want to delete <b>Machine Number #{{ this.foDelete.data['machine_number'] }}</b>?</v-card-text>
        <!-- <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="changeStatusDialog(false)"
          >
            Cancel
          </v-btn>
          <v-btn
            color="green darken-1"
            text
            @click="confirmDelete()"
          >
            Delete
          </v-btn>
        </v-card-actions> -->
        <center>
          <v-btn
            elevation="2"
            class="mx-2"
            dark
            outlined
            small
            color="red"
            @click="changeStatusDialog(false)"
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
            @click="confirmDelete()"
            >
            Confirm
          </v-btn>
        </center>
        <br>        
      </v-card>
    </v-dialog>
  </v-row>
</template>
    <!-- delete end confirmation dialog -->
    
    <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-dialog
      v-model="dialog"
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
            @click="dialog = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Add Devices</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <!-- <v-btn
              dark
              text
              @click="validate()"
              id="btn-next" class="btn btn-orange btn-sm p-2" style="font-size: 12px;"
              >
              Save
            </v-btn> -->
          </v-toolbar-items>
        </v-toolbar>

        <v-col sm="12" md="6" offset-md="3" class="mt-3 text-center"> 
            <h4>Note: Here you can add another devices on your branch.</h4>
        </v-col>
        <v-col sm="12" md="6" offset-md="3"> 
            <v-combobox
            color="orange"
                outlined
                label="Branch"
                :items="branch"
                v-model="devices_information.business_branch_id"
                  :rules="[v => !!v || 'Business Information is required']"
            ></v-combobox>
            <v-text-field
            color="orange"
                label="Permit Number"
                required
                outlined
                v-model="devices_information.permit_number"
                 :counter="50"
                 :rules="nameRules"
            ></v-text-field>
            <v-text-field
            color="orange"
                label="Serial Number"
                required
                outlined
                v-model="devices_information.serial_number"
                 :counter="50"
                 :rules="nameRules"
            ></v-text-field>
            <v-text-field
            color="orange"
                label="MIN Number"
                required
                outlined
                v-model="devices_information.min_number"
                 :counter="50"
                 :rules="nameRules"
            ></v-text-field>
            <v-menu
            color="orange"
                v-model="permit_issued"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
            >
                <template v-slot:activator="{ on, attrs }">
                <v-text-field
                color="orange"
                    v-model="devices_information.permit_issued_at"
                    outlined
                    label="Permit Issued Date"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                ></v-text-field>
                </template>
                <v-date-picker
                color="orange"
                    v-model="devices_information.permit_issued_at"
                    @input="permit_issued = false"
                ></v-date-picker>
            </v-menu>
            <v-menu
            color="orange"
                v-model="permit_valid"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
            >
            <template v-slot:activator="{ on, attrs }">
                <v-text-field
                color="orange"
                    v-model="devices_information.permit_valid_at"
                    outlined
                    label="Valid Issued Date"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                ></v-text-field>
            </template>
            <v-date-picker
            color="orange"
                v-model="devices_information.permit_valid_at"
                @input="permit_valid = false"
            ></v-date-picker>
            </v-menu>
            <v-radio-group row v-model="devices_information.type">
                <v-radio
                color="orange"
                    label="Cashier"
                    :value="1"
                ></v-radio>
                <v-radio
                color="orange"
                    label="Kiosk"
                    :value="2"
                ></v-radio>
                <v-radio
                color="orange"
                    label="Take Order"
                    :value="3"
                ></v-radio>
                <v-radio
                color="orange"
                    label="Inventory"
                    :value="4"
                ></v-radio>
            </v-radio-group>
            <center>
                    <v-col sm="12" md="12">
                        <v-btn
                        color="orange"
                        block
                        outlined
                        @click="validate()"
                        id="btn-next" class="btn btn-success btn-sm p-2" style="font-size: 12px;"
                        >
                        Save
                      </v-btn>
                    </v-col>
                  </center>
        </v-col>
      </v-card>
    </v-dialog>
    </v-form>

    <v-dialog
    fullscreen
    v-model="editfullscreendialog"
    hide-overlay
    transition="dialog-bottom-transition"
    >
        <v-card>

            <v-form
            ref="form"
            v-model="valid"
            lazy-validation
            >

            <v-toolbar
                dark
                color="orange"
            >
                <v-btn icon dark @click="CloseDialogEditFullScreen(), SetNewDeviceInformation()">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>Edit Device</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                </v-toolbar-items>
            </v-toolbar>
            
            <v-col sm="12" md="6" offset-md="3" class="mt-3 text-center"> 
            <h4>Note: Here you can edit devices on your branch.</h4>
        </v-col>
        <v-col sm="12" md="6" offset-md="3"> 
            <!-- <v-combobox
            color="orange"
                outlined
                label="Branch"
                :items="branch"
                v-model="devices_information.business_branch_id"
                  :rules="[v => !!v || 'Business Information is required']"
            ></v-combobox> -->
            <v-text-field
            color="orange"
                label="Permit Number"
                required
                outlined
                v-model="devices_information.permit_number"
                 :counter="50"
                 :rules="nameRules"
            ></v-text-field>
            <v-text-field
            color="orange"
                label="Serial Number"
                required
                outlined
                v-model="devices_information.serial_number"
                 :counter="50"
                 :rules="nameRules"
            ></v-text-field>
            <v-text-field
            color="orange"
                label="MIN Number"
                required
                outlined
                v-model="devices_information.min_number"
                 :counter="50"
                 :rules="nameRules"
            ></v-text-field>
            <v-menu
            color="orange"
                v-model="permit_issuedss"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
            >
                <template v-slot:activator="{ on, attrs }">
                <v-text-field
                color="orange"
                    v-model="devices_information.permit_issued_at"
                    outlined
                    label="Permit Issued Date"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                ></v-text-field>
                </template>
                <v-date-picker
                color="orange"
                    v-model="devices_information.permit_issued_at"
                    @input="permit_issuedss = false"
                ></v-date-picker>
            </v-menu>
            <v-menu
            color="orange"
                v-model="permit_validss"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
            >
            <template v-slot:activator="{ on, attrs }">
                <v-text-field
                color="orange"
                    v-model="devices_information.permit_valid_at"
                    outlined
                    label="Valid Issued Date"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                ></v-text-field>
            </template>
            <v-date-picker
            color="orange"
                v-model="devices_information.permit_valid_at"
                @input="permit_validss = false"
            ></v-date-picker>
            </v-menu>
            <v-radio-group row v-model="devices_information.type">
                <v-radio
                color="orange"
                    label="Cashier"
                    :value="1"
                ></v-radio>
                <v-radio
                color="orange"
                    label="Kiosk"
                    :value="2"
                ></v-radio>
                <v-radio
                color="orange"
                    label="Take Order"
                    :value="3"
                ></v-radio>
                <v-radio
                color="orange"
                    label="Inventory"
                    :value="4"
                ></v-radio>
            </v-radio-group>
            
            <center>
                    <v-col sm="12" md="6">
                        <v-btn
                        color="orange"
                        block
                        outlined
                        @click="valid == false ? validationfalse() : changeStatusDialogEdit(true)"
                        >
                        Update
                      </v-btn>
                    </v-col>
                    </center>
        </v-col>

            </v-form>
        </v-card>
    </v-dialog>
  </v-container>
    
</template>

<script>

  import devicesservices from '../services/devicesservices';
  import branchservices from '../services/branchservices';

  export default {
    name: 'Devices',
    data: () => ({
      editfullscreendialog: false,
      menucolumn: false,
      search: '',
        page: 1,
        pageCount: 0,
        loading: false,
        dialog: false,
        devices: [],
        headers:[],
        selectedHeaders: [],
        headersMap: [
          { text: 'Machine Number',sortable: true, value: 'machine_number' },
          { text: 'Product Key',sortable: false, value: 'product_key' },
          { text: 'Serial Number',sortable: false, value: 'serial_number' },
          { text: 'MIN Number',sortable: false, value: 'min_number' },
          { text: 'Permit Number',sortable: false, value: 'permit_number' },
          { text: 'Issued At',sortable: false, value: 'permit_issued_at' },
          { text: 'Valid At',sortable: false, value: 'permit_valid_at' },
          { text: 'Created By',sortable: false, value: 'created_by' },
          { text: 'Business Branch',sortable: false, value: 'business_branch' },
          { text: 'Type',sortable: false, value: 'type' },
          { text: 'Status',sortable: false, value: 'flag' },
          { text: 'Action',sortable: false, value: 'action', width: "230px" }
        ],
        devices_information: {
            parent_user_id: 0,
            business_branch_id: null,
            machine_number: '',
            permit_number: '',
            serial_number: '',
            min_number: '',
            permit_issued_at: '',
            permit_valid_at: '',
            type: 1,
            created_by: 0
        },
        permit_issuedss: false,
        permit_issued: false,
        permit_validss: false,
        permit_valid: false,
        branch: [],
        valid: true,
        nameRules: [
        v => !!v || 'This is a require field',
        // v => (v && v.length >= 2) || 'Name must be more than 1 characters',
        ],
        confirmation: false,
        saveconfirmation: false,
        editconfirmation: false,
        foDelete: {
            id: 0,
            data: ''
        }
    }),
    created(){
        this.$store.state.header = true;
        this.$store.state.footer = true;
        this.$store.state.snackbar.color = 'orange';
        this.FetchPOSDevicesInformation();
        this.SetNewDeviceInformation();
        this.headers = Object.values(this.headersMap);
        this.selectedHeaders = this.headers;
    },
    mounted(){
        this.$store.state.title = "Devices Information";
    },
    computed: {
      //Done to get the ordered headers
      showHeaders () {
        return this.headers.filter(s => this.selectedHeaders.includes(s));
      }
    },
    methods: {
        changeStatusDialog(status){
            this.confirmation = status;
        },
        changeStatusDialogSave(status){
            this.saveconfirmation = status;
        },
        changeStatusDialogEdit(status){
            this.editconfirmation = status;
            this.FetchPOSDevicesInformation();
        },
        FetchPOSDevicesInformation(){

            let payload = {
                user_id: this.$store.getters.getParentID
                // user_id: this.$store.getters.fetchUserInfo.account_information.is_parent == 1 ? this.$store.getters.fetchUserInfo.account_information.id : this.$store.getters.fetchUserInfo.account_information.parent_id
            };

            devicesservices.fetchPOSDevicesInformation(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    this.devices = response.data.result;
                }
            }).catch(error => console.log(error));

        },

        confirmUpdate(){
          let val = this.$refs.form.validate();

            if(val){
              let payload = {
                  id: this.forAllUpdate['id'],
                  devices_information: JSON.stringify(this.devices_information)
                  // business_branch_id : this.devices_information.business_branch_id,
                  // permit_number : this.devices_information.permit_number,
                  // serial_number : this.devices_information.serial_number,
                  // min_number : this.devices_information.min_number,
                  // permit_issued_at : this.devices_information.permit_issued_at,
                  // permit_valid_at : this.devices_information.permit_valid_at,
                  // type : this.devices_information.type
              }
              // console.log(payload);
              devicesservices.UpdateDevicesRowsInformations(payload, this.$store.getters.getAccessToken).catch(error => console.log(error));
              this.$store.state.snackbar.message = 'Device information has been updated.';
              this.$store.state.snackbar.show = true;
              this.FetchPOSDevicesInformation();
              this.$store.state.snackbar.colors = 'xgreen';
                    this.$store.state.snackbar.icon = "mdi-check-circle-outline";    
            }
            this.editconfirmation = false
            this.editfullscreendialog = false
        },
        UpdateDeviceshInformation(id, name, value){

            this.foUpdate = {
                id: id,
                name: name,
                value: value
            }
            this.editconfirmation = true

        },
        NewDevices(){
            this.dialog = true;
            this.FetchBranchInformation();
        },
        SetNewDeviceInformation(){

            this.devices_information = {
                parent_user_id: this.$store.getters.getParentID,
                // parent_user_id: this.$store.getters.fetchUserInfo.account_information.is_parent == 1 ? this.$store.getters.fetchUserInfo.account_information.id : this.$store.getters.fetchUserInfo.account_information.parent_id,
                business_branch_id: null,
                permit_number: '',
                serial_number: '',
                min_number: '',
                permit_issued_at: this.$dayjs().format('YYYY-MM-DD'),
                permit_valid_at: this.$dayjs().format('YYYY-MM-DD'),
                type: this.type,
                created_by: this.$store.getters.fetchUserInfo.account_information.id
            };

        },
        FetchBranchInformation(){

            let payload = {
                user_id: this.$store.getters.getParentID
                // user_id: this.$store.getters.fetchUserInfo.account_information.is_parent == 1 ? this.$store.getters.fetchUserInfo.account_information.id : this.$store.getters.fetchUserInfo.account_information.parent_id
            };

            branchservices.fetchBranchInformation(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    response.data.result.forEach((value) => {
                        this.branch.push({
                            text: value.branch_name,
                            value: value.id
                        });
                    });
                }
            }).catch(error => console.log(error));

        },
        validate(){

            let val = this.$refs.form.validate();

            if(val){
                this.confirmSave();
            }
        },
        confirmSave(){
            this.saveconfirmation = true
        },
        ClearSaveDevices(){
            this.devices_information.permit_number = '';
            this.devices_information.serial_number = '';
            this.devices_information.min_number = '';
            this.devices_information.business_branch_id = null;
        },
        SaveDevicesInformation(){

            var myBranchCode = this.devices_information['business_branch_id'];
            this.devices_information['business_branch_id'] = myBranchCode['value'];
            let payload = {
                devices_information: JSON.stringify(this.devices_information)
            };

            devicesservices.savePOSDevicesInformation(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    this.FetchPOSDevicesInformation();
                    this.ClearSaveDevices();
                    this.dialog = false;
                    this.$store.state.snackbar.message = response.data.message;
                    this.$store.state.snackbar.show = true;
                    this.saveconfirmation = false
                    this.$store.state.snackbar.colors = 'xgreen';
                    this.$store.state.snackbar.icon = "mdi-check-circle-outline";   
                }else{
                    this.$store.state.snackbar.colors = 'xred';
                      this.$store.state.snackbar.icon = "mdi-alert-outline";                      
                  }                 

            }).catch(error => console.log(error));

        },
        confirmDelete(){
            this.devices.splice(this.devices.indexOf(this.foDelete['data']), 1);

            let payload = {
                id: this.foDelete['id']
            };
            devicesservices.removePOSDevicesInformation(payload, this.$store.getters.getAccessToken).catch(error => console.log(error));

            this.$store.state.snackbar.message = 'Device information has been removed.';
            this.$store.state.snackbar.show = true;
            this.confirmation = false
            this.$store.state.snackbar.colors = 'xgreen';
                    this.$store.state.snackbar.icon = "mdi-check-circle-outline";   

        },
        RemoveDevicesInformation(id, data){
            this.foDelete = {
                id: id,
                data: data
            }
            this.confirmation = true
        },
        UpdateAllAnnouncement(id, item){
            console.log(id, item)
            this.devices_information.business_branch_id = item.business_branch_id
            this.devices_information.permit_number = item.permit_number
            this.devices_information.serial_number = item.serial_number
            this.devices_information.min_number = item.min_number
            this.devices_information.permit_issued_at = item.permit_issued_at
            this.devices_information.permit_valid_at = item.permit_valid_at
            this.devices_information.type = item.type

            this.forAllUpdate = {
                id: id
            }
            this.editfullscreendialog = true
        },
        CloseDialogEditFullScreen(){
            this.editfullscreendialog = false
        },
        validationfalse(){
            this.$refs.form.validate()
        },
    }
  }
</script>

<style scoped>
  input[type=checkbox] {
  accent-color: orange;
}
</style>