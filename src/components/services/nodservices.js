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
    FetchAllNod(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/nod/fetch', payload);
    },
    GetNod(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/nod/get', payload);
    },
    SaveNod(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/nod/add', payload);
    },
    UpdateNod(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/nod/update', payload);
    },
    DeleteNod(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/nod/delete', payload);
    },
    AcknowledgeNod(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/nod/acknowledge', payload);
    },
}