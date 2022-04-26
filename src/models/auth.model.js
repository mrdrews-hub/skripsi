const { DataTypes } = require('sequelize')
const sequelize = require('../helpers/db')

const Auth = sequelize.define('Auth', {
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('root', 'admin'),
    defaultValue: 'admin'
  }
})

module.exports = Auth
