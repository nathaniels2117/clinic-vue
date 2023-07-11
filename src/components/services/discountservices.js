// Discount Services to connect API
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
    fetchDiscountInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/discount/fetch', payload);
    },
    fetchBranchComboInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/discount/fetchbranch', payload);
    },
    fetchDiscountInformationViaID(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/discount/fetchviaid', payload);
    },
    saveDiscountInformation(payload, token){
        var header = {
            "Content-Type": false
        }
        let request = this.jsonConfig(token,'json',header);
        return request.post('/discount/save', payload);
    },
    updateImageDiscountInformation(payload, token){
        var header = {
            "Content-Type": false
        }
        let request = this.jsonConfig(token,'json',header);
        return request.post('/discount/updateImage', payload);
    },
    updateDiscountInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/discount/update', payload);
    },
    removeDiscountInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/discount/remove', payload);
    },
    exportDiscountInformation(payload, token){
        let request = this.jsonConfig(token,'blob');
        return request.post('/discount/export', payload);
    },
    importDiscountInformation(payload , header, token){
        let request = this.jsonConfig(token,'json',header);
        return request.post('/discount/import', payload);
    },
    testUpload(form,token){
        var header = {
            "Content-Type": false
        }
        let request = this.jsonConfig(token,'json',header);
        return request.post('/discount/save', form);
    }
}

