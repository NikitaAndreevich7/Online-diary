const { Router } = require('express');
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const {validationResult} = require('express-validator')
const {registerValidators,loginValidators} = require('../utils/validators')
const generateAccessToken = require('../utils/generateAccessToken')
const router = Router()

router.post('/login',loginValidators, async (req, res) => {
  const { email } = req.body

  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({valid:false,message: errors.array()[0].msg})
  }

  try {
    const user = await User.findOne({ where: { email: email } })

    const accessToken = generateAccessToken({
      user_id: user.id,
      email: user.email,
      phone: user.phone,
      name: user.name
    })
    res.json({ valid: true, token: accessToken })

  } catch (e) {
    res.json({ valid: false, message: e.message })
  }
})

router.post('/register',registerValidators, async (req, res) => {
  const { name, email, phone, password } = req.body

  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({valid:false,message:errors.array()[0].msg})
  }

  const hashPassword = await bcrypt.hash(password, 10)

  try {
    const user = new User({
      name, email, phone, password: hashPassword
    })
    await user.save()
    res.json({ valid: true })
  } catch (e) {
    res.json({ valid: false, message: e.message })
  }
})


module.exports = router