const express=require('express');
const commentsController=require("../contollers/commentsController");
const passport = require('passport');
const router=express.Router();

router.post('/create',passport.checkAuthentication,commentsController.create);
router.get('/destroy/:id',passport.checkAuthentication,commentsController.destroy);

module.exports=router;