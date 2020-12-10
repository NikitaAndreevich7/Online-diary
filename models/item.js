const Sequelize = require('sequelize')
const sequelize = require('../utils/database');

const item = sequelize.define('Item',{
  id:{
    primaryKey: true,
    autoIncrement:true,
    allowNull:null,
    type:Sequelize.INTEGER
  },
  done:{
    type:Sequelize.BOOLEAN,
    allowNull:false
  },
  title:{
    type:Sequelize.STRING,
    allowNull:false
  }
})

module.exports = item;