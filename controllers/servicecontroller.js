const serviceCO = require('../models/service')
const address = require('../models/address')

exports.adminservice = async (req, res) => {
    const record = await serviceCO.find().sort({ postedDate: -1 })
    const totalservice = await serviceCO.count()
    const publishservice = await serviceCO.count({ status: 'publish' })
    const unpublishservice = await serviceCO.count({ status: 'unpublish' })
    // console.log(totalservice)
    res.render('admin/service.ejs', { record, totalservice, publishservice, unpublishservice })
}
exports.adminserviceform = (req, res) => {
    res.render('admin/serviceform.ejs')
}
exports.serviceadd = (req, res) => {
    const { Sname, Sdesc, Sldesc } = req.body
    // console.log(req.body)
    const date = new Date
    // const time = date.toLocaleTimeString("en-US")

    //follow https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/UTC
    // const day=date.getDate()
    // const month=date.getMonth()+1
    // const year=date.getFullYear()
    // const Hours=date.getHours()
    // const minutes=date.getMinutes()
    // const seconds=date.getSeconds()

    // const Datetime=(`${day}-${month}-${year}/${Hours}:${minutes}:${seconds}`)
    // console.log(req.file)
    if (req.file) {
        const filename = req.file.filename
        const record = new serviceCO({ name: Sname, desc: Sdesc, ldesc: Sldesc, img: filename, postedDate:date})
        record.save()
        res.redirect('/admin/service')
    } else {
        const record = new serviceCO({ name: Sname, desc: Sdesc, ldesc: Sldesc ,postedDate:date})
        record.save()
        res.redirect('/admin/service')
    }
    

}
exports.servicestatusupdate = async (req, res) => {
    const id = req.params.id
    const record = await serviceCO.findById(id)
    var newstatus = 'null'
    if (record.status == 'unpublish') {
        newstatus = 'publish'
    } else {
        newstatus = 'unpublish'
    }
    await serviceCO.findByIdAndUpdate(id, { status: newstatus })
    res.redirect('/admin/Service')
}
exports.servicedelete = async (req, res) => {
    const id = req.params.id
    await serviceCO.findByIdAndDelete(id)
    res.redirect('/admin/Service')
}
exports.servicedetails = async (req, res) => {
    const id = req.params.id
    const record = await serviceCO.findById(id)
    const address1 = await address.findOne()
    res.render('servicedetail.ejs', { record, address1 })
}
exports.servicesearch = async (req, res) => {
    // console.log(req.body)
    const { status } = req.body
    const record = await serviceCO.find({ status: status }).sort({ postedDate: -1 })
    const totalservice = await serviceCO.count()
    const publishservice = await serviceCO.count({ status: 'publish' })
    const unpublishservice = await serviceCO.count({ status: 'unpublish' })
    // console.log(totalservice)
    res.render('admin/service.ejs', { record, totalservice, publishservice, unpublishservice })
}