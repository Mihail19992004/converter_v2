const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    pass: {type: String, required: true},
    history: {type: Array},
    date: {type: Date, default: Date.now},

})

module.exports = mongoose.model('User', schema)