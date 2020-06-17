const express = require('express')
const cors = require('cors')
const productSchema = require('../schema').productModel
const app = express()

app.use(cors())

app.get('/api/product/:id', async (req, res) => {
    const id = Number(req.params.id)
    if(id){
        const product = await productSchema.findOne().skip(id)
        if(product) {
          res.send({
            status: 200,
            product
          })
        }
        else {
          res.send ({
            status: 404,
            message: "product not found"
          })
        }
    }
    else
        res.send({
            status: 400,
             message: "you should only put id as a number in request url"
        })
})

app.get('/api/products-list', async (req, res) => {
    const from = Number(req.query.from)
    const to = Number(req.query.to)
    if(from && to) {
        const products = await productSchema.find().skip(from).limit(to)
        if(products){
          res.send({
            status: 200,
            products
          })
        }
        else {
          res.send({
            status: 404,
            message: "rate is not valid"
          })
        }

    }
  else if (Object.keys(req.query).length === 0) {
        const products = await productSchema.find()
        res.send(products)
    }
})

app.get('/api/:category', async(req, res) => {
  const category = req.params.category 
  let page = (req.query.page || 1) -1 
  const limit = 16 
  let pagesNumber = await (await productSchema.find({category})).length / 16
  pagesNumber = Math.ceil(pagesNumber)
  productSchema.find({category}).skip(page * limit).limit(limit).then(result =>{
    if(result) {
      res.send({
        status: "200",
        products: result,
        pagesNumber    
      })
    }
    else {
      res.send({
        status: "400",
        message: "bad request"
      })
    }
  })
  .catch(err => {
    res.send("page value must be non-negative")
  })
})
module.exports = app
