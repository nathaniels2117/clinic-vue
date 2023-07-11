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
    FetchAllHoliday(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/holiday/fetch', payload);
    },
    GetHoliday(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/holiday/get', payload);
    },
    SaveHoliday(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/holiday/add', payload);
    },
    UpdateHoliday(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/holiday/update', payload);
    },
    DeleteHoliday(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/holiday/delete', payload);
    },
}