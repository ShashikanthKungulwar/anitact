const Users = require("../models/user");

module.exports.profile=async (req,res)=>{
    if(req.params.id)
    var user_profile=await Users.findById(req.params.id);
    else
    var user_profile=req.user;


    const idx=user_profile.friendship.indexOf(req.user._id);
    let isFriend=true;
    if(idx==-1)
    {
        isFriend=false;
    }

    return res.render("../views/profile.ejs",{
        title:"profile",
        user_profile,
        isFriend
    });
}


module.exports.update=(req,res)=>{
    return res.render("../views/updatePage.ejs",{
        title:"update"
    });
}