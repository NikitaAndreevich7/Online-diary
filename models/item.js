const Sequelize = require('sequelize')
const sequelize = require('../utils/database');

const item = sequelize.define('Item', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: null,
    type: Sequelize.INTEGER
  },
  price:{
    type: Sequelize.INTEGER,
    allowNull:false
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  imageDef: {
    type: Sequelize.STRING,
    allowNull: false
  },
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = item;