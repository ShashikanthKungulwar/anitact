const express = require('express');
const router = express.Router();
const user_api=require('../../../contollers/api/v1/users_api');
const passport = require('passport');

router.post('/create-session',user_api.createSession);

module.exports= router;
