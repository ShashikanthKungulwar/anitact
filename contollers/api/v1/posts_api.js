


module.exports.index=(req,res)=>{
    console.log(123);
    return res.json(200,{
        message:"list of all posts",
        posts:[]
    })
}