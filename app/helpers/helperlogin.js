var path = require('path');
const Pool = require('pg').Pool;
var crypto = require('crypto');
// var bodyparser = require('body-parser');
var session = require('express-session');
var app = express();
// app.use(bodyparser.json());
app.use(session(
    {
        secret : 'this is top secret',
        cookie : {maxAge : 1000 * 60 * 60* 24 * 30},
        saveUninitialized: true
    }));
var counter = 0;

var config={
     user: 'postgres',
  host: 'localhost',
  database: 'test_startup',
  password: 'AniketSingla',
  port: 5432,
};

var pool = new Pool(config);

function createTemplate(data){
    var title= data.title;
    var heading= data.heading;
    var date= data.date;
    var content= data.content;

    var htmlTemplate=`
    <html>
        <head>
            <title>
                ${title}
            </title>
            <meta name= "viewport" content="width=device-width, initial-scale=1">
            <link href="ui/style.css" rel="stylesheet">
        </head>
        <body>
            <div class="container">
                <div>
            <a href="/">Go to Home</a>
            </div>
            <hr/>
            <div>
                <h1>
                    ${heading}
                </h1>
                <br/>Date Edited: 14-02-2018<br/>

            </div>
            <div>
                ${content}
            </div>
            </div>
        </body>
    </html>
    `;
    return htmlTemplate;
}
function hash(input,salt){
  var result = crypto.pbkdf2Sync(input,salt,1000,512,'sha512')

  return [salt,1000,result.toString('hex')].join('$');

}
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

  var names= [];
app.get('/submtname',(req,res)=>{
  var name = req.query.name;

  names.push(name);
  res.send(JSON.stringify(names));
});
app.get('/counter',(req,res)=>{
  counter++;
  res.send(counter.toString());
});
app.get('/dbtest',(req,resp)=>{
  pool.query('SELECT * FROM users',(err,result)=>{
    if(err){
      resp.send(err.toString());
    }
    else{
      resp.send(JSON.stringify(result));
    }
  });
})
app.get('/app/:articlename',(req,res)=>{

    pool.query("SELECT * FROM articles WHERE title = '"+req.params.articlename+"'",(err,result)=>{//not using '' will generate errors
        if(err){
            res.send(err.toString());
        }
        else{
          if(result.rows===0){
        res.send('result not found');
      }else{
        res.send(createTemplate(result.rows[0]));
      }
    }
  });

});
app.get('/password/:val',(req,res)=>{
  var pass = req.params.val;
  var passhash = hash(pass,'this is random string');
  res.send(passhash);
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
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});
app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
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
