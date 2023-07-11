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
    fetchDivisionInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/division/fetch', payload);
    },
    fetchDivisionInformationViaID(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/division/fetchviaid', payload);
    },
    saveDivisionInformations(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/division/save', payload);
    },
    updateDivisionInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/division/update', payload);
    },
    removeDivisionInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/division/remove', payload);
    },
    exportDivisionInformation(payload, token){
        let request = this.jsonConfig(token,'blob');
        return request.post('/division/export', payload);
    },
    importDivisionInformation(payload , header, token){
        let request = this.jsonConfig(token,'json',header);
        return request.post('/division/import', payload);
    },
    AssignHead(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/division/assignhead', payload);
    },
    Assign(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/division/assign', payload);
    },
}

