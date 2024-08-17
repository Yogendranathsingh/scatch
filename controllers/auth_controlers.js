const bcrypt= require('bcrypt')
const usermodel= require('../models/user')
const {generatetoken}= require('../utils/generate_token')
const router = require('../routes/user_router')

const signupuser = async (req, res) => {
    let { name, email, password } = req.body
    let user = await usermodel.findOne({ email })
    if (user){
         req.flash('error_msg','you have already an account, please login.')
         return res.redirect('/')
    }
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, async function (err, hash) {
            let createduser = await usermodel.create({
                name,
                email,
                password: hash,
            })
            let token = generatetoken(createduser)
            res.cookie('token', token)
            req.flash('success_msg','account created successfully')
            res.redirect('/')
        })
    })

}

module.exports.signupuser= signupuser

const signinuser= async (req,res)=>{
    let {email,password}= req.body
    let user= await usermodel.findOne({email})
    if(!user){
        req.flash('error_msg','email or password is incorrect.')
        return res.redirect('/')
    }
    let result= await bcrypt.compare(password,user.password)
    if(!result){
        req.flash('error_msg','email or password is incorrect.')
        return res.redirect('/')
    }
    let token= generatetoken(user)
    res.cookie('token',token)
    res.redirect('shop')
}

module.exports.signinuser= signinuser