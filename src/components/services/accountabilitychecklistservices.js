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
    FetchAllAccountabilityChecklist(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/accountability_checklist/fetch', payload);
    },
    GetAccountabilityChecklist(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/accountability_checklist/get', payload);
    },
    SaveAccountabilityChecklist(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/accountability_checklist/add', payload);
    },
    UpdateAccountabilityChecklist(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/accountability_checklist/update', payload);
    },
    DeleteAccountabilityChecklist(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/accountability_checklist/delete', payload);
    },
}