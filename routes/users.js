const express=require('express');
const router=express.Router();
const profileController=require('../contollers/profileController');
const postsController=require('../contollers/postsController');
router.get('/profile',profileController.profile);
router.get('/posts',postsController.posts);

module.exports=router;