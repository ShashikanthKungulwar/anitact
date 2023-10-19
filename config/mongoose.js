const mogoose = require("mongoose");
mogoose.connect('mongodb://127.0.0.1:27017/anitact_development').then((res) => {

    console.log('sucessfuly connected to db');
}).catch((err) => {
    console.log('error while connecting to db', err);
});