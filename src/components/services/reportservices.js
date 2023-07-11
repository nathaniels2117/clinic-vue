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
    fetchStockSummaryReport(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/report/summary', payload);
    },
    fetchStockDetailedReport(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/report/detailed', payload);
    },
    fetchStockSummaryReportViaID(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/report/fetchid', payload);
    },
    fetchStockMainSummaryReportViaID(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/report/fetchMain', payload);
    },
    fetchDetailedSummaryInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/report/detailed/fetch', payload);
    },
    fetchDetailedSummaryInformationViaMainID(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/report/detailed/fetchID', payload);
    },
    fetchStockCardReportInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/report/stockcard', payload);
    },

    
}