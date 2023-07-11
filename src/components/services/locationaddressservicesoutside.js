import axios from 'axios';

const apiClient = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    responseType: 'json',
    withCredentials: false,
    headers: {
        Token: 'Token ' + process.env.VUE_APP_WEB_TOKEN
    },
});

export default {
    FetchAllLocationAddressRegion(payload){
         return apiClient.post('/outside_address_location/fetchregion', payload);
    },
    FetchAllLocationAddressProvince(payload){
         return apiClient.post('/outside_address_location/fetchprovince', payload);
    },
    FetchAllLocationAddressMunicipality(payload){
         return apiClient.post('/outside_address_location/fetchmunicipality', payload);
    },
}