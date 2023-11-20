const mongoose = require('mongoose');

const resetPasswordAccessTokenSchema = new mongoose.Schema({
    email:{
        required:true,
        type:String
    },
    accessToken:{
        required:true,
        type:String
    },
    changed:{
        required:true,
        type:Boolean
    }
}, { timestamps: true });


const AccessTokenModel=mongoose.model('AccessTokenModel',resetPasswordAccessTokenSchema);

module.exports=AccessTokenModel;