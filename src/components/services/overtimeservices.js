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
    SaveOvertime(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/overtime/add', payload);
    },
    FetchAllOvertime(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/overtime/fetch', payload);
    },
    UpdateOvertime(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/overtime/update', payload);
    },
    GetOvertime(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/overtime/get', payload);
    },
    DeleteOvertime(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/overtime/delete', payload);
    },
    UpdateFieldOvertime(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/overtime/updatefield', payload);
    },
    FetchAllOvertimeViaUser(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/overtime/fetchviauser', payload);
    },
    UpdateRemarks(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/overtime/remarks', payload);
    },
    ApproveDisapproveOvertime(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/overtime/forapproval', payload);
    },
    FetchAllDoneOvertime(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/overtime/fetchdone', payload);
    },
    UpdateHoursOvertime(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/overtime/updateovertime', payload);
    },
}