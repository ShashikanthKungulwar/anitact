const express=require('express');
const homerController=require('../contollers/homeController');
const router=express.Router();



router.get('/',homerController.home);
console.log("running")
module.exports=router;