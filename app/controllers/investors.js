const path = require('path');
const db = require(path.join(__dirname,'../models/index'));
const User = db.Users;
const Op = require('Sequelize').Op;
/*
* view all investors
*/
exports.getInvestors = (req,res,next)=>{

  User.findAll({where:
    {role:
      { [Op.eq] : 'investor'}
    }})
  .then(investors=>{
    //console.log(investors)
    res.render('Accounts/viewInvestors',{layout:req.user.role,title:'Investors',port:process.env.PORT,investors:investors})
  })
  .catch(err=>{
    console.log(err)
    next(err)
  })
}