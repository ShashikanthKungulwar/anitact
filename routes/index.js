const express = require('express');
const homerController = require('../contollers/homeController');
const router = express.Router();



router.get('/', homerController.home);
router.use('/users', require('./users'));
router.use('/posts',require('./posts'));
console.log("running")
module.exports = router;