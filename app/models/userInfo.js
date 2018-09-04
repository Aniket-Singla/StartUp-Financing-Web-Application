module.exports = (sequelize, DataTypes) => {
  const UserInfo = sequelize.define('UserInfo', {
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
    contact_no:{
      type : DataTypes.INTEGER
    }



   
  });

  return UserInfo;
};
