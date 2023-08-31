const mongoose=require('mongoose')
const addressschema=mongoose.Schema({
    add:String,
    tel:Number,
    phone:Number,
    email:String,
    linkdin:String,
    inst:String,
    twitter:String,
    snap:String

})
module.exports=mongoose.model('address',addressschema)