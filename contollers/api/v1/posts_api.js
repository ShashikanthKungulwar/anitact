const Posts = require('../../../models/post');
const Comments = require('../../../models/comments');
module.exports.index = async (req, res) => {
    try {
        console.log(req.user)
        var posts = await Posts.find({}).sort('-createdAt')
            .populate('user', '-password')
            .populate({
                path: "comments",
                populate: {
                    path: 'user',
                    select: '-password'
                }
            }).exec();

        // posts.commnets.sort('-createdAt');not woriking find later

        // var users =await Users.find({}).exec();
    }
    catch (error) {
        console.log(error);
    }

    return res.json(200, {
        message: "list of all posts",
        posts
    })
}



module.exports.destroy = async (req, res) => {
    try {
        const post = await Posts.findById(req.params.id).exec();
        console.log(req.user.id,post);
        if (post && post.user == req.user.id) {
            await Comments.deleteMany({ post: req.params.id });
            var deletePost = await Posts.findByIdAndDelete(post.id);
            return res.json(200, {
                message: "successfully deleted post and associated comments from db",
                deletePost,
            })
        } else {
            return res.status(401).json({
                message: "you cant delete the post"
            })
        }
    } catch (error) {

        console.log('error while deleting post', error);
        return res.json(500, {
            message: "error in deleting",
        })
    }

}