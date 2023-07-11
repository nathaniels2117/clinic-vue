<template>
  <v-container style="max-width: 95%; position: relative;" >
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

      <template v-if="$vuetify.breakpoint.mdAndUp">
        &nbsp;<v-btn
          dark
          color="orange"
          elevation="2"
          @click="uploadfileopen()"
        >
        <!-- insert val access location download -->
          <v-icon>mdi-download-outline</v-icon>Upload
        </v-btn>
        </template>


        <template v-if="$vuetify.breakpoint.smAndDown">
        &nbsp;<v-btn
        dark

        color="orange"
          style="background:orange;padding-left: 12px;padding-right: 12px;"
          @click="uploadfileopen()"
        >
        <!-- insert val access location download -->
          <v-icon>mdi-download-outline</v-icon>
          </v-btn>
        </template>
      <template v-if="$vuetify.breakpoint.mdAndUp">
        &nbsp;<v-btn
        medium
        dark
          color="orange"
          @click="AddProduct()"
          v-if="$store.getters.valAccess(46)"
        >
          <v-icon>mdi-plus</v-icon>Create
        </v-btn>
        </template>

        <template v-if="$vuetify.breakpoint.smAndDown">
        &nbsp;<v-btn
          dark
          medium
          color="orange"
          @click="AddProduct()"
          v-if="$store.getters.valAccess(46)"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
        </template>

  </v-toolbar>
</template> <br>
                    <v-data-table
                        :headers="showHeaders"
                        :items="product"
                        :search="search"
                        :headers-length="500"
                        :page.sync="page"
                      @page-count="pageCount = $event"
                      :footer-props="{
                      'items-per-page-options':[10],
                      'disable-items-per-page': true,
    }"
                    >
                        <template v-slot:item.product_image="props">
                            <div  v-if="$store.getters.valAccess(115)">
                              <div v-if="props.item.image==null">
                                  <v-btn @click="uploadImage(props.item.id)">Add Image</v-btn>
                              </div>
                              <div v-else>
                                  <v-img :src="image_path+props.item.image" height="100px" width="100px" @click="uploadImage(props.item.id)"></v-img>
                              </div>
                            </div>
                            <div v-else>
                              <div v-if="props.item.image==null">
                                  <v-btn disabled>Add Image</v-btn>
                              </div>
                              <div v-else>
                                  <v-img :src="image_path+props.item.image" height="100px" width="100px"></v-img>
                              </div>
                            </div>
                           
                        </template>
                        <template v-slot:item.name="props">
                            <v-edit-dialog
                                :return-value.sync="props.item.name"
                                @save="UpdateProductInformation(props.item.id, 'name', props.item.name)"
                            >
                            {{ props.item.name }}
                            <template v-slot:input
                            v-if="$store.getters.valAccess(115)"
                            >
                                <v-text-field
                                    v-model="props.item.name"
                                    label="Edit"
                                    single-line
                                    color="orange"
                                ></v-text-field>
                            </template>
                            </v-edit-dialog>
                        </template>
                        <template v-slot:item.description="props">
                            <v-edit-dialog
                                :return-value.sync="props.item.description"
                                @save="UpdateProductInformation(props.item.id, 'description', props.item.description)"
                            >
                            {{ props.item.description }}
                            <template v-slot:input
                            v-if="$store.getters.valAccess(115)"
                            >
                                <v-text-field
                                    v-model="props.item.description"
                                    label="Edit"
                                    single-line
                                    color="orange"
                                ></v-text-field>
                            </template>
                            </v-edit-dialog>
                        </template>
                        <template v-slot:item.cost="props">
                            <v-edit-dialog
                                :return-value.sync="props.item.cost"
                                @save="UpdateProductInformation(props.item.id, 'cost', props.item.cost)"
                            >
                            {{ parseFloat(props.item.cost).toFixed(2) }}
                            <template v-slot:input
                            v-if="$store.getters.valAccess(115)"
                            >
                                <v-text-field
                                    v-model="props.item.cost"
                                    label="Edit"
                                    single-line
                                    color="orange"
                                ></v-text-field>
                            </template>
                            </v-edit-dialog>
                        </template>
                        <template v-slot:item.selling_price="props">
                            <v-edit-dialog
                                :return-value.sync="props.item.selling_price"
                                @save="UpdateProductInformation(props.item.id, 'selling_price', props.item.selling_price)"
                            >
                            {{ parseFloat(props.item.selling_price).toFixed(2) }}
                            <template v-slot:input
                            v-if="$store.getters.valAccess(115)"
                            >
                                <v-text-field
                                    v-model="props.item.selling_price"
                                    label="Edit"
                                    single-line
                                    color="orange"
                                ></v-text-field>
                            </template>
                            </v-edit-dialog>
                        </template>

                        <template v-slot:item.product_type="props">
                              {{ props.item.product_type_info.name !="" ? props.item.product_type_info.name : 'No Data'}}
                        </template>

                        <template v-slot:item.department="props">
                            <v-edit-dialog
                                :return-value.sync="props.item.department_id"
                                @open="SetEditCombobox(props.item.department_info.name, props.item.department_id, 'department')"
                                @save="SaveEditCombobox(props.item, 'department')"
                            >
                             {{ props.item.department_info.name !="" ? props.item.department_info.name : 'No Data'}}
                            <template v-slot:input>
                                <v-combobox
                                    outlined
                                    label="Department"
                                    :items="department"
                                    v-model="selected"
                                    class="pt-5"
                                    color="orange"
                                ></v-combobox>
                            </template>
                            </v-edit-dialog>
                        </template>
                        
                        <template v-slot:item.category="props">
                            <v-edit-dialog
                                :return-value.sync="props.item.category_id"
                                @open="SetEditCombobox(props.item.category_info.name, props.item.category_id, 'category')"
                                @save="SaveEditCombobox(props.item, 'category')"
                            >
                            {{ props.item.category_info.name !="" ? props.item.category_info.name : 'No Data'}}
                            <template v-slot:input
                            v-if="$store.getters.valAccess(115)"
                            >
                                <v-combobox
                                    outlined
                                    label="Category"
                                    :items="category"
                                    v-model="selected"
                                    class="pt-5"
                                    color="orange"
                                ></v-combobox>
                            </template>
                            </v-edit-dialog>
                        </template>

                        <template v-slot:item.sub_category="props">
                            <v-edit-dialog
                                :return-value.sync="props.item.sub_category_id"
                                @open="SetEditCombobox(props.item.sub_category_info.name, props.item.sub_category_id, 'sub_category')"
                                @save="SaveEditCombobox(props.item, 'sub_category')"
                            >
                            {{ props.item.sub_category_info ? props.item.sub_category_info.name : 'No Data'}}
                            <template v-slot:input
                            v-if="$store.getters.valAccess(115)"
                            >
                                <v-combobox
                                    outlined
                                    label="Sub Category"
                                    :items="sub_category"
                                    v-model="selected"
                                    class="pt-5"
                                    color="orange"
                                ></v-combobox>
                            </template>
                            </v-edit-dialog>
                        </template>


                        <template v-slot:item.is_vatable="props">
                            <v-edit-dialog
                                :return-value.sync="props.item.is_vatable"
                            >
                                <v-chip
                                    class="ma-2"
                                    outlined
                                    color="orange"
                                    v-if="props.item.is_vatable == 1"
                                >
                                    Vatable
                                </v-chip>
                                <v-chip
                                    class="ma-2"
                                    outlined
                                    color="red"
                                    v-else
                                >
                                    Non-Vat
                                </v-chip>
                            <template v-slot:input
                            v-if="$store.getters.valAccess(115)"
                            >
                                <v-radio-group v-model="props.item.is_vatable" @change="UpdateProductInformation(props.item.id, 'is_vatable', props.item.is_vatable)">
                                    <v-radio
                                        label="Vatable"
                                        :value="1"
                                        color="orange"
                                    ></v-radio>
                                    <v-radio
                                        label="Non-Vat"
                                        :value="0"
                                        color="orange"
                                    ></v-radio>
                                </v-radio-group>
                            </template>
                            </v-edit-dialog>
                        </template>

                        <template v-slot:item.created_info.created_by="props">
                            {{ props.item.created_info.personal_information != 0 ? props.item.created_info.personal_information.lastname + ' , ' + props.item.created_info.personal_information.firstname : 'No Data' }}
                        </template>
                        
                        <template v-slot:item.created_at="props">
                            {{ props.item.created_at }}
                        </template>
                        <template v-slot:item.id="props">
                            <v-btn
                              elevation="2"
                                  class="mx-2"
                                  dark
                                  outlined
                                  small
                                  color="orange"
                                  v-if="$store.getters.valAccess(115)"
                                  @click="UpdateAllProductInformation(props.item.id, props.item)"
                              >
                              <v-icon
                                      small
                                      @click="UpdateAllProductInformation(props.item.id, props.item)"
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
                          v-if="$store.getters.valAccess(117)"
                                @click="RemoveProductInformation(props.item.id, props.item)"
                        >
                        <v-icon
                                small
                                @click="RemoveProductInformation(props.item.id, props.item)"
                            >
                                mdi-delete
                            </v-icon>
                          Delete
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
            @click="SaveProductInformation()"
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
        <v-card-text>Are you sure you want to delete <b>{{ this.foDelete.data['name'] }}</b>?</v-card-text>
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
    <!-- end delete confirmation dialog -->


             <!-- upload confirmation dialog -->
    <template>
  <v-row justify="center">
    <v-dialog
      v-model="uploadconfirmation"
      persistent
      max-width="290"
    >
      <v-card>
        <v-card-title class="text-h5">
          Upload
        </v-card-title>
        <v-card-text>Upload xlsx and csv format</v-card-text>
        <v-card-text class="text-right"><a @click="DownloadTemplate()">Download Template</a></v-card-text>
          <v-card-text><input type="file" @change="uploadFile" ref="file"></v-card-text>
        <center>
          <v-btn
            elevation="2"
            class="mx-2"
            dark
            outlined
            small
            color="red"
            @click="changeStatusDialogUpload(false)"
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
            @click="ImportProductInformation()"
            >
            Confirm
          </v-btn>
        </center>
        <br>
      </v-card>
    </v-dialog>
  </v-row>
