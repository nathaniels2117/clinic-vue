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
    config(token){
        return axios.create({
            baseURL: process.env.VUE_APP_API_URL,
            withCredentials: false,
            headers: {
                Authorization: 'Bearer ' + token
            }
        });
    },
    userLogin(payload){
        return apiClient.post('/login', payload);
    },
    userLogout(token){
        let request = this.config(token);
        return request.post('/logout');
    },
    validateIsLogin(token){
        let request = this.config(token);
        // return request.post('/checkAuth', payload);
        return request.post('/checkAuth');
    }
}