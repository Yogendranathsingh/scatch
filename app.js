const express= require('express')
const app= express()
const path= require('path')

const db= require('./config/mongoose_connection')

const usermodel= require('./models/user')
const productmodel= require('./models/product')
const ownermodel= require('./models/owner')

const userrouter= require('./routes/user_router')
const productrouter= require('./routes/product_router')
const ownerrouter= require('./routes/owner_router')

app.set('view engine','ejs')
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'public')))

app.use('/user',userrouter)
app.use('/product',productrouter)
app.use('/owner',ownerrouter)

app.get('/',(req,res)=>{
    res.render('index')
})



app.listen(3000)