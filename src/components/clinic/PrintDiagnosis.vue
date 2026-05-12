<template>
    <div>
        <div class="pa-6" v-for="(chunk, index) in paginatedPrescriptions" :key="index">
            <!-- Header Row -->
            <v-row class="align-center mb-4 justify-center">
                <!-- Logo -->
                <v-col cols="auto" class="pr-2 d-flex align-center">
                    <img v-if="business_information?.business_image"
                        :src="company_image_path + business_information.business_image" alt="Clinic Logo"
                        style="max-height:80px" />
                    <img v-else src="../../assets/images/tldc_logo.png" alt="Clinic Logo" style="max-height:80px" />
                </v-col>

                <!-- Clinic Info -->
                <v-col cols="auto" class="d-flex flex-column align-center">
                    <h1 class="mb-0 text-center">{{ business_information?.business_name }}</h1>
                    <p class="mb-0 text-center">
                        {{ business_information?.business_address }},
                        {{ business_information?.city_information?.name }},
                        {{ business_information?.state_information?.name }},
                        {{ business_information?.country_information?.name }}
                    </p>
                    <p class="mb-0 text-center">Mobile: {{ diagnosis.patient_info?.mobile_number }}</p>
                </v-col>
            </v-row>

            <!-- Patient Info -->
            <v-row class="ma-0 pa-0">
                <v-col cols="8" class="pa-0 ma-0">
                    <strong>Name:</strong>
                    {{ diagnosis.patient_info?.firstname }}
                    {{ diagnosis.patient_info?.middlename ? diagnosis.patient_info.middlename.charAt(0) + '.' : '' }}
                    {{ diagnosis.patient_info?.lastname }}
                    {{ diagnosis.patient_info?.suffix }}
                </v-col>
                <v-col cols="4" class="pa-0 ma-0">
                    <strong>Date:</strong>
                    {{ new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) }}
                </v-col>
            </v-row>

            <v-row class="ma-0 pa-0">
                <v-col cols="8" class="pa-0 ma-0">
                    <strong>Address:</strong>
                    {{ diagnosis.patient_info?.address }},
                    {{ diagnosis.patient_info?.city_info?.name }},
                    {{ diagnosis.patient_info?.state_info?.name }},
                    {{ diagnosis.patient_info?.country_info?.name }}
                </v-col>
                <v-col cols="4" class="pa-0 ma-0">
                    <strong>Age:</strong>
                    {{ diagnosis.patient_info?.birth_date
                        ? new Date().getFullYear() - new Date(diagnosis.patient_info.birth_date).getFullYear()
                        : '' }}
                </v-col>
            </v-row>

            <!-- Prescriptions -->
            <div class="d-flex mb-2 pt-5" style="align-items:flex-start;">
                <img src="../../assets/images/rx.png" alt="Rx Symbol" style="max-height:80px; margin-right:16px;" />
                <div style="flex:1;">
                    <ul style="margin:0; margin-top:30px; padding-left:20px; list-style-type:disc;">
                        <li v-for="p in chunk" :key="p.pharmacy_item_id"
                            style="white-space:normal; word-break:break-word; line-height:1.3; margin-bottom:0px;">
                            <div><strong>{{ p.pharmacy_item_name }}</strong></div>
                            <div style="margin-left:12px;">- {{ p.instruction_text }}</div>
                        </li>
                    </ul>
                </div>
            </div>

            <!-- Footer -->
            <v-row class="mt-6" style="position:fixed; bottom:20px; left:40px; right:40px; width:auto;">
                <v-col class="ml-auto d-flex flex-column align-end">
                    {{ personalInfo.firstname }}
                    {{ personalInfo.middlename ? personalInfo.middlename.charAt(0) + '.' : '' }}
                    {{ personalInfo.lastname }}
                    {{ personalInfo.suffix }}
                    <p class="mb-0">LIC. NO.: _______________</p>
                    <p class="mb-0">PTR. NO.: _______________</p>
                </v-col>
            </v-row>

            <!-- Page break -->
            <div style="page-break-after:always;"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PrintDiagnosis',
    data: () => ({
        prescriptions: [],
        patient_information_data: {},
        diagnosis: {},
        business_information: {},
        company_image_path: '',
        userinfo: null,
    }),
    computed: {
        paginatedPrescriptions() {
            const size = 10; // max items per page
            const prescriptions = this.diagnosis.prescription || [];
            const chunks = [];
            for (let i = 0; i < prescriptions.length; i += size) {
                chunks.push(prescriptions.slice(i, i + size));
            }
            return chunks;
        }
    },
    created() {
        this.$store.state.header = false;
        this.$store.state.footer = false;
        this.$store.state.snackbar.color = 'purple';
        localStorage.setItem('nav_hide', 1)
        const storedDiagnosis = localStorage.getItem('diagnosisForPrint');
        if (storedDiagnosis) {
            this.diagnosis = JSON.parse(storedDiagnosis);
        }

        const storedBusiness = localStorage.getItem('business_information');
        if (storedBusiness) {
            this.business_information = JSON.parse(storedBusiness);
        }

        const storedPath = localStorage.getItem('company_image_path');
        if (storedPath) {
            this.company_image_path = storedPath;
        }

        const userinfo = localStorage.getItem("userinfo");
        if (userinfo) {
            const parsed = JSON.parse(userinfo);
            this.personalInfo = parsed.account_information.personal_information;
        }
        setTimeout(() => {
            window.print();
        }, 500);


        window.onafterprint = () => {
            localStorage.setItem('nav_hide', 0);
            window.close();
        };
    },
    mounted() {
        this.$store.state.title = "Print Diagnosis";
    },
    updated() {
    },
    methods: {
        printPrescription(diagnosis) {
            // Populate data
            this.prescriptions = diagnosis.prescription.map(p => ({
                item: { text: p.pharmacy_item_name, value: p.pharmacy_item_id },
                instruction: { text: p.instruction_text, value: p.instruction_id }
            }));
            this.patient_information_data.diagnosis = diagnosis.diagnosis;

            // Show print div temporarily
            const printDiv = document.getElementById('rx-print');
            printDiv.style.display = 'block';

            window.print();

            // Hide again after printing
            printDiv.style.display = 'none';
        }
    }
}
</script>

<style scoped></style>