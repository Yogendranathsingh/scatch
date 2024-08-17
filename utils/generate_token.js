const jwt= require('jsonwebtoken')
const dotenv= require('dotenv')

require('dotenv').config();

const generatetoken= (user)=>{ 
    return jwt.sign({email:user.email},process.env.JWT_KEY)
}

module.exports.generatetoken= generatetoken