const express = require('express');
const path = require('path');
const multer = require('multer');
const app = express();
const port = 3000;
const routes = require('./routes/index');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
app.use('/uploads',express.static(__dirname+'/uploads'));
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use(routes);
app.listen(3000,function(err){
    if(err){
        console.log('Error in running the Server!');
    }else{
        console.log(`Server is running at port ${port}`);
    }
})