const mongoose = require('mongoose')

const serviceSchema = mongoose.Schema({
    img: String,
    name: String,
    desc: String,
    ldesc: String,
    status: { type: String, default: 'unpublish' },
    postedDate: { type: Date, default: new Date() }
})
module.exports = mongoose.model('service', serviceSchema)