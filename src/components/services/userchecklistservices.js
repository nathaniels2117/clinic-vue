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
    FetchAllUserchecklist(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/userchecklist/fetch', payload);
    },
    GetUserchecklist(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/userchecklist/get', payload);
    },
    SaveUserchecklist(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/userchecklist/add', payload);
    },
    UpdateUserchecklist(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/userchecklist/update', payload);
    },
    DeleteUserchecklist(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/userchecklist/delete', payload);
    },
    FetchChecklistStatusViaUserId(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/userchecklist/fetchviauserid', payload);
    }
}