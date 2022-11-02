const db = require('../config/connection')
const collection = require('../config/collection')
const bcrypt = require('bcrypt')
const { Collection } = require('mongodb')
const objectId = require('mongodb').ObjectId

module.exports = {
    getAllusers: () => {
        return new Promise(async (resolve, reject) => {
            let users = await db.get().collection(collection.USER_COLLECTION).find().toArray()
            resolve(users)
        })


    },
    insertUser: (user, callback) => {
        user.password = bcrypt.hash(user.password, 10)
        db.get().collection(collection.USER_COLLECTION).insertOne(user).then((data) => {
            callback(data)
        })
    },
    deleteUser: (userId) => {
        return new Promise((resolve, reject) => {
            db.get().collection(collection.USER_COLLECTION).deleteOne({ _id: objectId(userId) }).then((response) => {
                resolve(response)
            })

        })
    },
    getOneUser: (userId) => {
        return new Promise(async (resolve, reject) => {
            await db.get().collection(collection.USER_COLLECTION).findOne({ _id: objectId(userId) }).then((userDetails) => {
                resolve(userDetails)
            })
        })
    },
    getOneUserByName: (username) => {
        return new Promise(async (resolve, reject) => {
            await db.get().collection(collection.USER_COLLECTION).findOne({name:username}).then((userDetails) => {
                resolve(userDetails)
            })
        })
    },
    updateUser: (user) => {
        return new Promise((resolve, reject) => {
            db.get().collection(collection.USER_COLLECTION).updateOne(
                { _id: objectId(user._id) },
                {
                    $set: {
                        name: user.name,
                        email: user.email
                    }
                }).then((response)=>{
                    resolve()
                })
        })
    }

}  