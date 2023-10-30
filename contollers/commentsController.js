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