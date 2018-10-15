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
	return res.render('about',{ port:process.env.PORT,title: 'Home', css: ['main.css'] })
}