</template>
    <!-- end upload confirmation dialog -->


                 <!-- upload image product confirmation dialog -->
                 <template>
  <v-row justify="center">
    <v-dialog
      v-model="uploadimageconfirmation"
      persistent
      max-width="290"
    >
      <v-card>
        <v-card-title class="text-h5">
          Product
        </v-card-title>
        <v-card-text>Upload image</v-card-text>
          <v-card-text>
            <v-img :src="this.url"></v-img>
            <v-file-input 
                color="orange"
                accept="image/*"
                label="Upload Image"
                prepend-icon="mdi-camera"
                @change="Preview_image()"
                v-model="prod_image">
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
            @click="changeStatusDialogUploadImageProduct(false)"
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
            @click="AddImageProductInformation()"
            >
            Confirm
          </v-btn>
        </center>
        <br>
      </v-card>
    </v-dialog>
  </v-row>
</template>
    <!-- end upload image product confirmation dialog -->



     <!-- add unit dialog -->
     <template>
  <v-row justify="center">
    <v-dialog
      v-model="addunitdialog"
      persistent
      max-width="290"
    >
      <v-card>
        <v-card-title class="text-h5">
          Unit
        </v-card-title>
            <v-card-text>
                <v-text-field
                    v-model="newunit.name"
                    label="Name"
                    single-line
                    color="orange"
                ></v-text-field>
                <v-text-field
                    v-model="newunit.initial"
                    label="Initial"
                    single-line
                    color="orange"
                ></v-text-field>
            </v-card-text>
        <center>
          <v-btn
            elevation="2"
            class="mx-2"
            dark
            outlined
            small
            color="red"
            @click="changeStatusDialogUnit(false)"
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
            @click="AddUnitInformation()"
            >
            Save
          </v-btn>
        </center>
        <br>
      </v-card>
    </v-dialog>
  </v-row>
