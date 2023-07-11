<template>
  <v-container style="max-width: 95%; position: relative;" >
      <v-row>
        <v-col cols="12">
          <v-card
          :loading="loading"
          >
            <v-card-text>
              <!-- One liner filtering -->
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
                  &nbsp;
                  <template v-if="$vuetify.breakpoint.mdAndUp">
                    <v-btn
                    medium
                    dark
                      color="orange"
                      elevation="2"
                      @click="NewAnnouncement()" 
                      v-if="$store.getters.valAccess(93)"
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
                      @click="NewAnnouncement()" 
                      v-if="$store.getters.valAccess(93)"
                    >
                      <v-icon>mdi-plus</v-icon>
                    </v-btn>
                  </template>
                </v-toolbar>
              </template>
              <!-- One liner filtering -->
              <br>
              <!-- Data table for announcement -->
              <v-data-table
                :headers="showHeaders"
                :search="search"
                :items="announcementdata"
                :page.sync="page"
                @page-count="pageCount = $event"
                :footer-props="{
                showFirstLastPage: false,
                'items-per-page-options':[10],
                'disable-items-per-page': true
                }" 
                >

                <template v-slot:item.start_time="props">
                    {{ props.item.start_time != null ? moment(props.item.start_time, 'hh:mm A').format('hh:mm A') : '' }} 
                </template>

                <template v-slot:item.end_time="props" v-show="date">
                  {{ props.item.end_time != null ? moment(props.item.end_time, 'hh:mm A').format('hh:mm A') : '' }} 
                </template>

                <template v-slot:item.is_active="props" align="center">
                    <template>
                        <v-switch 
                            v-model="props.item.is_active"
                            color="orange"
                            readonly
                            v-if="props.item.is_active == 1"
                            @change="UpdateAnnouncement(props.item.id, props.item.description, props.item.is_active, props.item.created_by)"
                        ></v-switch>
                        <v-switch
                            v-model="props.item.is_active"
                            color="orange"
                            readonly
                            v-else
                            @change="UpdateAnnouncement(props.item.id, props.item.description, props.item.is_active, props.item.created_by)"
                        ></v-switch>
                    </template>
                </template>

                <template v-slot:item.image="props">
                    <v-img :src="image_path+props.item.image" height="100px" width="100px"></v-img>
                </template>

                <template v-slot:item.created_by="props">
                    {{ props.item.created_info != null ? props.item.created_info.personal_information.lastname + ' , ' + props.item.created_info.personal_information.firstname : 'No Data' }}
                </template>

                <template v-slot:item.action="props">
                    <v-row>
                      <v-btn
                        elevation="2"
                            class="mx-2"
                            dark
                            outlined
                            small
                            color="orange"
                            v-if="$store.getters.valAccess(90)"
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
                      
                        <template v-if="$vuetify.breakpoint.smAndDown">
                            <br>&nbsp;
                        </template>      
                        <v-btn
                        elevation="2"
                            class="mx-2"
                            dark
                            outlined
                            small
                            color="red"
                            v-if="$store.getters.valAccess(91)"
                            @click="DeleteAnnouncement(props.item.id, props.item.name)"
                        >
                        <v-icon
                                small
                                @click="DeleteAnnouncement(props.item.id, props.item.name)"
                            >
                                mdi-delete
                            </v-icon>
                            Delete
                        </v-btn>
                    </v-row>
                </template>
              </v-data-table>
              <!-- Data table for announcement -->
              <v-pagination
                color="orange"
                v-model="page"
                :length="pageCount"
              ></v-pagination>                
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

    <!-- dialog save form -->
    <v-dialog
    fullscreen
    v-model="fullscreendialog"
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
              <v-btn icon dark @click="CloseDialogFullScreen(), ClearAnnouncement()">
                  <v-icon>mdi-close</v-icon>
              </v-btn>
              <v-toolbar-title>Add Announcement</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-toolbar-items>
              </v-toolbar-items>
          </v-toolbar>
          
          <v-col sm="12" md="6" offset-md="3" class="mt-3 text-center"> 
              <h4>Note: Here you can create announcement</h4>
          </v-col>

          <v-col sm="12" md="6" offset-md="3"> 
              <center>
                  <v-img :src="url"></v-img>
              </center>
              <v-file-input 
                  accept="image/*"
                  label="Upload Image"
                  prepend-icon="mdi-camera"
                  color="orange"
                  @change="Preview_image()"
                  :rules="[v => !!v || 'Image is required']"
                  v-model="annoucement_image">
              </v-file-input>
          </v-col>

          <v-col sm="12" md="6" offset-md="3"> 
              <v-text-field
                  outlined
                  v-model="announcement.title"
                  counter
                  label="Title"
                  color="orange"
                  :rules="[v => !!v || 'Title is required', announcement.title.length <= 20 || 'maximum 20 characters']"
              ></v-text-field>
          </v-col>

          <v-col sm="12" md="6" offset-md="3">
            <v-menu
            ref="menutargetdates"
            v-model="menutargetdates"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="auto"
            >
                <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                    v-model="announcement.date"
                    label="Date"
                    persistent-hint
                    prepend-icon="mdi-calendar"
                    color="orange"
                    v-bind="attrs"
                    v-on="on"
                    :rules="[v => !!v || 'Date is required']"
                    readonly
                    ></v-text-field>
                </template>
                <v-date-picker
                    v-model="announcement.date"
                    color="orange"
                    @input="menutargetdates = false"
                ></v-date-picker>
            </v-menu>
          </v-col> 
          <v-col sm="12" md="6" offset-md="3">
            <v-row>
                <v-col>
                    <v-text-field
                    v-model="announcement.start_time"
                    color="orange"
                    pattern="^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$"
                    type="time"
                    label="Start Time"
                    @input="AMPMTO('start_time')"
                    >
                    </v-text-field>
                </v-col>
                <v-col>
                    <v-text-field
                    v-model="announcement.end_time"
                    color="orange"
                    pattern="^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$"
                    type="time"
                    label="End Time"
                    @input="AMPMTO('end_time')">
                    </v-text-field>
                </v-col>
            </v-row>
          </v-col>

          <v-col sm="12" md="6" offset-md="3"> 
              <v-textarea
                  v-model="announcement.description"
                  label="Description"
                  clearable
                  counter
                  required
                  color="orange"
                  outlined
                  :rules="[v => !!v || 'Description is required']"
              ></v-textarea>
          </v-col>
          <center>
            <v-col sm="12" md="6">
                <v-btn
                color="orange"
                block
                outlined
                @click="valid == false ? validationfalse() : changeStatusDialogSave(true)"
                >
                Save
              </v-btn>
            </v-col>
          </center>
        </v-form>
      </v-card>
    </v-dialog>
    <!-- dialog save form -->


    <!-- dialog edit form -->
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
              <v-btn icon dark @click="CloseDialogEditFullScreen(), ClearAnnouncement()">
                  <v-icon>mdi-close</v-icon>
              </v-btn>
              <v-toolbar-title>Edit Announcement</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-toolbar-items>
              </v-toolbar-items>
          </v-toolbar>
          
          <v-col sm="12" md="6" offset-md="3" class="mt-3 text-center"> 
              <h4>Note: Here you can edit announcement</h4>
          </v-col>

          <v-col sm="12" md="6" offset-md="3"> 
              <center>
                  <v-img v-if="imagechange==1" :src="url"></v-img>
                  <v-img v-else :src="this.image_path+annoucement_image"></v-img>
              </center>
              <v-file-input 
                  accept="image/*"
                  label="Upload Image"
                  prepend-icon="mdi-camera"
                  color="orange"
                  :rules="[v => !!v || 'Image is required']"
                  @change="Preview_image_update()"
                  v-model="annoucement_image">
              </v-file-input>
          </v-col>


          <v-col sm="12" md="6" offset-md="3">
              <v-switch
                  v-model="announcement.is_active"
                  inset
                  :label="activeinactive"
                  color="orange"
                  @change="activeinactivetrigger()"
              ></v-switch>
          </v-col>

          <v-col sm="12" md="6" offset-md="3"> 
              <v-text-field
                  outlined
                  v-model="announcement.title"
                  label="Title"
                  color="orange"
                  counter
                  :rules="[v => !!v || 'Title is required', announcement.title.length <= 20 || 'maximum 20 characters']"
              ></v-text-field>
          </v-col>

          <v-col sm="12" md="6" offset-md="3">
            <v-menu
            ref="menutargetdate"
            v-model="menutargetdate"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="auto"
            >
                <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                    v-model="announcement.date"
                    label="Date"
                    persistent-hint
                    prepend-icon="mdi-calendar"
                    color="orange"
                    v-bind="attrs"
                    v-on="on"
                    :rules="[v => !!v || 'Date is required']"
                    readonly
                    ></v-text-field>
                </template>
                <v-date-picker
                    v-model="announcement.date"
                    color="orange"
                    @input="menutargetdate = false"
                ></v-date-picker>
            </v-menu>
          </v-col> 
          <v-col sm="12" md="6" offset-md="3">
            <v-row>
                <v-col>
                    <v-text-field
                    v-model="announcement.start_time"
                    color="orange"
                    pattern="^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$"
                    type="time"
                    label="Start Time"
                    @input="AMPMTO('start_time')"
                    >
                    </v-text-field>
                </v-col>
                <v-col>
                    <v-text-field
                    v-model="announcement.end_time"
                    color="orange"
                    pattern="^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$"
                    type="time"
                    label="End Time"
                    @input="AMPMTO('end_time')">
                    </v-text-field>
                </v-col>
            </v-row>
          </v-col>

          <v-col sm="12" md="6" offset-md="3"> 
              <v-textarea
                  v-model="announcement.description"
                  label="Description"
                  clearable
                  counter
                  required
                  color="orange"
                  outlined
                  :rules="[v => !!v || 'Description is required']"
              ></v-textarea>
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
    <!-- dialog edit form -->

    <!-- dialog edit confirmation -->
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
        </v-card>
      </v-dialog>
    </v-row>
    <!-- dialog edit confirmation -->

    <!-- dialog upload image -->
    <v-row justify="center">
      <v-dialog
        v-model="uploadimageconfirmation"
        persistent
        max-width="290"
      >
        <v-card>
          <v-card-title class="text-h5">

          </v-card-title>
          <v-card-text>Upload image</v-card-text>
            <v-card-text>
              <v-img :src="this.url"></v-img>
              <v-file-input 
                  accept="image/*"
                  label="Upload Image"
                  prepend-icon="mdi-camera"
                  @change="Preview_image()"
                  v-model="annoucement_image">
              </v-file-input>
          </v-card-text>
          <center>
            <v-btn
              elevation="2"
              class="mx-2"
              dark
              outlined
              small
              color="red"
              @click="changeStatusDialogUploadImageAnnouncement(false)"
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
              @click="AddImageAnnouncementInformation()"
              >
              Confirm
            </v-btn>
          </center>
          <br>    
        </v-card>
      </v-dialog>
    </v-row>
    <!-- dialog upload image -->
    
    <!-- dialog edit confirmation -->
    <v-row justify="center">
      <v-dialog
        v-model="editconfirmation"
        persistent
        max-width="290"
      >
        <v-card>
          <v-form
              ref="form"
              v-model="valid"
              lazy-validation
          >
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
            </v-form>
        </v-card>
      </v-dialog>
    </v-row>
    <!-- dialog edit confirmation -->

    <!-- dialog save confirmation -->
    <v-row justify="center">
      <v-dialog
          persistent :retain-focus="false"
          v-model="saveconfirmation"
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
                  @click="SaveAnnouncement()"
                  >
                  Confirm
              </v-btn>
            </center>
            <br>  
        </v-card>
      </v-dialog>
    </v-row>
    <!-- dialog save confirmation -->
    
    <!-- dialog delete confirmation -->
    <template>
      <v-row justify="center">
        <v-dialog
        v-model="deleteconfirmation"
        persistent
        max-width="290"
        >
          <v-card>
              <v-card-title class="text-h5">
              Delete
              </v-card-title>
              <v-card-text>Are you sure you want to delete {{ fordeletename }}?</v-card-text>
              <center>
              <v-btn
                  elevation="2"
                  class="mx-2"
                  dark
                  outlined
                  small
                  color="red"
                  @click="changeStatusDialogDelete(false)"
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
    <!-- dialog delete confirmation -->
  </v-container>  
