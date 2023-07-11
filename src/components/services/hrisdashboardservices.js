import axios from 'axios';

export default {
    jsonConfig(token){
        return axios.create({
            baseURL: process.env.VUE_APP_API_URL,
            responseType: 'json',
            withCredentials: false,
            headers: {
                Authorization: 'Bearer ' + token
            }
        });
    },
    FetchAllPendingApprovalViaUser(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/hrisdashboard/fetchpendingviauser', payload);
    },
    FetchAllLeaveBalanceViaUser(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/hrisdashboard/fetchleavebalance', payload);
    },
    FetchInfoforDashboard(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/hrisdashboard/fetchinfodashboard', payload);
    }
}