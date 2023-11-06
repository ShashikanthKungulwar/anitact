const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;

const ExtractJWT = require('passport-jwt').ExtractJwt;

const Users = require('../models/user');
const opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'anitact'
}

passport.use(new JWTStrategy(opts,
    async function (jwt_payload, done) {
        try {
            const user=await Users.findById(jwt_payload._id).exec;
            if(user)
            {
                return done(null,user);
            }
            else
            {
                return done(null,false)
            }
        }
        catch(error)
        {
            // return res.json(500,{
            //     message:"unable to find user once try to logout and login"
            // })
            // console.log(error);
            return done(error);
        }
    }))


module.exports=passport;