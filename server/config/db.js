const Sequelize = require('sequelize');
const dotenv = require('dotenv')

dotenv.config()

const ConnectDb = {
  sequelize: new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USERNAME, 
    process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  })
};

module.exports = ConnectDb;
