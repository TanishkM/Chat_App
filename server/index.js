const express=require('express');
const app=express()
const router = express.Router();
const http=require('http');
const {Server}=require('socket.io');
const cors = require("cors");
const connectToMongo = require('./db');
const server=http.createServer(app);
const Chat = require('./models/Chats');

connectToMongo();
app.use(cors());
app.use(express.json())
app.use('/api/auth', require('./routes/auth'))
app.use('/api/chats', require('./routes/chats'))

const io=new Server(server,{
    cors:{
        origin:"*",
        methods:["GET","POST"],
    }
});

io.on('connection',(socket)=>{
    console.log("user connected")


    socket.on("join_room",(data)=>{
        socket.join(data.room);
    })
    
    socket.on("send_message",(data)=>{
        socket.to(data.room).emit("receive_message",data)


        const chat = new Chat({
            name:data.username,author:data.author,message:data.message,room:data.room,time:data.time
        })
        chat.save();
    })



    socket.on('disconnect',()=>{
        console.log("user disconnected")
    })
})
server.listen(3002,()=>{
    console.log('server running !!');

});