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
    FetchAllPharmacyCategory(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/pharmacy_category/fetch', payload);
    },
    GetPharmacyCategory(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/pharmacy_category/get', payload);
    },
    SavePharmacyCategory(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/pharmacy_category/add', payload);
    },
    UpdatePharmacyCategory(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/pharmacy_category/update', payload);
    },
    DeletePharmacyCategory(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/pharmacy_category/delete', payload);
    },
}