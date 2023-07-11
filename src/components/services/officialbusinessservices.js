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
    SaveOfficialBusiness(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/official_business/add', payload);
    },
    FetchAllOfficialBusiness(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/official_business/fetch', payload);
    },
    UpdateOfficialBusiness(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/official_business/update', payload);
    },
    GetOfficialBusiness(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/official_business/get', payload);
    },
    DeleteOfficialBusiness(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/official_business/delete', payload);
    },
    UpdateFieldOfficialBusiness(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/official_business/updatefield', payload);
    },
    FetchAllOfficialBusinessViaUser(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/official_business/fetchviauser', payload);
    },
    UpdateRemarks(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/official_business/remarks', payload);
    },
    ApproveDisapproveOfficialBusiness(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/official_business/forapproval', payload);
    },
    FetchAllDoneOfficialBusiness(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/official_business/fetchdone', payload);
    },
}