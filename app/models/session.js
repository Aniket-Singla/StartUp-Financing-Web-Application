module.exports = (sequelize, DataTypes) => {
  const Sessions = sequelize.define('Sessions', {

  sid: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  userId: DataTypes.STRING,
  expires: DataTypes.DATE,
  data: DataTypes.STRING

   
  });
 
  return Sessions;
}


