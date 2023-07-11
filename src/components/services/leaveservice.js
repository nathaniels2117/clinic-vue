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
    FetchAllLeave(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/leave/fetch', payload);
    },
    FetchAllDoneLeave(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/leave/fetchdone', payload);
    },
    FetchAllLeaveViaUser(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/leave/fetchviauser', payload);
    },
    GetLeave(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/leave/get', payload);
    },
    SaveLeave(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/leave/add', payload);
    },
    UpdateLeave(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/leave/update', payload);
    },
    UpdateApproveDisapprove(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/leave/approval', payload);
    },
    UpdateRemarks(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/leave/remarks', payload);
    },
    DeleteLeave(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/leave/delete', payload);
    },
    ApproveDisapproveLeave(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/leave/forapproval', payload);
    }
}