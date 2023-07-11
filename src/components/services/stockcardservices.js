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
    fetchProductInfoViaID(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/stockcard/fetchViaID', payload);
    },
    fetchProductInfoViaLoc(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/stockcard/fetchViaLoc', payload);
    },
    fetchProductInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/stockcard/fetch', payload);
    },
    SaveStockCardInformations(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/stockcard/save', payload);
    },
    updateStockCardInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/stockcard/update', payload);
    },
    AutoApproveStockCards(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/stockcard/autoapprove', payload);
    },
    fetchSummaryInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/stockcard/fetchSummary', payload);
    },
    fetchMIS(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/stockcard/fetchMIS', payload);
    }
}