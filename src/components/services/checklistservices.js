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
    FetchAllChecklist(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/checklist/fetch', payload);
    },
    GetChecklist(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/checklist/get', payload);
    },
    SaveChecklist(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/checklist/add', payload);
    },
    UpdateChecklist(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/checklist/update', payload);
    },
    DeleteChecklist(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/checklist/delete', payload);
    },
    FetchAllbyType(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/checklist/fetchbytype', payload);
    },
}