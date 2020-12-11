const { Router, query } = require('express');
const User = require('../models/user')
const bcrypt = require('bcrypt')
const authenticateToken = require('../middleware/auth')
const router = Router();

router.get('/me', authenticateToken, (req, res) => {
  const { user_id, phone, email } = req.user
  const user = {
    id: user_id,
    phone,
    email
  }
  res.status(200).json({ valid: true, data: user })
})

router.put('/me', authenticateToken, async (req, res) => {
  const { name, email, phone, current_password, new_password } = req.body;

  const responseData = { id: req.user.user_id, phone, name, email }

  try {
    let user = await User.findByPk(+req.user.user_id)
    if (!user) return res.json({ valid: false, message: 'User not found' })

    const areSame = await bcrypt.compare(current_password, user.password)
    if (!areSame) return res.json({ valid: false, message: 'Wrong password' })

    const hashPassword = await bcrypt.hash(new_password, 10)
    user.update({ name, email, phone, password: hashPassword })
    await user.save()
    res.json({ valid: true, data: responseData })
  } catch (e) {
    res.json({ valid: false, message: e.message })
  }
})

router.get('/:id',authenticateToken,async(req,res) =>{

  try{
    const user = await User.findByPk(+req.params.id)
    if(!user) return res.json({valid:false,message:'User not found.'})
      const resData = {id:user.id,phone:user.phone,name:user.name,email:user.email}
    res.json({valid:true,data:resData})
  }catch(e){
    res.json({valid:false,message: e.message})
  }
})

router.get('/',authenticateToken,async(req,res) =>{
  const {name,email} = req.query
  if(!(name && email)) return res.json({valid:false,message:'Params not found'})

  const user = await User.findOne({where:{email:email}});
  if(!user) return res.json({valid:false,message:'User not found'})


  res.status(200).json({valid:true,data:{name,email,phone:user.phone}})
})


module.exports = router