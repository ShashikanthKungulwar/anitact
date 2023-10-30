const express=require('express');
const commentsController=require("../contollers/commentsController");
const passport = require('passport');
const router=express.Router();

router.post('/create',passport.checkAuthentication,commentsController.create);


module.exports=router;