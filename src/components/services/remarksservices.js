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
    fetchRemarksInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/remarks/fetch', payload);
    },
    fetchRemarksInformationViaID(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/remarks/fetchviaid', payload);
    },
    saveRemarksInformations(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/remarks/save', payload);
    },
    updateRemarksInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/remarks/update', payload);
    },
    removeRemarksInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/remarks/remove', payload);
    },
    exportRemarksInformation(payload, token){
        let request = this.jsonConfig(token,'blob');
        return request.post('/remarks/export', payload);
    },
    importRemarksInformation(payload , header, token){
        let request = this.jsonConfig(token,'json',header);
        return request.post('/remarks/import', payload);
    },
    downloadTemplate(payload, token){
        let request = this.jsonConfig(token,'blob');
        return request.post('/remarks/getxlsxformat', payload);
    },
}

