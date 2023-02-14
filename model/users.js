const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db')
const { v4: uuidv4 } = require('uuid');

class User extends Model {}
User.init({
  userId: {
    type: DataTypes.STRING,
    defaultValue: uuidv4,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'User'
});


module.exports = { User };
