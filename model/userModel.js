const db = require('../config/connection')
const collection = require('../config/collection')
const bcrypt = require('bcrypt')

module.exports = {
    insertUser: (user) => {
        return new Promise(async (resolve, reject) => {
            user.password = await bcrypt.hash(user.password, 10)
            db.get().collection(collection.USER_COLLECTION).insertOne(user).then((data) => {
                resolve(data)
            })
        })
    },
    doLogin:(userData)=>{
        return new Promise(async(resolve,reject)=>{
            let user=await db.get().collection(collection.USER_COLLECTION).findOne({email:userData.email})
            if(user){
                bcrypt.compare(userData.password,user.password).then((status)=>{
                    if(status){
                        console.log('login-success');
                        let response={}
                        response.username = user.name;
                        response.status = true;
                        console.log('here is your name'+response.username+'   here is your status'+response.status);
                        resolve(response)
                    }else{
                        console.log('password incorrect ');
                        resolve({status:false})
                    }
                })
            }else{
                console.log('no user available ')
                resolve({status:false})
            }
        })

    },
    getUser: (id) => {
        return new Promise(async (resolve, reject) => {
            let user = await db.get().collection(collection.USER_COLLECTION).find({ _id: ObjectId(id) }).toArray()
            resolve(user)
        })
    },
}    