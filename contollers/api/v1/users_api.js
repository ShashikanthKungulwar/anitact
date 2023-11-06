const jwt=require('jsonwebtoken');
const Users=require('../../../models/user');


module.exports.createSession=async (req,res)=>{
    try{
        let user=await Users.findOne({email:req.body.email}).exec();
        if(!user || user.password != req.body.password)
        {
            return res.json(422,{
                message:"invalid username or password"
            })
        }   
        return res.json(200,{
            message:"successful login",
            data:{
                token:jwt.sign(user.toJSON(),'anitact',{expiresIn:'10000'})
            }
        })
    }
    catch(error){
        console.log('Innternal Server errror',error);
        return res.json(500,{
            message:"Internal server error"
        });
    }
}

