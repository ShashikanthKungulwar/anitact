const Posts = require("../models/post");
const Users = require('../models/user');
module.exports.home = async (req, res) => {

    try {
        var posts = await Posts.find({}).sort('-createdAt')
            .populate('user')
            .populate({
                path: "comments",
                populate: {
                    path: 'user'
                }
            }).exec();

        // posts.commnets.sort('-createdAt');not woriking find later

        var users =await Users.find({}).exec();
    }
    catch (error) {
        console.log(error);
    }
    finally {
        return res.render("../views/home.ejs", {
            title: "home",
            posts,
            users_list:users
        });
    }
}