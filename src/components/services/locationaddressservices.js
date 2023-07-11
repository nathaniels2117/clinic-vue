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
    FetchAllLocationAddressRegion(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/address_location/fetchregion', payload);
    },
    FetchAllLocationAddressProvince(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/address_location/fetchprovince', payload);
    },
    FetchAllLocationAddressMunicipality(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/address_location/fetchmunicipality', payload);
    },
}