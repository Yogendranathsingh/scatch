const express= require('express')
const app= express()

app.get('/',(req,res)=>{
    res.send('ji')
})

app.listen(3000)