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
    FetchAllPatientDiscount(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/patient_discount/fetch', payload);
    },
    GetPatientDiscount(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/patient_discount/get', payload);
    },
    SavePatientDiscount(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/patient_discount/add', payload);
    },
    UpdatePatientDiscount(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/patient_discount/update', payload);
    },
    DeletePatientDiscount(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/patient_discount/delete', payload);
    },
}