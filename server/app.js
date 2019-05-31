const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const passport = require('passport')
const bodyParser = require('body-parser')
const authRoutes = require('./routes/auth')
const analyticsRoutes = require('./routes/analytics')
const categoryRoutes = require('./routes/category')
const orderRoutes = require('./routes/order')
const positionRoutes = require('./routes/position')
const keys = require('./config/keys')
const app = express()

console.log(keys.mongoURL)
mongoose.connect(keys.mongoURL, { useNewUrlParser: true } )
  .then(() => console.log('MongoDB connected.'))
  .catch(error => console.log(error))

app.use(passport.initialize())
require('./middleware/passport')(passport)

app.use(require('morgan')('dev'))
app.use('/uploads', express.static('uploads'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(require('cors')())

app.use('/api/auth', authRoutes)
app.use('/api/analytics', analyticsRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/order', orderRoutes)
app.use('/api/position', positionRoutes)

// seed fake
const User = require('./models/User');
const Category = require('./models/Category');
const Position = require('./models/Position');
const Order = require('./models/Order');
const faker = require('faker');
const _ = require('lodash');

app.get('/api/seeds', async (res, req) => {

});

app.get('*', (req,res) => {
  res.send('ok')
})


module.exports = app
