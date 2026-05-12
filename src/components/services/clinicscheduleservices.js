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
    FetchAllClinicSchedule(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/clinic_schedule/fetch', payload);
    },
    GetClinicSchedule(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/clinic_schedule/get', payload);
    },
    SaveClinicSchedule(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/clinic_schedule/add', payload);
    },
    UpdateClinicSchedule(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/clinic_schedule/update', payload);
    },
    DeleteClinicSchedule(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/clinic_schedule/delete', payload);
    },
}