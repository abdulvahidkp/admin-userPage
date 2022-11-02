const express = require('express')
const router = express.Router()
const adminController = require('../controller/adminController')
const auth = require('../middleware/authentication').verifyLogin    

router.get('/',adminController.loginPage);
router.post('/home',adminController.homePage);    
router.get('/home',adminController.homePage);
router.get('/edit',adminController.editPage);
router.post('/edited',adminController.editedData)
router.get('/add',adminController.addPage)
router.post('/added',adminController.addUser)

module.exports = router 