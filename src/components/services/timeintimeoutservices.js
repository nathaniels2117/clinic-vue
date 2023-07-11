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
    GetUserViaEmail(payload){
        return apiClient.post('/getemail', payload);
    },
    SaveTimeInTimeOutVialogin(payload){
        return apiClient.post('/searchtimeintimeout', payload);
    },
    FetchAllTimeInTimeOutViaUser(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/time_in_time_out/fetchviauser', payload);
    },
    FetchAllTimeInTimeOutViaParent(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/time_in_time_out/fetchviaparent', payload);
    },   
    GetUserViaEmployeeId(payload){
        return apiClient.post('/getviaemployeeid', payload);
    }, 
    FilterbyDateUser(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/time_in_time_out/filterbydateuser', payload);
    }, 
    FilterbyDateViaParent(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/time_in_time_out/filterbydateparent', payload);
    }, 
}