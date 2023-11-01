const Posts=require('../models/post');
const Comments=require('../models/comments');
module.exports.posts=(req,res)=>{
    return res.render("../views/posts.ejs",{
        title:"posts"
    })
}


module.exports.create=async (req,res)=>{
    if (req.user) {
        try {
            await Posts.create({
                ...req.body,
                user: req.user.id
            })
            console.log('success in posting')
            req.flash('success','post created successfully');
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
        await Posts.findByIdAndDelete(post.id);
        req.flash('success','deleted post successfully');
    }
}catch(error){
req.flash('error','try to delete the post again');
console.log('error while deleting post',error);
}
    return res.redirect('back');
}