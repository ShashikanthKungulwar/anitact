const emailsQueue=require('../config/kue');


const commentsMailer=require('../mailers/comments_mailer');

emailsQueue.process('emails',function(job,done){
    console.log('email workers is processing a job ',job.data);
    
    commentsMailer.newComment(job.data);
    done();
})