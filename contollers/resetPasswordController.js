const crypto = require('crypto');
const resetPasswordMailer = require('../mailers/reset-password-mailer');
const AccessTokenModel = require('../models/reset-password-access-Token');
const Users = require('../models/user');

module.exports.resetPasswordRequest = (req, res) => {
    return res.render('../views/reset_password_request_page.ejs', {
        title: "password reset request"
    });
}

module.exports.resetPasswordSessionCreate = async (req, res) => {
    const { email } = req.body;

    const user = await Users.findOne({ email }).exec();
    console.log(user);
    if (user) {

        let check=await AccessTokenModel.findOne({email});
        if(!check)
        {
            var result = await AccessTokenModel.create({
                email,
                accessToken: `${crypto.randomBytes(20).toString('hex')}`,
                changed: false
            })
        }
        else{
            var result=check;
        }
        
        resetPasswordMailer.sendResetPasswordLink({
            email,
            link: `http://localhost:8000/reset-password/reset-password-page/?accessToken=${result.accessToken}`
            
        })
        setTimeout(async ()=>{
            await AccessTokenModel.deleteOne({email}).exec();
        },20*60*1000)
        req.flash('success', 'check your mail for reset password link');
        return res.redirect('/users/sign-in');
    }
    else{
        req.flash('error','user doesnt exist');
        return res.redirect('back');
    }
}


module.exports.resetPasswordPage = async(req, res) => {
    console.log(req.query.accessToken);
    const result=await AccessTokenModel.findOne({accessToken:req.query.accessToken}).exec();
    if(result)
    {
        if(result.changed){
            req.flash('error','already used this link to change password')
            return res.redirect('/users/sign-in');
        }
        req.flash('success','change password here');
        return res.render('../views/reset-passwod-page.ejs', {
            title: "password reset page  ",
            accessToken: req.query.accessToken
        })
    }
    req.flash('error','reset password link expired ');
    return res.redirect('/users/sign-in');
}

module.exports.changePassword =async (req, res) => {
    if(req.body.password!=req.body.confirm_password)
    {
        req.flash('error','password and confirm password didnt match');
        return res.redirect('back');
    }
    const result=await AccessTokenModel.findOne({accessToken:req.query.accessToken});
    if(!result || result.changed)
    {
        req.flash('error','reset link expired');
        return res.redirect('/users/sign-in');
    }
    const user=await Users.findOne({email:result.email});
    user.password=req.body.password;
    await user.save();
    // await AccessTokenModel.findOneAndDelete({accessToken:req.query.accessToken});
    const accessTokenDoc=await AccessTokenModel.findOne({accessToken:req.query.accessToken});
    accessTokenDoc.changed=true;
    await accessTokenDoc.save();
    req.flash('success','password updated successfully');
    return res.redirect('/users/sign-in');
}