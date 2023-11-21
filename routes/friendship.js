const express=require('express');

const router=express.Router();
const friendshipController=require('../contollers/friendshipController');
router.post('/toggle/:id',friendshipController.addRemoveFriend);

module.exports=router;