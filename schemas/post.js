const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
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
        default: Date.now
    },
});

// PostSchema.virtual("postId").get(function(){
//     return this._id.toHexString();
// });
// PostSchema.set("toJSON",{virtuals: true});

module.exports = mongoose.model("Post", PostSchema);