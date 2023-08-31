const express=require('express')
const app=express()
app.use(express.urlencoded({extended:false}))
require('dotenv').config()
const frontendrouter=require('./routers/adminrouter')
const adminrouter=require('./routers/frontendrouter')
const mongoose=require('mongoose')
const session=require('express-session')
mongoose.connect(`${process.env.DB_Url}/${process.env.DB_NAME}`)

app.use(session({
    secret:process.env.key,
    resave:'false',
    saveUninitialized:'false',
    
})
)
app.use(frontendrouter)
app.use(adminrouter)
app.use(express.static('public'))//for static files 
app.set('view engine','ejs')
app.listen(process.env.port)