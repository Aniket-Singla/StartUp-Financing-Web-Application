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
   
  },{
    hooks: {
      beforeCreate: (user) => {
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(user.password, salt);
      }
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
  Users.prototype.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
  };
 /*
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
  
  };*/
  return Users;
}


