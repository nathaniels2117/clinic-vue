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
    fetchKnkRoomInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/knkroom/fetch', payload);
    },
    fetchBranchComboInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/knkroom/fetchbranch', payload);
    },    
    fetchKnkRoomInformationViaID(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/knkroom/fetchviaid', payload);
    },
    saveKnkRoomInformations(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/knkroom/save', payload);
    },
    updateKnkRoomInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/knkroom/update', payload);
    },
    removeKnkRoomInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/knkroom/remove', payload);
    },
    exportKnkRoomInformation(payload, token){
        let request = this.jsonConfig(token,'blob');
        return request.post('/knkroom/export', payload);
    },
    importKnkRoomInformation(payload , header, token){
        let request = this.jsonConfig(token,'json',header);
        return request.post('/knkroom/import', payload);
    }
}

