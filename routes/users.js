const express=require('express');
const router=express.Router();
const profileController=require('../contollers/profileController');
const postsController=require('../contollers/postsController');
const usersController=require('../contollers/usersController');
router.get('/',usersController.users);
router.get('/profile',profileController.profile);
router.get('/posts',postsController.posts);

module.exports=router;