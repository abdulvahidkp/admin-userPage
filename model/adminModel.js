const db = require('../config/connection')
const collection = require('../config/collection')
const bcrypt = require('bcrypt')

module.exports={
    getAllusers:()=>{
        return new Promise(async (resolve,reject)=>{
            let users = await db.get().collection(collection.USER_COLLECTION).find().toArray()
            resolve(users)
        })


    },
    insertUser:(user,callback)=>{
        user.password = bcrypt.hash(user.password,10)
        db.get().collection(collection.USER_COLLECTION).insertOne(user).then((data)=>{
            callback(data)
        })
    },
}