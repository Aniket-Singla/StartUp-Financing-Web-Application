/*startup_name
startup_stage
startup_website_url
startup_founding_year
startup_founding_month
startup_founding_date
startup_product_summary
startup_team_summary
difference */
const path = require('path');
//const passportConfig = require(path.join(__dirname,'../config/passport'));
const { check, validationResult } = require('express-validator/check');
const Op = require("sequelize").Op;
const db = require(path.join(__dirname,'../models/index'));
//const UserLogin = db.UserLogins;
//const User = db.Users;
const Business = db.Business;

exports.addBusinessGet = (req,res)=>{
	res.render('startupInfo',{layout:'entrepreneur'});
}

exports.addBusinessPost = (req,res,next)=>{
	req.checkBody('startup_name','StartUp Name cannot be empty').notEmpty();
	req.checkBody('startup_stage','Stage cannot be empty').notEmpty();
	req.checkBody('startup_website_url','Please Provide url').notEmpty();
	req.checkBody('startup_founding_month','startup_founding_month').notEmpty();
	req.checkBody('startup_founding_date','startup_founding_date').notEmpty();
	req.checkBody('startup_founding_year','startup_founding_year').notEmpty();
	req.checkBody('startup_product_summary','startup_product_summary').notEmpty();
	req.checkBody('startup_team_summary','startup_team_summary').notEmpty();
	req.checkBody('difference','Please Provide difference bw u and others').notEmpty();
	var errors =   req.validationErrors();
  if(errors){
    return res.render('startupInfo',{layout:'entrepreneur',errors:errors})
  }
  else{
  	Business.create({
  		startup_name : req.body.startup_name,
  		startup_stage : req.body.startup_stage,
		startup_website_url : req.body.startup_website_url,
		startup_founding_year : req.body.startup_founding_year,
		startup_founding_month : req.body.startup_founding_month,
		startup_founding_date : req.body.startup_founding_date,
		startup_product_summary : req.body.startup_product_summary,
		startup_team_summary : req.body.startup_team_summary,
		difference : req.body.difference
  	})
  	.then(business=>{
  		res.send('added')
  	})
  	.catch(err=>{
  		console.log(err);
  		res.send(err);
  	})
  }
}
exports.viewBusinessGet = (req,res,next)=>{
	Business.all()
	.then(businesses=>{
		res.render('ViewCards',{layout:'entrepreneur',cards:businesses});
	})
	.catch(err=>{
		res.send('something went wrong');
		console.log(err);
	})
	//res.render('ViewCards',{layout:entrepreneur,card:});
}
