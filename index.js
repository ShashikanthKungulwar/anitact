const express=require('express');
const cookieParser=require('cookie-parser');
const port =8000;
const expressLayouts=require('express-ejs-layouts');
const db=require('./config/mongoose');
const passport=require('passport');
const passportLocal=require('./config/passport_local_startegy');
const session=require('express-session');


const MongoStore=require('connect-mongo');


const app=express();




app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static("./assets"));
app.use(expressLayouts);
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);





app.set('view engine','ejs');
app.set('views','./views');


app.use(session({
    name:"anitact",
    //chenge secret after
    secret:"somethingChecking",
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:1000*60*100
    },
    store:MongoStore.create({
        mongoUrl:'mongodb://127.0.0.1:27017/anitact_development',
        autoRemove:'disabled'
    })
}))


app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use('/',require('./routes/index'));


app.listen(port,(err)=>{
    if(err)
    {
        console.log(err,' is occured');
        return;
    }
    console.log('successfuly server launched at port: ',port)
})