'use strict';
const bcrypt = require('bcrypt-nodejs');

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
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
   
  })
  {
    Users.associate = function(models){
      Users.hasOne(models.UserInfo,{
          foreignKey: 'UserId',
          onDelete: 'CASCADE',
          //allowNull : false
        });
    }
  };
 /*Users.beforeCreate((user, options) => new Promise((resolve, reject) => {
      const { password } = user;
      bcrypt.genSalt(10, (err, salt) => {
        if (err) reject(err);
        bcrypt.hash(password, salt, null, (error, hash) => {
          if (error) reject(err);
          user.password = hash;
          resolve(user);
        });
      });
    }));
  Users.beforeBulkUpdate((user, options) => new Promise((resolve, reject) => {
    const { password } = user.attributes;
    bcrypt.genSalt(10, (err, salt) => {
      if (err) reject(err);
      bcrypt.hash(password, salt, null, (error, hash) => {
        if (error) reject(err);
        user.attributes.password = hash;
        resolve(user);
      });
    });
  }));
  Users.prototype.comparePassword = function (candidatePassword, done) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
      done(err, isMatch);
    });
  };*/
  return Users;
}


