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
    fetchProductTypeInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/producttype/fetch', payload);
    },
    saveProductTypeInformations(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/producttype/save', payload);
    },
    updateProductTypeInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/producttype/update', payload);
    },
    removeProductTypeInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/producttype/remove', payload);
    },
    exportProductTypeInformation(payload, token){
        let request = this.jsonConfig(token,'blob');
        return request.post('/producttype/export', payload);
    },
    updateAllProductTypeInformation(payload, token){
        let request = this.jsonConfig(token,'json');
        return request.post('/producttype/updateinfo', payload);
    },
}