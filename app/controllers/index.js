require('dotenv').config();
exports.getHome = function(req, res) {
  if(req.user){
  	//serve logged in user home here
  	console.log('inside home ');
  	return res.redirect('/users/account');
  }
  res.render('home',{ port:process.env.PORT,title: 'Home', css: ['main.css'] });
};

exports.getAbout = (req,res)=>{
	if(req.user){
		return res.render('about',{ layout:req.user.role,port:process.env.PORT,title: 'About', css: ['main.css'] })
	}
	return res.render('about',{ port:process.env.PORT,title: 'About', css: ['main.css'] })
}

exports.get404 = (req,res)=>{
	if(req.user)
	{
		return res.render('404',{ port:process.env.PORT,title: '404', layout: req.user.role,css: ['main.css','404.css'] })
	}
	return res.render('404',{ port:process.env.PORT,title: '404',css: ['404.css'],title:'404' })
}

exports.get500 = (req,res)=>{
	if(req.user)
	{
		return res.render('500',{ port:process.env.PORT,title: '500', layout: req.user.role,css: ['main.css','500.css'] })
	}
	return res.render('500',{ port:process.env.PORT,title: '500',title:'500',css: ['500.css'] })
}
