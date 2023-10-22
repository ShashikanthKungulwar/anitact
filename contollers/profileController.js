const Users = require('../models/user');

module.exports.profile = async (req, res) => {
    if (req.cookies.user_id) {
        let check = await Users.findOne({ "_id": req.cookies.user_id }).exec();
        if (check) {
            return res.render("../views/profile.ejs", {
                title: "profile",
                details:check
            });
        }
        else {
            return res.redirect('/users/sign-in');
        }
    }
    else {
        return res.redirect('/users/sign-in');
    }
}