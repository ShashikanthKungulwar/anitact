const Posts=require('../models/post');
const Comments=require('../models/comments');
const { response } = require('express');
module.exports.posts=(req,res)=>{
    return res.render("../views/posts.ejs",{
        title:"posts"
    })
}


module.exports.create=async (req,res)=>{
    if (req.user) {
        try {
            let post=await Posts.create({
                ...req.body,
                user: req.user.id
            })
            if(req.xhr)
            {
                await post.populate('user');
                // req.flash('success','post created successfully');
                return res.status(200).json({
                    data:{
                        post:{...post._doc,user:{
                            _id:post.user._id,
                            name:post.user.name
                        }},
                        message:"post created"
                    }
                });
            }
            console.log('success in posting')
            
        }
        catch(error){
            req.flash('error','please try again to post');
            console.log(error);
        }
    }
    else
    {
        req.flash('error','please sign in to post content')
        return res.redirect('/users/sign-in');
    }
    return res.redirect('back');
}



module.exports.destroy = async (req, res) => {
    try{
    const post = await Posts.findById(req.params.id).exec();
    if (post && post.user == req.user.id) {
        await Comments.deleteMany({post:req.params.id});
        var deletePost=await Posts.findByIdAndDelete(post.id);
        // req.flash('success','deleted post successfully');
    }
    if(req.xhr){
       
        return res.status(200).json({
            data:deletePost.id,
            message:"post deleted successfully"
        })
    }
}catch(error){
req.flash('error','try to delete the post again');
console.log('error while deleting post',error);
}
    return res.redirect('back');
}