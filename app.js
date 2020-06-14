const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const multer = require('multer')
const path = require('path')
const productModel = require('./schema').productModel
const adminModel = require('./schema').adminModel
const checkAdminLoggedIn = require('./middleware/index')
const api = require('./api')
const login = require('./routes/login')

// mongodb connection
const mongoose = require('mongoose')
mongoose.connect("mongodb://localhost:27017/api",{useNewUrlParser: true, useUnifiedTopology: true},(er,result) => {
})



//initial app
const app = express()
app.set('views', 'views')
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended:true}))
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}))

app.use(api)
app.use(login)
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'files')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, Date.now() + path.extname(file.originalname))   }
})

let upload = multer({ storage: storage })

//admin route
app.get('/',checkAdminLoggedIn , async (req, res) => {
  const products = await productModel.find()
  res.render('index',{products})
})
//remove product
app.get('/remove',checkAdminLoggedIn,(req, res) => {
  const name = req.query.name
  productModel.findOneAndDelete({name}).then(reuslt => {
    res.redirect('/')
  })
})
//add product route
app.post('/add',checkAdminLoggedIn, upload.array('img', 2),(req, res) => {
  const newProduct = {
    title: req.body.title ,
    description: req.body.description,
    category: req.body.category,
    price: req.body.price,
    images: [
      req.files[0].path,
      req.files[1].path
    ],
    type: [
      req.body.type
    ],
    size: req.body.size
  }
  const add = new productModel(newProduct)
  add.save().then(result => {
    console.log('product added')
    res.redirect('/')
  }).catch(err => {
    console.log("error happend")
    console.log(err)
    res.redirect('/')
  })
})
app.listen(3000, () => {
  console.log('app is running on port 3000')
})


// const newAdmin = new adminModel({
//   username: "admin",
//   password: "09368069820"
// })
// newAdmin.save()