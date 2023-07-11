// Payout Report Services to connect API
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
    fetchPayoutReportInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/cashdrawer/fetchpayoutreport', payload);
    },
    fetchPayoutReportViaID(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/cashdrawer/fetchpayoutid', payload);
    },
    fetchMainPayoutReportViaID(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/cashdrawer/fetchpayoutMain', payload);
    },
    exportPayoutInformation(payload, token){
        let request = this.jsonConfig(token,'blob');
        return request.post('/cashdrawer/exportpayout', payload);
    },    
}