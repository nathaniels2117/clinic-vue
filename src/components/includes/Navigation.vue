<template>
  <v-sheet>

    <router-view>
    </router-view>

    <v-navigation-drawer v-model="drawer" permanent app v-if="showNav">
      <br>
      <v-list-item class="text-center">
        <v-img v-if="profile_picture != null" max-width="60"
          class="pa-7 rounded-circle d-inline-block align-self-stretch mt-2 mb-2" style="margin: 0px auto;"
          :src="imagepath + profile_picture"></v-img>
        <v-img v-else src="../../assets/images/tldc_logo.png" max-width="60" class="mt-2 mb-2"
          style="margin: 0px auto;"></v-img>
      </v-list-item>
      <v-list-item @click="Profile()">
        <v-list-item-content>
          <v-list-item-title style="font-size: 12px;">{{
            this.$store.getters.fetchUserInfo.account_information.personal_information.firstname }} {{
              this.$store.getters.fetchUserInfo.account_information.personal_information.lastname }}</v-list-item-title>
          <v-list-item-subtitle style="font-size: 12px;">{{ this.$store.getters.fetchUserInfo.account_information.email
          }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <!-- Wirewolf HRIS Navigation Start -->

        <div>
          <!-- <v-subheader>HRIS</v-subheader> -->
          <v-subheader>Main Menu</v-subheader>
          <v-list-item link @click="ClinicDashboard()">

            <v-list-item-icon>
              <v-icon>mdi-monitor-dashboard</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Dashboard</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item link @click="PatientInformation()">

            <v-list-item-icon>
              <v-icon>mdi-account-multiple</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Patient Information</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item link @click="PatientDiagnosis()">

            <v-list-item-icon>
              <v-icon>mdi-stethoscope</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Patient Diagnosis</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item link @click="PharmacyItem()">

            <v-list-item-icon>
              <v-icon>mdi-pill</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Pharmacy Item</v-list-item-title>
            </v-list-item-content>
          </v-list-item>


          <v-list-item link @click="ClinicSchedule()">

            <v-list-item-icon>
              <v-icon>mdi-calendar</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Schedule</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item link @click="PatientPayment()">

            <v-list-item-icon>
              <v-icon>mdi-cash </v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Payment</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

        </div>

        <!-- Wirewolf Settings Start -->
        <div
          v-if="$store.getters.valParent() || $store.getters.valAccess(165) || $store.getters.valAccess(166) || $store.getters.valAccess(167) || $store.getters.valAccess(168) || $store.getters.valAccess(169) || $store.getters.valAccess(170) || $store.getters.valAccess(171) || $store.getters.valAccess(172) || $store.getters.valAccess(173) || $store.getters.valAccess(174) || $store.getters.valAccess(175) || $store.getters.valAccess(176) || $store.getters.valAccess(177) || $store.getters.valAccess(178) || $store.getters.valAccess(179) || $store.getters.valAccess(180) || $store.getters.valAccess(181) || $store.getters.valAccess(182) || $store.getters.valAccess(183) || $store.getters.valAccess(184) || $store.getters.valAccess(185) || $store.getters.valAccess(215) || $store.getters.valAccess(245) || $store.getters.valAccess(250)">
          <v-subheader>Settings</v-subheader>
          <v-list-item link @click="Company()"
            v-if="$store.getters.valParent()">
            <v-list-item-icon>
              <v-icon>mdi-domain</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Company</v-list-item-title>
            </v-list-item-content>
          </v-list-item>


          <v-list-item link @click="PharmacyCategory()">

            <v-list-item-icon>
              <v-icon>mdi-folder-outline</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Pharmacy Category</v-list-item-title>
            </v-list-item-content>
          </v-list-item>


          <v-list-item link @click="Instruction()">

            <v-list-item-icon>
              <v-icon>mdi-note-text</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Instruction</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item link @click="ClinicServices()">

            <v-list-item-icon>
              <v-icon>mdi-hand-heart</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Services</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item link @click="PatientDiscount()">

            <v-list-item-icon>
              <v-icon>mdi-label-percent</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Discount</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <!--
          <div>
            <v-list-group prepend-icon="mdi-cog" no-action color="purple">
              <template v-slot:activator>
                <v-list-item-content>
                  <v-list-item-title>Settings</v-list-item-title>
                </v-list-item-content>
              </template>

<v-list-item link @click="Role()" v-if="$store.getters.valAccess(165)">
  <v-list-item-content>
    <v-list-item-title>
      Access Rights
    </v-list-item-title>
  </v-list-item-content>
</v-list-item>

<v-list-item link @click="Announcement()">
  <v-list-item-content>
    <v-list-item-title>
      Announcement
    </v-list-item-title>
  </v-list-item-content>
</v-list-item>
</v-list-group>
</div>
-->
        </div>
        <v-list-item link @click="gotoposdashboard()" v-if="this.subtype.includes(0) && this.subtype.includes(1)">
          <v-list-item-icon>
            <v-icon>mdi-printer-pos-outline</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>POS</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <!-- Wirewolf Settings End -->

        <!-- Wirewolf HRIS Navigation End -->
        <v-subheader>Logout</v-subheader>
        <v-list-item link @click="Logouthris()">
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

    </v-navigation-drawer>
  </v-sheet>
</template>

<script>

import loginservices from '../services/loginservices';
import userservices from '../services/userservices';

export default {
  data: () => ({
    subtype: [],
    hrisdata: '',
    imagepath: '',
    profile_picture: '',
    textqrcode: '',
    qrcodescanner: false,
    notificationnumber: 2,
    opacity: true,
    is_parent: false,
    drawer: false,
  }),
  created() {
    this.validateIsLogin()
    this.GetUser()
    this.hrisdata = localStorage.getItem('is_hris')
    this.subtype = localStorage.getItem('sub_type')
  },
  computed: {
    showNav() {
      return localStorage.getItem('nav_hide') !== '1'
    }
  },
  methods: {
    validateIsLogin() {
      loginservices.validateIsLogin(this.$store.getters.fetchUserInfo.access_token).then(response => {
        if (response.status == 401) {
          localStorage.removeItem('userinfo');
          window.location.reload()
        }
      }).catch(error => {
        console.log(error);
        if (error.response && error.response.status === 401) {
          localStorage.removeItem('userinfo');
          window.location.reload();
        }
      });
    },
    Dashboard() {
      this.validateIsLogin()
      this.$store.state.isChat = 0
      this.$router.push('/dashboard');
    },
    PatientInformation() {
      this.validateIsLogin()
      this.$store.state.isChat = 0
      this.$router.push('/patientinformation');
    },
    PharmacyCategory() {
      this.validateIsLogin()
      this.$store.state.isChat = 0
      this.$router.push('/pharmacycategory');
    },
    PharmacyItem() {
      this.validateIsLogin()
      this.$store.state.isChat = 0
      this.$router.push('/pharmacyitem');
    },
    PatientDiagnosis() {
      this.validateIsLogin()
      this.$store.state.isChat = 0
      this.$router.push('/patientdiagnosis');
    },
    Instruction() {
      this.validateIsLogin()
      this.$store.state.isChat = 0
      this.$router.push('/instruction');
    },
    ClinicServices() {
      this.validateIsLogin()
      this.$store.state.isChat = 0
      this.$router.push('/services');
    },
    ClinicSchedule() {
      this.validateIsLogin()
      this.$store.state.isChat = 0
      this.$router.push('/clinicschedule');
    },
    PatientDiscount() {
      this.validateIsLogin()
      this.$store.state.isChat = 0
      this.$router.push('/patientdiscount');
    },
    PatientPayment() {
      this.validateIsLogin()
      this.$store.state.isChat = 0
      this.$router.push('/patientpayment');
    },
    Company() {
      this.validateIsLogin()

      this.$store.state.isChat = 0
      this.$router.push('/company');
    },
    Profile() {
      this.validateIsLogin()

      this.$store.state.isChat = 0
      this.$router.push('/profile');
    },
    Logout() {
      this.validateIsLogin()

      this.$store.state.isChat = 0
      loginservices.userLogout(this.$store.getters.fetchUserInfo.access_token).then(response => {
        if (response.data.success) {
          this.$store.state.userinfo = [];
          localStorage.clear();
          // this.$router.push('/login');
          // window.location('login')

          window.location.href = process.env.VUE_APP_LOGOUT;
        }
      }).catch(error => console.log(error));
    },
    Users() {
      this.validateIsLogin()

      this.$store.state.isChat = 0
      this.$router.push('/users');
    },
    EmailConfirm() {
      this.validateIsLogin()

      this.$store.state.isChat = 0
      this.$router.push('/emailconfirm');
    },
    TicketConfirm() {
      this.$router.push('/ticketconfirm');
    },
    Product() {
      this.validateIsLogin()
      this.$store.state.isChat = 0
      this.$router.push('/product');
    },
    Supplier() {
      this.validateIsLogin()

      this.$store.state.isChat = 0
      this.$router.push('/supplier');
    },
    Discount() {
      this.validateIsLogin()

      this.$store.state.isChat = 0
      this.$router.push('/discount');
    },
    SalesReport() {
      this.validateIsLogin()

      this.$store.state.isChat = 0
      this.$router.push('/salesreport');
    },
    VoidReport() {
      this.validateIsLogin()

      this.$store.state.isChat = 0
      this.$router.push('/voidreport');
    },
    PaymentSummaryReport() {
      this.validateIsLogin()

      this.$store.state.isChat = 0
      this.$router.push('/paymentsummaryreport');
    },
    DiscountSummaryReport() {
      this.validateIsLogin()

      this.$store.state.isChat = 0
      this.$router.push('/discountsummaryreport');
    },
    CashFundReport() {
      this.validateIsLogin()

      this.$store.state.isChat = 0
      this.$router.push('/cashfundreport');
    },
    PayoutReport() {
      this.validateIsLogin()

      this.$store.state.isChat = 0
      this.$router.push('/payoutreport');
    },
    ItemSummaryReport() {
      this.validateIsLogin()

      this.$store.state.isChat = 0
      this.$router.push('/itemsummaryreport');
    },
    Department() {
      this.validateIsLogin()

      this.$store.state.isChat = 0
      this.$router.push('/department');
    },
    Category() {
      this.validateIsLogin()

      this.$store.state.isChat = 0
      this.$router.push('/category');
    },
    SubCategory() {
      this.validateIsLogin()

      this.$store.state.isChat = 0
      this.$router.push('/sub_category');
    },
    Branch() {
      this.validateIsLogin()

      this.$store.state.isChat = 0
      this.$router.push('/branch');
    },
    Devices() {
      this.validateIsLogin()

      this.$store.state.isChat = 0
      this.$router.push('/devices');
    },
    Leave() {
      this.validateIsLogin()

      this.$store.state.isChat = 0
      this.$router.push('/leave');
    },
    Officialbusiness() {
      this.validateIsLogin()

      this.$store.state.isChat = 0
      this.$router.push('/officialbusiness');
    },
    Overtime() {
      this.validateIsLogin()

      this.$store.state.isChat = 0
      this.$router.push('/overtime');
    },
    Timesheetconfirmation() {
      this.validateIsLogin()

      this.$store.state.isChat = 0
      this.$router.push('/timesheetconfirmation');
    },
    Undertime() {
      this.validateIsLogin()

      this.$store.state.isChat = 0
      this.$router.push('/undertime');
    },
    Role() {
      this.validateIsLogin()

      this.$store.state.isChat = 0
      this.$router.push('/role');
    },
    // PaymentType(){
    //   this.validateIsLogin()

    //   this.$store.state.isChat = 0
    //   this.$router.push('/paymenttype');
    // },
    Billing() {
      this.validateIsLogin()

      this.$store.state.isChat = 0
      this.$router.push('/billing');
    },
    Inventory() {
      this.validateIsLogin()

      this.$store.state.isChat = 0
      this.$router.push('/inventory');
    },
    StockInventory() {
      this.validateIsLogin()

      this.$store.state.isChat = 0
      this.$router.push('/stocks');
    },
    // StockCard(){
    //   this.$router.push('/stockcard');
    // },
    StockIn() {
      this.validateIsLogin()

      this.$store.state.isChat = 0
      this.$router.push('/stockin');
    },
    StockOut() {
      this.validateIsLogin()

      this.$store.state.isChat = 0
      this.$router.push('/stockout');
    },
    TransferOut() {
      this.validateIsLogin()

      this.$store.state.isChat = 0
      this.$router.push('/transferout');
    },
    Disposal() {
      this.validateIsLogin()

      this.$store.state.isChat = 0
      this.$router.push('/disposal');
    },
    PhysicalCount() {
      this.validateIsLogin()

      this.$store.state.isChat = 0
      this.$router.push('/physicalcount');
    },
    // PhysicalCountDepartment(){
    //   this.$router.push('/physicalcountdepartment');
    // },
    Approvals() {
      this.validateIsLogin()

      this.$store.state.isChat = 0
      this.$router.push('/approval');
    },
    InventoryStockCard() {
      this.validateIsLogin()

      this.$store.state.isChat = 0
      this.$router.push('/stockcardreport');
    },
    InventoryReports() {
      this.validateIsLogin()

      this.$store.state.isChat = 0
      this.$router.push('/reports');
    },
    InventoryDetailedReports() {
      this.validateIsLogin()

      this.$store.state.isChat = 0
      this.$router.push('/detailreports');
    },
    Unit() {
      this.validateIsLogin()

      this.$store.state.isChat = 0
      this.$router.push('/units');
    },
    // UnitConversion(){
    //   this.$router.push('/unitsconversion');
    // },
    Locations() {
      this.validateIsLogin()

      this.$store.state.isChat = 0
      this.$router.push('/locations');
    },
    ProductType() {
      this.validateIsLogin()

      this.$store.state.isChat = 0
      this.$router.push('/producttype');
    },
    Remarks() {
      this.validateIsLogin()

      this.$store.state.isChat = 0
      this.$router.push('/remarks');
    },
    Division() {
      this.validateIsLogin()

      this.$store.state.isChat = 0
      this.$router.push('/division');
    },
    SampleNathaniel() {
      this.validateIsLogin()

      this.$store.state.isChat = 0
      this.$router.push('/samplenathaniel');
    },
    LeaveType() {
      this.validateIsLogin()

      this.$store.state.isChat = 0
      this.$router.push('/leavetype');
    },
    HrisForApproval() {
      this.validateIsLogin()

      this.$store.state.isChat = 0
      this.$router.push('/hrisforapproval');
    },
    EmployeeInformation() {
      this.validateIsLogin()

      this.$store.state.isChat = 0
      this.$router.push('/employeeinformation');
    },
    HrisListEmployee() {
      this.validateIsLogin()

      this.$store.state.isChat = 0
      this.$router.push('/hrislistemployee');
    },
    Schedule() {
      this.validateIsLogin()

      this.$store.state.isChat = 0
      this.$router.push('/schedule');
    },
    Timesheetlog() {
      this.validateIsLogin()

      this.$store.state.isChat = 0
      this.$router.push('/timesheetlog');
    },
    Ticket() {
      // this.validateIsLogin()

      // this.$store.state.isChat = 0
      this.$router.push('/ticket');
    },
    Cutoff() {
      this.validateIsLogin()

      this.$store.state.isChat = 0
      this.$router.push('/cutoff');
    },
    Announcement() {
      this.validateIsLogin()

      this.$store.state.isChat = 0
      this.$router.push('/announcement');
    },
    Checklist() {
      this.validateIsLogin()

      this.$store.state.isChat = 0
      this.$router.push('/checklist');
    },
    HrisDashboard() {
      this.validateIsLogin()

      this.$store.state.isChat = 0
      this.$router.push('/hrisdashboard');
    },
    LeaveBalance() {
      this.validateIsLogin()

      this.$store.state.isChat = 0
      this.$router.push('/leavebalance');
    },
    Tito() {
      this.validateIsLogin()
      this.$store.state.isChat = 0
      this.$router.push('/tito');
    },
    Titoadmin() {
      this.validateIsLogin()
      this.$store.state.isChat = 0
      this.$router.push('/titoadmin');
    },
    Userchecklist() {
      this.validateIsLogin()
      this.$store.state.isChat = 0
      this.$router.push('/userchecklist');
    },
    Holiday() {
      this.validateIsLogin()
      this.$store.state.isChat = 0
      this.$router.push('/holiday');
    },
    AccountabilityType() {
      this.validateIsLogin()
      this.$store.state.isChat = 0
      this.$router.push('/accountabilitytype');
    },
    AccountabilityField() {
      this.validateIsLogin()
      this.$store.state.isChat = 0
      this.$router.push('/accountabilityfield');
    },
    qrcodeshow() {
      this.textqrcode = "https://positive.com.ph/registeremployee/" + this.$store.getters.getParentID
      // this.textqrcode = "http://localhost:8080/registeremployee/" + this.$store.getters.getParentID
      this.qrcodescanner = true
      // window.open(this.textqrcode, "_blank");
    },
    ApprovalRegistration() {
      this.validateIsLogin()
      this.$store.state.isChat = 0
      this.$router.push('/registerapproval');
    },
    ClearanceForm() {
      this.validateIsLogin()
      this.$store.state.isChat = 0
      this.$router.push('/clearanceform');
    },
    ArchiveEmployee() {
      this.validateIsLogin()
      this.$store.state.isChat = 0
      this.$router.push('/archiveemployee');
    },
    EmployeeSchedule() {
      this.validateIsLogin()
      this.$store.state.isChat = 0
      this.$router.push('/employeeschedule');
    },
    Accountability() {
      this.validateIsLogin()
      this.$store.state.isChat = 0
      this.$router.push('/accountability');
    },
    OrganizationalChart() {
      this.validateIsLogin()
      this.$store.state.isChat = 0
      this.$router.push('/organizationalchart');
    },
    Coaching() {
      this.validateIsLogin()
      this.$store.state.isChat = 0
      this.$router.push('/coaching');
    },
    CoachingEmployee() {
      this.validateIsLogin()
      this.$store.state.isChat = 0
      this.$router.push('/coachingemployee');
    },
    IncidentReport() {
      this.validateIsLogin()
      this.$store.state.isChat = 0
      this.$router.push('/incidentreport');
    },
    DisciplinaryAciton() {
      this.validateIsLogin()
      this.$store.state.isChat = 0
      this.$router.push('/disciplinaryaction');
    },
    GetUser() {
      let payload = {
        id: this.$store.getters.getUserID,
        user_id: this.$store.getters.getUserID,
      };
      userservices.GetUser(payload, this.$store.getters.getAccessToken).then(response => {
        if (response.data.success) {
          // console.log(response.data)
          this.imagepath = response.data.company_image_path
          this.profile_picture = response.data.data.parent_business_information.business_image
        }
      }).catch(error => console.log(error));
    },
    Logouthris() {
      this.validateIsLogin()

      this.$store.state.isChat = 0
      loginservices.userLogout(this.$store.getters.fetchUserInfo.access_token).then(response => {
        if (response.data.success) {
          this.$store.state.userinfo = [];
          localStorage.clear();
          // this.$router.push('/login');
          // window.location('login')

          window.location.href = process.env.VUE_APP_LOGOUTHRIS;
        }
      }).catch(error => console.log(error));
    },
    gotohrisdashboard() {
      localStorage.setItem("is_hris", 1);
      window.location.href = process.env.VUE_APP_LOGOUT + '/hrisdashboard';
      // this.HrisDashboard();
      // window.location.reload();
    },
    gotoposdashboard() {
      localStorage.setItem("is_hris", 0);
      window.location.href = process.env.VUE_APP_LOGOUT + '/dashboard';
      // this.Dashboard();
      // window.location.reload();
    },
    ClinicDashboard() {
      this.validateIsLogin()
      this.$store.state.isChat = 0
      this.$router.push('/clinicdashboard');
    },
  }
}
</script>
