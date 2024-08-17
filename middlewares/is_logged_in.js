const jwt= require('jsonwebtoken')
const usermodel= require('../models/user')

require('dotenv').config()

const isloggedin= async (req,res,next)=>{
    let token=req.cookies.token
    if(!token) return res.send('isloggedin is false')
    let {email}= jwt.verify(token,process.env.JWT_KEY)
    let user= await usermodel.findOne({email}).select('-password')
    req.user=user 
    next()
}

module.exports.isloggedin= isloggedin