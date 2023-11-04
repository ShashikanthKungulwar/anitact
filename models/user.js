const mongoose = require('mongoose');
const path = require('path');
const multer = require('multer');

const AVATAR_PATH = path.join('/uploads/users/avatars');
console.log(path.join(__dirname + '/..' + AVATAR_PATH));

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
    }
}, {
    timestamps: true
});

//as we are setting multer for user model we are not storing the multer config in config folder but in this file

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname + '/..' + AVATAR_PATH))
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})




userSchema.statics.uploadedAvatar=multer({storage}).single('avatar');
userSchema.statics.avatarPath=AVATAR_PATH;



const Users = mongoose.model('Users', userSchema);

module.exports = Users;