const express = require('express');
const router = express.Router();
const post_api=require('../../../contollers/api/v1/posts_api');
const passport=require('../../../config/passport_jwt_strategy');

router.get('/',post_api.index);
router.delete('/:id',passport.authenticate('jwt',{session:false}),post_api.destroy);
module.exports= router;
