const Posts = require("../models/post");

module.exports.home = async (req, res) => {

    try {
        var posts = await Posts.find({})
        .populate('user')
        .populate({
            path:"comments",
            populate:{
                path:'user'
            }
        }).exec();
    }
    catch (error) {
        console.log(error);
    }
    finally {
        return res.render("../views/home.ejs", {
            title: "home",
            posts
        });
    }
}