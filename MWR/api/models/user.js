const mongoose = require('mongoose');
const useSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // unique index and unique constraint
    },
    password: {
        type: String,
        required: true,
    },
    todos:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Todo",
        }
    ],
    tododailies:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tododaily",
        }
    ],
    
    createdAt:{
        type: Date,
        default: Date.now,
    },
});
const User = mongoose.model("User", useSchema);
module.exports = User;