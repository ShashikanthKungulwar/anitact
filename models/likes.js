const mongoose = require('mongoose');


const likeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    likable: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'onModel'
    },
    onModel: {
        type: String,
        required: true,
        enum: ['Posts', 'Comments']
    }
},{
    timestamps:true
});


const Likes = mongoose.model('Likes', likeSchema);

module.exports = Likes;