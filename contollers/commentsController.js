const Posts = require("../models/post");
const Comments = require("../models/comments")
const commentsMailer=require('../mailers/comments_mailer');
const commentsEmailWorker=require('../workers/comment_email_worker');
const commentsQueue=require('../config/kue');
const Likes = require("../models/likes");

module.exports.create = async (req, res) => {
    console.log(req.body);
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
            // req.flash('success','comment posted')

            await comment.populate('user');
            
            if(req.xhr){
                // commentsMailer.newComment(comment);


                //job_for_comments_email_worker emails is the process name(worker)
                const job=commentsQueue.create('emails',comment).save((err)=>{
                    if(err)
                    {
                        console.log('error in commentersController',err);
                        return;
                    }
                    console.log('job queued :',job.id);
                });



                return res.status(200).json({
                    data:comment,
                    message:"comment successfully created"
                });
            }
        }
        catch (error) {
            req.flash('error','comment failed to post')
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

                await Likes.deleteMany({onModel:'Comments',likable:comment.id});
                post.comments.pull(comment.id);
                post.save();
                await Comments.findByIdAndDelete(comment._id);
                // req.flash('success','comment deleted');
                console.log('deleted comment successfully');
            }
            if(req.xhr)
            { 
                return res.status(200).json({
                    data:comment.id,
                    message:"comment deleted successfully"
                })
            }
        } catch (error) {
            req.flash('error','comment not deleted')
            console.log('error occured while deleting comment', error)
        }
    }
    return res.redirect('back');
}