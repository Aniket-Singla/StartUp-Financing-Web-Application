const bcrypt = require('bcrypt-nodejs');

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    userName: {
      type: DataTypes.STRING,
      primaryKey:true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    //stored in form of hash
    password: {
      type: DataTypes.TEXT
    },
   
  });
 /* Users.associate = models =>{
    Users.belongsTo(models.UserInfo,{
      
    })
   
  }
 */

  return Users;
}


