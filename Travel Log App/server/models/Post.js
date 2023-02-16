const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    tripCost: {
        type: Number,
        required: true,
    },
    recom: {
        type: Boolean,
        required: true,
    },
    reviewText: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: false,
    },
    date: {
        type: Date,
        required: true,
    },
    location:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    photo:{
        type:Buffer,
        required:false
    },
    filetype:{
        type:String,
        required:false
    }
});

const PostModel = mongoose.model("Posts", postSchema);
module.exports = PostModel;