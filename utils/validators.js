const { body } = require('express-validator')
const bcrypt = require('bcryptjs')
const User = require('../models/user')


exports.registerValidators = [
  body('email')
    .isEmail().withMessage('Enter the correct email address.')
    .custom(async (value, { req }) => {
      try {
        const user = await User.findOne({ email: value })
        if (user) return Promise.reject('This email address is already busy.')
      } catch (e) {console.log(e) }
      
    }).normalizeEmail(),

  body('password', 'The password must be at least 6 characters long.')
    .isLength({ min: 6, max: 56 })
    .isAlphanumeric()
    .trim(),
  body('confirm')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords must match.')
      }
      return true
    })
    .trim(),
  body('name')
    .isLength({ min: 3 })
    .withMessage('The name must be at least 3 characters long.')
]

exports.loginValidators = [
  body('email')
    .custom(async (value, { req }) => {
      try {
        const user = await User.findOne({ email: value })
        if (!user) return Promise.reject('Invalid email address.')
      } catch (e) {
        console.log(e)
      }
    }),
  body('password')
    .custom(async (value, { req }) => {
      const user = await User.findOne({ email: req.body.email })
      const areSame = await bcrypt.compare(value, user.password)
      if (!areSame) {
        throw new Error('Wrong password.')
      }
      return true
    }).trim()
] 