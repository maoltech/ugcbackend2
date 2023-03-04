// const { Sequelize, DataTypes } = require('sequelize');
// const ConnectDb = require('../config/db');

// const service = ConnectDb.sequelize.define('Services', {
//     id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true
//     },
//     username: {
//       type: DataTypes.STRING,
//       allowNull: false
//     },
//     title: {
//       type: DataTypes.STRING,
//       allowNull: false
//     },
//     description: {
//       type: DataTypes.TEXT,
//       allowNull: false
//     },
//     mainVideoURL: {
//       type: DataTypes.STRING,
//       allowNull: false
//     },
//     clickCount:{
//       type: DataTypes.INTEGER,
//       allowNull: false
//     },
//     reviewCount:{
//       type: DataTypes.INTEGER,
//       allowNull: false
//     },
//     tags:{
//       type: DataTypes.JSON,
//       allowNull: false
//     },
//     packages:{
//       type: DataTypes.JSON,
//       packageTitle:{
//         type: DataTypes.STRING
//       },
//       packageDescription:{
//         type: DataTypes.STRING
//       },
//       serviceOffered:{
//         type: DataTypes.JSON
//       },
//       deliveryDetails:{
//         type: DataTypes.STRING
//       },
//       providingScript:{
//         type: DataTypes.BOOLEAN
//       },
//       numberOfVideos:{
//         type: DataTypes.INTEGER
//       },
//       numberOfPhotos:{
//         type: DataTypes.INTEGER
//       },
//       timeOfVideos:{
//         type: DataTypes.STRING
//       },
//       packagePrice:{
//         type: DataTypes.INTEGER
//       }
//     },
//     star:{
//       type: DataTypes.INTEGER,
//       allowNull: false
//     },
//     artistName:{
//       type: DataTypes.STRING,
//       allowNull: false
//     },
//     serviceDescription:{
//       type: DataTypes.TEXT
//     },
//     FAQ:{
//       type: DataTypes.JSON,
//        question:{
//         type: DataTypes.STRING
//        },
//        answer:{
//         type: DataTypes.TEXT
//        }
//     },
//     images:{
//       type: DataTypes.JSON,
//       imageURL:
//       {
//         type: DataTypes.STRING
//       }
//     },
//     videos:{
//       type: DataTypes.JSON,
//       videoURL:
//       {
//         type: DataTypes.STRING
//       }
//     }


//     // userId: {
//     //   type: DataTypes.INTEGER,
//     //   references: {
//     //     model: 'User',
//     //     key: 'userId'
//     //   }
//     // }
// });

// module.exports = { service };
