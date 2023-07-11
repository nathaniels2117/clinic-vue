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
    NoTokenjsonConfig(){
        return axios.create({
            baseURL: process.env.VUE_APP_API_URL,
            responseType: 'json',
            withCredentials: false,
            headers: {
            }
        });
    },
     fetchJORInformation(payload){
        let request = this.NoTokenjsonConfig();
        return request.post('ticket/jor/fetch', payload);
    },
    fetchBranchInformation(payload){
        let request = this.NoTokenjsonConfig();
        return request.post('ticket/branch/fetch', payload);
    },
    fetchDivisionInformation(payload){
        let request = this.NoTokenjsonConfig();
        return request.post('ticket/division/fetch', payload);
    },
    fetchTicketInformation(payload){
        let request = this.NoTokenjsonConfig();
        return request.post('ticket/fetch', payload);
    },
    fetchTicketInformationViaDate(payload){
        let request = this.NoTokenjsonConfig();
        return request.post('ticket/fetchViaDate', payload);
    },
    fetchTicketInformationViaID(payload){
        let request = this.NoTokenjsonConfig();
        return request.post('ticket/fetchViaID', payload);
    },
    fetchTicketInformationViaEmail(payload){
        let request = this.NoTokenjsonConfig();
        return request.post('ticket/fetchViaEmail', payload);
    },
    fetchTicketInformationViaRespondDepartment(payload){
        let request = this.NoTokenjsonConfig();
        return request.post('ticket/fetchViaResDepartment', payload);
    },
    fetchTicketInformationViaDepartment(payload){
        let request = this.NoTokenjsonConfig();
        return request.post('ticket/fetchViaDepartment', payload);
    },
    saveticketInformations(payload){
        var header = {
            "Content-Type": false
        }
        let request = this.NoTokenjsonConfig('json',header);
        return request.post('ticket/save', payload);
    },
    updateTicketInformation(payload){
        let request = this.NoTokenjsonConfig();
        return request.post('ticket/update', payload);
    },
}