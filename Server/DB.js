const mongoose = require('mongoose')
const MONGO_URL = "mongodb://localhost:27017/chat_app"
const MongoDB = async () =>{
    try {
        await mongoose.connect(MONGO_URL).then(()=>{
            console.log('connected Successfully with DB')
        }).catch((err)=>{
            console.log(err,"err to connect")
        })
    } catch (error) {
        console.log("error to connect with DB",error)

    }
}

module.exports = MongoDB