const Posts=require('../models/post');

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