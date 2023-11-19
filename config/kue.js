const kue=require('kue');


const emailsQueue=kue.createQueue();

module.exports=emailsQueue;