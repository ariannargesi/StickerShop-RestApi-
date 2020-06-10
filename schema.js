const mongoose = require('mongoose')
const productSchema = mongoose.Schema({
    title: String,
    category: String,
    price: String,
    types: [String],
    images: [String],
    size: [String]
})

const model = mongoose.model('Product', productSchema)

module.exports = model
