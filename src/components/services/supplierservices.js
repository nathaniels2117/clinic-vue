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
    fetchSupplierInformation(payload, token){
        let request = this.jsonConfig(token,'json');
        return request.post('/supplier/fetch', payload);
    },
    saveSupplierInformation(payload, token){
        let request = this.jsonConfig(token,'json');
        return request.post('/supplier/save', payload);
    },
    updateSupplierInformation(payload, token){
        let request = this.jsonConfig(token,'json');
        return request.post('/supplier/update', payload);
    },
    updateAllSupplierInformation(payload, token){
        let request = this.jsonConfig(token,'json');
        return request.post('/supplier/updateRows', payload);
    },
    removeSupplierInformation(payload, token){
        let request = this.jsonConfig(token,'json');
        return request.post('/supplier/remove', payload);
    },
    exportSupplierInformation(payload, token){
        let request = this.jsonConfig(token,'blob');
        return request.post('/supplier/export', payload);
    },
    importSupplierInformation(payload , header, token){
        let request = this.jsonConfig(token,'json',header);
        return request.post('/supplier/import', payload);
    },
    downloadTemplate(payload, token){
        let request = this.jsonConfig(token,'blob');
        return request.post('/supplier/getxlsxformat', payload);
    },
}