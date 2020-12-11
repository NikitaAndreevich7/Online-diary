const jwt = require('jsonwebtoken')
module.exports = function(req,res,next){
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if(token == null) return res.status(401).json({valid:false,message:'Token invalid.'})

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if(err) return res.sendStatus(403)
    req.user = user
    next()
  })
}