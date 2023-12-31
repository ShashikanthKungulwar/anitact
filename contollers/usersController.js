const Users = require('../models/user');
const Posts = require('../models/post');
const fs=require('fs');


module.exports.users = (req, res) => {
    return res.render("../views/users.ejs", {
        title: "users"
    });
}


module.exports.signUp = (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    return res.render("../views/sign_up.ejs", {
        title: "sign-up"
    });
}
module.exports.signIn = (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    return res.render("../views/sign_in.ejs", {
        title: "sign-in"
    });
}


module.exports.create = async (req, res) => {
    if (req.body.password != req.body.confirm_password) {
        req.flash('error', 'cant update try again with same confirm password!');

        return res.redirect('back');
    }
    Users.findOne({ email: req.body.email }).exec().then(async result => {
        if (!result) {
            await Users.create(req.body);
            req.flash('success', 'successfylly account created');
            return res.redirect('sign-in')
        }
        else {
            req.flash('error', 'email already present');
            return res.redirect('back');
        }
    }).catch(err => {

        return res.redirect('back')
    });


}


module.exports.createSession = (req, res) => {
    req.flash('success', 'successfylly logged in');
    return res.redirect("/users/profile");
}

module.exports.destroySession = (req, res, next) => {
    req.logout(function (err) {
        if (err) { return next(err); }
        req.flash('success', 'successfylly logged out');
        res.redirect('/');
    });
}

module.exports.update = async (req, res) => {


    // if(req.user.password == req.body.password)
    // {
    //     await Users.findByIdAndUpdate(req.user.id,req.body);
    //     req.flash('success','successfylly updated profile');
    //     return res.redirect('/users/profile');
    // }
    // req.flash('error','cant update try again with right password!');
    // return res.redirect('back');

    try {
        let user = await Users.findById(req.user.id);
        Users.uploadedAvatar(req, res, async (err) => {
            if (err) {
                req.flash("error", "some error occured");
                return res.redirect('back')
            }
            if (req.user.password == req.body.password) {
                // console.log(req.file);
                if(req.user.avatar)
                {
                    fs.unlinkSync(__dirname+"\\.."+req.user.avatar);
                }
                await Users.findByIdAndUpdate(user.id,{...req.body,avatar:Users.avatarPath+'\\'+req.file.filename});
            }
            else {
                req.flash('error', 'cant update try again with right password!');
                return res.redirect('back');
            }
        })

        req.flash('success', 'successfylly updated profile');
        return res.redirect('/users/profile');
    } catch (error) {
        req.flash('error', 'cant update try again with right password!');
        return res.redirect('back');
    }

}
