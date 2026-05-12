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
    FetchAllClinicServices(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/clinic_services/fetch', payload);
    },
    GetClinicServices(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/clinic_services/get', payload);
    },
    SaveClinicServices(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/clinic_services/add', payload);
    },
    UpdateClinicServices(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/clinic_services/update', payload);
    },
    DeleteClinicServices(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/clinic_services/delete', payload);
    },
}