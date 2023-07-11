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
    FetchAllAccountabilityType(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/accountability_type/fetch', payload);
    },
    GetAccountabilityType(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/accountability_type/get', payload);
    },
    SaveAccountabilityType(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/accountability_type/add', payload);
    },
    UpdateAccountabilityType(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/accountability_type/update', payload);
    },
    DeleteAccountabilityType(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/accountability_type/delete', payload);
    },
}