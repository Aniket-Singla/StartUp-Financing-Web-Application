const Sequelize = require("sequelize");
module.exports = {
    
  "development": {
    "username": process.env.DB_UNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_DEV_NAME,
    "host": process.env.DB_HOST,
    "dialect": process.env.DB_DIALECT,
    "operatorsAliases": Sequelize.Op
  },
  "production": {
    "username": process.env.DB_UNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_PROD_NAME,
    "host": process.env.DB_HOST,
    "dialect": process.env.DB_DIALECT,
    "operatorsAliases": Sequelize.Op
  },
  "test": {
    "username": process.env.DB_UNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_TEST_NAME,
    "host": process.env.DB_HOST,
    "dialect": process.env.DB_DIALECT,
    "operatorsAliases": Sequelize.Op
  }
}
