const mongoose = require("mongoose");

const comentsSchema = new mongoose.Schema({
    postId: {
        type: Number,
        required: true,
        unique: true
    },
    author: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    dateTime: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Coments", comentsSchema);