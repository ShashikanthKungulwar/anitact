const Likes = require('../models/likes');
const Posts = require('../models/post');
const Comments = require('../models/comments');

module.exports.toggleLike = async (req, res) => {
    try {
        let likable;
        let deleted = false;
        const existingLike = await Likes.findOne({
            user: req.user.id,
            likable: req.query.id,
            onModel: req.query.type
        })

        if (req.query.type == 'Posts') {
            likable = await Posts.findById(req.query.id).populate('likes');
        }
        else {
            likable = await Comments.findById(req.query.id).populate('likes');
        }
        if (existingLike) {
            deleted = true;
            likable.likes.pull(existingLike._id);
            likable.save();
            existingLike.remove();
        }
        else {
            const newLike = await Likes.create({
                user: req.user._id,
                onModel: req.query.type,
                likable: likable._id
            });
            likable.likes.push(newLike._id);
            likable.save();
        }
        return res.status(200).json({
            message: "Request successful",
            data: {
                deleted
            }
        })

    }
    catch (error) {
        console.log(error, 'error in likes controller');
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}