const Users = require("../models/user");

module.exports.profile=async (req,res)=>{
    if(req.params.id)
    var user_profile=await Users.findById(req.params.id);
    else
    var user_profile=req.user;
    console.log(user_profile);
    return res.render("../views/profile.ejs",{
        title:"profile",
        user_profile
    });
}


module.exports.update=(req,res)=>{
    return res.render("../views/updatePage.ejs",{
        title:"update"
    });
}