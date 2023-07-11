import axios from 'axios';

const apiClient = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    responseType: 'json',
    withCredentials: false,
    headers: {
        Token: 'Token ' + process.env.VUE_APP_WEB_TOKEN
    }
});

export default {
    fetchBusinessType(){
        return apiClient.get('/resources/fetchbusinesstypeinformation');
    },
    fetchWorldInformation(payload){
        return apiClient.post('/resources/fetchworldinformation', payload);
    },
    fetchStateInformation(payload){
        return apiClient.post('/resources/fetchstateinformation', payload);
    },
    fetchCitiesInformation(payload){
        return apiClient.post('/resources/fetchcitiesinformation', payload);
    }
}