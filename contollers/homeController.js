module.exports.home=(req,res)=>{
    console.log(req.cookies);
    return res.render("../views/home.ejs",{
        title:"home"
    });
}