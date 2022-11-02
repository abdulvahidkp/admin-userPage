module.exports = {
    verifyLogin: (req, res, next)=>{
        if (req.session.user) {
            next()
        } else {
            res.redirect('/')
        }
    }
}