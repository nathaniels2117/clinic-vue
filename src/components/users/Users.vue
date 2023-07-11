<template>
   <v-container style="max-width: 95%; position: relative;" >
    <v-row justify="center">
      <v-col cols="12">
          <v-card>
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
        &nbsp; &nbsp;
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
          @click="NewUser()" 
          v-if="$store.getters.valAccess(5)"
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
          @click="NewUser()" 
          v-if="$store.getters.valAccess(5)"
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
                            class="mx-2"
                            outlined
                            
                            dark
                            small
                            color="primary"
                            v-if="this.$store.getters.valAccess(4)"
                        >
                            <v-icon small>
                              mdi-download
                            </v-icon>
                            Download
                        </v-btn>
                    <v-btn
                        elevation="2"
                        outlined
                        dark
                        small
                        color="primary"
                        @click="NewUser()"
                        v-if="this.$store.getters.valAccess(5)"
                        >
                            <v-icon small>
                                mdi-plus
                            </v-icon>
                            Create
                        </v-btn>
                </div>

            </div> -->

                  <!-- <v-data-table
                      :headers="headers"
                      :items="users.parent_child_user_information"
                      :items-per-page="15"
                      v-if="this.$store.getters.valAccess(4)"
                  >
                    <template v-slot:item.firstname="props">
                        <v-edit-dialog
                            :return-value.sync="props.item.personal_information.firstname"
                            @save="UpdatePersonalInformation(props.item.personal_information.id, 'firstname', props.item.personal_information.firstname)"
                        >
                        {{ props.item.personal_information != null ? props.item.personal_information.firstname : 'No Data' }}
                        {{ props.item.personal_information.firstname }}
                        <template v-slot:input>
                            <v-text-field
                                v-model="props.item.personal_information.firstname"
                                label="Edit"
                                single-line
                            ></v-text-field>
                        </template>
                        </v-edit-dialog>
                    </template>
                    <template v-slot:item.middlename="props">
                        <v-edit-dialog
                            :return-value.sync="props.item.personal_information.middlename"
                            @save="UpdatePersonalInformation(props.item.personal_information.id, 'middlename', props.item.personal_information.middlename)"
                        >
                        {{ props.item.personal_information.middlename }}
                        <template v-slot:input>
                            <v-text-field
                                v-model="props.item.personal_information.middlename"
                                label="Edit"
                                single-line
                            ></v-text-field>
                        </template>
                        </v-edit-dialog>
                    </template>
                    <template v-slot:item.lastname="props">
                        <v-edit-dialog
                            :return-value.sync="props.item.personal_information.lastname"
                            @save="UpdatePersonalInformation(props.item.personal_information.id, 'lastname', props.item.personal_information.lastname)"
                        >
                        {{ props.item.personal_information.lastname }}
                        <template v-slot:input>
                            <v-text-field
                                v-model="props.item.personal_information.lastname"
                                label="Edit"
                                single-line
                            ></v-text-field>
                        </template>
                        </v-edit-dialog>
                    </template>
                    <template v-slot:item.mobile_number="props">
                        <v-edit-dialog
                            :return-value.sync="props.item.personal_information.mobile_number"
                            @save="UpdatePersonalInformation(props.item.personal_information.id, 'mobile_number', props.item.personal_information.mobile_number)"
                        >
                        {{ props.item.personal_information.mobile_number }}
                        <template v-slot:input>
                            <v-text-field
                                v-model="props.item.personal_information.mobile_number"
                                label="Edit"
                                single-line
                            ></v-text-field>
                        </template>
                        </v-edit-dialog>
                    </template>
                    <template v-slot:item.birth_date="props">
                        <v-edit-dialog
                            :return-value.sync="props.item.personal_information.birth_date"
                            @save="UpdatePersonalInformation(props.item.personal_information.id, 'birth_date', props.item.personal_information.birth_date)"
                        >
                        {{ props.item.personal_information.birth_date }}
                        <template v-slot:input>
                            <v-date-picker style="margin: 10px 0px;" v-model="props.item.personal_information.birth_date"></v-date-picker>
                        </template>
                        </v-edit-dialog>
                    </template>
                    <template v-slot:item.flag="props">
                            <v-edit-dialog
                            >
                            <v-chip
                                class="ma-2"
                                color="primary"
                                v-if="props.item.flag == 1"
                            >
                                Active
                            </v-chip>
                            <v-chip
                                class="ma-2"
                                color="red"
                                v-else
                            >
                                Inactive
                            </v-chip>
                            <template v-slot:input>
                                <v-switch
                                    v-model="props.item.flag"
                                    @change="UpdateUserInformation(props.item.id, 'flag', props.item.flag)"
                                ></v-switch>
                            </template>
                            </v-edit-dialog>
                        </template>

                    <template v-slot:item.division="props"> 
                        <v-edit-dialog
                            :return-value.sync="props.item.division_information.name"
                            @open="fetchDivisionInformation()"
                            @save="UpdateUserInformation(props.item.id, 'division_id', props.item.division_information.id, props.item)"
                        >
                        {{ props.item.division_information.name }}
                        <template v-slot:input>
                            <v-select
                                :items="division_information"
                                v-model="props.item.division_information.id"
                            ></v-select>
                        </template>
                        </v-edit-dialog>
                    </template>
                    <template v-slot:item.position="props">
                        <v-edit-dialog
                            :return-value.sync="props.item.role_information.name"
                            @open="fetchRoleInformations()"
                            @save="UpdateUserInformation(props.item.id, 'role_id', props.item.role_information.id, props.item)"
                        >
                        {{ props.item.role_information.name }}
                        <template v-slot:input>
                            <v-select
                                :items="role_information"
                                v-model="props.item.role_information.id"
                            ></v-select>
                        </template>
                        </v-edit-dialog>
                    </template> 

                    <template v-slot:item.branch="props">
                        <v-edit-dialog
                            :return-value.sync="props.item.branch_information.branch_name"
                            @open="fetchBranchInformations()"
                            @save="UpdateUserInformation(props.item.id, 'branch_id', props.item.branch_information.id, props.item)"
                        >
                        {{ props.item.branch_information.branch_name }}
                        <template v-slot:input>
                            <v-select
                                :items="branch_information"
                                v-model="props.item.branch_information.id"
                            ></v-select>
                        </template>
                        </v-edit-dialog>
                    </template> 

                    <template v-slot:item.email="props">
                        {{ props.item.email }}
                    </template>
                    <template v-slot:item.email_verified_at="props">
                        <div class="text-center">
                          <v-icon
                              small
                              v-if="props.item.email_verified_at == null"
                              @click="SendVerificationEmail(props.item.id)"
                          >
                              mdi-email-send
                          </v-icon>
                          <v-chip
                              class="ma-2"
                              color="primary"
                              v-else
                          >
                              Verified
                          </v-chip>
                        </div>
                    </template>
                  </v-data-table>

                  <v-data-table
                      :headers="headers"
                      :items="users.parent_child_user_information"
                      :items-per-page="15"
                      v-else
                  >
                    <template v-slot:item.firstname="props">
                        {{ props.item.personal_information.firstname }}
                    </template>
                    <template v-slot:item.middlename="props">
                        {{ props.item.personal_information.middlename }}
                    </template>
                    <template v-slot:item.lastname="props">
                        {{ props.item.personal_information.lastname }}
                    </template>
                    <template v-slot:item.birth_date="props">
                        {{ props.item.personal_information.birth_date }}
                    </template>
                    <template v-slot:item.division="props"> 
                        {{ props.item.division_information.name }}
                    </template>
                    <template v-slot:item.position="props"> 
                        {{ props.item.role_information.name }}
                    </template> 
                    <template v-slot:item.branch="props"> 
                        {{ props.item.branch_information.branch_name }}
                    </template> 
                    <template v-slot:item.mobile_number="props">
                        {{ props.item.personal_information.mobile_number }}
                    </template>
                    <template v-slot:item.email="props">
                        {{ props.item.email }}
                    </template>
                    <template v-slot:item.email_verified_at="props">
                        <div class="text-center">
                          <v-icon
                              small
                              v-if="props.item.email_verified_at == null"
                              @click="SendVerificationEmail(props.item.id)"
                          >
                              mdi-email-send
                          </v-icon>
                          <v-chip
                              class="ma-2"
                              color="primary"
                              v-else
                          >
                              Verified
                          </v-chip>
                        </div>
                    </template>
                  </v-data-table> -->

