const nodemailer=require('../config/nodemailer');

//we can use this syntax to export directy
exports.newComment=async (comment)=>{
    // console.log(comment)
    // console.log('inside newComment mailer')
    // console.log(comment, "this is from comments mailer");
    let htmlString=nodemailer.renderTemplate(comment,'/comments/new_comment.ejs');
    try{
        const info=await nodemailer.transporter.sendMail({
            // from:'shashikanthk80@gmail.com',
            to:comment.user.email,
            subject:"trying to test nodemailer for anitact",
            text:"hwllo boy",
            //if html is not there then text will be sent
            html:htmlString
            }
        )
    }
    catch(error){
        console.log('error in comments_mailer ',error);
    }
}

