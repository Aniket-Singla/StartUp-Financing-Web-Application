  const path = require('path');
  const Industry = require(path.join(__dirname,'../models/index')).Industry;
  
  //to add multiple rows at a time in Industry category
var strings = ["Beauty","Boats","Commercial","Communications","Consumer","Design","Education","Energy","Entertainment","Fashion","Finance","Fitness","Food","Food",
"Rental","Residential","Restaurants","Retail","Services","Software","Specialty","Sports","Stores","Stores(restaurants, coffee shops, bars)","Technology","Web","Wellness","Cars","Health & Beauty",
"Other"]
console.log(strings);
for(i in strings){
  Industry.create({
    industryName : strings[i]
  })

}

  /*  const user = {
    userName: req.body.username,
    email: req.body.email,
    password: req.body.password
  };


  Users.find({
    where: { email: {[Op.eq] : email }}
  }).then((existingUser) => {
    if (existingUser) {
      console.log('---> user exists...');
      req.flash('error', { msg: 'Account with that email address already exists.' });
      return res.redirect('/users/createUser');
    }

    Users.create(user)
      .then((user) => {
        console.log('---> saving new User:', JSON.stringify(user, undefined, 2));
        req.login(user, (err) => {
          if (err) {
            return next(err);
          }
          console.log('---> logging in...');
          req.session.save(() => res.redirect('/'));
        });
      });
  }, (err) => {
    res.status(400).send(err);
  });*/




  // console.log('found user...');
        // console.log(user.dataValues);
        /*user.comparePassword(password, (err, isMatch) => {
        // TODO: left off here
        // user.validate(password, (err, isMatch) => {
          // console.log('comparing password...');
          if (err) { return done(err); }
          if (isMatch) {
            console.log('--> PASSWORD MATCHED');
            return done(null, user);
          }
          return done(null, false, { message: 'Invalid email or password.' });
        });*/


        // var sessionChecker = (req, res, next) => {
//     if (req.session.user && req.cookies.user_sid) {
//         res.redirect('/dashboard');
//     } else {
//         next();
//     }    
// };

