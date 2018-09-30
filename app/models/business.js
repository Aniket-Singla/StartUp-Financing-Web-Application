module.exports = (sequelize,DataTypes) => {
	const Business = sequelize.define('Business',{
		id: {
	      type: DataTypes.UUID,
	      defaultValue: DataTypes.UUIDV4,
	      primaryKey: true,
    	},
    	startup_name :{
    		type: DataTypes.STRING,
    		allowNull : false,

    	},
    	startup_stage :{
    		type : DataTypes.SMALLINT
    	},
		startup_website_url:{
			type : DataTypes.STRING,
			allowNull : true,
			validate : {
				isUrl : true,
			}
		},
		startup_founding_year:{
			type : DataTypes.INTEGER
		},
		startup_founding_month:{
			type : DataTypes.INTEGER
		},
		startup_founding_date:{
			type : DataTypes.INTEGER
		},
		startup_product_summary:{
			type : DataTypes.STRING
		},
		startup_team_summary:{
			type : DataTypes.STRING
		},
		difference:{
			type : DataTypes.STRING
		},
    
	});
	{
		Business.associate= function(models){
			Business.belongsTo(models.Users);
		}
	}



	return Business;
}