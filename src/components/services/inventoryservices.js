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
    fetchProductInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/inventory/fetch', payload);
    },
    saveProductInformation(payload, token){
        var header = {
            "Content-Type": false
        }
        let request = this.jsonConfig(token,'json',header);
        return request.post('/inventory/save', payload);
    },
    updateImageProductInformation(payload, token){
        var header = {
            "Content-Type": false
        }
        let request = this.jsonConfig(token,'json',header);
        return request.post('/inventory/updateImage', payload);
    },
    updateProductInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/inventory/update', payload);
    },
    removeProductInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/inventory/remove', payload);
    },
    fetchBranchLocationProductInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/inventory/fetch/branchlocationproduct', payload);
    },
    fetchBranchProductInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/inventory/fetchbranchproduct', payload);
    },
    fetchSKUInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/inventory/getsku', payload);
    },
    importProductInformation(payload , header, token){
        let request = this.jsonConfig(token,'json',header);
        return request.post('/inventory/import', payload);
    },
    downloadTemplate(payload, token){
        let request = this.jsonConfig(token,'blob');
        return request.post('/inventory/getxlsxformat', payload);
    },
    UpdateInventoryRowsInformations(payload, token){
        let request = this.jsonConfig(token,'blob');
        return request.post('/inventory/updateRowInfo', payload);
    }
}
