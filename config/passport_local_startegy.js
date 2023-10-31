
const Users = require('../models/user');
const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({
    usernameField: 'email'},
    async function(email, password, done) {
        //find the user and establish the functionality
        Users.findOne({ email }).then((user)=>{
            // console.log(user);
            if(!user || user.password!=password)
            {
                console.log("password didnt matched");
                // req.flash('success','successfylly logged out');
                return done(null,false);
            }
            return done(null,user);
        }).catch((err) => {
            console.log('error occured while fetching user --->passpotr');
            return done(err);
        })
    }
));

//serializing the user id
passport.serializeUser((user,done)=>{
    return done(null,user.id);
})



//deserializing the user id

passport.deserializeUser((user_id,done)=>{
    Users.findById(user_id).exec().then(user=>{
        if(!user)
        {
            console.log('user not found with the id');
            return done(null,false);
        }
        return done(null,user);
    }).catch(err=>{
        console.log('error occured while finding by id in deserializer');
        return done(err);
    })
})
//checking authentication by creating a middle ware
passport.checkAuthentication=(req,res,next)=>{
    if(req.isAuthenticated())
    {   
        return next();
    }
    return res.redirect('/users/sign-in');
}
passport.setAuthenticatedUser=(req,res,next)=>{
    if(req.isAuthenticated())
    {
        res.locals.user=req.user;
    }
    next();
}

module.exports=passport;