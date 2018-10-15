//require('dotenv').config();
const path = require('path');
const passportConfig = require(path.join(__dirname,'../config/passport'));
const { check, validationResult } = require('express-validator/check');
const Op = require("sequelize").Op;
const db = require(path.join(__dirname,'../models/index'));
const UserLogin = db.UserLogins;
const User = db.Users;

/**
 * GET /signup
 */

exports.signupGet = (req, res) => {
    res.render('signup',{port:process.env.PORT,title:"Create User",css: []});
}
exports.createUser = function(req,res,next){
 
  req.checkBody('username','username cannot be empty').notEmpty();
  req.checkBody('email','email is required and must be valid EMail').notEmpty().isEmail();
  req.checkBody('password','password cannot be empty').notEmpty();
  req.checkBody('fname','First name cannot be empty').notEmpty();
  req.checkBody('lname','Last name cannot be empty').notEmpty();
  req.checkBody('role','Please provide Your Role.').notEmpty();
  req.checkBody('contact','Please provide contact no.').notEmpty().isMobilePhone();
  var errors =   req.validationErrors();
  if(errors){
    return res.render('signup',{port:process.env.PORT,title:'Signup',errors:errors})
  }
  else{   
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    var fname = req.body.fname;
    var lname = req.body.lname;
    var role = req.body.role;
    var contact = req.body.contact;
    User.create({
        first_name: fname,
        last_name : lname,
        role : role,
        contact_no : contact, 
        UserLogin: {
          userName:username,
          email:email,
          password:password
        }
    }, {
        include: [UserLogin]
        })
    .then(user=>{
      console.log(user.UserLogin)
      
      req.login(user,err=>{
        if(err) return next(err);
        return res.redirect('/users/account')
      })
      console.log('user created');
    })
    .catch(err=>{
      if (err.name === 'SequelizeUniqueConstraintError') {
                return res.render('signup', {port:process.env.PORT,title:'Signup',
                    error: ['Username or email already taken.']
                })
            }
      console.log(err)
      res.send('something went wrong')
    })
 
  
  }


}



/**
 * GET /login
 */

exports.loginGet = (req, res) => {
    if(!req.user){
      res.render('login',{port:process.env.PORT,title:"Login"});
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
    return res.render('login',{port:process.env.PORT,errors : errors,title:"Login"})
  }else
  next();
  
  

}

/* 
* Update User
*/

exports.updateUserGet = (req,res,next)=>{

  res.render('Accounts/updateUser',{layout:req.user.role,port:process.env.PORT})

}

exports.updateUserPost = (req,res,next)=>{
  req.checkBody('fname','First name cannot be empty').notEmpty();
  req.checkBody('lname','Last name cannot be empty').notEmpty();
  req.checkBody('contact','Please provide contact no.').notEmpty().isMobilePhone();
  var errors =   req.validationErrors();
  if(errors){
    return res.render('Accounts/updateUser',{layout:req.user.role,port:process.env.PORT,errors:errors})
  }
  User.findById(req.user.id)
  .then(user=>{
    user.update({first_name: req.body.fname,
                last_name : req.body.lname,
                contact_no : req.body.contact})
    .then(()=>{res.send('credentials updated');})
  })
  .catch(err=>{
    res.send('something went wrong');
    console.log(err)
  })
}

/*
*
*/

exports.deleteAccountGet = (req,res,next)=>{
  res.render('Accounts/deleteAccount',{layout:req.user.role,port:process.env.PORT});
  //res.send('in delete')
}

exports.deleteAccountPost = (req,res,next)=>{
  User.findById(req.user.id)
  .then(user=>{
    user.destroy()
    .then(()=>{
      res.send('user deleted')
    })
    .catch(err=>{
      console.log(err)
    })
  })
  .catch(err=>{
    next(err)
  })
  //res.send('in delete')
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
