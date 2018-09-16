const path = require('path');
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
const { check, validationResult } = require('express-validator/check')
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const db = require(path.join(__dirname,'../models/index'));
const Users = db.Users;
function hash(input,salt){
  var result = crypto.pbkdf2Sync(input,salt,1000,512,'sha512')

  return [salt,1000,result.toString('hex')].join('$');

}
// var sessionChecker = (req, res, next) => {
//     if (req.session.user && req.cookies.user_sid) {
//         res.redirect('/dashboard');
//     } else {
//         next();
//     }    
// };


/**
 * GET /login
 */

exports.loginGet = (req, res) => {
    res.render('login',{port:process.env.PORT,title:"Login",css: ['main.css']});
}
/**
 * GET /signup
 */

exports.signupGet = (req, res) => {
    res.render('signup',{port:process.env.PORT,title:"Create User",css: ['main.css']});
}
exports.createUser = function(req,res,next){
  var username = req.body.username;
  var email = req.body.email;
  var password = req.body.password;
  req.checkBody('username','username cannot be empty').notEmpty();
  req.checkBody('email','email is required and must be valid EMail').notEmpty().isEmail();
  req.checkBody('password','password cannot be empty').notEmpty();
  var errors =   req.validationErrors();
  if(errors){
    res.render('signup',{port:process.env.PORT,title:'Signup',errors:errors,css:['main.css']})
  }
  else{
    var salt = crypto.randomBytes(128).toString('hex');
    var dbString = hash(password,salt);
    Users
    .build({userName:username,email:email,password:dbString})
    .save()
    .then(user=>{
      req.login(user, err => {
                if (err) return next(err)
                return res.redirect('/')
            })
    })
    .catch(err=>{
      if (err.parent.code === 'ER_DUP_ENTRY') {
                res.render('/signup', {
                    error: ['Username or email already taken.']
                })
            }
      console.log(err)
      res.send('something went wrong')
    })
  }
  

/*
*/
};

// exports.loginUser = function(req,res,next){
//    //var username = req.body.username;
//    var password = req.body.password;
//    Users.findOne({
//     where:{
//       userName: req.body.username
//     }
//    })
//    .then((user) => {
//       if (!user) {
      
//         //req.flash('error', 'Wrong email or password');
//         //req.flash('emailL', sanitizedEmail);
//         return res.redirect('/login');
        
//       } else // Match the password
//           var dbString = user.password;
//           var salt = dbString.split('$')[0];
//           var hashedPassword = hash(password, salt); // Creating a hash based on the password submitted and the original salt
//           if (hashedPassword === dbString) {
            
//             //req.session.auth = {userId : result.rows[0].id};
          
//             res.send('credentials correct!');
            
//           } else {
//             res.status(403).send('username/password is invalid');
//           }
//     }).catch(() => {
//       res.status(500).json({
//         message: 'There was an error!',
//       });
//     });
//   }

function validPassword(user,password){
  var dbString = user.password;
          var salt = dbString.split('$')[0];
          var hashedPassword = hash(password, salt); // Creating a hash based on the password submitted and the original salt
          if (hashedPassword === dbString) {
            
            //req.session.auth = {userId : result.rows[0].id};
          
          return true;
          }
          else return false;
}
//passport strategy
passport.use(new LocalStrategy(
  {
            usernameField: 'username',
            passwordField: 'password'
        },
  function(username, password, done) {
    Users.findOne({where:{ userName: username }})
      .then((user)=>{

      if (!user) {
        console.log('user not found')
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!validPassword(user,password)) {
        console.log('wrond password')
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
      })
      .catch(err=>{
        console.log(err);
      })
  }
));
passport.serializeUser(function(user, done) {
  console.log('in serializeUser')
  done(null, user.id);
});

passport.deserializeUser(async function(id, done) {
    console.log('in deserializeUser')
    Users.findById(id).then(function(user){
                done(null, user);
            }).catch(function(e){
                done(e, false);
            });
})
exports.authenticate = passport.authenticate('local',{
  successRedirect : '/',
  failureRedirect : '/users/login',
  failureFlash : true
})
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/')
    })
}

exports.logoutUser = function (req, res) {
  req.logout();

  req.flash('success_msg', 'You are logged out');

  res.redirect('/users/login');
}

exports.ensureAuthenticated = function ensureAuthenticated(req, res, next){
  if(req.isAuthenticated()){
    return next();
  } else {
    //req.flash('error_msg','You are not logged in');
    res.redirect('/users/login');
  }
}