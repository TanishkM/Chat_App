const mongoose = require('mongoose');
const { Schema } = mongoose;

const chatSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    author:{
        type: String,
        required: true, 
    },
    message:{
        type: String,
        required: true, 
    },
    room:{
        type: String,
        required: true, 
    },
    time:{
        type: String,
    },
  });

  module.exports = mongoose.model('chat', chatSchema);