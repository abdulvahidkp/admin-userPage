const userModel = require('../model/userModel')
let msg = ''

module.exports = {
    getLoginPage: (req, res) => {
        if (req.session.user) {
            res.redirect('/home')
        } else {
            res.render('user/login', { message: msg })
            msg = ''
        }
    },
    signUpPage: (req, res) => {
        res.render('user/signup')
    },
    addUser: (req, res) => {
        userModel.insertUser(req.body).then((data) => {
            console.log('added new user')
            res.redirect('/')
        })
    },
    postHome: (req, res) => {
        userModel.doLogin(req.body).then((response) => {
            console.log(response);
            if (response.status) {
                req.session.user = response.username;
                res.redirect('/home')
            } else {
                msg = 'Invalid email or password'
                res.redirect('/')
            }
        })
    },
    getHome:(req,res)=>{
        if(req.session.user){
            user = req.session.user
            res.render('user/home',{user})
        }else{
            res.redirect('/')
        }

    },
    userLogout: (req, res) => {
        req.session.destroy((error) => {
            if (error) {
                console.log(error);
            } else {
                console.log('logout successfully');
                res.redirect('/');
            }
        })
    }
}