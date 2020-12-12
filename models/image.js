const Sequelize = require('sequelize')
const sequelize = require('../utils/database');

const image = sequelize.define('Image', {
  user_id:{
    type: Sequelize.INTEGER
  },
  item_id:{
    type:Sequelize.INTEGER
  },
  type:{
    type: Sequelize.STRING
  },
  name:{
    type: Sequelize.STRING
  },
  data:{
    type: Sequelize.BLOB("long")
  }
})

module.exports = image;