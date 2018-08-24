// Pull in required dependencies
const express = require('express');
const bodyParser = require('body-parser');
//var methodOverride = require('method-override');
const exphbs = require('express-handlebars');
//var log = require("loglevel");
const path = require("path");
const indexRouter = require(path.join(__dirname,'app','routes','index'))

// Configure logging
console.log('process.env.NODE_ENV (in server.js) = ' + process.env.NODE_ENV);
/* if (process.env.NODE_ENV) { // Production
	console.log("Setting log level to ERROR");
	log.setLevel("ERROR");
} else { // Development
	var level = process.env.LOG_LEVEL || "DEBUG";
	console.log("Setting log level to " + level);
	log.setLevel(level);
} */
// Set up Express Application
var app = express();
var port = process.env.PORT || 8080;

//database
const Pool = require('pg').Pool;
var crypto = require('crypto');
var session = require('express-session');
app.use(session(
    {
        secret : 'this is top secret',
        cookie : {maxAge : 1000 * 60 * 60* 24 * 30},
        saveUninitialized: true
    }));
var config={
     user: 'postgres',
  host: 'localhost',
  database: 'test_startup',
  password: 'AniketSingla',
  port: 5432,
};
var pool = new Pool(config);
function hash(input,salt){
  var result = crypto.pbkdf2Sync(input,salt,1000,512,'sha512')

  return [salt,1000,result.toString('hex')].join('$');

}
app.get('/dbtest',(req,resp)=>{
  pool.query('SELECT * FROM user',(err,result)=>{
    if(err){
      resp.send(err.toString());
    }
    else{
      resp.send(JSON.stringify(result));
    }
  });
})
app.post('/createuser',(req,res)=>{
	var salt = crypto.randomBytes(128).toString('hex');
	var username = req.body.username;
	var role = req.body.role;
	var password = req.body.password;
	var dbString = hash(password,salt);
	pool.query('INSERT INTO "user" (username,role,password) VALUES ($1,$2,$3)',[username,role,dbString],(err,result)=>{
	    if(err){
	            res.send(err.toString());
	        }
	        else{
	          res.status(200).send('User created Successfully with username ' + username);
	    }
	});
});
app.post('/login', function (req, res) {
   var username = req.body.username;
   var password = req.body.password;
   
   pool.query('SELECT * FROM "user" WHERE username = $1', [username], function (err, result) {
      if (err) {
          res.status(500).send(err.toString());
      } else {
          if (result.rows.length === 0) {
              res.status(403).send('username/password is invalid');
          } else {
              // Match the password
              var dbString = result.rows[0].password;
              var salt = dbString.split('$')[0];
              var hashedPassword = hash(password, salt); // Creating a hash based on the password submitted and the original salt
              if (hashedPassword === dbString) {
                
                req.session.auth = {userId : result.rows[0].id};
              
                res.send('credentials correct!');
                
              } else {
                res.status(403).send('username/password is invalid');
              }
          }
      }
   });
});

// Requiring our models for syncing
//var db = require(path.join(__dirname, '/models'));

// Serve static content for the app from the 'public' directory
app.use(express.static(process.cwd() + '/public'));

// Override with POST having ?_method=PUT
//app.use(methodOverride('_method'));

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(express.static(path.join(__dirname,'app/views')))
// Set Handlebars as the view engine
app.set('views',path.join(__dirname,'/app/views'))
app.engine('handlebars', exphbs({ 
	defaultLayout: path.join(__dirname ,'app','/views/layouts/base.handlebars'),
	partialsDir: path.join(__dirname,'app','/views/partials'),
  	layoutsDir: path.join(__dirname ,'app','/views/layouts') }));
app.set('view engine', 'handlebars');

// get requests
app.get('/',(req,res)=>{
	res.render('home',{title:"Aniket"});
});
app.get('/login',(req,res)=>{
	res.sendFile(path.join(__dirname,'public','login.html'));
});
app.get('/signup',(req,res)=>{
	res.sendFile(path.join(__dirname,'public','signup.html'));
});
app.get('/investors',(req,res)=>{
	res.render('investor',{layout:'investor_home'});
});
app.get('/entrepreneurs',(req,res)=>{
	res.render('entrepreneurs',{layout:'entrepreneur'});
});
// Import routes and give the server access to them
//require('./controllers/burgers_controller.js')(app);

// Syncing our sequelize models and then starting our express app
// Include the {force: true} parameter if you need to update the models
/* db.sequelize.sync().then(function() {
  app.listen(port, function() {
    console.log("My-Burger-Sequel is listening on PORT " + port);
  });
});
 */
 module.exports = app;