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
    fetchRoleInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/role/fetch', payload);
    },
    saveRoleInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/role/save', payload);
    },
    updateRoleInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/role/update', payload);
    },
    removeRoletInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/role/remove', payload);
    },
    fetchAccessLevelInformation(token){
        let request = this.jsonConfig(token);
        return request.post('/role/access');
    },
    fetchRoleInformationViaID(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/role/fetchid', payload);
    },
    updateAccessInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/role/updateaccess', payload);
    },
    FetchAccessLevelHRIS(token){
        let request = this.jsonConfig(token);
        return request.post('/role/accesshris');
    },
    UpdateAccessInformationhris(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/role/updateaccesshris', payload);
    },
}