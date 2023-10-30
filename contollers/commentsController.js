const Posts = require("../models/post");
const Comments = require("../models/comments")
module.exports.create = async (req, res) => {
    // console.log(req.body);
    const post = await Posts.findById(req.body.post).exec();
    if (post) {
        try {
            const comment = await Comments.create({
                ...req.body,

                user: req.user.id
            });
            console.log(comment, "comment successfully created");
            post.comments.push(comment);
            post.save();
            console.log("comment added to the post");
        }
        catch (error) {
            console.error(error, "error in posting the comment")
        }
    }
    return res.redirect('/');
}


module.exports.destroy = async (req, res) => {
    const comment = await Comments.findById(req.params.id).exec();
    if (comment) {
        try {
            const post = await Posts.findById(comment.post);
            if (comment.user == req.user.id || post.user == req.user.id) {
                post.comments.pull(comment.id);
                post.save();
                await Comments.findByIdAndDelete(comment.id);
                console.log('deleted comment successfully');
            }
        } catch (error) {
            console.log('error occured while deleting comment', error)
        }
    }
    return res.redirect('back');
}