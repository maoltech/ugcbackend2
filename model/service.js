const { Sequelize, DataTypes } = require('sequelize');
const ConnectDb = require('../config/db');

const service = ConnectDb.sequelize.define('Services', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false
    }
    // userId: {
    //   type: DataTypes.INTEGER,
    //   references: {
    //     model: 'User',
    //     key: 'userId'
    //   }
    // }
});

module.exports = { service };
