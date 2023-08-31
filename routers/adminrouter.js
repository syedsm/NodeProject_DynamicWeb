const router = require('express').Router()
const regCo = require('../controllers/regcontroller')
const bannerCo = require('../controllers/bannercontroller')
const serviceCo = require('../controllers/servicecontroller')
const testiCo = require('../controllers/testicontroller')
const address = require('../controllers/addresscontroller')
const query = require('../controllers/querycontroller')

const multer = require('multer')

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/upload')

    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})

let upload = multer({
    storage: storage,
    limits: { filesize: 4 * 1024 * 1024 },

})
function handlelogin(req, res, next) {
    if (req.session.isAuth) {
        next()
    } else {
        res.redirect('/admin')
    }
}

router.get('/admin', regCo.login)
router.post('/admin', regCo.logincheck)
router.get('/admin/dashboard', handlelogin, regCo.dashboard)
router.get('/admin/logout', handlelogin, regCo.logout)
router.get('/admin/banner', handlelogin, bannerCo.adminbanner)
router.get('/admin/bannerupdate/:id', handlelogin, bannerCo.adminbannerupdateform)
router.post('/admin/bannerupdate/:id', handlelogin, upload.single('img'), bannerCo.bannerupdate)

router.get('/admin/Service', handlelogin, serviceCo.adminservice)
router.get('/admin/serviceadd', handlelogin, serviceCo.adminserviceform)
router.post('/admin/serviceadd', handlelogin, upload.single('Simg'), serviceCo.serviceadd)
router.get('/admin/servicestatusupdate/:id', handlelogin, serviceCo.servicestatusupdate)
router.get('/admin/servicedelete/:id', handlelogin, serviceCo.servicedelete)
router.get('/admin/testinominals', handlelogin, testiCo.testipage)
router.get('/admin/testistatusupdate/:id', handlelogin, testiCo.testistatusupdate)
router.get('/admin/testidelete/:id', handlelogin, testiCo.testidelete)
router.get('/admin/address', handlelogin, address.addresspage)
router.get('/admin/addressform/:id', handlelogin, address.addressupdateform)
router.post('/admin/addressform/:id', handlelogin, address.addressupdatedata)
router.get('/admin/query', handlelogin, query.show)
router.get('/admin/queryform/:id', handlelogin, query.emailform)

router.post('/admin/queryform/:id', handlelogin, query.emailsend)
router.get('/admin/querydelete/:id', handlelogin, query.delete)
router.post('/admin/service', handlelogin, serviceCo.servicesearch)

router.post('/admin/testinominals', testiCo.search)
router.post('/admin/query', query.search)
module.exports = router
