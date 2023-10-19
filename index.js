const express=require('express');
const port =8000;
const expressLayouts=require('express-ejs-layouts');

const app=express();
app.use(expressLayouts);
app.use('/',require('./routes/index'));
app.set('view engine','ejs');
app.set('views','./views');


app.listen(port,(err)=>{
    if(err)
    {
        console.log(err,' is occured');
        return;
    }
    console.log('successfuly server launched at port: ',port)
})