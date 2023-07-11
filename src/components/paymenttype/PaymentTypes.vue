<template>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-card>
              <v-card-text>
                  <div class="text-right">
                      <!-- <v-btn
                      elevation="2"
                          class="mx-2"
                          dark
                          small
                          color="indigo"
                          @click="NewPaymenttype()"
                      >
                          <v-icon dark>
                              mdi-plus
                          </v-icon>
                          Payment Type
                      </v-btn> -->
                      <v-btn
                      elevation="2"
                          class="mx-2"
                          dark
                          small
                          color="indigo"
                          @click="NewPaymentSubtype()"
                      >
                          <v-icon dark>
                              mdi-plus
                          </v-icon>
                          Sub-type
                      </v-btn>
                  </div>
 

                <template>
                    <v-data-table
                        :headers="headers"
                        :items="payment_type_subcategory_informations"
                        item-key="payment_type_subcategory_information.name"
                        sort-by="payment_type_subcategory_information.name"
                      >
                      


                      <template v-slot:item.image="props">
                          <v-icon black>
                            {{ props.item.image }}
                          </v-icon>
                      </template>  
                      <template v-slot:item.sub_image="props">
                        <div v-for="subitem in props.item.payment_type_subcategory_information" :key="subitem.id">
                          <div v-if="(subitem.image == null)">
                            <br>
                                <v-btn @click="uploadImage(subitem.id)">Add Image</v-btn>
                            </div>
                            <div v-else>
                              <br>
                                <v-img :src="image_path+subitem.image" height="30px" width="30px" @click="uploadImage(subitem.id)"></v-img>
                            </div>
                          </div>
                          </template>
                        <template v-slot:item.laman="props">
                         
                            <div v-for="panganoto in props.item.payment_type_subcategory_information" :key="panganoto.id">
                              
                                <v-chip
                                    dark
                                    small
                                    class="ma-2"
                                    color="green">
                                    {{ panganoto.name }}
                                </v-chip>
                            </div>
                        </template>
                        <template v-slot:item.action="props">
                            <div v-for="panganoto in props.item.payment_type_subcategory_information" :key="panganoto.id">
                              <br>
                                <!-- <v-icon
                                    dark
                                    medium
                                    color="green darken-1"
                                    @click="UpdateSubCategory(panganoto.id, panganoto, props.item)"
                                    >
                                    mdi-file-edit-outline
                                </v-icon>     -->

                                <v-btn
                          dark
                          small
                          color="indigo"
                          @click="UpdateSubCategory(panganoto.id, panganoto, props.item)"
                      >
                      
                          <v-icon dark>
                            mdi-file-edit-outline
                          </v-icon>
                          Edit
                      </v-btn>
                            </div>
                       
                      </template>                    
                    </v-data-table>
                </template>
              </v-card-text>
          </v-card>
  
        </v-col>
      </v-row>
  
      <!-- Dialog -->
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
          <v-card-actions>
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
              @click="SavePaymentTypeInformation()"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </template>
      <!-- end save confirmation dialog -->
        <!-- upload image discount confirmation dialog -->
  <template>
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
            <!-- <input type="file" @change="uploadFile" ref="file"> -->

            <v-img :src="this.url"></v-img>
            <v-file-input 
                accept="image/*"
                label="Upload Image"
                prepend-icon="mdi-camera"
                @change="Preview_image()"
                v-model="image">
                </v-file-input>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <br>
          <v-btn
            color="green"
            text
            @click="changeStatusDialogUploadImageProduct(false)"
          >
            Cancel
          </v-btn>
          <v-btn
            color="green"
            text
            @click="AddImagePaymentTypeInformation()"
          >
            Upload
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
    <!-- end upload image discount confirmation dialog -->
    <!-- create sub category confirmation dialog -->
      <template>
    <v-row justify="center">
      <v-dialog
        v-model="editconfirmation"
        persistent
        max-width="290"
      >
        <v-card>
          <v-card-title class="text-h5">
            Save
          </v-card-title>
          <v-card-text>Are you sure you want to save?</v-card-text>
          <v-card-actions>
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
              @click="SavePaymentTypeComboInformation()"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </template>
      <!-- end create sub category confirmation dialog -->

    <!-- edit confirmation dialog -->
    <template>
    <v-row justify="center">
      <v-dialog
        v-model="editsubcategoryconfirmation"
        persistent
        max-width="290"
      >
        <v-card>
          <v-card-title class="text-h5">
            Edit
          </v-card-title>
          <v-card-text>Are you sure you want to update?</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="green darken-1"
              text
              @click="changeUpdateDialogEdit(false)"
            >
              Cancel
            </v-btn>
            <v-btn
              color="green darken-1"
              text
              @click="saveUpdatePaymentTypeSubcategory()"
            >
              Update
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </template>
      <!-- end edit confirmation dialog -->      
  
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
          <v-card-text>Are you sure you want to delete <b>{{ this.foDelete.data['name'] }}</b>?</v-card-text>
          <v-card-actions>
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
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </template>
      <!-- end delete confirmation dialog -->
  
      <v-form
      ref="form"
      v-model="valid"
      lazy-validation
    >
      <v-dialog
        v-model="paymenttypedialog"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
      >
        <v-card>
          <v-toolbar
            dark
            color="success"
          >
            <v-btn
              icon
              dark
              @click="paymenttypedialog = false"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>Add Payment Type</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
  
          <v-col sm="12" md="6" offset-md="3" class="mt-3 text-center"> 
              <h4>Note: Here you can add another payment type information.</h4>
          </v-col>
          <v-col sm="12" md="6" offset-md="3"> 
              <v-text-field
                  v-model="paymenttype_information.name"
                  label="Payment type"
                  required
                  outlined
                   :counter="50"
                   :rules="nameRules"
              ></v-text-field>
          </v-col>    
                    <center>
                    <v-col sm="12" md="6">
                        <v-btn
                        color="green darken-1"
                        block
                        @click="validate(1)"
                        id="btn-next" class="btn btn-success btn-sm p-2" style="font-size: 12px;"
                        >
                        Save
                      </v-btn>
                    </v-col>
                    </center>
        </v-card>
     
      </v-dialog>

      <v-dialog
        v-model="subtypedialog"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
      >
        <v-card>
          <v-toolbar
            dark
            color="success"
          >
            <v-btn
              icon
              dark
              @click="subtypedialog = false"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>Add Payment Sub-Category</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
  
          <v-col sm="12" md="6" offset-md="3" class="mt-3 text-center"> 
              <h4>Note: Here you can add another Payment Type Sub-Category information.</h4>
          </v-col>
          <v-col sm="12" md="6" offset-md="3"> 
          <template>
            <center>
            <v-img :src="url"></v-img>
          </center>
            <v-file-input 
            accept="image/*"
            label="Upload Image"
            prepend-icon="mdi-camera"
            @change="Preview_image()"
            v-model="image">
            </v-file-input>
          </template>
          </v-col>
          <v-col sm="12" md="6" offset-md="3"> 
                <v-combobox
                    outlined
                    label="Payment Type"
                    :items="paymenttypecombo"
                    v-model="paymenttypeid"
                    @change="checking()"
                  :rules="[v => !!v || 'Payment Type is required']"
                  ></v-combobox>
              </v-col>
              <v-col sm="12" md="6" offset-md="3"> 
                <v-combobox
                    outlined
                    label="Branch"
                    :items="branchcombo"
                    v-model="branchid"
                    @change="checkingbranch()"
                  :rules="[v => !!v || 'Branch is required']"
                  ></v-combobox>
              </v-col>
          <v-col sm="12" md="6" offset-md="3"> 
              <v-text-field
                  v-model="paymenttypecombos.name"
                  label="Payment Type Sub-Category"
                  required
                  outlined
                   :counter="50"
                   :rules="nameRules"
              ></v-text-field>
          </v-col>  
                    <center>
                    <v-col sm="12" md="6">
                        <v-btn
                        color="green darken-1"
                        block
                        @click="validate(2)"
                        id="btn-next" class="btn btn-success btn-sm p-2" style="font-size: 12px;"
                        >
                        Save
                      </v-btn>
                    </v-col>
                    </center> 
        </v-card>
      </v-dialog>



      <v-dialog
        v-model="updatesubtypedialog"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
      >
        <v-card>
          <v-toolbar
            dark
            color="success"
          >
            <v-btn
              icon
              dark
              @click="updatesubtypedialog = false"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>Update Payment Sub-Category</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
  
          <v-col sm="12" md="6" offset-md="3" class="mt-3 text-center"> 
              <h4>Note: Here you can update another Payment Type Sub-Category information.</h4>
          </v-col>
          <v-col sm="12" md="6" offset-md="3"> 
          <template>
            <div v-if="this.changeval==1">
            <center>
            <v-img :src="this.url"></v-img>
          </center>
            </div>
            <div v-else>
            <center>
            <v-img :src="this.image_path+this.image"></v-img>
          </center>
            </div>
            <v-file-input 
            accept="image/*"
            label="Upload Image"
            prepend-icon="mdi-camera"
            @change="Preview_image_update()"
            v-model="image">
            </v-file-input>
          </template>
          </v-col>
          <v-col sm="12" md="6" offset-md="3"> 
                <v-combobox
                    outlined
                    label="Payment Type"
                    :items="paymenttypecombo"
                    v-model="xpaymenttypeid"
                    @change="checking()"
                  :rules="[v => !!v || 'Payment Type is required']"
                  ></v-combobox>
              </v-col>
              <v-col sm="12" md="6" offset-md="3"> 
                <v-combobox
                    outlined
                    label="Branch"
                    :items="branchcombo"
                    v-model="xbranchid"
                    @change="checking()"
                  :rules="[v => !!v || 'Branch is required']"
                  ></v-combobox>
              </v-col>
          <v-col sm="12" md="6" offset-md="3"> 
              <v-text-field
                  v-model="paymenttypecombos.name"
                  label="Payment Type Sub-Category"
                  required
                  outlined
                   :counter="50"
                   :rules="nameRules"
              ></v-text-field>
          </v-col>  
                    <center>
                    <v-col sm="12" md="6">
                        <v-btn
                        color="green darken-1"
                        block
                        @click="validate(3)"
                        id="btn-next" class="btn btn-success btn-sm p-2" style="font-size: 12px;"
                        >
                        Save
                      </v-btn>
                    </v-col>
                    </center> 
        </v-card>
      </v-dialog>
      </v-form>
    </v-container>
  
  </template>
  
  <script>
  
  import paymenttypeservices from '../services/paymenttypeservices';

  
    export default {
      name: 'PaymentType',
      created() {
        //   this.FetchPaymentTypeInformation();
          this.FetchPaymentTypeInformationForTB();
          this.$store.state.snackbar.color = 'green darken-1';
      },
      mounted(){
          this.$store.state.title = "Payment Type";
      },
      data: () => ({
        url: null,
        image: null,
        branchid: '',
        SubCategoryID: '',
        xbranchid:[],
        changeval:0,
        subcategoryIDUpdate:0,
        payment_info_id:'',
        branch_info_id:'',
        branchcombo:[],
        paymenttype:[],
        paymenttypeid:"",
        xpaymenttypeid:[],
        paymenttypecombo:[],
        paymenttypeinfo:[],
        image_path: [],

        payment_type_subcategory_informations:[],
        paymenttypecombos:{
            name:'',
            value:'',
            id:''
        },
          updatesubtypedialog: false,
          paymenttypedialog: false,
          uploadimageconfirmation: false,
          paymenttype_information: {
              name: '',
              id:''
          },
          paymenttype_information_combo: {
              name: '',
              id:''
          },
        headers: [
          {text: 'Icon', align:'start', value: 'image'},
          {text: 'Payment Method', align: 'start', value: 'name'},
          {text: 'Image', value:'sub_image'},
          { text: 'Sub-type', value: 'laman' },
          { text: 'Action', value: 'action' }
        ],
        headers1: [
        { text: 'Payment Method', align: 'start', filterable: false, value: 'name' },
        { text: 'Sub-type', value: 'laman' },
        { text: 'Action', value: 'action' }
      ],
          valid: true,
          nameRules: [
          v => !!v || 'Payment Type is required',
          ],
          confirmation: false,
          saveconfirmation: false,
          editsubcategoryconfirmation: false,
          editconfirmation: false,
          uploadconfirmation: false,
          subtypedialog: false,
          foDelete: {
              id: 0,
              data: ''
          },
        paymenttype_subcategory_information:[
                {
                    parent_id: '',
                    name: ''
                }
        ],
          foUpdate:{
              id: 0,
              name: '',
              paymenttype_subcategory_information:''
              }
      }),
      methods: {
        Preview_image() {
          // console.log(this.image);
          if(!this.image){
            this.url=null;
            return;
          } 
          this.url= URL.createObjectURL(this.image);
        },
        Preview_image_update() {
          this.changeval = 1;
          this.url= URL.createObjectURL(this.image);
        },   
        changeStatusDialogUploadImageProduct(status){
            this.uploadimageconfirmation = status;
            this.FetchPaymentTypeInformationForTB();
        },
        FetchBranchComboInformation(){
              let payload = {
                  user_id: this.$store.getters.getParentID
              };
              paymenttypeservices.fetchBranchComboInformation(payload, this.$store.getters.getAccessToken).then(response => {
                  if(response.data.success){
                      response.data.result.forEach((value) => {
                        this.branchcombo.push({
                            text: value.branch_name,
                            value: value.id
                        });
                    });
                  }
              }).catch(error => console.log(error));
          },
          uploadImage(id){
            this.image = null;
            this.url = null;
            this.SubCategoryID = id;
            this.uploadimageconfirmation = true;
        },
        UpdateImagePaymentTypeInformation(){
          console.log('daan');
          console.log(this.subcategoryIDUpdate);
          const formData = new FormData();
          formData.append('file', this.image);
          formData.append('id', this.subcategoryIDUpdate);

          paymenttypeservices.updateImagePaymenttypeInformation(formData, this.$store.getters.getAccessToken).then(response => {
              if(response.data.success){
                  this.FetchPaymentTypeInformationForTB();
                  this.uploadimageconfirmation = false;
                  this.$store.state.snackbar.message = response.data.message;
                  this.$store.state.snackbar.show = true;
              }
              else{
                  console.log(response.data.message);
              }
          }).catch(error => console.log(error));

          }, 
        AddImagePaymentTypeInformation(){
          const formData = new FormData();
          formData.append('file', this.image);
          formData.append('id', this.SubCategoryID);

          paymenttypeservices.updateImagePaymenttypeInformation(formData, this.$store.getters.getAccessToken).then(response => {
              if(response.data.success){
                  this.FetchPaymentTypeInformationForTB();
                  this.uploadimageconfirmation = false;
                  this.$store.state.snackbar.message = response.data.message;
                  this.$store.state.snackbar.show = true;
              }
              else{
                  console.log(response.data.message);
              }
          }).catch(error => console.log(error));

          },   
          checkingbranch(){
            console.log(this.branchid['value'])

          },
          UpdateSubCategory(id, item, items){
              this.subcategoryID = item.id;
              this.subcategoryIDUpdate = id;
              this.FetchPaymentTypeComboInformation();
              this.updatesubtypedialog = true;
              this.xpaymenttypeid.text = items.name;
              this.xpaymenttypeid.value = items.id;
              this.paymenttypecombos.name = item.name;
              this.image = item.image;
              this.xbranchid.text = item.branch_info.branch_name;
              this.xbranchid.value = item.branch_info.id;
              this.FetchBranchComboInformation();
          },
          uploadFile() {
            this.Images = this.$refs.file.files[0];
          },
          uploadfileopen() {
            this.uploadconfirmation = true;
          },
          changeStatusDialogUpload(status){
              this.uploadconfirmation = status;
          },
          changeStatusDialog(status){
              this.confirmation = status;
          },
          changeStatusDialogSave(status){
              this.saveconfirmation = status;
          },
          changeStatusDialogEdit(status){
              this.editconfirmation = status;
              this.FetchPaymentTypeInformation();
          },
          changeUpdateDialogEdit(status){
              this.editsubcategoryconfirmation = status;
              this.FetchPaymentTypeComboInformation();
          },
          FetchPaymentTypeInformation(){
                this.paymenttype_information = {
                    name: '',
                    id:''
                }
              let payload = {
                  user_id: this.$store.getters.getParentID
              };
              paymenttypeservices.fetchPaymentTypeInformation(payload, this.$store.getters.getAccessToken).then(response => {
                  if(response.data.success){
                      this.paymenttype = response.data.result;
                  }
              }).catch(error => console.log(error));
  
          },
          FetchPaymentTypeComboInformation(){
              let payload = {
                  user_id: this.$store.getters.getParentID
              };
              paymenttypeservices.fetchPaymentTypeComboInformation(payload, this.$store.getters.getAccessToken).then(response => {
                  if(response.data.success){
                      response.data.result.forEach((value) => {
                        this.paymenttypecombo.push({
                            text: value.name,
                            value: value.id
                        });
                    });
                  }
              }).catch(error => console.log(error));
          },

          FetchPaymentTypeInformationForTB(){
              let payload = {
                  user_id: this.$store.getters.getParentID
              };
              paymenttypeservices.fetchPaymentTypeInformationForTB(payload, this.$store.getters.getAccessToken).then(response => {
                  if(response.data.success){
                    this.payment_type_subcategory_informations = response.data.result;
                    this.image_path = response.data.img_path;
                }
                // console.log(this.image_path);
              }).catch(error => console.log(error));
          },

          NewPaymenttype(){
              this.paymenttypedialog = true;
              this.subtypedialog = false;
              this.ClearSavePaymentType();
          },
          NewPaymentSubtype(){
              this.subtypedialog = true;
              this.paymenttypedialog = false;
              this.FetchPaymentTypeComboInformation();
              this.FetchBranchComboInformation();
          },
          UpdatePaymentType(id, item){
            this.discountID = id;
              this.fetchPaymentTypeInformation();
              this.subtypedialog = true;
              this.paymenttypedialog = false;
              this.paymenttype_information.name = item.name;              
          },
          validate(id){

              let val = this.$refs.form.validate();
  
              if(val){
                if(id==1){
                    this.confirmSave();   
                }else if(id==3){
                    this.confirmUpdateSubcategory()
                }else{
                    this.confirmCreateSubcategory()
                }

              }
          },
          confirmSave(){
              this.saveconfirmation = true
          },
          confirmUpdateSubcategory(){
              this.editsubcategoryconfirmation = true
          },
          SavePaymentTypeInformation(){
              let payload = {
                paymenttype_information: JSON.stringify(this.paymenttype_information)
              };
              console.log(payload);
              paymenttypeservices.savePaymentTypeInformation(payload, this.$store.getters.getAccessToken).then(response => {
                  if(response.data.success){
                      this.paymenttypedialog = false;
                      this.ClearSavePaymentType();
                      this.$store.state.snackbar.message = response.data.message;
                      this.$store.state.snackbar.show = true;
                      this.saveconfirmation = false
                      this.FetchPaymentTypeInformationForTB();
                  }
              }).catch(error => console.log(error));
  
          },
          checking(){
            console.log(this.paymenttypeid['value'])

          },
          saveUpdatePaymentTypeSubcategory(){
            // console.log(this.id);
            this.paymenttypeinfo = {
                id: this.subcategoryID,
                parent_id: this.xpaymenttypeid.value,
                name: this.paymenttypecombos.name,
                branch_id: this.xbranchid.value,
                parent_user_id: this.$store.getters.getParentID,
                created_by: this.$store.getters.getUserID
              };
              let payload = {
                id:this.subcategoryID,
                paymenttypeinfo: JSON.stringify(this.paymenttypeinfo)
              };
              console.log(payload);
              paymenttypeservices.updatePaymentTypeSubCategoryInformation(payload, this.$store.getters.getAccessToken).catch(error => console.log(error));
              this.UpdateImagePaymentTypeInformation();
              this.$store.state.snackbar.message = 'Payment type Sub-Category information has been updated.';
              this.$store.state.snackbar.show = true;
              this.FetchPaymentTypeInformationForTB();
              this.editsubcategoryconfirmation = false
              this.updatesubtypedialog = false;
          },

          SavePaymentTypeComboInformation(){
            this.paymenttypeinfo = {
                parent_id: this.paymenttypeid.value,
                name: this.paymenttypecombos.name,
                branch_id: this.branchid.value,
                parent_user_id: this.$store.getters.getParentID,
                created_by: this.$store.getters.getUserID
              };
              // let payload = {
              //   paymenttypeinfo: JSON.stringify(this.paymenttypeinfo)
              // };
            const formData = new FormData();
            formData.append('file', this.image);
            formData.append('paymenttypeinfo', JSON.stringify(this.paymenttypeinfo));
              paymenttypeservices.savePaymentTypeSubCategoryInformation(formData, this.$store.getters.getAccessToken).then(response => {
                  if(response.data.success){
                    this.editconfirmation = false;  
                      this.subtypedialog = false;
                      this.FetchPaymentTypeInformationForTB();
                      this.ClearSavePaymentTypeSubCategory();
                      this.$store.state.snackbar.message = response.data.message;
                      this.$store.state.snackbar.show = true;
                  }
              }).catch(error => console.log(error));
  
          },
          ClearSavePaymentType(){
              this.paymenttype_information.name = '';
          },
          ClearSavePaymentTypeSubCategory(){
            this.image = null;
            this.url = null;
            this.paymenttypeid = '';
            this.branchid = '';
            this.paymenttypecombos.name = '';
          },
          confirmCreateSubcategory(){
            this.saveconfirmation = false
            this.editsubcategoryconfirmation = false
            this.editconfirmation = true
            },
          UpdatePaymentTypeInformation(){
              this.foUpdate = {
                  name: this.paymenttype_information['name'] 
              }
              this.editconfirmation = true
          },
  
          confirmDelete(){
              this.paymenttype.splice(this.paymenttype.indexOf(this.foDelete['data']), 1);
  
              let payload = {
                  id: this.foDelete['id']
              };
  
              paymenttypeservices.removePaymentTypeInformation(payload, this.$store.getters.getAccessToken).catch(error => console.log(error));
  
              this.$store.state.snackbar.message = 'Payment Type information has been removed.';
              this.$store.state.snackbar.show = true;
              this.confirmation = false
              this.FetchPaymentTypeInformationForTB();
  
          },
  
          RemovePaymentTypeInformation(id, data){
  
              this.foDelete = {
                  id: id,
                  data: data
              }
              this.confirmation = true
          },
      }
    }
  </script>
  