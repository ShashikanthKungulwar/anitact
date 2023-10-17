module.exports.profile=(req,res)=>{
    return res.render("../views/profile.ejs",{
        title:"profile"
    });
}