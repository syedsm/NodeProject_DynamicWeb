const testi=require('../models/testi')
const address=require('../models/address')

exports.testiform=async(req,res)=>{
   const address1= await address.findOne()
    res.render('testiform.ejs',{address1})
}
exports.testidata=(req,res)=>{
//    console.log(req.body)
let currentDate=new Date()
const {quotes,name}=req.body
if(req.file){
    let filename=req.file.filename
    const record =new testi({img:filename,quotes:quotes,name:name,postedDate:currentDate})
    record.save() 
    res.redirect('/')
}else{
    filename='user.png' 
    const record =new testi({img:filename,quotes:quotes,name:name,postedDate:currentDate})
    record.save() 
    res.redirect('/')
}
// const filename=req.file.filename 
// console.log(record)
}
exports.testipage=async(req,res)=>{
    const record=await testi.find().sort({postedDate:-1})
    const totalservice=await testi.count()
    const publishservice=await testi.count({status:'publish'})
    const unpublishservice=await testi.count({status:'unpublish'})
    res.render('admin/testi.ejs',{record,totalservice,publishservice,unpublishservice})

}
exports.testistatusupdate=async(req,res)=>{
    // console.log(req.params.id)
    const id=req.params.id
    const record=await testi.findById(id)
    // console.log(record)
    let newstatus='null'
    if(record.status=='unpublish'){
    newstatus='publish'
    }else{
        newstatus='unpublish'
    }
    await testi.findByIdAndUpdate(id,{status:newstatus})
    res.redirect('/admin/testinominals')

}
exports.testidelete=async(req,res)=>{
    // console.log(req.params.id)
    const id=req.params.id
    const record=await testi.findByIdAndDelete(id)
    console.log(record)
    res.redirect('/admin/testinominals')
}
exports.search=async(req,res)=>{
    // console.log(req.body)
    const{status}=req.body
    const record=await testi.find({status:status}).sort({postedDate:-1})
    const totalservice=await testi.count()
    const publishservice=await testi.count({status:'publish'})
    const unpublishservice=await testi.count({status:'unpublish'})
    res.render('admin/testi.ejs',{record,totalservice,publishservice,unpublishservice})
}