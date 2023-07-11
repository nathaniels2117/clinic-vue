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
    fetchDepartmentInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/department/fetch', payload);
    },
    saveDepartmentInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/department/save', payload);
    },
    updateDepartmentInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/department/update', payload);
    },
    removeDepartmentInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/department/remove', payload);
    },
    exportDepartmentInformation(payload, token){
        let request = this.jsonConfig(token,'blob');
        return request.post('/department/export', payload);
    },
    importDepartmentInformation(payload , header, token){
        let request = this.jsonConfig(token,'json',header);
        return request.post('/department/import', payload);
    },
    downloadTemplate(payload, token){
        let request = this.jsonConfig(token,'blob');
        return request.post('/department/getxlsxformat', payload);
    }
}