const mongoose= require('mongoose')
const dbgr= require('debug')('development:mongoose')
const config= require('config')

mongoose.connect(`${config.get("MONGODB_URI")}/scatchdb`)
.then(function(){
    dbgr('database connected')
})
.catch(function(err){
    dbgr(err.message)
})

module.exports= mongoose.connection