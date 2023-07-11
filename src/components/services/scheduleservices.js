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
    FetchAllSchedule(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/schedule/fetch', payload);
    },
    GetSchedule(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/schedule/get', payload);
    },
    SaveSchedule(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/schedule/add', payload);
    },
    UpdateSchedule(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/schedule/update', payload);
    },
    DeleteSchedule(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/schedule/delete', payload);
    },
    UpdateScheduleRD(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/schedule/updaterd', payload);
    },
}