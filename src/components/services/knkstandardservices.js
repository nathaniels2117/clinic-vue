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
    fetchKnkStandardInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/knkstandard/fetch', payload);
    },
    fetchKnkStandardInformationViaID(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/knkstandard/fetchviaid', payload);
    },
    saveKnkStandardInformations(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/knkstandard/save', payload);
    },
    updateKnkStandardInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/knkstandard/update', payload);
    },
    removeKnkStandardInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/knkstandard/remove', payload);
    },
    exportKnkStandardInformation(payload, token){
        let request = this.jsonConfig(token,'blob');
        return request.post('/knkstandard/export', payload);
    },
    importKnkStandardInformation(payload , header, token){
        let request = this.jsonConfig(token,'json',header);
        return request.post('/knkstandard/import', payload);
    }
}

