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
    fetchKnkRoomtypeInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/knkroomtype/fetch', payload);
    },
    fetchKnkRoomtypeInformationViaID(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/knkroomtype/fetchviaid', payload);
    },
    saveKnkRoomtypeInformations(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/knkroomtype/save', payload);
    },
    updateKnkRoomtypeInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/knkroomtype/update', payload);
    },
    removeKnkRoomtypeInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/knkroomtype/remove', payload);
    },
    exportKnkRoomtypeInformation(payload, token){
        let request = this.jsonConfig(token,'blob');
        return request.post('/knkroomtype/export', payload);
    },
    importKnkRoomtypeInformation(payload , header, token){
        let request = this.jsonConfig(token,'json',header);
        return request.post('/knkroomtype/import', payload);
    }
}