</template>
  
<script>
  import announcementservices from '../services/announcementservices';

    export default {
      name: 'Announcement',
      data: () => ({
        menutargetdates: false,
        menutargetdate: false,
        menucolumn: false,
        exportimport: [{ text: 'Upload', icon: 'mdi-upload-outline', linktrigger: 1 },
          { text: 'Download', icon: 'mdi-download-outline', linktrigger: 2 }],
        fordeletename: '',
        deleteconfirmation: false,
            valid:false,
          loading: false,
          search: '',
          pageCount: 0,
          page: 1,
          editfullscreendialog: false,
          activeinactive: '',
          saveconfirmation: false,
          announcementdata: [],
          restdaydata: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          editconfirmation: false,
          fullscreendialog: false,
          menustarttime: false,
          menuendtime: false,
          selected_restdayedit: '',
          headers:[],
        selectedHeaders: [],
        headersMap: [
            { text: 'Image',sortable: false, value: 'image' },
            { text: 'Title',sortable: true, value: 'title' },
            { text: 'Description',sortable: false, value: 'description' },
            { text: 'Date',sortable: true, value: 'date', width : '110px' },
            { text: 'Start time',sortable: false, value: 'start_time', width : '100px' },
            { text: 'End time',sortable: false, value: 'end_time', width : '100px' },
            { text: 'Status',sortable: false, value: 'is_active' },
            { text: 'Created By',sortable: false, value: 'created_by' },
            { text: 'Action',sortable: false, value: 'action' },
          ],
          announcement: {
              is_active: '',
              description: '',
              title: '',
              date: '',
              start_time: '',
              end_time: ''
          },
          announcementampm:{
                ampmstart_time: '',
                ampmend_time: '',
          },
          announcementrestdaycombo: {
            rest_daycombo: ''
          },
          annoucement_image: null,
          annoucement_id: 0,
          image_path: [],
          uploadimageconfirmation: false,
          url: "",
          imagechange: 0,
      }),
      created(){
          this.$store.state.header = false;
          this.$store.state.footer = false;
          this.$store.state.snackbar.color = 'orange';
          this.FetchAllAnnouncement();
          this.headers = Object.values(this.headersMap);
        this.selectedHeaders = this.headers;          
      },
      mounted(){
          this.$store.state.title = "Announcement";
      },
      computed: {
      //Done to get the ordered headers
      showHeaders () {
        return this.headers.filter(s => this.selectedHeaders.includes(s));
      }
    },
      methods: {
        FetchAllAnnouncement(){ // fetch annoucement
            let payload = {
                parent_id: this.$store.getters.getParentID
            };
            announcementservices.FetchAllAnnouncement(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    console.log(response.data.data);
                    this.announcementdata = response.data.data;
                    this.image_path = response.data.image_path;
                }
            }).catch(error => console.log(error));
        },
        UpdateAnnouncement(id, description, is_active, created_by){ // fetch info for update announcement
            if(is_active == true){
                is_active = 1
            }else{
                is_active = 0
            }
            this.forUpdate = {
                id: id,
                description: description,
                is_active: is_active,
                created_by: created_by
            }
        },
        changeStatusDialogEdit(status){
            this.editconfirmation = status;
            this.FetchAllAnnouncement();
        },
        confirmUpdate(){ // update announcement
            let val = this.$refs.form.validate();

            this.valid = true;

            if(val){
                if(this.announcement.is_active == true){
                    this.announcement.is_active = 1
                }else{
                    this.announcement.is_active = 0
                }
                const formData = new FormData();
                formData.append('id', this.forAllUpdate.id);
                formData.append('file', this.annoucement_image);
                formData.append('parent_user_id', this.$store.getters.getParentID)
                formData.append('description', this.announcement.description)
                formData.append('is_active', this.announcement.is_active)
                formData.append('created_by', this.forAllUpdate.created_by)

                formData.append('title', this.announcement.title)
                formData.append('date', this.announcement.date)
                formData.append('start_time', this.announcement.start_time)
                formData.append('end_time', this.announcement.end_time)

                console.log(formData);

                announcementservices.UpdateAnnouncement(formData, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    this.$store.state.snackbar.message = 'Announcement has been updated.';
                    this.$store.state.snackbar.show = true;
                    this.ClearAnnouncement();
                    this.editfullscreendialog = false
                    this.$refs.form.resetValidation();
                    this.$store.state.snackbar.colors = 'xgreen';
                    this.$store.state.snackbar.icon = "mdi-check-circle-outline";                      
                }else{
                    this.$store.state.snackbar.colors = 'xred';
                      this.$store.state.snackbar.icon = "mdi-alert-outline";                                          
                }
                    }).catch(error =>{
                    this.$store.state.snackbar.message = error.response.data.message;
                    this.$store.state.snackbar.show = true;
                    this.$store.state.snackbar.colors = 'xred';
                      this.$store.state.snackbar.icon = "mdi-alert-outline";                                                              
                });
            }
            this.FetchAllAnnouncement();
            this.editconfirmation = false
        },
        NewAnnouncement(){
            this.fullscreendialog = true
        },
        CloseDialogFullScreen(){
            this.fullscreendialog = false
        },
        CloseDialogEditFullScreen(){
            this.editfullscreendialog = false
        },
        AMPMTO(field){ // convertion of military time to AM : PM format
            var datenow = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)
            if(field == 'start_time')
            {
                var StartTime = this.announcement.start_time.split(':');
                var date1 = new Date(datenow[0],(datenow[1]-1),datenow[2],StartTime[0],StartTime[1],0,0);
                this.announcementampm.ampmstart_time = date1.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
            }else
            {
                var EndTime = this.announcement.end_time.split(':');
                var date2 = new Date(datenow[0],(datenow[1]-1),datenow[2],EndTime[0],EndTime[1],0,0);
                this.announcementampm.ampmend_time = date2.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
            }
        },
        SaveAnnouncement(){ // Save announcement
            let val = this.$refs.form.validate();

            this.valid = true;

            if(val){
                this.announcement.is_active = 1;
                const formData = new FormData();
                formData.append('file', this.annoucement_image);
                formData.append('parent_user_id', this.$store.getters.getParentID)
                formData.append('description', this.announcement.description)
                formData.append('is_active', this.announcement.is_active)
                formData.append('created_by', this.$store.getters.getUserID)

                formData.append('title', this.announcement.title)
                formData.append('date', this.announcement.date)
                formData.append('start_time', this.announcement.start_time)
                formData.append('end_time', this.announcement.end_time)
                announcementservices.SaveAnnouncement(formData, this.$store.getters.getAccessToken).then(response => {
                    if(response.data.success){
                        this.fullscreendialog = false;
                        this.$store.state.snackbar.message = 'Announcement has been created.';
                        this.$store.state.snackbar.show = true;
                        this.FetchAllAnnouncement();
                        this.ClearAnnouncement();
                        this.$refs.form.resetValidation();
                        this.$store.state.snackbar.colors = 'xgreen';
                    this.$store.state.snackbar.icon = "mdi-check-circle-outline";                      
                }else{
                    this.$store.state.snackbar.colors = 'xred';
                      this.$store.state.snackbar.icon = "mdi-alert-outline";                                          
                }
                }).catch(error =>{ 
                    console.log(error.response.data.message)
                    this.$store.state.snackbar.message = error.response.data.message;
                    this.$store.state.snackbar.show = true;
                    this.$store.state.snackbar.colors = 'xred';
                      this.$store.state.snackbar.icon = "mdi-alert-outline";                                                              
                });
            }
            this.saveconfirmation = false
        }, 
        ClearAnnouncement(){
            this.announcement['description'] = ''
            this.announcement['title'] = ''
            this.announcement['date'] = ''
            this.announcement['start_time'] = ''
            this.announcement['end_time'] = ''
            this.annoucement_image = null
            this.url = null
        },
        UpdateAllAnnouncement(id, item){ // fetch info for update announcement
            console.log(id, item)
            this.annoucement_image = item.image
            this.announcement.description = item.description
            this.announcement.is_active = item.is_active
            
            this.announcement.date = item.date
            this.announcement.title = item.title
            this.announcement.start_time = item.start_time
            this.announcement.end_time = item.end_time

            this.activeinactivetrigger()
            this.forAllUpdate = {
                id: id,
                created_by: item.created_by
            }
            this.editfullscreendialog = true
        },
        uploadImage(id){ // upload image
            this.annoucement_image = null;
            this.url = null;
            this.annoucement_id = id
            this.uploadimageconfirmation = true
        },
        changeStatusDialogUploadImageAnnouncement(status){
            this.uploadimageconfirmation = status
        },
        Preview_image() { // preview image
          if(!this.annoucement_image){
            this.url=null;
            return;
          } 
          this.url= URL.createObjectURL(this.annoucement_image);
        },
        Preview_image_update() // preview update image
        {
            this.imagechange = 1
          this.url = URL.createObjectURL(this.annoucement_image);
        },
        AddImageAnnouncementInformation(){ // add image
            const formData = new FormData();
            formData.append('file', this.annoucement_image);
            formData.append('id', this.annoucement_id)

            announcementservices.UpdateAnnoucementImage(formData, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    this.FetchAllAnnouncement();
                    this.uploadimageconfirmation = false;
                    this.$store.state.snackbar.message = response.data.message;
                    this.$store.state.snackbar.show = true;
                    this.$store.state.snackbar.colors = 'xgreen';
                    this.$store.state.snackbar.icon = "mdi-check-circle-outline";                      
                }else{
                    this.$store.state.snackbar.colors = 'xred';
                    this.$store.state.snackbar.icon = "mdi-alert-outline";                                          
                }
            }).catch(error => console.log(error));
        },
        changeStatusDialogSave(status){
            this.saveconfirmation = status;
        },
        activeinactivetrigger(){
            if(this.announcement.is_active ==1){
                this.activeinactive = 'Active'
            }else{
                this.activeinactive = 'Inactive'
            }
        },
        validationfalse(){
            this.$refs.form.validate()
        },
        DeleteAnnouncement(id, name){
            this.fordeletename = name
            this.forDelete = {
                id: id
            }
            this.deleteconfirmation = true;
        },
        confirmDelete(){ // delete announcement
            let payload = {
                id: this.forDelete['id']
            }
            console.log(payload);
            announcementservices.DeleteAnnouncement(payload, this.$store.getters.getAccessToken).catch(error =>{
                this.$store.state.snackbar.message = error.response.data.message;
                this.$store.state.snackbar.show = true;
                    this.$store.state.snackbar.colors = 'xred';
                      this.$store.state.snackbar.icon = "mdi-alert-outline";                                                          
            });

            this.$store.state.snackbar.message = 'Announcement has been deleted.';
            this.$store.state.snackbar.show = true;
            this.deleteconfirmation = false;
            this.$store.state.snackbar.colors = 'xgreen';
                    this.$store.state.snackbar.icon = "mdi-check-circle-outline";                                  
            this.FetchAllAnnouncement();
        },
        changeStatusDialogDelete(status){
            this.deleteconfirmation = status;
        },
      }
    }
</script>
  
<style scoped>
  input[type=checkbox] {
  accent-color: orange;
  }
</style>