const mongoose = require('mongoose')

mongoose.connect(process.env.DBURL)
const connection = mongoose.connection
module.exports = connection