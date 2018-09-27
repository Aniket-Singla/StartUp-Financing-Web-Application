'use strict';
const bcrypt = require('bcrypt-nodejs');

module.exports = (sequelize, DataTypes) => {
  const UserLogins = sequelize.define('UserLogins', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
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
   
  },{
    hooks: {
      beforeCreate: (user) => {
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(user.password, salt);
      }
    },
      
})
  
  UserLogins.prototype.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
  };
  
  return UserLogins;
}



//BelongsTo : foreign key  exists on the source model.

//HasOne : foreign key exists on the target model.

