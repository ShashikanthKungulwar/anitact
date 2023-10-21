module.exports.home=(req,res)=>{
    console.log(req.cookies);
    res.cookie("use","shashi");
    return res.render("../views/home.ejs",{
        title:"home"
    });
}