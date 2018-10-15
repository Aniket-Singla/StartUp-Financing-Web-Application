
require('dotenv').config();
const path = require('path');
const Industry = require(path.join(__dirname,'../models/index')).Industry;
//const passportConfig = require(path.join(__dirname,'../config/passport'));
const { check, validationResult } = require('express-validator/check');
const Op = require("sequelize").Op;
const db = require(path.join(__dirname,'../models/index'));
//const UserLogin = db.UserLogins;
//const User = db.Users;
const Business = db.Business;

exports.addBusinessGet = (req,res)=>{
	Industry.all()
	.then(industries=>{
	res.render('Business/startupInfo',{port:process.env.PORT,layout:'entrepreneur',industries:industries});
	})
	.catch(err=>{
		res.send("Something Went Wrong");
		console.log(err);
	})
	
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
  	Industry.all()
	.then(industries=>{
	
	return res.render('Business/startupInfo',{port:process.env.PORT,layout:'entrepreneur',errors:errors,industries:industries})
	})
  }
  else{
  	Business.create({
  		startup_name : req.body.startup_name,
  		startup_stage : req.body.startup_stage,
		startup_website_url : req.body.startup_website_url,
		startup_founding_year : req.body.startup_founding_year,
		startup_founding_month : req.body.startup_founding_month,
		business_type: req.body.business_type,
		business_form : req.body.business_form,
		startup_founding_date : req.body.startup_founding_date,
		startup_product_summary : req.body.startup_product_summary,
		startup_team_summary : req.body.startup_team_summary,
		difference : req.body.difference,
		UserId : req.user.id,
		IndustryId : req.body.industry_id
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
		res.render('Business/ViewCards',{port:process.env.PORT,layout:req.user.role,cards:businesses});
	})
	.catch(err=>{
		res.send('something went wrong');
		console.log(err);
	})
	//res.render('ViewCards',{layout:entrepreneur,card:});
}

exports.updateBusinessGet = (req,res,next)=>{
	if(req.user.role==='entrepreneur'){
		Business.findAll({where : 
			{UserId : 
				{[Op.eq]:req.user.id}
		}})
		.then(businesses=>{
			
			if(businesses.length===0){
				res.send('Business not found please add one');

			}
			else{
				//console.log(businesses.length);
				//display all his / her cards to give option which one to edit
				res.render('Business/editBusinessCards',{port:process.env.PORT,layout:req.user.role,cards:businesses});
			}
		})
		.catch(err=>{
			console.log(err)
			next(err)
		})
	}
	else{
		res.send('Only entrepreneur may have business');
	}
}

exports.updateBusinessById = (req,res,next)=>{
	id = req.params.bid;
	
	Business.findById(id)
	.then(business=>{
		if(req.user.id===business.UserId){
			//console.log(business)
			Industry.all()
			.then(industries=>{
	
			res.render('Business/editById',{port:process.env.PORT,industries:industries,layout:req.user.role,card:business});
			})
		}
	})
	.catch(err=>{
		console.log(err);
		next(err);
	})
	
}

exports.updateBusinessPost = (req,res,next)=>{
	console.log(req.body)
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
	
	Industry.all()
	.then(industries=>{
	Business.findById(id)
	.then(business=>{
		if(errors){
    		return res.render('Business/editById',
    			{port:process.env.PORT,
    			errors:errors,industries:industries,
    			layout:req.user.role,card:business});
    	}
    	else{
    		business.update({
		  		startup_name : req.body.startup_name,
		  		startup_stage : req.body.startup_stage,
				startup_website_url : req.body.startup_website_url,
				startup_founding_year : req.body.startup_founding_year,
				startup_founding_month : req.body.startup_founding_month,
				business_type: req.body.business_type,
				business_form : req.body.business_form,
				startup_founding_date : req.body.startup_founding_date,
				startup_product_summary : req.body.startup_product_summary,
				startup_team_summary : req.body.startup_team_summary,
				difference : req.body.difference,
				UserId : req.user.id,
				IndustryId : req.body.industry_id
  				})
    			.then(()=>{res.send('updated successfully')});
    	}
	})
	.catch(err=>{next(err)})
	})
	.catch(err=>{
		next(err);
	})
  
}