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
        }
        catch(error){
            console.log(error);
        }
    }
    else
    {
        return res.redirect('/users/sign-in');
    }
    return res.redirect('back');
}

module.exports.destroy = async (req, res) => {
    try{
    const post = await Posts.findById(req.params.id).exec();
    if (post && post.user == req.user.id) {
        console.log(1);
        await Comments.deleteMany({post:req.params.id});
        await Posts.findByIdAndDelete(post.id);
    }
}catch(error){
console.log('error while deleting post',error);
}
    return res.redirect('back');
}