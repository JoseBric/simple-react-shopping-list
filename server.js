require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const path = require('path')

const items = require('./routes/api/items')

const app = express()
const port = process.env.PORT || 5000;

app.use(bodyParser.json())
app.use('/api/items', items)

if(process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))

  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')))
}

const db = process.env.MONGO_URI

mongoose.connect(db, { useNewUrlParser: true })
  .then(() => console.log('MongoDB connected...'))
  .catch((err) => console.log(err))

app.listen(port, () => console.log(`Server started on port ${port}`))

function closeApp(){process.exit(0)}

process.on('uncaughtException', closeApp)
process.on('SIGTERM', closeApp)
