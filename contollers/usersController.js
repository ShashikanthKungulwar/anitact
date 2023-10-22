const Users = require('../models/user');

module.exports.users = (req, res) => {
    return res.render("../views/users.ejs", {
        title: "users"
    });
}

module.exports.signUp = (req, res) => {
    return res.render("../views/sign_up.ejs", {
        title: "sign-up"
    });
}
module.exports.signIn = (req, res) => {
    return res.render("../views/sign_in.ejs", {
        title: "sign-in"
    });
}


module.exports.create = async (req, res) => {
    if (req.body.password != req.body.confirm_password) {
        return res.redirect('back');
    }
    Users.findOne({ email: req.body.email }).exec().then(async result => {
        if (!result) {
            await Users.create(req.body);
            return res.redirect('sign-in')
        }
    }).catch(err => {
        return res.redirect('back')
    });


}


module.exports.createSession = async (req, res) => {

    //find user

    //if user exists then match the password

    //if pattern matches then login 


    //if not then return 

    //else return back to the same page
    let k = await Users.findOne({ email: req.body.email }).exec();
    console.log(k);
    if (k) {
        if (k.password == req.body.password) {
            console.log('success');
            res.cookie("user_id", k.id);
            return res.redirect('../../');
        }
        console.log('password didnt match');
        return res.redirect('back');
    }
    console.log('user doesnt exist')
    return res.redirect('back');
}


module.exports.signOut=(req,res)=>{
    res.clearCookie('user_id');
    res.redirect('sign-in');
}