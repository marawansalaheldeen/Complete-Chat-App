const express = require('express');
const path = require('path');
const http = require('http');
const socketio  = require('socket.io');

const {generateMessages,locationMessages} = require('./utils/messages')
const app = express();
const server  = http.createServer(app);
const io = socketio(server);
const {addUser,removeUser,getUser,getUsersInRoom} = require('./utils/users');


const port = process.env.PORT || 3000;
app.use(express.static('public'));


app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname+'/public/home.html'));    
})
//sockets

io.on('connection', (socket) => {
    console.log('a user connected');


    socket.on('disconnect',()=>{
        const user = removeUser(socket.id);

        if(user){
            io.to(user.room).emit('message',generateMessages(`${user.username} has left`));
        }
    })

    socket.on('join',(options,callback)=>{
        const {error,user} = addUser({id:socket.id, ...options});

        if(error){
            return callback(error);
        }
        socket.join(user.room);
        socket.emit('message',generateMessages('Welcome!'));
        socket.broadcast.to(user.room).emit('message',generateMessages( `${user.username} has joined`));

        callback()
    })

    socket.on('sendMessage',(msg,callback)=>{
        io.emit('message',generateMessages(msg));
        callback('Dell');
    })
    
    socket.on('sendloc',(coords,callbackt)=>{
        io.emit('locmessage',locationMessages(`https://www.google.com/maps/@${coords.latitude},${coords.longitude}z`));
        callbackt('Location Shared');
    })
});

//server up
server.listen(port,()=>{
    console.log(`Server is running on port : ${port}`);
})