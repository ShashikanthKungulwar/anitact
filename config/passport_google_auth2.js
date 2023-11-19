const passport = require('passport');

const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const Users = require('../models/user');
const googleAuthMailer=require('../mailers/google_auth_mailer');

//new strategy for google oauth

passport.use(new googleStrategy({
    clientID: "488787121518-00cgavohgg2633qcl9pnctqddhfm633o.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:8000/users/auth/google/callback"
},
    async function (accessToken, refreshToken, profile, done) {
        try {
            //find a user
            const user = await Users.findOne({ email: profile.emails[0].value });
            if(user)
            {
                return done(null,user);
            }
            else{
                //if user doesnt exist create user and return user
                const user=await Users.create({
                    email:profile.emails[0].value,
                    name:profile.displayName,
                    password:crypto.randomBytes(20).toString('hex')//random password for user
                });
                googleAuthMailer.newGoogleAuthUser(user);
                return done(null,user);
            }
        }
        catch(error)
        {
            console.log("error has occured ",error);
            return done(error);
        }
    }
))


module.exports=passport;