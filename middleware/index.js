function adminLoggedIn (req, res, next) {
    if(req.session.loggedIn) next()
    else
        res.send('go away')
}
module.exports = adminLoggedIn