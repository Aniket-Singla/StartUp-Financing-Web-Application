// Pull in required dependencies
const express = require('express');
const bodyParser = require('body-parser');
//var methodOverride = require('method-override');
const exphbs = require('express-handlebars');
const logger = require('morgan');
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
app.use(express.static(path.join(__dirname,'app/views')))
// Set Handlebars as the view engine
app.set('views',path.join(__dirname,'/app/views'))
app.engine('handlebars', exphbs({ 
	defaultLayout: path.join(__dirname ,'app','/views/layouts/base.handlebars'),
	partialsDir: path.join(__dirname,'app','/views/partials'),
  	layoutsDir: path.join(__dirname ,'app','/views/layouts') }));
app.set('view engine', 'handlebars');

//routing 
app.use('/',indexRouter);
//app.use('/api',)
// get requests


// Import routes and give the server access to them
//require('./controllers/burgers_controller.js')(app);

// Syncing our sequelize models and then starting our express app in bin/ www


 module.exports = app;