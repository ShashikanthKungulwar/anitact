const express = require('express');
const postsController=require('../contollers/postsController');
const passport = require('../config/passport_local_startegy');
const router = express.Router();



router.post('/create',passport.checkAuthentication,postsController.create);


module.exports=router;