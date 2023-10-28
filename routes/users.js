const express=require('express');
const router=express.Router();
const profileController=require('../contollers/profileController');
const postsController=require('../contollers/postsController');
const usersController=require('../contollers/usersController');
const passport = require('passport');
router.get('/',usersController.users);
router.get('/profile',passport.checkAuthentication,profileController.profile);
router.get('/posts',postsController.posts);
router.get('/sign-up',usersController.signUp);
router.get('/sign-in',usersController.signIn);
router.post('/create',usersController.create);
//user middle ware
router.get('/sign-out',usersController.destroySession);
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'sign-in'}
),usersController.createSession)
module.exports=router;