const { Router } = require('express');
const fs = require('fs')
const Item = require('../models/item');
const User = require('../models/user')
const Image = require('../models/image')
const router = Router();
const authenticateToken = require('../middleware/auth');
const image = require('../models/image');
const e = require('express');


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
    const resData = {
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
    if (!item) return res.json({ valid: false, message: 'Item not found' })

    const user = await User.findByPk(+item.user_id)
    if (!user) return res.json({ valid: false, message: 'User not found' })

    const { id, phone, name, email } = user
    const resData = {
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
      imageDef: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoaHYQVRbdf1mqxLAO4c0uaEXtvNqkTeZMug&usqp=CAU',
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

//upload image
router.post('/:id/image', authenticateToken, async (req, res) => {
  try {

    if (req.file == undefined) return res.json({ valid: false, message: "Fine undefined" })
    const item = await Item.findByPk(+req.params.id)
    if (!item) return res.json({ valid: false, message: 'Item not found' })



    image.create({
      user_id: req.user.user_id,
      item_id: req.params.id,
      type: req.file.minetype,
      name: req.file.originalname,
      data: fs.readFileSync(
        __basedir + "/public/assets/uploads/" + req.file.filename
      )
    }).then((image) => {
      fs.writeFileSync(
        __basedir + "/public/assets/tmp/" + image.name,
        image.data
      )

      res.json({
        valid: true, data: {
          id: item.id,
          title: item.title,
          price: item.price,
          imageDef: item.image,
          user_id: req.user.user_id,
          user: {
            id: req.user.user_id,
            phone: req.user.phone,
            name: req.user.name,
            email: req.user.email
          }
        }
      })
    })
  } catch (e) {
    res.json({ valid: false, message: e.message })
  }
})

//remove image
router.delete('/:id/image', async(req,res) =>{
  try{
    const image = await Image.findOne({where:{item_id:req.params.id}})
    await image.destroy()
    res.status(204).json({valid:true,message:'Seccess remove image'})
  }catch(e){
    res.json({valid:false,message:e.message})
  }
})





module.exports = router;