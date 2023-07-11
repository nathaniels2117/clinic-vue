// Dashboard Services to connect API
import axios from 'axios';

export default {
    jsonConfig(token,xxtype,xheader){
        var xType = "json"
        if( xxtype ){
            xType = xxtype
        }
        var myHeader = {};
        myHeader['Authorization'] = 'Bearer ' + token
        if( xheader ){
            for (const [key, value] of Object.entries(xheader)) {
                    myHeader[key] = value
                }
        }
        return axios.create({
            baseURL: process.env.VUE_APP_API_URL,
            responseType: xType,
            withCredentials: false,
            headers: myHeader
        });
    },
    fetchTransactionGrossInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/transaction/fetchgross', payload);
    },
    fetchTransactionNetInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/transaction/fetchnet', payload);
    },
    fetchTransactionCostInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/transaction/fetchcost', payload);
    },
    fetchTransactionProfitInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/transaction/fetchprofit', payload);
    },
    fetchTransactionSettledInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/transaction/fetchsettled', payload);
    },
    fetchTransactionVoidInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/transaction/fetchvoid', payload);
    },
    fetchTransactionBackoutInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/transaction/fetchbackout', payload);
    },
    fetchDashboardInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/transaction/fetchdashboard', payload);
    },
    fetchTransactionTopProductInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/transaction/fetchtopproduct', payload);
    },
    fetchTransactionDiscountInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/transaction/fetchdiscountdashboard', payload);
    },
    fetchTransactionPaymentInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/transaction/fetchpayment', payload);
    },
    fetchTransactionTotalInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/transaction/fetchtotal', payload);
    },
    fetchTransactionTotalCustomerInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/transaction/fetchcustomer', payload);
    },
    fetchTransactionActiveInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/transaction/fetchactive', payload);
    },
    fetchTransactionPausedInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/transaction/fetchpaused', payload);
    },
    fetchTransactionReturnedInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/transaction/fetchreturned', payload);
    },
}

