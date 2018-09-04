var path = require('path');
const db = require(path.join(__dirname,'../models/index'));
const bodyParser = require('body-parser');
var crypto = require('crypto');
const Users = db.Users;
// var bodyparser = require('body-parser');
//var session = require('express-session');
//var app = express();
// app.use(bodyparser.json());
/*app.use(session(
    {
        secret : 'this is top secret',
        cookie : {maxAge : 1000 * 60 * 60* 24 * 30},
        saveUninitialized: true
    }));
*/
function hash(input,salt){
  var result = crypto.pbkdf2Sync(input,salt,1000,512,'sha512')

  return [salt,1000,result.toString('hex')].join('$');

}


/*app.get('/dbtest',(req,resp)=>{
  pool.query('SELECT * FROM users',(err,result)=>{
    if(err){
      resp.send(err.toString());
    }
    else{
      resp.send(JSON.stringify(result));
    }
  });
})
*/
/*app.get('/app/:articlename',(req,res)=>{

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
*/
/*app.get('/password/:val',(req,res)=>{
  var pass = req.params.val;
  var passhash = hash(pass,'this is random string');
  res.send(passhash);
});
*/
exports.createUser = function(req,res,next){
var salt = crypto.randomBytes(128).toString('hex');
var username = req.body.username;
var dbString = hash(req.body.password,salt);
Users.create({userName:username,
email:req.body.email,
password:dbString}).then(user=>{
  res.send("User Created")
  console.log(user.get({
  plain: true
}))
})
.catch(function (err) {
console.log(err)
res.send('Error in validation')
});
};

exports.loginUser = function(req,res,next){
   //var username = req.body.username;
   var password = req.body.password;
   Users.findOne({
    where:{
      userName: req.body.username
    }
   })
   .then((user) => {
      if (!user) {
        res.status(404).json({
          message: 'Authentication failed!',
        });
      } else // Match the password
          var dbString = user.password;
          var salt = dbString.split('$')[0];
          var hashedPassword = hash(password, salt); // Creating a hash based on the password submitted and the original salt
          if (hashedPassword === dbString) {
            
            //req.session.auth = {userId : result.rows[0].id};
          
            res.send('credentials correct!');
            
          } else {
            res.status(403).send('username/password is invalid');
          }
    }).catch(() => {
      res.status(500).json({
        message: 'There was an error!',
      });
    });
  }

   


/*app.get('/checklogin',(req,res)=>{
    if(req.session && req.session.auth && req.session.auth.userId){
        res.send('user logged in already as '+ req.session.auth.userId);
    }
    else{
        res.send('user not logged in');
    }
});
*/
/*app.get('/logout',(req,res)=>{
    
    delete req.session.auth;
    res.send('user logged out successfully');
});
*/