<!-- <div class="container"> -->
              <!-- <div class="col-sm-9">
              </div> -->
              <!-- <div class="offset-md-9 col-sm-3">
                                        <v-text-field
                                            v-model="search"
                                            append-icon="mdi-magnify"
                                            label="Search"
                                            outlined
                                            hide-details
                                            color="primary"
                                        ></v-text-field>
                                    </div> -->
                            <br>
                        <v-data-table
                        :headers="showHeaders"
                        :items="listemployeedata"
                        :search="search" 
                        :page.sync="page"
                      @page-count="pageCount = $event"
                      :footer-props="{
                      'items-per-page-options':[10],
                      'disable-items-per-page': true,
    }"
                        >

                                <template v-slot:item.firstname="props">
                                  {{ props.item.personal_information.firstname }}
                                <!-- <v-edit-dialog
                                    :return-value.sync="props.item.personal_information.firstname"
                                    @save="UpdatePersonalInformation(props.item.personal_information.id, 'firstname', props.item.personal_information.firstname)"
                                >
                                {{ props.item.personal_information.firstname }}
                                <template v-slot:input>
                                    <v-text-field
                                        v-if=$store.getters.valAccess(6)
                                        v-model="props.item.personal_information.firstname"
                                        label="Edit"
                                        single-line
                                    ></v-text-field>
                                </template>
                                </v-edit-dialog> -->
                            </template>
                            <template v-slot:item.middlename="props">
                              {{ props.item.personal_information.middlename }}
                                <!-- <v-edit-dialog
                                    :return-value.sync="props.item.personal_information.middlename"
                                    @save="UpdatePersonalInformation(props.item.personal_information.id, 'middlename', props.item.personal_information.middlename)"
                                >
                                {{ props.item.personal_information.middlename }}
                                <template v-slot:input>
                                    <v-text-field
                                        v-if=$store.getters.valAccess(6)
                                        v-model="props.item.personal_information.middlename"
                                        label="Edit"
                                        single-line
                                    ></v-text-field>
                                </template>
                                </v-edit-dialog> -->
                            </template>
                            <template v-slot:item.lastname="props">
                              {{ props.item.personal_information.lastname }}
                                <!-- <v-edit-dialog
                                    :return-value.sync="props.item.personal_information.lastname"
                                    @save="UpdatePersonalInformation(props.item.personal_information.id, 'lastname', props.item.personal_information.lastname)"
                                >
                                {{ props.item.personal_information.lastname }}
                                <template v-slot:input>
                                    <v-text-field
                                        v-if=$store.getters.valAccess(6)
                                        v-model="props.item.personal_information.lastname"
                                        label="Edit"
                                        single-line
                                    ></v-text-field>
                                </template>
                                </v-edit-dialog> -->
                            </template>
                            <template v-slot:item.mobile_number="props">
                              {{ props.item.personal_information.mobile_number }}
                                <!-- <v-edit-dialog
                                    :return-value.sync="props.item.personal_information.mobile_number"
                                    @save="UpdatePersonalInformation(props.item.personal_information.id, 'mobile_number', props.item.personal_information.mobile_number)"
                                >
                                {{ props.item.personal_information.mobile_number }}
                                <template v-slot:input>
                                    <v-text-field
                                        v-if=$store.getters.valAccess(6)
                                        v-model="props.item.personal_information.mobile_number"
                                        :counter="11"
                                        :rules="[v => !!v || 'Mobile number is required',(mobile_number && mobile_number.length >= 11) || 'minimum 11 numbers']"
                                        v-mask="'09#########'"
                                        label="Edit"
                                        single-line
                                    ></v-text-field>
                                </template>
                                </v-edit-dialog> -->
                            </template>
                            <template v-slot:item.birth_date="props">
                              {{ props.item.personal_information.birth_date }}
                                <!-- <v-edit-dialog
                                    :return-value.sync="props.item.personal_information.birth_date"
                                    @save="UpdatePersonalInformation(props.item.personal_information.id, 'birth_date', props.item.personal_information.birth_date)"
                                >
                                {{ props.item.personal_information.birth_date }}
                                <template v-slot:input>
                                    <v-date-picker  v-if=$store.getters.valAccess(6) style="margin: 10px 0px;" v-model="props.item.personal_information.birth_date"></v-date-picker>
                                </template>
                                </v-edit-dialog> -->
                            </template>

                            <template v-slot:item.flag="props">
                              <v-chip
                                        class="ma-2"
                                        outlined
                                        color="orange"
                                        v-if="props.item.flag == 1"
                                    >
                                        Active
                                    </v-chip>
                                    <v-chip
                                        class="ma-2"
                                        outlined
                                        color="red"
                                        v-else
                                    >
                                        Inactive
                                    </v-chip>
                                    <!-- <v-edit-dialog
                                    >
                                    <v-chip
                                        class="ma-2"
                                        outlined
                                        color="orange"
                                        v-if="props.item.flag == 1"
                                    >
                                        Active
                                    </v-chip>
                                    <v-chip
                                        class="ma-2"
                                        outlined
                                        color="red"
                                        v-else
                                    >
                                        Inactive
                                    </v-chip>
                                    <template v-slot:input>
                                        <v-switch
                                            v-model="props.item.flag"
                                            @change="UpdateUserInformation(props.item.id, 'flag', props.item.flag)"
                                        ></v-switch>
                                    </template>
                                    </v-edit-dialog> -->
                                </template>

                                <template v-slot:item.division="props"> 
                                  {{ props.item.division_information != null ? props.item.division_information.name : '' }}
                                    <!-- <div v-if="props.item.division_information != null">
                                        <v-edit-dialog
                                            :return-value.sync="props.item.division_information.name"
                                            @open="fetchDivisionInformation()"
                                            @save="UpdateUserInformation(props.item.id, 'division_id', props.item.division_information.id, props.item)"
                                        >
                                        {{ props.item.division_information.name }}
                                        <template v-slot:input>
                                            <v-select
                                                v-if=$store.getters.valAccess(6)
                                                :items="division_information"
                                                v-model="props.item.division_information.id"
                                            ></v-select>
                                        </template>
                                        </v-edit-dialog>
                                    </div>
                                    <div v-else>
                                        <v-edit-dialog
                                            @open="fetchDivisionInformation()"
                                            @save="UpdateUserInformation(props.item.id, 'division_id', props.item.division_id, props.item)"
                                        >
                                        {{ props.item.division_information != null ? props.item.division_information.name : '' }}
                                        <template v-slot:input>
                                            <v-select
                                                v-if=$store.getters.valAccess(6)
                                                :items="division_information"
                                                v-model="props.item.division_id"
                                            ></v-select>
                                        </template>
                                        </v-edit-dialog>
                                    </div> -->
                                </template>
                                <template v-slot:item.position="props">
                                  {{ props.item.role_information != null ? props.item.role_information.name : '' }}
                                    <!-- <div v-if="props.item.role_information != null">
                                        <v-edit-dialog
                                            :return-value.sync="props.item.role_information.name"
                                            @open="fetchRoleInformations()"
                                            @save="UpdateUserInformation(props.item.id, 'role_id', props.item.role_information.id, props.item)"
                                        >
                                        {{ props.item.role_information.name }}
                                        <template v-slot:input>
                                            <v-select
                                                v-if=$store.getters.valAccess(6)
                                                :items="role_information"
                                                v-model="props.item.role_information.id"
                                            ></v-select>
                                        </template>
                                        </v-edit-dialog>
                                    </div>
                                    <div v-else>
                                        <v-edit-dialog
                                            @open="fetchRoleInformations()"
                                            @save="UpdateUserInformation(props.item.id, 'role_id', props.item.role_id, props.item)"
                                        >
                                        {{ props.item.role_information != null ? props.item.role_information.name : '' }}
                                        <template v-slot:input>
                                            <v-select
                                                v-if=$store.getters.valAccess(6)
                                                :items="role_information"
                                                v-model="props.item.role_id"
                                            ></v-select>
                                        </template>
                                        </v-edit-dialog>
                                    </div> -->
                                </template> 

                                <template v-slot:item.branch="props">
                                  {{ props.item.branch_information != null ? props.item.branch_information.branch_name : ''}}
                                    <!-- <div v-if="props.item.branch_information != null">
                                        <v-edit-dialog
                                            :return-value.sync="props.item.branch_information.branch_name"
                                            @open="fetchBranchInformations()"
                                            @save="UpdateUserInformation(props.item.id, 'branch_id', props.item.branch_information.id, props.item)"
                                        >
                                        {{ props.item.branch_information.branch_name }}
                                        <template v-slot:input>
                                            <v-select
                                                v-if=$store.getters.valAccess(6)
                                                :items="branch_information"
                                                v-model="props.item.branch_information.id"
                                            ></v-select>
                                        </template>
                                        </v-edit-dialog>
                                    </div>
                                    <div v-else>
                                        <v-edit-dialog
                                            @open="fetchBranchInformations()"
                                            @save="UpdateUserInformation(props.item.id, 'branch_id', props.item.branch_id, props.item)"
                                        >
                                        {{ props.item.branch_information != null ? props.item.branch_information.branch_name : ''}}
                                        <template v-slot:input>
                                            <v-select
                                                v-if=$store.getters.valAccess(6)
                                                :items="branch_information"
                                                v-model="props.item.branch_id"
                                            ></v-select>
                                        </template>
                                        </v-edit-dialog>
                                    </div> -->
                                </template> 

                                <!-- <template v-slot:item.email="props">
                                    <v-edit-dialog
                                        :return-value.sync="props.item.email"
                                        @save="UpdatePersonalInformation(props.item.personal_information.id, 'email', props.item.email)"
                                    >
                                    {{ props.item.email }}
                                    <template v-slot:input>
                                        <v-text-field
                                            v-model="props.item.email"
                                            label="Edit"
                                            single-line
                                        ></v-text-field>
                                    </template>
                                    </v-edit-dialog>
                                </template> -->

                                <template v-slot:item.email_verified_at="props">
                                    <div class="text-center">
                                        <v-btn
                                            elevation="2"
                                            class="mx-2"
                                            dark
                                            small
                                            outlined
                                            color="orange"
                                        v-if="props.item.email_verified_at == null"
                                        @click="SendVerificationEmail(props.item.id)"
                                        >
                                            <v-icon extra small>
                                                mdi-email-fast
                                            </v-icon>
                                            Verify
                                        </v-btn>
                                    <!-- <v-icon
                                        medium
                                        v-if="props.item.email_verified_at == null"
                                        @click="SendVerificationEmail(props.item.id)"
                                    >
                                        mdi-email-fast
                                    </v-icon> -->
                                    <v-chip
                                        class="ma-2"
                                        outlined
                                        color="orange"
                                        v-else
                                    >
                                        Verified
                                    </v-chip>
                                    </div>
                                </template>


                              <template v-slot:item.action="props">
                                  <v-btn
                                    elevation="2"
                                        class="mx-2"
                                        dark
                                        outlined
                                        small
                                        color="orange"
                                        v-if=$store.getters.valAccess(6)
                                        @click="UpdateAllUser(props.item.id, props.item)"
                                    >
                                    <v-icon
                                            small
                                            @click="UpdateAllUser(props.item.id, props.item)"
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
              </v-card-text>
          </v-card>
      </v-col>

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
      </v-card>
    </v-dialog>
  </v-row>
