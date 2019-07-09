const express =require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const path=require('path');
const app=express();
const auth=require('./auth');
mongoose.connect('mongodb://localhost:27017/stms');
app.use("/views", express.static(path.join(__dirname, 'views')));
auth(app);
app.set('/views',express.static(path.join(__dirname, '/views')));
app.set('view engine','pug');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


const buses=require('./routes/buses');
app.use('/',buses);

app.listen(4000,()=>{
    console.log('loging in port 4000');
})
module.exports=app;


