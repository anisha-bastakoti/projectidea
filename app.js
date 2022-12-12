const express =require('express');
const morgan =require('morgan');
const app =express();
const path =require('path');
const nodemon =require('nodemon');
const exp = require('constants');
const bodyparser=require('body-parser');
const session =require('express-session');


//const session=require('express-session');
//const{v4:uuidv4}=require('uuid');




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

const RegRoute= require('./routes/Register');
app.use('/Register',RegRoute);

const admroute= require('./routes/admin');//rotues ko name halne 
app.use('/admin',admroute);




//bodyparser for login
app.get('/', function(req, res){
    res.render("login")
});
app.use(bodyparser.urlencoded({extended:true}));
app.use((bodyparser.json()));

app.post('/login',(req,res)=>{
var email=req.body.email;
var password = req.body.password;
var sql="INSERT INTO login(user_email,user_password) VALUES('"+email+"','"+password+"')";
		db.query(sql,(error,result)=>{
			if (error) throw error;
		res.send('login record sucessfully'+result.insertId);
		});


});


//bodyparser for admin(for miidleware)
app.get('/',(req,res)=>{
	req.render('admin')
});
app.post('/admin',(req,res)=>{
	var email=req.body.email;
	var password=req.body.password;
	
		var sql="INSERT INTO admin(admin_email,admin_password) VALUES('"+email+"','"+password+"')";
		db.query(sql,(error,result)=>{
			if (error) throw error;
		res.send('admin record sucessfully'+result.insertId);
		});

});

//bodyparser for register
app.get('/',(req,res)=>{
	res.render('register');
})
app.post('/register',(req,res)=>{
	var name= req.body.name;
	var email= req.body.email;
	var password= req.body.password;
	var repassword= req.body.repassword;
	var sql="INSERT INTO register(name,email,password,re_password) VALUES('"+name+"','"+ email+"','"+password+"','"+repassword+"')";
	db.query(sql,(error,result)=>{
		if (error) throw error;
		res.send("sucesfully register"+result.insertId);
	})
});

//for session 
app.use(session({
secret: 'secret',
resave:true,
saveUninitialized:true,
}))

const db=require('./routes/dbconnect');
const bodyParser = require('body-parser');

//mysql connction

db.connect((error) => {

    if (error) {
      console.log('error in connecting database');
  
    }
    else {
     console.log('database connected succesfully')
    }
})


      
      
       
//to run port 
const PORT= process.env.PORT||3000
app.listen(PORT, function(){
    console.log("the  server start at "+PORT);
});

