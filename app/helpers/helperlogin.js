const path = require('path');
const passportConfig = require(path.join(__dirname,'../config/passport'));
const { check, validationResult } = require('express-validator/check');
const Op = require("sequelize").Op;
const db = require(path.join(__dirname,'../models/index'));
const Users = db.Users;
const crypto = require('crypto');


function hash(input,salt){
  var result = crypto.pbkdf2Sync(input,salt,1000,512,'sha512')

  return [salt,1000,result.toString('hex')].join('$');

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
  //req.checkBody('fname','First name cannot be empty').notEmpty();
  //req.checkBody('lname','Last name cannot be empty').notEmpty();
  //req.checkBody('contact','Please provide contact no.').notEmpty();
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
      if (err.name === 'SequelizeUniqueConstraintError') {
                return res.render('signup', {port:process.env.PORT,title:'Signup',css:['main.css'],
                    error: ['Username or email already taken.']
                })
            }
      console.log(err);
      res.send('something went wrong');
    })
    

  }


}


exports.validPassword =function validPassword(user,password){
  var dbString = user.password;
          var salt = dbString.split('$')[0];
          var hashedPassword = hash(password, salt); // Creating a hash based on the password submitted and the original salt
          if (hashedPassword === dbString) {
            
            //req.session.auth = {userId : result.rows[0].id};
          
          return true;
          }
          else return false;
}
/**
 * GET /login
 */

exports.loginGet = (req, res) => {
    if(!req.user){
      res.render('login',{port:process.env.PORT,title:"Login",css: ['main.css']});
    }
    else{
      res.redirect('/');
    }
    
}
exports.loginPost = (req, res, next) => {
  req.checkBody('username','username cannot be empty').notEmpty();
  req.checkBody('password','password cannot be empty').notEmpty();
  //req.assert('username', 'username not valid').notEmpty();
  //req.assert('password', 'Password cannot be blank').notEmpty();
  //req.sanitize('email').normalizeEmail({ gmail_remove_dots: false });
  //req.sanitize('email').normalizeEmail({ gmail_remove_dots: false });

  var errors =   req.validationErrors();
  if (errors) {
    
    //req.flash('error', { msg: errors });
    return res.render('login',{port:process.env.PORT,errors : errors,title:"Login",css: ['main.css']})
  }else
  next();
  
  

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
