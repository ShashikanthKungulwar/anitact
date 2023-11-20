const express=require('express');
const router=express.Router();
const resetPasswordController=require('../contollers/resetPasswordController');

router.get('/reset-password-link',resetPasswordController.resetPasswordRequest);
router.post('/reset-password-link',resetPasswordController.resetPasswordSessionCreate);
router.get('/reset-password-page',resetPasswordController.resetPasswordPage)
router.post('/reset-password-page',resetPasswordController.changePassword);

module.exports=router;