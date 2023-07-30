const express = require('express')
const app = express()
require('dotenv').config()
const port = process.env.SERVER_PORT
// const category = require ('./category')
const mongoose = require("mongoose")

// mongoose.connect('mongodb+srv://webdevelopment2191:LUqVQuu0SnRoHk9e@cluster0.0ha5iwu.mongodb.net/?retryWrites=true&w=majority')

// .then(()=> console.log ("MongoDB Connected"))
// .catch(err => console.log ("Mongo Error",err))


app.use(express.json())

app.use('/api', require('./api/users/Routers'))
app.use('/api', require('./api/products/Router'))
app.use('/api', require('./api/category/Router'))
app.use('/api', require('./api/brands/Router'))


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

