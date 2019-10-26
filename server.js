require('dotenv').config()
const path = require('path')

const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const express = require('express')
const items = require('./routes/api/items')

const app = express()

const port = process.env.PORT || 5000;
const db = process.env.MONGO_URI

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  next()
})

app.use(bodyParser.json())
app.use('/api/items', items)

mongoose.connect(db, { useNewUrlParser: true })
  .then(() => console.log('MongoDB connected...'))
  .catch((err) => console.log(err))

if(process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))

  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')))
}

app.listen(port, () => console.log(`Server started on port ${port}`))

function closeApp(){process.exit(0)}
process.on('uncaughtException', closeApp)
process.on('SIGTERM', closeApp)
