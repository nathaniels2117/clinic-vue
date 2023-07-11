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
    fetchKnkParticularInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/knkparticular/fetch', payload);
    },
    fetchKnkParticularInformationViaID(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/knkparticular/fetchviaid', payload);
    },
    saveKnkParticularInformations(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/knkparticular/save', payload);
    },
    updateKnkParticularInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/knkparticular/update', payload);
    },
    removeKnkParticularInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/knkparticular/remove', payload);
    },
    exportKnkParticularInformation(payload, token){
        let request = this.jsonConfig(token,'blob');
        return request.post('/knkparticular/export', payload);
    },
    importKnkParticularInformation(payload , header, token){
        let request = this.jsonConfig(token,'json',header);
        return request.post('/knkparticular/import', payload);
    }
}

