const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const path = require('path');
const db = require(path.join(__dirname,'../models/index'));
const UserLogins = db.UserLogins;

passport.serializeUser(function(userLogin, done) {
  console.log('in serializeUser')
  done(null, userLogin.id);
});


passport.deserializeUser(async function(id, done) {
    console.log('in deserializeUser')
    UserLogins.findById(id).then(function(userLogin){
                done(null, userLogin);
            }).catch(function(e){
                done(e, false);
            });
})

passport.use(new LocalStrategy(
  {
            usernameField: 'username',
            passwordField: 'password'
        },
  function(username, password, done) {
  
      UserLogins.findOne({
        where: { userName:  username }
      }).then((userLogin) => {
        if (!userLogin) {
          return done(null, false, { message: 'user not found' });
        }
        if (!userLogin.validPassword(password)) {
        console.log('wrond password')
        return done(null, false, { message: 'Incorrect password.' });
      	}
	      return done(null, userLogin);
	      })
	      .catch(err=>{
	        console.log(err);
	      })
      

  }
));
exports.authenticate = passport.authenticate('local',{
  successRedirect : '/',
  failureRedirect : '/users/login',
  failureFlash : true
})
exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    req.flash('error_msg','You are not logged in');
    res.redirect('/users/login');
};


/**
 * Authorization Required middleware.
 */
exports.isAuthorized = (req, res, next) => {
  const provider = req.path.split('/').slice(-1)[0];
  const token = req.user.tokens.find(token => token.kind === provider);
  if (token) {
    next();
  } else {
    res.redirect(`/auth/${provider}`);
  }
};

exports.alreadyLogged = function (req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated()){
       req.flash('error_msg','You are already logged in');
       return res.redirect('/');
    }
        return next();

  
}
