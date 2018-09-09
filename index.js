// Pull in required dependencies
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const expressValidator = require('express-validator');
const flash = require('connect-flash');
//var methodOverride = require('method-override');
const exphbs = require('express-handlebars');
const logger = require('morgan');
const path = require("path");

const indexRouter = require(path.join(__dirname,'app','routes','index'));
const usersRouter = require(path.join(__dirname,'app','routes','users'))


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


app.use(express.static(process.cwd() + '/public'));
// Morgarn logger
app.use(logger('dev'));
// Override with POST having ?_method=PUT
//app.use(methodOverride('_method'));

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(express.static(path.join(__dirname,'app/views')));
//Warning The default server-side session storage, MemoryStore, is 
//purposely not designed for a production environment. 
//It will leak memory under most conditions, does not scale past a single process, 
//and is meant for debugging and developing.
app.use(session({
  secret: 'random string',
  resave: false,
  saveUninitialized: false,
  //cookie: { secure: true }
}));
// init passport
app.use(passport.initialize());
app.use(passport.session());

// Express Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// Connect Flash
app.use(flash());

// Global Vars
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});
// Set Handlebars as the view engine
app.set('views',path.join(__dirname,'/app/views'))
app.engine('handlebars', exphbs({ 
	defaultLayout: path.join(__dirname ,'app','/views/layouts/base.handlebars'),
	partialsDir: path.join(__dirname,'app','/views/partials'),
  	layoutsDir: path.join(__dirname ,'app','/views/layouts') }));
app.set('view engine', 'handlebars');

//routing 
app.use('/',indexRouter);
app.use('/users',usersRouter);
//app.use('/api',)
// get requests


// Import routes and give the server access to them
//require('./controllers/burgers_controller.js')(app);

// Syncing our sequelize models and then starting our express app in bin/ www


 module.exports = app;