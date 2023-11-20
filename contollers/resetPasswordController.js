const crypto=require('crypto');
const resetPasswordMailer=require('../mailers/reset-password-mailer');
module.exports.resetPasswordRequest=(req,res)=>{
    return res.render('../views/reset_password_request_page.ejs',{
        title:"password reset request"
    });
}

module.exports.resetPasswordSessionCreate=(req,res)=>{
    const {email}=req.body;
    resetPasswordMailer.sendResetPasswordLink({
        email,
        link:`http://localhost:8000/reset-password/reset-password-page/?accessToken=${crypto.randomBytes(20).toString('hex')}`
    })
    req.flash('success','check your mail for reset password link');
    res.redirect('/users/sign-in');
}