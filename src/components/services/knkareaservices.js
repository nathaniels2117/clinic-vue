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
    fetchKnkAreaInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/knkarea/fetch', payload);
    },
    fetchKnkAreaInformationViaID(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/knkarea/fetchviaid', payload);
    },
    saveKnkAreaInformations(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/knkarea/save', payload);
    },
    updateKnkAreaInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/knkarea/update', payload);
    },
    removeKnkAreaInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/knkarea/remove', payload);
    },
    exportKnkAreaInformation(payload, token){
        let request = this.jsonConfig(token,'blob');
        return request.post('/knkarea/export', payload);
    },
    importKnkAreaInformation(payload , header, token){
        let request = this.jsonConfig(token,'json',header);
        return request.post('/knkarea/import', payload);
    }
}

