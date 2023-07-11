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
    fetchProductCountInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/productcount/fetch', payload);
    },
    fetchProductCountInformationViaID(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/productcount/fetchViaID', payload);
    },
    saveProductCountInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/productcount/save', payload);
    },
    updateProductCountInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/productcount/update', payload);
    },
    updateProductCountMainInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/productcount/updateRecount', payload);
    }
}