module.exports.home=(req,res)=>{
    return res.render("../views/home.ejs",{
        title:"home"
    });
}