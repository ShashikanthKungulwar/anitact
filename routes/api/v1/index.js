const express = require('express');
const router = express.Router();
const post_api=require('../../../contollers/api/v1/posts_api');

router.use('/posts',require('./posts'));

module.exports= router;
