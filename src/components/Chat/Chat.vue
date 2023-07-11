<template>
    <v-card>

	<div>
		<vue-advanced-chat
			height="calc(100vh - 10px)"
			:current-user-id="currentUserId"
			:rooms="JSON.stringify(rooms)"
			:rooms-loaded="true"
			:messages="JSON.stringify(messages)"
			:messages-loaded="messagesLoaded"
			@send-message="sendMessage($event.detail[0])"
			@fetch-messages="fetchMessages($event.detail[0])"

            @room-id="checkRoom()"
            :loading-rooms="this.loadingrooms"
            :show-add-room="true"
            :show-files="true"
            :show-audio="true"
            :show-reaction-emojis="true"
            :show-emojis="true"
            :show-footer="true"
            @add-room="checkAddRoom()"
            :menu-actions="JSON.stringify(roomActions)"
            :room-actions="JSON.stringify(roomActions)"
            :message-actions="JSON.stringify(messageActions)"
            :message-selection-actions="JSON.stringify(messageSelectActions)"
            @message-selection-action-handler="messageActionHandler($event.detail[0])"
            @delete-message="deleteMessage($event.detail[0])"
            @menu-action-handler="menuActionHandler($event.detail[0])"
            @room-action-handler="menuActionHandler($event.detail[0])"
		/>
	</div>


        <!-- start diaglog for creating rooms -->
        <v-dialog
        v-model="addroomsinfo"
        scrollable
        max-width="50%"
        >
            <v-card>
                <v-card-title>Room Information</v-card-title>
                <v-divider></v-divider>
                <v-card-text style="height: 300px;">
                    
                    <v-text-field
                    outlined   
                    class="mt-2"
                    v-model="room_name"
                    color="orange"
                    ></v-text-field>

                    <v-data-table
                            v-model="users_info"
                            :headers="headers"
                            :items="user_info.parent_child_user_information"
                            hide-default-footer
                            disable-pagination
                            show-select
                        >
                        
                        <template v-slot:item.fullname="props">
                                {{ props.item.personal_information != null ? props.item.personal_information.firstname+', '+props.item.personal_information.lastname : 'No Data' }}
                        </template>
                        </v-data-table>

                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                <v-btn
                    color="orange"
                    text
                    @click="addroomsinfo = false"
                >
                    Close
                </v-btn>
                <v-btn
                    color="orange"
                    text
                    @click="saveRoom()"
                >
                    Save
                </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <!-- end diaglog for creating rooms -->


        <!-- start diaglog for inviting user -->
        <v-dialog
        v-model="inviteuserdialog"
        scrollable
        max-width="50%"
        >
            <v-card>
                <v-card-title>Invite User</v-card-title>
                <v-divider></v-divider>
                <v-card-text style="height: 300px;">

                    <v-data-table
                            v-model="users_info_invite"
                            :headers="headers"
                            :items="users_info_invites"
                            hide-default-footer
                            disable-pagination
                            show-select
                        >
                        
                        <template v-slot:item.fullname="props">
                                {{ props.item.personal_information != null ? props.item.personal_information.firstname+', '+props.item.personal_information.lastname : 'No Data' }}
                        </template>
                        <template v-slot:item.email="props">
                            {{ props.item.email }}
                        </template>
                    </v-data-table>

                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                <v-btn
                    color="orange"
                    text
                    @click="inviteuserdialog = false"
                >
                    Close
                </v-btn>
                <v-btn
                    color="orange"
                    text
                    @click="inviteUsers()"
                >
                    Invite
                </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <!-- end diaglog for inviting user -->


                <!-- start diaglog for removing user -->
                <v-dialog
        v-model="removeuserdialog"
        scrollable
        max-width="50%"
        >
            <v-card>
                <v-card-title>Remove User</v-card-title>
                <v-divider></v-divider>
                <v-card-text style="height: 300px;">

                    <v-data-table
                            v-model="users_info_remove"
                            :headers="headers"
                            :items="users_info_removes"
                            hide-default-footer
                            disable-pagination
                            show-select
                        >
                        
                        <template v-slot:item.fullname="props">
                                {{ props.item.personal_information != null ? props.item.personal_information.firstname+', '+props.item.personal_information.lastname : 'No Data' }}
                        </template>
                        <template v-slot:item.email="props">
                            {{ props.item.email }}
                        </template>
                    </v-data-table>

                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                <v-btn
                    color="orange"
                    text
                    @click="removeuserdialog = false"
                >
                    Close
                </v-btn>
                <v-btn
                    color="orange"
                    text
                    @click="removeUsers()"
                >
                    Invite
                </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <!-- end diaglog for removing user -->


    </v-card>
