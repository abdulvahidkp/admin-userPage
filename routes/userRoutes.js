const express = require('express')
const router = express.Router()
const userController = require('../controller/userController')

router.get('/',userController.getLoginPage)
router.post('/home',userController.postHome)
router.get('/home',userController.getHome)
router.get('/signup',userController.signUpPage)
router.post('/signup',userController.addUser)
router.get('/logout',userController.userLogout)




module.exports = router