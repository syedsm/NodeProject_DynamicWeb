const banner=require('../models/banner')
const address=require('../models/address')

exports.adminbanner=async(req,res)=>{
    const record =await banner.findOne()
    
res.render('admin/banner.ejs',{record})
}
exports.adminbannerupdateform=async(req,res)=>{
    const id =req.params.id
    const record=await banner.findById(id)
    res.render('admin/bannerupdateform.ejs',{record})
}
exports.bannerupdate=async(req,res)=>{
    const id=req.params.id
    // console.log(req.file)
    const {Title, Description,LongDescription}=req.body
    if(req.file){
        const filename=req.file.filename
        await banner.findByIdAndUpdate(id,{title:Title,desc:Description,ldesc:LongDescription,img:filename})
    }else{

        await banner.findByIdAndUpdate(id,{title:Title,desc:Description,ldesc:LongDescription})
    }
    res.redirect('/admin/banner')
}
exports.bannermoredetails=async(req,res)=>{
    const record=await banner.findOne()
    const address1= await address.findOne()
    res.render('banner.ejs',{record,address1})
}