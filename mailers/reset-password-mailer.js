const nodemailer=require('../config/nodemailer');


exports.sendResetPasswordLink=async(data)=>{
    let htmlString=nodemailer.renderTemplate({link:data.link},"/reset-password/reset-password-mail.ejs")
    try{
        const info=await nodemailer.transporter.sendMail({
            to:data.email,
            subject:"reset your password ",
            html:htmlString
        });
    }
    catch{

    }
}