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
    FetchTimesheetViaCutoff(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/timesheet/fetch', payload);
    },
    AddCutoffTimesheet(payload, token){
        let request = this.jsonConfig(token);   
        return request.post('/timesheet/add', payload);
    },
    AddTimesheetlogsViaCutoff(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/timesheet/timesheetlogs', payload);
    },
    FetchAllTimesheetlogsViaCutoff(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/timesheet/fetch/timesheetlogs', payload);
    },
    FetchAllTimesheetlogs(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/timesheet/fetchall/timesheetlogs', payload);
    },
}