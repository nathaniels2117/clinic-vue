// Payment Type Services to connect API
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
    fetchPaymentTypeInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/paymenttype/fetch', payload);
    },
    fetchBranchComboInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/paymenttype/fetchbranch', payload);
    },
    fetchPaymentTypeInformationForTB(payload,token){
        let request = this.jsonConfig(token);
        return request.post('/paymenttype/fetchlist',payload);
    },
    fetchPaymentTypeComboInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/paymenttype/fetchcombo', payload);
    },
    fetchPaymentTypeInformationViaID(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/paymenttype/fetchviaid', payload);
    },
    savePaymentTypeInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/paymenttype/save', payload);
    },
    savePaymentTypeSubCategoryInformation(payload, token){
        var header = {
            "Content-Type": false
        }
        let request = this.jsonConfig(token,'json',header);
        return request.post('/paymenttype/savecategory', payload);
    },
    updatePaymentTypeSubCategoryInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/paymenttype/update', payload);
    },
    updateImagePaymenttypeInformation(payload, token){
        var header = {
            "Content-Type": false
        }
        let request = this.jsonConfig(token,'json',header);
        return request.post('/paymenttype/updateImage', payload);
    },
    removePaymentTypeInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/paymenttype/remove', payload);
    },
    exportPaymentTypeInformation(payload, token){
        let request = this.jsonConfig(token,'blob');
        return request.post('/paymenttype/export', payload);
    },
    importPaymentTypeInformation(payload , header, token){
        let request = this.jsonConfig(token,'json',header);
        return request.post('/paymenttype/import', payload);
    }
}

