const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const Message = require('./models/Message');

const app = express();
const PORT = 5000;
const server = http.createServer(app);
const socket_server = new Server(server, {cors: {origin: '*'}});

mongoose.connect("mongodb://localhost:27017/chat", {
    
})

async function saveMessage({message, nickname, room_num}){
    if(message.trim() === "") return;
    const newMsg = new Message({message, nickname, room_num});
    await newMsg.save();
}

socket_server.on('connection', (socket) => {
    console.log("server connect");

    socket.on("enter_room", (num) => {
        console.log(num);
        socket.broadcast.emit("reply", num);
    });

    socket.on("send_message", (data) => {
        const {message, nickname, room_num} = data;
        console.log(message);
        saveMessage({message, nickname, room_num});
        socket_server.to(room_num).emit("receive_message", data);
    })
});

server.listen(PORT, ()=>{
    console.log("cykor");
})