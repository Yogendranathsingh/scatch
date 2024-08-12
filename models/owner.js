const mongoose= require('mongoose')

ownerschema= mongoose.Schema({
    name:String,
    email:String,
    password:String,
    picture:String,
    products:[],
    gstnumber:String
})

module.exports= mongoose.model('owner',ownerschema)