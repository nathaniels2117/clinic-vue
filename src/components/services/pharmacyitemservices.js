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
    FetchAllPharmacyItem(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/pharmacy_item/fetch', payload);
    },
    GetPharmacyItem(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/pharmacy_item/get', payload);
    },
    SavePharmacyItem(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/pharmacy_item/add', payload);
    },
    UpdatePharmacyItem(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/pharmacy_item/update', payload);
    },
    DeletePharmacyItem(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/pharmacy_item/delete', payload);
    },
}