const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    message: String,
    nickname: String,
    room_num: Number
});

module.exports = mongoose.model('Message', messageSchema);