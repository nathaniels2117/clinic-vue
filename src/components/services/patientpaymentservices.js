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
    FetchAllPatientPayment(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/patient_payment/fetch', payload);
    },
    GetPatientPayment(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/patient_payment/get', payload);
    },
    SavePatientPayment(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/patient_payment/add', payload);
    },
    UpdatePatientPayment(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/patient_payment/update', payload);
    },
    DeletePatientPayment(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/patient_payment/delete', payload);
    },
}