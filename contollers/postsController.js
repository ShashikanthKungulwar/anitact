module.exports.posts=(req,res)=>{
    return res.render("../views/posts.ejs",{
        title:"posts"
    })
}