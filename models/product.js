const mongoose= require('mongoose')

const productschema= mongoose.Schema({
    name:String,
    price:Number,
    picture:String,
    discount:Number,
    bgcolor:String,
    textcolor:String,
    panelcolor:String
})

module.exports= mongoose.model('product',productschema)