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
    fetchProductInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/product/fetch', payload);
    },
    fetchProductTypeInformation(token){
        let request = this.jsonConfig(token);
        return request.post('/producttype/fetch');
    },
    saveProductInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/product/save', payload);
    },
    updateProductInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/product/update', payload);
    }
}