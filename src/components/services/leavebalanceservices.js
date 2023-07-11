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
    FetchAllLeaveBalance(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/leave_balance/fetch', payload);
    },
    GetLeaveBalance(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/leave_balance/get', payload);
    },
    SaveLeaveBalance(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/leave_balance/add', payload);
    },
    UpdateLeaveBalance(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/leave_balance/update', payload);
    },
    DeleteLeaveBalance(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/leave_balance/delete', payload);
    },
    fetchLeaveBalance(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/leave_balance/fetchbalance', payload);
    },
    DeductApproveLeaveBalance(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/leave_balance/deductbalance', payload);
    },
    FetchAllBalancebyUserLeaveType(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/leave_balance/fetchbalanceviauserleavetype', payload);
    },
    UpdateorCreateLeaveBalance(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/leave_balance/updateorcreate', payload);
    }
}