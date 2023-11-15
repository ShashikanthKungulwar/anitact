const nodemailer=require('nodemailer');
const ejs=require('ejs');
const path=require('path');

const transporter= nodemailer.createTransport({
    host:"smtp.gmail.com",//google it if you cant understand
    port:587,
    service:'gmail',
    secure:false,
    auth:{
        user:'shashikanthk80@gmail.com',
        pass:"gvls qwyf jdal twww"

    }
})


const renderTemplate=(data,relativePath)=>{
    let mailHtml;
    ejs.renderFile(path.join(__dirname,'/../views/mailers',relativePath),
    data,
    function(err,template)
    {
        if(err)
        {
            console.log(err,'in mailer config');
            return;
        }
        mailHtml=template;
    }
    )
    return mailHtml;
}


module.exports={
    transporter,
    renderTemplate
}