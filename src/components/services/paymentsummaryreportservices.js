// Payment Summary Report Services to connect API
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
    fetchPaymentSummaryReportInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/transaction/fetchpaymentsummaryreport', payload);
    },
    fetchPaymentSummaryReportViaID(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/transaction/fetchpaymentsummaryid', payload);
    },
    fetchMainPaymentSummaryReportViaID(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/transaction/fetchpaymentsummaryMain', payload);
    },
    exportPaymentSummaryReportInformation(payload, token){
        let request = this.jsonConfig(token,'blob');
        return request.post('/transaction/exportpaymentsummaryreport', payload);
    },      
}