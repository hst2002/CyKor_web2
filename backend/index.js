const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const PORT = 5000;
const server = http.createServer(app);
const socket_server = new Server(server, {cors: {origin: '*'}});

socket_server.on('connection', (socket) => {
    console.log("server connect");

    socket.on("enter_room", (num) => {
        console.log(num);
        socket.broadcast.emit("reply", num);
    });

    socket.on("send_message", (message) => {
        console.log(message);
    })
});

server.listen(PORT, ()=>{
    console.log("cykor");
})