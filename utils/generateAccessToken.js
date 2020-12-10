const jwt = require("jsonwebtoken")


module.exports = function(email){
  return jwt.sign({username:email},process.env.TOKEN_SECRET)
}