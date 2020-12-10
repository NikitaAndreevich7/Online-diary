const Sequelize = require('sequelize')
const config = require('config')

const DB_NAME = config.get('DB_NAME')
const USER_NAME = config.get('USER_NAME')
const PASSWORD = config.get('PASSWORD')

const sequelize = new Sequelize(DB_NAME, USER_NAME, PASSWORD,{
  host: 'localhost',
  dialect: 'mysql'
})

module.exports = sequelize;