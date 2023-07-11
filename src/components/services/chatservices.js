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
    fetchConversationInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/chat/conversation/fetch', payload);
    },
    fetchConversationInformationViaID(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/chat/conversation/fetchViaID', payload);
    },
    fetchUserInformationViaUsers(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/chat/fetchViaUser', payload);
    },
    fetchUserInformationViaUsersIN(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/chat/fetchViaUserIn', payload);
    },
    updateUserConversationInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/chat/updateUsers', payload);
    },
    saveConversationInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/chat/conversation/save', payload);
    },
    deleteConversationtInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/chat/conversation/delete', payload);
    },
    deleteMessageInformationViaID(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/chat/messages/delete', payload);
    },
    updateChatInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/chat/update', payload);
    },
    removeChatInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/chat/remove', payload);
    },
    saveChatInformation(payload, token){
        var header = {
            "Content-Type": false
        }
        let request = this.jsonConfig(token,'json',header);
        return request.post('/chat/messages/save', payload);
    },
    fetchChatInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/chat/messages/fetch', payload);
    },
    leaveConversationtInformation(payload, token){
        let request = this.jsonConfig(token);
        return request.post('/chat/conversation/leave', payload);
    },

}