const mongoose = require('mongoose');
const tododailySchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },

    status:{
        type: String,
        enum: ["pending", "completed"],
        default: "pending",
    },
    category:{
        type: String,
        required: true,
    },
    dueDate:{
        type: Date,
        required: true,
    },
    createdAt:{
        type: Date,
        default: Date.now,
    },  
});
const Tododaily = mongoose.model("Tododaily", tododailySchema);
module.exports = Tododaily;