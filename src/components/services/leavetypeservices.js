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
    FetchAllLeaveType(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/leave_type/fetch', payload);
    },
    GetLeaveType(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/leave_type/get', payload);
    },
    SaveLeaveType(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/leave_type/add', payload);
    },
    UpdateLeaveType(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/leave_type/update', payload);
    },
    DeleteLeaveType(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/leave_type/delete', payload);
    }
}