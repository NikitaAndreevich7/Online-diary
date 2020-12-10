const express = require('express')
const path = require('path')
const bodyParser = require('body-parser');
const dotenv = require('dotenv')
const config = require('config')

const sequelize = require('./utils/database')
const itemRouter = require('./routes/item')
const authRouter = require('./routes/auth')


dotenv.config()
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(bodyParser.json());

app.use('/api/auth/',authRouter)
app.use('/api/item/',itemRouter)


app.use((req, res, next) => {
  res.sendFile('/index.html')
})



const PORT = process.env.PORT || config.get('PORT')

async function start() {
  try {
    await sequelize.sync()
    app.listen(PORT, () => console.log(`Seccess starting server on port ${PORT}`))
  } catch (e) {
    console.log(e)
  }
}

start()