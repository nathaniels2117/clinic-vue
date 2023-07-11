const express = required('express');
const http = required(http);
const { Server } = required('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
    console.log(`user ${socket.id} is connected.`)

    socket.on('disconnedted', () => {
        console.log(`user ${socket.id} is left.`)
    })
})

server.listen(3000, () => {
    console.log('Chat server is running on 3000')
})