import Vue from "vue";
import VueRouter from "vue-router";
import Dashboard from '../components/dashboard/Dashboard.vue';
import Company from '../components/company/Company.vue';
import Profile from '../components/profile/Profile.vue';
import Register from '../components/register/Register.vue';
import EmailConfirm from '../components/users/EmailConfirmation.vue';
import ForgotPassword from '../components/forgotpassword/ForgotPassword.vue';
import ConfirmPassword from '../components/forgotpassword/ConfirmPassword.vue';

// Clinic Project 
import ClinicLogin from '../components/clinic/ClinicLogin.vue';
import ClinicDashboard from '../components/clinic/ClinicDashboard.vue';
import PatientInformation from '../components/clinic/PatientInformation.vue';
import PharmacyCategory from '../components/clinic/PharmacyCategory.vue';
import PharmacyItem from '../components/clinic/PharmacyItem.vue';
import PatientDiagnosis from '../components/clinic/PatientDiagnosis.vue';
import Instruction from '../components/clinic/Instruction.vue';
import PrintDiagnosis from '../components/clinic/PrintDiagnosis.vue';
import ClinicServices from '../components/clinic/ClinicServices.vue';
import ClinicSchedule from '../components/clinic/ClinicSchedule.vue';
import PatientDiscount from '../components/clinic/PatientDiscount.vue';
import PatientPayment from '../components/clinic/PatientPayment.vue';
import PrintPayment from '../components/clinic/PrintPayment.vue';

Vue.use(VueRouter);

export default new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/cliniclogin', name: 'ClinicLogin', component: ClinicLogin,
            beforeEnter: (to, from, next) => {
                if (localStorage.getItem('userinfo') !== null) {
                    next('/cliniclogin');
                }
                else {
                    next();
                }
            }
        },
        {
            path: '/clinicdashboard', name: 'ClinicDashboard', component: ClinicDashboard,
            beforeEnter: (to, from, next) => {
                if (localStorage.getItem('userinfo') !== null) {
                    next();
                }
                else {
                    next('/cliniclogin');
                }
            }
        },
        {
            path: '/patientinformation', name: 'PatientInformation', component: PatientInformation,
            beforeEnter: (to, from, next) => {
                if (localStorage.getItem('userinfo') !== null) {
                    next();
                }
                else {
                    next('/cliniclogin');
                }
            }
        },
        {
            path: '/pharmacycategory', name: 'PharmacyCategory', component: PharmacyCategory,
            beforeEnter: (to, from, next) => {
                if (localStorage.getItem('userinfo') !== null) {
                    next();
                }
                else {
                    next('/cliniclogin');
                }
            }
        },
        {
            path: '/pharmacyitem', name: 'PharmacyItem', component: PharmacyItem,
            beforeEnter: (to, from, next) => {
                if (localStorage.getItem('userinfo') !== null) {
                    next();
                }
                else {
                    next('/cliniclogin');
                }
            }
        },
        {
            path: '/patientdiagnosis', name: 'PatientDiagnosis', component: PatientDiagnosis,
            beforeEnter: (to, from, next) => {
                if (localStorage.getItem('userinfo') !== null) {
                    next();
                }
                else {
                    next('/cliniclogin');
                }
            }
        },
        {
            path: '/instruction', name: 'Instruction', component: Instruction,
            beforeEnter: (to, from, next) => {
                if (localStorage.getItem('userinfo') !== null) {
                    next();
                }
                else {
                    next('/cliniclogin');
                }
            }
        },
        {
            path: '/printdiagnosis', name: 'PrintDiagnosis', component: PrintDiagnosis,
            beforeEnter: (to, from, next) => {
                if (localStorage.getItem('userinfo') !== null) {
                    next();
                }
                else {
                    next('/cliniclogin');
                }
            }
        },
        {
            path: '/services', name: 'ClinicServices', component: ClinicServices,
            beforeEnter: (to, from, next) => {
                if (localStorage.getItem('userinfo') !== null) {
                    next();
                }
                else {
                    next('/cliniclogin');
                }
            }
        },
        {
            path: '/clinicschedule', name: 'ClinicSchedule', component: ClinicSchedule,
            beforeEnter: (to, from, next) => {
                if (localStorage.getItem('userinfo') !== null) {
                    next();
                }
                else {
                    next('/cliniclogin');
                }
            }
        },
        {
            path: '/patientdiscount', name: 'PatientDiscount', component: PatientDiscount,
            beforeEnter: (to, from, next) => {
                if (localStorage.getItem('userinfo') !== null) {
                    next();
                }
                else {
                    next('/cliniclogin');
                }
            }
        },
        {
            path: '/patientpayment', name: 'PatientPayment', component: PatientPayment,
            beforeEnter: (to, from, next) => {
                if (localStorage.getItem('userinfo') !== null) {
                    next();
                }
                else {
                    next('/cliniclogin');
                }
            }
        },
        {
            path: '/printpayment', name: 'PrintPayment', component: PrintPayment,
            beforeEnter: (to, from, next) => {
                if (localStorage.getItem('userinfo') !== null) {
                    next();
                }
                else {
                    next('/cliniclogin');
                }
            }
        },
        {
            path: '/', name: 'ClinicLogin', component: ClinicLogin,
            beforeEnter: (to, from, next) => {
                if (localStorage.getItem('userinfo') !== null) {
                    if (JSON.parse(localStorage.getItem('userinfo')).length != 0) {
                        next('/clinicdashboard');
                    }
                    else {
                        next('/cliniclogin');
                    }
                }
                else {
                    next();
                }
            }
        },
        {
            path: '/login', name: 'ClinicLogin_2', component: ClinicLogin,
            beforeEnter: (to, from, next) => {
                if (localStorage.getItem('userinfo') !== null) {
                    if (JSON.parse(localStorage.getItem('userinfo')).length != 0) {
                        next('/clinicdashboard');
                    }
                    else {
                        next('/cliniclogin');
                    }
                }
                else {
                    next();
                }
            }
        },
        {
            path: '/dashboard', name: 'Dashboard', component: Dashboard,
            beforeEnter: (to, from, next) => {
                if (localStorage.getItem('userinfo') !== null) {
                    next();
                }
                else {
                    next('/cliniclogin');
                }
            }
        },
        {
            path: '/company', name: 'Company', component: Company,
            beforeEnter: (to, from, next) => {
                if (localStorage.getItem('userinfo') !== null) {
                    next();
                }
                else {
                    next('/cliniclogin');
                }
            }
        },
        {
            path: '/profile', name: 'Profile', component: Profile,
            beforeEnter: (to, from, next) => {
                if (localStorage.getItem('userinfo') !== null) {
                    next();
                }
                else {
                    next('/cliniclogin');
                }
            }
        },
        // Routes For No Login Needed
        {
            path: '/emailconfirm/:id', name: 'emailconfirm', component: EmailConfirm
        },
        {
            path: '/register', name: 'Register', component: Register
        },
        {
            path: '/forgotpassword', name: 'ForgotPassword', component: ForgotPassword
        },
        {
            path: '/changepassword/:token', name: 'ChangePassword', component: ConfirmPassword
        },
    ]
});