</template>
    <!-- end add unit dialog -->


         <!-- add unit conversion dialog -->
         <template>
  <v-row justify="center">
    <v-dialog
      v-model="addunitconversiondialog"
      persistent
      max-width="290"
    >
      <v-card>
        <v-card-title class="text-h5">
          Unit Conversion
        </v-card-title>
            <v-card-text>
                
                <v-combobox
                    single-line
                    v-model="newunitconversion"
                    label="Unit"
                    :items="this.newunitconversions"
                    readonly=""
                ></v-combobox>

                <v-combobox
                    single-line
                    v-model="conversion_unit"
                    label="Unit"
                    :items="newconversionunit"
                ></v-combobox>

                <v-text-field
                    v-model="conversion_value"
                    label="Initial"
                    single-line
                    color="orange"
                ></v-text-field>
            </v-card-text>
        <center>
          <v-btn
            elevation="2"
            class="mx-2"
            dark
            outlined
            small
            color="red"
            @click="changeStatusDialogUnitConversion(false)"
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
            @click="AddUnitConversionInformation()"
            >
            Save
          </v-btn>
        </center>
        <br>
      </v-card>
    </v-dialog>
  </v-row>
</template>
    <!-- end add unit conversion dialog -->


        <!-- add department dialog -->
        <template>
  <v-row justify="center">
    <v-dialog
      v-model="adddepartmentdialog"
      persistent
      max-width="290"
    >
      <v-card>
        <v-card-title class="text-h5">
          Department
        </v-card-title>
            <v-card-text>
                <v-text-field
                    v-model="department_information.name"
                    label="Name"
                    single-line
                    color="orange"
                ></v-text-field>
            </v-card-text>
        <center>
          <v-btn
            elevation="2"
            class="mx-2"
            dark
            outlined
            small
            color="red"
            @click="changeStatusDialogDepartment(false)"
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
            @click="AddDepartmentInformation()"
            >
            Save
          </v-btn>
        </center>
        <br>
      </v-card>
    </v-dialog>
  </v-row>
</template>
    <!-- end add department dialog -->



        <!-- add category dialog -->
        <template>
  <v-row justify="center">
    <v-dialog
      v-model="addcategorydialog"
      persistent
      max-width="290"
    >
      <v-card>
        <v-card-title class="text-h5">
            Category
        </v-card-title>
            <v-card-text>
                <v-text-field
                    v-model="category_information.name"
                    label="Name"
                    single-line
                    color="orange"
                ></v-text-field>
            </v-card-text>
        <center>
          <v-btn
            elevation="2"
            class="mx-2"
            dark
            outlined
            small
            color="red"
            @click="changeStatusDialogCategory(false)"
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
            @click="AddCategoryInformation()"
            >
            Save
          </v-btn>
        </center>
        <br>
      </v-card>
    </v-dialog>
  </v-row>
</template>
    <!-- end add category dialog -->


            <!-- add sub category dialog -->
        <template>
  <v-row justify="center">
    <v-dialog
      v-model="addsubcategorydialog"
      persistent
      max-width="290"
    >
      <v-card>
        <v-card-title class="text-h5">
            Sub Category
        </v-card-title>
            <v-card-text>
                <v-text-field
                    v-model="sub_category_information.name"
                    label="Name"
                    single-line
                    color="orange"
                ></v-text-field>
            </v-card-text>
        <center>
          <v-btn
            elevation="2"
            class="mx-2"
            dark
            outlined
            small
            color="red"
            @click="changeStatusDialogSubCategory(false)"
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
            @click="AddSubCategoryInformation()"
            >
            Save
          </v-btn>
        </center>
        <br>
      </v-card>
    </v-dialog>
  </v-row>
