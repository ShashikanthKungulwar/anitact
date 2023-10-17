module.exports.users=(req,res)=>{
    return res.render("../views/users.ejs",{
        title:"users"
    });
}