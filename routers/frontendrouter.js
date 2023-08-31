const router = require('express').Router()
const regCo=require('../controllers/regcontroller')
const bannerCo=require('../models/banner')
const banner=require('../controllers/bannercontroller')
const serviceCo=require('../controllers/servicecontroller')
const Service=require('../models/service')
const testiCo=require('../controllers/testicontroller')
const testi=require('../models/testi')
const address=require('../models/address')
const query=require('../controllers/querycontroller')


const multer = require('multer')

let storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./public/upload')

    },
    filename:function(req,file,cb){
        cb(null,Date.now()+file.originalname)
    }
})

let upload=multer({
    storage:storage,
    limits:{filesize:4*1024*1024},

})

router.get('/', async(req, res) => {
   const record = await bannerCo.findOne()
   const servicerecord=await Service.find({status:'publish'})
  const testirecord= await testi.find({status:'publish'})
  const address1= await address.findOne()
    res.render('index.ejs',{record,servicerecord,testirecord,address1})
})
router.get('/banner',banner.bannermoredetails)
router.get('/testi',testiCo.testiform)

router.post('/testi',upload.single('img'),testiCo.testidata)
router.get('/servicedetail/:id',serviceCo.servicedetails)
 router.post('/',query.add)
module.exports = router
