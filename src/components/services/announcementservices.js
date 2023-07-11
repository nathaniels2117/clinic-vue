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
    FetchAllAnnouncement(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/announcement/fetch', payload);
    },
    GetAnnouncement(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/announcement/get', payload);
    },
    SaveAnnouncement(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/announcement/add', payload);
    },
    UpdateAnnouncement(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/announcement/update', payload);
    },
    DeleteAnnouncement(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/announcement/delete', payload);
    },
    UpdateAnnoucementImage(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/announcement/upload', payload);
    },
    FetchAllActiveAnnouncement(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/announcement/fetchactive', payload);
    },
    AcknowledgebyEmployee(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/announcement/acknowledgeby', payload);
    },
    FetchAnnouncementInfo(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/announcement/fetchinfo', payload);
    }
}