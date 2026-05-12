<template>
  <v-sheet>
    <v-app-bar elevation="2" color="purple"
      v-if="this.$store.getters.fetchUserInfo.length != 0 && this.$store.getters.getHeader">

      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title color="white">
        <font color="white">{{ this.$store.getters.getTitle }}</font>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-menu bottom max-width="300">
        <template v-slot:activator="{ on, attrs }">

          <v-btn icon v-bind="attrs" v-on="on">
            <!-- <v-badge
              color="red"
              :content="notificationnumber"
              bordered
              overlap
              >  -->
            <v-icon>mdi-bell</v-icon>

            <!-- </v-badge> -->

          </v-btn>
        </template>

        <v-card class="mx-auto">
          <v-list three-line>
            <template>

              <v-subheader>Notification</v-subheader>

              <v-divider></v-divider>



              <!-- <v-list-item @click="hahahaha()"
              >
              <v-menu
                      bottom
                      max-width="300"
                    >
                    <xtemplate v-slot:activator="{ on, attrs }">
                      <v-btn
                        icon
                        v-bind="attrs"
                        v-on="on"
                      >
                        <v-icon>mdi-bell</v-icon>
                      </v-btn>
                    </xtemplate>
                  </v-menu>

                  
                  <v-list-item-avatar>
                      <v-img 
                      src="../../assets/images/circle_wirewolf.png"
                    ></v-img>
                  </v-list-item-avatar>
                  
                  <v-list-item-content>
                    <v-list-item-title style="font-size: 13px;">TITLE</v-list-item-title>
                    <v-list-item-subtitle style="font-size: 12px;">Hahahaha</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item> -->

              <v-list-item>
                <!-- <v-list-item-avatar>
              <v-img  src="../../assets/images/circle_wirewolf.png"></v-img>
            </v-list-item-avatar> -->
                <v-list-item-content>
                  <v-list-item-title>On boarding</v-list-item-title>
                  <v-list-item-subtitle>You have pending on boarding</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-icon color="grey lighten-1">mdi-information</v-icon>
                </v-list-item-action>
              </v-list-item>

              <v-divider></v-divider>
            </template>
          </v-list>
        </v-card>
      </v-menu>

      <v-btn icon @click="qrcodeshow()">
        <v-icon>mdi-qrcode</v-icon>
      </v-btn>

      <!-- overlay-color="black" overlay-opacity="1" -->
      <v-dialog v-model="qrcodescanner" width="350">
        <v-card style="background-color: purple">

          <div class="pa-3">
            <v-card>
              <v-toolbar style="background-color: white" height="40px">
                <h2 class="purple--text flex text-center">SCAN ME</h2>
              </v-toolbar>
              <div class="pt-0 pb-3 pl-3 pr-3">
                <v-card style="background-color: purple">
                  <div class="pt-0">
                    <br>
                    <center>
                      <qr-code :text="textqrcode" color="white" bg-color="purple"></qr-code>
                    </center>
                    <br>
                  </div>
                </v-card>
              </div>
            </v-card>
          </div>
        </v-card>
      </v-dialog>

      <v-btn icon @click="Logout()">
        <v-icon>mdi-logout</v-icon>
      </v-btn>

    </v-app-bar>

    <router-view>
    </router-view>

    <v-navigation-drawer v-model="drawer" permanent app>

      <v-list-item class="text-center">
        <v-img v-if="profile_picture != null" max-width="60"
          class="pa-7 rounded-circle d-inline-block align-self-stretch mt-2 mb-2" style="margin: 0px auto;"
          :src="imagepath + profile_picture"></v-img>
        <v-img v-else src="../../assets/images/circle_wirewolf.png" max-width="60" class="mt-2 mb-2"
          style="margin: 0px auto;"></v-img>
      </v-list-item>
      <v-list-item :disabled="!$store.getters.valAccess(230)" @click="Profile()">
        <v-list-item-content>
          <v-list-item-title style="font-size: 12px;">{{
            this.$store.getters.fetchUserInfo.account_information.personal_information.firstname }} {{
              this.$store.getters.fetchUserInfo.account_information.personal_information.lastname }}</v-list-item-title>
          <v-list-item-subtitle style="font-size: 12px;">{{ this.$store.getters.fetchUserInfo.account_information.email
          }}</v-list-item-subtitle>
          <v-list-item-subtitle style="font-size: 12px;">{{ this.$store.getters.getRoleName }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <!-- Wirewolf HRIS Navigation Start -->

        <div
          v-if="$store.getters.valAccess(196) || $store.getters.valAccess(197) || $store.getters.valAccess(198) || $store.getters.valAccess(199) || $store.getters.valAccess(158) || $store.getters.valAccess(160) || $store.getters.valAccess(200) || $store.getters.valAccess(203) || $store.getters.valAccess(209) || $store.getters.valAccess(240) || $store.getters.valAccess(256)">
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

          <v-list-item link @click="EmployeeInformation()" v-if="$store.getters.valAccess(196)">

            <v-list-item-icon>
              <v-icon>mdi-account-box</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>My Profile</v-list-item-title>
            </v-list-item-content>
          </v-list-item>


          <div v-if="$store.getters.valAccess(199) || $store.getters.valAccess(158) || $store.getters.valAccess(200)">
            <v-list-group prepend-icon="mdi-account" no-action color="purple">
              <template v-slot:activator>
                <v-list-item-content>
                  <v-list-item-title>Employee HRIS</v-list-item-title>
                </v-list-item-content>
              </template>

              <v-list-item link @click="Overtime()" v-if="$store.getters.valAccess(199)">

                <!-- <v-list-item-icon>
                  <v-icon>mdi-file-document-edit</v-icon>
                </v-list-item-icon> -->

                <v-list-item-content>
                  <v-list-item-title>For Filing</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item link @click="Tito()" v-if="$store.getters.valAccess(158)">

                <!-- <v-list-item-icon>
                  <v-icon>mdi-file-document-edit</v-icon>
                </v-list-item-icon> -->

                <v-list-item-content>
                  <v-list-item-title>Ti-To</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item link @click="Timesheetconfirmation()" v-if="$store.getters.valAccess(200)">

                <!-- <v-list-item-icon>
                  <v-icon>mdi-clock-check-outline</v-icon>
                </v-list-item-icon> -->

                <v-list-item-content>
                  <v-list-item-title>Timesheet Confirmation</v-list-item-title>
                </v-list-item-content>
              </v-list-item>


              <v-list-item link @click="CoachingEmployee()">
                <v-list-item-content>
                  <v-list-item-title>Coaching</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item link @click="DisciplinaryAciton()">
                <v-list-item-content>
                  <v-list-item-title>Disciplinary Aciton</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

            </v-list-group>
          </div>

          <div
            v-if="$store.getters.valAccess(197) || $store.getters.valAccess(198) || $store.getters.valAccess(160) || $store.getters.valAccess(203) || $store.getters.valAccess(209) || $store.getters.valAccess(240) || $store.getters.valAccess(256)">
            <v-list-group prepend-icon="mdi-account-supervisor" no-action color="purple">
              <template v-slot:activator>
                <v-list-item-content>
                  <v-list-item-title>Admin HRIS</v-list-item-title>
                </v-list-item-content>
              </template>

              <v-list-item link @click="HrisListEmployee()" v-if="$store.getters.valAccess(197)">

                <!-- <v-list-item-icon>
                    <v-icon>mdi-account-group</v-icon>
                  </v-list-item-icon> -->

                <v-list-item-content>
                  <v-list-item-title>Employee Information</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item link @click="EmployeeSchedule()">
                <v-list-item-content>
                  <v-list-item-title>Employee Schedule</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item link @click="ArchiveEmployee()">
                <v-list-item-content>
                  <v-list-item-title>Archived Employee</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item link @click="HrisForApproval()" v-if="$store.getters.valAccess(198)">

                <!-- <v-list-item-icon>
                    <v-icon>mdi-file-document-check</v-icon>
                  </v-list-item-icon> -->

                <v-list-item-content>
                  <v-list-item-title>For Approval</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item link @click="Titoadmin()" v-if="$store.getters.valAccess(160)">

                <!-- <v-list-item-icon>
                  <v-icon>mdi-file-document-edit</v-icon>
                </v-list-item-icon> -->

                <v-list-item-content>
                  <v-list-item-title>Ti-To Admin</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item link @click="Timesheetlog()" v-if="$store.getters.valAccess(203)">

                <!-- <v-list-item-icon>
                <v-icon>mdi-clipboard-text-clock</v-icon>
              </v-list-item-icon> -->

                <v-list-item-content>
                  <v-list-item-title>Timesheet Logs</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item link @click="Userchecklist()" v-if="$store.getters.valAccess(209)">

                <!-- <v-list-item-icon>
                <v-icon>mdi-text-box-check-outline</v-icon>
              </v-list-item-icon> -->

                <v-list-item-content>
                  <v-list-item-title>User Onboarding</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item link @click="ApprovalRegistration()" v-if="$store.getters.valAccess(240)">
                <!-- <v-list-item-icon>
                <v-icon>mdi-text-box-check-outline</v-icon>
              </v-list-item-icon> -->

                <v-list-item-content>
                  <v-list-item-title>Registration Approval Form</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item link @click="ClearanceForm()" v-if="$store.getters.valAccess(256)">
                <v-list-item-content>
                  <v-list-item-title>Clearance Form</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item link @click="Accountability()">
                <v-list-item-content>
                  <v-list-item-title>
                    Accountability
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item link @click="OrganizationalChart()">
                <v-list-item-content>
                  <v-list-item-title>Organizational Chart</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item link @click="Coaching()">
                <v-list-item-content>
                  <v-list-item-title>Coaching</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item link @click="IncidentReport()">
                <v-list-item-content>
                  <v-list-item-title>Disciplinary Action</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

            </v-list-group>
          </div>
          <!-- <v-list-item
                link
                @click="Overtime()"
                >
              
                <v-list-item-icon>
                  <v-icon>mdi-account-clock</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>Overtime</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item
                link
                @click="Leave()"
              >
              
                <v-list-item-icon>
                  <v-icon>mdi-walk</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>Leave</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item
                link
                @click="Officialbusiness()"
              >
              
                <v-list-item-icon>
                  <v-icon>mdi-briefcase-clock</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>Official Business</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item
                link
                @click="Undertime()"
              >
              
                <v-list-item-icon>
                  <v-icon>mdi-clock-minus</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>Undertime</v-list-item-title>
                </v-list-item-content>
              </v-list-item> -->
        </div>

        <!-- Wirewolf Settings Start -->
        <div
          v-if="$store.getters.valParent() || $store.getters.valAccess(165) || $store.getters.valAccess(166) || $store.getters.valAccess(167) || $store.getters.valAccess(168) || $store.getters.valAccess(169) || $store.getters.valAccess(170) || $store.getters.valAccess(171) || $store.getters.valAccess(172) || $store.getters.valAccess(173) || $store.getters.valAccess(174) || $store.getters.valAccess(175) || $store.getters.valAccess(176) || $store.getters.valAccess(177) || $store.getters.valAccess(178) || $store.getters.valAccess(179) || $store.getters.valAccess(180) || $store.getters.valAccess(181) || $store.getters.valAccess(182) || $store.getters.valAccess(183) || $store.getters.valAccess(184) || $store.getters.valAccess(185) || $store.getters.valAccess(215) || $store.getters.valAccess(245) || $store.getters.valAccess(250)">
          <v-subheader>Settings</v-subheader>
          <v-list-item link @click="Company()" :disabled="!$store.getters.valAccess(232)"
            v-if="$store.getters.valParent()">
            <v-list-item-icon>
              <v-icon>mdi-domain</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Company</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link @click="Branch()" :disabled="!$store.getters.valAccess(236)"
            v-if="$store.getters.valParent()">
            <v-list-item-icon>
              <v-icon>mdi-home-modern</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Branch</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <div
            v-if="$store.getters.valAccess(165) || $store.getters.valAccess(166) || $store.getters.valAccess(167) || $store.getters.valAccess(168) || $store.getters.valAccess(169) || $store.getters.valAccess(170) || $store.getters.valAccess(171) || $store.getters.valAccess(172) || $store.getters.valAccess(173) || $store.getters.valAccess(174) || $store.getters.valAccess(175) || $store.getters.valAccess(176) || $store.getters.valAccess(177) || $store.getters.valAccess(178) || $store.getters.valAccess(179) || $store.getters.valAccess(180) || $store.getters.valAccess(181) || $store.getters.valAccess(182) || $store.getters.valAccess(183) || $store.getters.valAccess(184) || $store.getters.valAccess(185) || $store.getters.valAccess(215) || $store.getters.valAccess(245) || $store.getters.valAccess(250)">
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

              <v-list-item link @click="Division()" v-if="$store.getters.valAccess(166)">
                <v-list-item-title>
                  Division
                </v-list-item-title>
              </v-list-item>

              <v-list-item link @click="LeaveType()" v-if="$store.getters.valAccess(181)">
                <v-list-item-content>
                  <v-list-item-title>
                    Leave Type
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item link @click="LeaveBalance()" v-if="$store.getters.valAccess(182)">
                <v-list-item-content>
                  <v-list-item-title>
                    Leave Credits
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item link @click="Schedule()" v-if="$store.getters.valAccess(183)">
                <v-list-item-content>
                  <v-list-item-title>
                    Schedule
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item link @click="Cutoff()" v-if="$store.getters.valAccess(184)">
                <v-list-item-content>
                  <v-list-item-title>
                    Cutoff
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item link @click="Announcement()" v-if="$store.getters.valAccess(185)">
                <v-list-item-content>
                  <v-list-item-title>
                    Announcement
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item link @click="Checklist()" v-if="$store.getters.valAccess(215)">
                <v-list-item-content>
                  <v-list-item-title>
                    Onboarding Type
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item link @click="Holiday()" v-if="$store.getters.valAccess(186)">
                <v-list-item-content>
                  <v-list-item-title>
                    Holiday
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item link @click="AccountabilityType()" v-if="$store.getters.valAccess(245)">
                <!-- v-if="$store.getters.valAccess(186)" -->
                <v-list-item-content>
                  <v-list-item-title>
                    Accountability Type
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item link @click="AccountabilityField()" v-if="$store.getters.valAccess(250)">
                <!-- v-if="$store.getters.valAccess(186)" -->
                <v-list-item-content>
                  <v-list-item-title>
                    Accountability Field
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-group>
          </div>
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
      <v-subheader>Main</v-subheader>
      <v-list-item link @click="Dashboard()">
        <v-list-item-icon>
          <v-icon>mdi-monitor-dashboard</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>Dashboard</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <!-- Wirewolf Company Navigation Start -->
      <div
        v-if="$store.getters.valParent() || $store.getters.valAccess(165) || $store.getters.valAccess(166) || $store.getters.valAccess(167) || $store.getters.valAccess(168) || $store.getters.valAccess(169) || $store.getters.valAccess(170) || $store.getters.valAccess(171) || $store.getters.valAccess(172) || $store.getters.valAccess(173) || $store.getters.valAccess(174) || $store.getters.valAccess(175) || $store.getters.valAccess(176) || $store.getters.valAccess(177) || $store.getters.valAccess(178) || $store.getters.valAccess(179) || $store.getters.valAccess(180) || $store.getters.valAccess(181) || $store.getters.valAccess(182) || $store.getters.valAccess(183) || $store.getters.valAccess(184) || $store.getters.valAccess(185)">
        <v-subheader>Company</v-subheader>
        <v-list-item link @click="Company()" :disabled="!$store.getters.valAccess(232)"
          v-if="$store.getters.valParent()">
          <v-list-item-icon>
            <v-icon>mdi-domain</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Company</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link @click="Branch()" :disabled="!$store.getters.valAccess(236)"
          v-if="$store.getters.valParent()">
          <v-list-item-icon>
            <v-icon>mdi-home-modern</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Branch</v-list-item-title>
          </v-list-item-content>
        </v-list-item>


        <!-- <v-list-item
                link
                @click="Billing()"
                v-if="$store.getters.valParent()"
              >
                <v-list-item-icon>
                  <v-icon>mdi-credit-card-multiple-outline</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>Bills</v-list-item-title>
                </v-list-item-content>
              </v-list-item> -->

        <!--HRIS VAL ACCESS DON'T DELETE || $store.getters.valAccess(181) || $store.getters.valAccess(182) || $store.getters.valAccess(183) || $store.getters.valAccess(184) || $store.getters.valAccess(185) || $store.getters.valAccess(215) -->
        <div
          v-if="$store.getters.valAccess(165) || $store.getters.valAccess(166) || $store.getters.valAccess(167) || $store.getters.valAccess(168) || $store.getters.valAccess(169) || $store.getters.valAccess(170) || $store.getters.valAccess(171) || $store.getters.valAccess(172) || $store.getters.valAccess(173) || $store.getters.valAccess(174) || $store.getters.valAccess(175) || $store.getters.valAccess(176) || $store.getters.valAccess(177) || $store.getters.valAccess(178) || $store.getters.valAccess(179) || $store.getters.valAccess(180)">
          <v-list-group color="orange" prepend-icon="mdi-cog" no-action>
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>Maintenance</v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item link @click="Role()" v-if="$store.getters.valAccess(165)">
              <v-list-item-content>
                <v-list-item-title>
                  Access Rights
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item link @click="Division()" v-if="$store.getters.valAccess(166)">
              <v-list-item-title>
                Division
              </v-list-item-title>
            </v-list-item>


            <v-list-item link @click="Devices()" v-if="$store.getters.valAccess(167)">
              <v-list-item-content>
                <v-list-item-title>
                  Devices
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <div
              v-if="$store.getters.valAccess(168) || $store.getters.valAccess(169) || $store.getters.valAccess(170) || $store.getters.valAccess(171) || $store.getters.valAccess(172)">
              <v-list-group no-action color="orange" sub-group>
                <template v-slot:activator>
                  <v-list-item-content>
                    <v-list-item-title>POS</v-list-item-title>
                  </v-list-item-content>
                </template>

                <!-- <v-list-item
                        link
                        @click="PaymentType()"
                        v-if="$store.getters.valAccess(7)"
                      > -->
                <!-- <v-list-item-icon>
                          <v-icon>mdi-cash-multiple</v-icon>
                        </v-list-item-icon> -->

                <!-- <v-list-item-content>
                          <v-list-item-title>Payment Type</v-list-item-title>
                        </v-list-item-content>
                      </v-list-item> -->

                <v-list-item link @click="Discount()" v-if="$store.getters.valAccess(168)">
                  <v-list-item-content>
                    <v-list-item-title>
                      Discount
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item link @click="Department(), $store.state.snackbar.color = 'green darken-1'"
                  v-if="$store.getters.valAccess(169)">
                  <v-list-item-content>
                    <v-list-item-title>
                      Department
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item link @click="Category(), $store.state.snackbar.color = 'green darken-1'"
                  v-if="$store.getters.valAccess(170)">
                  <v-list-item-content>
                    <v-list-item-title>
                      Category
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item link @click="SubCategory(), $store.state.snackbar.color = 'green darken-1'"
                  v-if="$store.getters.valAccess(171)">
                  <v-list-item-content>
                    <v-list-item-title>
                      Sub-Category
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item link @click="ProductType(), $store.state.snackbar.color = 'green darken-1'"
                  v-if="$store.getters.valAccess(172)">
                  <v-list-item-title>
                    Product Type
                  </v-list-item-title>
                </v-list-item>

              </v-list-group>
            </div>

            <div
              v-if="$store.getters.valAccess(173) || $store.getters.valAccess(174) || $store.getters.valAccess(175) || $store.getters.valAccess(176) || $store.getters.valAccess(177) || $store.getters.valAccess(178) || $store.getters.valAccess(179) || $store.getters.valAccess(180)">
              <v-list-group color="orange" no-action sub-group>
                <template v-slot:activator>
                  <v-list-item-content>
                    <v-list-item-title>Inventory</v-list-item-title>
                  </v-list-item-content>
                </template>

                <v-list-item link @click="Supplier()" v-if="$store.getters.valAccess(173)">
                  <v-list-item-content>
                    <v-list-item-title>
                      Supplier
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>


                <v-list-item link @click="Unit()" v-if="$store.getters.valAccess(174)">
                  <v-list-item-title>
                    Unit
                  </v-list-item-title>
                </v-list-item>
                <!-- <v-list-item 
                        link  
                        @click="UnitConversion()"
                        v-if="$store.getters.valAccess(60)"
                        >
                      <v-list-item-title>
                        Unit Conversion
                      </v-list-item-title>
                    </v-list-item> -->
                <v-list-item link @click="Locations()" v-if="$store.getters.valAccess(175)">
                  <v-list-item-title>
                    Locations
                  </v-list-item-title>
                </v-list-item>
                <v-list-item link @click="ProductType(), $store.state.snackbar.color = 'orange'"
                  v-if="$store.getters.valAccess(176)">
                  <v-list-item-title>
                    Product Type
                  </v-list-item-title>
                </v-list-item>

                <v-list-item link @click="Remarks()" v-if="$store.getters.valAccess(177)">
                  <v-list-item-title>
                    Remarks
                  </v-list-item-title>
                </v-list-item>

                <v-list-item link @click="Department(), $store.state.snackbar.color = 'orange'"
                  v-if="$store.getters.valAccess(178)">
                  <v-list-item-content>
                    <v-list-item-title>
                      Department
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item link @click="Category(), $store.state.snackbar.color = 'orange'"
                  v-if="$store.getters.valAccess(179)">
                  <v-list-item-content>
                    <v-list-item-title>
                      Category
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item link @click="SubCategory(), $store.state.snackbar.color = 'orange'"
                  v-if="$store.getters.valAccess(180)">
                  <v-list-item-content>
                    <v-list-item-title>
                      Sub-Category
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

              </v-list-group>
            </div>
          </v-list-group>
        </div>
      </div>
      <!-- Wirewolf Company Navigation End -->

      <!-- Wirewolf POS Navigation Start -->
      <div
        v-if="$store.getters.valAccess(187) || $store.getters.valAccess(188) || $store.getters.valAccess(262) || $store.getters.valAccess(265) || $store.getters.valAccess(268) || $store.getters.valAccess(271) || $store.getters.valAccess(278) || $store.getters.valAccess(274)">
        <v-subheader>POS</v-subheader>

        <v-list-item link @click="Inventory()" v-if="$store.getters.valAccess(187)">
          <v-list-item-icon>
            <v-icon>mdi-food</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Products</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <div
          v-if="$store.getters.valAccess(188) || $store.getters.valAccess(262) || $store.getters.valAccess(265) || $store.getters.valAccess(268) || $store.getters.valAccess(271) || $store.getters.valAccess(278) || $store.getters.valAccess(274)">
          <v-list-group color="orange" prepend-icon="mdi-chart-areaspline" no-action>
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>Reports</v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item link @click="CashFundReport()" v-if="$store.getters.valAccess(262)">
              <v-list-item-content>
                <v-list-item-title>
                  Cash Fund Report
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item link @click="DiscountSummaryReport()" v-if="$store.getters.valAccess(265)">
              <v-list-item-content>
                <v-list-item-title>
                  Discount Summary Report
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item link @click="ItemSummaryReport()" v-if="$store.getters.valAccess(268)">
              <v-list-item-content>
                <v-list-item-title>
                  Top Selling Product
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item link @click="PaymentSummaryReport()" v-if="$store.getters.valAccess(271)">
              <v-list-item-content>
                <v-list-item-title>
                  Payment Summary Report
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item link @click="PayoutReport()" v-if="$store.getters.valAccess(278)">
              <v-list-item-content>
                <v-list-item-title>
                  Payout Report
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item link @click="SalesReport()" v-if="$store.getters.valAccess(188)">
              <v-list-item-content>
                <v-list-item-title>
                  Sales Report
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item link @click="VoidReport()" v-if="$store.getters.valAccess(274)">
              <v-list-item-content>
                <v-list-item-title>
                  Void Transaction Report
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </div>
      </div>

      <!-- Wirewolf POS Navigation End -->

      <!-- Wirewolf Inventory Navigation Start -->
      <div
        v-if="$store.getters.valAccess(189) || $store.getters.valAccess(190) || $store.getters.valAccess(124) || $store.getters.valAccess(125) || $store.getters.valAccess(126) || $store.getters.valAccess(127) || $store.getters.valAccess(191) || $store.getters.valAccess(192) || $store.getters.valAccess(193) || $store.getters.valAccess(194) || $store.getters.valAccess(195)">
        <v-subheader>Inventory</v-subheader>

        <div v-if="$store.getters.valAccess(189) || $store.getters.valAccess(190)">
          <v-list-group color="orange" prepend-icon="mdi-book-information-variant" no-action>
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>Inventory</v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item link @click="Inventory()" v-if="$store.getters.valAccess(189)">
              <v-list-item-title>
                Product List
              </v-list-item-title>
            </v-list-item>
            <v-list-item link @click="StockInventory()" v-if="$store.getters.valAccess(190)">
              <!-- v-if="$store.getters.valAccess(60)" -->
              <v-list-item-title>
                Product Inventory
              </v-list-item-title>
            </v-list-item>
            <!-- <v-list-item link  @click="StockCard()">
                    <v-list-item-title>
                      Stock Card
                    </v-list-item-title>
                  </v-list-item> -->
          </v-list-group>
        </div>


        <div
          v-if="$store.getters.valAccess(124) || $store.getters.valAccess(125) || $store.getters.valAccess(126) || $store.getters.valAccess(127) || $store.getters.valAccess(191)">
          <v-list-group color="orange" prepend-icon="mdi-animation-outline" no-action>
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>Stock Process</v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item link @click="StockIn()" v-if="$store.getters.valAccess(124)">
              <v-list-item-title>
                Stock In
              </v-list-item-title>
            </v-list-item>
            <v-list-item link @click="StockOut()" v-if="$store.getters.valAccess(125)">
              <v-list-item-title>
                Stock Out
              </v-list-item-title>
            </v-list-item>

          </v-list-group>
        </div>

        <div v-if="$store.getters.valAccess(192)">
          <v-list-group color="orange" prepend-icon="mdi-ballot-recount-outline" no-action>
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>Physical Count</v-list-item-title>
              </v-list-item-content>
            </template>
            <!-- <v-list-item 
                      link 
                      @click="PhysicalCountDepartment()"
                      v-if="$store.getters.valAccess(75)"
                      >
                    <v-list-item-title>
                      Physical Count Department
                    </v-list-item-title>
                  </v-list-item> -->
            <v-list-item link @click="PhysicalCount()" v-if="$store.getters.valAccess(192)">
              <v-list-item-title>
                Physical Count List
              </v-list-item-title>
            </v-list-item>

          </v-list-group>
        </div>


        <div v-if="$store.getters.valAccess(193) || $store.getters.valAccess(194) || $store.getters.valAccess(195)">
          <v-list-group color="orange" prepend-icon="mdi-finance" no-action>
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>Reports</v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item link @click="InventoryStockCard()" v-if="$store.getters.valAccess(193)">
              <v-list-item-title>
                Stock Card
              </v-list-item-title>
            </v-list-item>
            <v-list-item link @click="InventoryReports()" v-if="$store.getters.valAccess(194)">
              <v-list-item-title>
                Summary Report
              </v-list-item-title>
            </v-list-item>
            <v-list-item link @click="InventoryDetailedReports()" v-if="$store.getters.valAccess(195)">
              <v-list-item-title>
                Detailed Report
              </v-list-item-title>
            </v-list-item>

          </v-list-group>
        </div>

      </div>
      <!-- Wirewolf Inventory Navigation End -->

      <!-- Wirewolf HRIS Navigation Start -->
      <!--HRIS DON`T DELETE $store.getters.valAccess(196) || $store.getters.valAccess(197) || $store.getters.valAccess(198) || $store.getters.valAccess(199) || $store.getters.valAccess(158) || $store.getters.valAccess(160) || $store.getters.valAccess(200) || $store.getters.valAccess(203) || $store.getters.valAccess(209) || $store.getters.valAccess(240) -->
      <div v-if="$store.getters.valAccess(158) || $store.getters.valAccess(160) || $store.getters.valAccess(164)">
        <v-subheader>Employee Management</v-subheader>
        <!-- HRIS DON`T DELETE -->
        <v-list-item link @click="Users()" v-if="$store.getters.valAccess(164)">

          <v-list-item-icon>
            <v-icon>mdi-account-supervisor</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Users</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link @click="Tito()" v-if="$store.getters.valAccess(158)">
          <v-list-item-icon>
            <v-icon>mdi-clock-time-three-outline</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Ti-To</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link @click="Titoadmin()" v-if="$store.getters.valAccess(160)">
          <v-list-item-icon>
            <v-icon>mdi-clock-time-nine-outline</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Ti-To Admin</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link @click="gotohrisdashboard()" v-if="this.subtype.includes(0) && this.subtype.includes(1)">
          <v-list-item-icon>
            <v-icon>mdi-account-group-outline</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>HRIS</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </div>

      <!-- Wirewolf HRIS Navigation End -->
      <v-subheader>Logout</v-subheader>
      <v-list-item link @click="Logout()">
        <v-list-item-icon>
          <v-icon>mdi-logout</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-navigation-drawer>
    <div v-show="true" v-if="$store.getters.fetchisChat == 0">
      <v-btn fab dark medium color="purple" fixed right bottom @click="Chat()">
        <v-icon style="opacity: 1;" dark>mdi-chat-processing-outline</v-icon>
      </v-btn>
    </div>
    <!-- <div v-show="true" v-if="$vuetify.breakpoint.xs">
        <v-btn fab dark medium color="purple" fixed top bottom  @click="Chat()">
            <v-icon style="opacity: 1;" dark>mdi-chat-processing-outline</v-icon>
        </v-btn>
      </div> -->
  </v-sheet>
  <!-- END OF PROJECT ATHENA -->
</template>

<script>

// import DiscountVue from '../discount/Discount.vue';
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
    items: [
      { header: 'Notification' },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
        title: 'Brunch this weekend?',
        subtitle: `<span class="text--primary">Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
      },
      { divider: true, inset: true },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
        title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
        subtitle: `<span class="text--primary">to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.`,
      },
      { divider: true, inset: true },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
        title: 'Oui oui',
        subtitle: '<span class="text--primary">Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?',
      },
      { divider: true, inset: true },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
        title: 'Birthday gift',
        subtitle: '<span class="text--primary">Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?',
      },
      { divider: true, inset: true },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
        title: 'Recipe to try',
        subtitle: '<span class="text--primary">Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
      },
    ],
  }),
  created() {
    this.validateIsLogin()
    this.GetUser()
    this.hrisdata = localStorage.getItem('is_hris')
    this.subtype = localStorage.getItem('sub_type')
  },
  methods: {
    validateIsLogin() {
      // let payload = {
      //     user_id: this.$store.getters.getBranchID
      // };
      // console.log(this.$store.getters.fetchUserInfo.access_token)
      loginservices.validateIsLogin(this.$store.getters.fetchUserInfo.access_token).then(response => {
        // --
        if (response.status == 401) {
          localStorage.removeItem('userinfo');
          window.location.reload()
          // this.$router.push('/login');
        }
      }).catch(error => {
        // --
        console.log(error);
        localStorage.removeItem('userinfo');
        window.location.reload()
        // this.$router.push('/login');
      });
    },
    Chat() {
      this.opacity = false
      console.log(this.$router)
      this.validateIsLogin()
      this.$store.state.title = "Chat Room";
      this.$router.push('/chat');
    },

    Dashboard() {
      this.validateIsLogin()

      this.$store.state.isChat = 0
      this.$router.push('/dashboard');
    },

    KnKClass() {
      this.validateIsLogin()

      this.$store.state.isChat = 0
      this.$router.push('/knkclass');
    },

    KnKArea() {
      this.validateIsLogin()

      this.$store.state.isChat = 0
      this.$router.push('/knkarea');
    },

    KnKParticular() {
      this.validateIsLogin()

      this.$store.state.isChat = 0
      this.$router.push('/knkparticular');
    },

    KnKStandard() {
      this.validateIsLogin()

      this.$store.state.isChat = 0
      this.$router.push('/knkstandard');
    },

    KnKSetup() {
      this.validateIsLogin()

      this.$store.state.isChat = 0
      this.$router.push('/knksetup');
    },

    KnKRoomtype() {
      this.validateIsLogin()

      this.$store.state.isChat = 0
      this.$router.push('/knkroomtype');
    },

    KnKRoom() {
      this.validateIsLogin()

      this.$store.state.isChat = 0
      this.$router.push('/knkroom');
    },

    Company() {
      this.validateIsLogin()

      this.$store.state.isChat = 0
      this.$router.push('/company');
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
    Profile() {
      this.validateIsLogin()

      this.$store.state.isChat = 0
      this.$router.push('/profile');
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
    Product() {
      this.validateIsLogin()

      this.$store.state.isChat = 0
      this.$router.push('/product');
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
          this.imagepath = response.data.image_path
          this.profile_picture = response.data.data.user_other_personal_information.profile_picture
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
