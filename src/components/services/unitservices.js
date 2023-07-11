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
    fetchUnitInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/units/fetch', payload);
    },
    fetchUnitInformationViaID(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/units/fetchViaID', payload);
    },
    fetchUnitConversionInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/units/fetch/conversion', payload);
    },
    fetchUnitInformationTo(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/units/fetchTo', payload);
    },
    saveUnitInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/units/save', payload);
    },
    saveUnitConversionInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/units/saveconversion', payload);
    },
    updateUnitInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/units/update', payload);
    },
    updateUnitConversionInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/units/updateconversion', payload);
    },
    updateAllUnitConversionInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/units/updateconversion/rows', payload);
    },
    updateAllUnitInformation(payload, token){
        let request = this.jsonConfig(token,'json');
        return request.post('/units/updateinfo', payload);
    },
    removeUnitConversionInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/units/removeconversion', payload);
    },
    removeUnitInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/units/remove', payload);
    },
    exportUnitInformation(payload, token){
        let request = this.jsonConfig(token,'blob');
        return request.post('/units/export', payload);
    },
    importUnitInformation(payload , header, token){
        let request = this.jsonConfig(token,'json',header);
        return request.post('/units/import', payload);
    },
    downloadTemplate(payload, token){
        let request = this.jsonConfig(token,'blob');
        return request.post('/units/getxlsxformat', payload);
    },
}