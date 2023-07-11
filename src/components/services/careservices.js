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
    FetchAllCare(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/care/fetch', payload);
    },
    GetCare(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/care/get', payload);
    },
}