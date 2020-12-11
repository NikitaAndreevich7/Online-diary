const { Router } = require('express');
const Item = require('../models/item');
const User = require('../models/user')
const router = Router();
const authenticateToken = require('../middleware/auth')


//search items
router.get('/', authenticateToken, async (req, res) => {
  const { title, user_id } = req.query
  if (!(title && user_id)) return res.json({ valid: false, message: 'Params not found' })

  try {
    const item = await Item.findOne({ where: { title, user_id } })
    if (!item) return res.json({ valid: false, message: 'Item not found' })

    const user = await User.findByPk(+item.user_id)
    if (!user) return res.json({ valid: false, message: 'User not found' })

   const { id, phone, name, email } = user
      const resData =  {
        id: item.id,
        title: item.title,
        price: item.price,
        image: item.image,
        createdAt: item.createdAt,
        user: { id, phone, name, email }
      }
    
    res.json({ valid: true, data: resData })

  } catch (e) {
    res.json({ valid: false, message: e.message })
  }

})

//get item by id
router.get('/:id', authenticateToken, async (req, res) => {

  try {
    const item = await Item.findByPk(+req.params.id)
    if(!item) return res.json({ valid: false, message: 'Item not found' })

    const user = await User.findByPk(+item.user_id)
    if(!usre)return res.json({ valid: false, message: 'User not found' })

    const { id, phone, name, email } = user
    const resData =  {
      id: item.id,
      title: item.title,
      price: item.price,
      image: item.image,
      createdAt: item.createdAt,
      user: { id, phone, name, email }
    }

    res.json({ valid: true, data: resData })

  } catch (e) {
    res.json({ valid: false, message: e.message })
  }
})

//get all list 
router.get('/list', authenticateToken, async (req, res) => {
  console.log(req.user)
  try {
    const Items = await Item.findAll()
    res.status(200).json({ valid: true, data: Items })
  } catch (e) {
    res.status(500).json({
      valid: true,
      message: e.message
    })
  }
})

//add new task
router.post('/create', authenticateToken, async (req, res) => {

  const userData = {
    id: req.user.user_id,
    name: req.user.name,
    phone: req.user.phone,
    email: req.user.email
  }

  try {
    const item = await Item.create({
      title: req.body.title,
      price: req.body.price,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoaHYQVRbdf1mqxLAO4c0uaEXtvNqkTeZMug&usqp=CAU',
      user_id: req.user.user_id,
    })
    res.status(201).json({ valid: true, data: { ...item.dataValues, user: userData } })
  } catch (e) {
    res.status(500).json({
      valid: false,
      message: e.message
    })
  }
})

//edit task
router.put('/:id', authenticateToken, async (req, res) => {

  try {
    const item = await Item.findByPk(req.params.id)
    Item.done = req.body.done
    await item.save();
    res.status(200).json({ valid: true, data: 'Seccess edit task' })

  } catch (e) {
    res.status(500).json({
      valid: false,
      message: e.message
    })
  }
})

//remove task 
router.delete('/:id', authenticateToken, async (req, res) => {
  console.log('REQ.PARAMS.ID : ', req.params.id)
  try {
    const item = await Item.findByPk(req.params.id)
    await item.destroy()
    res.status(204).json({ valid: true, data: 'Seccess removed task.' })

  } catch (e) {
    res.json({ valid: false, message: e.message })
  }
})



module.exports = router;