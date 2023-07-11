import Vue from "vue";
import VueRouter from "vue-router";
import Login from '../components/login/Login.vue';
import Dashboard from '../components/dashboard/Dashboard.vue';
import Company from '../components/company/Company.vue';
import Profile from '../components/profile/Profile.vue';
import Register from '../components/register/Register.vue';
import Users from '../components/users/Users.vue';
import Employees from '../components/employees/Employees.vue';
import EmailConfirm from '../components/users/EmailConfirmation.vue';
import Supplier from '../components/supplier/Supplier.vue';
import Department from '../components/department/Department.vue';
import Category from '../components/category/Category.vue';
import SubCategory from '../components/sub_category/SubCategory.vue';
import ForgotPassword from '../components/forgotpassword/ForgotPassword.vue';
import ConfirmPassword from '../components/forgotpassword/ConfirmPassword.vue';
import Branch from '../components/branch/Branch.vue';
import Devices from '../components/pos/Devices.vue';
import Product from '../components/product/Product.vue';
import Role from '../components/roles/Roles.vue';
import Overtime from '../components/hris/Overtime.vue';
import Leave from '../components/hris/Leave.vue';
import Officialbusiness from '../components/hris/Officialbusiness.vue';
import Undertime from '../components/hris/Undertime.vue';
import Timesheetconfirmation from '../components/hris/Timesheetconfirmation.vue';
import PaymentType from '../components/paymenttype/PaymentType.vue';
import Bill from '../components/bill/Bill.vue';
import Inventory from '../components/inventory/Inventory.vue';
import Stocks from '../components/inventory/Stocks.vue';
import StockCardReport from '../components/inventory/StockCardReport.vue';
import StockCard from '../components/inventory/StockCard.vue';
import Approval from '../components/inventory/Approval.vue';
import Reports from '../components/inventory/Reports.vue';
import DetailedReport from '../components/inventory/DetailedReport.vue';
import Locations from '../components/inventory/Locations.vue';
import Unit from '../components/inventory/Unit.vue';
import UnitConversion from '../components/inventory/UnitConversion.vue';
import ProductType from '../components/inventory/ProductType.vue';
import Remarks from '../components/inventory/Remarks.vue';
import Summary from '../components/inventory/Summary.vue';
import SummaryPrint from '../components/inventory/SummaryPrint.vue';
import Division from '../components/division/Division.vue';
import StockIn from '../components/stockcard/StockIn.vue';
import StockOut from '../components/stockcard/StockOut.vue';
import TransferOut from '../components/stockcard/TransferOut.vue';
import LeaveType from '../components/hris/LeaveType.vue';
import HrisForApproval from '../components/hris/HrisForApproval.vue';
import Disposal from '../components/stockcard/Disposal.vue';
import PhysicalCount from '../components/PhysicalCount/PhysicalCount.vue';
import PhysicalCountDepartment from '../components/PhysicalCount/PhysicalCountDepartment.vue';
import EmployeeInformation from '../components/hris/EmployeeInformation.vue';
import HrisListEmployee from '../components/hris/HrisListEmployee.vue';
import Discount from '../components/discount/Discount.vue';
import SalesReport from '../components/salesreport/SalesReport.vue';
import Schedule from '../components/hris/Schedule.vue';
import TimesheetLog from '../components/hris/TimesheetLog.vue';
import Announcement from '../components/hris/Announcement.vue';
import Cutoff from '../components/hris/Cutoff.vue';
import HrisDashboard from '../components/hris/HrisDashboard.vue';
import LeaveBalance from '../components/hris/LeaveBalance.vue';
import PreviewSalesReport from '../components/salesreport/PreviewSalesReport.vue';
import PrintSalesReport from '../components/salesreport/PrintSalesReport.vue';
import Chat from '../components/Chat/Chat.vue';
import Ticket from '../components/Ticket/Ticket.vue';
import Timeintimeout from '../components/hris/Timeintimeout.vue';
import Tito from '../components/hris/Tito.vue';
import Titoadmin from '../components/hris/Titoadmin.vue';
import TicketConfirm from '../components/Ticket/TicketConfirm.vue';
import Checklist from '../components/hris/Checklist.vue';
import Userchecklist from '../components/hris/Userchecklist.vue';
import TicketDashboard from '../components/Ticket/Dashboard.vue';
import Holiday from '../components/hris/Holiday.vue';
import RegisterEmployee from '../components/hris/RegisterEmployee.vue';
import Terms from '../components/Terms/Terms&condition.vue';
import PrivacyPolicy from '../components/Terms/PrivacyPolicy.vue';
import VoidReport from '../components/voidreport/VoidReport.vue';
import PreviewVoidReport from '../components/voidreport/PreviewVoidReport.vue';
import PrintVoidReport from '../components/voidreport/PrintVoidReport.vue';
import CashFundReport from '../components/cashfundreport/CashFundReport.vue';
import PreviewCashFundReport from '../components/cashfundreport/PreviewCashFundReport.vue';
import PrintCashFundReport from '../components/cashfundreport/PrintCashFundReport.vue';
import PayoutReport from '../components/payoutreport/PayoutReport.vue';
import PreviewPayoutReport from '../components/payoutreport/PreviewPayoutReport.vue';
import PrintPayoutReport from '../components/payoutreport/PrintPayoutReport.vue';
import SuccessRegisterEmployee from '../components/hris/SuccessRegisterEmployee.vue';
import PreviewItemSummaryReport from '../components/itemsummaryreport/PreviewItemSummaryReport.vue';
import PrintItemSummaryReport from '../components/itemsummaryreport/PrintItemSummaryReport.vue';
import ItemSummaryReport from '../components/itemsummaryreport/ItemSummaryReport.vue';
import PreviewPaymentSummaryReport from '../components/paymentsummaryreport/PreviewPaymentSummaryReport.vue';
import PrintPaymentSummaryReport from '../components/paymentsummaryreport/PrintPaymentSummaryReport.vue';
import PaymentSummaryReport from '../components/paymentsummaryreport/PaymentSummaryReport.vue';
import RegisterApproval from '../components/hris/RegisterApproval.vue';
import PreviewDiscountSummaryReport from '../components/discountsummaryreport/PreviewDiscountSummaryReport.vue';
import PrintDiscountSummaryReport from '../components/discountsummaryreport/PrintDiscountSummaryReport.vue';
import DiscountSummaryReport from '../components/discountsummaryreport/DiscountSummaryReport.vue';
import KnkClass from '../components/knkclass/KnkClass.vue';
import KnkArea from '../components/knkarea/KnkArea.vue';
import KnkParticular from '../components/knkparticular/KnkParticular.vue';
import KnkStandard from '../components/knkstandard/KnkStandard.vue';
import KnkSetup from '../components/knksetup/KnkSetup.vue';
import KnkRoomtype from '../components/knkroomtype/KnkRoomtype.vue';
import KnkRoom from '../components/knkroom/KnkRoom.vue';
import KnkInfo from '../components/knkinfo/KnkInfo.vue';
import AccountabilityType from '../components/hris/AccountabilityType.vue';
import AccountabilityField from '../components/hris/AccountabilityField.vue';
import ClearanceForm from '../components/hris/ClearanceForm.vue';
import PrintClearanceForm from '../components/hris/PrintClearanceForm.vue';
import LoginHris from '../components/login/LoginHris.vue';
import ArchiveEmployee from '../components/hris/ArchiveEmployee.vue';
import OrganizationalChart from '../components/hris/OrganizationalChart.vue';
import EmployeeSchedule from '../components/hris/EmployeeSchedule.vue';
import Accountability from '../components/hris/Accountability.vue';
import Coaching from '../components/hris/Coaching.vue';
import PrintCoaching from '../components/hris/PrintCoaching.vue';
import CoachingEmployee from '../components/hris/CoachingEmployee.vue';
import IncidentReport from '../components/hris/IncidentReport.vue';
import PrintIncidentReport from '../components/hris/PrintIncidentReport.vue';
import PrintNte from '../components/hris/PrintNte.vue';
import PrintNoh from '../components/hris/PrintNoh.vue';
import PrintNod from '../components/hris/PrintNod.vue';
import DisciplinaryAction from '../components/hris/DisciplinaryAction.vue';

