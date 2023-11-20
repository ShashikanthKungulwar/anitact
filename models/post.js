const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comments'
    }],
    likes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Likes'
    }]
}, {
    timestamps: true
})

const Posts = mongoose.model('Posts', postSchema);
module.exports = Posts; 