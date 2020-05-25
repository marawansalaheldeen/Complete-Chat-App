const express = require('express');
const path = require('path');
const http = require('http');
const socketio  = require('socket.io');

const app = express();
const server  = http.createServer(app);
const io = socketio(server);


const port = process.env.PORT || 3000;
app.use(express.static('public'));

let count = 0; 

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname+'/public/home.html'));    
})

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.emit('message', 'Welcome!');

    socket.broadcast.emit('message','new user is conected');
    socket.on('disconnect',()=>{
        io.emit('message','a user has left');
    })
    socket.on('sendMessage',(msg,callback)=>{
        io.emit('message',msg);
        callback('Dell');
    })
    
    socket.on('sendloc',(coords,callbackt)=>{
        io.emit('locmessage',`https://www.google.com/maps/@${coords.latitude},${coords.longitude}z`);
        callbackt('Location Shared');
    })
});


server.listen(port,()=>{
    console.log(`Server is running on port : ${port}`);
})