</template>
    <!-- end add sub category dialog -->

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
          <v-toolbar-title>Add Product</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
          </v-toolbar-items>
        </v-toolbar>

        <v-col sm="12" md="6" offset-md="3" class="mt-3 text-center"> 
            <h4>Note: Here you can add another product information.</h4>
        </v-col>

            <v-col sm="12" md="6" offset-md="3"> 
                <v-col sm="12" md="6" offset-md="3"> 
            <template>
                <center>
                <v-img :src="this.url"></v-img>
            </center>
                <v-file-input 
                color="orange"
                accept="image/*"
                label="Upload Image"
                prepend-icon="mdi-camera"
                @change="Preview_image()"
                v-model="prod_image">
                </v-file-input>
            </template>
            </v-col>
            
            <v-text-field
                v-model="product_information.name"
                label="Product Name"
                required
                outlined
                 :counter="50"
                 :rules="nameRules"
                color="orange"
            ></v-text-field>
            <v-text-field
                v-model="product_information.description"
                label="Description"
                required
                outlined
                 :counter="50"
                 :rules="nameRules"
                color="orange"
            ></v-text-field>
            <v-text-field
                v-model="this.sku"
                label="SKU"
                required
                outlined
                color="orange"
                readonly=""
            ></v-text-field>
            <v-text-field
                v-model="product_information.barcode"
                label="Barcode"
                required
                outlined
                 :counter="50"
                 :rules="nameRules"
                color="orange"
            ></v-text-field>
            <v-text-field
                v-model="product_information.cost"
                label="Cost"
                required
                outlined
                 :counter="13"
                 :rules="numberRules"
                 @keypress="filter(event)"
                color="orange"
            ></v-text-field>
            <v-text-field
                v-model="product_information.selling_price"
                label="Price"
                required
                outlined
                 :counter="13"
                 :rules="numberRules"
                 @keypress="filter(event)"
                color="orange"
            ></v-text-field>
            <v-combobox
                outlined
                label="Unit"
                :items="unit"
                v-model="product_information.unit_id"
                  :rules="[v => !!v || 'Unit Information is required']"
                  @change="getUnit()"
                color="orange"
            ></v-combobox>
            <v-combobox
                outlined
                label="Unit Conversion"
                :items="unit_conversion"
                v-model="product_information.conversion_id"
                  :rules="[v => !!v || 'Unit Conversion Information is required']"
                color="orange"
                @change="getUnitConversion()"
            ></v-combobox>
            <v-combobox
                outlined
                label="Department"
                :items="department"
                v-model="product_information.department_id"
                  :rules="[v => !!v || 'Department Information is required']"
                color="orange"
                @change="getDepartment()"
            ></v-combobox>
            <v-combobox
                outlined
                label="Category"
                :items="category"
                v-model="product_information.category_id"
                  :rules="[v => !!v || 'Category Information is required']"
                color="orange"
                @change="getCategory()"
            ></v-combobox>
            <v-combobox
                outlined
                label="Sub Category"
                :items="sub_category"
                v-model="product_information.sub_category_id"
                color="orange"
                @change="getSubCategory()"
            ></v-combobox>

            <v-radio-group v-model="product_information.is_vatable" row>
                <v-radio
                    label="Vatable"
                    :value="1"
                    color="orange"
                ></v-radio>
                <v-radio
                    label="Non-Vat"
                    :value="2"
                    color="orange"
                ></v-radio>
            </v-radio-group>
            <center>
                    <v-col sm="12" md="12">
                        <v-btn
                        color="orange"
                        block
                        outlined
                        @click="validate()"
              id="btn-next" class="btn btn-primary btn-sm p-2" style="font-size: 12px;"
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
        v-model="editfullscreendialog"
        fullscreen
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
                    <v-btn icon dark @click="CloseDialogFullScreen()">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-toolbar-title>Edit Product Information</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                    </v-toolbar-items>
                </v-toolbar>
                
               
                <v-col sm="12" md="6" offset-md="3" class="mt-3 text-center"> 
                    <h4>Note: Here you can edit product information.</h4>
                </v-col>
                <v-col sm="12" md="6" offset-md="3">
                <template>
                <center>
                  <v-img v-if="imagechange==1" :src="url"></v-img>
                  <v-img v-else :src="this.image_path+prod_image"></v-img>
              </center>
                <v-file-input 
                color="orange"
                accept="image/*"
                label="Upload Image"
                prepend-icon="mdi-camera"
                @change="Preview_image_update()"
                v-model="prod_image">
                </v-file-input>
            </template>
            
            <v-text-field
                v-model="product_information.name"
                label="Product Name"
                required
                outlined
                 :counter="50"
                 :rules="nameRules"
                color="orange"
            ></v-text-field>
            <v-text-field
                v-model="product_information.description"
                label="Description"
                required
                outlined
                 :counter="50"
                 :rules="nameRules"
                color="orange"
            ></v-text-field>
            <v-text-field
                v-model="this.sku"
                label="SKU"
                required
                outlined
                color="orange"
                readonly=""
            ></v-text-field>
            <v-text-field
                v-model="product_information.barcode"
                label="Barcode"
                required
                outlined
                 :counter="50"
                 :rules="nameRules"
                color="orange"
            ></v-text-field>
            <v-text-field
                v-model="product_information.cost"
                label="Cost"
                required
                outlined
                 :counter="13"
                 :rules="numberRules"
                 @keypress="filter(event)"
                color="orange"
            ></v-text-field>
            <v-text-field
                v-model="product_information.selling_price"
                label="Price"
                required
                outlined
                 :counter="13"
                 :rules="numberRules"
                 @keypress="filter(event)"
                color="orange"
            ></v-text-field>
            <v-combobox
                outlined
                label="Unit"
                :items="unit"
                v-model="product_information.unit_id"
                  :rules="[v => !!v || 'Unit Information is required']"
                  @change="getUnit()"
                color="orange"
            ></v-combobox>
            <v-combobox
                outlined
                label="Unit Conversion"
                :items="unit_conversion"
                v-model="product_information.conversion_id"
                color="orange"
                @change="getUnitConversion()"
            ></v-combobox>
            <v-combobox
                outlined
                label="Department"
                :items="department"
                v-model="product_information.department_id"
                  :rules="[v => !!v || 'Department Information is required']"
                color="orange"
                @change="getDepartment()"
            ></v-combobox>
            <v-combobox
                outlined
                label="Category"
                :items="category"
                v-model="product_information.category_id"
                  :rules="[v => !!v || 'Category Information is required']"
                color="orange"
                @change="getCategory()"
            ></v-combobox>
            <v-combobox
                outlined
                label="Sub Category"
                :items="sub_category"
                v-model="product_information.sub_category_id"
                color="orange"
                @change="getSubCategory()"
            ></v-combobox>
            <v-radio-group v-model="product_information.is_vatable" row>
                <v-radio
                    label="Vatable"
                    :value="1"
                    color="orange"
                ></v-radio>
                <v-radio
                    label="Non-Vat"
                    :value="2"
                    color="orange"
                ></v-radio>
            </v-radio-group>
                
                <center>
                        <v-btn
                        color="orange"
                        block
                        outlined
                        @click="valid == false ? validationfalse() : changeStatusDialogEditAll(true)"
                        >
                        Update
                      </v-btn>
                    </center>
                  </v-col>
                </v-form>
            </v-card>
      </v-dialog>

      <v-row justify="center">
          <v-dialog
            v-model="editconfirmationall"
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
            @click="changeStatusDialogEditAll(false)"
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
            @click="confirmUpdateall()"
            >
            Confirm
          </v-btn>
        </center>
        <br>    
            </v-card>
          </v-dialog>
        </v-row>
  </v-container>
    
</template>

