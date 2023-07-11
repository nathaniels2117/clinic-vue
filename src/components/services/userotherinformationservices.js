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
    FetchAllUserOtherInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/user_other_information/fetch', payload);
    },
    GetUserOtherInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/user_other_information/get', payload);
    },
    SaveUserOtherInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/user_other_information/add', payload);
    },
    UpdateUserOtherInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/user_other_information/update', payload);
    },
    DeleteUserOtherInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/user_other_information/delete', payload);
    },
    UpdateUserOtherInformationSchedule(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/user_other_information/sched', payload);
    },
    UpdateBulkUserSchedule(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/user_other_information/updatebulkschedule', payload);
    },
}