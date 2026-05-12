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
    FetchAllPatientDiagnosis(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/patient_diagnosis/fetch', payload);
    },
    FetchAllPatientDiagnosisViaPatientID(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/patient_diagnosis/fetchviapatientid', payload);
    },
    GetPatientDiagnosis(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/patient_diagnosis/get', payload);
    },
    SavePatientDiagnosis(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/patient_diagnosis/add', payload);
    },
    UpdatePatientDiagnosis(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/patient_diagnosis/update', payload);
    },
    DeletePatientDiagnosis(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/patient_diagnosis/delete', payload);
    },
}