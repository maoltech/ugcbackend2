const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db')
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

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
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  twitterId: {
    type: DataTypes.STRING,
    unique: true
  }
}, {
  sequelize,
  modelName: 'User'
});

User.prototype.checkPassword = async function (password) {
  const match = await bcrypt.compare(password, this.password);
  return match;
};

module.exports = { User };