</template>
    <!-- end edit confirmation dialog -->


<!-- edit personal confirmation dialog -->
    <template>
  <v-row justify="center">
    <v-dialog
      v-model="editpersonalconfirmation"
      persistent
      max-width="290"
    >
      <v-card>
        <v-card-title class="text-h5">
          Edit
        </v-card-title>
        <v-card-text>Are you sure you want to update?</v-card-text>
        <center>
          <v-btn
            elevation="2"
            class="mx-2"
            dark
            outlined
            small
            color="red"
            @click="changeStatusDialogEditPersonal(false)"
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
            @click="confirmUpdatePersonal()"
            >
            Confirm
          </v-btn>
        </center>
        <br>
        
        <!-- <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="changeStatusDialogEditPersonal(false)"
          >
            Cancel
          </v-btn>
          <v-btn
            color="green darken-1"
            text
            @click="confirmUpdatePersonal()"
          >
            Update
          </v-btn>
        </v-card-actions> -->
      </v-card>
    </v-dialog>
  </v-row>
</template>
    <!-- end edit personal confirmation dialog -->

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
            @click="SaveEmployeeInformation()"
            >
            Confirm
          </v-btn>
        </center>
        <br>
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
            @click="saveUser()"
          >
            Save
          </v-btn>
        </v-card-actions> -->
      </v-card>
    </v-dialog>
  </v-row>
