const express =require('express');
const morgan =require('morgan');
const app =express();
const path =require('path');
const nodemon =require('nodemon');
const exp = require('constants');



app.use(express.static('public'))//sabi kura publuc bata line ho 
app.use('/', express.static(__dirname + "/public/" + '/images'));
app.set('view engine','ejs');
//ejs set garna ko lagi 

//path join gareko 
app.use('/js',express.static(path.join(__dirname+"node_modules/bootstrap/dis/js")));
app.use('/scs',express.static(path.join(__dirname +"/node_modules/bootstrap/dist/scs")));

//morgan use gareko 
app.use(morgan('tiny'));//mid-ware
app.get('/',function(req,res){
            res.render('homepage') 
        })
//for routes
const homeRoute= require('./routes/homepage');
app.use('/homepage',homeRoute);

const loginRoute= require('./routes/login');
app.use('/login',loginRoute);



//bodyparser


//express layout

//to run port 
const PORT= process.env.PORT||3000
app.listen(PORT, function(){
    console.log("the  server start at "+PORT);
})
