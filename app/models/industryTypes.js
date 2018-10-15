
module.exports = (sequelize,DataTypes) => {
	const Industry = sequelize.define('Industry',{
		id: {
	      type: DataTypes.INTEGER,
	      primaryKey: true,
	      autoIncrement : true
    	},
    	industryName : {
    		type : DataTypes.STRING,
    		allowNull : false,
    		unique : true
    	}
    
	},
	{
		timestamps : false
	});
	{
		Industry.associate= function(models){
			//Industry.hasOne(models.Business);
		}
	}



	return Industry;
}