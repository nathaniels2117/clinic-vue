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
    FetchAllNoh(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/noh/fetch', payload);
    },
    GetNoh(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/noh/get', payload);
    },
    SaveNoh(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/noh/add', payload);
    },
    UpdateNoh(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/noh/update', payload);
    },
    DeleteNoh(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/noh/delete', payload);
    },
}