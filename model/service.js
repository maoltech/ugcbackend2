const { Sequelize, DataTypes } = require('sequelize');
const ConnectDb = require('../config/db');

const service = ConnectDb.sequelize.define('Services', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    videoURL: {
      type: DataTypes.STRING,
      allowNull: false
    },
    clickCount:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    reviewCount:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    tags:{
      type: DataTypes.ARRAY,
      allowNull: false
    },
    star:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    artistName:{
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
