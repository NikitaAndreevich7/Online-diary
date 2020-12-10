const { Router } = require('express');
const User = require('../models/user')
const bcrypt = require('bcrypt')
const generateAccessToken = require('../utils/generateAccessToken')
const router = Router()

router.post('/login', async(req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({where:{email:email}})
    const areSame = await bcrypt.compare(password, user.password)

    if (!areSame) {
      return res.json({ valid: false, message: "Incorrect login or password" })
    }

    const accessToken = generateAccessToken(email)
    res.json({valid:true,token:accessToken})

  } catch (e) {
    res.json({ valid: false, message: e.message })
  }
})

router.post('/register', async (req, res) => {
  const { name, email, password,confirm } = req.body

  if(password !== confirm){
    return res.json({valid:false,message: "Incorrect login or password"})
  }
  const hashPassword = await bcrypt.hash(password, 10)

  try {
    const user = new User({
      name, email, password: hashPassword
    })
    await user.save()
    res.json({ valid: true })
  } catch (e) {
    res.json({ valid: false,message: e.message })
  }
})


module.exports = router