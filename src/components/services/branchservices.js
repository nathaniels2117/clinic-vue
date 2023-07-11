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
    blobConfig(token){
        return axios.create({
            baseURL: process.env.VUE_APP_API_URL,
            responseType: 'blob',
            withCredentials: false,
            headers: {
                Authorization: 'Bearer ' + token
            }
        });
    },
    fetchBranchInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/branch/fetch', payload);
    },
    updateBranchInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/branch/tableupdate', payload);
    },
    saveBranchInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/branch/save', payload);
    },
    removeBranchInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/branch/remove', payload);
    },
    fetchBranchInformationViaID(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/branch/fetchbusiness', payload);
    },
    UpdateBranchInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/branch/update', payload);
    },
}