// Sales Report Services to connect API
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
    fetchSalesReportInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/transaction/fetchsalesreport', payload);
    },
    fetchSalesReportViaID(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/transaction/fetchid', payload);
    },
    fetchMainSalesReportViaID(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/transaction/fetchMain', payload);
    },
    exportSalesTransactionInformation(payload, token){
        let request = this.jsonConfig(token,'blob');
        return request.post('/transaction/exportsalestransaction', payload);
    },    
    exportSalesTransactionPdfInformation(payload, token){
        let request = this.jsonConfig(token,'blob');
        return request.post('/transaction/exportsalestransactionpdf', payload);
    }        
}