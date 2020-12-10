const Sequelize = require('sequelize')
const sequelize = require('../utils/database');

const user = sequelize.define('User',{
  id:{
    primaryKey: true,
    autoIncrement:true,
    allowNull:null,
    type:Sequelize.INTEGER
  },
  name:{
    type:Sequelize.STRING,
    allowNull:false
  },
  email:{
    type:Sequelize.STRING
  },
  password:{
    type:Sequelize.STRING,
    allowNull:false
  }
})

module.exports = user;