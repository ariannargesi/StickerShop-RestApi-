const express = require('express')
const bodyParser = require('body-parser')
const expressSession = require('express-session')


// mongoose schema
const mongoose = require('mongoose')
mongoose.connect("mongodb://localhost:27017/api",{useNewUrlParser: true, useUnifiedTopology: true},(er,result) => {
  console.log(result)
})
const product = mongoose.model("product", {
  name: String, category: String, price: String, type: String, img1: String, img2: String, size: String
})

const app = express()

app.set('views', 'views')
app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({extended:true}))

app.get('/', (req, res) => {
  res.render('index')
})
app.post('/add', (req, res) => {
  const newProduct = { name, category, price, type, img1, img2, size } = req.body
  const add = new product(newProduct)
  add.save(( err,result ) => {
    console.log('product added')
    console.log(result)
  })


})
app.listen(3000, () => {
  console.log('app is running on port 3000')
})
