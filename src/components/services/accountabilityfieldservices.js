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
    FetchAllAccountabilityField(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/accountability_field/fetch', payload);
    },
    GetAccountabilityField(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/accountability_field/get', payload);
    },
    SaveAccountabilityField(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/accountability_field/add', payload);
    },
    UpdateAccountabilityField(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/accountability_field/update', payload);
    },
    DeleteAccountabilityField(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/accountability_field/delete', payload);
    },
    FetchAllAccountabilityFieldViaParentid(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/accountability_field/fetchviaparentid', payload);
    },
    FetchAllAccountabilityFieldViaUserid(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/accountability_field/fetchviauserid', payload);
    },
}