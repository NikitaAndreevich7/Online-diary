const { Router } = require('express');
const Item = require('../models/item');
const router = Router();

//get all list 
router.get('/list', async (req, res) => {
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
router.post('/create', async (req, res) => {
  try {
    await Item.create({
      title: req.body.title,
      done: false
    })
    res.status(201).json({ valid: true, data: 'Seccess create new task.' })
  } catch (e) {
    res.status(500).json({
      valid: false,
      message: e.message
    })
  }
})

//edit task
router.post('/edit/:id', async (req, res) => {

  try {
    const item = await Item.findByPk(+req.params.id)
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
router.post('/remove/:id', async (req, res) => {
  console.log('REQ.PARAMS.ID : ',req.params.id)
  try {
    const item = await Item.findByPk(req.params.id)
    await item.destroy()
    res.status(204).json({ valid: true, data: 'Seccess removed task.' })

  } catch (e) {
    res.json({valid:false,message:e.message})
  }
})


module.exports = router;