const mongoose = require("mongoose");

const { Schema } = mongoose;
const { type: { ObjectId }} = Schema;
const comentsSchema = new mongoose.Schema({
    postId: {
        type: ObjectId,
        required: true,
        ref: 'Post'
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
        type: Date,
        required: true,
        default: Date.now,
    },
});

// comentsSchema.virtual("comentsId").get(function(){
//     return this._id.toHexString();
// });

// comentsSchema.set("toJSON",{virtuals: true});

module.exports = mongoose.model("Coments", comentsSchema);