</template>




<script>
import { register } from 'vue-advanced-chat'

register()


import io from "socket.io-client";
import userservices from "../services/userservices";
import chatservices from "../services/chatservices";

export default {
	data: () => ({
        myID: 0,
        addroomsinfo: false,
        inviteuserdialog: false,
        removeuserdialog: false,
        room_name: "",
        currentUserId: '1234',
        rooms: [],
        messages: [],
        roomActions: [
          { name: 'inviteUser', title: 'Invite User' },
          { name: 'removeUser', title: 'Remove User' },
          { name: 'leaveRoom', title: 'Leave Room' },
          { name: 'deleteRoom', title: 'Delete Room' }
        ],
        messageActions:[
        {
            name: 'replyMessage',
            title: 'Reply'
        },
        {
            name: 'editMessage',
            title: 'Edit Message',
            onlyMe: true
        },
        {
            name: 'deleteMessage',
            title: 'Delete Message',
            onlyMe: true
        },
        {
            name: 'selectMessages',
            title: 'Select'
        }
        ],
        messageSelectActions:[
        {
            name: 'deleteMessages',
            title: 'Delete'
        },
        {
            name: 'shareMessages',
            title: 'Share'
        }
        ],
        loadingrooms: true,
        messagesLoaded: false,
        message_information: [],
        headers: [
          { text: 'Email', value: 'email' },
          { text: 'Full name', value: 'fullname' },
        ],
        user_info: [],
        users_info: [],
        users_info_invite: [],
        users_info_invites: [],
        users_info_remove: [],
        users_info_removes: [],
        roomID: 0,
        message_contents: [],
        message_count: [],
        socketInstance: null,
        opacity: false,
        invite_room_id: 0
	}),
    mounted(){
        this.$store.state.isChat = 1
    },
    created(){
        this.currentUserId = this.$store.getters.getUserID.toString()
        this.FetchConversation();
        this.addroomsinfo = false;
        this.opacity = false



        this.socketInstance = io(process.env.VUE_APP_CHAT_SERVER);

    },
	methods: {
        // room checking
        checkAddRoom(){

            this.FetchUser()
            this.myID = this.$store.getters.getUserID
            this.addroomsinfo = true
        },

        // invite users
        inviteUsers(){
            let payload = {
                room_id: this.invite_room_id,
                user_information: JSON.stringify(this.users_info_invite)
            };
            chatservices.updateUserConversationInformation(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    this.$store.state.snackbar.color = 'primary'
                    this.$store.state.snackbar.message = response.data.message;
                    this.$store.state.snackbar.show = true;
                    this.inviteuserdialog = false;
                }
            }).catch(error => console.log(error));
        },
        // save room
        saveRoom(){
            this.chat_information = {
                room_name: this.room_name,
                icon: 'https://66.media.tumblr.com/avatar_c6a8eae4303e_512.pnj',
                created_by: this.$store.getters.getUserID,
                user_id: this.users_info
            };
            let payload = {
                chat_information: JSON.stringify(this.chat_information)
            };

            chatservices.saveConversationInformation(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    this.FetchConversation();
                    this.$store.state.snackbar.message = response.data.message;
                    this.$store.state.snackbar.show = true;
                    this.addroomsinfo = false
                    this.room_name = "";
                    this.users_info = [];
                }
            }).catch(error => console.log(error));

        },

        // get conversations
        async FetchConversation(){



            this.socketInstance = io(process.env.VUE_APP_CHAT_SERVER);

            this.socketInstance.on(
                "message:received", (data) => {
                    this.messages = this.messages.concat(data)
                } 
            )

            let payload = {
                user_id: this.$store.getters.getUserID
            };

            await chatservices.fetchConversationInformation(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    
                    var conversation_info = [];
                    response.data.result.forEach((value) => {
                        var participants = [];
                        JSON.parse(value.user_id).forEach((xValue)=>{
                            participants.push({
                                _id: xValue,
                                username: ""
                            })
                        });
                        var Xarr = `{"roomId": `+(value.id).toString()+`,"roomName": "`+value.room_name+`","avatar": "`+value.icon+`","users": `+JSON.stringify(participants)+`}`
                        conversation_info.push(JSON.parse(Xarr));
                    });
                    var res = conversation_info
                    const rooms = []
                    for (let i = 0; i < res.length; i++) {
                        rooms.push(res[i])
                    }
                    this.rooms = rooms
                    this.addroomsinfo = false
                    this.loadingrooms = false


                }
            }).catch(error => console.log(error));


        },

        // get users
        FetchUser(){

            let payload = {
                user_id: this.$store.getters.getParentID
            };

            userservices.fetchUserInformation(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    this.user_info = response.data.result;
                }
            }).catch(error => console.log(error));

        },

        // get messages
		fetchMessages({ room, options }) {
            setTimeout(()=>{
                this.roomID = room['roomId']
                this.messagesLoaded = false

                // use timeout to imitate async server fetched data
                setTimeout(() => {
                    this.messages = []
                    this.messagesLoaded = true
                })

                setTimeout(() => {
                    if (options.reset) {
                        this.addMessages(true)
                    } else {
                        [...this.addMessages(), ...this.messages]
                        this.messagesLoaded = true
                    }
                    
                })
            });

		},

        // save messages to conversation
		async addMessages(reset) {
            let payload = {
                conversation_id: this.roomID
            };

            await chatservices.fetchChatInformation(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                        this.message_count = response.data.result
                }


            }).catch(error => console.log(error))

            setTimeout(()=>{
                
                var counter = this.message_count.length
                setTimeout(()=>{
                const messages = this.message_count
                var xmessages = [];
                for (let i = 0; i < counter; i++) {
                    xmessages.push({
                        _id: reset ? messages[i]['id'] : i,
                        content: messages[i]['content'],
                        senderId: (messages[i]['sender_id']).toString(),
                        username: messages[i].user_info.personal_information['firstname']+", "+messages[i].user_info.personal_information['lastname'],
                        date: messages[i]['date_sent'],
                        deleted: messages[i]['deleted_at'] != null ? true : false,
                        seen: true,
                        timestamp: messages[i]['time_sent']
                    })
                }
                    this.messages = xmessages
                });

            });
		},

        // option for action
        messageActionHandler({ roomId, action, messages }) {
        switch (action.name) {
            case 'deleteMessages':
                
            console.log(messages)
            this.deleteMessage(roomId, messages)
            break;
            case 'shareMessage':
            // call a method to share selected messaged with another user
            break;
        }
        },

        // remove message
        deleteMessage({ roomId, message }){
            let payload = {
                room_id: roomId,
                chat_id: message._id
            }
            console.log(payload)
            chatservices.deleteMessageInformationViaID(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                   
                    this.socketInstance = io(process.env.VUE_APP_CHAT_SERVER);

                    
                    this.socketInstance.on('message', message);
                }

            }).catch(error => console.log(error));

        },

        // option menu for action
        menuActionHandler({ roomId, action }) {
            switch (action.name) {
                case 'inviteUser':
                this.inviteuserdialog = true
                this.inviteuser(roomId)
                break;
                case 'removeUser':
                this.removeuserdialog = true
                this.removeuser(roomId)
                break;
                case 'deleteRoom':
                this.deleteRoom(roomId, this.currentUserId)
                break;
                case 'leaveRoom':
                this.leaveRoom(roomId, this.currentUserId)
                break;

            }
        },

        // remove user to conversation
        removeuser(id){
            this.remove_room_id = id
            var users = [];
            let payload = {
                room_id: id
            }
            chatservices.fetchConversationInformationViaID(payload, this.$store.getters.getAccessToken).then(response => {
                users = response.data.result.user_id;

            let xpayload = {
                user_id: users,
                parent_id: this.$store.getters.getParentID
            }

            chatservices.fetchUserInformationViaUsersIN(xpayload, this.$store.getters.getAccessToken).then(response2 => {
                
                    console.log(response2.data.result)
                    this.users_info_removes = response2.data.result;
                
            }).catch(error => console.log(error));

            }).catch(error => console.log(error));
        },

        // get user invitation
        inviteuser(id){
            this.invite_room_id = id
            var users = [];
            let payload = {
                room_id: id
            }
            chatservices.fetchConversationInformationViaID(payload, this.$store.getters.getAccessToken).then(response => {
                
            users = response.data.result.user_id;
            let xpayload = {
                user_id: users,
                parent_id: this.$store.getters.getParentID
            }

            chatservices.fetchUserInformationViaUsers(xpayload, this.$store.getters.getAccessToken).then(response2 => {
                
                
                    this.users_info_invites = response2.data.result;
                
            }).catch(error => console.log(error));
                
            }).catch(error => console.log(error));
        },

        // delete room conversation
        deleteRoom(roomId, currentUserId){
            let xpayload = {
                room_id: roomId
            }
            chatservices.fetchConversationInformationViaID(xpayload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    if(response.data.result.created_by!=currentUserId){
                        this.$store.state.snackbar.color = 'warning'
                        this.$store.state.snackbar.message = "You are not an Admin of this room.";
                        this.$store.state.snackbar.show = true;
                    }else{
                        let payload = {
                        room_id: roomId
                    }

                    chatservices.deleteConversationtInformation(payload, this.$store.getters.getAccessToken).then(response => {
                        if(response.data.success){
                        this.$store.state.snackbar.color = 'danger'
                        this.$store.state.snackbar.message = response.data.message;
                        this.$store.state.snackbar.show = true;
                            setTimeout(() => {
                                window.location.reload()

                            },2000)
                        }
                    }).catch(error => console.log(error));
                    }
                }
            }).catch(error => console.log(error));
            
        },

        // leave conversation
        leaveRoom(roomId, currentUserId){
            let payload = {
                room_id: roomId,
                user_id: currentUserId
            }

            chatservices.leaveConversationtInformation(payload, this.$store.getters.getAccessToken).then(response => {
                if(response.data.success){
                    this.$store.state.snackbar.message = response.data.message;
                    this.$store.state.snackbar.show = true;
                    window.location.reload()
                }
            }).catch(error => console.log(error));
        },

        // send message
		sendMessage(message) {

            var myNewMessage = {
                        _id: message.roomId,
                        content: message.content,
                        senderId: this.currentUserId,
                        timestamp: new Date().toString().substring(16, 21),
                        date: new Date().toDateString()
                    }

                this.socketInstance.emit('message', myNewMessage);
            // end delete after inserting socket
            
            this.message_information = {
                    conversation_id: this.roomID,
                    content: message.content,
					sender_id: this.currentUserId,
					time_sent: new Date().toString().substring(16, 21),
					date_sent: new Date().toDateString(),
                    replyMessage: {
                    content: message.content,
                    senderId: this.currentUserId,
                    files: [
                        {
                        name: 'My Replied File',
                        size: 67351,
                        type: 'png',
                        audio: true,
                        duration: 14.4,
                        url: 'https://firebasestorage.googleapis.com/...',
                        preview: 'data:image/png;base64,iVBORw0KGgoAA...'
                        }
                    ]
                    }
            };
            let payload = {
                message_information: JSON.stringify(this.message_information)
            };
            chatservices.saveChatInformation(payload, this.$store.getters.getAccessToken)
		},


        // adding new message
		addNewMessage() {
			setTimeout(() => {
				this.messages = [
					...this.messages,
					{
						_id: this.messages.length,
						content: 'NEW MESSAGE',
						senderId: 'qweqeqwe',
						timestamp: new Date().toString().substring(16, 21),
						date: new Date().toDateString()
					}
				]
			})
		}
	}
}
</script>

<style lang="scss">
body {
	font-family: 'Quicksand', sans-serif;
}
</style>
