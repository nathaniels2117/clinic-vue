<template>
    <div class="pa-6">
        <!-- Header -->
        <v-row class="align-center mb-4 justify-center">
            <v-col cols="auto" class="pr-2 d-flex align-center">
                <img v-if="business_information?.business_image"
                    :src="company_image_path + business_information.business_image" alt="Clinic Logo"
                    style="max-height:80px" />
                <img v-else src="../../assets/images/tldc_logo.png" alt="Clinic Logo" style="max-height:80px" />
            </v-col>
            <v-col cols="auto" class="d-flex flex-column align-center">
                <h1 class="mb-0 text-center">{{ business_information?.business_name }}</h1>
                <p class="mb-0 text-center">
                    {{ business_information?.business_address }},
                    {{ business_information?.city_information?.name }},
                    {{ business_information?.state_information?.name }},
                    {{ business_information?.country_information?.name }}
                </p>
                <p class="mb-0 text-center">Mobile: {{ payment.patient_info?.mobile_number }}</p>
            </v-col>
        </v-row>

        <!-- Patient Info -->
        <v-row class="align-center">
            <v-col cols="8">
                <strong>Name:</strong>
                {{ payment.patient_info?.firstname }}
                {{ payment.patient_info?.middlename ? payment.patient_info.middlename.charAt(0) + '.' : '' }}
                {{ payment.patient_info?.lastname }}
                {{ payment.patient_info?.suffix }}
            </v-col>
            <v-col cols="4" class="text-right">
                <strong>Date:</strong> {{ formattedPaymentDate }}
            </v-col>
        </v-row>

        <div v-for="(chunk, index) in paginatedCombined" :key="index" class="page"
            :class="{ 'with-top-space': index > 0 }">
            <!-- Services Table -->
            <table v-if="chunk.services.length" style="width:100%; border-collapse:collapse; margin-bottom:20px;">
                <thead>
                    <tr>
                        <th align="left">Service</th>
                        <th align="right">Price</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="s in chunk.services" :key="s.id">
                        <td>{{ s.name }}</td>
                        <td align="right">₱{{ s.price }}</td>
                    </tr>
                </tbody>
            </table>

            <!-- Pharmacy Items Table -->
            <table v-if="chunk.pharmacy.length" style="width:100%; border-collapse:collapse;">
                <thead>
                    <tr>
                        <th align="left">Pharmacy Item</th>
                        <th align="center">Qty</th>
                        <th align="right">Price</th>
                        <th align="right">Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="p in chunk.pharmacy" :key="p.id">
                        <td class="truncate">{{ p.name }}</td>
                        <td align="center">{{ p.quantity }}</td>
                        <td align="right">₱{{ p.price }}</td>
                        <td align="right">₱{{ p.price * p.quantity }}</td>
                    </tr>
                </tbody>
            </table>

            <!-- Discount + Total only on last page -->
            <v-col v-if="index === paginatedCombined.length - 1" class="text-right mt-4">
                <div v-if="discountInfo" class="mb-2">
                    <div class="mb-2">
                        <strong>Original Total:</strong> ₱{{ discountInfo.original }}
                    </div>
                    <strong>Discount:</strong>
                    {{ discountInfo.code }}
                    <span v-if="discountInfo.is_percentage">
                        - {{ discountInfo.rate }}% (₱{{ discountInfo.discount }})
                    </span>
                    <span v-else>
                        - ₱{{ discountInfo.discount }}
                    </span>
                </div>
                <h3>Total: ₱{{ payment.price }}</h3>
            </v-col>
            <div style="page-break-after:always;"></div>
        </div>


    </div>
</template>

<script>
export default {
    name: 'PrintPayment',
    data: () => ({
        payment: {},
        business_information: {},
        company_image_path: ''
    }),
    computed: {
        paginatedCombined() {
            const services = (() => {
                try { return JSON.parse(this.payment.service || '[]'); } catch { return []; }
            })();

            const pharmacy = (() => {
                try { return JSON.parse(this.payment.pharmacy_item || '[]'); } catch { return []; }
            })();

            const allItems = [
                ...services.map(s => ({ type: 'service', ...s })),
                ...pharmacy.map(p => ({ type: 'pharmacy', ...p }))
            ];

            const size = 14; // max rows per page total
            const chunks = [];
            for (let i = 0; i < allItems.length; i += size) {
                const slice = allItems.slice(i, i + size);
                chunks.push({
                    services: slice.filter(x => x.type === 'service'),
                    pharmacy: slice.filter(x => x.type === 'pharmacy')
                });
            }
            return chunks;
        },
        formattedPaymentDate() {
            if (!this.payment.payment_date) return '';
            return new Date(this.payment.payment_date).toLocaleDateString('en-US', {
                month: '2-digit',
                day: '2-digit',
                year: '2-digit'
            });
        },
        discountInfo() {
            if (!this.payment.discount_info) return null;
            const d = this.payment.discount_info;

            const finalTotal = parseFloat(this.payment.price || 0);
            const isPercent = !!this.payment.discount_is_percentage;

            let discountRate = 0;
            let discountValue = 0;
            let originalTotal = finalTotal;

            if (isPercent) {
                discountRate = parseFloat(this.payment.discount_amount || 0); // 20 = 20%
                originalTotal = finalTotal / (1 - discountRate / 100);
                discountValue = (originalTotal * (discountRate / 100)).toFixed(2);
            } else {
                discountValue = parseFloat(this.payment.discount_amount || 0).toFixed(2);
                originalTotal = finalTotal + parseFloat(discountValue);
            }

            return {
                code: d.code,
                is_percentage: isPercent,
                rate: discountRate,
                discount: discountValue,
                original: originalTotal.toFixed(2)
            };
        }
    },
    created() {
        this.$store.state.header = false;
        this.$store.state.footer = false;
        this.$store.state.snackbar.color = 'purple';
        localStorage.setItem('nav_hide', 1);

        const storedPayment = localStorage.getItem('paymentForPrint');
        if (storedPayment) {
            this.payment = JSON.parse(storedPayment);
        }

        const storedBusiness = localStorage.getItem('business_information');
        if (storedBusiness) {
            this.business_information = JSON.parse(storedBusiness);
        }

        const storedPath = localStorage.getItem('company_image_path');
        if (storedPath) {
            this.company_image_path = storedPath;
        }
        setTimeout(() => {
            window.print();
        }, 500);

        window.onafterprint = () => {
            localStorage.setItem('nav_hide', 0);
            window.close();
        }
    },
    mounted() {
        this.$store.state.title = "Print Payment";
    }
}
</script>

<style scoped>
table th,
table td {
    padding: 4px;
    border-bottom: 1px solid #ccc;
}

.with-top-space {
    padding-top: 40px;
}

.truncate {
    max-width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>
