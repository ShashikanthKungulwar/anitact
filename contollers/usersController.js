const Users=require('../models/user');

module.exports.users=(req,res)=>{
    return res.render("../views/users.ejs",{
        title:"users"
    });
}

module.exports.signUp=(req,res)=>{
    if(req.isAuthenticated())
    {
        return res.redirect('/');
    }
    return res.render("../views/sign_up.ejs",{
        title:"sign-up"
    });
}
module.exports.signIn=(req,res)=>{
    if(req.isAuthenticated())
    {
        return res.redirect('/');
    }
    return res.render("../views/sign_in.ejs",{
        title:"sign-in"
    });
}


module.exports.create=async (req,res)=>{
    if(req.body.password != req.body.confirm_password)
    {
        return res.redirect('back');
    }
    Users.findOne({email:req.body.email}).exec().then(async result=>{
        if(!result)
    {
        await Users.create(req.body);
        return res.redirect('sign-in')
    }
    }).catch(err=>{
        return res.redirect('back')
    });
    

}


module.exports.createSession=(req,res)=>{
    return res.redirect("./profile");
}

module.exports.destroySession=(req,res,next)=>{
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
      });
}