module.exports.users=(req,res)=>{
    return res.render("../views/users.ejs",{
        title:"users"
    });
}

module.exports.signUp=(req,res)=>{
    return res.render("../views/sign_up.ejs",{
        title:"sign-up"
    });
}
module.exports.signIn=(req,res)=>{
    return res.render("../views/sign_in.ejs",{
        title:"sign-in"
    });
}
module.exports.createSession=(req,res)=>{
    
}