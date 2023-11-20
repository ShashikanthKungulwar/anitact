const express=require('express');
const router=express.Router();
const likesController=require('../contollers/likesController');


router.post('/toggle',likesController.toggleLike);


module.exports=router;