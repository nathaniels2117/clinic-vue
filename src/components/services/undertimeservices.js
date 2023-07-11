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
    SaveUndertime(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/undertime/add', payload);
    },
    FetchAllUndertime(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/undertime/fetch', payload);
    },
    UpdateUndertime(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/undertime/update', payload);
    },
    GetUndertime(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/undertime/get', payload);
    },
    DeleteUndertime(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/undertime/delete', payload);
    },
    UpdateFieldUndertime(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/undertime/updatefield', payload);
    },
    FetchAllUndertimeViaUser(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/undertime/fetchviauser', payload);
    },
    UpdateRemarks(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/undertime/remarks', payload);
    },
    ApproveDisapproveUndertime(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/undertime/forapproval', payload);
    },
    FetchAllDoneUndertime(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/undertime/fetchdone', payload);
    },
}