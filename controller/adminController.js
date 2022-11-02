const adminModel = require('../model/adminModel')   

module.exports = {
    loginPage:(req,res)=>{
        
        res.render('admin/login')
    },

    homePage:(req,res)=>{
        adminModel.getAllusers().then((users)=>{
            res.render('admin/table',{users,admin:true})

        })
    },
    editPage:(req,res)=>{ 
        res.render('admin/edit',{admin:true})
    },
    editedData:(req,res)=>{
        adminModel.insertUser(req.body,(data)=>{
            console.log('added new user');
        })
        

    },
    addPage:(req,res)=>{
        res.render('admin/add',{admin:true})
    },
    addUser:(req,res)=>{
        adminModel.insertUser(req.body,(data)=>{
            res.redirect('/admin/home')
        })
        
    }

}
