const express= require('express')
const router= express.Router()
const ownermodel= require('../models/owner')
const owner = require('../models/owner')
const productmodel= require('../models/product')

const multer= require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

if(process.env.NODE_ENV === 'development'){
    router.post('/signup',async (req,res)=>{
        let owners= await ownermodel.find()
        if(owners.length>0) res.send('you do not have permission to create new owner')
        let {name,email,password}=req.body
        let createdowner= await ownermodel.create({
            name,
            email,
            password
        })
        res.send(createdowner)
    })
}

router.get('/',(req,res)=>{
    res.send('owner router')
})

router.get('/create',(req,res)=>{
    res.render('create_product')
})

router.post('/create',upload.single('picture'),async (req,res)=>{
    const base64Image = req.file.buffer.toString('base64');
    const mimeType = req.file.mimetype;
    const picture = `data:${mimeType};base64,${base64Image}`;
    let {name,price,discount,bgcolor,textcolor,panelcolor}= req.body
    let createdproduct= await productmodel.create({
        name,price,discount,bgcolor,textcolor,panelcolor,picture
    })
    res.redirect('create')
})

module.exports= router