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
    FetchAllCoaching(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/coaching/fetch', payload);
    },
    GetCoaching(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/coaching/get', payload);
    },
    SaveCoaching(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/coaching/add', payload);
    },
    UpdateCoaching(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/coaching/update', payload);
    },
    DeleteCoaching(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/coaching/delete', payload);
    },
    FetchAllCoachingViaUser(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/coaching/fetchviauser', payload);
    },
}