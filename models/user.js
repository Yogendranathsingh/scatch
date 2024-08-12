const mongoose= require('mongoose')

userschema= mongoose.Schema({
    name:String,
    email:String,
    password:String,
    contact:Number,
    picture:String,
    carts:[],
    orders:[],
})

module.exports= mongoose.model('user',userschema)