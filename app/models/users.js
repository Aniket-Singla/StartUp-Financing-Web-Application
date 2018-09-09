const bcrypt = require('bcrypt-nodejs');

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
        },
    userName: {
      type: DataTypes.STRING,
      allowNull:false,
      unique:true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    //stored in form of hash
    password: {
      type: DataTypes.TEXT,
      allowNull:false
    },
   
  });
 
  return Users;
}


