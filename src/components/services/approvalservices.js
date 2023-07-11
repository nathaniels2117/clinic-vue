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
    FetchStockCardApproval(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/approval/fetch', payload);
    },
    UpdateStockItemApproval(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/approval/item/update', payload);
    },
    FetchStockCardItemApprovalViaID(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/approval/fetchid', payload);
    }
}