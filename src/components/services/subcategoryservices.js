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
    fetchSubCategoryInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/sub_category/fetch', payload);
    },
    saveSubCategoryInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/sub_category/save', payload);
    },
    updateSubCategoryInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/sub_category/update', payload);
    },
    removeSubCategoryInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/sub_category/remove', payload);
    },
    exportSubCategoryInformation(payload, token){
        let request = this.jsonConfig(token,'blob');
        return request.post('/sub_category/export', payload);
    },
    importSubCategoryInformation(payload , header, token){
        let request = this.jsonConfig(token,'json',header);
        return request.post('/sub_category/import', payload);
    },
    downloadTemplate(payload, token){
        let request = this.jsonConfig(token,'blob');
        return request.post('/sub_category/getxlsxformat', payload);
    }
}