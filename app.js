const express = require('express')
const bodyParser = require('body-parser')
const expressSession = require('express-session')
const productModel = require('./schema')
const api = require('./api')

// mongodb connection
const mongoose = require('mongoose')
mongoose.connect("mongodb://localhost:27017/api",{useNewUrlParser: true, useUnifiedTopology: true},(er,result) => {
})
//initial app
const app = express()
app.set('views', 'views')
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended:true}))
app.use(api)

//admin route
app.get('/', async (req, res) => {
  const products = await productModel.find()
  res.render('index',{products})
})
//remove product
app.get('/remove',(req, res) => {
  const name = req.query.name
  productModel.findOneAndDelete({name}).then(reuslt => {
    res.redirecte('/')
  })
})
//add product route
app.post('/add', (req, res) => {
  const newProduct = { name, description, category, price, type, img1, img2, size } = req.body
  const newProduct = {
    title: req.body.name ,
    description: req.body.description,
    category: req.body.category,
    price: req.body.price,
    images: [
      req.body.img1,
      req.body.img2
    ],
    type: [
      req.body.type
    ],
    size: req.body.size 

  }
  const add = new productModel(newProduct)
  add.save(( err,result ) => {
    console.log('product added')
    res.redirect('/')
  })
})
app.listen(3000, () => {
  console.log('app is running on port 3000')
})
