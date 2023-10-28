const express = require('express');
const postsController=require('../contollers/postsController');
const router = express.Router();



router.post('/create',postsController.create);


module.exports=router;