const Sequelize = require('sequelize')
const sequelize = require('../utils/database');

const user = sequelize.define('User',{
  id:{
    primaryKey: true,
    autoIncrement:true,
    allowNull:null,
    type:Sequelize.INTEGER
  },
  phone:{
    type: Sequelize.STRING,
    allowNull:false
  },
  name:{
    type:Sequelize.STRING,
    allowNull:false
  },
  email:{
    type:Sequelize.STRING,
    allowNull:false
  },
  password:{
    type:Sequelize.STRING,
    allowNull:false
  }
})

module.exports = user;