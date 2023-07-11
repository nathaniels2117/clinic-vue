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
    fetchKnkClassInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/knkclass/fetch', payload);
    },
    fetchKnkClassInformationViaID(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/knkclass/fetchviaid', payload);
    },
    saveKnkClassInformations(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/knkclass/save', payload);
    },
    updateKnkClassInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/knkclass/update', payload);
    },
    removeKnkClassInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/knkclass/remove', payload);
    },
    exportKnkClassInformation(payload, token){
        let request = this.jsonConfig(token,'blob');
        return request.post('/knkclass/export', payload);
    },
    importKnkClassInformation(payload , header, token){
        let request = this.jsonConfig(token,'json',header);
        return request.post('/knkclass/import', payload);
    }
}

