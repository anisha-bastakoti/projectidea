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



//bodyparser for login
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());

app.post('/login',(res,req)=>{

    var email= req.body.email;
    var password =req.body.password;
    if (email && password) {
		// Execute SQL query that'll select the account from the database based on the specified username and password
		connection.query('SELECT * FROM login WHERE user_email = ? AND user_password = ?', [email, password], function(error, results, fields) {
			// If there is an issue with the query, output the error
			if (error) throw error;
			// If the account exists
			if (results.length > 0) {
				// Authenticate the user
				request.session.loggedin = true;
				request.session.username = username;
				// Redirect to home page
				response.redirect('/homepage');
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
    
    });




//bodyparser for register(for miidleware)


//for session 
app.use(session({
secret: 'secret',
resave:true,
saveUninitialized:true,
}))

const db=require('./routes/dbconnect');

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

