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
    FetchAllCutoff(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/cutoff/fetch', payload);
    },
    GetCutoff(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/cutoff/get', payload);
    },
    SaveCutoff(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/cutoff/add', payload);
    },
    UpdateCutoff(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/cutoff/update', payload);
    },
    DeleteCutoff(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/cutoff/delete', payload);
    }
}