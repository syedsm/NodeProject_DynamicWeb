const mongoose = require("mongoose")

const queryschema = mongoose.Schema({
    email: String,
    query: String,
    postedDate: Date,
    status: { type: String, default: 'waiting for reply' }
})
module.exports = mongoose.model('query', queryschema)