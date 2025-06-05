const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const Message = require('./models/Message');
const { MongoClient } = require('mongodb');


const client = new MongoClient("mongodb://localhost:27017/web2");
const app = express();
const PORT = 5000;
const server = http.createServer(app);
const socket_server = new Server(server, {cors: {origin: '*'}});

mongoose.connect("mongodb://localhost:27017/web2").then(()=> console.log("실행 중"));

async function saveMessage({message, nickname, room_num}){
    if(message.trim() === "") return;
    const newMsg = new Message({message, nickname, room_num});
    console.log(newMsg);
    newMsg.save();
}

async function loadMessage(room_num){
    const messages = await Message.find({room_num});
    console.log(messages);
    return messages;
}

socket_server.on('connection', (socket) => {
    console.log("server connect");

    socket.on("enter_room", (num) => {
        socket.join(num);
        console.log(num);
        const messages = loadMessage(num);
        socket.emit("load_messages", messages);
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