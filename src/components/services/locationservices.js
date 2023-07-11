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
    fetchLocationInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/locations/fetch', payload);
    },
    saveLocationInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/locations/save', payload);
    },
    updateLocationInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/locations/update', payload);
    },
    updateAllLocationInformation(payload, token){
        let request = this.jsonConfig(token,'json');
        return request.post('/locations/updateRows', payload);
    },
    updateImageLocationInformation(payload, token){
        var header = {
            "Content-Type": false
        }
        let request = this.jsonConfig(token,'json',header);
        return request.post('/locations/updateImage', payload);
    },
    removeLocationInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/locations/remove', payload);
    },
    fetchLocationInformationViaBranch(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/locations/fetchViaBranch', payload);
    },
    fetchLocationInformationViaBranchAndType(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/locations/fetchViaBranchType', payload);
    },
    fetchLocationInformationViaType(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/locations/fetchViaType', payload);
    },
    fetchLocationInformationViaBranchTo(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/locations/fetchViaBranchTo', payload);
    },
    exportLocationInformation(payload, token){
        let request = this.jsonConfig(token,'blob');
        return request.post('/locations/export', payload);
    },
}