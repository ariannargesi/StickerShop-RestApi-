const express = require('express')

const adminModel = require('../schema').adminModel
const app = express()

app.get('/login', async (req, res) => {
    res.render('login')
})
app.post('/login', async (req, res) => {
    const inputUsername = req.body.username
    const inputPassword = req.body.password

    const admin = await adminModel.findOne()
    if(admin.username == inputUsername && admin.password == inputPassword){
        req.session.loggedIn = true
        res.redirect('/')
    }
    else{
        req.session.loggedIn = false
        res.redirect('/login')
    }
})

module.exports = app