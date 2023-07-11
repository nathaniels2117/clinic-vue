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
    saveUserInformation(payload){
        return apiClient.post('/register/account', payload);
    },
    RegisterEmployee(payload){
        return apiClient.post('/registeremployee', payload);
    }
}