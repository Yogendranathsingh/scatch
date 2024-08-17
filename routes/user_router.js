const express = require('express')
const router = express.Router()
const { signupuser, signinuser } = require('../controllers/auth_controlers')
const { isloggedin } = require('../middlewares/is_logged_in')
const productmodel = require('../models/product')
const usermodel = require('../models/user')
const product = require('../models/product')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

router.get('/', (req, res) => {
    res.send('user router its working well!!! yahoooo!!')
})

router.post('/signup', signupuser)

router.post('/signin', signinuser)

router.get('/carts', async function (req, res) {
    const products = productmodel.findOne()
    const { email } = jwt.verify(req.cookies.token, process.env.JWT_KEY)
    const user = await usermodel.findOne({ email })
    const carts = user.carts
    let total=0;
    let promises = carts.map(async (productid) => {
        let pdt = await productmodel.findOne({ _id: productid })
        total+=pdt.price
        return pdt
    })
    let pdts = await Promise.all(promises)
    res.render('carts', { products: pdts,total})
})

router.get('/product/:productid', async function (req, res) {
    const { email } = jwt.verify(req.cookies['token'], process.env.JWT_KEY)
    let user = await usermodel.findOne({ email })
    if (user.carts.indexOf(req.params.productid) != -1) {
        user.carts.splice(user.carts.indexOf(req.params.productid), 1)
        await user.save()
        return res.redirect('/user/shop')
    } else {
        user.carts.push(req.params.productid)
        await user.save()
        res.redirect('/user/shop')
    }
})

router.get('/signout', (req, res) => {
    res.cookie('token', '');
    req.flash('success_msg', 'signout successfuly')
    res.redirect('/')
})

router.get('/shop', isloggedin, async (req, res) => {
    let products = await product.find()
    res.render('shop', { products })
})

module.exports = router