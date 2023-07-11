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
    fetchCategoryInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/category/fetch', payload);
    },
    saveCategoryInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/category/save', payload);
    },
    updateCategoryInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/category/update', payload);
    },
    removeCategoryInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/category/remove', payload);
    },
    exportCategoryInformation(payload, token){
        let request = this.jsonConfig(token,'blob');
        return request.post('/category/export', payload);
    },
    importCategoryInformation(payload , header, token){
        let request = this.jsonConfig(token,'json',header);
        return request.post('/category/import', payload);
    },
    downloadTemplate(payload, token){
        let request = this.jsonConfig(token,'blob');
        return request.post('/category/getxlsxformat', payload);
    }
}