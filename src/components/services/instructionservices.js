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
    FetchAllInstruction(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/instruction/fetch', payload);
    },
    GetInstruction(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/instruction/get', payload);
    },
    SaveInstruction(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/instruction/add', payload);
    },
    UpdateInstruction(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/instruction/update', payload);
    },
    DeleteInstruction(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/instruction/delete', payload);
    },
}