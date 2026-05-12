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
    FetchAllPatientInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/patient_information/fetch', payload);
    },
    GetPatientInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/patient_information/get', payload);
    },
    SavePatientInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/patient_information/add', payload);
    },
    UpdatePatientInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/patient_information/update', payload);
    },
    DeletePatientInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/patient_information/delete', payload);
    },
}