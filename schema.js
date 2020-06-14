const mongoose = require('mongoose')
const productSchema = mongoose.Schema({
    title: String,
    description: String,
    category: String,
    price: String,
    types: [String],
    images: [String],
    size: [String]
})
const adminSchema = mongoose.Schema({
    username: String,
    password: String
})
const productModel = mongoose.model('Product', productSchema)
const adminModel = mongoose.model("Admin", adminSchema)

module.exports.productModel = productModel
module.exports.adminModel = adminModel
