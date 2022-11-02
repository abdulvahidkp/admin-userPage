const express = require('express')
const router = express.Router()
const adminController = require('../controller/adminController')
const auth = require('../middleware/authentication').verifyLogin    

router.get('/',adminController.loginPage);
router.post('/home',adminController.posthomePage); 
router.use(auth);   
router.get('/home',adminController.gethomePage);
router.get('/add',adminController.getAddUserPage);
router.post('/add',adminController.postAddUser);
router.get('/delete/:id',adminController.deleteUser)
router.get('/edit/:id',adminController.editPage);
router.post('/edited/:id',adminController.editedData)
router.post('/search',adminController.searchUser);
router.get('/logout',adminController.doLogout)

module.exports = router 