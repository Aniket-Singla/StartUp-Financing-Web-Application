require ('dotenv').load();
var express = require('express');
// var morgan = require('morgan');
var path = require('path');
const Pool = require('pg').Pool;
var crypto = require('crypto');
var bodyparser = require('body-parser');
var session = require('express-session');
var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
//var logger = require('morgan');



var app = express();

// view engine setup
//app.use(morgan('combined'));
app.use(bodyparser.json());


var config={
  user: 'postgres',
host: 'localhost',
database: 'postgres',
password: 'AniketSingla',
port: 5432,
};

app.use(cookieParser());
app.use(express.static(path.join(__dirname,'public')));
var pool = new Pool(config);

// function createTemplate(data){
//     var title= data.title;
//     var heading= data.heading;
//     var date= data.date;
//     var content= data.content;

//     var htmlTemplate=``;
//     return htmlTemplate;
// }
function hash(input,salt){
  var result = crypto.pbkdf2Sync(input,salt,1000,512,'sha512')

  return [salt,1000,result.toString('hex')].join('$');

}
app.get('/static',express.static('public'));
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'logged out','index.html'));
});

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
  app.get('/userlogin',(req,res)=>{
    res.sendFile(path.join(__dirname, 'public', 'logged out','Project','login.html'));
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
  
  app.get('/checklogin',(req,res)=>{
      if(req.session && req.session.auth && req.session.auth.userId){
          res.send('user logged in already as '+ req.session.auth.userId);
      }
      else{
          res.send('user not logged in');
      }
  });

app.get('/logout',(req,res)=>{
    
    delete req.session.auth;
    res.send('user logged out successfully');
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'public','logged out','index.html'));
});
app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'public','logged out', 'main.js'));
});
app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

//git check
// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = process.env.PORT||80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});

// catch 404 and forward to error handler
