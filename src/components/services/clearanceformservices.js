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
    FetchAllClearanceForm(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/clearance_form/fetch', payload);
    },
    GetClearanceForm(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/clearance_form/get', payload);
    },
    SaveClearanceForm(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/clearance_form/add', payload);
    },
    UpdateClearanceForm(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/clearance_form/update', payload);
    },
    DeleteClearanceForm(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/clearance_form/delete', payload);
    },
    GetClearanceFormViaUserid(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/clearance_form/fetchviauserid', payload);
    },
}