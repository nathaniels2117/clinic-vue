import axios from 'axios';

export default {
    jsonConfig(token){
        return axios.create({
            baseURL: process.env.VUE_APP_API_URL,
            responseType: 'json',
            withCredentials: false,
            headers: {
                Authorization: 'Bearer ' + token
            }
        });
    },
    fetchPOSDevicesInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/devices/fetch', payload);
    },
    savePOSDevicesInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/devices/save', payload);
    },
    updatePOSDevicesInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/devices/update', payload);
    },
    removePOSDevicesInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/devices/remove', payload);
    },
    UpdateDevicesRowsInformations(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/devices/updateRows', payload);
    }
}