const address=require('../models/address')

exports.addresspage=async(req,res)=>{
    const record=await address.findOne()
    res.render('admin/address.ejs',{record})
}
exports.addressupdateform=async(req,res)=>{
    // console.log(req.params.id)
    const id=req.params.id
    const record=await address.findOne()

    res.render('admin/addressform.ejs',{record})
}
exports.addressupdatedata=async(req,res)=>{
    // console.log(req.params.id)
    const id =req.params.id
    const{add,tel,phone,email,linkdin,snap,twitter,inst}=req.body
    const record=await address.findByIdAndUpdate (id,{add:add,tel:tel,phone:phone,email:email,linkdin:linkdin,inst:inst, twitter:twitter,snap:snap})
    // record.save()
    res.redirect('/admin/address')
}