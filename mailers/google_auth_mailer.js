const nodemailer=require('../config/nodemailer');

//we can use this syntax to export directy
exports.newGoogleAuthUser=async (user)=>{
   
    console.log("user details",user);
    let htmlString=nodemailer.renderTemplate(user,'/users/new_google_auth.ejs');
    console.log(htmlString);
    try{
        const info=await nodemailer.transporter.sendMail({
            // from:'shashikanthk80@gmail.com',
            to:user.email,
            subject:"new user login using this mail id",
            text:"user login using your mail",
            //if html is not there then text will be sent
            html:htmlString
            }
        )
    }
    catch(error){
        console.log('error in user mailer ',error);
    }
}

