const express=require('express');
const port =8000;


const app=express();
app.use('/',require('./routes/index'));



app.listen(port,(err)=>{
    if(err)
    {
        console.log(err,' is occured');
        return;
    }
    console.log('successfuly server launched at port: ',port)
})