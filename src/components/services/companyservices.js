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
    updateBusinessInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/company/update', payload);
    },
    FetchBusinessInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/company/fetchbusinessinformation', payload);
    },
    UpdateCompanyImage(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/company/uploadimage', payload);
    }
}