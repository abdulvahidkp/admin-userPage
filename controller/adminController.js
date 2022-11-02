const adminModel = require('../model/adminModel')

const admin = { email: 'admin@gmail.com', password: '9488' }
let message = ''

module.exports = {
    loginPage: (req, res) => {
        if (req.session.admin) {
            res.redirect('/admin/home')
        }
        res.render('admin/login', { message })
        message = ''
    },

    posthomePage: (req, res) => {
        if (req.body.email === admin.email && req.body.password === admin.password) {
            req.session.admin = req.body.email
            res.redirect('/admin/home')
        } else {
            res.redirect('/admin')
            message = 'invalid username or password'
        }
    },
    gethomePage: (req, res) => {
        adminModel.getAllusers().then((users) => {
            res.render('admin/table', { data:users, admin: true })
        })
    },
    getAddUserPage: (req, res) => {
        res.render('admin/add', { admin: true })
    },
    postAddUser: (req, res) => {
        adminModel.insertUser(req.body, (data) => {
            res.redirect('/admin/home')
        })
    },
    deleteUser: (req, res) => {
        let userId = req.params.id
        adminModel.deleteUser(userId).then((response) => {
            res.redirect('/admin/home')
        })

    },
    editPage: (req, res) => {
        let userId = req.params.id
        adminModel.getOneUser(userId).then((user) => {
            res.render('admin/edit', { admin: true, user })
        })

    },
    editedData: (req, res) => {
        req.body._id = req.params.id
        adminModel.updateUser(req.body).then(() => {
            res.redirect('/admin/home')
        })
    },
    searchUser:(req,res)=>{
        username = req.body.user
        adminModel.getOneUserByName(username).then((users)=>{
            console.log(users);
            res.render('admin/table', { data:users, admin: true })
        })


    },
    doLogout: (req, res) => {
        req.session.destroy((error) => {
            if (error) {
                console.log(error);
            } else {
                console.log('admin logout successfully');
                res.redirect('/admin');
            }
        })
    }

}
