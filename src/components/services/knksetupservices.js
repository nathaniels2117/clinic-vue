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
    fetchKnkSetupInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/knksetup/fetch', payload);
    },
    fetchKnkSetupInformationViaID(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/knksetup/fetchviaid', payload);
    },
    saveKnkSetupInformations(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/knksetup/save', payload);
    },
    updateKnkSetupInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/knksetup/update', payload);
    },
    removeKnkSetupInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/knksetup/remove', payload);
    },
    exportKnkSetupInformation(payload, token){
        let request = this.jsonConfig(token,'blob');
        return request.post('/knksetup/export', payload);
    },
    importKnkSetupInformation(payload , header, token){
        let request = this.jsonConfig(token,'json',header);
        return request.post('/knksetup/import', payload);
    }
}

