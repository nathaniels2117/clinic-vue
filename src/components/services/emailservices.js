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
    savePass(payload){
        return apiClient.post('/emailconfirm', payload);
    },
    forgotPassword(payload){
        return apiClient.post('/users/forgot', payload);
    },
    resetPassword(payload){
        return apiClient.post('/users/resetpassword', payload);
    },
    validateResetToken(payload){
        return apiClient.post('/users/validateresettoken', payload);
    }
}