Vue.use(VueRouter);

export default new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/knkinfo/:id', name: 'KnkInfo', component: KnkInfo,
            beforeEnter: (to, from, next) => {
                if(localStorage.getItem('userinfo') !== null){
                    if(JSON.parse(localStorage.getItem('userinfo')).length != 0){
                        next();
                    }
                }
                else{
                    next('/login');
                }
            }
        },        
        {
            path: '/knkclass', name: 'KnkClass', component: KnkClass,
            beforeEnter: (to, from, next) => {
                if(localStorage.getItem('userinfo') !== null){
                    if(JSON.parse(localStorage.getItem('userinfo')).length != 0){
                        next();
                    }
                }
                else{
                    next('/login');
                }
            }
        },
        {
            path: '/knkroom', name: 'KnkRoom', component: KnkRoom,
            beforeEnter: (to, from, next) => {
                if(localStorage.getItem('userinfo') !== null){
                    if(JSON.parse(localStorage.getItem('userinfo')).length != 0){
                        next();
                    }
                }
                else{
                    next('/login');
                }
            }
        },         
        {
            path: '/knkroomtype', name: 'KnkRoomtype', component: KnkRoomtype,
            beforeEnter: (to, from, next) => {
                if(localStorage.getItem('userinfo') !== null){
                    if(JSON.parse(localStorage.getItem('userinfo')).length != 0){
                        next();
                    }
                }
                else{
                    next('/login');
                }
            }
        },        
        {
            path: '/knkarea', name: 'KnkArea', component: KnkArea,
            beforeEnter: (to, from, next) => {
                if(localStorage.getItem('userinfo') !== null){
                    if(JSON.parse(localStorage.getItem('userinfo')).length != 0){
                        next();
                    }
                }
                else{
                    next('/login');
                }
            }
        },    
        {
            path: '/knkparticular', name: 'KnkParticular', component: KnkParticular,
            beforeEnter: (to, from, next) => {
                if(localStorage.getItem('userinfo') !== null){
                    if(JSON.parse(localStorage.getItem('userinfo')).length != 0){
                        next();
                    }
                }
                else{
                    next('/login');
                }
            }
        }, 
        {
            path: '/knkstandard', name: 'KnkStandard', component: KnkStandard,
            beforeEnter: (to, from, next) => {
                if(localStorage.getItem('userinfo') !== null){
                    if(JSON.parse(localStorage.getItem('userinfo')).length != 0){
                        next();
                    }
                }
                else{
                    next('/login');
                }
            }
        },   
        {
            path: '/knksetup', name: 'KnkSetup', component: KnkSetup,
            beforeEnter: (to, from, next) => {
                if(localStorage.getItem('userinfo') !== null){
                    if(JSON.parse(localStorage.getItem('userinfo')).length != 0){
                        next();
                    }
                }
                else{
                    next('/login');
                }
            }
        },                         
        {
            path: '/', name: 'Login', component: Login,
            beforeEnter: (to, from, next) => {
                if(localStorage.getItem('userinfo') !== null){
                    if(JSON.parse(localStorage.getItem('userinfo')).length != 0){
                        if(localStorage.getItem("is_hris") == 1){
                            next('/hrisdashboard');
                        }else{
                            next('/dashboard');
                        }
                    }
                    else{
                        next('/login');
                    }
                }
                else{
                    next();
                }
            }
        },
        {
            path: '/login', name: 'Login_2', component: Login,
            beforeEnter: (to, from, next) => {
                if(localStorage.getItem('userinfo') !== null){
                    if(JSON.parse(localStorage.getItem('userinfo')).length != 0){
                        next('/dashboard');
                    }
                    else{
                        next('/login');
                    }
                }
                else{
                    next();
                }
            }
        },
        {
            path: '/dashboard', name: 'Dashboard', component: Dashboard,
            beforeEnter: (to, from, next) => {
                if(localStorage.getItem('userinfo') !== null){
                    if(JSON.parse(localStorage.getItem('userinfo')).length != 0){
                        localStorage.setItem("is_hris", 0);
                        next();
                    }
                }
                else{
                    next('/login');
                }
            }
        },
        {
            path: '/company', name: 'Company', component: Company,
            beforeEnter: (to, from, next) => {
                if(localStorage.getItem('userinfo') !== null){
                    if(JSON.parse(localStorage.getItem('userinfo')).length != 0){
                        next();
                    }
                }
                else{
                    next('/login');
                }
            }
        },
        {
            path: '/profile', name: 'Profile', component: Profile,
            beforeEnter: (to, from, next) => {
                if(localStorage.getItem('userinfo') !== null){
                    if(JSON.parse(localStorage.getItem('userinfo')).length != 0){
                        next();
                    }
                }
                else{
                    next('/login');
                }
            }
        },
        {
            path: '/users', name: 'Users', component: Users,
            beforeEnter: (to, from, next) => {
                if(localStorage.getItem('userinfo') !== null){
                    if(JSON.parse(localStorage.getItem('userinfo')).length != 0){
                        next();
                    }
                }
                else{
                    next('/login');
                }
            }
        },
        {
            path: '/employees', name: 'employees', component: Employees,
            beforeEnter: (to, from, next) => {
                if(localStorage.getItem('userinfo') !== null){
                    if(JSON.parse(localStorage.getItem('userinfo')).length != 0){
                        next();
                    }
                }
                else{
                    next('/login');
                }
            }
        },
        {
            path: '/supplier', name: 'supplier', component: Supplier,
            beforeEnter: (to, from, next) => {
                if(localStorage.getItem('userinfo') !== null){
                    if(JSON.parse(localStorage.getItem('userinfo')).length != 0){
                        next();
                    }
                }
                else{
                    next('/login');
                }
            }
        },
        {
            path: '/department', name: 'department', component: Department,
            beforeEnter: (to, from, next) => {
                if(localStorage.getItem('userinfo') !== null){
                    if(JSON.parse(localStorage.getItem('userinfo')).length != 0){
                        next();
                    }
                }
                else{
                    next('/login');
                }
            }
        },
        {
            path: '/category', name: 'category', component: Category,
            beforeEnter: (to, from, next) => {
                if(localStorage.getItem('userinfo') !== null){
                    if(JSON.parse(localStorage.getItem('userinfo')).length != 0){
                        next();
                    }
                }
                else{
                    next('/login');
                }
            }
        },
        {
            path: '/sub_category', name: 'sub_category', component: SubCategory,
            beforeEnter: (to, from, next) => {
                if(localStorage.getItem('userinfo') !== null){
                    if(JSON.parse(localStorage.getItem('userinfo')).length != 0){
                        next();
                    }
                }
                else{
                    next('/login');
                }
            }
        },
       {
            path: '/devices', name: 'devices', component: Devices,
            beforeEnter: (to, from, next) => {
                if(localStorage.getItem('userinfo') !== null){
                    if(JSON.parse(localStorage.getItem('userinfo')).length != 0){
                        next();
                    }
                }
                else{
                    next('/login');
                }
            }
        },
        {
            path: '/branch', name: 'branch', component: Branch,
            beforeEnter: (to, from, next) => {
                if(localStorage.getItem('userinfo') !== null){
                    if(JSON.parse(localStorage.getItem('userinfo')).length != 0){
                        next();
                    }
                }
                else{
                    next('/login');
                }
            }
        },
        {
            path: '/overtime', name: 'overtime', component: Overtime,
            beforeEnter: (to, from, next) => {
                if(localStorage.getItem('userinfo') !== null && localStorage.getItem('sub_type') .includes(1)){
                    if(JSON.parse(localStorage.getItem('userinfo')).length != 0){
                        localStorage.setItem("is_hris", 1);
                        next();
                    }
                }
                else{
                    next('/login');
                }
            }
        },
        {
            path: '/leave', name: 'leave', component: Leave,
            beforeEnter: (to, from, next) => {
                if(localStorage.getItem('userinfo') !== null && localStorage.getItem('sub_type') .includes(1)){
                    if(JSON.parse(localStorage.getItem('userinfo')).length != 0){
                        localStorage.setItem("is_hris", 1);
                        next();
                    }
                }
                else{
                    next('/login');
                }
            }
        },
        {
            path: '/officialbusiness', name: 'officialbusiness', component: Officialbusiness,
            beforeEnter: (to, from, next) => {
                if(localStorage.getItem('userinfo') !== null && localStorage.getItem('sub_type') .includes(1)){
                    if(JSON.parse(localStorage.getItem('userinfo')).length != 0){
                        localStorage.setItem("is_hris", 1);
                        next();
                    }
                }
                else{
                    next('/login');
                }
            }
        },
        {
            path: '/undertime', name: 'undertime', component: Undertime,
            beforeEnter: (to, from, next) => {
                if(localStorage.getItem('userinfo') !== null && localStorage.getItem('sub_type') .includes(1)){
                    if(JSON.parse(localStorage.getItem('userinfo')).length != 0){
                        localStorage.setItem("is_hris", 1);
                        next();
                    }
                }
                else{
                    next('/login');
                }
            }
        },
        {
            path: '/timesheetconfirmation', name: 'timesheetconfirmation', component: Timesheetconfirmation,
            beforeEnter: (to, from, next) => {
                if(localStorage.getItem('userinfo') !== null && localStorage.getItem('sub_type') .includes(1)){
                    if(JSON.parse(localStorage.getItem('userinfo')).length != 0){
                        localStorage.setItem("is_hris", 1);
                        next();
                    }
                }
                else{
                    next('/login');
                }
            }
        },
        {
            path: '/product', name: 'product', component: Product,
            beforeEnter: (to, from, next) => {
                if(localStorage.getItem('userinfo') !== null){
                    if(JSON.parse(localStorage.getItem('userinfo')).length != 0){
                        localStorage.setItem("is_hris", 0);
                        next();
                    }
                }
                else{
                    next('/login');
                }
            }
        },
        {
            path: '/role', name: 'role', component: Role,
            beforeEnter: (to, from, next) => {
                if(localStorage.getItem('userinfo') !== null){
                    if(JSON.parse(localStorage.getItem('userinfo')).length != 0){
                        next();
                    }
                }
                else{
                    next('/login');
                }
            }
        },
        {
            path: '/paymenttype', name: 'paymenttype', component: PaymentType,
            beforeEnter: (to, from, next) => {
                if(localStorage.getItem('userinfo') !== null){
                    if(JSON.parse(localStorage.getItem('userinfo')).length != 0){
                        localStorage.setItem("is_hris", 0);
                        next();
                    }
                }
                else{
                    next('/login');
                }
            }
        },
        {
            path: '/billing', name: 'billing', component: Bill,
            beforeEnter: (to, from, next) => {
                if(localStorage.getItem('userinfo') !== null){
                    if(JSON.parse(localStorage.getItem('userinfo')).length != 0){
                        localStorage.setItem("is_hris", 0);
                        next();
                    }
                }
                else{
                    next('/login');
                }
            }
        },
        {
            path: '/inventory', name: 'Inventory', component: Inventory,
            beforeEnter: (to, from, next) => {
                if(localStorage.getItem('userinfo') !== null){
                    if(JSON.parse(localStorage.getItem('userinfo')).length != 0){
                        localStorage.setItem("is_hris", 0);
                        next();
                    }
                }
                else{
                    next('/login');
                }
            }
        },
        {
            path: '/stocks', name: 'Stocks', component: Stocks,
            beforeEnter: (to, from, next) => {
                if(localStorage.getItem('userinfo') !== null){
                    if(JSON.parse(localStorage.getItem('userinfo')).length != 0){
                        localStorage.setItem("is_hris", 0);
                        next();
                    }
                }
                else{
                    next('/login');
                }
            }
        },
        
        {
            path: '/stockcard', name: 'StockCard', component: StockCard,
            beforeEnter: (to, from, next) => {
                if(localStorage.getItem('userinfo') !== null){
                    if(JSON.parse(localStorage.getItem('userinfo')).length != 0){
                        localStorage.setItem("is_hris", 0);
                        next();
                    }
                }
                else{
                    next('/login');
                }
            }
        },
        {
            path: '/stockin', name: 'Stock In', component: StockIn,
            beforeEnter: (to, from, next) => {
                if(localStorage.getItem('userinfo') !== null){
                    if(JSON.parse(localStorage.getItem('userinfo')).length != 0){
                        localStorage.setItem("is_hris", 0);
                        next();
                    }
                }
                else{
                    next('/login');
                }
            }
        },
        {
            path: '/stockout', name: 'Stock Out', component: StockOut,
            beforeEnter: (to, from, next) => {
                if(localStorage.getItem('userinfo') !== null){
                    if(JSON.parse(localStorage.getItem('userinfo')).length != 0){
                        localStorage.setItem("is_hris", 0);
                        next();
                    }
                }
                else{
                    next('/login');
                }
            }
        },
        {
            path: '/transferout', name: 'Transfer Out', component: TransferOut,
            beforeEnter: (to, from, next) => {
                if(localStorage.getItem('userinfo') !== null){
                    if(JSON.parse(localStorage.getItem('userinfo')).length != 0){
                        localStorage.setItem("is_hris", 0);
                        next();
                    }
                }
                else{
                    next('/login');
                }
            }
        },
        {
            path: '/disposal', name: 'Disposal', component: Disposal,
            beforeEnter: (to, from, next) => {
                if(localStorage.getItem('userinfo') !== null){
                    if(JSON.parse(localStorage.getItem('userinfo')).length != 0){
                        localStorage.setItem("is_hris", 0);
                        next();
                    }
                }
                else{
                    next('/login');
                }
            }
        },
        {
            path: '/physicalcount', name: 'PhysicalCount', component: PhysicalCount,
            beforeEnter: (to, from, next) => {
                if(localStorage.getItem('userinfo') !== null){
                    if(JSON.parse(localStorage.getItem('userinfo')).length != 0){
                        localStorage.setItem("is_hris", 0);
                        next();
                    }
                }
                else{
                    next('/login');
                }
            }
        },
        {
            path: '/physicalcountdepartment', name: 'PhysicalCountDepartment', component: PhysicalCountDepartment,
            beforeEnter: (to, from, next) => {
                if(localStorage.getItem('userinfo') !== null){
                    if(JSON.parse(localStorage.getItem('userinfo')).length != 0){
                        localStorage.setItem("is_hris", 0);
                        next();
                    }
                }
                else{
                    next('/login');
                }
            }
        },
        {
            path: '/approval', name: 'Approval', component: Approval,
            beforeEnter: (to, from, next) => {
                if(localStorage.getItem('userinfo') !== null){
                    if(JSON.parse(localStorage.getItem('userinfo')).length != 0){
                        localStorage.setItem("is_hris", 0);
                        next();
                    }
                }
                else{
                    next('/login');
                }
            }
        },
        {
            path: '/reports', name: 'Reports', component: Reports,
            beforeEnter: (to, from, next) => {
                if(localStorage.getItem('userinfo') !== null){
                    if(JSON.parse(localStorage.getItem('userinfo')).length != 0){
                        localStorage.setItem("is_hris", 0);
                        next();
                    }
                }
                else{
                    next('/login');
                }
            }
        },
        {
            path: '/detailreports', name: 'DetailedReport', component: DetailedReport,
            beforeEnter: (to, from, next) => {
                if(localStorage.getItem('userinfo') !== null){
                    if(JSON.parse(localStorage.getItem('userinfo')).length != 0){
                        localStorage.setItem("is_hris", 0);
                        next();
                    }
                }
                else{
                    next('/login');
                }
            }
        },
        {
            path: '/stockcardreport', name: 'Stock Card Report', component: StockCardReport,
            beforeEnter: (to, from, next) => {
                if(localStorage.getItem('userinfo') !== null){
                    if(JSON.parse(localStorage.getItem('userinfo')).length != 0){
                        localStorage.setItem("is_hris", 0);
                        next();
                    }
                }
                else{
                    next('/login');
                }
            }
        },
        {
            path: '/units', name: 'Unit', component: Unit,
            beforeEnter: (to, from, next) => {
                if(localStorage.getItem('userinfo') !== null){
                    if(JSON.parse(localStorage.getItem('userinfo')).length != 0){
                        localStorage.setItem("is_hris", 0);
                        next();
                    }
                }
                else{
                    next('/login');
                }
            }
        },
        {
            path: '/unitsconversion', name: 'Unit Conversion', component: UnitConversion,
            beforeEnter: (to, from, next) => {
                if(localStorage.getItem('userinfo') !== null){
                    if(JSON.parse(localStorage.getItem('userinfo')).length != 0){
                        localStorage.setItem("is_hris", 0);
                        next();
                    }
                }
                else{
                    next('/login');
                }
            }
        },
        {
            path: '/locations', name: 'Locations', component: Locations,
            beforeEnter: (to, from, next) => {
                if(localStorage.getItem('userinfo') !== null){
                    if(JSON.parse(localStorage.getItem('userinfo')).length != 0){
                        localStorage.setItem("is_hris", 0);
                        next();
                    }
                }
                else{
                    next('/login');
                }
            }
        },
        {
            path: '/producttype', name: 'Product Type', component: ProductType,
            beforeEnter: (to, from, next) => {
                if(localStorage.getItem('userinfo') !== null){
                    if(JSON.parse(localStorage.getItem('userinfo')).length != 0){
                        localStorage.setItem("is_hris", 0);
                        next();
                    }
                }
                else{
                    next('/login');
                }
            }
        },
        {
            path: '/remarks', name: 'Remarks', component: Remarks,
            beforeEnter: (to, from, next) => {
                if(localStorage.getItem('userinfo') !== null){
                    if(JSON.parse(localStorage.getItem('userinfo')).length != 0){
                        localStorage.setItem("is_hris", 0);
                        next();
                    }
                }
                else{
                    next('/login');
                }
            }
        },
        {
            path: '/division', name: 'Division', component: Division,
            beforeEnter: (to, from, next) => {
                if(localStorage.getItem('userinfo') !== null){
                    if(JSON.parse(localStorage.getItem('userinfo')).length != 0){
                        next();
                    }
                }
                else{
                    next('/login');
                }
            }
        },
        {
            path: '/discount', name: 'Discount', component: Discount,
            beforeEnter: (to, from, next) => {
                if(localStorage.getItem('userinfo') !== null){
                    if(JSON.parse(localStorage.getItem('userinfo')).length != 0){
                        localStorage.setItem("is_hris", 0);
                        next();
                    }
                }
                else{
                    next('/login');
                }
            }
        },
        {
            path: '/salesreport', name: 'SalesReport', component: SalesReport,
            beforeEnter: (to, from, next) => {
                if(localStorage.getItem('userinfo') !== null){
                    if(JSON.parse(localStorage.getItem('userinfo')).length != 0){
                        localStorage.setItem("is_hris", 0);
                        next();
                    }
                }
                else{
                    next('/login');
                }
            }
        },
        {
            path: '/previewsalesreport', name: 'PreviewSalesReport', component: PreviewSalesReport,
            beforeEnter: (to, from, next) => {
                if(localStorage.getItem('userinfo') !== null){
                    if(JSON.parse(localStorage.getItem('userinfo')).length != 0){
                        localStorage.setItem("is_hris", 0);
                        next();
                    }
                }
                else{
                    next('/login');
                }
            }
        },
        {
            path: '/printsalesreport', name: 'PrintSalesReport', component: PrintSalesReport,
            beforeEnter: (to, from, next) => {
                if(localStorage.getItem('userinfo') !== null){
                    if(JSON.parse(localStorage.getItem('userinfo')).length != 0){
                        localStorage.setItem("is_hris", 0);
                        next();
                    }
                }
                else{
                    next('/login');
                }
            }
        },
        {
            path: '/voidreport', name: 'VoidReport', component: VoidReport,
            beforeEnter: (to, from, next) => {
                if(localStorage.getItem('userinfo') !== null){
                    if(JSON.parse(localStorage.getItem('userinfo')).length != 0){
                        localStorage.setItem("is_hris", 0);
                        next();
                    }
                }
                else{
                    next('/login');
                }
            }
        },
        {
            path: '/previewvoidreport', name: 'PreviewVoidReport', component: PreviewVoidReport,
            beforeEnter: (to, from, next) => {
                if(localStorage.getItem('userinfo') !== null){
                    if(JSON.parse(localStorage.getItem('userinfo')).length != 0){
                        localStorage.setItem("is_hris", 0);
                        next();
                    }
                }
                else{
                    next('/login');
                }
            }
        },
        {
            path: '/printvoidreport', name: 'PrintVoidReport', component: PrintVoidReport,
            beforeEnter: (to, from, next) => {
                if(localStorage.getItem('userinfo') !== null){
                    if(JSON.parse(localStorage.getItem('userinfo')).length != 0){
                        localStorage.setItem("is_hris", 0);
                        next();
                    }
                }
                else{
                    next('/login');
                }
            }
        },
        {
            path: '/cashfundreport', name: 'CashFundReport', component: CashFundReport,
            beforeEnter: (to, from, next) => {
                if(localStorage.getItem('userinfo') !== null){
                    if(JSON.parse(localStorage.getItem('userinfo')).length != 0){
                        localStorage.setItem("is_hris", 0);
                        next();
                    }
                }
                else{
                    next('/login');
                }
            }
        },
        {
            path: '/previewcashFundreport', name: 'PreviewCashFundReport', component: PreviewCashFundReport,
            beforeEnter: (to, from, next) => {
                if(localStorage.getItem('userinfo') !== null){
                    if(JSON.parse(localStorage.getItem('userinfo')).length != 0){
                        localStorage.setItem("is_hris", 0);
                        next();
                    }
                }
                else{
                    next('/login');
                }
            }
        },
        {
            path: '/printcashfundreport', name: 'PrintCashFundReport', component: PrintCashFundReport,
            beforeEnter: (to, from, next) => {
                if(localStorage.getItem('userinfo') !== null){
                    if(JSON.parse(localStorage.getItem('userinfo')).length != 0){
                        localStorage.setItem("is_hris", 0);
                        next();
                    }
                }
                else{
                    next('/login');
                }
            }
        }, 
        {
            path: '/payoutreport', name: 'PayoutReport', component: PayoutReport,
            beforeEnter: (to, from, next) => {
                if(localStorage.getItem('userinfo') !== null){
                    if(JSON.parse(localStorage.getItem('userinfo')).length != 0){
                        localStorage.setItem("is_hris", 0);
                        next();
                    }
                }
                else{
                    next('/login');
                }
            }
        },
        {
            path: '/previewpayoutreport', name: 'PreviewPayoutReport', component: PreviewPayoutReport,
            beforeEnter: (to, from, next) => {
                if(localStorage.getItem('userinfo') !== null){
                    if(JSON.parse(localStorage.getItem('userinfo')).length != 0){
                        localStorage.setItem("is_hris", 0);
                        next();
                    }
                }
                else{
                    next('/login');
                }
            }
        },
        {
            path: '/printpayoutreport', name: 'PrintPayoutReport', component: PrintPayoutReport,
            beforeEnter: (to, from, next) => {
                if(localStorage.getItem('userinfo') !== null){
                    if(JSON.parse(localStorage.getItem('userinfo')).length != 0){
                        localStorage.setItem("is_hris", 0);
                        next();
                    }
                }
                else{
                    next('/login');
                }
            }
        },         
        {
            path: '/itemsummaryreport', name: 'ItemSummaryReport', component: ItemSummaryReport,
            beforeEnter: (to, from, next) => {
                if(localStorage.getItem('userinfo') !== null){
                    if(JSON.parse(localStorage.getItem('userinfo')).length != 0){
                        localStorage.setItem("is_hris", 0);
                        next();
                    }
                }
                else{
                    next('/login');
                }
            }
        },
        {
            path: '/previewitemsummaryreport', name: 'PreviewItemSummaryReport', component: PreviewItemSummaryReport,
            beforeEnter: (to, from, next) => {
                if(localStorage.getItem('userinfo') !== null){
                    if(JSON.parse(localStorage.getItem('userinfo')).length != 0){
                        localStorage.setItem("is_hris", 0);
                        next();
                    }
                }
                else{
                    next('/login');
                }
            }
        },
        {
            path: '/printitemsummaryreport', name: 'PrintItemSummaryReport', component: PrintItemSummaryReport,
            beforeEnter: (to, from, next) => {
                if(localStorage.getItem('userinfo') !== null){
                    if(JSON.parse(localStorage.getItem('userinfo')).length != 0){
                        localStorage.setItem("is_hris", 0);
                        next();
                    }
                }
                else{
                    next('/login');
                }
            }
        }, 
        {
            path: '/paymentsummaryreport', name: 'PaymentSummaryReport', component: PaymentSummaryReport,
            beforeEnter: (to, from, next) => {
                if(localStorage.getItem('userinfo') !== null){
                    if(JSON.parse(localStorage.getItem('userinfo')).length != 0){
                        localStorage.setItem("is_hris", 0);
                        next();
                    }
                }
                else{
                    next('/login');
                }
            }
        },
        {
            path: '/previewpaymentsummaryreport', name: 'PreviewPaymentSummaryReport', component: PreviewPaymentSummaryReport,
            beforeEnter: (to, from, next) => {
                if(localStorage.getItem('userinfo') !== null){
                    if(JSON.parse(localStorage.getItem('userinfo')).length != 0){
                        localStorage.setItem("is_hris", 0);
                        next();
                    }
                }
                else{
                    next('/login');
                }
            }
        },
        {
            path: '/printpaymentsummaryreport', name: 'PrintPaymentSummaryReport', component: PrintPaymentSummaryReport,
            beforeEnter: (to, from, next) => {
                if(localStorage.getItem('userinfo') !== null){
                    if(JSON.parse(localStorage.getItem('userinfo')).length != 0){
                        localStorage.setItem("is_hris", 0);
                        next();
                    }
                }
                else{
                    next('/login');
                }
            }
        }, 
        {
            path: '/discountsummaryreport', name: 'DiscountSummaryReport', component: DiscountSummaryReport,
            beforeEnter: (to, from, next) => {
                if(localStorage.getItem('userinfo') !== null){
                    if(JSON.parse(localStorage.getItem('userinfo')).length != 0){
                        localStorage.setItem("is_hris", 0);
                        next();
                    }
                }
                else{
                    next('/login');
                }
            }
        },
        {
            path: '/previewdiscountsummaryreport', name: 'PreviewDiscountSummaryReport', component: PreviewDiscountSummaryReport,
            beforeEnter: (to, from, next) => {
                if(localStorage.getItem('userinfo') !== null){
                    if(JSON.parse(localStorage.getItem('userinfo')).length != 0){
                        localStorage.setItem("is_hris", 0);
                        next();
                    }
                }
                else{
                    next('/login');
                }
            }
        },
        {
            path: '/printdiscountsummaryreport', name: 'PrintDiscountSummaryReport', component: PrintDiscountSummaryReport,
            beforeEnter: (to, from, next) => {
                if(localStorage.getItem('userinfo') !== null){
                    if(JSON.parse(localStorage.getItem('userinfo')).length != 0){
                        localStorage.setItem("is_hris", 0);
                        next();
                    }
                }
                else{
                    next('/login');
                }
            }
        }, 
        {
            path: '/summary', name: 'Summary', component: Summary,
            beforeEnter: (to, from, next) => {
                if(localStorage.getItem('userinfo') !== null){
                    if(JSON.parse(localStorage.getItem('userinfo')).length != 0){
                        localStorage.setItem("is_hris", 0);
                        next();
                    }
                }
                else{
                    next('/login');
                }
            }
        },
        {
            path: '/summaryprint', name: 'SummaryPrint', component: SummaryPrint,
            beforeEnter: (to, from, next) => {
                if(localStorage.getItem('userinfo') !== null){
                    if(JSON.parse(localStorage.getItem('userinfo')).length != 0){
                        localStorage.setItem("is_hris", 0);
                        next();
                    }
                }
                else{
                    next('/login');
                }
            }
        },
        {
            path: '/leavetype', name: 'LeaveType', component: LeaveType,
            beforeEnter: (to, from, next) => {
                if(localStorage.getItem('userinfo') !== null && localStorage.getItem('sub_type') .includes(1)){
                    if(JSON.parse(localStorage.getItem('userinfo')).length != 0){
                        localStorage.setItem("is_hris", 1);
                        next();
                    }
                }
                else{
                    next('/login');
                }
            }
        },
        {
            path: '/hrisforapproval', name: 'HrisForApproval', component: HrisForApproval,
            beforeEnter: (to, from, next) => {
                if(localStorage.getItem('userinfo') !== null && localStorage.getItem('sub_type') .includes(1)){
                    if(JSON.parse(localStorage.getItem('userinfo')).length != 0){
                        localStorage.setItem("is_hris", 1);
                        next();
                    }
                }
                else{
                    next('/login');
                }
            }
        },
        {
            path: '/employeeinformation', name: 'EmployeeInformation', component: EmployeeInformation,
            beforeEnter: (to, from, next) => {
                if(localStorage.getItem('userinfo') !== null && localStorage.getItem('sub_type') .includes(1)){
                    if(JSON.parse(localStorage.getItem('userinfo')).length != 0){
                        localStorage.setItem("is_hris", 1);
                        next();
                    }
                }
                else{
                    next('/login');
                }
            }
        },
        {
            path: '/hrislistemployee', name: 'HrisListEmployee', component: HrisListEmployee,
            beforeEnter: (to, from, next) => {
                if(localStorage.getItem('userinfo') !== null && localStorage.getItem('sub_type') .includes(1)){
                    if(JSON.parse(localStorage.getItem('userinfo')).length != 0){
                        localStorage.setItem("is_hris", 1);
                        next();
                    }
                }
                else{
                    next('/login');
                }
            }
        },
        {
            path: '/schedule', name: 'Schedule', component: Schedule,
            beforeEnter: (to, from, next) => {
                if(localStorage.getItem('userinfo') !== null && localStorage.getItem('sub_type') .includes(1)){
                    if(JSON.parse(localStorage.getItem('userinfo')).length != 0){
                        localStorage.setItem("is_hris", 1);
                        next();
                    }
                }
                else{
                    next('/login');
                }
            }
        },
        {
            path: '/timesheetlog', name: 'TimesheetLog', component: TimesheetLog,
            beforeEnter: (to, from, next) => {
                if(localStorage.getItem('userinfo') !== null && localStorage.getItem('sub_type') .includes(1)){
                    if(JSON.parse(localStorage.getItem('userinfo')).length != 0){
                        localStorage.setItem("is_hris", 1);
                        next();
                    }
                }
                else{
                    next('/login');
                }
            }
        },
        {
            path: '/announcement', name: 'Announcement', component: Announcement,
            beforeEnter: (to, from, next) => {
                if(localStorage.getItem('userinfo') !== null && localStorage.getItem('sub_type') .includes(1)){
                    if(JSON.parse(localStorage.getItem('userinfo')).length != 0){
                        localStorage.setItem("is_hris", 1);
                        next();
                    }
                }
                else{
                    next('/login');
                }
            }
        },
        {
            path: '/checklist', name: 'Checklist', component: Checklist,
            beforeEnter: (to, from, next) => {
                if(localStorage.getItem('userinfo') !== null && localStorage.getItem('sub_type') .includes(1)){
                    if(JSON.parse(localStorage.getItem('userinfo')).length != 0){
                        localStorage.setItem("is_hris", 1);
                        next();
                    }
                }
                else{
                    next('/login');
                }
            }
        },
        {
            path: '/cutoff', name: 'Cutoff', component: Cutoff,
            beforeEnter: (to, from, next) => {
                if(localStorage.getItem('userinfo') !== null && localStorage.getItem('sub_type') .includes(1)){
                    if(JSON.parse(localStorage.getItem('userinfo')).length != 0){
                        localStorage.setItem("is_hris", 1);
                        next();
                    }
                }
                else{
                    next('/login');
                }
            }
        },
        {
            path: '/hrisdashboard', name: 'HrisDashboard', component: HrisDashboard,
            beforeEnter: (to, from, next) => {
                if(localStorage.getItem('userinfo') !== null && localStorage.getItem('sub_type') .includes(1)){
                    if(JSON.parse(localStorage.getItem('userinfo')).length != 0){
                        localStorage.setItem("is_hris", 1);
                        next();
                    }
                }
                else{
                    next('/login');
                }
            }
        },

        {
            path: '/Chat', name: 'Chat', component: Chat,
            beforeEnter: (to, from, next) => {
                if(localStorage.getItem('userinfo') !== null){
                    if(JSON.parse(localStorage.getItem('userinfo')).length != 0){
                        next();
                    }
                }
                else{
                    next('/login');
                }
            }
        },
        {
            path: '/leavebalance', name: 'LeaveBalance', component: LeaveBalance,
            beforeEnter: (to, from, next) => {
                if(localStorage.getItem('userinfo') !== null && localStorage.getItem('sub_type') .includes(1)){
                    if(JSON.parse(localStorage.getItem('userinfo')).length != 0){
                        localStorage.setItem("is_hris", 1);
                        next();
                    }
                }
                else{
                    next('/login');
                }
            }
        },

        {
            path: '/tito', name: 'Tito', component: Tito,
            beforeEnter: (to, from, next) => {
                if(localStorage.getItem('userinfo') !== null && localStorage.getItem('sub_type') .includes(1)){
                    if(JSON.parse(localStorage.getItem('userinfo')).length != 0){
                        localStorage.setItem("is_hris", 1);
                        next();
                    }
                }
                else{
                    next('/login');
                }
            }
        },

        {
            path: '/titoadmin', name: 'Titoadmin', component: Titoadmin,
            beforeEnter: (to, from, next) => {
                if(localStorage.getItem('userinfo') !== null && localStorage.getItem('sub_type') .includes(1)){
                    if(JSON.parse(localStorage.getItem('userinfo')).length != 0){
                        localStorage.setItem("is_hris", 1);
                        next();
                    }
                }
                else{
                    next('/login');
                }
            }
        },

        {
            path: '/userchecklist', name: 'Userchecklist', component: Userchecklist,
            beforeEnter: (to, from, next) => {
                if(localStorage.getItem('userinfo') !== null && localStorage.getItem('sub_type') .includes(1)){
                    if(JSON.parse(localStorage.getItem('userinfo')).length != 0){
                        localStorage.setItem("is_hris", 1);
                        next();
                    }
                }
                else{
                    next('/login');
                }
            }
        },
        {
            path: '/holiday', name: 'Holiday', component: Holiday,
            beforeEnter: (to, from, next) => {
                if(localStorage.getItem('userinfo') !== null && localStorage.getItem('sub_type') .includes(1)){
                    if(JSON.parse(localStorage.getItem('userinfo')).length != 0){
                        localStorage.setItem("is_hris", 1);
                        next();
                    }
                }
                else{
                    next('/login');
                }
            }
        },
        {
            path: '/accountabilitytype', name: 'Accountability Type', component: AccountabilityType,
            beforeEnter: (to, from, next) => {
                if(localStorage.getItem('userinfo') !== null && localStorage.getItem('sub_type') .includes(1)){
                    if(JSON.parse(localStorage.getItem('userinfo')).length != 0){
                        localStorage.setItem("is_hris", 1);
                        next();
                    }
                }
                else{
                    next('/login');
                }
            }
        },
        {
            path: '/accountabilityfield', name: 'Accountability Field', component: AccountabilityField,
            beforeEnter: (to, from, next) => {
                if(localStorage.getItem('userinfo') !== null && localStorage.getItem('sub_type') .includes(1)){
                    if(JSON.parse(localStorage.getItem('userinfo')).length != 0){
                        localStorage.setItem("is_hris", 1);
                        next();
                    }
                }
                else{
                    next('/login');
                }
            }
        },
        {
            path: '/registerapproval', name: 'RegisterApproval', component: RegisterApproval,
            beforeEnter: (to, from, next) => {
                if(localStorage.getItem('userinfo') !== null && localStorage.getItem('sub_type') .includes(1)){
                    if(JSON.parse(localStorage.getItem('userinfo')).length != 0){
                        localStorage.setItem("is_hris", 1);
                        next();
                    }
                }
                else{
                    next('/login');
                }
            }
        },
        {
            path: '/clearanceform', name: 'ClearanceForm', component: ClearanceForm,
            beforeEnter: (to, from, next) => {
                if(localStorage.getItem('userinfo') !== null && localStorage.getItem('sub_type') .includes(1)){
                    if(JSON.parse(localStorage.getItem('userinfo')).length != 0){
                        localStorage.setItem("is_hris", 1);
                        next();
                    }
                }
                else{
                    next('/login');
                }
            }
        },
        {
            path: '/printclearanceform', name: 'PrintClearanceForm', component: PrintClearanceForm,
            beforeEnter: (to, from, next) => {
                if(localStorage.getItem('userinfo') !== null && localStorage.getItem('sub_type') .includes(1)){
                    if(JSON.parse(localStorage.getItem('userinfo')).length != 0){
                        next();
                    }
                }
                else{
                    next('/login');
                }
            }
        },
        {
            path: '/loginhris', name: 'LoginHris', component: LoginHris,
            beforeEnter: (to, from, next) => {
                if(localStorage.getItem('userinfo') !== null && localStorage.getItem('sub_type') .includes(1)){
                    if(JSON.parse(localStorage.getItem('userinfo')).length != 0){
                        next('/hrisdashboard');
                    }
                    else{
                        next('/loginhris');
                    }
                }
                else{
                    next();
                }
            }
        },
        {
            path: '/archiveemployee', name: 'ArchiveEmployee', component: ArchiveEmployee,
            beforeEnter: (to, from, next) => {
                if(localStorage.getItem('userinfo') !== null && localStorage.getItem('sub_type') .includes(1)){
                    if(JSON.parse(localStorage.getItem('userinfo')).length != 0){
                        localStorage.setItem("is_hris", 1);
                        next();
                    }
                }
                else{
                    next('/login');
                }
            }
        },
        {
            path: '/accountability', name: 'Accountability', component: Accountability,
            beforeEnter: (to, from, next) => {
                if(localStorage.getItem('userinfo') !== null && localStorage.getItem('sub_type') .includes(1)){
                    if(JSON.parse(localStorage.getItem('userinfo')).length != 0){
                        localStorage.setItem("is_hris", 1);
                        next();
                    }
                }
                else{
                    next('/login');
                }
            }
        },
        {
            path: '/organizationalchart', name: 'OrganizationalChart', component: OrganizationalChart,
            beforeEnter: (to, from, next) => {
                if(localStorage.getItem('userinfo') !== null && localStorage.getItem('sub_type') .includes(1)){
                    if(JSON.parse(localStorage.getItem('userinfo')).length != 0){
                        localStorage.setItem("is_hris", 1);
                        next();
                    }
                }
                else{
                    next('/login');
                }
            }
        },
        {
            path: '/coaching', name: 'Coaching', component: Coaching,
            beforeEnter: (to, from, next) => {
                if(localStorage.getItem('userinfo') !== null && localStorage.getItem('sub_type') .includes(1)){
                    if(JSON.parse(localStorage.getItem('userinfo')).length != 0){
                        localStorage.setItem("is_hris", 1);
                        next();
                    }
                }
                else{
                    next('/login');
                }
            }
        },
        {
            path: '/employeeschedule', name: 'EmployeeSchedule', component: EmployeeSchedule,
            beforeEnter: (to, from, next) => {
                if(localStorage.getItem('userinfo') !== null && localStorage.getItem('sub_type') .includes(1)){
                    if(JSON.parse(localStorage.getItem('userinfo')).length != 0){
                        localStorage.setItem("is_hris", 1);
                        next();
                    }
                }
                else{
                    next('/login');
                }
            }
        },
        {
            path: '/printcoaching', name: 'PrintCoaching', component: PrintCoaching,
            beforeEnter: (to, from, next) => {
                if(localStorage.getItem('userinfo') !== null && localStorage.getItem('sub_type') .includes(1)){
                    if(JSON.parse(localStorage.getItem('userinfo')).length != 0){
                        next();
                    }
                }
                else{
                    next('/login');
                }
            }
        },
        {
            path: '/coachingemployee', name: 'CoachingEmployee', component: CoachingEmployee,
            beforeEnter: (to, from, next) => {
                if(localStorage.getItem('userinfo') !== null && localStorage.getItem('sub_type') .includes(1)){
                    if(JSON.parse(localStorage.getItem('userinfo')).length != 0){
                        localStorage.setItem("is_hris", 1);
                        next();
                    }
                }
                else{
                    next('/login');
                }
            }
        },
        {
            path: '/incidentreport', name: 'IncidentReport', component: IncidentReport,
            beforeEnter: (to, from, next) => {
                if(localStorage.getItem('userinfo') !== null && localStorage.getItem('sub_type') .includes(1)){
                    if(JSON.parse(localStorage.getItem('userinfo')).length != 0){
                        localStorage.setItem("is_hris", 1);
                        next();
                    }
                }
                else{
                    next('/login');
                }
            }
        },
        {
            path: '/printincidentreport', name: 'PrintIncidentReport', component: PrintIncidentReport,
            beforeEnter: (to, from, next) => {
                if(localStorage.getItem('userinfo') !== null && localStorage.getItem('sub_type') .includes(1)){
                    if(JSON.parse(localStorage.getItem('userinfo')).length != 0){
                        next();
                    }
                }
                else{
                    next('/login');
                }
            }
        },
        {
            path: '/printnte', name: 'PrintNte', component: PrintNte,
            beforeEnter: (to, from, next) => {
                if(localStorage.getItem('userinfo') !== null && localStorage.getItem('sub_type') .includes(1)){
                    if(JSON.parse(localStorage.getItem('userinfo')).length != 0){
                        next();
                    }
                }
                else{
                    next('/login');
                }
            }
        },
        {
            path: '/printnoh', name: 'PrintNoh', component: PrintNoh,
            beforeEnter: (to, from, next) => {
                if(localStorage.getItem('userinfo') !== null && localStorage.getItem('sub_type') .includes(1)){
                    if(JSON.parse(localStorage.getItem('userinfo')).length != 0){
                        next();
                    }
                }
                else{
                    next('/login');
                }
            }
        },
        {
            path: '/printnod', name: 'PrintNod', component: PrintNod,
            beforeEnter: (to, from, next) => {
                if(localStorage.getItem('userinfo') !== null && localStorage.getItem('sub_type') .includes(1)){
                    if(JSON.parse(localStorage.getItem('userinfo')).length != 0){
                        next();
                    }
                }
                else{
                    next('/login');
                }
            }
        },
        {
            path: '/disciplinaryaction', name: 'DisciplinaryAction', component: DisciplinaryAction,
            beforeEnter: (to, from, next) => {
                if(localStorage.getItem('userinfo') !== null && localStorage.getItem('sub_type') .includes(1)){
                    if(JSON.parse(localStorage.getItem('userinfo')).length != 0){
                        localStorage.setItem("is_hris", 1);
                        next();
                    }
                }
                else{
                    next('/login');
                }
            }
        },
    
    
        // Routes For No Login Needed
        {
            path: '/Ticket', name: 'Ticket', component: Ticket
        },
        {
            path: '/ticketconfirm/:id', name: 'TicketConfirm', component: TicketConfirm
        },
        {
            path: '/ticketdashboard', name: 'TicketDashboard', component: TicketDashboard
        },
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
        {
            path: '/timeintimeout', name: 'Timeintimeout', component: Timeintimeout
        },
        {
            path: '/registeremployee/:parent_id', name: 'RegisterEmployee', component: RegisterEmployee
        },
        {
            path: '/terms&conditions', name: 'Terms', component: Terms
        },
        {
            path: '/privacypolicy', name: 'PrivacyPolicy', component: PrivacyPolicy
        },
        {
            path: '/successregisteremployee', name: 'SuccessRegisterEmployee', component: SuccessRegisterEmployee
        }
    ]
});
