<template>
  <v-container fluid>
    <br>
    <v-row>
      <!-- Patients Diagnosed -->
      <v-col cols="12" md="4">
        <v-card outlined>
          <v-card-title class="purple--text text--darken-2">Patients Diagnosed</v-card-title>
          <v-card-text>
            <h2 class="purple--text">{{ patientsDiagnosedTodayCount }}</h2>
            <p>Today</p>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Sales Today -->
      <v-col cols="12" md="4">
        <v-card outlined>
          <v-card-title class="purple--text text--darken-2">Sales Today</v-card-title>
          <v-card-text>
            <h2 class="purple--text">₱{{ salesTodayTotal }}</h2>
            <p>Revenue</p>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- New Patients Registered -->
      <v-col cols="12" md="4">
        <v-card outlined>
          <v-card-title class="purple--text text--darken-2">New Patients Registered</v-card-title>
          <v-card-text>
            <h2 class="purple--text">{{ newPatientsTodayCount }}</h2>
            <p>Today</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <!-- Schedule Today -->
      <v-col cols="12" md="6">
        <v-card outlined class="d-flex flex-column" style="min-height: 500px; max-height: 500px;">
          <v-card-title class="purple--text text--darken-2">Schedule Today</v-card-title>
          <v-card-text style="overflow-y: auto;">
            <h2 class="purple--text">{{ scheduleTodayList.length }}</h2>
            <p>Appointments</p>
            <v-list dense>
              <v-list-item v-for="(s, i) in scheduleTodayList" :key="i">
                <v-list-item-content>
                  <v-list-item-title>{{ s.name }}</v-list-item-title>
                  <v-list-item-subtitle>{{ s.time }}</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action class="purple--text">{{ s.status }}</v-list-item-action>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Top Pharmacy Items Sold -->
      <v-col cols="12" md="6">
        <v-card outlined class="d-flex flex-column" style="min-height: 500px; max-height: 500px;">
          <v-card-title class="purple--text text--darken-2">Top Pharmacy Items Sold</v-card-title>
          <v-card-text style="overflow-y: auto;">
            <v-list dense>
              <v-list-item v-for="(item, i) in topPharmacyItemsSold" :key="i">
                <v-list-item-content>
                  <v-list-item-title>{{ item.name }}</v-list-item-title>
                </v-list-item-content>
                <v-list-item-action class="purple--text">{{ item.count }}</v-list-item-action>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
import clinicscheduleservices from '../services/clinicscheduleservices';
import patientdiagnosisservices from '../services/patientdiagnosisservices';
import patientinformationservices from '../services/patientinformationservices';
import patientpaymentservices from '../services/patientpaymentservices';
import pharmacyitemservices from '../services/pharmacyitemservices';

export default {
    name: 'ClinicDashboard',
    data: () => ({
        clinicscheduledata: [],
        patient_diagnosis_information: [],
        listpatientdata: [],
        patientpaymentservicesdata: [],
        pharmacyitemdata: [],
    }),
    computed: {
        today() {
            return new Date().toISOString().split('T')[0];
        },
        newPatientsTodayCount() {
            return this.listpatientdata.filter(p =>
                p.created_at.startsWith(this.today)
            ).length;
        },
        topPharmacyItemsSold() {
            const items = [];
            this.patientpaymentservicesdata
                .filter(p => p.payment_date === this.today)
                .forEach(p => {
                    try {
                        const pharmacyItems = JSON.parse(p.pharmacy_item || '[]');
                        pharmacyItems.forEach(item => {
                            const existing = items.find(i => i.name === item.name);
                            if (existing) {
                                existing.count += item.quantity;
                            } else {
                                items.push({ name: item.name, count: item.quantity });
                            }
                        });
                    } catch (e) {
                        console.error('Error parsing pharmacy_item:', e);
                    }
                });
            return items.sort((a, b) => b.count - a.count).slice(0, 5);
        },
        patientsDiagnosedTodayCount() {
            return this.patient_diagnosis_information.filter(d => d.date === this.today).length;
        },
        salesTodayTotal() {
            return this.patientpaymentservicesdata
                .filter(p => p.payment_date === this.today)
                .reduce((sum, p) => sum + parseFloat(p.price || 0), 0)
                .toFixed(2);
        },
        scheduleTodayList() {
            return this.clinicscheduledata
                .filter(s => s.schedule_date === this.today)
                .map(s => ({
                    name: `${s.patient_info.firstname} ${s.patient_info.lastname}`,
                    time: this.formatTime(s.schedule_time),
                    status: s.status
                }));
        }
    },
    created() {
        this.$store.state.header = false;
        this.$store.state.footer = false;
        this.FetchAllClinicSchedule();
        this.FetchAllPatientDiagnosis();
        this.FetchAllPatientInformation();
        this.FetchAllPatientPayment();
        this.FetchAllPharmacyItem();
    },
    mounted() {
        this.$store.state.title = "Dashboard";
    },
    methods: {
        FetchAllClinicSchedule() {
            let payload = { parent_id: this.$store.getters.getParentID };
            clinicscheduleservices.FetchAllClinicSchedule(payload, this.$store.getters.getAccessToken)
                .then(response => {
                    if (response.data.success) {
                        this.clinicscheduledata = response.data.data;
                       /*  console.log('Clinic Schedule:', JSON.stringify(response.data.data)); */
                    }
                })
                .catch(error => console.log(error));
        },
        FetchAllPatientDiagnosis() {
            let payload = { parent_id: this.$store.getters.getParentID };
            patientdiagnosisservices.FetchAllPatientDiagnosis(payload, this.$store.getters.getAccessToken)
                .then(response => {
                    if (response.data.success) {
                        this.patient_diagnosis_information = response.data.data;
                       /*  console.log('Patient Diagnosis:', JSON.stringify(response.data.data)); */
                    }
                })
                .catch(error => console.log(error));
        },
        FetchAllPatientInformation() {
            let payload = { parent_id: this.$store.getters.getParentID };
            patientinformationservices.FetchAllPatientInformation(payload, this.$store.getters.getAccessToken)
                .then(response => {
                    if (response.data.success) {
                        this.listpatientdata = response.data.data;
                       /*  console.log('Patient Information:', JSON.stringify(response.data.data)); */
                    }
                })
                .catch(error => console.log(error));
        },
        FetchAllPatientPayment() {
            let payload = { parent_id: this.$store.getters.getParentID };
            patientpaymentservices.FetchAllPatientPayment(payload, this.$store.getters.getAccessToken)
                .then(response => {
                    if (response.data.success) {
                        this.patientpaymentservicesdata = response.data.data;
                       /*  console.log('Patient Payment:', JSON.stringify(response.data.data)); */
                    }
                })
                .catch(error => console.log(error));
        },
        FetchAllPharmacyItem() {
            let payload = { parent_id: this.$store.getters.getParentID };
            pharmacyitemservices.FetchAllPharmacyItem(payload, this.$store.getters.getAccessToken)
                .then(response => {
                    if (response.data.success) {
                        this.pharmacyitemdata = response.data.data;
                        /* console.log('Pharmacy Item:', JSON.stringify(response.data.data)); */
                    }
                })
                .catch(error => console.log(error));
        },
        formatTime(timeStr) {
            if (!timeStr) return '';
            const [hour, minute] = timeStr.split(':');
            let h = parseInt(hour, 10);
            const m = minute;
            const ampm = h >= 12 ? 'PM' : 'AM';
            h = h % 12 || 12;
            return `${h}:${m} ${ampm}`;
        }
    }
}
</script>


<style scoped></style>