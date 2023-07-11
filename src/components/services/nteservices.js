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
    FetchAllNte(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/nte/fetch', payload);
    },
    GetNte(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/nte/get', payload);
    },
    SaveNte(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/nte/add', payload);
    },
    UpdateNte(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/nte/update', payload);
    },
    DeleteNte(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/nte/delete', payload);
    },
}