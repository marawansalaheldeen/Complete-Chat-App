const express = require('express');
const path = require('path');
const http = require('http');
const socketio  = require('socket.io');

const {generateMessages,locationMessages} = require('./utils/messages')
const app = express();
const server  = http.createServer(app);
const io = socketio(server);


const port = process.env.PORT || 3000;
app.use(express.static('public'));


app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname+'/public/home.html'));    
})
//sockets

io.on('connection', (socket) => {
    console.log('a user connected');


    socket.on('disconnect',()=>{
        io.emit('message',generateMessages('a user has left'));
    })
    socket.on('sendMessage',(msg,callback)=>{
        io.emit('message',generateMessages(msg));
        callback('Dell');
    })
    
    socket.on('sendloc',(coords,callbackt)=>{
        io.emit('locmessage',locationMessages(`https://www.google.com/maps/@${coords.latitude},${coords.longitude}z`));
        callbackt('Location Shared');
    })

    socket.on('join',({username,room})=>{
        socket.join(room)
        socket.emit('message',generateMessages('Welcome!'));
        socket.broadcast.to(room).emit('message',generateMessages( `${username} has joined`));
    })
});

//server up
server.listen(port,()=>{
    console.log(`Server is running on port : ${port}`);
})