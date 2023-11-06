const express = require('express');
const homerController = require('../contollers/homeController');
const router = express.Router();



router.get('/', homerController.home);
router.use('/users', require('./users'));
router.use('/posts',require('./posts'));
router.use('/api',require('./api'));
router.use('/comments',require('./comments'));
console.log("running")
module.exports = router;