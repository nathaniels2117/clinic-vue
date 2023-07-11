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
    FetchAllChecklistStatus(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/checklist_status/fetch', payload);
    },
    GetChecklistStatus(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/checklist_status/get', payload);
    },
    SaveChecklistStatus(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/checklist_status/add', payload);
    },
    UpdateChecklistStatus(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/checklist_status/update', payload);
    },
    DeleteChecklistStatus(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/checklist_status/delete', payload);
    },
    ApproveDisapproveChecklistStatus(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/checklist_status/approvedisapprove', payload);
    },
}