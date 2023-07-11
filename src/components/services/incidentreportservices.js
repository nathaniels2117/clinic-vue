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
    FetchAllIncidentReport(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/incident_report/fetch', payload);
    },
    GetIncidentReport(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/incident_report/get', payload);
    },
    SaveIncidentReport(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/incident_report/add', payload);
    },
    UpdateIncidentReport(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/incident_report/update', payload);
    },
    DeleteIncidentReport(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/incident_report/delete', payload);
    },
    FetchAllIncidentReportViaUser(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/incident_report/fetchviauser', payload);
    },
}