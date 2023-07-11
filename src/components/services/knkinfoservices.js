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
    fetchKnkInfoInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/knkinfo/'+payload['id']+'/clean', payload);
    },
    fetchKnkInfoInformationCheck(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/knkinfo/'+payload['id']+'/cleancheck', payload);
    },    
    fetchBranchComboInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/knkinfo/fetchbranch', payload);
    },    
    fetchKnkInfoInformationViaID(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/knkinfo/fetchviaid', payload);
    },
    saveKnkInfoInformations(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/knkinfo/save', payload);
    },
    saveKnkInfoInformationsInspect(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/knkinfo/saveinspect', payload);
    },
    saveKnkInfoInformationsInspectedBy(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/knkinfo/saveinspectedby', payload);
    },
    updateKnkInfoInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/knkinfo/update', payload);
    },
    removeKnkInfoInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/knkinfo/remove', payload);
    },
    exportKnkInfoInformation(payload, token){
        let request = this.jsonConfig(token,'blob');
        return request.post('/knkinfo/export', payload);
    },
    importKnkInfoInformation(payload , header, token){
        let request = this.jsonConfig(token,'json',header);
        return request.post('/knkinfo/import', payload);
    }
}

