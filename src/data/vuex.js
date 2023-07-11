import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
      userinfo: [],
      title: "",
      header: true,
      footer: true,
      branchinfo: [],
      snackbar: {
          show: false,
          message: ''
      },
      summaryid: 0,
      transactionid: 0,
      totalcosts: 0,
      isChat: 0,
      filingmodule: 'Overtime',
    },
    getters: {
        fetchisChat(state){
            return state.isChat;
        },
        fetchsummaryid(state){
            return state.summaryid;
        },
        fetchsalesreportid(state){
            return state.transactionid;
        },
        fetchtotalcost(state){
            return state.totalcosts;
        },
        showSnackBar: state => {
            return state.snackbar;
        },
        fetchUserInfo: state => {
            if(localStorage.getItem("userinfo") !== null){
                state.userinfo = JSON.parse(localStorage.getItem("userinfo"));
                return state.userinfo;
            }
            else{
              return state.userinfo;
            }
        },
        getTitle: state => {
            return state.title;
        },
        getHeader: state => {
            return state.header;
        },
        getFooter: state => {
            return state.footer
        },
        valAccess: function(state){
            if(localStorage.getItem("is_hris") == 1){
                return function(value) {
                    if(JSON.parse(state.userinfo.account_information.role_information.access_hris).includes(value)){
                        return true;
                    }
                    else{
                        return false;
                    }
                }
            }else{
                return function(value) {
                    if(JSON.parse(state.userinfo.account_information.role_information.access).includes(value)){
                        return true;
                    }
                    else{
                        return false;
                    }
                }
            }
        },
        valParent: function(state){
            return function() {
                if(state.userinfo.account_information.is_parent==1){
                    return true;
                }
                else{
                    return false;
                }
            }
        },
        getParentID: state => {
            return state.userinfo.account_information.is_parent == 1 ? state.userinfo.account_information.id : state.userinfo.account_information.parent_id;
        },
        getUserID: state => {
            return state.userinfo.account_information.id;
        },
        getUserName: state => {
            return state.userinfo.account_information.personal_information.firstname;
        },
        getAccessToken: state => {
            return state.userinfo.access_token;
        },
        getBusinessID: state => {
            return state.userinfo.account_information.is_parent == 1 ? state.userinfo.account_information.parent_business_information.id : state.userinfo.account_information.child_business_information.id
        },
        getCountryCode: state => {
            return state.userinfo.account_information.is_parent == 1 ? state.userinfo.account_information.parent_business_information.country_information.shortname : state.userinfo.account_information.child_business_information.country_information.shortname
        },
        getBranchID: state => {
            return state.userinfo.account_information.branch_id;
        },
        getBranchName: state => {
            return state.userinfo.account_information.branch_information.branch_name;
        },
        getRoleName: state => {
            return state.userinfo.account_information.role_information.name;
        }
    },
    mutations: {
        setUserBusinessInfo(state, payload){
            state.userinfo.account_information = payload.account_information;
            localStorage.setItem("userinfo", JSON.stringify(state.userinfo));
        }
    },
    actions: {
        setUserBusinessInfo({commit}, payload){
          commit('setUserBusinessInfo', payload);
        }
    }
});