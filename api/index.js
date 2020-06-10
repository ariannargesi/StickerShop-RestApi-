const express = require('express')
const cors = require('cors')
const productSchema = require('../schema')
const app = express()

app.use(cors())

app.get('/api/product/:id', async (req, res) => {
    const id = Number(req.params.id)
    if(id){
        const product = await productSchema.findOne().skip(id)
        res.send(product)
    }
    else
        res.send({
            status: 400,
             developerError: "you should only put id as a number in request url"
        })
})

app.get('/api/products-list', async (req, res) => {
    const from = Number(req.query.from)
    const to = Number(req.query.to)
    if(from && to) {
        const products = await productSchema.find().skip(from).limit(to)
        res.send(products)
    }
    if(Object.keys(req.query).length === 0) {
        const products = await productSchema.find()
        res.send(products)
    }
})

module.exports = app
