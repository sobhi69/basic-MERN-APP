const mongoose = require('mongoose')


const recordSchema = mongoose.Schema({
    recordName : {
        type:String,
        required:true,
        trim :true
    },
    position :{
        type:String,
        required:true,
        trim :true
    },
    level:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('RecordModel',recordSchema)