</template>
    <!-- end save confirmation dialog -->


      <v-dialog
        v-model="dialog"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
      >
      <v-form
    ref="form"
    v-model="valid"
    lazy-validation
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
            <v-toolbar-title>Add User</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <!-- <v-btn
                dark
                text
                :disabled="!valid"
                @click="validate()"
                id="btn-next" class="btn btn-orange btn-sm p-2" style="font-size: 12px;"
                >
                Save
              </v-btn> -->
            </v-toolbar-items>
          </v-toolbar>
          <v-col sm="12" md="6" offset-md="3" class="mt-3 text-center"> 
              <h4>Note: Here, you can add a new user.</h4>
              <!-- <h4><i>Once you click save please check your email for email confirmation to complete password registration</i></h4> -->
          </v-col>
          <v-col sm="12" md="6" offset-md="3">  
              <v-text-field
                  color="orange"
                  v-model="firstname"
                 :rules="nameRules"
                  label="First name"
                  required
                  outlined
              ></v-text-field>
              </v-col>
              <!-- Add Here --> 
            <v-col sm="12" md="6" offset-md="3"> 
              <v-text-field
              color="orange"
                  v-model="middlename"
                  label="Middle name"
                  required
                  outlined
              ></v-text-field>
              </v-col>
              <!-- Add Here -->
              <v-col sm="12" md="6" offset-md="3"> 
              <v-text-field
              color="orange"
                  v-model="lastname"
                 :rules="nameRules"
                  label="Last Name"
                  required
                  outlined
              ></v-text-field>
              </v-col>
               <!-- Add Here --> 
                <v-col sm="12" md="6" offset-md="3"> 
                <v-text-field
                color="orange"
                    v-model="suffix"
                    label="Suffix"
                    required
                    outlined
                ></v-text-field>
                </v-col>
              <v-col sm="12" md="6" offset-md="3">
                    <v-menu
                    color="orange"
                        ref="menu"
                        v-model="menu"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        max-width="290px"
                        min-width="auto"
                    >      
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                            color="orange"
                                v-model="birth_date"
                                label="Birth Date"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                                outlined
                            ></v-text-field>
                        </template>
                        <v-date-picker
                        color="orange"
                            v-model="birth_date"
                            @input="menu = false"
                            :max="maxdate"
                        ></v-date-picker>
                    </v-menu>
              </v-col>
              <!-- Add Here -->
              <v-col sm="12" md="6" offset-md="3"> 
              <v-text-field
              color="orange"
                  v-model="mobile_number"
                    :counter="11"
                    :rules="[v => !!v || 'Mobile number is required',(mobile_number && mobile_number.length >= 11) || 'minimum 11 numbers']"
                    v-mask="'09#########'"
                  label="Mobile number"
                  required
                  outlined
              ></v-text-field>
              </v-col>
              <!-- Add Here -->
              <v-col sm="12" md="6" offset-md="3"> 
              <v-text-field
              color="orange"
                  v-model="email"
                  :rules="emailRules"
                  label="Email address"
                  required
                  outlined
              ></v-text-field>
              </v-col>
              <!-- Add Here -->
              <v-col sm="12" md="6" offset-md="3"> 
                <v-combobox
                color="orange"
                  label="Branch"
                  outlined
                  :items="branch_information"
                  v-model="branch_id"
                  :rules="[v => !!v || 'Branch Information is required']"
                  ></v-combobox>
              </v-col>
              <!-- Add Here -->
              <v-col sm="12" md="6" offset-md="3"> 
                <v-combobox
                color="orange"
                    outlined
                    label="Division"
                    :items="division_information"
                    v-model="division_id"
                  :rules="[v => !!v || 'Division Information is required']"
                  ></v-combobox>
              </v-col>
              <!-- Add Here -->
              <v-col sm="12" md="6" offset-md="3"> 
                <v-combobox
                color="orange"
                  label="Position"
                  outlined
                  :items="role_information"
                  v-model="role_id"
                  :rules="[v => !!v || 'Position Information is required']"
                  ></v-combobox>
              </v-col>
              <v-col sm="12" md="6" offset-md="3"> 
                <v-text-field
                    color="orange"
                    v-model="password"
                    label="Password"
                    required
                    outlined
                    :rules="[v => !!v || 'Password is required',password.length >= 6 || 'minimum 6 characters']"
                ></v-text-field>
              </v-col>
              <v-col sm="12" md="6" offset-md="3"> 
              <center>
                    <v-col sm="12" md="12">
                        <v-btn
                        color="orange"
                        block
                        outlined
                        @click="validate()"
                        :disabled="!valid"
                        id="btn-next" class="btn btn-success btn-sm p-2" style="font-size: 12px;"
                        >
                        Save
                      </v-btn>
                    </v-col>
                  </center>
                  </v-col>
        </v-card>
        </v-form>
      </v-dialog>


      <!-- Dialog Full Screen-->
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
                <v-btn icon dark @click="CloseDialogEditFullScreen(), clearAddUser()">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>Edit User</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                </v-toolbar-items>
            </v-toolbar>
            
            <v-col sm="12" md="6" offset-md="3" class="mt-3 text-center"> 
              <h4>Note: Here, you can edit a user.</h4>
          </v-col>
          <v-col sm="12" md="6" offset-md="3">  
              <v-text-field
                  color="orange"
                  v-model="firstname"
                 :rules="nameRules"
                  label="First name"
                  required
                  outlined
              ></v-text-field>
              </v-col>
              <!-- Add Here --> 
            <v-col sm="12" md="6" offset-md="3"> 
              <v-text-field
              color="orange"
                  v-model="middlename"
                  label="Middle name"
                  required
                  outlined
              ></v-text-field>
              </v-col>
              <!-- Add Here -->
              <v-col sm="12" md="6" offset-md="3"> 
              <v-text-field
              color="orange"
                  v-model="lastname"
                 :rules="nameRules"
                  label="Last Name"
                  required
                  outlined
              ></v-text-field>
              </v-col>
               <!-- Add Here --> 
                <v-col sm="12" md="6" offset-md="3"> 
                <v-text-field
                color="orange"
                    v-model="suffix"
                    label="Suffix"
                    required
                    outlined
                ></v-text-field>
                </v-col>
              <v-col sm="12" md="6" offset-md="3">
                    <v-menu
                    color="orange"
                        ref="menuss"
                        v-model="menuss"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        max-width="290px"
                        min-width="auto"
                    >      
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                            color="orange"
                                v-model="birth_date"
                                label="Birth Date"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                                outlined
                            ></v-text-field>
                        </template>
                        <v-date-picker
                        color="orange"
                            v-model="birth_date"
                            @input="menuss = false"
                            :max="maxdate"
                        ></v-date-picker>
                    </v-menu>
              </v-col>
              <!-- Add Here -->
              <v-col sm="12" md="6" offset-md="3"> 
              <v-text-field
              color="orange"
                  v-model="mobile_number"
                    :counter="11"
                    :rules="[v => !!v || 'Mobile number is required',(mobile_number && mobile_number.length >= 11) || 'minimum 11 numbers']"
                    v-mask="'09#########'"
                  label="Mobile number"
                  required
                  outlined
              ></v-text-field>
              </v-col>
              <!-- Add Here -->
              <v-col sm="12" md="6" offset-md="3"> 
              <v-text-field
              color="orange"
                  v-model="email"
                  :rules="emailRules"
                  label="Email address"
                  disabled
                  required
                  outlined
              ></v-text-field>
              </v-col>
              <!-- Add Here -->
              <v-col sm="12" md="6" offset-md="3"> 
                <v-combobox
                color="orange"
                  label="Branch"
                  outlined
                  :items="branch_information"
                  v-model="branch_id"
                  :rules="[v => !!v || 'Branch Information is required']"
                  ></v-combobox>
              </v-col>
              <!-- Add Here -->
              <v-col sm="12" md="6" offset-md="3"> 
                <v-combobox
                color="orange"
                    outlined
                    label="Division"
                    :items="division_information"
                    v-model="division_id"
                  :rules="[v => !!v || 'Division Information is required']"
                  ></v-combobox>
              </v-col>
              <!-- Add Here -->
              <v-col sm="12" md="6" offset-md="3"> 
                <v-combobox
                color="orange"
                  label="Position"
                  outlined
                  :items="role_information"
                  v-model="role_id"
                  :rules="[v => !!v || 'Position Information is required']"
                  ></v-combobox>
              </v-col>
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
            </v-form>
        </v-card>
    </v-dialog>
    </v-row>
  </v-container>
