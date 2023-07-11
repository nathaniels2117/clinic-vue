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
    fetchUserInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/user/fetch', payload);
    },
    saveUserInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/user/register', payload);
    },
    sendUserEmailVerification(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/user/resendverification', payload);
    },
    updatePersonalInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/user/update/personal', payload);
    },
    updateUserInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/user/update/credentials', payload);
    },
    FetchAllUser(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/user/fetchall', payload);
    },
    GetUser(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/user/fetchuser', payload);
    },
    SaveEmployeeInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/user/add/employee', payload);
    },
    UpdateEmployeeInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/user/update/employee', payload);
    },
    UpdateOneEmployeeInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/user/update/profile', payload);
    },
    UpdateOneEmployeeInformationWithPasswordPin(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/user/update/profileaccount', payload);
    },
    FetchAllUserForApproval(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/user/fetchallforapproval', payload);
    },
    ApproveDisapproveEmployee(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/user/approvedisapprove', payload);
    },
    UpdateAllEmployeeInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/user/update', payload);
    },
    CreateSignature(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/user/signature', payload);
    },
    FetchAllArchiveUser(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/user/fetchallarchive', payload);
    },
    ArchiveEmployee(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/user/archive', payload);
    },
    FetchAllUserviaDivision(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/user/fetchviadivisionid', payload);
    },
}
