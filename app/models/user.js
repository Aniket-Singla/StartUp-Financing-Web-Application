module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    first_name:{
      type : DataTypes.STRING,
      allowNull : false
    },

    last_name : {
      type : DataTypes.STRING,
      allowNull : false
    },
    role : {
      type : DataTypes.STRING,
      allowNull : false
    },
    contact_no:{
      type : DataTypes.BIGINT,
      allowNull : false
    }



   
  });
  {
    Users.associate = function(models){
      Users.hasOne(models.UserLogins,{
          foreignKey: 'UserId',
          onDelete : 'CASCADE',
          //allowNull : false
          
        });
      //Users.hasOne(models.Business);
    }
  }
  
  return Users;
};