</template> 

<script>

  import divisionservices from '../services/divisionservices';
  import userservices from '../services/userservices';
  import roleservices from '../services/roleservices';
  import branchservices from '../services/branchservices';

  export default {
    name: 'Users',
    created(){
        this.FetchAllUser();
        this.fetchDivisionInformation();
        this.fetchRoleInformations();
        this.fetchBranchInformations();
        this.$store.state.snackbar.color = 'orange';
        this.headers = Object.values(this.headersMap);
        this.selectedHeaders = this.headers;
    },
    computed: {
      //Done to get the ordered headers
      showHeaders () {
        return this.headers.filter(s => this.selectedHeaders.includes(s));
      }
    },
    mounted(){
        this.$store.state.title = "Users";


        var selDate = new Date()
        var today = new Date(selDate+2*24*60*60*1000);
        var date = today.getDate()
        var month = today.getMonth()
        var year = today.getFullYear()
        this.maxdate = year+"-"+this.strPad((month+1))+"-"+this.strPad((date));    
    },
    data: () => ({
      menuss: false,
      editfullscreendialog: false,
        menucolumn: false,
        search:'',
        page: 1,
        pageCount: 0,
        listemployeedata: [],
        division_id: null,
        role_id: null,
        branch_id: null,
        division_information: [],
        role_information: [],
        branch_information: [],
        dialog: false,
        personal_information: {
            firstname: '',
            lastname: '',
            middlename: '',
            mobile_number: '',
            suffix: ''
        },
        // Account Information
        account_information: {
            email: '',
            password: '',
            facebook_id: '',
            google_id: '',
            is_parent: 1,
            division_id: 1,
            role_id: 1,
            branch_id: 1
        },
        headers:[],
        selectedHeaders: [],
        headersMap: [
          { text: 'Employee Id',sortable: true, value: 'user_other_personal_information.employee_id', width:'120px' },
          { text: 'First Name',sortable: true, value: 'firstname', width:'130px' },
          { text: 'Middle Name',sortable: true, value: 'middlename', width:'130px' },
          { text: 'Last Name',sortable: true, value: 'lastname', width:'130px' },
          { text: 'Mobile Number',sortable: false, value: 'mobile_number' },
          { text: 'Birth Date',sortable: false, value: 'birth_date' ,width: '110px'},
          { text: 'Status',sortable: false, value: 'flag' },
          { text: 'Division',sortable: false, value: 'division' },
          { text: 'Position', sortable: false,value: 'position' },
          { text: 'Branch',sortable: false, value: 'branch' },
          { text: 'Email Address',sortable: false, value: 'email' },
          { text: 'Email Verified', sortable: false, value: 'email_verified_at'},
          { text: 'Action', sortable: false, value: 'action'},
        ],
        // headers: [
        //   { text: 'First Name', value: 'personal_information.firstname' },
        //   { text: 'Middle Name', value: 'personal_information.middlename' },
        //   { text: 'Last Name', value: 'personal_information.lastname' },
        //   { text: 'Suffix', value: 'personal_information.suffix' },
        //   { text: 'Mobile Number', value: 'personal_information.mobile_number' },
        //   { text: 'Birth Date', value: 'personal_information.birth_date' },
        //   { text: 'Status', value: 'flag' },
        //   { text: 'Division', value: 'division_information.name' },
        //   { text: 'Role', value: 'role_information.name' },
        //   { text: 'Branch', value: 'branch_information.branch_name' },
        //   { text: 'Email Address', value: 'email' },
        //   { text: 'Email Verified', value: 'email_verified_at'},
        // ],
        users: [],
        firstname: '',
        lastname: '',
        middlename: '',
        mobile_number: '',
        password: '',
        email: '',
        suffix: '',
        birth_date: '',
        menu: false,
        edit_menu: false,
        maxdate: '',

        valid: true,
        nameRules: [
        v => !!v || 'This is a required field',
        // v => (v && v.length >= 2) || 'Name must be more than 1 characters',
        ],
        emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
        itemID: 0,
        saveconfirmation: false,
        editconfirmation: false,
        editpersonalconfirmation: false,
        foUpdate: {
            id: 0,
            name: '',
            value: ''
        },
        foUpdatePersonal: {
            id: 0,
            name: '',
            value: ''
        }

      }
    ),
    methods: {
        changeStatusDialogSave(status){
            this.saveconfirmation = status;
        },
        changeStatusDialogEdit(status){
            this.editconfirmation = status;
            //this.FetchUser();
            this.FetchAllUser();
        },
        changeStatusDialogEditPersonal(status){
            this.editpersonalconfirmation = status;
            //this.FetchUser();
            this.FetchAllUser();
        },
        strPad(str){
        return (str).toString().padStart(2,'0')
        },
        filter: function(evt) {
        evt = (evt) ? evt : window.event;
        let expect = evt.target.value.toString() + evt.key.toString();
        
        if (!/^[-+]?[0-9]*\.?[0-9]*$/.test(expect)) {
            evt.preventDefault();
        } else {
            return true;
        }
        },
       FetchUser(){

            let payload = {
                user_id: this.$store.getters.getParentID
            };

            userservices.fetchUserInformation(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    this.users = response.data.result;
                }
            }).catch(error => console.log(error));

        },
        NewUser(){
            if(this.$store.getters.valAccess(5)){
                this.clearAddUser();
                // this.fetchDivisionInformation();
                // this.fetchRoleInformations();
                // this.fetchBranchInformations();
                this.division_id = null;
                this.dialog = true;
            }
            else{
                this.$store.state.snackbar.message = "You don't have a access here please contact yung system administrator.";
                this.$store.state.snackbar.show = true;
                    this.$store.state.snackbar.colors = 'xred';
                      this.$store.state.snackbar.icon = "mdi-alert-outline";                
            }
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
        saveUser(){
          let loader = this.$loading.show();

          let payload = {
            personal_information: JSON.stringify({
              firstname: this.firstname,
              middlename: this.middlename,
              lastname: this.lastname,
              mobile_number: this.mobile_number,
              birth_date: this.birth_date
            }),
            account_information: JSON.stringify({
              email: this.email,
              is_parent: 0,
              parent_id: this.$store.getters.fetchUserInfo.account_information.id,
              division_id: this.division_id.value,
              role_id: this.role_id.value,
              branch_id: this.branch_id.value,
              flag: 1,
            }),
          };

        
            // let payload = {
            //     personal_information: JSON.stringify(this.personal_information),
            //     account_information: JSON.stringify(this.account_information)
            // }

          userservices.saveUserInformation(payload, this.$store.getters.getAccessToken).then(response =>{
            if(response.data.success){
                loader.hide();
                this.FetchAllUser();
                this.$store.state.snackbar.message = response.data.message;
                this.$store.state.snackbar.show = true;
                this.dialog = false;
                this.$store.state.snackbar.colors = 'xgreen';
                    this.$store.state.snackbar.icon = "mdi-check-circle-outline";                     
            }
            else{
                this.$store.state.snackbar.message = response.data.message;
                this.$store.state.snackbar.show = true;
                    this.$store.state.snackbar.colors = 'xred';
                      this.$store.state.snackbar.icon = "mdi-alert-outline";                         
            }
          }).catch(error => console.log(error));

          this.saveconfirmation = false;

        },
        fetchDivisionInformation(){

            this.division_information = [];

            let payload = {
                user_id: this.$store.getters.getParentID
            };

            divisionservices.fetchDivisionInformation(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    response.data.result.forEach((value) => {
                        this.division_information.push({
                            text: value.name,
                            value: value.id
                        });
                    });
                }
                else{
                    console.log(response.data.message);
                }
            }).catch(error => console.log(error));

        },
        fetchRoleInformations(){

            let payload = {
                user_id: this.$store.getters.getParentID
            };

            roleservices.fetchRoleInformation(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    response.data.result.forEach((value) => {
                        this.role_information.push({
                            text: value.name,
                            value: value.id
                        });
                    });
                }
                else{
                    console.log(response.data.message);
                }
            }).catch(error => console.log(error));

        },
        fetchBranchInformations(){

            let payload = {
                user_id: this.$store.getters.getParentID
            };

            branchservices.fetchBranchInformation(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    // console.log(response.data.result);
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
        clearAddUser(){
            this.firstname = '';
            this.middlename = '';
            this.lastname = '';
            this.mobile_number = '';
            this.email = '';
            this.role_id = null;
            this.branch_id = null;
            this.division_id = null;
            this.birth_date = this.$dayjs().format('YYYY-MM-DD');
        },
        SendVerificationEmail(id){

            if(this.$store.getters.valAccess(7)){
                let loader = this.$loading.show();

                let payload = {
                    id: id
                };

                userservices.sendUserEmailVerification(payload, this.$store.getters.getAccessToken).then(response => {
                    if(response.data.success){
                        loader.hide();
                        this.$store.state.snackbar.message = response.data.message;
                        this.$store.state.snackbar.show = true;
                        this.$store.state.snackbar.colors = 'xgreen';
                    this.$store.state.snackbar.icon = "mdi-check-circle-outline";                           
                    }
                    else{
                        this.$store.state.snackbar.message = response.data.message;
                        this.$store.state.snackbar.show = true;
                    this.$store.state.snackbar.colors = 'xred';
                      this.$store.state.snackbar.icon = "mdi-alert-outline";                      
                  }                    
                }).catch(error => console.log(error));
            }
            else{
                this.$store.state.snackbar.message = "You don't have a access here please contact yung system administrator.";
                this.$store.state.snackbar.show = true;
                    this.$store.state.snackbar.colors = 'xred';
                      this.$store.state.snackbar.icon = "mdi-alert-outline";                                      
            }

        },
        confirmUpdatePersonal(){
            let payload = {
                id: this.foUpdatePersonal['id'],
                name: this.foUpdatePersonal['name'],
                value: this.foUpdatePersonal['value']
            };

            userservices.updatePersonalInformation(payload, this.$store.getters.getAccessToken).catch(error => console.log(error));
            this.$store.state.snackbar.message = 'User information has been updated.';
            this.$store.state.snackbar.show = true;
            // //this.FetchUser();
            this.FetchAllUser();
            this.editpersonalconfirmation = false
            this.$store.state.snackbar.colors = 'xgreen';
                    this.$store.state.snackbar.icon = "mdi-check-circle-outline";   

        },
        UpdatePersonalInformation(id, name, value){
            this.foUpdatePersonal = {
                id: id,
                name: name,
                value: value
            }
            // console.log(this.foUpdatePersonal);
            this.editpersonalconfirmation = true
        },
        confirmUpdate(){
            let payload = {
                user_personal_info : {
                firstname: this.firstname,
                lastname: this.lastname,
                middlename: this.middlename,
                sufix : this.suffix,
                mobile_number: this.mobile_number,
                birth_date: this.birth_date,
              },
              user_info : {
                role_id: this.role_id.value,
                division_id: this.division_id.value,
                branch_id: this.branch_id.value,
              },
              id : this.forAllUpdate.id,
              parent_id: this.$store.getters.getParentID,
                // flag: 1
            };
            // let payload = {
            //     id: this.foUpdate['id'],
            //     name: this.foUpdate['name'],
            //     value: this.foUpdate['value']
            // };
            userservices.UpdateAllEmployeeInformation(payload, this.$store.getters.getAccessToken).catch(error => console.log(error));
            // if(name=="division_id"){
            //     this.FetchDivisionInformationViaID(this.itemID['item']);
            // }
            // else if(name=="role_id"){
            //     this.FetchRoleInformationViaID(this.itemID['item']);
            // }
            // else if(name=="branch_id"){
            //     this.FetchBranchInformationViaID(this.itemID['item']);
            // }
            // else{
            //    console.log("HERE"); 
            // }

            this.$store.state.snackbar.message = 'User information has been updated.';
            this.$store.state.snackbar.show = true;
            //this.FetchUser();
            this.FetchAllUser();
            this.editfullscreendialog = false
            this.editconfirmation = false
            this.$store.state.snackbar.colors = 'xgreen';
                    this.$store.state.snackbar.icon = "mdi-check-circle-outline";               
        },

        UpdateUserInformation(id, name, value, item){
            this.foUpdate = {
                id: id,
                name: name,
                value: value
            }
            // console.log(id, name, value, item)
            this.itemID = item
            this.editconfirmation = true

        },
        FetchDivisionInformationViaID(item){

            let payload = {
                id: item.division_information.id
            };

            divisionservices.fetchDivisionInformationViaID(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    item.division_information.name = response.data.result.name;
                }
                else{
                    console.log(response.data.message);
                }
            }).catch(error => console.log(error));

        },
        FetchRoleInformationViaID(item){

            let payload = {
                id: item.role_information.id
            };

            roleservices.fetchRoleInformationViaID(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    item.role_information.name = response.data.result.name;
                }
                else{
                    console.log(response.data.message);
                }
            }).catch(error => console.log(error));

        },
        FetchBranchInformationViaID(item){

            let payload = {
                id: item.branch_information.id
            };

            branchservices.fetchBranchInformationViaID(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    item.branch_information.branch_name = response.data.result.branch_name;
                    // console.log(response.data.result.branch_name)
                }
                else{
                    console.log(response.data.message);
                }
            }).catch(error => console.log(error));

        },
        FetchAllUser(){
            let payload = {
                parent_id: this.$store.getters.getParentID
            };
            userservices.FetchAllUser(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    this.listemployeedata = response.data.data;
                    console.log(this.listemployeedata);
                }
            }).catch(error => console.log(error));
        },
        SaveEmployeeInformation(){
            let loader = this.$loading.show();
            // console.log(this.division_id)
            // console.log(this.role_id)
            // console.log(this.branch_id)
            let payload = {
                firstname: this.firstname,
                middlename: this.middlename,
                lastname: this.lastname,
                suffix : this.suffix,
                mobile_number: this.mobile_number,
                birth_date: this.birth_date,
                email: this.email,
                is_parent: 0,
                parent_id: this.$store.getters.getParentID,
                division_id: this.division_id.value,
                role_id: this.role_id.value,
                branch_id: this.branch_id.value,
                flag: 1,
                password: this.password,
                forposinventory : 1,
            };
            console.log(payload);
            userservices.SaveEmployeeInformation(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    loader.hide();
                    this.$store.state.snackbar.message = 'Employees have been created.';
                    this.$store.state.snackbar.show = true;
                    this.clearAddUser();
                    this.listempdialog = false
                    this.dialog = false;
                    this.FetchAllUser();
                    this.$refs.form.resetValidation();
                    this.$store.state.snackbar.colors = 'xgreen';
                    this.$store.state.snackbar.icon = "mdi-check-circle-outline";   
                }else{
                    this.$store.state.snackbar.colors = 'xred';
                      this.$store.state.snackbar.icon = "mdi-alert-outline";                      
                  } 
            }).catch(error =>{ 
                loader.hide();
                this.allerror = error.response.data.errors
                console.log(error.response.data);
                this.$store.state.snackbar.message = error.response.data.message
                this.$store.state.snackbar.show = true;
            });

            this.saveconfirmation = false;

        },
        UpdateAllUser(id, item){
            // console.log(id, item)
            this.firstname = item.personal_information.firstname
            this.middlename = item.personal_information.middlename
            this.lastname = item.personal_information.lastname
            this.suffix = item.personal_information.sufix
            this.birth_date = item.personal_information.birth_date
            this.mobile_number = item.personal_information.mobile_number
            this.email = item.email
            this.branch_id = {
                            text: item.branch_information.branch_name,
                            value: item.branch_information.id
                            }
            this.division_id = {
                            text: item.division_information.name,
                            value: item.division_information.id
                            }
            this.role_id ={
                            text: item.role_information.name,
                            value: item.role_information.id
                            }
            this.forAllUpdate = {
                id: id,
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
