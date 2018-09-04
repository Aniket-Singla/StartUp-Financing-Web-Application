
module.exports = (sequelize, DataTypes) => {
  const Roles = sequelize.define('Roles', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true
    },
    roleName : {
      type: DataTypes.STRING,
      unique : true,
      allowNull : false
    }
    
   
  });

  return Roles;
};