<script>

  import inventoryservices from "../services/inventoryservices";
  import departmentservices from "../services/departmentservices";
  import categoryservices from "../services/categoryservices";
  import subcategoryservices from "../services/subcategoryservices";
  import unitservices from "../services/unitservices";
  import prodtypeservices from "../services/prodtypeservices";

  export default {
    name: 'Inventory',
    data: () => ({
      imagechange : 0,
      editfullscreendialog : false,
      editconfirmationall : false,
      menucolumn: false,
        page: 1,
        pageCount: 0,
        dialog: false,
        loading: false,
        search: '',
        headers:[],
        selectedHeaders: [],
        headersMap: [
          {
            text: 'Image',
            align: 'start',
            sortable: false,
            value: 'product_image',
          },
          {
            text: 'Product Name',
            align: 'start',
            sortable: true,
            value: 'name',
          },
          { text: 'Description',sortable: false, value: 'description' },
          { text: 'SKU',sortable: false, value: 'sku' },
          { text: 'Barcode', sortable: false,value: 'barcode' },
          { text: 'Cost',sortable: false, value: 'cost' },
          { text: 'Price',sortable: false, value: 'selling_price' },
          { text: 'Type',sortable: false, value: 'product_type' },
          { text: 'Department',sortable: false, value: 'department' },
          { text: 'Category',sortable: false, value: 'category' },
          { text: 'Sub Category',sortable: false, value: 'sub_category' },
          { text: 'Vatable', sortable: false,value: 'is_vatable' },
          { text: 'Created By',sortable: false, value: 'created_info.created_by' },
          { text: 'Created At',sortable: false, value: 'created_at' },
          { text: 'Action',sortable: false, value: 'id' }
        ],
        product: [],
        product_type: [],
        unit: [],
        unit_conversion: [],
        department: [],
        category: [],
        sub_category: [],
        newunit:{
            name:'',
            initial: '',
        },
        newunitconversion:[],
        newunitconversions:[],
        newconversionunit:[],
        conversion_value: 0,
        conversion_unit: [],
        product_information: {
            parent_user_id: 0,
            name: '',
            description: '',
            barcode: '',
            cost: 0.0000,
            selling_price: 0.0000,
            product_type_id: null,
            unit_id: null,
            conversion_id: null,
            department_id: null,
            category_id: null,
            sub_category_id: null,
            is_vatable: 1,
            created_by: 0,
            last_update_by: 0,
            img_type: 0,
            created_info: {
                personal_information: []
            }
        },
        selected: { text: '', value: '' },
        valid: true,
        nameRules: [
        v => !!v || 'This is a require field',
        v => (v && v.length <= 50) || 'Name must be more than 1 characters',
        ],
        numberRules: [
        v => !!v || 'Number is required',
        v => (v && v.length <= 13) || 'Number must be less than 13 numbers',
        ],
        confirmation: false,
        saveconfirmation: false,
        editconfirmation: false,
        uploadconfirmation: false,
        uploadimageconfirmation: false,
        addunitdialog: false,
        addunitconversiondialog: false,
        adddepartmentdialog: false,
        addcategorydialog: false,
        addsubcategorydialog: false,
        department_information: {
            name: ''
        },
        category_information: {
            name: ''
        },
        sub_category_information: {
            name: ''
        },
        sku: 0,
        url: "",
        prod_id: 0,
        prod_image: null,
        image_path: [],
        foDelete: {
            id: 0,
            data: ''
        },
        foUpdate: {
            id: 0,
            name: '',
            value: ''
        }
    }),
    created(){
        this.$store.state.header = true;
        this.$store.state.footer = true;
        this.$store.state.snackbar.color = 'orange';
        this.FetchProductInformation();
        this.headers = Object.values(this.headersMap);
        this.selectedHeaders = this.headers;      
        this.FetchProductTypeInformation();
        this.FetchDepartmentInformation();
        this.FetchCategoryInformation();
        this.FetchSubCategoryInformation();  
        this.FetchUnitInformation();
    },
    mounted(){
        this.$store.state.title = "Product List Information";
    },
    computed: {
      //Done to get the ordered headers
      showHeaders () {
        return this.headers.filter(s => this.selectedHeaders.includes(s));
      }
    },
    methods: {

      // uploading file
        uploadFile() {
          this.Images = this.$refs.file.files[0];
        },

        // preview image
        Preview_image() {
          if(!this.prod_image){
            this.url=null;
            return;
          } 
          this.url= URL.createObjectURL(this.prod_image);
        },

        // file open trigger
        uploadfileopen() {
          this.uploadconfirmation = true;
        },


        // check pop up message status
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
            this.FetchProductInformation();
        },
        changeStatusDialogUploadImageProduct(status){
            this.uploadimageconfirmation = status;
            this.FetchProductInformation();
        },
        changeStatusDialogUnit(status){
            this.addunitdialog = status;
            this.FetchUnitInformation();
            if(status==false){
                this.product_information.unit_id = null
                this.FetchUnitInformation();
            }
        },
        changeStatusDialogUnitConversion(status){
            this.addunitconversiondialog = status;
            if(status==false){
                this.product_information.conversion_id = null
            }
        },
        changeStatusDialogDepartment(status){
            this.adddepartmentdialog = status;
            if(status==false){
                this.product_information.department_id = null
            }
        },
        changeStatusDialogCategory(status){
            this.addcategorydialog = status;
            if(status==false){
                this.product_information.category_id = null
            }
        },
        changeStatusDialogSubCategory(status){
            this.addsubcategorydialog = status;
            if(status==false){
                this.product_information.sub_category_id = null
            }
        },
        // end check pop up message status

        // prevent typing alphabet
        filter: function(evt) {
        evt = (evt) ? evt : window.event;
        let expect = evt.target.value.toString() + evt.key.toString();
        
        if (!/^[-+]?[0-9]*\.?[0-9]*$/.test(expect)) {
            evt.preventDefault();
        } else {
            return true;
        }
        },

        // uploading image
        uploadImage(id){
            this.prod_image = null;
            this.url = null;
            this.prod_id = id
            this.uploadimageconfirmation = true
        },
        // get unit information
        getUnit(){
            if(this.product_information.unit_id.value === 0){
                this.addunitdialog=true
            }else{
            this.unit_conversion = [];
            this.product_information.conversion_id = "";
            this.FetchUnitConversionInformation(this.product_information.unit_id.value)
            }
        },

        // get unit conversion information
        getUnitConversion(){
            if(this.product_information.conversion_id.value === 0){
                this.addunitconversiondialog=true
                this.newunitconversions.push({
                    text: this.product_information.unit_id.text,
                    value: this.product_information.unit_id.value
                });
                this.newunitconversion = this.newunitconversions[0];
                this.FetchAddUnitConversionInformation(this.newunitconversion.value)
            }
        },
        
        // get department information
        getDepartment(){
            if(this.product_information.department_id.value === 0){
                this.adddepartmentdialog=true
            }
        },

        // get category information
        getCategory(){
            if(this.product_information.category_id.value === 0){
                this.addcategorydialog=true
            }
        },

        // get sub category information
        getSubCategory(){
            if(this.product_information.sub_category_id.value === 0){
                this.addsubcategorydialog=true
            }
        },

        // add unit information
        AddUnitInformation(){
            let payload = {
                unit_information: JSON.stringify({
                name:this.newunit.name,
                initial:this.newunit.initial,
                flag:1
            })
            };
            unitservices.saveUnitInformation(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    this.addunitdialog = false
                    this.FetchUnitInformation();
                    this.product_information.unit_id=null;
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

        // add department information
        AddDepartmentInformation(){
            let payload = {
                department_information: JSON.stringify(this.department_information)
            };
            departmentservices.saveDepartmentInformation(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    this.adddepartmentdialog = false;
                    this.FetchDepartmentInformation();
                    this.product_information.department_id=null;
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

        // add category information
        AddCategoryInformation(){
            let payload = {
                category_information: JSON.stringify(this.category_information)
            };
            categoryservices.saveCategoryInformation(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    this.addcategorydialog = false;
                    this.FetchCategoryInformation();
                    this.product_information.category_id=null;
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

        // add sub category information
        AddSubCategoryInformation(){
            let payload = {
                sub_category_information: JSON.stringify(this.sub_category_information)
            };
            subcategoryservices.saveSubCategoryInformation(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    this.addsubcategorydialog = false;
                    this.FetchSubCategoryInformation();
                    this.product_information.sub_category_id=null;
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

        // get product information
        FetchProductInformation(){

            let payload = {
                user_id: this.$store.getters.getParentID
            };
            inventoryservices.fetchProductInformation(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    this.product = response.data.result;
                    this.image_path = response.data.img_path;
                }
            }).catch(error => console.log(error));

        },

        // get latest SKU
        FetchSKUInformation(){
            let payload = {
              parent_id: this.$store.getters.getParentID
            };
            inventoryservices.fetchSKUInformation(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                  this.sku = response.data.result
                }
            }).catch(error => console.log(error));

        },

        // get product type information
        FetchProductTypeInformation(){
            let payload = {
                user_id: this.$store.getters.getParentID
            };
            prodtypeservices.fetchProductTypeInformation(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    response.data.result.forEach((value) => {
                        this.product_type.push({
                            text: value.name,
                            value: value.id
                        });
                    });
                }
            }).catch(error => console.log(error));

        },

        // get unit information
        FetchUnitInformation(){
            
            let payload = {
                user_id: this.$store.getters.getParentID
            };

            unitservices.fetchUnitInformation(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    this.unit.push({
                            text: "+ Add Unit",
                            value: 0
                        });
                    response.data.result.forEach((value) => {
                        this.unit.push({
                            text: value.name,
                            value: value.id
                        });
                    });
                }
            }).catch(error => console.log(error));

        },

        // get unit conversion information
        FetchAddUnitConversionInformation(id){
            let payload = {
                user_id: this.$store.getters.getParentID,
                unit_id: id
            };

            unitservices.fetchUnitInformationTo(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    console.log(response.data.result);
                    
                    response.data.result.forEach((value) => {
                        this.newconversionunit.push({
                            text: value.name+" ("+value.initial+")",
                            value: value.id
                        });
                    });
                    
                }
            }).catch(error => console.log(error));
        },

        // save new unit conversion
        AddUnitConversionInformation(){
            
            let payload = {
                  unit_conversion: JSON.stringify({
                  parent_user_id: this.$store.getters.getParentID,
                  unit_id:this.newunitconversion.value,
                  unit_conversion_id:this.conversion_unit.value,
                  value:this.conversion_value,
                  flag:1,
                  created_by: this.$store.getters.getUserID
                })
              };

              unitservices.saveUnitConversionInformation(payload, this.$store.getters.getAccessToken).then(response => {
                  if(response.data.success){
                    this.addunitconversiondialog = false
                    this.FetchUnitConversionInformation(this.product_information.unit_id.value)
                    this.product_information.conversion_id=null;
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

        // get unit conversion information
        FetchUnitConversionInformation(id){
            
            let payload = {
                user_id: this.$store.getters.getParentID,
                unit_id: id
            };

            unitservices.fetchUnitConversionInformation(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    if(response.data.result.length == 0){
                        this.unit_conversion = [];

                        this.unit_conversion.push({
                            text: "+ Add Unit Conversion",
                            value: 0
                        });
                    }else{
                    response.data.result.forEach((value) => {

                        this.unit_conversion.push({
                            text: "+ Add Unit Conversion",
                            value: 0
                        });
                        this.unit_conversion.push({
                            text: value.conversion_info.name+" ("+parseFloat(value.value).toFixed(0)+value.conversion_info.initial+")",
                            value: value.id
                        });
                    });
                    }
                }
            }).catch(error => console.log(error));

        },

        // add product fetching all
        AddProduct(){
            this.url = null;
            this.prod_image = null;
            this.dialog = true;
            this.SetNewProductInformation();
            this.FetchProductTypeInformation();
            this.FetchUnitInformation();
            this.FetchSKUInformation();
            this.FetchDepartmentInformation();
            this.FetchCategoryInformation();
            this.FetchSubCategoryInformation();
        },

        // get department information
        FetchDepartmentInformation(){

            let payload = {
                user_id: this.$store.getters.getParentID
            };

            departmentservices.fetchDepartmentInformation(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    response.data.result.forEach((value) => {

                        this.department.push({
                            text: "+ Add Department",
                            value: 0
                        });
                        this.department.push({
                            text: value.name,
                            value: value.id
                        });
                    });
                }
            }).catch(error => console.log(error));

        },

        // get category information
        FetchCategoryInformation(){

            let payload = {
                user_id: this.$store.getters.getParentID
            };

            categoryservices.fetchCategoryInformation(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    response.data.result.forEach((value) => {


                        this.category.push({
                            text: "+ Add Category",
                            value: 0
                        });
                        this.category.push({
                            text: value.name,
                            value: value.id
                        });
                    });
                }
            }).catch(error => console.log(error));

        },

        // get sub category information
        FetchSubCategoryInformation(){

            let payload = {
                user_id: this.$store.getters.getParentID
            };

            subcategoryservices.fetchSubCategoryInformation(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    response.data.result.forEach((value) => {

                        this.sub_category.push({
                            text: "+ Add Sub Category",
                            value: 0
                        });

                        this.sub_category.push({
                            text: value.name,
                            value: value.id
                        });
                    });
                }
            }).catch(error => console.log(error));

        },

        // clear all fields
        SetNewProductInformation(){
            this.product_information = {
                parent_user_id: this.$store.getters.getParentID,
                name: '',
                description: '',
                barcode: '',
                cost: 0.0000,
                selling_price: 0.0000,
                product_type_id: null,
                unit_id: null,
                conversion_id: null,
                department_id: null,
                category_id: null,
                sub_category_id: null,
                is_vatable: 1,
                img_type: 1,
                created_by: this.$store.getters.fetchUserInfo.account_information.id,
                last_update_by: this.$store.getters.fetchUserInfo.account_information.id
            };
        },

        // form validation
        validate(){

            let val = this.$refs.form.validate();

            if(val){
                this.confirmSave();
            }
        },

        // save confirmation
        confirmSave(){
            this.saveconfirmation = true
        },

        // clear product informations
        ClearSaveProducts(){
            this.product_information.name = '';
            this.product_information.description = '';
            this.product_information.sku = '';
            this.product_information.barcode = '';
            this.product_information.cost = 0.0000;
            this.product_information.selling_price = 0.0000;
            this.product_information.product_type_id = null;
            this.product_information.unit_id = null;
            this.product_information.conversion_id = null;
            this.product_information.department_id = null;
            this.product_information.category_id = null;
            this.product_information.sub_category_id = null;
        },

        // save product informations
        SaveProductInformation(){
            this.product_information['category_id'] = this.product_information.category_id.value
            if(this.product_information.sub_category_id!=null){
            this.product_information['sub_category_id'] = this.product_information.sub_category_id.value
            }
            this.product_information['department_id'] = this.product_information.department_id.value
            this.product_information['unit_id'] = this.product_information.unit_id.value
            this.product_information['conversion_id'] = this.product_information.conversion_id.value
            this.product_information['img_type'] = 1
            this.product_information['product_type_id'] = 1
            const formData = new FormData();
            formData.append('file', this.prod_image);
            formData.append('product_information', JSON.stringify(this.product_information))
            inventoryservices.saveProductInformation(formData, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    this.FetchProductInformation();
                    this.ClearSaveProducts();
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

        // confirm update
        confirmUpdate(){
            let payload = {
                id: this.foUpdate['id'],
                name: this.foUpdate['name'],
                value: this.foUpdate['value']
            }
            inventoryservices.updateProductInformation(payload, this.$store.getters.getAccessToken).catch(error => console.log(error));
            this.$store.state.snackbar.message = 'Product information has been updated.';
            this.$store.state.snackbar.show = true;
            this.FetchProductInformation();
            this.editconfirmation = false
            this.$store.state.snackbar.colors = 'xgreen';
                    this.$store.state.snackbar.icon = "mdi-check-circle-outline";                                  
        },

        // add new image
        AddImageProductInformation(){

            const formData = new FormData();
            formData.append('file', this.prod_image);
            formData.append('id', this.prod_id)
            formData.append('img_type', 1)

            inventoryservices.updateImageProductInformation(formData, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    this.FetchProductInformation();
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

        // updating product information
        UpdateProductInformation(id, name, value){

            this.foUpdate = {
                id: id,
                name: name,
                value: value
            }
            this.editconfirmation = true

        },

        // set combobox value
        SetEditCombobox(text, value, action){

            this.selected = {
                text: text,
                value: value
            };
            if(action=="product_type"){
                this.FetchProductTypeInformation();
            }
            else if(action=="department"){
                this.FetchDepartmentInformation();
            }
            else if(action=="category"){
                this.FetchCategoryInformation();
            }
            else if(action=="sub_category"){
                this.FetchSubCategoryInformation();
            }

        },
        

        // save edit combo box
        SaveEditCombobox(item, action){

            if(action=="product_type"){
                item.name = this.selected.text;
                this.UpdateProductInformation(item.id, 'product_type_id', this.selected.value);
            }
            else if(action=="department"){
                item.department_info.name = this.selected.text;
                this.UpdateProductInformation(item.id, 'department_id', this.selected.value);
            }
            else if(action=="category"){
                item.category_info.name = this.selected.text;
                this.UpdateProductInformation(item.id, 'category_id', this.selected.value);
            }
            else if(action=="sub_category"){
                item.sub_category_info.name = this.selected.text;
                this.UpdateProductInformation(item.id, 'sub_category_id', this.selected.value);
            }

        },

        // confirmation delete
        confirmDelete(){
            this.product.splice(this.product.indexOf(this.foDelete['data']), 1);

            let payload = {
                id: this.foDelete['id']
            };
            console.log(payload)
            inventoryservices.removeProductInformation(payload, this.$store.getters.getAccessToken).catch(error => console.log(error));

            this.$store.state.snackbar.message = 'Product information has been removed.';
            this.$store.state.snackbar.show = true;
            this.confirmation = false
            this.$store.state.snackbar.colors = 'xgreen';
            this.$store.state.snackbar.icon = "mdi-check-circle-outline";                      
        },

        // delete product information
        RemoveProductInformation(id, data){
            this.foDelete = {
                id: id,
                data: data
            }
            this.confirmation = true
        },

        // downloading xlsx template
        DownloadTemplate(){

          let payload = {
              user_id: 0
          };

          inventoryservices.downloadTemplate(payload, this.$store.getters.getAccessToken)
          .then(response => {
              const url = window.URL.createObjectURL(new Blob([response.data]))
              const link = document.createElement('a')
              link.href = url
              link.setAttribute('download','Product_format.xlsx')
              document.body.appendChild(link)
              link.click()
          }).catch(error => console.log(error));

          },

          // import xlsx using template
          ImportProductInformation() {

            let loader = this.$loading.show();

            const formData = new FormData();
            formData.append('file', this.Images);
            formData.append('created_by', this.$store.getters.getUserID);
            formData.append('parent_user_id', this.$store.getters.getParentID);
            const headers = { 'Content-Type': 'multipart/form-data' };
            inventoryservices.importProductInformation(formData,headers, this.$store.getters.getAccessToken)
            .then(response => {
                console.log(response.data.success)
                    loader.hide();

            this.$store.state.snackbar.message = 'Product information has been imported.';
            this.$store.state.snackbar.show = true;
            this.$store.state.snackbar.colors = 'xgreen';
                    this.$store.state.snackbar.icon = "mdi-check-circle-outline";                                  
            this.FetchProductInformation();
            this.uploadconfirmation = false
            }).catch(error => console.log(error));

          },

          // update product information
          UpdateAllProductInformation(id, item){
            console.log(id, item);
            this.sku = item.sku,
            this.product_information.product_type_id = item.product_type_id,
            this.prod_image = item.image
            this.product_information.name = item.name
            this.product_information.description = item.description
            this.product_information.barcode = item.barcode
            this.product_information.cost = item.cost
            this.product_information.selling_price = item.selling_price
            this.product_information.unit_id = ({
                                                  text: item.unit_info.name,
                                                  value: item.unit_info.id
                                              });
            if(item.conversion_id != 0){
              this.product_information.conversion_id = ({
                                                  text: item.unit_conversion_info.value,
                                                  value: item.unit_conversion_info.id
                                              });
            }else{
              this.product_information.conversion_id = ({
                                                  text: item.unit_info.initial,
                                                  value: item.conversion_id
                                              });
            }
            this.product_information.department_id = ({
                                                  text: item.department_info.name,
                                                  value: item.department_info.id
                                              });
            this.product_information.category_id  = ({
                                                  text: item.category_info.name,
                                                  value: item.category_info.id
                                              });
            this.product_information.sub_category_id = ({
                                                  text: item.sub_category_info.name,
                                                  value: item.sub_category_info.id
                                              });
            this.product_information.is_vatable = item.is_vatable

            this.forAllUpdate = {
                id: id,
            }

            this.editfullscreendialog = true
        },

        // close dialog
        CloseDialogFullScreen(){
            this.editfullscreendialog = false
        },

        // validation 
        validationfalse(){
            this.$refs.form.validate()
        },

        // dialog status edit all
        changeStatusDialogEditAll(status){
          this.editconfirmationall = status;
        },

        // update all confirmation
        confirmUpdateall(){
          this.product_information = ({
            parent_user_id : this.$store.getters.getParentID,
            name  : this.product_information.name,
            description  : this.product_information.description,
            barcode  : this.product_information.barcode,
            cost  : this.product_information.cost,
            selling_price  : this.product_information.selling_price,
            unit_id  : this.product_information.unit_id.value,
            conversion_id  : this.product_information.conversion_id.value,
            department_id  : this.product_information.department_id.value,
            category_id  : this.product_information.category_id.value,
            sub_category_id  : this.product_information.sub_category_id.value,
            is_vatable  : this.product_information.is_vatable,
            product_type_id  : this.product_information.product_type_id,
            last_update_by: this.$store.getters.fetchUserInfo.account_information.id
          })
        
          console.log(this.product_information)
            const formData = new FormData();
            formData.append('img_type', 1);
            formData.append('id', this.forAllUpdate.id);
            formData.append('file', this.prod_image);
            formData.append('product_information', JSON.stringify(this.product_information))

            inventoryservices.UpdateInventoryRowsInformations(formData, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    this.FetchProductInformation();
                    this.ClearSaveProducts();
                    this.dialog = false;
                    this.$store.state.snackbar.message = response.data.message;
                    this.$store.state.snackbar.show = true;
                    this.editconfirmationall = false
                    this.editfullscreendialog = false
                    this.$store.state.snackbar.colors = 'xgreen';
                    this.$store.state.snackbar.icon = "mdi-check-circle-outline";                      
                }
            }).catch(error => {console.log(error)
              this.$store.state.snackbar.colors = 'xred';
                      this.$store.state.snackbar.icon = "mdi-alert-outline";                                          
                    });
        },

        // image preview
        Preview_image_update()
        {
            this.imagechange = 1
          this.url = URL.createObjectURL(this.prod_image);
        },
    }
  }
</script>

<style scoped>
.v-data-table .v-data-table-header tr th {
  font-size: 24px !important;
}

input[type=checkbox] {
  accent-color: orange;
}
</style>